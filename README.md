# @voosh/cli

Node.js CLI for the voo.sh API.

This repository is a standalone CLI-only public repo. It does not depend on a sibling `@voosh/sdk` package: the current voo.sh OpenAPI contract, generated TypeScript schema, and client are bundled locally. Common calendar workflows have ergonomic commands, while `voosh api` discovers, describes, and calls every operation in the bundled API contract. The CLI currently exposes all 86 v1 operations.

## Install from npm

```bash
npm install -g @voosh/cli
voosh --help
```

The package does not publish with `@voosh/sdk` as a runtime dependency; the internal `src/client.ts` client and generated schema are bundled into the CLI entrypoint during `yarn build`. The CLI keeps `commander` as a small external runtime dependency so Node can load Commander through its supported package entrypoint.

## Install and develop

```bash
yarn install
yarn run check
```

For local development, the package uses only this repository's internal schema/client sources; there is no sibling SDK dependency. `yarn run check` builds a bundled CLI artifact and runs both unit-style command tests and the built-entrypoint integration tests against a local mock HTTP server. To run only the offline integration tests after a build, use `yarn run test:integration`.

Before publishing, run:

```bash
yarn run check
npm pack --dry-run
```

The pack output should contain package metadata, the README, `SKILL.md`, the bundled OpenAPI contract, and built `dist` files; source, tests, and `node_modules` are excluded by the package `files` whitelist.

### Sync the API contract

When the voo.sh server repository is available at `../voosh`, refresh the bundled contract and generated sources with:

```bash
yarn sync:openapi
yarn run check
```

Pass another schema path to `yarn sync:openapi -- /path/to/openapi.yaml` when the server checkout is elsewhere. Commit the OpenAPI snapshot and both generated TypeScript files together.

### Optional live E2E smoke tests

Live E2E tests are intentionally opt-in and are not part of `yarn run check` or the default CI workflow. They build the CLI and run `dist/index.js` against the real voo.sh API using explicit live-test environment variables:

```bash
VOOSH_RUN_LIVE_E2E=1 \
VOOSH_E2E_BASE_URL=https://api.example.test \
VOOSH_E2E_CHRIS_TOKEN=... \
yarn run test:e2e:live
```

Required variables:

- `VOOSH_RUN_LIVE_E2E=1` enables the live suite. Without it, the suite is skipped with a reason.
- `VOOSH_E2E_BASE_URL` is the live API base URL. Do not include secrets in this URL.
- `VOOSH_E2E_CHRIS_TOKEN` is the API token used by the built CLI as `VOOSH_API_TOKEN`.

The current live suite performs an authenticated smoke check plus calendar, event, and slot create/read/update/list/delete lifecycles using resources with a `voosh-cli-live-e2e-` prefix so cleanup is scoped to resources created by the test. It also exercises optional flows when fixture secrets are present:

- `VOOSH_E2E_OTTO_TOKEN` enables slot registration/withdrawal as a second user.
- `VOOSH_E2E_ORG_ID` enables organization detail and membership checks.
- `VOOSH_E2E_BOOKMARK_CALENDAR_ID` or `VOOSH_E2E_CALENDAR_ID` enables bookmark add/list/remove checks.

A manual GitHub Actions workflow, `Live E2E`, is available through `workflow_dispatch` only. Configure required repository secrets (`VOOSH_E2E_BASE_URL`, `VOOSH_E2E_CHRIS_TOKEN`) before running it; the workflow fails fast when required secrets are missing. Optional fixture secrets enable the broader smoke checks listed above.

## Usage

```bash
VOOSH_API_TOKEN=... voosh me show
VOOSH_API_TOKEN=... voosh calendars list --scope managed --json
VOOSH_API_TOKEN=... voosh calendars get <calendar-id> --with-events --days 14
VOOSH_API_TOKEN=... voosh events create --calendar <calendar-id> --summary "Training" --start "tomorrow 18:00" --end "tomorrow 20:00"
VOOSH_API_TOKEN=... voosh slots register <slot-id> --json
VOOSH_API_TOKEN=... voosh bookmarks add <calendar-id>
VOOSH_API_TOKEN=... voosh memberships list --org <org-id>
voosh --json api operations --tag organizations
voosh --json api describe organization_asset_create
VOOSH_API_TOKEN=... voosh --json api call me_update --body '{"language":"en"}'
voosh --profile work config set-base-url https://api.example.test
voosh --profile work auth login --token ... --no-verify
```

