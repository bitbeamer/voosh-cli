import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { execFile } from "node:child_process";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = resolve(__dirname, "..");
const CLI_ENTRYPOINT = join(PACKAGE_ROOT, "dist", "index.js");

const CALENDAR_UUID = "33333333-3333-4333-8333-333333333333";
const EVENT_UUID = "11111111-1111-4111-8111-111111111111";
const SLOT_UUID = "22222222-2222-4222-8222-222222222222";
const ORG_UUID = "44444444-4444-4444-8444-444444444444";

interface RecordedRequest {
  method: string;
  path: string;
  query: URLSearchParams;
  authorization?: string;
  contentType?: string;
  body?: unknown;
}

const requests: RecordedRequest[] = [];
let baseUrl: string;
let server: ReturnType<typeof createServer>;

beforeAll(async () => {
  server = createServer(async (request, response) => {
    await handleRequest(request, response);
  });
  await new Promise<void>((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Expected HTTP mock server to listen on a TCP port.");
  }
  baseUrl = `http://127.0.0.1:${address.port}`;
});

beforeEach(() => {
  requests.length = 0;
});

afterAll(async () => {
  await new Promise<void>((resolveClose, rejectClose) => {
    server.close((error) => (error ? rejectClose(error) : resolveClose()));
  });
});

describe("voosh built CLI integration", () => {
  it("executes representative completed command groups against the SDK over HTTP", async () => {
    const me = await runCli(["--json", "me", "show"]);
    const calendars = await runCli(["--json", "calendars", "list", "--scope", "managed"]);
    const createdCalendar = await runCli(["--json", "calendars", "create", "--title", "Integration Created"]);
    const event = await runCli([
      "--json",
      "events",
      "create",
      "--calendar",
      CALENDAR_UUID,
      "--summary",
      "Integration Training",
      "--start",
      "tomorrow 18:00",
      "--end",
      "tomorrow 20:00",
    ], { VOOSH_NOW: "2026-01-02T09:00:00Z" });
    const slotRegistration = await runCli(["--json", "slots", "register", SLOT_UUID]);
    const bookmark = await runCli(["--json", "bookmarks", "add", CALENDAR_UUID]);
    const memberships = await runCli(["--json", "memberships", "list", "--org", ORG_UUID, "--page", "2"]);
    const updatedProfile = await runCli([
      "--json",
      "api",
      "call",
      "me_update",
      "--body",
      '{"language":"en"}',
    ]);

    expect(me.status).toBe(0);
    expect(calendars.status).toBe(0);
    expect(createdCalendar.status).toBe(0);
    expect(event.status).toBe(0);
    expect(slotRegistration.status).toBe(0);
    expect(bookmark.status).toBe(0);
    expect(memberships.status).toBe(0);
    expect(updatedProfile.status).toBe(0);
    expect(JSON.parse(me.stdout)).toMatchObject({ username: "integration-user" });
    expect(JSON.parse(calendars.stdout).results[0]).toMatchObject({ calendar_id: CALENDAR_UUID, title: "Integration Team" });
    expect(JSON.parse(createdCalendar.stdout)).toMatchObject({ calendar_id: CALENDAR_UUID, title: "Integration Created" });
    expect(JSON.parse(event.stdout)).toMatchObject({ event_id: EVENT_UUID, summary: "Integration Training", all_day: false });
    expect(JSON.parse(slotRegistration.stdout)).toMatchObject({ registration_id: "registration-1", status: "confirmed" });
    expect(JSON.parse(bookmark.stdout)).toMatchObject({ bookmark_id: "bookmark-1" });
    expect(JSON.parse(memberships.stdout).results[0]).toMatchObject({ membership_id: "membership-1", username: "alice" });
    expect(JSON.parse(updatedProfile.stdout)).toMatchObject({ username: "integration-user", language: "en" });
    expect([me, calendars, createdCalendar, event, slotRegistration, bookmark, memberships, updatedProfile].map((result) => result.stderr)).toEqual(["", "", "", "", "", "", "", ""]);

    expect(requests.map((request) => `${request.method} ${request.path}`)).toEqual([
      "GET /api/v1/me",
      "GET /api/v1/calendars",
      "POST /api/v1/calendars",
      `POST /api/v1/calendars/${CALENDAR_UUID}/events`,
      `POST /api/v1/slots/${SLOT_UUID}/registrations/register`,
      `PUT /api/v1/calendars/${CALENDAR_UUID}/bookmark`,
      `GET /api/v1/organizations/${ORG_UUID}/memberships`,
      "PATCH /api/v1/me",
    ]);
    expect(requests.every((request) => request.authorization === "Bearer integration-token")).toBe(true);
    expect(requests[1]?.query.get("scope")).toBe("managed");
    expect(requests[2]?.contentType).toContain("application/json");
    expect(requests[2]?.body).toMatchObject({ title: "Integration Created" });
    expect(requests[3]?.contentType).toContain("application/json");
    expect(requests[3]?.body).toMatchObject({
      summary: "Integration Training",
      start: "2026-01-03T18:00:00Z",
      end: "2026-01-03T20:00:00Z",
    });
    expect(requests[6]?.query.get("page")).toBe("2");
    expect(requests[7]?.contentType).toContain("application/json");
    expect(requests[7]?.body).toEqual({ language: "en" });
  });

  it("emits stable JSON error shapes for API failures from the built entrypoint", async () => {
    const result = await runCli(["--json", "me", "show"], { VOOSH_API_TOKEN: "forbidden-token" });

    expect(result.status).toBe(1);
    expect(result.stdout).toBe("");
    expect(JSON.parse(result.stderr)).toEqual({
      error: {
        code: "permission_denied",
        message: "Forbidden.",
        status: 403,
        requestId: "mock-request-1",
        details: { code: "permission_denied", detail: "Forbidden." },
      },
    });
  });

  it("emits stable JSON usage errors before making HTTP requests", async () => {
    const result = await runCli(["--json", "bookmarks", "add", "not-a-uuid"]);

    expect(result.status).toBe(2);
    expect(result.stdout).toBe("");
    expect(JSON.parse(result.stderr)).toMatchObject({
      error: { code: "usage_error", message: expect.stringContaining("Expected a UUID") },
    });
    expect(requests).toEqual([]);
  });
});

async function handleRequest(request: IncomingMessage, response: ServerResponse): Promise<void> {
  const url = new URL(request.url ?? "/", baseUrl);
  const body = await readJsonBody(request);
  requests.push({
    method: request.method ?? "GET",
    path: url.pathname,
    query: url.searchParams,
    authorization: request.headers.authorization,
    contentType: request.headers["content-type"],
    body,
  });

  if (request.headers.authorization === "Bearer forbidden-token" && url.pathname === "/api/v1/me") {
    writeJson(response, 403, { code: "permission_denied", detail: "Forbidden." }, { "X-Request-ID": "mock-request-1" });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/v1/me") {
    writeJson(response, 200, { id: 1, user_id: "user-1", username: "integration-user", email: "user@example.test" });
    return;
  }

  if (request.method === "PATCH" && url.pathname === "/api/v1/me") {
    writeJson(response, 200, {
      id: 1,
      user_id: "user-1",
      username: "integration-user",
      email: "user@example.test",
      language: (body as Record<string, unknown>).language,
    });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/v1/calendars") {
    writeJson(response, 200, {
      count: 1,
      next: null,
      previous: null,
      results: [calendar()],
    });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/v1/calendars") {
    const payload = body as Record<string, unknown>;
    writeJson(response, 201, { ...calendar(), title: payload.title });
    return;
  }

  if (request.method === "POST" && url.pathname === `/api/v1/calendars/${CALENDAR_UUID}/events`) {
    const payload = body as Record<string, unknown>;
    writeJson(response, 201, {
      event_id: EVENT_UUID,
      owner_calendar_id: CALENDAR_UUID,
      master_event_id: EVENT_UUID,
      summary: payload.summary,
      start: payload.start,
      end: payload.end,
    });
    return;
  }

  if (request.method === "POST" && url.pathname === `/api/v1/slots/${SLOT_UUID}/registrations/register`) {
    writeJson(response, 201, { registration_id: "registration-1", status: "confirmed", slot: slot() });
    return;
  }

  if (request.method === "PUT" && url.pathname === `/api/v1/calendars/${CALENDAR_UUID}/bookmark`) {
    writeJson(response, 200, { bookmark_id: "bookmark-1", calendar: calendar(), created_at: "2026-01-01T00:00:00Z" });
    return;
  }

  if (request.method === "GET" && url.pathname === `/api/v1/organizations/${ORG_UUID}/memberships`) {
    writeJson(response, 200, {
      count: 1,
      next: null,
      previous: null,
      results: [{ membership_id: "membership-1", username: "alice", role: "U", created: "2026-01-01T00:00:00Z" }],
    });
    return;
  }

  writeJson(response, 404, { code: "not_found", detail: `No mock route for ${request.method} ${url.pathname}` });
}

function runCli(args: string[], env: Record<string, string> = {}): Promise<{ status: number | null; stdout: string; stderr: string }> {
  return new Promise((resolveRun, rejectRun) => {
    execFile(
      process.execPath,
      [CLI_ENTRYPOINT, ...args],
      {
        cwd: PACKAGE_ROOT,
        env: {
          ...process.env,
          VOOSH_API_URL: baseUrl,
          VOOSH_API_TOKEN: "integration-token",
          VOOSH_CONFIG_PATH: join(PACKAGE_ROOT, ".tmp-integration-config.json"),
          ...env,
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
        resolveRun({ status, stdout, stderr });
      },
    );
  });
}

function calendar(): Record<string, unknown> {
  return {
    calendar_id: CALENDAR_UUID,
    title: "Integration Team",
    organization_id: ORG_UUID,
    owner_username: "integration-user",
    manager_usernames: [],
    date_created: "2026-01-01T00:00:00Z",
    date_modified: "2026-01-01T00:00:00Z",
  };
}

function slot(): Record<string, unknown> {
  return {
    slot_id: SLOT_UUID,
    event_id: EVENT_UUID,
    resource: "Lane 1",
    start: "2026-01-03T18:00:00Z",
    end: "2026-01-03T19:00:00Z",
    max_attendees: 4,
    allow_multiple_slots: false,
    allow_multiple_requests: true,
    confirmation_type: "C",
    show_attendees: true,
    confirmed_attendees: 1,
    open_seats: 3,
    has_free_seats: true,
  };
}

async function readJsonBody(request: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  if (chunks.length === 0) {
    return undefined;
  }
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  return raw ? JSON.parse(raw) : undefined;
}

function writeJson(response: ServerResponse, status: number, body: unknown, headers: Record<string, string> = {}): void {
  response.writeHead(status, { "Content-Type": "application/json", ...headers });
  response.end(JSON.stringify(body));
}
