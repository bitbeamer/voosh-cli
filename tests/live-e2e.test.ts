import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, describe, expect, it } from "vitest";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = resolve(__dirname, "..");
const CLI_ENTRYPOINT = join(PACKAGE_ROOT, "dist", "index.js");
const COMMAND_TIMEOUT_MS = 20_000;

const liveEnabled = process.env.VOOSH_RUN_LIVE_E2E === "1";
const missingRequiredEnv = ["VOOSH_E2E_BASE_URL", "VOOSH_E2E_CHRIS_TOKEN"].filter((name) => !process.env[name]?.trim());
const skipReason = !liveEnabled
  ? "set VOOSH_RUN_LIVE_E2E=1 to run live E2E tests"
  : missingRequiredEnv.length > 0
    ? `missing required live E2E env: ${missingRequiredEnv.join(", ")}`
    : undefined;

if (skipReason) {
  console.warn(`Skipping voosh live E2E: ${skipReason}.`);
}

const describeLive = skipReason ? describe.skip : describe;
const createdCalendarIds: string[] = [];
const createdEventIds: string[] = [];
const createdSlotIds: string[] = [];
const bookmarkCalendarIdsToRemove: string[] = [];
let tempConfigDir: string | undefined;

interface LiveResources {
  prefix: string;
  calendarId: string;
  eventId: string;
  slotId: string;
}

let resources: LiveResources | undefined;

afterAll(async () => {
  if (!liveEnabled || missingRequiredEnv.length > 0) {
    return;
  }

  for (const calendarId of [...bookmarkCalendarIdsToRemove].reverse()) {
    await runCli(["--json", "--quiet", "bookmarks", "remove", calendarId], { allowFailure: true });
  }
  for (const slotId of [...createdSlotIds].reverse()) {
    await runCli(["--json", "--quiet", "slots", "delete", slotId], { allowFailure: true });
  }
  for (const eventId of [...createdEventIds].reverse()) {
    await runCli(["--json", "--quiet", "events", "delete", eventId], { allowFailure: true });
  }
  for (const calendarId of [...createdCalendarIds].reverse()) {
    await runCli(["--json", "--quiet", "calendars", "delete", calendarId], { allowFailure: true });
  }
  if (tempConfigDir) {
    await rm(tempConfigDir, { recursive: true, force: true });
  }
});

