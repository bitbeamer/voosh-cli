---
name: voosh-cli
description: Use the voo.sh command-line client to inspect or manage calendars, events, slots, registrations, organizations, members, assets, invitations, API tokens, calendar composition, ICS sources, and Discourse integration. Use for agent-driven voo.sh workflows, including any current v1 API operation through the generated generic operation runner.
---

# Use the voo.sh CLI

## Understand voo.sh

Treat voo.sh as a collaborative calendar and event platform for individuals and organizations. It supports public and managed calendars, timed and all-day events, recurrence, bookable slots and registrations, organization membership and assets, calendar composition, ICS interoperability, invitations, and Discourse integration.

Use `voosh` for API-backed automation. The production API host is `https://voo.sh`; the public website is `https://www.voo.sh`.

## Configure access

Prefer environment variables in ephemeral automation:

```bash
export VOOSH_API_URL=https://voo.sh
export VOOSH_API_TOKEN='<personal-api-token>'
voosh --json me show
```

Alternatively save named profiles:

```bash
voosh --profile work config set-base-url https://voo.sh
voosh --profile work auth login --token '<personal-api-token>'
voosh --profile work --json me show
```

Never print, commit, or place a token in command history when a protected environment variable or secret store is available. Tokens are permission-scoped; treat `403` as an authorization boundary, not as a reason to bypass checks.

## Work agentically

1. Add `--json` to every command and parse stdout as JSON.
2. Inspect existing resources before mutating them.
3. Prefer the dedicated commands for common calendar, event, slot, bookmark, and organization reads.
4. Use `api operations`, `api describe`, and `api call` for all other API functionality.
5. Re-read the affected resource after a mutation when the API offers a retrieval operation.
6. Report the API error code, HTTP status, detail, and request ID when a call fails.

Do not execute delete, revoke, remove, cancel-all, regenerate-token, disable-integration, or similarly destructive operations unless the user explicitly requests that effect. Avoid retries for non-idempotent operations unless the first request is known not to have reached the server.

## Use common commands

```bash
voosh --json calendars list --scope managed
voosh --json calendars get <calendar-uuid> --with-events --days 30
voosh --json events list --calendar <calendar-uuid> --from 2026-08-01 --to 2026-08-31
voosh --json events get <event-uuid>
voosh --json events move-targets <event-uuid>
voosh --json events update <event-uuid> --owner-calendar <calendar-uuid>
voosh --json slots list --event <event-uuid>
voosh --json bookmarks list
voosh --json organizations list
voosh --json memberships list --org <organization-uuid>
```

Use explicit ISO-8601 datetimes for reliable automation. Event and slot convenience commands accept a limited set of natural UTC expressions, but do not infer a user's timezone.

## Discover and call the complete API

List or search the generated operation catalog:

```bash
voosh --json api operations
voosh --json api operations --tag organizations --method POST
voosh --json api operations --search registration
voosh --json api describe organization_asset_create
```

Inspect an operation before calling it. Supply every required path parameter using its exact OpenAPI name:

```bash
voosh --json api call events_materialize \
  --path event_id=<event-uuid> \
  --body '{}'
```

Pass JSON inline only when it is small and safely quoted. Prefer a body file for complex data:

```bash
voosh --json api call calendar_composition_replace \
  --path calendar_id=<calendar-uuid> \
  --body-file ./composition.json
```

Repeat `--query`, `--header`, `--form`, or `--file` for multiple values. Upload multipart content as follows:

```bash
voosh --json api call organization_asset_create \
  --path org_id=<organization-uuid> \
  --form type=image \
  --form label='Event banner' \
  --file file=./banner.webp
```

The generic runner sends the configured bearer token by default. Use `--anonymous` only to intentionally omit it. It returns JSON and text directly; binary responses use an object containing `content_type`, `encoding: "base64"`, and `data`.

## Respect voo.sh data rules

- Treat calendar, event, slot, organization, membership, asset, and registration identifiers as opaque IDs.
- Preserve Markdown supplied for calendar and event descriptions. Reference only images from the owning organization's asset library.
- Distinguish timed events (`start` and `end`) from all-day events (`start_date` and `end_date`). Do not mix the temporal models.
- Inspect scopes from `api describe`; a token may require read or write scopes specific to the operation.
- Paginate list operations when their response contains `next`; do not assume the first page is complete.

## Interpret failures

Exit code `0` means success, `1` means an API or runtime failure, and `2` means invalid CLI usage or configuration. With `--json`, errors are written to stderr under `error` and include stable fields such as `code`, `message`, `status`, `requestId`, and `details`.

## Maintain API parity

When changing this CLI beside the voo.sh server checkout, refresh and validate the bundled contract:

```bash
yarn sync:openapi
yarn run check
```

Pass a schema path to `yarn sync:openapi -- /path/to/openapi.yaml` if the server is not at `../voosh`. Keep `openapi/openapi.yaml`, `src/generated/schema.ts`, and `src/generated/operations.ts` synchronized.
