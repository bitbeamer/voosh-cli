import { Command, CommanderError, InvalidArgumentError } from "commander";
import {
  createVooshClient,
  type BookmarkListParams,
  type CalendarCreatePayload,
  type CalendarListParams,
  type CalendarRetrieveParams,
  type CalendarUpdatePayload,
  type EventCreatePayload,
  type EventListParams,
  type EventSlotCreatePayload,
  type EventSlotListParams,
  type EventSlotUpdatePayload,
  type EventUpdatePayload,
  type OrganizationListParams,
  type OrganizationMembershipListParams,
  type VooshClient,
} from "./client.js";

import {
  type CliConfig,
  type CliEnv,
  normalizeBaseUrl,
  previewToken,
  resolveConfig,
  requireToken,
  updateProfile,
} from "./config.js";
import { CliError, EXIT_CODES } from "./errors.js";
import { type IoStreams, renderResult, writeError } from "./output.js";
import { API_OPERATION_BY_ID, API_OPERATIONS, type ApiOperation } from "./generated/operations.js";
import {
  executeApiOperation,
  parseJson,
  parseNamedFile,
  parseNamedValue,
  readJsonFile,
  type NamedFile,
  type NamedValue,
} from "./api-command.js";

export interface CliRuntime {
  env?: CliEnv;
  io?: IoStreams;
  createClient?: (options: { baseUrl: string; token: string }) => VooshClient;
}

interface ActionContext {
  client: VooshClient;
  config: CliConfig;
  json: boolean;
  quiet: boolean;
  io: IoStreams;
}

interface CommandContext {
  config: CliConfig;
  json: boolean;
  quiet: boolean;
  io: IoStreams;
}

const DEFAULT_IO: IoStreams = {
  stdout: process.stdout,
  stderr: process.stderr,
};

const CALENDAR_LIST_SCOPES = ["accessible", "bookmarked", "favorites", "managed", "related", "sidebar"] as const satisfies readonly NonNullable<CalendarListParams["scope"]>[];

interface CalendarGetOptions {
  withEvents?: boolean;
  includeUpcomingEvents?: boolean;
  days?: number;
}

interface CalendarWriteOptions {
  title?: string;
  description?: string;
  visibility?: CalendarCreatePayload["visibility"];
  remoteUrl?: string;
  orgId?: string;
  managerUsername?: string[];
}

interface EventListOptions {
  calendar: string;
  from?: string;
  to?: string;
  page?: number;
}

interface EventWriteOptions {
  ownerCalendar?: string;
  summary?: string;
  description?: string;
  location?: string;
  start?: string;
  end?: string;
  startDate?: string;
  endDate?: string;
  rrule?: string;
  slotsEnabled?: boolean;
  recurrencesEnabled?: boolean;
  materialize?: boolean;
}

interface SlotListOptions {
  event: string;
  page?: number;
}

interface SlotWriteOptions {
  resource?: string;
  start?: string;
  end?: string;
  maxAttendees?: number;
  allowMultipleSlots?: boolean;
  allowMultipleRequests?: boolean;
  confirmationType?: EventSlotCreatePayload["confirmation_type"];
  showAttendees?: boolean;
  hideAttendees?: boolean;
}

interface DateTimeParseContext {
  now: Date;
  timezone: "UTC";
}

interface OrganizationListOptions {
  page?: number;
}

interface MembershipListOptions {
  page?: number;
}

interface ApiOperationsOptions {
  tag?: string;
  method?: string;
  search?: string;
}

interface ApiCallOptions {
  path?: NamedValue[];
  query?: NamedValue[];
  header?: NamedValue[];
  body?: string;
  bodyFile?: string;
  form?: NamedValue[];
  file?: NamedFile[];
  anonymous?: boolean;
}

export async function run(argv: string[], runtime: CliRuntime = {}): Promise<number> {
  const io = runtime.io ?? DEFAULT_IO;
  const program = buildProgram(runtime);
  const json = hasJsonFlag(argv);
  configureCommandForRun(program, io, json);

  try {
    await program.parseAsync(argv, { from: "user" });
    return EXIT_CODES.success;
  } catch (error) {
    if (isCommanderError(error)) {
      if (error.exitCode === EXIT_CODES.success) {
        return EXIT_CODES.success;
      }
      if (json) {
        return writeError(io, commanderUsageError(error), true);
      }
      return EXIT_CODES.usageOrConfigError;
    }
    return writeError(io, error, json || Boolean((program.opts() as { json?: boolean }).json));
  }
}

