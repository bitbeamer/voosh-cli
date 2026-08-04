import { describe, expect, it, vi } from "vitest";
import { VooshApiError, type VooshClient } from "../src/client.js";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

import { run } from "../src/cli.js";

function createIo() {
  return {
    stdout: { write: vi.fn() },
    stderr: { write: vi.fn() },
  };
}

function output(stream: { write: ReturnType<typeof vi.fn> }): string {
  return stream.write.mock.calls.map((call) => String(call[0])).join("");
}

const EVENT_UUID = "11111111-1111-4111-8111-111111111111";
const SLOT_UUID = "22222222-2222-4222-8222-222222222222";
const CALENDAR_UUID = "33333333-3333-4333-8333-333333333333";
const ORG_UUID = "44444444-4444-4444-8444-444444444444";

function createClient(overrides: Partial<VooshClient> = {}): VooshClient {
  const meRetrieve = vi.fn(async () => ({ id: 7, user_id: "user-7", username: "chris", email: "chris@example.test" }));
  const calendar = {
    calendar_id: "cal-1",
    title: "Team",
    organization_id: "org-1",
    owner_username: "chris",
    manager_usernames: [],
    date_created: "2026-01-01T00:00:00Z",
    date_modified: "2026-01-01T00:00:00Z",
  };
  const calendarsList = vi.fn(async () => ({
    count: 1,
    next: null,
    previous: null,
    results: [calendar],
  }));
  const calendarsRetrieve = vi.fn(async () => ({
    ...calendar,
    upcoming_events: [
      {
        event_id: "event-1",
        summary: "All-day training",
        start: "",
        end: "",
      },
      {
        event_id: "event-2",
        summary: "Evening training",
        start: "2026-01-02T18:00:00Z",
        end: "2026-01-02T20:00:00Z",
      },
    ],
  }));
  const calendarsCreate = vi.fn(async () => ({ code: "calendar_created", calendar }));
  const calendarsUpdate = vi.fn(async () => ({ code: "calendar_updated", calendar }));
  const calendarsDelete = vi.fn(async () => ({ code: "calendar_deleted" }));
  const bookmark = {
    bookmark_id: "bookmark-1",
    calendar,
    created_at: "2026-01-01T00:00:00Z",
  };
  const bookmarksList = vi.fn(async () => ({ count: 1, next: null, previous: null, results: [bookmark] }));
  const bookmarksAdd = vi.fn(async () => bookmark);
  const bookmarksRemove = vi.fn(async () => ({ code: "bookmark_deleted" as const }));
  const organization = {
    organization_id: ORG_UUID,
    name: "Club",
    slug: "club",
    description: "Training club",
    code: null,
    trusted: false,
  };
  const membership = {
    membership_id: "membership-1",
    username: "alice",
    role: "U" as const,
    created: "2026-01-01T00:00:00Z",
  };
  const organizationsList = vi.fn(async () => ({ count: 1, next: null, previous: null, results: [organization] }));
  const organizationsRetrieve = vi.fn(async () => organization);
  const organizationsMemberships = vi.fn(async () => ({ count: 1, next: null, previous: null, results: [membership] }));
  const event = {
    event_id: "event-1",
    owner_calendar_id: "cal-1",
    master_event_id: "event-1",
    summary: "Training",
    start: "2026-01-02T18:00:00Z",
    end: "2026-01-02T20:00:00Z",
  };
  const allDayEvent = {
    event_id: "event-2",
    owner_calendar_id: "cal-1",
    master_event_id: "event-2",
    summary: "All-day training",
    start_date: "2026-01-03",
    end_date: "2026-01-03",
  };
  const eventsList = vi.fn(async () => ({
    count: 2,
    next: null,
    previous: null,
    results: [allDayEvent, event],
  }));
  const eventsCreate = vi.fn(async () => event);
  const eventsRetrieve = vi.fn(async () => event);
  const eventsUpdate = vi.fn(async () => ({ ...event, summary: "Updated Training" }));
  const eventsDelete = vi.fn(async () => ({ code: "event_deleted" as const }));
  const slot = {
    slot_id: "slot-1",
    event_id: "event-1",
    resource: "Lane 1",
    start: "2026-01-02T18:00:00Z",
    end: "2026-01-02T19:00:00Z",
    max_attendees: 4,
    allow_multiple_slots: false,
    allow_multiple_requests: true,
    confirmation_type: "C" as const,
    show_attendees: true,
    confirmed_attendees: 1,
    open_seats: 3,
    has_free_seats: true,
  };
  const registration = { registration_id: "reg-1", status: "confirmed", slot };
  const slotsList = vi.fn(async () => ({ count: 1, next: null, previous: null, results: [slot] }));
  const slotsCreate = vi.fn(async () => slot);
  const slotsRetrieve = vi.fn(async () => slot);
  const slotsUpdate = vi.fn(async () => ({ ...slot, resource: "Lane 2" }));
  const slotsDelete = vi.fn(async () => ({ code: "slot_deleted" as const }));
  const slotsRegister = vi.fn(async () => registration);
  const slotsWaitlist = vi.fn(async () => ({ ...registration, status: "waitlisted" }));
  const slotsWithdraw = vi.fn(async () => ({ code: "slot_registration_withdrawn" as const }));
  return {
    raw: {} as VooshClient["raw"],
    me: {
      retrieve: meRetrieve as VooshClient["me"]["retrieve"],
    },
    calendars: {
      list: calendarsList as unknown as VooshClient["calendars"]["list"],
      retrieve: calendarsRetrieve as unknown as VooshClient["calendars"]["retrieve"],
      create: calendarsCreate as unknown as VooshClient["calendars"]["create"],
      update: calendarsUpdate as unknown as VooshClient["calendars"]["update"],
      delete: calendarsDelete as unknown as VooshClient["calendars"]["delete"],
    },
    bookmarks: {
      list: bookmarksList as unknown as VooshClient["bookmarks"]["list"],
      add: bookmarksAdd as unknown as VooshClient["bookmarks"]["add"],
      remove: bookmarksRemove as unknown as VooshClient["bookmarks"]["remove"],
    },
    organizations: {
      list: organizationsList as unknown as VooshClient["organizations"]["list"],
      retrieve: organizationsRetrieve as unknown as VooshClient["organizations"]["retrieve"],
      memberships: organizationsMemberships as unknown as VooshClient["organizations"]["memberships"],
    },
    events: {
      list: eventsList as unknown as VooshClient["events"]["list"],
      create: eventsCreate as unknown as VooshClient["events"]["create"],
      retrieve: eventsRetrieve as unknown as VooshClient["events"]["retrieve"],
      update: eventsUpdate as unknown as VooshClient["events"]["update"],
      delete: eventsDelete as unknown as VooshClient["events"]["delete"],
    },
    slots: {
      list: slotsList as unknown as VooshClient["slots"]["list"],
      create: slotsCreate as unknown as VooshClient["slots"]["create"],
      retrieve: slotsRetrieve as unknown as VooshClient["slots"]["retrieve"],
      update: slotsUpdate as unknown as VooshClient["slots"]["update"],
      delete: slotsDelete as unknown as VooshClient["slots"]["delete"],
      register: slotsRegister as unknown as VooshClient["slots"]["register"],
      waitlist: slotsWaitlist as unknown as VooshClient["slots"]["waitlist"],
      withdraw: slotsWithdraw as unknown as VooshClient["slots"]["withdraw"],
    },
    ...overrides,
  };
}