Global flags:

- `--json` emits stable JSON output.
- `--quiet` suppresses successful human output. JSON output is still emitted.
- `--api-url <url>` overrides `VOOSH_API_URL`, profile config, and defaults to `https://voo.sh`.
- `--profile <name>` selects the stored profile, defaulting to `default`.
- `--timezone <zone>` selects the timezone for natural event/slot datetimes. Precedence is `--timezone > VOOSH_TIMEZONE > UTC`; only `UTC` is currently supported.
- `--no-color` disables color support. The CLI currently avoids color by default.

Environment variables:

- `VOOSH_API_TOKEN` overrides profile tokens for API commands.
- `VOOSH_API_URL` configures the API host when `--api-url` is not provided and overrides profile config.
- `VOOSH_CONFIG_PATH` overrides the JSON config file path, useful for tests and automation.
- `VOOSH_TIMEZONE` provides the default natural-datetime timezone when `--timezone` is not provided; only `UTC` is currently supported.
- `VOOSH_NOW` overrides the current time for deterministic natural-datetime parsing in tests/automation. Set it to an ISO-8601 datetime.

Config profiles are stored as JSON at `VOOSH_CONFIG_PATH` when set. Otherwise the path is deterministic from the environment: `%APPDATA%/voosh/config.json`, `$XDG_CONFIG_HOME/voosh/config.json`, `$HOME/.config/voosh/config.json`, or `./.voosh/config.json` when no home env is supplied. The file shape is `{ "profiles": { "default": { "apiUrl": "...", "token": "..." } } }`.

## Natural date/time input

Event and slot `--start`/`--end` options accept ISO-8601 datetimes unchanged. They also accept these natural UTC forms:

- `today HH:mm`
- `tomorrow HH:mm`
- `next week HH:mm`
- `in N days HH:mm`

Examples:

```bash
VOOSH_NOW=2026-01-02T09:00:00Z voosh events create --calendar <calendar-id> --summary Training --start "tomorrow 18:00" --end "in 3 days 20:00"
voosh --timezone UTC slots create --event <event-id> --resource "Lane 1" --start "next week 18:00" --end "next week 19:00"
```

Unsupported natural forms and unsupported timezones return stable JSON usage errors in `--json` mode, for example `invalid_datetime`, `invalid_now`, or `unsupported_timezone`.

## Implemented commands