describeLive(`voosh live E2E (${skipReason ?? "enabled"})`, () => {
  it("shows the authenticated user and lists calendars against the live API", async () => {
    const me = await runCli(["--json", "me", "show"]);
    const calendars = await runCli(["--json", "calendars", "list", "--scope", "accessible"]);

    expect(me.status).toBe(0);
    expect(calendars.status).toBe(0);
    expect(JSON.parse(me.stdout)).toMatchObject({ username: expect.any(String) });
    expect(JSON.parse(calendars.stdout)).toMatchObject({ results: expect.any(Array) });
    expect(me.stderr).toBe("");
    expect(calendars.stderr).toBe("");
  }, 30_000);

  it("creates, reads, updates, lists, and deletes calendar/event/slot resources", async () => {
    const prefix = `voosh-cli-live-e2e-${Date.now()}`;
    const eventStart = futureIsoDate(14, 18);
    const eventEnd = futureIsoDate(14, 20);
    const slotStart = futureIsoDate(14, 18);
    const slotEnd = futureIsoDate(14, 19);

    const createdCalendar = await runCli([
      "--json",
      "calendars",
      "create",
      "--title",
      `${prefix} calendar`,
      "--description",
      "Created by voosh-cli live E2E; safe to delete.",
    ]);
    expect(createdCalendar.status).toBe(0);
    const calendarCreate = JSON.parse(createdCalendar.stdout) as { calendar?: { calendar_id?: string; title?: string } };
    expect(calendarCreate).toMatchObject({ calendar: { calendar_id: expect.any(String), title: `${prefix} calendar` } });
    const calendarId = calendarCreate.calendar!.calendar_id!;
    createdCalendarIds.push(calendarId);

    const readCalendar = await runCli(["--json", "calendars", "get", calendarId, "--with-events", "--days", "30"]);
    expect(readCalendar.status).toBe(0);
    expect(JSON.parse(readCalendar.stdout)).toMatchObject({ calendar_id: calendarId });

    const updatedCalendar = await runCli([
      "--json",
      "calendars",
      "update",
      calendarId,
      "--title",
      `${prefix} calendar updated`,
    ]);
    expect(updatedCalendar.status).toBe(0);
    expect(JSON.parse(updatedCalendar.stdout)).toMatchObject({ calendar: { calendar_id: calendarId, title: `${prefix} calendar updated` } });

    const createdEvent = await runCli([
      "--json",
      "events",
      "create",
      "--calendar",
      calendarId,
      "--summary",
      `${prefix} event`,
      "--start",
      eventStart,
      "--end",
      eventEnd,
      "--slots-enabled",
    ]);
    expect(createdEvent.status).toBe(0);
    const event = JSON.parse(createdEvent.stdout) as { event_id?: string; summary?: string; owner_calendar_id?: string };
    expect(event).toMatchObject({ event_id: expect.any(String), summary: `${prefix} event` });
    createdEventIds.push(event.event_id!);

    const listedEvents = await runCli(["--json", "events", "list", "--calendar", calendarId]);
    expect(listedEvents.status).toBe(0);
    expect(JSON.parse(listedEvents.stdout)).toMatchObject({ results: expect.any(Array) });

    const updatedEvent = await runCli([
      "--json",
      "events",
      "update",
      event.event_id!,
      "--summary",
      `${prefix} event updated`,
    ]);
    expect(updatedEvent.status).toBe(0);
    expect(JSON.parse(updatedEvent.stdout)).toMatchObject({ event_id: event.event_id, summary: `${prefix} event updated` });

    const readEvent = await runCli(["--json", "events", "get", event.event_id!]);
    expect(readEvent.status).toBe(0);
    expect(JSON.parse(readEvent.stdout)).toMatchObject({ event_id: event.event_id, summary: `${prefix} event updated` });

    const createdSlot = await runCli([
      "--json",
      "slots",
      "create",
      "--event",
      event.event_id!,
      "--resource",
      `${prefix} slot`,
      "--start",
      slotStart,
      "--end",
      slotEnd,
      "--max-attendees",
      "2",
      "--confirmation-type",
      "C",
      "--show-attendees",
    ]);
    expect(createdSlot.status).toBe(0);
    const slot = JSON.parse(createdSlot.stdout) as { slot_id?: string; resource?: string; event_id?: string };
    expect(slot).toMatchObject({ slot_id: expect.any(String), resource: `${prefix} slot` });
    createdSlotIds.push(slot.slot_id!);

    const listedSlots = await runCli(["--json", "slots", "list", "--event", event.event_id!]);
    expect(listedSlots.status).toBe(0);
    expect(JSON.parse(listedSlots.stdout)).toMatchObject({ results: expect.any(Array) });

    const readSlot = await runCli(["--json", "slots", "get", slot.slot_id!]);
    expect(readSlot.status).toBe(0);
    expect(JSON.parse(readSlot.stdout)).toMatchObject({ slot_id: slot.slot_id, resource: `${prefix} slot` });

    const updatedSlot = await runCli(["--json", "slots", "update", slot.slot_id!, "--resource", `${prefix} slot updated`]);
    expect(updatedSlot.status).toBe(0);
    expect(JSON.parse(updatedSlot.stdout)).toMatchObject({ slot_id: slot.slot_id, resource: `${prefix} slot updated` });

    resources = { prefix, calendarId: calendarId, eventId: event.event_id!, slotId: slot.slot_id! };
  }, 90_000);

  it("registers and withdraws from the created slot when an attendee token is configured", async () => {
    if (!process.env.VOOSH_E2E_OTTO_TOKEN?.trim()) {
      console.warn("Skipping slot registration live E2E: set VOOSH_E2E_OTTO_TOKEN to exercise attendee flows.");
      return;
    }
    expect(resources).toBeDefined();

    const registration = await runCli(["--json", "slots", "register", resources!.slotId], {
      allowFailure: true,
      token: process.env.VOOSH_E2E_OTTO_TOKEN,
    });
    if (registration.status === 1 && registration.stderr.includes('"status": 404')) {
      console.warn("Skipping slot registration live E2E: attendee token cannot view the created private slot.");
      return;
    }
    expect(registration.status).toBe(0);
    expect(JSON.parse(registration.stdout)).toMatchObject({ status: expect.any(String) });

    const withdrawn = await runCli(["--json", "slots", "withdraw", resources!.slotId], { token: process.env.VOOSH_E2E_OTTO_TOKEN });
    expect(withdrawn.status).toBe(0);
  }, 45_000);

  it("adds, lists, and removes a bookmark when a bookmark fixture calendar is configured", async () => {
    const calendarId = process.env.VOOSH_E2E_BOOKMARK_CALENDAR_ID?.trim() || process.env.VOOSH_E2E_CALENDAR_ID?.trim();
    if (!calendarId) {
      console.warn("Skipping bookmark live E2E: set VOOSH_E2E_BOOKMARK_CALENDAR_ID or VOOSH_E2E_CALENDAR_ID.");
      return;
    }

    const beforeList = await runCli(["--json", "bookmarks", "list"]);
    expect(beforeList.status).toBe(0);
    if (JSON.stringify(JSON.parse(beforeList.stdout)).includes(calendarId)) {
      console.warn(`Skipping bookmark mutation live E2E: fixture calendar ${calendarId} is already bookmarked.`);
      return;
    }

    const added = await runCli(["--json", "bookmarks", "add", calendarId]);
    expect(added.status).toBe(0);
    bookmarkCalendarIdsToRemove.push(calendarId);

    const listed = await runCli(["--json", "bookmarks", "list"]);
    expect(listed.status).toBe(0);
    expect(JSON.stringify(JSON.parse(listed.stdout))).toContain(calendarId);

    const removed = await runCli(["--json", "bookmarks", "remove", calendarId]);
    expect(removed.status).toBe(0);
    bookmarkCalendarIdsToRemove.pop();
  }, 45_000);

  it("lists organizations and fixture memberships when an organization fixture is configured", async () => {
    const organizations = await runCli(["--json", "organizations", "list"]);
    expect(organizations.status).toBe(0);
    expect(JSON.parse(organizations.stdout)).toMatchObject({ results: expect.any(Array) });

    const orgId = process.env.VOOSH_E2E_ORG_ID?.trim();
    if (!orgId) {
      console.warn("Skipping organization detail live E2E: set VOOSH_E2E_ORG_ID.");
      return;
    }

    const org = await runCli(["--json", "organizations", "get", orgId]);
    expect(org.status).toBe(0);
    expect(JSON.parse(org.stdout)).toMatchObject({ organization_id: orgId });

    const memberships = await runCli(["--json", "organizations", "memberships", orgId]);
    expect(memberships.status).toBe(0);
    expect(JSON.parse(memberships.stdout)).toMatchObject({ results: expect.any(Array) });
  }, 45_000);

  it("cleans up the created resources", async () => {
    expect(resources).toBeDefined();

    const deletedSlot = await runCli(["--json", "slots", "delete", resources!.slotId]);
    expect(deletedSlot.status).toBe(0);
    createdSlotIds.pop();

    const deletedEvent = await runCli(["--json", "events", "delete", resources!.eventId]);
    expect(deletedEvent.status).toBe(0);
    createdEventIds.pop();

    const deletedCalendar = await runCli(["--json", "calendars", "delete", resources!.calendarId]);
    expect(deletedCalendar.status).toBe(0);
    createdCalendarIds.pop();
  }, 60_000);
});

