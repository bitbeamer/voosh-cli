# @voosh/cli

Node.js CLI for the voosh API.

This repository is a standalone CLI-only public repo. It does not depend on a sibling `@voosh/sdk` package: the OpenAPI schema and TypeScript API client are internalized under `src/generated/schema.ts` and `src/client.ts`, and the build bundles that local client into `dist/index.js`. The CLI implements agent-friendly auth/config/profile management, stable JSON output, and Python CLI parity command groups for the current v1 slice.

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

The pack output should contain only package metadata/README plus built `dist` files; source, tests, and `node_modules` are excluded by the package `files` whitelist.

### Optional live E2E smoke tests

Live E2E tests are intentionally opt-in and are not part of `yarn run check` or the default CI workflow. They build the CLI and run `dist/index.js` against a real voosh API using explicit live-test environment variables:

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
voosh --profile work config set-base-url https://api.example.test
voosh --profile work auth login --token ... --no-verify
```

Global flags:

- `--json` emits stable JSON output.
- `--quiet` suppresses successful human output. JSON output is still emitted.
- `--api-url <url>` overrides `VOOSH_API_URL`, profile config, and defaults to `http://localhost:8000`.
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
- `voosh calendars list [--scope accessible|managed|bookmarked] [--page N]`
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

`details` may contain the raw API error body or CLI validation details. Stable local validation codes include `usage_error`, `missing_api_token`, `invalid_token`, `no_changes_provided`, `invalid_date_range`, `missing_event_start`, `invalid_datetime`, `invalid_now`, `unsupported_timezone`, and `conflicting_slot_visibility_options`.

## Exit codes

- `0`: success
- `1`: API or unexpected runtime error
- `2`: usage or local configuration error, such as a missing API token

## Remaining gaps

The Python CLI remains the parity reference. The current Node CLI covers the v1 command groups listed above. Known remaining gaps are intentionally small and documented for follow-up:

- Natural date parsing is deliberately bounded to UTC and the four supported forms above; broader locale/timezone parsing is not implemented yet.
- Organization/member management remains read-only in the Node CLI because the current parity slice only exposed organization and membership listing/retrieval commands.
- Live E2E smoke coverage is opt-in via `yarn run test:e2e:live` and the manual GitHub Actions workflow, so default checks remain offline and deterministic.