- `voosh me show`
- `voosh auth login --token TOKEN [--verify|--no-verify]`
- `voosh auth logout`
- `voosh auth status`
- `voosh config show`
- `voosh config set-base-url URL`
- `voosh api operations [--tag TAG] [--method METHOD] [--search TEXT]`
- `voosh api describe <operation-id>`
- `voosh api call <operation-id> [request options]`
- `voosh calendars list [--scope accessible|bookmarked|favorites|managed|related|sidebar] [--page N]`
- `voosh calendars get <calendar-id> [--with-events|--include-upcoming-events] [--days N]`
- `voosh calendars create --title TITLE [--description TEXT] [--visibility VALUE] [--remote-url URL] [--org-id UUID] [--manager-username USERNAME]...`
- `voosh calendars update <calendar-id> [--title TITLE] [--description TEXT] [--visibility VALUE] [--remote-url URL] [--manager-username USERNAME]...`
- `voosh calendars delete <calendar-id>`
- `voosh events list --calendar CALENDAR_ID [--from YYYY-MM-DD] [--to YYYY-MM-DD] [--page N]`
- `voosh events create --calendar CALENDAR_ID --summary TEXT (--start DATETIME|--start-date YYYY-MM-DD) [--end DATETIME] [--end-date YYYY-MM-DD] [--description TEXT] [--location TEXT] [--rrule RRULE] [--slots-enabled|--no-slots-enabled] [--recurrences-enabled|--no-recurrences-enabled] [--materialize|--no-materialize]`
- `voosh events get <event-id>`
- `voosh events update <event-id> [event fields...]`
- `voosh events delete <event-id>`
- `voosh slots list --event EVENT_ID [--page N]`
- `voosh slots create --event EVENT_ID --resource NAME --start DATETIME --end DATETIME [--max-attendees N] [--allow-multiple-slots|--no-allow-multiple-slots] [--allow-multiple-requests|--no-allow-multiple-requests] [--confirmation-type A|C] [--show-attendees|--hide-attendees]`
- `voosh slots get <slot-id>`
- `voosh slots update <slot-id> [slot fields...]`
- `voosh slots delete <slot-id>`
- `voosh slots register <slot-id>`
- `voosh slots waitlist <slot-id>`
- `voosh slots withdraw <slot-id>`
- `voosh bookmarks list [--page N]`
- `voosh bookmarks add <calendar-id>`
- `voosh bookmarks remove <calendar-id>`
- `voosh organizations list [--page N]`
- `voosh organizations get <org-id>`
- `voosh organizations memberships <org-id> [--page N]`
- `voosh memberships list --org ORG_ID [--page N]`

## Complete API access

Use the generic API commands for functionality without a dedicated convenience command, including API tokens, invitations, calendar composition, ICS import and refresh, event occurrences and materialization, slot generators, registration management and audit data, organization membership administration, assets, Discourse integration, and location lookup.

```bash
# Find operation IDs, optionally filtered by tag, method, or text.
voosh --json api operations --tag organizations --method POST

# Inspect path/query parameters, request content types, responses, and scopes.
voosh --json api describe organization_asset_create

# Send JSON. Prefer a file for complex or shell-sensitive payloads.
voosh --json api call calendar_composition_replace \
  --path calendar_id=<calendar-uuid> \
  --body-file ./composition.json

# Repeat --query when an operation accepts repeated values.
voosh --json api call events_list --query from=2026-08-01 --query to=2026-08-31

# Upload multipart assets or ICS files.
voosh --json api call organization_asset_create \
  --path org_id=<organization-uuid> \
  --form type=image \
  --form label='Demo banner' \
  --file file=./banner.webp
```

`api call` supports repeatable `--path NAME=VALUE`, `--query NAME=VALUE`, and `--header NAME=VALUE`; either `--body JSON` or `--body-file PATH`; and repeatable multipart `--form NAME=VALUE` and `--file NAME=PATH`. It sends the configured bearer token by default. Use `--anonymous` only when deliberately calling an operation without credentials. Binary responses are represented as base64 in JSON output.

## Stable JSON error shape

When `--json` is set, errors are emitted to stderr as:

```json
{
  "error": {
    "code": "permission_denied",
    "message": "Token is missing the required scope.",
    "status": 403,
    "requestId": "optional-request-id",
    "details": {}
  }
}
```

`details` may contain the raw API error body or CLI validation details. Stable local validation codes include `usage_error`, `unknown_api_operation`, `missing_path_parameter`, `invalid_json_body`, `body_file_unreadable`, `upload_file_unreadable`, `missing_api_token`, `invalid_token`, `no_changes_provided`, `invalid_date_range`, `missing_event_start`, `invalid_datetime`, `invalid_now`, `unsupported_timezone`, and `conflicting_slot_visibility_options`.

## Exit codes

- `0`: success
- `1`: API or unexpected runtime error
- `2`: usage or local configuration error, such as a missing API token

## Boundaries

- The generic operation runner provides complete contract coverage; dedicated convenience commands remain intentionally focused on frequent workflows.
- Natural date parsing is deliberately bounded to UTC and the four supported forms above. Use explicit ISO-8601 values for other timezones.
- Live E2E smoke coverage is opt-in via `yarn run test:e2e:live`; default checks remain offline and deterministic.