interface RunCliOptions {
  allowFailure?: boolean;
  token?: string;
}

async function runCli(args: string[], options: RunCliOptions = {}): Promise<{ status: number; stdout: string; stderr: string }> {
  if (!tempConfigDir) {
    tempConfigDir = await mkdtemp(join(tmpdir(), "voosh-cli-live-e2e-"));
  }

  return new Promise((resolveRun, rejectRun) => {
    execFile(
      process.execPath,
      [CLI_ENTRYPOINT, ...args],
      {
        cwd: PACKAGE_ROOT,
        timeout: COMMAND_TIMEOUT_MS,
        env: {
          ...process.env,
          VOOSH_API_URL: process.env.VOOSH_E2E_BASE_URL,
          VOOSH_API_TOKEN: options.token ?? process.env.VOOSH_E2E_CHRIS_TOKEN,
          VOOSH_CONFIG_PATH: join(tempConfigDir!, "config.json"),
        },
      },
      (error, stdout, stderr) => {
        const status = typeof (error as NodeJS.ErrnoException | null)?.code === "number"
          ? ((error as NodeJS.ErrnoException).code as number)
          : 0;
        if (error && typeof (error as NodeJS.ErrnoException).code !== "number") {
          rejectRun(error);
          return;
        }
        if (!options.allowFailure && status !== 0) {
          rejectRun(new Error(`voosh ${args.join(" ")} exited ${status}; stderr=${stderr}; stdout=${stdout}`));
          return;
        }
        resolveRun({ status, stdout, stderr });
      },
    );
  });
}

function futureIsoDate(daysFromNow: number, hourUtc: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + daysFromNow);
  date.setUTCHours(hourUtc, 0, 0, 0);
  return date.toISOString().replace(".000Z", "Z");
}
