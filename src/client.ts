import createOpenApiClient, { type Client } from "openapi-fetch";

import type { components, paths } from "./generated/schema.js";

export type ApiErrorBody = components["schemas"] extends { ApiError: infer T } ? T : Record<string, unknown>;
export type CalendarListParams = NonNullable<
  paths["/api/v1/calendars"]["get"]["parameters"]["query"]
>;
export type CalendarListPage = NonNullable<
  paths["/api/v1/calendars"]["get"]["responses"][200]["content"]["application/json"]
>;
export type CalendarRetrieveParams = NonNullable<
  paths["/api/v1/calendars/{calendar_id}"]["get"]["parameters"]["query"]
>;
export type CalendarDetail = NonNullable<
  paths["/api/v1/calendars/{calendar_id}"]["get"]["responses"][200]["content"]["application/json"]
>;
export type CalendarCreatePayload = NonNullable<
  paths["/api/v1/calendars"]["post"]["requestBody"]["content"]["application/json"]
>;
export type CalendarUpdatePayload = NonNullable<
  NonNullable<paths["/api/v1/calendars/{calendar_id}"]["patch"]["requestBody"]>["content"]["application/json"]
>;
export type CalendarSuccess = NonNullable<
  paths["/api/v1/calendars"]["post"]["responses"][201]["content"]["application/json"]
>;
export type CalendarDeleteSuccess = NonNullable<
  paths["/api/v1/calendars/{calendar_id}"]["delete"]["responses"][200]["content"]["application/json"]
>;
export type BookmarkListParams = { page?: number };
export type BookmarkListPage = NonNullable<
  paths["/api/v1/bookmarks"]["get"]["responses"][200]["content"]["application/json"]
>;
export type BookmarkDetail = NonNullable<
  paths["/api/v1/calendars/{calendar_id}/bookmark"]["put"]["responses"][200]["content"]["application/json"]
>;
export interface BookmarkDeleteSuccess {
  code: "bookmark_deleted";
}
export type OrganizationListParams = { page?: number };
export type OrganizationListPage = NonNullable<
  paths["/api/v1/organizations"]["get"]["responses"][200]["content"]["application/json"]
>;
export type OrganizationDetail = NonNullable<
  paths["/api/v1/organizations/{org_id}"]["get"]["responses"][200]["content"]["application/json"]
>;
export type OrganizationMembershipListParams = { page?: number };
export type OrganizationMembershipListPage = NonNullable<
  paths["/api/v1/organizations/{org_id}/memberships"]["get"]["responses"][200]["content"]["application/json"]
>;
export type EventListParams = NonNullable<
  paths["/api/v1/calendars/{calendar_id}/events"]["get"]["parameters"]["query"]
> & { page?: number };
export type EventListPage = NonNullable<
  paths["/api/v1/calendars/{calendar_id}/events"]["get"]["responses"][200]["content"]["application/json"]
>;
export type EventDetail = NonNullable<
  paths["/api/v1/events/{event_id}"]["get"]["responses"][200]["content"]["application/json"]
>;
type GeneratedEventCreatePayload = NonNullable<
  NonNullable<paths["/api/v1/calendars/{calendar_id}/events"]["post"]["requestBody"]>["content"]["application/json"]
>;
export type EventCreatePayload = Omit<GeneratedEventCreatePayload, "materialize"> &
  Partial<Pick<GeneratedEventCreatePayload, "materialize">>;
type GeneratedEventUpdatePayload = NonNullable<
  NonNullable<paths["/api/v1/events/{event_id}"]["patch"]["requestBody"]>["content"]["application/json"]
>;
export type EventUpdatePayload = Omit<GeneratedEventUpdatePayload, "materialize"> &
  Partial<Pick<GeneratedEventUpdatePayload, "materialize">>;
export interface EventDeleteSuccess {
  code: "event_deleted";
}
export type EventSlotListParams = { page?: number };
export type EventSlotListPage = NonNullable<
  paths["/api/v1/events/{event_id}/slots"]["get"]["responses"][200]["content"]["application/json"]
>;
export type EventSlotDetail = NonNullable<
  paths["/api/v1/slots/{slot_id}"]["get"]["responses"][200]["content"]["application/json"]
>;
export type EventSlotCreatePayload = NonNullable<
  paths["/api/v1/events/{event_id}/slots"]["post"]["requestBody"]["content"]["application/json"]
>;
export type EventSlotUpdatePayload = NonNullable<
  NonNullable<paths["/api/v1/slots/{slot_id}"]["patch"]["requestBody"]>["content"]["application/json"]
>;
export type SlotRegistration = NonNullable<
  paths["/api/v1/slots/{slot_id}/registrations/register"]["post"]["responses"][201]["content"]["application/json"]