async function withConfigPath<T>(callback: (configPath: string) => Promise<T>): Promise<T> {
  const dir = await mkdtemp(join(tmpdir(), "voosh-cli-test-"));
  try {
    return await callback(join(dir, "config.json"));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

describe("voosh node CLI", () => {
  it("renders me show as JSON", async () => {
    const io = createIo();
    const client = createClient();

    const exitCode = await run(["--json", "me", "show"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io,
      createClient: () => client,
    });

    expect(exitCode).toBe(0);
    expect(JSON.parse(output(io.stdout))).toMatchObject({ username: "chris" });
    expect(client.me.retrieve).toHaveBeenCalledOnce();
    expect(output(io.stderr)).toBe("");
  });

  it("renders calendars list as human output", async () => {
    const io = createIo();
    const client = createClient();

    const exitCode = await run(["calendars", "list", "--scope", "managed"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io,
      createClient: () => client,
    });

    expect(exitCode).toBe(0);
    expect(output(io.stdout)).toContain("calendar_id: cal-1");
    expect(output(io.stdout)).toContain("title: Team");
    expect(client.calendars.list).toHaveBeenCalledWith({ scope: "managed" });
  });

  it("renders calendars get as JSON and passes upcoming events options", async () => {
    const io = createIo();
    const client = createClient();

    const exitCode = await run([
      "--json",
      "calendars",
      "get",
      "cal-1",
      "--include-upcoming-events",
      "--days",
      "14",
    ], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io,
      createClient: () => client,
    });

    expect(exitCode).toBe(0);
    const body = JSON.parse(output(io.stdout));
    expect(body).toMatchObject({ calendar_id: "cal-1", title: "Team" });
    expect(body.upcoming_events[0]).toMatchObject({ event_id: "event-1", summary: "All-day training", all_day: true });
    expect(body.upcoming_events[0]).not.toHaveProperty("start");
    expect(body.upcoming_events[0]).not.toHaveProperty("end");
    expect(body.upcoming_events[1]).toMatchObject({ event_id: "event-2", all_day: false, start: "2026-01-02T18:00:00Z" });
    expect(client.calendars.retrieve).toHaveBeenCalledWith("cal-1", { include: "upcoming_events", days: 14 });
  });

  it("creates calendars with JSON output and repeatable manager usernames", async () => {
    const io = createIo();
    const client = createClient();

    const exitCode = await run([
      "--json",
      "calendars",
      "create",
      "--title",
      "Team",
      "--description",
      "Training",
      "--visibility",
      "PUBLIC",
      "--remote-url",
      "https://calendar.example.test/team.ics",
      "--org-id",
      "org-1",
      "--manager-username",
      "alice",
      "--manager-username",
      "bob",
    ], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io,
      createClient: () => client,
    });

    expect(exitCode).toBe(0);
    expect(JSON.parse(output(io.stdout))).toMatchObject({ code: "calendar_created" });
    expect(client.calendars.create).toHaveBeenCalledWith({
      title: "Team",
      description: "Training",
      visibility: "PUBLIC",
      remote_url: "https://calendar.example.test/team.ics",
      org_id: "org-1",
      manager_usernames: ["alice", "bob"],
    });
  });

  it("updates calendars with JSON output", async () => {
    const io = createIo();
    const client = createClient();

    const exitCode = await run([
      "--json",
      "calendars",
      "update",
      "cal-1",
      "--title",
      "Updated Team",
      "--manager-username",
      "alice",
    ], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io,
      createClient: () => client,
    });

    expect(exitCode).toBe(0);
    expect(JSON.parse(output(io.stdout))).toMatchObject({ code: "calendar_updated" });
    expect(client.calendars.update).toHaveBeenCalledWith("cal-1", {
      title: "Updated Team",
      manager_usernames: ["alice"],
    });
  });

  it("deletes calendars with JSON output", async () => {
    const io = createIo();
    const client = createClient();

    const exitCode = await run(["--json", "calendars", "delete", "cal-1"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io,
      createClient: () => client,
    });

    expect(exitCode).toBe(0);
    expect(JSON.parse(output(io.stdout))).toEqual({ code: "calendar_deleted" });
    expect(client.calendars.delete).toHaveBeenCalledWith("cal-1");
  });

  it("lists, adds, and removes bookmarks with JSON output", async () => {
    const listIo = createIo();
    const addIo = createIo();
    const removeIo = createIo();
    const client = createClient();

    const listExit = await run(["--json", "bookmarks", "list", "--page", "2"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: listIo,
      createClient: () => client,
    });
    const addExit = await run(["--json", "bookmarks", "add", CALENDAR_UUID], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: addIo,
      createClient: () => client,
    });
    const removeExit = await run(["--json", "bookmarks", "remove", CALENDAR_UUID], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: removeIo,
      createClient: () => client,
    });

    expect(listExit).toBe(0);
    expect(addExit).toBe(0);
    expect(removeExit).toBe(0);
    expect(JSON.parse(output(listIo.stdout)).results[0]).toMatchObject({ bookmark_id: "bookmark-1" });
    expect(JSON.parse(output(addIo.stdout))).toMatchObject({ bookmark_id: "bookmark-1" });
    expect(JSON.parse(output(removeIo.stdout))).toEqual({ code: "bookmark_deleted" });
    expect(client.bookmarks.list).toHaveBeenCalledWith({ page: 2 });
    expect(client.bookmarks.add).toHaveBeenCalledWith(CALENDAR_UUID);
    expect(client.bookmarks.remove).toHaveBeenCalledWith(CALENDAR_UUID);
  });

  it("validates bookmark calendar UUIDs locally", async () => {
    const addIo = createIo();
    const removeIo = createIo();
    const createClientMock = vi.fn(() => createClient());

    const addExit = await run(["--json", "bookmarks", "add", "not-a-uuid"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: addIo,
      createClient: createClientMock,
    });
    const removeExit = await run(["--json", "bookmarks", "remove", "not-a-uuid"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: removeIo,
      createClient: createClientMock,
    });

    expect(addExit).toBe(2);
    expect(removeExit).toBe(2);
    expect(JSON.parse(output(addIo.stderr))).toMatchObject({
      error: { code: "usage_error", message: expect.stringContaining("Expected a UUID") },
    });
    expect(JSON.parse(output(removeIo.stderr))).toMatchObject({
      error: { code: "usage_error", message: expect.stringContaining("Expected a UUID") },
    });
    expect(createClientMock).not.toHaveBeenCalled();
    expect(output(addIo.stdout)).toBe("");
    expect(output(removeIo.stdout)).toBe("");
  });

  it("lists, gets, and lists organization memberships with JSON output", async () => {
    const listIo = createIo();
    const getIo = createIo();
    const membershipsIo = createIo();
    const topLevelMembershipsIo = createIo();
    const client = createClient();

    const listExit = await run(["--json", "organizations", "list", "--page", "2"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: listIo,
      createClient: () => client,
    });
    const getExit = await run(["--json", "organizations", "get", ORG_UUID], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: getIo,
      createClient: () => client,
    });
    const membershipsExit = await run(["--json", "organizations", "memberships", ORG_UUID, "--page", "3"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: membershipsIo,
      createClient: () => client,
    });
    const topLevelMembershipsExit = await run(["--json", "memberships", "list", "--org", ORG_UUID, "--page", "4"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: topLevelMembershipsIo,
      createClient: () => client,
    });

    expect(listExit).toBe(0);
    expect(getExit).toBe(0);
    expect(membershipsExit).toBe(0);
    expect(topLevelMembershipsExit).toBe(0);
    expect(JSON.parse(output(listIo.stdout)).results[0]).toMatchObject({ organization_id: ORG_UUID, name: "Club" });
    expect(JSON.parse(output(getIo.stdout))).toMatchObject({ organization_id: ORG_UUID, slug: "club" });
    expect(JSON.parse(output(membershipsIo.stdout)).results[0]).toMatchObject({ membership_id: "membership-1", username: "alice" });
    expect(JSON.parse(output(topLevelMembershipsIo.stdout)).results[0]).toMatchObject({ membership_id: "membership-1" });
    expect(client.organizations.list).toHaveBeenCalledWith({ page: 2 });
    expect(client.organizations.retrieve).toHaveBeenCalledWith(ORG_UUID);
    expect(client.organizations.memberships).toHaveBeenNthCalledWith(1, ORG_UUID, { page: 3 });
    expect(client.organizations.memberships).toHaveBeenNthCalledWith(2, ORG_UUID, { page: 4 });
  });

  it("validates organization UUIDs locally", async () => {
    const getIo = createIo();
    const membershipsIo = createIo();
    const topLevelMembershipsIo = createIo();
    const createClientMock = vi.fn(() => createClient());

    const getExit = await run(["--json", "organizations", "get", "not-a-uuid"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: getIo,
      createClient: createClientMock,
    });
    const membershipsExit = await run(["--json", "organizations", "memberships", "not-a-uuid"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: membershipsIo,
      createClient: createClientMock,
    });
    const topLevelMembershipsExit = await run(["--json", "memberships", "list", "--org", "not-a-uuid"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: topLevelMembershipsIo,
      createClient: createClientMock,
    });

    expect(getExit).toBe(2);
    expect(membershipsExit).toBe(2);
    expect(topLevelMembershipsExit).toBe(2);
    expect(JSON.parse(output(getIo.stderr))).toMatchObject({
      error: { code: "usage_error", message: expect.stringContaining("Expected a UUID") },
    });
    expect(JSON.parse(output(membershipsIo.stderr))).toMatchObject({
      error: { code: "usage_error", message: expect.stringContaining("Expected a UUID") },
    });
    expect(JSON.parse(output(topLevelMembershipsIo.stderr))).toMatchObject({
      error: { code: "usage_error", message: expect.stringContaining("Expected a UUID") },
    });
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it("lists events with date filters and normalizes JSON event data", async () => {
    const io = createIo();
    const client = createClient();

    const exitCode = await run([
      "--json",
      "events",
      "list",
      "--calendar",
      "cal-1",
      "--from",
      "2026-01-01",
      "--to",
      "2026-01-31",
      "--page",
      "2",
    ], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io,
      createClient: () => client,
    });

    expect(exitCode).toBe(0);
    const body = JSON.parse(output(io.stdout));
    expect(body.results[0]).toMatchObject({ event_id: "event-2", all_day: true, start_date: "2026-01-03" });
    expect(body.results[0]).not.toHaveProperty("start");
    expect(body.results[1]).toMatchObject({ event_id: "event-1", all_day: false, start: "2026-01-02T18:00:00Z" });
    expect(client.events.list).toHaveBeenCalledWith("cal-1", { from: "2026-01-01", to: "2026-01-31", page: 2 });
  });

  it("creates events with JSON output and exact API payload names", async () => {
    const io = createIo();
    const client = createClient();

    const exitCode = await run([
      "--json",
      "events",
      "create",
      "--calendar",
      "cal-1",
      "--summary",
      "Training",
      "--description",
      "Practice",
      "--location",
      "Gym",
      "--start",
      "2026-01-02T18:00:00Z",
      "--end",
      "2026-01-02T20:00:00Z",
      "--rrule",
      "FREQ=WEEKLY",
      "--slots-enabled",
      "--no-recurrences-enabled",
      "--materialize",
    ], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io,
      createClient: () => client,
    });

    expect(exitCode).toBe(0);
    expect(JSON.parse(output(io.stdout))).toMatchObject({ event_id: "event-1", all_day: false });
    expect(client.events.create).toHaveBeenCalledWith("cal-1", {
      summary: "Training",
      description: "Practice",
      location: "Gym",
      start: "2026-01-02T18:00:00Z",
      end: "2026-01-02T20:00:00Z",
      rrule: "FREQ=WEEKLY",
      slots_enabled: true,
      recurrences_enabled: false,
      materialize: true,
    });
  });

  it("creates all-day events without start/end fields", async () => {
    const io = createIo();
    const client = createClient();

    const exitCode = await run([
      "--json",
      "events",
      "create",
      "--calendar",
      "cal-1",
      "--summary",
      "Holiday",
      "--start-date",
      "2026-01-03",
      "--end-date",
      "2026-01-03",
    ], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io,
      createClient: () => client,
    });

    expect(exitCode).toBe(0);
    expect(client.events.create).toHaveBeenCalledWith("cal-1", {
      summary: "Holiday",
      start_date: "2026-01-03",
      end_date: "2026-01-03",
    });
  });

  it("creates events with deterministic natural UTC datetimes", async () => {
    const io = createIo();
    const client = createClient();

    const exitCode = await run([
      "--json",
      "events",
      "create",
      "--calendar",
      "cal-1",
      "--summary",
      "Natural Training",
      "--start",
      "tomorrow 18:00",
      "--end",
      "in 3 days 20:15",
    ], {
      env: { VOOSH_API_TOKEN: "token-123", VOOSH_NOW: "2026-01-02T09:00:00Z" },
      io,
      createClient: () => client,
    });

    expect(exitCode).toBe(0);
    expect(client.events.create).toHaveBeenCalledWith("cal-1", {
      summary: "Natural Training",
      start: "2026-01-03T18:00:00Z",
      end: "2026-01-05T20:15:00Z",
    });
  });

  it("passes ISO event datetimes through unchanged", async () => {
    const io = createIo();
    const client = createClient();

    const exitCode = await run([
      "--json",
      "events",
      "create",
      "--calendar",
      "cal-1",
      "--summary",
      "ISO Training",
      "--start",
      "2026-01-02T18:00:00+01:00",
      "--end",
      "2026-01-02T20:00:00+01:00",
    ], {
      env: { VOOSH_API_TOKEN: "token-123", VOOSH_NOW: "2026-01-02T09:00:00Z" },
      io,
      createClient: () => client,
    });

    expect(exitCode).toBe(0);
    expect(client.events.create).toHaveBeenCalledWith("cal-1", {
      summary: "ISO Training",
      start: "2026-01-02T18:00:00+01:00",
      end: "2026-01-02T20:00:00+01:00",
    });
  });

  it("passes ISO event datetimes through unchanged with non-UTC timezone", async () => {
    const io = createIo();
    const client = createClient();

    const exitCode = await run([
      "--json",
      "events",
      "create",
      "--calendar",
      "cal-1",
      "--summary",
      "ISO Training",
      "--start",
      "2026-01-02T18:00:00Z",
      "--end",
      "2026-01-02T20:00:00Z",
    ], {
      env: { VOOSH_API_TOKEN: "token-123", VOOSH_TIMEZONE: "Europe/Berlin", VOOSH_NOW: "not-a-date" },
      io,
      createClient: () => client,
    });

    expect(exitCode).toBe(0);
    expect(client.events.create).toHaveBeenCalledWith("cal-1", {
      summary: "ISO Training",
      start: "2026-01-02T18:00:00Z",
      end: "2026-01-02T20:00:00Z",
    });
  });

  it("returns stable JSON errors for invalid natural event datetimes without creating a client", async () => {
    const io = createIo();
    const createClientMock = vi.fn(() => createClient());

    const exitCode = await run([
      "--json",
      "events",
      "create",
      "--calendar",
      "cal-1",
      "--summary",
      "Bad Training",
      "--start",
      "next friday 18:00",
    ], {
      env: { VOOSH_API_TOKEN: "token-123", VOOSH_NOW: "2026-01-02T09:00:00Z" },
      io,
      createClient: createClientMock,
    });

    expect(exitCode).toBe(2);
    expect(JSON.parse(output(io.stderr))).toMatchObject({
      error: { code: "invalid_datetime", message: expect.stringContaining("Expected ISO-8601 datetime") },
    });
    expect(createClientMock).not.toHaveBeenCalled();
    expect(output(io.stdout)).toBe("");
  });

  it("returns stable JSON errors for huge natural day offsets without creating a client", async () => {
    const io = createIo();
    const createClientMock = vi.fn(() => createClient());

    const exitCode = await run([
      "--json",
      "events",
      "create",
      "--calendar",
      "cal-1",
      "--summary",
      "Huge Offset Training",
      "--start",
      "in 999999999999999999999999999999 days 18:00",
    ], {
      env: { VOOSH_API_TOKEN: "token-123", VOOSH_NOW: "2026-01-02T09:00:00Z" },
      io,
      createClient: createClientMock,
    });

    expect(exitCode).toBe(2);
    expect(JSON.parse(output(io.stderr))).toMatchObject({ error: { code: "invalid_datetime" } });
    expect(createClientMock).not.toHaveBeenCalled();
    expect(output(io.stdout)).toBe("");
  });

  it("returns stable JSON errors for invalid VOOSH_NOW when natural parsing is needed", async () => {
    const io = createIo();
    const createClientMock = vi.fn(() => createClient());

    const exitCode = await run([
      "--json",
      "events",
      "create",
      "--calendar",
      "cal-1",
      "--summary",
      "Natural Training",
      "--start",
      "today 18:00",
    ], {
      env: { VOOSH_API_TOKEN: "token-123", VOOSH_NOW: "not-a-date" },
      io,
      createClient: createClientMock,
    });

    expect(exitCode).toBe(2);
    expect(JSON.parse(output(io.stderr))).toMatchObject({ error: { code: "invalid_now" } });
    expect(createClientMock).not.toHaveBeenCalled();
    expect(output(io.stdout)).toBe("");
  });

  it("documents timezone precedence in help", async () => {
    const io = createIo();

    const exitCode = await run(["--help"], { io });

    expect(exitCode).toBe(0);
    expect(output(io.stdout)).toContain("--timezone <zone>");
    expect(output(io.stdout)).toContain("VOOSH_TIMEZONE > UTC");
  });

  it("uses --timezone before VOOSH_TIMEZONE and rejects unsupported timezones", async () => {
    const successIo = createIo();
    const errorIo = createIo();
    const client = createClient();
    const createClientMock = vi.fn(() => createClient());

    const successExit = await run([
      "--json",
      "--timezone",
      "UTC",
      "events",
      "create",
      "--calendar",
      "cal-1",
      "--summary",
      "Precedence Training",
      "--start",
      "today 18:00",
    ], {
      env: { VOOSH_API_TOKEN: "token-123", VOOSH_TIMEZONE: "Europe/Berlin", VOOSH_NOW: "2026-01-02T09:00:00Z" },
      io: successIo,
      createClient: () => client,
    });
    const errorExit = await run([
      "--json",
      "events",
      "create",
      "--calendar",
      "cal-1",
      "--summary",
      "Unsupported Timezone Training",
      "--start",
      "today 18:00",
    ], {
      env: { VOOSH_API_TOKEN: "token-123", VOOSH_TIMEZONE: "Europe/Berlin", VOOSH_NOW: "2026-01-02T09:00:00Z" },
      io: errorIo,
      createClient: createClientMock,
    });

    expect(successExit).toBe(0);
    expect(client.events.create).toHaveBeenCalledWith("cal-1", {
      summary: "Precedence Training",
      start: "2026-01-02T18:00:00Z",
    });
    expect(errorExit).toBe(2);
    expect(JSON.parse(output(errorIo.stderr))).toMatchObject({
      error: {
        code: "unsupported_timezone",
        details: { timezone: "Europe/Berlin", precedence: "--timezone > VOOSH_TIMEZONE > UTC" },
      },
    });
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it("creates slots with deterministic natural UTC datetimes", async () => {
    const io = createIo();
    const client = createClient();

    const exitCode = await run([
      "--json",
      "slots",
      "create",
      "--event",
      EVENT_UUID,
      "--resource",
      "Lane 1",
      "--start",
      "next week 18:00",
      "--end",
      "next week 19:00",
    ], {
      env: { VOOSH_API_TOKEN: "token-123", VOOSH_NOW: "2026-01-02T09:00:00Z" },
      io,
      createClient: () => client,
    });

    expect(exitCode).toBe(0);
    expect(client.slots.create).toHaveBeenCalledWith(EVENT_UUID, {
      resource: "Lane 1",
      start: "2026-01-09T18:00:00Z",
      end: "2026-01-09T19:00:00Z",
    });
  });

  it("returns stable JSON errors for invalid natural slot datetimes without creating a client", async () => {
    const io = createIo();
    const createClientMock = vi.fn(() => createClient());

    const exitCode = await run([
      "--json",
      "slots",
      "create",
      "--event",
      EVENT_UUID,
      "--resource",
      "Lane 1",
      "--start",
      "tomorrow 25:00",
      "--end",
      "tomorrow 26:00",
    ], {
      env: { VOOSH_API_TOKEN: "token-123", VOOSH_NOW: "2026-01-02T09:00:00Z" },
      io,
      createClient: createClientMock,
    });

    expect(exitCode).toBe(2);
    expect(JSON.parse(output(io.stderr))).toMatchObject({ error: { code: "invalid_datetime" } });
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it("gets, updates, and deletes events", async () => {
    const getIo = createIo();
    const updateIo = createIo();
    const deleteIo = createIo();
    const client = createClient();

    const getExit = await run(["--json", "events", "get", "event-1"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: getIo,
      createClient: () => client,
    });
    const updateExit = await run(["--json", "events", "update", "event-1", "--summary", "Updated Training", "--no-slots-enabled"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: updateIo,
      createClient: () => client,
    });
    const deleteExit = await run(["--json", "events", "delete", "event-1"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: deleteIo,
      createClient: () => client,
    });

    expect(getExit).toBe(0);
    expect(updateExit).toBe(0);
    expect(deleteExit).toBe(0);
    expect(JSON.parse(output(getIo.stdout))).toMatchObject({ event_id: "event-1" });
    expect(JSON.parse(output(updateIo.stdout))).toMatchObject({ summary: "Updated Training", all_day: false });
    expect(JSON.parse(output(deleteIo.stdout))).toEqual({ code: "event_deleted" });
    expect(client.events.retrieve).toHaveBeenCalledWith("event-1");
    expect(client.events.update).toHaveBeenCalledWith("event-1", { summary: "Updated Training", slots_enabled: false });
    expect(client.events.delete).toHaveBeenCalledWith("event-1");
  });

  it("lists and creates slots with JSON output and exact API payload names", async () => {
    const listIo = createIo();
    const createIoStreams = createIo();
    const client = createClient();

    const listExit = await run(["--json", "slots", "list", "--event", EVENT_UUID, "--page", "2"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: listIo,
      createClient: () => client,
    });
    const createExit = await run([
      "--json",
      "slots",
      "create",
      "--event",
      EVENT_UUID,
      "--resource",
      "Lane 1",
      "--start",
      "2026-01-02T18:00:00Z",
      "--end",
      "2026-01-02T19:00:00Z",
      "--max-attendees",
      "4",
      "--no-allow-multiple-slots",
      "--allow-multiple-requests",
      "--confirmation-type",
      "C",
      "--show-attendees",
    ], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: createIoStreams,
      createClient: () => client,
    });

    expect(listExit).toBe(0);
    expect(createExit).toBe(0);
    expect(JSON.parse(output(listIo.stdout)).results[0]).toMatchObject({ slot_id: "slot-1", resource: "Lane 1" });
    expect(JSON.parse(output(createIoStreams.stdout))).toMatchObject({ slot_id: "slot-1", resource: "Lane 1" });
    expect(client.slots.list).toHaveBeenCalledWith(EVENT_UUID, { page: 2 });
    expect(client.slots.create).toHaveBeenCalledWith(EVENT_UUID, {
      resource: "Lane 1",
      start: "2026-01-02T18:00:00Z",
      end: "2026-01-02T19:00:00Z",
      max_attendees: 4,
      allow_multiple_slots: false,
      allow_multiple_requests: true,
      confirmation_type: "C",
      show_attendees: true,
    });
  });

  it("gets, updates, and deletes slots", async () => {
    const getIo = createIo();
    const updateIo = createIo();
    const deleteIo = createIo();
    const client = createClient();

    const getExit = await run(["--json", "slots", "get", SLOT_UUID], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: getIo,
      createClient: () => client,
    });
    const updateExit = await run([
      "--json",
      "slots",
      "update",
      SLOT_UUID,
      "--resource",
      "Lane 2",
      "--hide-attendees",
    ], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: updateIo,
      createClient: () => client,
    });
    const deleteExit = await run(["--json", "slots", "delete", SLOT_UUID], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: deleteIo,
      createClient: () => client,
    });

    expect(getExit).toBe(0);
    expect(updateExit).toBe(0);
    expect(deleteExit).toBe(0);
    expect(JSON.parse(output(getIo.stdout))).toMatchObject({ slot_id: "slot-1" });
    expect(JSON.parse(output(updateIo.stdout))).toMatchObject({ slot_id: "slot-1", resource: "Lane 2" });
    expect(JSON.parse(output(deleteIo.stdout))).toEqual({ code: "slot_deleted" });
    expect(client.slots.retrieve).toHaveBeenCalledWith(SLOT_UUID);
    expect(client.slots.update).toHaveBeenCalledWith(SLOT_UUID, { resource: "Lane 2", show_attendees: false });
    expect(client.slots.delete).toHaveBeenCalledWith(SLOT_UUID);
  });

  it("updates slots without datetime while ignoring timezone and VOOSH_NOW", async () => {
    const io = createIo();
    const client = createClient();

    const exitCode = await run([
      "--json",
      "slots",
      "update",
      SLOT_UUID,
      "--resource",
      "Lane 2",
    ], {
      env: { VOOSH_API_TOKEN: "token-123", VOOSH_TIMEZONE: "Europe/Berlin", VOOSH_NOW: "not-a-date" },
      io,
      createClient: () => client,
    });

    expect(exitCode).toBe(0);
    expect(client.slots.update).toHaveBeenCalledWith(SLOT_UUID, { resource: "Lane 2" });
  });

  it("runs slot registration actions", async () => {
    const registerIo = createIo();
    const waitlistIo = createIo();
    const withdrawIo = createIo();
    const client = createClient();

    const registerExit = await run(["--json", "slots", "register", SLOT_UUID], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: registerIo,
      createClient: () => client,
    });
    const waitlistExit = await run(["--json", "slots", "waitlist", SLOT_UUID], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: waitlistIo,
      createClient: () => client,
    });
    const withdrawExit = await run(["--json", "slots", "withdraw", SLOT_UUID], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: withdrawIo,
      createClient: () => client,
    });

    expect(registerExit).toBe(0);
    expect(waitlistExit).toBe(0);
    expect(withdrawExit).toBe(0);
    expect(JSON.parse(output(registerIo.stdout))).toMatchObject({ registration_id: "reg-1", status: "confirmed" });
    expect(JSON.parse(output(waitlistIo.stdout))).toMatchObject({ registration_id: "reg-1", status: "waitlisted" });
    expect(JSON.parse(output(withdrawIo.stdout))).toEqual({ code: "slot_registration_withdrawn" });
    expect(client.slots.register).toHaveBeenCalledWith(SLOT_UUID);
    expect(client.slots.waitlist).toHaveBeenCalledWith(SLOT_UUID);
    expect(client.slots.withdraw).toHaveBeenCalledWith(SLOT_UUID);
  });

  it("resolves api url flag before VOOSH_API_URL and passes token to SDK factory", async () => {
    const io = createIo();
    const client = createClient();
    const createClientMock = vi.fn(() => client);

    const exitCode = await run(["--api-url", "https://flag.example.test/", "me", "show"], {
      env: { VOOSH_API_TOKEN: "token-env", VOOSH_API_URL: "https://env.example.test" },
      io,
      createClient: createClientMock,
    });

    expect(exitCode).toBe(0);
    expect(createClientMock).toHaveBeenCalledWith({ baseUrl: "https://flag.example.test", token: "token-env" });
  });

  it("stores profile base URLs and tokens in a deterministic config path", async () => {
    await withConfigPath(async (configPath) => {
      const setIo = createIo();
      const loginIo = createIo();
      const statusIo = createIo();
      const client = createClient();
      const createClientMock = vi.fn(() => client);

      const setExit = await run(["--json", "--profile", "team", "config", "set-base-url", "https://api.example.test/"], {
        env: { VOOSH_CONFIG_PATH: configPath },
        io: setIo,
        createClient: createClientMock,
      });
      const loginExit = await run(["--json", "--profile", "team", "auth", "login", "--token", "profile-token-1234", "--no-verify"], {
        env: { VOOSH_CONFIG_PATH: configPath },
        io: loginIo,
        createClient: createClientMock,
      });
      const statusExit = await run(["--json", "--profile", "team", "auth", "status"], {
        env: { VOOSH_CONFIG_PATH: configPath },
        io: statusIo,
        createClient: createClientMock,
      });

      expect(setExit).toBe(0);
      expect(loginExit).toBe(0);
      expect(statusExit).toBe(0);
      expect(JSON.parse(output(setIo.stdout))).toEqual({
        code: "base_url_saved",
        profile: "team",
        config_path: configPath,
        base_url: "https://api.example.test",
        api_url: "https://api.example.test",
      });
      expect(JSON.parse(output(loginIo.stdout))).toMatchObject({
        code: "saved",
        profile: "team",
        config_path: configPath,
        base_url: "https://api.example.test",
        token_configured: true,
        token_source: "profile",
        token_preview: "prof…1234",
      });
      expect(JSON.parse(output(statusIo.stdout))).toMatchObject({
        profile: "team",
        config_path: configPath,
        base_url: "https://api.example.test",
        api_url_source: "profile",
        token_configured: true,
        token_source: "profile",
        token_preview: "prof…1234",
      });
      expect(JSON.parse(await readFile(configPath, "utf8"))).toEqual({
        profiles: {
          team: {
            apiUrl: "https://api.example.test",
            token: "profile-token-1234",
          },
        },
      });
      expect(createClientMock).not.toHaveBeenCalled();
    });
  });

  it("uses selected profile config for API commands", async () => {
    await withConfigPath(async (configPath) => {
      const io = createIo();
      const client = createClient();
      const createClientMock = vi.fn(() => client);

      await run(["--profile", "work", "config", "set-base-url", "https://work.example.test/"], {
        env: { VOOSH_CONFIG_PATH: configPath },
        io: createIo(),
        createClient: createClientMock,
      });
      await run(["--profile", "work", "auth", "login", "--token", "work-token", "--no-verify"], {
        env: { VOOSH_CONFIG_PATH: configPath },
        io: createIo(),
        createClient: createClientMock,
      });

      const exitCode = await run(["--profile", "work", "me", "show"], {
        env: { VOOSH_CONFIG_PATH: configPath },
        io,
        createClient: createClientMock,
      });

      expect(exitCode).toBe(0);
      expect(createClientMock).toHaveBeenCalledTimes(1);
      expect(createClientMock).toHaveBeenCalledWith({ baseUrl: "https://work.example.test", token: "work-token" });
    });
  });

  it("preserves API URL and token precedence over profile config", async () => {
    await withConfigPath(async (configPath) => {
      const client = createClient();
      const createClientMock = vi.fn(() => client);

      await run(["--profile", "work", "config", "set-base-url", "https://profile.example.test/"], {
        env: { VOOSH_CONFIG_PATH: configPath },
        io: createIo(),
        createClient: createClientMock,
      });
      await run(["--profile", "work", "auth", "login", "--token", "profile-token", "--no-verify"], {
        env: { VOOSH_CONFIG_PATH: configPath },
        io: createIo(),
        createClient: createClientMock,
      });

      await run(["--profile", "work", "me", "show"], {
        env: {
          VOOSH_CONFIG_PATH: configPath,
          VOOSH_API_URL: "https://env.example.test/",
          VOOSH_API_TOKEN: "env-token",
        },
        io: createIo(),
        createClient: createClientMock,
      });
      await run(["--profile", "work", "--api-url", "https://flag.example.test/", "me", "show"], {
        env: {
          VOOSH_CONFIG_PATH: configPath,
          VOOSH_API_URL: "https://env.example.test/",
          VOOSH_API_TOKEN: "env-token",
        },
        io: createIo(),
        createClient: createClientMock,
      });

      expect(createClientMock).toHaveBeenNthCalledWith(1, { baseUrl: "https://env.example.test", token: "env-token" });
      expect(createClientMock).toHaveBeenNthCalledWith(2, { baseUrl: "https://flag.example.test", token: "env-token" });
    });
  });

  it("defaults to production voo.sh host for first-run API commands", async () => {
    await withConfigPath(async (configPath) => {
      const io = createIo();
      const client = createClient();
      const createClientMock = vi.fn(() => client);

      const exitCode = await run(["me", "show"], {
        env: { VOOSH_CONFIG_PATH: configPath, VOOSH_API_TOKEN: "token-123" },
        io,
        createClient: createClientMock,
      });

      expect(exitCode).toBe(0);
      expect(createClientMock).toHaveBeenCalledWith({ baseUrl: "https://voo.sh", token: "token-123" });
    });
  });

  it("auth login verifies by default before saving", async () => {
    await withConfigPath(async (configPath) => {
      const io = createIo();
      const client = createClient();
      const createClientMock = vi.fn(() => client);

      const exitCode = await run(["--json", "--api-url", "https://api.example.test", "auth", "login", "--token", "verify-token"], {
        env: { VOOSH_CONFIG_PATH: configPath },
        io,
        createClient: createClientMock,
      });

      expect(exitCode).toBe(0);
      expect(createClientMock).toHaveBeenCalledWith({ baseUrl: "https://api.example.test", token: "verify-token" });
      expect(client.me.retrieve).toHaveBeenCalledOnce();
      expect(JSON.parse(output(io.stdout))).toMatchObject({
        code: "saved",
        base_url: "https://api.example.test",
        api_url_source: "flag",
        token_configured: true,
      });
      expect(JSON.parse(await readFile(configPath, "utf8"))).toEqual({
        profiles: {
          default: {
            apiUrl: "https://api.example.test",
            token: "verify-token",
          },
        },
      });
    });
  });

  it("rejects blank auth tokens without saving", async () => {
    await withConfigPath(async (configPath) => {
      const io = createIo();
      const createClientMock = vi.fn(() => createClient());

      const exitCode = await run(["--json", "auth", "login", "--token", "   ", "--no-verify"], {
        env: { VOOSH_CONFIG_PATH: configPath },
        io,
        createClient: createClientMock,
      });

      expect(exitCode).toBe(2);
      expect(JSON.parse(output(io.stderr))).toEqual({
        error: {
          code: "invalid_token",
          message: "Token must not be empty.",
        },
      });
      expect(output(io.stdout)).toBe("");
      expect(createClientMock).not.toHaveBeenCalled();
    });
  });

  it("config show reports env overrides without modifying profile config", async () => {
    await withConfigPath(async (configPath) => {
      const io = createIo();

      const exitCode = await run(["--json", "--profile", "team", "config", "show"], {
        env: {
          VOOSH_CONFIG_PATH: configPath,
          VOOSH_API_URL: "https://env.example.test/",
          VOOSH_API_TOKEN: "env-token",
        },
        io,
        createClient: () => createClient(),
      });

      expect(exitCode).toBe(0);
      expect(JSON.parse(output(io.stdout))).toEqual({
        profile: "team",
        config_path: configPath,
        base_url: "https://env.example.test",
        api_url: "https://env.example.test",
        api_url_source: "env",
        token_configured: true,
        token_source: "env",
      });
    });
  });

  it("auth logout removes only the selected profile token", async () => {
    await withConfigPath(async (configPath) => {
      const logoutIo = createIo();
      const statusIo = createIo();

      await run(["--profile", "a", "auth", "login", "--token", "token-a", "--no-verify"], {
        env: { VOOSH_CONFIG_PATH: configPath },
        io: createIo(),
        createClient: () => createClient(),
      });
      await run(["--profile", "b", "auth", "login", "--token", "token-b", "--no-verify"], {
        env: { VOOSH_CONFIG_PATH: configPath },
        io: createIo(),
        createClient: () => createClient(),
      });

      const logoutExit = await run(["--json", "--profile", "a", "auth", "logout"], {
        env: { VOOSH_CONFIG_PATH: configPath },
        io: logoutIo,
        createClient: () => createClient(),
      });
      const statusExit = await run(["--json", "--profile", "b", "auth", "status"], {
        env: { VOOSH_CONFIG_PATH: configPath },
        io: statusIo,
        createClient: () => createClient(),
      });

      expect(logoutExit).toBe(0);
      expect(statusExit).toBe(0);
      expect(JSON.parse(output(logoutIo.stdout))).toEqual({
        code: "token_removed",
        profile: "a",
        config_path: configPath,
      });
      expect(JSON.parse(output(statusIo.stdout))).toMatchObject({
        profile: "b",
        token_configured: true,
        token_source: "profile",
      });
      expect(JSON.parse(await readFile(configPath, "utf8"))).toEqual({
        profiles: {
          a: {},
          b: { token: "token-b" },
        },
      });
    });
  });

  it("emits stable JSON for missing token config errors", async () => {
    const io = createIo();

    const exitCode = await run(["--json", "me", "show"], {
      env: {},
      io,
      createClient: () => createClient(),
    });

    expect(exitCode).toBe(2);
    expect(JSON.parse(output(io.stderr))).toEqual({
      error: {
        code: "missing_api_token",
        message: "No API token configured. Set VOOSH_API_TOKEN or run `voosh auth login --token <token>`.",
      },
    });
    expect(output(io.stdout)).toBe("");
  });

  it("emits stable JSON and exit code 2 for unknown commands in JSON mode", async () => {
    const io = createIo();

    const exitCode = await run(["--json", "unknown"], {
      env: {},
      io,
      createClient: () => createClient(),
    });

    expect(exitCode).toBe(2);
    expect(JSON.parse(output(io.stderr))).toMatchObject({
      error: {
        code: "usage_error",
        message: expect.stringContaining("unknown command"),
      },
    });
    expect(output(io.stdout)).toBe("");
  });

  it("emits stable JSON and exit code 2 for unknown options in JSON mode", async () => {
    const io = createIo();

    const exitCode = await run(["--json", "calendars", "list", "--badflag"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io,
      createClient: () => createClient(),
    });

    expect(exitCode).toBe(2);
    expect(JSON.parse(output(io.stderr))).toMatchObject({
      error: {
        code: "usage_error",
        message: expect.stringContaining("unknown option"),
      },
    });
    expect(output(io.stdout)).toBe("");
  });

  it("emits stable JSON and exit code 2 for invalid page values in JSON mode", async () => {
    const io = createIo();

    const exitCode = await run(["--json", "calendars", "list", "--page", "nope"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io,
      createClient: () => createClient(),
    });

    expect(exitCode).toBe(2);
    expect(JSON.parse(output(io.stderr))).toMatchObject({
      error: {
        code: "usage_error",
        message: expect.stringContaining("Expected a positive integer"),
      },
    });
    expect(output(io.stdout)).toBe("");
  });

  it("validates calendar list scope locally", async () => {
    const io = createIo();
    const createClientMock = vi.fn(() => createClient());

    const exitCode = await run(["--json", "calendars", "list", "--scope", "private"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io,
      createClient: createClientMock,
    });

    expect(exitCode).toBe(2);
    expect(JSON.parse(output(io.stderr))).toMatchObject({
      error: {
        code: "usage_error",
        message: expect.stringContaining("Expected one of: accessible, bookmarked, favorites, managed, related, sidebar"),
      },
    });
    expect(createClientMock).not.toHaveBeenCalled();
    expect(output(io.stdout)).toBe("");
  });

  it("emits stable JSON and exit code 2 for invalid calendar get days", async () => {
    const io = createIo();

    const exitCode = await run(["--json", "calendars", "get", "cal-1", "--with-events", "--days", "91"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io,
      createClient: () => createClient(),
    });

    expect(exitCode).toBe(2);
    expect(JSON.parse(output(io.stderr))).toMatchObject({
      error: {
        code: "usage_error",
        message: expect.stringContaining("Expected an integer between 1 and 90"),
      },
    });
    expect(output(io.stdout)).toBe("");
  });

  it("emits stable JSON and exit code 2 for days without calendar events", async () => {
    const io = createIo();
    const createClientMock = vi.fn(() => createClient());

    const exitCode = await run(["--json", "calendars", "get", "cal-1", "--days", "7"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io,
      createClient: createClientMock,
    });

    expect(exitCode).toBe(2);
    expect(JSON.parse(output(io.stderr))).toMatchObject({
      error: {
        code: "usage_error",
        message: "Option --days requires --with-events or --include-upcoming-events.",
      },
    });
    expect(createClientMock).not.toHaveBeenCalled();
    expect(output(io.stdout)).toBe("");
  });

  it("emits stable JSON and exit code 2 for calendar update without changes", async () => {
    const io = createIo();
    const createClientMock = vi.fn(() => createClient());

    const exitCode = await run(["--json", "calendars", "update", "cal-1"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io,
      createClient: createClientMock,
    });

    expect(exitCode).toBe(2);
    expect(JSON.parse(output(io.stderr))).toMatchObject({
      error: {
        code: "no_changes_provided",
        message: "No calendar changes provided.",
      },
    });
    expect(createClientMock).not.toHaveBeenCalled();
    expect(output(io.stdout)).toBe("");
  });

  it("validates event list date options locally", async () => {
    const invalidDateIo = createIo();
    const rangeIo = createIo();
    const createClientMock = vi.fn(() => createClient());

    const invalidDateExit = await run(["--json", "events", "list", "--calendar", "cal-1", "--from", "20260101"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: invalidDateIo,
      createClient: createClientMock,
    });
    const rangeExit = await run([
      "--json",
      "events",
      "list",
      "--calendar",
      "cal-1",
      "--from",
      "2026-02-01",
      "--to",
      "2026-01-01",
    ], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: rangeIo,
      createClient: createClientMock,
    });

    expect(invalidDateExit).toBe(2);
    expect(rangeExit).toBe(2);
    expect(JSON.parse(output(invalidDateIo.stderr))).toMatchObject({
      error: { code: "usage_error", message: expect.stringContaining("Expected date format YYYY-MM-DD") },
    });
    expect(JSON.parse(output(rangeIo.stderr))).toMatchObject({
      error: { code: "invalid_date_range", message: "Option --from must be earlier than or equal to --to." },
    });
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it("validates event create and update inputs locally", async () => {
    const createEventIo = createIo();
    const updateIo = createIo();
    const createClientMock = vi.fn(() => createClient());

    const createExit = await run(["--json", "events", "create", "--calendar", "cal-1", "--summary", "Training"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: createEventIo,
      createClient: createClientMock,
    });
    const updateExit = await run(["--json", "events", "update", "event-1"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: updateIo,
      createClient: createClientMock,
    });

    expect(createExit).toBe(2);
    expect(updateExit).toBe(2);
    expect(JSON.parse(output(createEventIo.stderr))).toMatchObject({
      error: { code: "missing_event_start", message: "Event create requires --start or --start-date." },
    });
    expect(JSON.parse(output(updateIo.stderr))).toMatchObject({
      error: { code: "no_changes_provided", message: "No event changes provided." },
    });
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it("validates slot inputs locally", async () => {
    const updateIo = createIo();
    const zeroMaxAttendeesIo = createIo();
    const invalidMaxAttendeesIo = createIo();
    const invalidEventIo = createIo();
    const invalidConfirmationIo = createIo();
    const conflictingVisibilityIo = createIo();
    const createClientMock = vi.fn(() => createClient());

    const updateExit = await run(["--json", "slots", "update", SLOT_UUID], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: updateIo,
      createClient: createClientMock,
    });
    const zeroMaxAttendeesExit = await run([
      "--json",
      "slots",
      "create",
      "--event",
      EVENT_UUID,
      "--resource",
      "Lane 1",
      "--start",
      "2026-01-02T18:00:00Z",
      "--end",
      "2026-01-02T19:00:00Z",
      "--max-attendees",
      "0",
    ], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: zeroMaxAttendeesIo,
      createClient: createClientMock,
    });

    const invalidMaxAttendeesExit = await run([
      "--json",
      "slots",
      "create",
      "--event",
      EVENT_UUID,
      "--resource",
      "Lane 1",
      "--start",
      "2026-01-02T18:00:00Z",
      "--end",
      "2026-01-02T19:00:00Z",
      "--max-attendees",
      "-1",
    ], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: invalidMaxAttendeesIo,
      createClient: createClientMock,
    });
    const invalidEventExit = await run(["--json", "slots", "list", "--event", "not-a-uuid"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: invalidEventIo,
      createClient: createClientMock,
    });
    const invalidConfirmationExit = await run([
      "--json",
      "slots",
      "create",
      "--event",
      EVENT_UUID,
      "--resource",
      "Lane 1",
      "--start",
      "2026-01-02T18:00:00Z",
      "--end",
      "2026-01-02T19:00:00Z",
      "--confirmation-type",
      "X",
    ], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: invalidConfirmationIo,
      createClient: createClientMock,
    });
    const conflictingVisibilityExit = await run([
      "--json",
      "slots",
      "update",
      SLOT_UUID,
      "--show-attendees",
      "--hide-attendees",
    ], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: conflictingVisibilityIo,
      createClient: createClientMock,
    });

    expect(updateExit).toBe(2);
    expect(zeroMaxAttendeesExit).toBe(0);
    expect(invalidMaxAttendeesExit).toBe(2);
    expect(invalidEventExit).toBe(2);
    expect(invalidConfirmationExit).toBe(2);
    expect(conflictingVisibilityExit).toBe(2);
    expect(JSON.parse(output(updateIo.stderr))).toMatchObject({
      error: { code: "no_changes_provided", message: "No slot changes provided." },
    });
    expect(JSON.parse(output(invalidMaxAttendeesIo.stderr))).toMatchObject({
      error: { code: "usage_error", message: expect.stringContaining("Expected a non-negative integer") },
    });
    expect(JSON.parse(output(invalidEventIo.stderr))).toMatchObject({
      error: { code: "usage_error", message: expect.stringContaining("Expected a UUID") },
    });
    expect(JSON.parse(output(invalidConfirmationIo.stderr))).toMatchObject({
      error: { code: "usage_error", message: expect.stringContaining("Expected confirmation type A or C") },
    });
    expect(JSON.parse(output(conflictingVisibilityIo.stderr))).toMatchObject({
      error: {
        code: "conflicting_slot_visibility_options",
        message: "Options --show-attendees and --hide-attendees cannot be used together.",
      },
    });
    expect(createClientMock).toHaveBeenCalledTimes(1);
    expect(createClientMock.mock.results[0]?.value.slots.create).toHaveBeenCalledWith(EVENT_UUID, {
      resource: "Lane 1",
      start: "2026-01-02T18:00:00Z",
      end: "2026-01-02T19:00:00Z",
      max_attendees: 0,
    });
  });

  it("accepts all calendar list scope values", async () => {
    for (const scope of ["accessible", "bookmarked", "favorites", "managed", "related", "sidebar"] as const) {
      const io = createIo();
      const client = createClient();

      const exitCode = await run(["calendars", "list", "--scope", scope], {
        env: { VOOSH_API_TOKEN: "token-123" },
        io,
        createClient: () => client,
      });

      expect(exitCode).toBe(0);
      expect(client.calendars.list).toHaveBeenCalledWith({ scope });
    }
  });

  it("discovers and describes every generated API operation without authentication", async () => {
    const operationsIo = createIo();
    const describeIo = createIo();

    const operationsExit = await run([
      "--json",
      "api",
      "operations",
      "--tag",
      "organizations",
      "--method",
      "POST",
    ], { env: {}, io: operationsIo });
    const describeExit = await run([
      "--json",
      "api",
      "describe",
      "organization_asset_create",
    ], { env: {}, io: describeIo });

    expect(operationsExit).toBe(0);
    expect(JSON.parse(output(operationsIo.stdout))).toMatchObject({
      count: expect.any(Number),
      operations: expect.arrayContaining([
        expect.objectContaining({
          operation_id: "organization_asset_create",
          method: "POST",
          path: "/api/v1/organizations/{org_id}/assets",
        }),
      ]),
    });
    expect(describeExit).toBe(0);
    expect(JSON.parse(output(describeIo.stdout))).toMatchObject({
      operation_id: "organization_asset_create",
      request_content_types: expect.arrayContaining(["multipart/form-data"]),
      request_schemas: {
        "multipart/form-data": expect.objectContaining({
          "x-schema-ref": "#/components/schemas/OrganizationAssetUpload",
          required: ["file", "type"],
          properties: expect.objectContaining({
            file: expect.any(Object),
            type: expect.objectContaining({ enum: ["image"] }),
          }),
        }),
      },
      parameters: expect.arrayContaining([expect.objectContaining({ name: "org_id", in: "path" })]),
    });
  });

  it("returns a stable error for an unknown generated API operation", async () => {
    const io = createIo();

    const exitCode = await run(["--json", "api", "describe", "not_an_operation"], { env: {}, io });

    expect(exitCode).toBe(2);
    expect(JSON.parse(output(io.stderr))).toMatchObject({
      error: {
        code: "unknown_api_operation",
        details: { operation_id: "not_an_operation" },
      },
    });
  });

  it("emits stable JSON for SDK API errors", async () => {
    const io = createIo();
    const client = createClient({
      me: {
        retrieve: vi.fn(async () => {
          throw new VooshApiError({
            status: 403,
            body: { code: "permission_denied", detail: "Forbidden." },
            requestId: "request-1",
          });
        }),
      },
    });

    const exitCode = await run(["--json", "me", "show"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io,
      createClient: () => client,
    });

    expect(exitCode).toBe(1);
    expect(JSON.parse(output(io.stderr))).toEqual({
      error: {
        code: "permission_denied",
        message: "Forbidden.",
        status: 403,
        requestId: "request-1",
        details: { code: "permission_denied", detail: "Forbidden." },
      },
    });
  });

  it("quiet suppresses human success output but keeps JSON output", async () => {
    const humanIo = createIo();
    const jsonIo = createIo();

    await run(["--quiet", "me", "show"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: humanIo,
      createClient: () => createClient(),
    });
    await run(["--quiet", "--json", "me", "show"], {
      env: { VOOSH_API_TOKEN: "token-123" },
      io: jsonIo,
      createClient: () => createClient(),
    });

    expect(output(humanIo.stdout)).toBe("");
    expect(JSON.parse(output(jsonIo.stdout))).toMatchObject({ username: "chris" });
  });

  it("includes implemented command groups in help", async () => {
    const io = createIo();

    const exitCode = await run(["--help"], { env: {}, io });

    expect(exitCode).toBe(0);
    expect(output(io.stdout)).toContain("events");
    expect(output(io.stdout)).toContain("slots");
    expect(output(io.stdout)).toContain("bookmarks");
    expect(output(io.stdout)).toContain("organizations");
    expect(output(io.stdout)).toContain("memberships");
    expect(output(io.stdout)).toContain("api");
  });
});