export function buildProgram(runtime: CliRuntime = {}): Command {
  const env = runtime.env ?? process.env;
  const clientFactory = runtime.createClient ?? ((options) => createVooshClient(options));
  const program = new Command();

  program
    .name("voosh")
    .description("Node.js CLI for the voo.sh API.")
    .option("--json", "Emit stable JSON output.")
    .option("--quiet", "Suppress human success output.")
    .option("--api-url <url>", "voo.sh API host URL (defaults to VOOSH_API_URL or https://voo.sh).")
    .option("--profile <name>", "Configuration profile name.", "default")
    .option("--timezone <zone>", "Timezone for natural event/slot datetimes: --timezone > VOOSH_TIMEZONE > UTC. Only UTC is currently supported.")
    .option("--no-color", "Disable colored output.")
    .showHelpAfterError();

  const auth = program.command("auth").description("Authentication commands.");
  auth
    .command("login")
    .description("Save an API token for the selected profile.")
    .requiredOption("--token <token>", "API token to store.")
    .option("--verify", "Verify the token by calling the API before saving (default).", true)
    .option("--no-verify", "Save without calling the API.")
    .action(async function (options: { token: string; verify?: boolean }) {
      const context = createCommandContext(this, env, runtime.io ?? DEFAULT_IO);
      const token = normalizeToken(options.token);
      if (options.verify !== false) {
        await clientFactory({ baseUrl: context.config.apiUrl, token }).me.retrieve();
      }
      updateProfile(context.config.configPath, context.config.profile, (profile) => {
        if (context.config.apiUrlSource === "flag") {
          profile.apiUrl = context.config.apiUrl;
        }
        profile.token = token;
      });
      renderResult(context.io, authStatusData(resolveConfig(getGlobals(this), env), "saved"), {
        json: context.json,
        quiet: context.quiet,
      });
    });

  auth
    .command("logout")
    .description("Remove the saved API token for the selected profile.")
    .action(function () {
      const context = createCommandContext(this, env, runtime.io ?? DEFAULT_IO);
      updateProfile(context.config.configPath, context.config.profile, (profile) => {
        delete profile.token;
      });
      const data = {
        code: "token_removed",
        profile: context.config.profile,
        config_path: context.config.configPath,
      };
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  auth
    .command("status")
    .description("Show authentication status for the selected profile.")
    .action(function () {
      const context = createCommandContext(this, env, runtime.io ?? DEFAULT_IO);
      renderResult(context.io, authStatusData(context.config), { json: context.json, quiet: context.quiet });
    });

  const configCommand = program.command("config").description("Configuration commands.");
  configCommand
    .command("show")
    .description("Show effective configuration for the selected profile.")
    .action(function () {
      const context = createCommandContext(this, env, runtime.io ?? DEFAULT_IO);
      renderResult(context.io, configShowData(context.config), { json: context.json, quiet: context.quiet });
    });

  configCommand
    .command("set-base-url")
    .description("Save the API base URL for the selected profile.")
    .argument("<url>", "Absolute API base URL.")
    .action(function (url: string) {
      const context = createCommandContext(this, env, runtime.io ?? DEFAULT_IO);
      const apiUrl = normalizeBaseUrl(url);
      updateProfile(context.config.configPath, context.config.profile, (profile) => {
        profile.apiUrl = apiUrl;
      });
      const data = {
        code: "base_url_saved",
        profile: context.config.profile,
        config_path: context.config.configPath,
        base_url: apiUrl,
        api_url: apiUrl,
      };
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  const api = program.command("api").description("Discover and call every operation in the bundled voo.sh OpenAPI contract.");
  api
    .command("operations")
    .description("List bundled API operations.")
    .option("--tag <tag>", "Filter by OpenAPI tag.")
    .option("--method <method>", "Filter by HTTP method.")
    .option("--search <text>", "Search operation ID, path, summary, or description.")
    .action(function (options: ApiOperationsOptions) {
      const context = createCommandContext(this, env, runtime.io ?? DEFAULT_IO);
      const operations = filterApiOperations(options).map(apiOperationData);
      renderResult(context.io, { count: operations.length, operations }, {
        json: context.json,
        quiet: context.quiet,
      });
    });

  api
    .command("describe")
    .description("Describe one bundled API operation.")
    .argument("<operation-id>", "OpenAPI operation ID.")
    .action(function (operationId: string) {
      const context = createCommandContext(this, env, runtime.io ?? DEFAULT_IO);
      renderResult(context.io, apiOperationData(requireApiOperation(operationId)), {
        json: context.json,
        quiet: context.quiet,
      });
    });

  api
    .command("call")
    .description("Call any bundled API operation by operation ID.")
    .argument("<operation-id>", "OpenAPI operation ID; inspect it first with `voosh api describe`.")
    .option("--path <name=value>", "Path parameter; repeat for multiple values.", collectPathValue, [])
    .option("--query <name=value>", "Query parameter; repeat for multiple or repeated values.", collectQueryValue, [])
    .option("--header <name=value>", "Additional request header; repeat for multiple values.", collectHeaderValue, [])
    .option("--body <json>", "JSON request body.")
    .option("--body-file <path>", "Read the JSON request body from a file.")
    .option("--form <name=value>", "Multipart form field; repeat for multiple values.", collectFormValue, [])
    .option("--file <name=path>", "Multipart file field; repeat for multiple files.", collectFileValue, [])
    .option("--anonymous", "Do not send the configured API token.")
    .action(async function (operationId: string, options: ApiCallOptions) {
      const context = createCommandContext(this, env, runtime.io ?? DEFAULT_IO);
      const operation = requireApiOperation(operationId);
      if (options.body !== undefined && options.bodyFile !== undefined) {
        throw new CliError("Use either --body or --body-file, not both.", {
          code: "usage_error",
          exitCode: EXIT_CODES.usageOrConfigError,
        });
      }
      const token = options.anonymous
        ? undefined
        : context.config.token ?? (operation.anonymousAllowed ? undefined : requireToken(context.config));
      const jsonBody = options.body !== undefined
        ? parseJson(options.body, "--body")
        : options.bodyFile !== undefined
          ? await readJsonFile(options.bodyFile)
          : undefined;
      const response = await executeApiOperation({
        baseUrl: context.config.apiUrl,
        token,
        operation,
        pathValues: options.path,
        queryValues: options.query,
        headerValues: options.header,
        jsonBody,
        formValues: options.form,
        files: options.file,
      });
      renderResult(context.io, response.data, { json: context.json, quiet: context.quiet });
    });

  const me = program.command("me").description("Profile information.");
  me.command("show")
    .description("Show the authenticated user.")
    .action(async function () {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.me.retrieve();
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  const calendars = program.command("calendars").description("Manage calendars.");
  calendars
    .command("list")
    .description("List accessible calendars.")
    .option("--scope <scope>", "accessible, bookmarked, favorites, managed, related, or sidebar", parseCalendarListScope, "accessible")
    .option("--page <page>", "Page number for paginated results.", parsePositiveInteger)
    .action(async function (options: { scope: CalendarListParams["scope"]; page?: number }) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const params: CalendarListParams & { page?: number } = { scope: options.scope };
      if (options.page !== undefined) {
        params.page = options.page;
      }
      const data = await context.client.calendars.list(params);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  calendars
    .command("get")
    .description("Show a calendar.")
    .argument("<calendar-id>", "Calendar UUID.")
    .option("--with-events", "Include upcoming events in the response.")
    .option("--include-upcoming-events", "Alias for --with-events.")
    .option("--days <n>", "Days to include when events are included (1-90).", parseDays)
    .action(async function (calendarId: string, options: CalendarGetOptions) {
      const includeEvents = Boolean(options.withEvents || options.includeUpcomingEvents);
      if (options.days !== undefined && !includeEvents) {
        throw new CliError("Option --days requires --with-events or --include-upcoming-events.", {
          code: "usage_error",
          exitCode: EXIT_CODES.usageOrConfigError,
        });
      }
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const params: CalendarRetrieveParams = {};
      if (includeEvents) {
        params.include = "upcoming_events";
        if (options.days !== undefined) {
          params.days = options.days;
        }
      }
      const data = await context.client.calendars.retrieve(calendarId, params);
      renderResult(context.io, normalizeEventData(data), { json: context.json, quiet: context.quiet });
    });

  calendars
    .command("create")
    .description("Create a calendar.")
    .requiredOption("--title <title>", "Calendar title.")
    .option("--description <text>", "Description.")
    .option("--visibility <value>", "Visibility (e.g. PUBLIC).")
    .option("--remote-url <url>", "Remote calendar URL.")
    .option("--org-id <uuid>", "Organization UUID.")
    .option("--manager-username <username>", "Manager username, repeatable.", collectValues)
    .action(async function (options: CalendarWriteOptions) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.calendars.create(calendarCreatePayload(options));
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  calendars
    .command("update")
    .description("Update a calendar.")
    .argument("<calendar-id>", "Calendar UUID.")
    .option("--title <title>", "Calendar title.")
    .option("--description <text>", "Description.")
    .option("--visibility <value>", "Visibility.")
    .option("--remote-url <url>", "Remote calendar URL.")
    .option("--manager-username <username>", "Manager username, repeatable.", collectValues)
    .action(async function (calendarId: string, options: CalendarWriteOptions) {
      const payload = calendarUpdatePayload(options);
      if (Object.keys(payload).length === 0) {
        throw new CliError("No calendar changes provided.", {
          code: "no_changes_provided",
          exitCode: EXIT_CODES.usageOrConfigError,
        });
      }
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.calendars.update(calendarId, payload);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  calendars
    .command("delete")
    .description("Delete a calendar.")
    .argument("<calendar-id>", "Calendar UUID.")
    .action(async function (calendarId: string) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.calendars.delete(calendarId);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  const events = program.command("events").description("Manage events.");
  events
    .command("list")
    .description("List events for a calendar.")
    .requiredOption("--calendar <calendar-id>", "Calendar UUID.")
    .option("--from <date>", "Start date YYYY-MM-DD.", parseIsoDate)
    .option("--to <date>", "End date YYYY-MM-DD.", parseIsoDate)
    .option("--page <page>", "Page number for paginated results.", parsePositiveInteger)
    .action(async function (options: EventListOptions) {
      validateDateRange(options.from, options.to);
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const params = compactPayload({ from: options.from, to: options.to, page: options.page }) as EventListParams;
      const data = await context.client.events.list(options.calendar, params);
      renderResult(context.io, normalizeEventData(data), { json: context.json, quiet: context.quiet });
    });

  events
    .command("create")
    .description("Create an event.")
    .requiredOption("--calendar <calendar-id>", "Calendar UUID.")
    .requiredOption("--summary <text>", "Event title.")
    .option("--description <text>", "Description.")
    .option("--location <text>", "Location.")
    .option("--start <datetime>", "Start time: ISO-8601 or natural UTC forms like 'today 18:00', 'tomorrow 18:00', 'next week 18:00', 'in 3 days 18:00'.")
    .option("--end <datetime>", "End time: ISO-8601 or natural UTC forms like 'today 20:00', 'tomorrow 20:00', 'next week 20:00', 'in 3 days 20:00'.")
    .option("--start-date <date>", "Start date YYYY-MM-DD.", parseIsoDate)
    .option("--end-date <date>", "End date YYYY-MM-DD.", parseIsoDate)
    .option("--rrule <rrule>", "RFC5545 RRULE.")
    .option("--slots-enabled", "Enable event slots.")
    .option("--no-slots-enabled", "Disable event slots.")
    .option("--recurrences-enabled", "Enable recurrences.")
    .option("--no-recurrences-enabled", "Disable recurrences.")
    .option("--materialize", "Materialize recurring occurrences after saving.")
    .option("--no-materialize", "Do not materialize recurring occurrences after saving.")
    .action(async function (options: EventWriteOptions & { calendar: string }) {
      const payload = eventCreatePayload(options, getOptionalDateTimeParseContext(options, this, env));
      validateEventCreatePayload(payload);
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.events.create(options.calendar, payload);
      renderResult(context.io, normalizeEventData(data), { json: context.json, quiet: context.quiet });
    });

  events
    .command("get")
    .description("Show an event.")
    .argument("<event-id>", "Event UUID.")
    .action(async function (eventId: string) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.events.retrieve(eventId);
      renderResult(context.io, normalizeEventData(data), { json: context.json, quiet: context.quiet });
    });

  events
    .command("move-targets")
    .description("List calendars an event can be moved to.")
    .argument("<event-id>", "Event UUID.")
    .action(async function (eventId: string) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.events.moveTargets(eventId);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  events
    .command("update")
    .description("Update an event.")
    .argument("<event-id>", "Event UUID.")
    .option("--owner-calendar <calendar-id>", "Move the event to this calendar UUID.")
    .option("--summary <text>", "Event title.")
    .option("--description <text>", "Description.")
    .option("--location <text>", "Location.")
    .option("--start <datetime>", "Start time: ISO-8601 or natural UTC forms like 'today 18:00', 'tomorrow 18:00', 'next week 18:00', 'in 3 days 18:00'.")
    .option("--end <datetime>", "End time: ISO-8601 or natural UTC forms like 'today 20:00', 'tomorrow 20:00', 'next week 20:00', 'in 3 days 20:00'.")
    .option("--start-date <date>", "Start date YYYY-MM-DD.", parseIsoDate)
    .option("--end-date <date>", "End date YYYY-MM-DD.", parseIsoDate)
    .option("--rrule <rrule>", "RFC5545 RRULE.")
    .option("--slots-enabled", "Enable event slots.")
    .option("--no-slots-enabled", "Disable event slots.")
    .option("--recurrences-enabled", "Enable recurrences.")
    .option("--no-recurrences-enabled", "Disable recurrences.")
    .option("--materialize", "Materialize recurring occurrences after saving.")
    .option("--no-materialize", "Do not materialize recurring occurrences after saving.")
    .action(async function (eventId: string, options: EventWriteOptions) {
      const payload = eventUpdatePayload(options, getOptionalDateTimeParseContext(options, this, env));
      if (Object.keys(payload).length === 0) {
        throw new CliError("No event changes provided.", {
          code: "no_changes_provided",
          exitCode: EXIT_CODES.usageOrConfigError,
        });
      }
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.events.update(eventId, payload);
      renderResult(context.io, normalizeEventData(data), { json: context.json, quiet: context.quiet });
    });

  events
    .command("delete")
    .description("Delete an event.")
    .argument("<event-id>", "Event UUID.")
    .action(async function (eventId: string) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.events.delete(eventId);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  const slots = program.command("slots").description("Manage event slots and registrations.");
  slots
    .command("list")
    .description("List slots for an event.")
    .requiredOption("--event <event-id>", "Event UUID.", parseUuid)
    .option("--page <page>", "Page number for paginated results.", parsePositiveInteger)
    .action(async function (options: SlotListOptions) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const params = compactPayload({ page: options.page }) as EventSlotListParams;
      const data = await context.client.slots.list(options.event, params);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  slots
    .command("create")
    .description("Create a slot for an event.")
    .requiredOption("--event <event-id>", "Event UUID.", parseUuid)
    .requiredOption("--resource <name>", "Resource name.")
    .requiredOption("--start <datetime>", "Start time: ISO-8601 or natural UTC forms like 'today 18:00', 'tomorrow 18:00', 'next week 18:00', 'in 3 days 18:00'.")
    .requiredOption("--end <datetime>", "End time: ISO-8601 or natural UTC forms like 'today 19:00', 'tomorrow 19:00', 'next week 19:00', 'in 3 days 19:00'.")
    .option("--max-attendees <n>", "Maximum attendees.", parseNonNegativeInteger)
    .option("--allow-multiple-slots", "Allow users to reserve multiple slots.")
    .option("--no-allow-multiple-slots", "Disallow users from reserving multiple slots.")
    .option("--allow-multiple-requests", "Allow users to hold multiple slot requests.")
    .option("--no-allow-multiple-requests", "Disallow users from holding multiple slot requests.")
    .option("--confirmation-type <value>", "Confirmation type (A or C).", parseConfirmationType)
    .option("--show-attendees", "Show confirmed attendees in event detail.")
    .option("--hide-attendees", "Hide confirmed attendees in event detail.")
    .action(async function (options: SlotWriteOptions & { event: string }) {
      const payload = slotCreatePayload(options, getOptionalDateTimeParseContext(options, this, env));
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.slots.create(options.event, payload);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  slots
    .command("get")
    .description("Show a slot.")
    .argument("<slot-id>", "Slot UUID.", parseUuid)
    .action(async function (slotId: string) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.slots.retrieve(slotId);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  slots
    .command("update")
    .description("Update a slot.")
    .argument("<slot-id>", "Slot UUID.", parseUuid)
    .option("--resource <name>", "Resource name.")
    .option("--start <datetime>", "Start time: ISO-8601 or natural UTC forms like 'today 18:00', 'tomorrow 18:00', 'next week 18:00', 'in 3 days 18:00'.")
    .option("--end <datetime>", "End time: ISO-8601 or natural UTC forms like 'today 20:00', 'tomorrow 20:00', 'next week 20:00', 'in 3 days 20:00'.")
    .option("--max-attendees <n>", "Maximum attendees.", parseNonNegativeInteger)
    .option("--allow-multiple-slots", "Allow users to reserve multiple slots.")
    .option("--no-allow-multiple-slots", "Disallow users from reserving multiple slots.")
    .option("--allow-multiple-requests", "Allow users to hold multiple slot requests.")
    .option("--no-allow-multiple-requests", "Disallow users from holding multiple slot requests.")
    .option("--confirmation-type <value>", "Confirmation type (A or C).", parseConfirmationType)
    .option("--show-attendees", "Show confirmed attendees in event detail.")
    .option("--hide-attendees", "Hide confirmed attendees in event detail.")
    .action(async function (slotId: string, options: SlotWriteOptions) {
      const payload = slotUpdatePayload(options, getOptionalDateTimeParseContext(options, this, env));
      if (Object.keys(payload).length === 0) {
        throw new CliError("No slot changes provided.", {
          code: "no_changes_provided",
          exitCode: EXIT_CODES.usageOrConfigError,
        });
      }
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.slots.update(slotId, payload);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  slots
    .command("delete")
    .description("Delete a slot.")
    .argument("<slot-id>", "Slot UUID.", parseUuid)
    .action(async function (slotId: string) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.slots.delete(slotId);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  slots
    .command("register")
    .description("Register for a slot.")
    .argument("<slot-id>", "Slot UUID.", parseUuid)
    .action(async function (slotId: string) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.slots.register(slotId);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  slots
    .command("waitlist")
    .description("Join a slot waitlist.")
    .argument("<slot-id>", "Slot UUID.", parseUuid)
    .action(async function (slotId: string) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.slots.waitlist(slotId);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  slots
    .command("withdraw")
    .description("Withdraw a slot registration.")
    .argument("<slot-id>", "Slot UUID.", parseUuid)
    .action(async function (slotId: string) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.slots.withdraw(slotId);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  const bookmarks = program.command("bookmarks").description("Manage calendar bookmarks.");
  bookmarks
    .command("list")
    .description("List bookmarked calendars.")
    .option("--page <page>", "Page number for paginated results.", parsePositiveInteger)
    .action(async function (options: { page?: number }) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const params = compactPayload({ page: options.page }) as BookmarkListParams;
      const data = await context.client.bookmarks.list(params);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  bookmarks
    .command("add")
    .description("Bookmark a calendar.")
    .argument("<calendar-id>", "Calendar UUID.", parseUuid)
    .action(async function (calendarId: string) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.bookmarks.add(calendarId);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  bookmarks
    .command("remove")
    .description("Remove a calendar bookmark.")
    .argument("<calendar-id>", "Calendar UUID.", parseUuid)
    .action(async function (calendarId: string) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.bookmarks.remove(calendarId);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  const organizations = program.command("organizations").description("View organizations.");
  organizations
    .command("list")
    .description("List organizations.")
    .option("--page <page>", "Page number for paginated results.", parsePositiveInteger)
    .action(async function (options: OrganizationListOptions) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const params = compactPayload({ page: options.page }) as OrganizationListParams;
      const data = await context.client.organizations.list(params);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  organizations
    .command("get")
    .description("Show an organization.")
    .argument("<org-id>", "Organization UUID.", parseUuid)
    .action(async function (orgId: string) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const data = await context.client.organizations.retrieve(orgId);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  organizations
    .command("memberships")
    .description("List memberships for an organization.")
    .argument("<org-id>", "Organization UUID.", parseUuid)
    .option("--page <page>", "Page number for paginated results.", parsePositiveInteger)
    .action(async function (orgId: string, options: MembershipListOptions) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const params = compactPayload({ page: options.page }) as OrganizationMembershipListParams;
      const data = await context.client.organizations.memberships(orgId, params);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  const memberships = program.command("memberships").description("Membership commands.");
  memberships
    .command("list")
    .description("List memberships for an organization.")
    .requiredOption("--org <org-id>", "Organization UUID.", parseUuid)
    .option("--page <page>", "Page number for paginated results.", parsePositiveInteger)
    .action(async function (options: MembershipListOptions & { org: string }) {
      const context = createActionContext(this, env, runtime.io ?? DEFAULT_IO, clientFactory);
      const params = compactPayload({ page: options.page }) as OrganizationMembershipListParams;
      const data = await context.client.organizations.memberships(options.org, params);
      renderResult(context.io, data, { json: context.json, quiet: context.quiet });
    });

  return program;
}

function createActionContext(
  command: Command,
  env: CliEnv,
  io: IoStreams,
  clientFactory: (options: { baseUrl: string; token: string }) => VooshClient,
): ActionContext {
  const config = resolveConfig(getGlobals(command), env);
  const token = requireToken(config);
  return {
    client: clientFactory({ baseUrl: config.apiUrl, token }),
    config,
    json: config.json,
    quiet: config.quiet,
    io,
  };
}

function createCommandContext(command: Command, env: CliEnv, io: IoStreams): CommandContext {
  const config = resolveConfig(getGlobals(command), env);
  return {
    config,
    json: config.json,
    quiet: config.quiet,
    io,
  };
}

function getGlobals(command: Command): {
  json?: boolean;
  quiet?: boolean;
  apiUrl?: string;
  profile?: string;
  timezone?: string;
  color?: boolean;
} {
  return command.optsWithGlobals() as {
    json?: boolean;
    quiet?: boolean;
    apiUrl?: string;
    profile?: string;
    timezone?: string;
    color?: boolean;
  };
}

function authStatusData(config: CliConfig, code?: string): Record<string, unknown> {
  return compactPayload({
    code,
    profile: config.profile,
    config_path: config.configPath,
    base_url: config.apiUrl,
    api_url: config.apiUrl,
    api_url_source: config.apiUrlSource,
    token_configured: Boolean(config.token),
    token_source: config.tokenSource,
    token_preview: previewToken(config.token),
  });
}

function normalizeToken(value: string): string {
  const token = value.trim();
  if (!token) {
    throw new CliError("Token must not be empty.", {
      code: "invalid_token",
      exitCode: EXIT_CODES.usageOrConfigError,
    });
  }
  return token;
}

function configShowData(config: CliConfig): Record<string, unknown> {
  return {
    profile: config.profile,
    config_path: config.configPath,
    base_url: config.apiUrl,
    api_url: config.apiUrl,
    api_url_source: config.apiUrlSource,
    token_configured: Boolean(config.token),
    token_source: config.tokenSource,
  };
}

function parsePositiveInteger(value: string): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new InvalidArgumentError("Expected a positive integer.");
  }
  return parsed;
}

function parseNonNegativeInteger(value: string): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new InvalidArgumentError("Expected a non-negative integer.");
  }
  return parsed;
}

function parseUuid(value: string): string {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) {
    throw new InvalidArgumentError("Expected a UUID.");
  }
  return value;
}

function parseConfirmationType(value: string): EventSlotCreatePayload["confirmation_type"] {
  if (value !== "A" && value !== "C") {
    throw new InvalidArgumentError("Expected confirmation type A or C.");
  }
  return value;
}

function parseDays(value: string): number {
  const parsed = parsePositiveInteger(value);
  if (parsed > 90) {
    throw new InvalidArgumentError("Expected an integer between 1 and 90.");
  }
  return parsed;
}

function collectValues(value: string, previous: string[] | undefined): string[] {
  return [...(previous ?? []), value];
}

function calendarCreatePayload(options: CalendarWriteOptions): CalendarCreatePayload {
  return compactPayload({
    title: options.title,
    description: options.description,
    visibility: options.visibility,
    remote_url: options.remoteUrl,
    org_id: options.orgId,
    manager_usernames: options.managerUsername,
  }) as CalendarCreatePayload;
}

function calendarUpdatePayload(options: CalendarWriteOptions): CalendarUpdatePayload {
  return compactPayload({
    title: options.title,
    description: options.description,
    visibility: options.visibility,
    remote_url: options.remoteUrl,
    manager_usernames: options.managerUsername,
  }) as CalendarUpdatePayload;
}

function eventCreatePayload(options: EventWriteOptions, dateTimeContext?: DateTimeParseContext): EventCreatePayload {
  return eventPayload(options, dateTimeContext) as EventCreatePayload;
}

function eventUpdatePayload(options: EventWriteOptions, dateTimeContext?: DateTimeParseContext): EventUpdatePayload {
  return eventPayload(options, dateTimeContext) as EventUpdatePayload;
}

function slotCreatePayload(options: SlotWriteOptions, dateTimeContext?: DateTimeParseContext): EventSlotCreatePayload {
  return slotPayload(options, dateTimeContext) as EventSlotCreatePayload;
}

function slotUpdatePayload(options: SlotWriteOptions, dateTimeContext?: DateTimeParseContext): EventSlotUpdatePayload {
  return slotPayload(options, dateTimeContext) as EventSlotUpdatePayload;
}

function slotPayload(options: SlotWriteOptions, dateTimeContext?: DateTimeParseContext): Record<string, string | number | boolean> {
  return compactPayload({
    resource: options.resource,
    start: normalizeDateTimeOption(options.start, dateTimeContext),
    end: normalizeDateTimeOption(options.end, dateTimeContext),
    max_attendees: options.maxAttendees,
    allow_multiple_slots: options.allowMultipleSlots,
    allow_multiple_requests: options.allowMultipleRequests,
    confirmation_type: options.confirmationType,
    show_attendees: normalizeShowAttendees(options),
  }) as Record<string, string | number | boolean>;
}

function normalizeShowAttendees(options: SlotWriteOptions): boolean | undefined {
  if (options.showAttendees && options.hideAttendees) {
    throw new CliError("Options --show-attendees and --hide-attendees cannot be used together.", {
      code: "conflicting_slot_visibility_options",
      exitCode: EXIT_CODES.usageOrConfigError,
    });
  }
  if (options.hideAttendees) {
    return false;
  }
  return options.showAttendees;
}

function eventPayload(options: EventWriteOptions, dateTimeContext?: DateTimeParseContext): Record<string, string | boolean> {
  const payload = compactPayload({
    owner_calendar_id: options.ownerCalendar,
    summary: options.summary,
    description: options.description,
    location: options.location,
    start: normalizeDateTimeOption(options.start, dateTimeContext),
    end: normalizeDateTimeOption(options.end, dateTimeContext),
    start_date: options.startDate,
    end_date: options.endDate,
    rrule: options.rrule,
    slots_enabled: options.slotsEnabled,
    recurrences_enabled: options.recurrencesEnabled,
    materialize: options.materialize,
  });

  if (("start_date" in payload || "end_date" in payload) && !("start" in payload) && !("end" in payload)) {
    delete payload.start;
    delete payload.end;
  }

  return payload as Record<string, string | boolean>;
}

function normalizeDateTimeOption(value: string | undefined, context?: DateTimeParseContext): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }
  if (isIsoLikeDateTime(trimmed)) {
    return trimmed;
  }
  if (!context) {
    throw invalidDateTimeError(value);
  }
  return parseNaturalDateTime(trimmed, context);
}

function getOptionalDateTimeParseContext(options: EventWriteOptions, command: Command, env: CliEnv): DateTimeParseContext | undefined {
  if (!requiresNaturalDateTimeParsing(options.start) && !requiresNaturalDateTimeParsing(options.end)) {
    return undefined;
  }
  return getDateTimeParseContext(command, env);
}

function requiresNaturalDateTimeParsing(value: string | undefined): boolean {
  if (value === undefined) {
    return false;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 && !isIsoLikeDateTime(trimmed);
}

function getDateTimeParseContext(command: Command, env: CliEnv): DateTimeParseContext {
  const globals = getGlobals(command);
  const timezone = (globals.timezone ?? env.VOOSH_TIMEZONE ?? "UTC").trim();
  if (timezone !== "UTC") {
    throw new CliError("Only UTC is supported for natural event/slot datetime parsing.", {
      code: "unsupported_timezone",
      exitCode: EXIT_CODES.usageOrConfigError,
      details: { timezone, precedence: "--timezone > VOOSH_TIMEZONE > UTC" },
    });
  }
  return { timezone: "UTC", now: resolveNow(env) };
}

function resolveNow(env: CliEnv): Date {
  if (!env.VOOSH_NOW) {
    return new Date();
  }
  if (!isIsoLikeDateTime(env.VOOSH_NOW)) {
    throw invalidNowError();
  }
  const now = new Date(env.VOOSH_NOW);
  if (Number.isNaN(now.getTime())) {
    throw invalidNowError();
  }
  return now;
}

function invalidNowError(): CliError {
  return new CliError("VOOSH_NOW must be a valid ISO-8601 datetime when set.", {
    code: "invalid_now",
    exitCode: EXIT_CODES.usageOrConfigError,
  });
}

function isIsoLikeDateTime(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
    || /^\d{4}-\d{2}-\d{2}T/.test(value)
    || /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?(Z|[+-]\d{2}:?\d{2})$/.test(value);
}

const MAX_NATURAL_DAY_OFFSET = 36500;

function parseNaturalDateTime(value: string, context: DateTimeParseContext): string {
  const normalized = value.toLowerCase().replace(/\s+/g, " ").trim();
  const match = /^(today|tomorrow|next week|in (\d+) days?) (\d{1,2}):(\d{2})$/.exec(normalized);
  if (!match) {
    throw invalidDateTimeError(value);
  }

  const hours = Number(match[3]);
  const minutes = Number(match[4]);
  if (hours > 23 || minutes > 59) {
    throw invalidDateTimeError(value);
  }

  let dayOffset = 0;
  if (match[1] === "tomorrow") {
    dayOffset = 1;
  } else if (match[1] === "next week") {
    dayOffset = 7;
  } else if (match[2] !== undefined) {
    dayOffset = parseNaturalDayOffset(match[2], value);
  }

  const date = new Date(Date.UTC(
    context.now.getUTCFullYear(),
    context.now.getUTCMonth(),
    context.now.getUTCDate() + dayOffset,
    hours,
    minutes,
    0,
  ));
  if (Number.isNaN(date.getTime())) {
    throw invalidDateTimeError(value);
  }
  return date.toISOString().replace(".000Z", "Z");
}

function parseNaturalDayOffset(value: string, originalValue: string): number {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 0 || parsed > MAX_NATURAL_DAY_OFFSET) {
    throw invalidDateTimeError(originalValue);
  }
  return parsed;
}

function invalidDateTimeError(value: string): CliError {
  return new CliError("Expected ISO-8601 datetime or natural form: today HH:mm, tomorrow HH:mm, next week HH:mm, in N days HH:mm.", {
    code: "invalid_datetime",
    exitCode: EXIT_CODES.usageOrConfigError,
    details: { value },
  });
}

function validateEventCreatePayload(payload: EventCreatePayload): void {
  if (!payload.start && !payload.start_date) {
    throw new CliError("Event create requires --start or --start-date.", {
      code: "missing_event_start",
      exitCode: EXIT_CODES.usageOrConfigError,
    });
  }
}

function parseIsoDate(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new InvalidArgumentError("Expected date format YYYY-MM-DD.");
  }
  return value;
}

function validateDateRange(from: string | undefined, to: string | undefined): void {
  if (from !== undefined && to !== undefined && from > to) {
    throw new CliError("Option --from must be earlier than or equal to --to.", {
      code: "invalid_date_range",
      exitCode: EXIT_CODES.usageOrConfigError,
    });
  }
}

function compactPayload<T extends Record<string, unknown>>(payload: T): Partial<T> {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined)) as Partial<T>;
}

function normalizeEventData(value: unknown): unknown {
  if (isEventShape(value)) {
    const normalized = { ...value };
    const start = normalized.start;
    const isAllDay = start === undefined || start === null || (typeof start === "string" && start.trim() === "");
    normalized.all_day = isAllDay;
    if (isAllDay) {
      delete normalized.start;
      delete normalized.end;
    }
    return normalized;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeEventData(item));
  }

  if (isRecord(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeEventData(item)]));
  }

  return value;
}

function isEventShape(value: unknown): value is Record<string, unknown> & { summary: unknown; start?: unknown; start_date?: unknown } {
  return isRecord(value) && "summary" in value && ("start" in value || "start_date" in value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseCalendarListScope(value: string): CalendarListParams["scope"] {
  if (!CALENDAR_LIST_SCOPES.includes(value as NonNullable<CalendarListParams["scope"]>)) {
    throw new InvalidArgumentError(`Expected one of: ${CALENDAR_LIST_SCOPES.join(", ")}.`);
  }
  return value as CalendarListParams["scope"];
}

function requireApiOperation(operationId: string): ApiOperation {
  const operation = API_OPERATION_BY_ID.get(operationId);
  if (!operation) {
    throw new CliError(`Unknown API operation: ${operationId}`, {
      code: "unknown_api_operation",
      exitCode: EXIT_CODES.usageOrConfigError,
      details: { operation_id: operationId, hint: "Run `voosh api operations` to list operation IDs." },
    });
  }
  return operation;
}

function filterApiOperations(options: ApiOperationsOptions): ApiOperation[] {
  const tag = options.tag?.toLowerCase();
  const method = options.method?.toUpperCase();
  const search = options.search?.toLowerCase();
  return API_OPERATIONS.filter((operation) => {
    if (tag && !operation.tags.some((candidate) => candidate.toLowerCase() === tag)) return false;
    if (method && operation.method !== method) return false;
    if (search) {
      const haystack = [
        operation.operationId,
        operation.path,
        operation.summary ?? "",
        operation.description ?? "",
      ].join(" ").toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    return true;
  });
}

function apiOperationData(operation: ApiOperation): Record<string, unknown> {
  return {
    operation_id: operation.operationId,
    method: operation.method,
    path: operation.path,
    tags: operation.tags,
    summary: operation.summary,
    description: operation.description,
    parameters: operation.parameters,
    request_body_required: operation.requestBodyRequired,
    request_content_types: operation.requestContentTypes,
    request_schemas: operation.requestSchemas,
    response_statuses: operation.responseStatuses,
    required_scopes: operation.requiredScopes,
    conditional_scopes: operation.conditionalScopes,
    anonymous_allowed: operation.anonymousAllowed,
  };
}

function collectPathValue(value: string, previous: NamedValue[]): NamedValue[] {
  return [...previous, parseNamedValue(value, "--path")];
}

function collectQueryValue(value: string, previous: NamedValue[]): NamedValue[] {
  return [...previous, parseNamedValue(value, "--query")];
}

function collectHeaderValue(value: string, previous: NamedValue[]): NamedValue[] {
  return [...previous, parseNamedValue(value, "--header")];
}

function collectFormValue(value: string, previous: NamedValue[]): NamedValue[] {
  return [...previous, parseNamedValue(value, "--form")];
}

function collectFileValue(value: string, previous: NamedFile[]): NamedFile[] {
  return [...previous, parseNamedFile(value)];
}

function hasJsonFlag(argv: string[]): boolean {
  return argv.includes("--json");
}

function configureCommandForRun(command: Command, io: IoStreams, json: boolean): void {
  command.exitOverride();
  command.configureOutput({
    writeOut: (text) => io.stdout.write(text),
    writeErr: (text) => {
      if (!json) {
        io.stderr.write(text);
      }
    },
  });
  for (const child of command.commands) {
    configureCommandForRun(child, io, json);
  }
}

function isCommanderError(error: unknown): error is CommanderError {
  if (error instanceof CommanderError) {
    return true;
  }
  if (!(error instanceof Error)) {
    return false;
  }
  const maybeCommanderError = error as Error & { code?: unknown; exitCode?: unknown };
  return typeof maybeCommanderError.code === "string"
    && maybeCommanderError.code.startsWith("commander.")
    && typeof maybeCommanderError.exitCode === "number";
}

function commanderUsageError(error: CommanderError): CliError {
  return new CliError(error.message, {
    code: "usage_error",
    exitCode: EXIT_CODES.usageOrConfigError,
  });
}