>;
export interface EventSlotDeleteSuccess {
  code: "slot_deleted";
}
export interface SlotWithdrawSuccess {
  code: "slot_registration_withdrawn";
}
export type UserMe = NonNullable<
  paths["/api/v1/me"]["get"]["responses"][200]["content"]["application/json"]
>;

export interface VooshClientOptions {
  /** Django host URL. Do not include /api/v1 because the schema paths already include it. */
  baseUrl?: string;
  /** Personal API token. Sent as Authorization: Bearer <token>. */
  token?: string;
  /** Static request ID or factory. Per-call options override this value. */
  requestId?: string | (() => string | undefined);
  /** Optional custom fetch implementation for tests, tracing, or non-browser runtimes. */
  fetch?: typeof fetch;
}

export interface RequestOptions {
  requestId?: string;
}

interface InternalRequestOptions extends RequestOptions {
  pageUrl?: string | null;
}

export interface PaginatedPage<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export class VooshApiError extends Error {
  readonly status: number;
  readonly code: string | undefined;
  readonly detail: string | undefined;
  readonly requestId: string | undefined;
  readonly body: unknown;

  constructor(params: { status: number; body: unknown; requestId: string | undefined }) {
    const { code, detail } = normalizeErrorBody(params.body);
    super(detail ?? code ?? `voosh API request failed with status ${params.status}`);
    this.name = "VooshApiError";
    this.status = params.status;
    this.code = code;
    this.detail = detail;
    this.requestId = params.requestId;
    this.body = params.body;
  }
}

export interface VooshClient {
  readonly raw: Client<paths>;
  readonly me: {
    retrieve(options?: RequestOptions): Promise<UserMe>;
  };
  readonly calendars: {
    list(params?: CalendarListParams, options?: InternalRequestOptions): Promise<CalendarListPage>;
    retrieve(calendarId: string, params?: CalendarRetrieveParams, options?: RequestOptions): Promise<CalendarDetail>;
    create(payload: CalendarCreatePayload, options?: RequestOptions): Promise<CalendarSuccess>;
    update(calendarId: string, payload: CalendarUpdatePayload, options?: RequestOptions): Promise<CalendarSuccess>;
    delete(calendarId: string, options?: RequestOptions): Promise<CalendarDeleteSuccess>;
  };
  readonly bookmarks: {
    list(params?: BookmarkListParams, options?: InternalRequestOptions): Promise<BookmarkListPage>;
    add(calendarId: string, options?: RequestOptions): Promise<BookmarkDetail>;
    remove(calendarId: string, options?: RequestOptions): Promise<BookmarkDeleteSuccess>;
  };
  readonly organizations: {
    list(params?: OrganizationListParams, options?: InternalRequestOptions): Promise<OrganizationListPage>;
    retrieve(orgId: string, options?: RequestOptions): Promise<OrganizationDetail>;
    memberships(
      orgId: string,
      params?: OrganizationMembershipListParams,
      options?: InternalRequestOptions,
    ): Promise<OrganizationMembershipListPage>;
  };
  readonly events: {
    list(calendarId: string, params?: EventListParams, options?: RequestOptions): Promise<EventListPage>;
    create(calendarId: string, payload: EventCreatePayload, options?: RequestOptions): Promise<EventDetail>;
    retrieve(eventId: string, options?: RequestOptions): Promise<EventDetail>;
    update(eventId: string, payload: EventUpdatePayload, options?: RequestOptions): Promise<EventDetail>;
    delete(eventId: string, options?: RequestOptions): Promise<EventDeleteSuccess>;
  };
  readonly slots: {
    list(eventId: string, params?: EventSlotListParams, options?: RequestOptions): Promise<EventSlotListPage>;
    create(eventId: string, payload: EventSlotCreatePayload, options?: RequestOptions): Promise<EventSlotDetail>;
    retrieve(slotId: string, options?: RequestOptions): Promise<EventSlotDetail>;
    update(slotId: string, payload: EventSlotUpdatePayload, options?: RequestOptions): Promise<EventSlotDetail>;
    delete(slotId: string, options?: RequestOptions): Promise<EventSlotDeleteSuccess>;
    register(slotId: string, options?: RequestOptions): Promise<SlotRegistration>;
    waitlist(slotId: string, options?: RequestOptions): Promise<SlotRegistration>;
    withdraw(slotId: string, options?: RequestOptions): Promise<SlotWithdrawSuccess>;
  };
}

export function createVooshClient(options: VooshClientOptions = {}): VooshClient {
  const baseUrl = stripTrailingSlash(options.baseUrl ?? "https://voo.sh");
  const fetchImplementation = options.fetch ?? globalThis.fetch;

  if (!fetchImplementation) {
    throw new Error("A fetch implementation is required to use the voosh CLI client in this runtime.");
  }

  const requestContext = new WeakMap<Response, string | undefined>();
  let nextRequestId: string | undefined;

  const authFetch: typeof fetch = async (input, init) => {
    const requestId = nextRequestId ?? resolveRequestId(options.requestId);
    nextRequestId = undefined;

    const headers = new Headers(init?.headers);
    if (options.token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${options.token}`);
    }
    if (requestId && !headers.has("X-Request-ID")) {
      headers.set("X-Request-ID", requestId);
    }

    const response = await fetchImplementation(input, { ...init, headers });
    requestContext.set(response, requestId);
    return response;
  };

  const raw = createOpenApiClient<paths>({ baseUrl, fetch: authFetch });

  function withRequestId<T>(requestId: string | undefined, call: () => Promise<T>): Promise<T> {
    nextRequestId = requestId;
    return call().finally(() => {
      nextRequestId = undefined;
    });
  }

  async function requireData<T>(result: {
    data?: T;
    error?: unknown;
    response: Response;
  }): Promise<T> {
    if (result.error !== undefined || !result.response.ok) {
      throw new VooshApiError({
        status: result.response.status,
        body: result.error,
        requestId: requestContext.get(result.response) ?? result.response.headers.get("X-Request-ID") ?? undefined,
      });
    }
    return result.data as T;
  }

  return {
    raw,
    me: {
      retrieve: (requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<UserMe>(await raw.GET("/api/v1/me")),
        ),
    },
    calendars: {
      list: (params, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () => {
          if (requestOptions?.pageUrl) {
            const response = await authFetch(requestOptions.pageUrl);
            const body = await response.json().catch(() => undefined);
            if (!response.ok) {
              throw new VooshApiError({
                status: response.status,
                body,
                requestId: requestContext.get(response) ?? response.headers.get("X-Request-ID") ?? undefined,
              });
            }
            return body as CalendarListPage;
          }
          return requireData<CalendarListPage>(
            await raw.GET("/api/v1/calendars", { params: { query: params ?? {} } }),
          );
        }),
      retrieve: (calendarId, params, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<CalendarDetail>(
            await raw.GET("/api/v1/calendars/{calendar_id}", {
              params: { path: { calendar_id: calendarId }, query: params ?? {} },
            }),
          ),
        ),
      create: (payload, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<CalendarSuccess>(await raw.POST("/api/v1/calendars", { body: payload })),
        ),
      update: (calendarId, payload, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<CalendarSuccess>(
            await raw.PATCH("/api/v1/calendars/{calendar_id}", {
              params: { path: { calendar_id: calendarId } },
              body: payload,
            }),
          ),
        ),
      delete: (calendarId, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<CalendarDeleteSuccess>(
            await raw.DELETE("/api/v1/calendars/{calendar_id}", {
              params: { path: { calendar_id: calendarId } },
            }),
          ),
        ),
    },
    bookmarks: {
      list: (params, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () => {
          if (requestOptions?.pageUrl) {
            const response = await authFetch(requestOptions.pageUrl);
            const body = await response.json().catch(() => undefined);
            if (!response.ok) {
              throw new VooshApiError({
                status: response.status,
                body,
                requestId: requestContext.get(response) ?? response.headers.get("X-Request-ID") ?? undefined,
              });
            }
            return body as BookmarkListPage;
          }
          return requireData<BookmarkListPage>(
            await raw.GET("/api/v1/bookmarks", { params: { query: params ?? {} } as never }),
          );
        }),
      add: (calendarId, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<BookmarkDetail>(
            await raw.PUT("/api/v1/calendars/{calendar_id}/bookmark", {
              params: { path: { calendar_id: calendarId } },
            }),
          ),
        ),
      remove: (calendarId, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () => {
          await requireData<undefined>(
            await raw.DELETE("/api/v1/calendars/{calendar_id}/bookmark", {
              params: { path: { calendar_id: calendarId } },
            }),
          );
          return { code: "bookmark_deleted" };
        }),
    },
    organizations: {
      list: (params, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () => {
          if (requestOptions?.pageUrl) {
            const response = await authFetch(requestOptions.pageUrl);
            const body = await response.json().catch(() => undefined);
            if (!response.ok) {
              throw new VooshApiError({
                status: response.status,
                body,
                requestId: requestContext.get(response) ?? response.headers.get("X-Request-ID") ?? undefined,
              });
            }
            return body as OrganizationListPage;
          }
          return requireData<OrganizationListPage>(
            await raw.GET("/api/v1/organizations", { params: { query: params ?? {} } as never }),
          );
        }),
      retrieve: (orgId, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<OrganizationDetail>(
            await raw.GET("/api/v1/organizations/{org_id}", {
              params: { path: { org_id: orgId } },
            }),
          ),
        ),
      memberships: (orgId, params, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () => {
          if (requestOptions?.pageUrl) {
            const response = await authFetch(requestOptions.pageUrl);
            const body = await response.json().catch(() => undefined);
            if (!response.ok) {
              throw new VooshApiError({
                status: response.status,
                body,
                requestId: requestContext.get(response) ?? response.headers.get("X-Request-ID") ?? undefined,
              });
            }
            return body as OrganizationMembershipListPage;
          }
          return requireData<OrganizationMembershipListPage>(
            await raw.GET("/api/v1/organizations/{org_id}/memberships", {
              params: { path: { org_id: orgId }, query: params ?? {} } as never,
            }),
          );
        }),
    },
    events: {
      list: (calendarId, params, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<EventListPage>(
            await raw.GET("/api/v1/calendars/{calendar_id}/events", {
              params: { path: { calendar_id: calendarId }, query: params ?? {} },
            }),
          ),
        ),
      create: (calendarId, payload, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<EventDetail>(
            await raw.POST("/api/v1/calendars/{calendar_id}/events", {
              params: { path: { calendar_id: calendarId } },
              body: payload as GeneratedEventCreatePayload,
            }),
          ),
        ),
      retrieve: (eventId, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<EventDetail>(
            await raw.GET("/api/v1/events/{event_id}", {
              params: { path: { event_id: eventId } },
            }),
          ),
        ),
      update: (eventId, payload, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<EventDetail>(
            await raw.PATCH("/api/v1/events/{event_id}", {
              params: { path: { event_id: eventId } },
              body: payload as GeneratedEventUpdatePayload,
            }),
          ),
        ),
      delete: (eventId, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () => {
          await requireData<undefined>(
            await raw.DELETE("/api/v1/events/{event_id}", {
              params: { path: { event_id: eventId } },
            }),
          );
          return { code: "event_deleted" };
        }),
    },
    slots: {
      list: (eventId, params, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<EventSlotListPage>(
            await raw.GET("/api/v1/events/{event_id}/slots", {
              params: { path: { event_id: eventId }, query: params ?? {} } as never,
            }),
          ),
        ),
      create: (eventId, payload, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<EventSlotDetail>(
            await raw.POST("/api/v1/events/{event_id}/slots", {
              params: { path: { event_id: eventId } },
              body: payload,
            }),
          ),
        ),
      retrieve: (slotId, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<EventSlotDetail>(
            await raw.GET("/api/v1/slots/{slot_id}", {
              params: { path: { slot_id: slotId } },
            }),
          ),
        ),
      update: (slotId, payload, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<EventSlotDetail>(
            await raw.PATCH("/api/v1/slots/{slot_id}", {
              params: { path: { slot_id: slotId } },
              body: payload,
            }),
          ),
        ),
      delete: (slotId, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () => {
          await requireData<undefined>(
            await raw.DELETE("/api/v1/slots/{slot_id}", {
              params: { path: { slot_id: slotId } },
            }),
          );
          return { code: "slot_deleted" };
        }),
      register: (slotId, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<SlotRegistration>(
            await raw.POST("/api/v1/slots/{slot_id}/registrations/register", {
              params: { path: { slot_id: slotId } },
            }),
          ),
        ),
      waitlist: (slotId, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () =>
          requireData<SlotRegistration>(
            await raw.POST("/api/v1/slots/{slot_id}/registrations/waitlist", {
              params: { path: { slot_id: slotId } },
            }),
          ),
        ),
      withdraw: (slotId, requestOptions) =>
        withRequestId(requestOptions?.requestId, async () => {
          await requireData<undefined>(
            await raw.POST("/api/v1/slots/{slot_id}/registrations/withdraw", {
              params: { path: { slot_id: slotId } },
            }),
          );
          return { code: "slot_registration_withdrawn" };
        }),
    },
  };
}

export async function* paginate<T>(
  fetchPage: (pageUrl?: string | null) => Promise<PaginatedPage<T>>,
): AsyncGenerator<T, void, void> {
  let pageUrl: string | null | undefined;
  do {
    const page = await fetchPage(pageUrl);
    for (const item of page.results) {
      yield item;
    }
    pageUrl = page.next;
  } while (pageUrl);
}

export async function allPages<T>(
  fetchPage: (pageUrl?: string | null) => Promise<PaginatedPage<T>>,
): Promise<T[]> {
  const items: T[] = [];
  for await (const item of paginate(fetchPage)) {
    items.push(item);
  }
  return items;
}

function resolveRequestId(requestId?: string | (() => string | undefined)): string | undefined {
  if (typeof requestId === "function") {
    return requestId();
  }
  return requestId;
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function normalizeErrorBody(body: unknown): { code: string | undefined; detail: string | undefined } {
  if (!body || typeof body !== "object") {
    return { code: undefined, detail: undefined };
  }

  const record = body as Record<string, unknown>;
  const code = typeof record.code === "string" ? record.code : undefined;
  const detail = typeof record.detail === "string" ? record.detail : undefined;
  return { code, detail };
}
