/**
 * Generated from openapi/openapi.yaml by scripts/generate-operations.mjs.
 * Do not edit directly.
 */

export type ApiHttpMethod = "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "TRACE";

export interface ApiOperationParameter {
  name: string;
  in: string;
  required: boolean;
  description?: string;
  type?: string;
  format?: string;
  enum?: readonly unknown[];
}

export interface ApiOperation {
  operationId: string;
  method: ApiHttpMethod;
  path: string;
  tags: readonly string[];
  summary?: string;
  description?: string;
  parameters: readonly ApiOperationParameter[];
  requestBodyRequired: boolean;
  requestContentTypes: readonly string[];
  requestSchemas: Readonly<Record<string, unknown>>;
  responseStatuses: readonly string[];
  requiredScopes: readonly string[];
  conditionalScopes: Readonly<Record<string, unknown>>;
  anonymousAllowed: boolean;
}

export const API_OPERATIONS = [
  {
    "operationId": "bookmarks_list",
    "method": "GET",
    "path": "/api/v1/bookmarks",
    "tags": [
      "bookmarks"
    ],
    "parameters": [],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403"
    ],
    "requiredScopes": [
      "calendars:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendar_bookmark_delete",
    "method": "DELETE",
    "path": "/api/v1/calendars/{calendar_id}/bookmark",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "204",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "calendars:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendar_bookmark_upsert",
    "method": "PUT",
    "path": "/api/v1/calendars/{calendar_id}/bookmark",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "201",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "calendars:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendar_composition_delete",
    "method": "DELETE",
    "path": "/api/v1/calendars/{calendar_id}/composition",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "204"
    ],
    "requiredScopes": [],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendar_composition_ics_source_create",
    "method": "POST",
    "path": "/api/v1/calendars/{calendar_id}/composition/ics-sources",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": true,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
            "format": "uri",
            "maxLength": 2048
          }
        },
        "required": [
          "url"
        ],
        "x-schema-ref": "#/components/schemas/IcsSourceRequest"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
            "format": "uri",
            "maxLength": 2048
          }
        },
        "required": [
          "url"
        ],
        "x-schema-ref": "#/components/schemas/IcsSourceRequest"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
            "format": "uri",
            "maxLength": 2048
          }
        },
        "required": [
          "url"
        ],
        "x-schema-ref": "#/components/schemas/IcsSourceRequest"
      }
    },
    "responseStatuses": [
      "200",
      "201"
    ],
    "requiredScopes": [],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendar_composition_preview",
    "method": "POST",
    "path": "/api/v1/calendars/{calendar_id}/composition/preview",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": true,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "definition": {
            "type": "string",
            "maxLength": 20000
          }
        },
        "required": [
          "definition"
        ],
        "x-schema-ref": "#/components/schemas/CompositionDefinition"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "definition": {
            "type": "string",
            "maxLength": 20000
          }
        },
        "required": [
          "definition"
        ],
        "x-schema-ref": "#/components/schemas/CompositionDefinition"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "definition": {
            "type": "string",
            "maxLength": 20000
          }
        },
        "required": [
          "definition"
        ],
        "x-schema-ref": "#/components/schemas/CompositionDefinition"
      }
    },
    "responseStatuses": [
      "200"
    ],
    "requiredScopes": [],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendar_composition_replace",
    "method": "PUT",
    "path": "/api/v1/calendars/{calendar_id}/composition",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": true,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "definition": {
            "type": "string",
            "maxLength": 20000
          },
          "expected_revision": {
            "type": "integer",
            "minimum": 0
          }
        },
        "required": [
          "definition",
          "expected_revision"
        ],
        "x-schema-ref": "#/components/schemas/CompositionWrite"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "definition": {
            "type": "string",
            "maxLength": 20000
          },
          "expected_revision": {
            "type": "integer",
            "minimum": 0
          }
        },
        "required": [
          "definition",
          "expected_revision"
        ],
        "x-schema-ref": "#/components/schemas/CompositionWrite"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "definition": {
            "type": "string",
            "maxLength": 20000
          },
          "expected_revision": {
            "type": "integer",
            "minimum": 0
          }
        },
        "required": [
          "definition",
          "expected_revision"
        ],
        "x-schema-ref": "#/components/schemas/CompositionWrite"
      }
    },
    "responseStatuses": [
      "200"
    ],
    "requiredScopes": [],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendar_composition_retrieve",
    "method": "GET",
    "path": "/api/v1/calendars/{calendar_id}/composition",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200"
    ],
    "requiredScopes": [],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendar_composition_source_calendars",
    "method": "GET",
    "path": "/api/v1/calendars/{calendar_id}/composition/source-calendars",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      },
      {
        "name": "exclude_calendar_ids",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "page",
        "in": "query",
        "required": false,
        "type": "integer"
      },
      {
        "name": "page_size",
        "in": "query",
        "required": false,
        "type": "integer"
      },
      {
        "name": "search",
        "in": "query",
        "required": false,
        "type": "string"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200"
    ],
    "requiredScopes": [],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendar_composition_validate",
    "method": "POST",
    "path": "/api/v1/calendars/{calendar_id}/composition/validate",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": true,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "definition": {
            "type": "string",
            "maxLength": 20000
          }
        },
        "required": [
          "definition"
        ],
        "x-schema-ref": "#/components/schemas/CompositionDefinition"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "definition": {
            "type": "string",
            "maxLength": 20000
          }
        },
        "required": [
          "definition"
        ],
        "x-schema-ref": "#/components/schemas/CompositionDefinition"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "definition": {
            "type": "string",
            "maxLength": 20000
          }
        },
        "required": [
          "definition"
        ],
        "x-schema-ref": "#/components/schemas/CompositionDefinition"
      }
    },
    "responseStatuses": [
      "200"
    ],
    "requiredScopes": [],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendar_events_create",
    "method": "POST",
    "path": "/api/v1/calendars/{calendar_id}/events",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": true,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "owner_calendar_id": {
            "type": "string",
            "format": "uuid"
          },
          "summary": {
            "type": "string",
            "title": "Titel für den Event",
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "nullable": true,
            "title": "Beschreibung",
            "maxLength": 40000
          },
          "location": {
            "type": "string",
            "nullable": true,
            "title": "Adresse/Ort",
            "maxLength": 255
          },
          "location_name": {
            "type": "string",
            "nullable": true,
            "title": "Ortsname",
            "description": "Name des Ortes aus Google Maps",
            "maxLength": 255
          },
          "location_address": {
            "type": "string",
            "nullable": true,
            "title": "Vollständige Adresse",
            "description": "Formatierte Adresse aus Google Maps",
            "maxLength": 500
          },
          "location_lat": {
            "type": "string",
            "format": "decimal",
            "pattern": "^-?\\d{0,4}(?:\\.\\d{0,8})?$",
            "nullable": true,
            "title": "Breitengrad"
          },
          "location_lng": {
            "type": "string",
            "format": "decimal",
            "pattern": "^-?\\d{0,4}(?:\\.\\d{0,8})?$",
            "nullable": true,
            "title": "Längengrad"
          },
          "location_place_id": {
            "type": "string",
            "nullable": true,
            "description": "Google Places ID für zukünftige API-Aufrufe",
            "maxLength": 255
          },
          "start": {
            "oneOf": [
              {
                "type": "string",
                "format": "date"
              },
              {
                "type": "string",
                "format": "date-time"
              }
            ],
            "description": "ISO 8601 date for an all-day event or ISO 8601 date-time for a timed event. The start and end value types must match; end is exclusive. Timed responses use UTC with a trailing Z; naive date-time inputs are interpreted using tzid, then the authenticated user's timezone, then UTC."
          },
          "end": {
            "oneOf": [
              {
                "type": "string",
                "format": "date"
              },
              {
                "type": "string",
                "format": "date-time"
              }
            ],
            "description": "ISO 8601 date for an all-day event or ISO 8601 date-time for a timed event. The start and end value types must match; end is exclusive. Timed responses use UTC with a trailing Z; naive date-time inputs are interpreted using tzid, then the authenticated user's timezone, then UTC."
          },
          "tzid": {
            "type": "string",
            "nullable": true,
            "title": "Event-Zeitzone",
            "description": "IANA-Zeitzone für die Wall-Clock-Semantik von Serienterminen",
            "maxLength": 100
          },
          "start_fold": {
            "allOf": [
              {
                "enum": [
                  0,
                  1
                ],
                "type": "integer",
                "description": "* `0` - 0\n* `1` - 1",
                "x-schema-ref": "#/components/schemas/StartFoldEnum"
              }
            ],
            "writeOnly": true
          },
          "end_fold": {
            "allOf": [
              {
                "enum": [
                  0,
                  1
                ],
                "type": "integer",
                "description": "* `0` - 0\n* `1` - 1",
                "x-schema-ref": "#/components/schemas/EndFoldEnum"
              }
            ],
            "writeOnly": true
          },
          "rrule": {
            "type": "string",
            "nullable": true,
            "title": "Wiederholungsregel",
            "maxLength": 1000
          },
          "slots_enabled": {
            "type": "boolean",
            "title": "Teilnehmerverwaltung aktivieren"
          },
          "recurrences_enabled": {
            "type": "boolean",
            "title": "Wiederholungen aktivieren"
          },
          "materialize": {
            "type": "boolean",
            "writeOnly": true,
            "default": false
          },
          "recurrence_occurrence_action": {
            "allOf": [
              {
                "enum": [
                  "keep",
                  "delete"
                ],
                "type": "string",
                "description": "* `keep` - keep\n* `delete` - delete",
                "x-schema-ref": "#/components/schemas/RecurrenceOccurrenceActionEnum"
              }
            ],
            "writeOnly": true
          },
          "cover_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "required": [
          "end",
          "start"
        ],
        "x-schema-ref": "#/components/schemas/EventWrite"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "owner_calendar_id": {
            "type": "string",
            "format": "uuid"
          },
          "summary": {
            "type": "string",
            "title": "Titel für den Event",
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "nullable": true,
            "title": "Beschreibung",
            "maxLength": 40000
          },
          "location": {
            "type": "string",
            "nullable": true,
            "title": "Adresse/Ort",
            "maxLength": 255
          },
          "location_name": {
            "type": "string",
            "nullable": true,
            "title": "Ortsname",
            "description": "Name des Ortes aus Google Maps",
            "maxLength": 255
          },
          "location_address": {
            "type": "string",
            "nullable": true,
            "title": "Vollständige Adresse",
            "description": "Formatierte Adresse aus Google Maps",
            "maxLength": 500
          },
          "location_lat": {
            "type": "string",
            "format": "decimal",
            "pattern": "^-?\\d{0,4}(?:\\.\\d{0,8})?$",
            "nullable": true,
            "title": "Breitengrad"
          },
          "location_lng": {
            "type": "string",
            "format": "decimal",
            "pattern": "^-?\\d{0,4}(?:\\.\\d{0,8})?$",
            "nullable": true,
            "title": "Längengrad"
          },
          "location_place_id": {
            "type": "string",
            "nullable": true,
            "description": "Google Places ID für zukünftige API-Aufrufe",
            "maxLength": 255
          },
          "start": {
            "oneOf": [
              {
                "type": "string",
                "format": "date"
              },
              {
                "type": "string",
                "format": "date-time"
              }
            ],
            "description": "ISO 8601 date for an all-day event or ISO 8601 date-time for a timed event. The start and end value types must match; end is exclusive. Timed responses use UTC with a trailing Z; naive date-time inputs are interpreted using tzid, then the authenticated user's timezone, then UTC."
          },
          "end": {
            "oneOf": [
              {
                "type": "string",
                "format": "date"
              },
              {
                "type": "string",
                "format": "date-time"
              }
            ],
            "description": "ISO 8601 date for an all-day event or ISO 8601 date-time for a timed event. The start and end value types must match; end is exclusive. Timed responses use UTC with a trailing Z; naive date-time inputs are interpreted using tzid, then the authenticated user's timezone, then UTC."
          },
          "tzid": {
            "type": "string",
            "nullable": true,
            "title": "Event-Zeitzone",
            "description": "IANA-Zeitzone für die Wall-Clock-Semantik von Serienterminen",
            "maxLength": 100
          },
          "start_fold": {
            "allOf": [
              {
                "enum": [
                  0,
                  1
                ],
                "type": "integer",
                "description": "* `0` - 0\n* `1` - 1",
                "x-schema-ref": "#/components/schemas/StartFoldEnum"
              }
            ],
            "writeOnly": true
          },
          "end_fold": {
            "allOf": [
              {
                "enum": [
                  0,
                  1
                ],
                "type": "integer",
                "description": "* `0` - 0\n* `1` - 1",
                "x-schema-ref": "#/components/schemas/EndFoldEnum"
              }
            ],
            "writeOnly": true
          },
          "rrule": {
            "type": "string",
            "nullable": true,
            "title": "Wiederholungsregel",
            "maxLength": 1000
          },
          "slots_enabled": {
            "type": "boolean",
            "title": "Teilnehmerverwaltung aktivieren"
          },
          "recurrences_enabled": {
            "type": "boolean",
            "title": "Wiederholungen aktivieren"
          },
          "materialize": {
            "type": "boolean",
            "writeOnly": true,
            "default": false
          },
          "recurrence_occurrence_action": {
            "allOf": [
              {
                "enum": [
                  "keep",
                  "delete"
                ],
                "type": "string",
                "description": "* `keep` - keep\n* `delete` - delete",
                "x-schema-ref": "#/components/schemas/RecurrenceOccurrenceActionEnum"
              }
            ],
            "writeOnly": true
          },
          "cover_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "required": [
          "end",
          "start"
        ],
        "x-schema-ref": "#/components/schemas/EventWrite"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "owner_calendar_id": {
            "type": "string",
            "format": "uuid"
          },
          "summary": {
            "type": "string",
            "title": "Titel für den Event",
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "nullable": true,
            "title": "Beschreibung",
            "maxLength": 40000
          },
          "location": {
            "type": "string",
            "nullable": true,
            "title": "Adresse/Ort",
            "maxLength": 255
          },
          "location_name": {
            "type": "string",
            "nullable": true,
            "title": "Ortsname",
            "description": "Name des Ortes aus Google Maps",
            "maxLength": 255
          },
          "location_address": {
            "type": "string",
            "nullable": true,
            "title": "Vollständige Adresse",
            "description": "Formatierte Adresse aus Google Maps",
            "maxLength": 500
          },
          "location_lat": {
            "type": "string",
            "format": "decimal",
            "pattern": "^-?\\d{0,4}(?:\\.\\d{0,8})?$",
            "nullable": true,
            "title": "Breitengrad"
          },
          "location_lng": {
            "type": "string",
            "format": "decimal",
            "pattern": "^-?\\d{0,4}(?:\\.\\d{0,8})?$",
            "nullable": true,
            "title": "Längengrad"
          },
          "location_place_id": {
            "type": "string",
            "nullable": true,
            "description": "Google Places ID für zukünftige API-Aufrufe",
            "maxLength": 255
          },
          "start": {
            "oneOf": [
              {
                "type": "string",
                "format": "date"
              },
              {
                "type": "string",
                "format": "date-time"
              }
            ],
            "description": "ISO 8601 date for an all-day event or ISO 8601 date-time for a timed event. The start and end value types must match; end is exclusive. Timed responses use UTC with a trailing Z; naive date-time inputs are interpreted using tzid, then the authenticated user's timezone, then UTC."
          },
          "end": {
            "oneOf": [
              {
                "type": "string",
                "format": "date"
              },
              {
                "type": "string",
                "format": "date-time"
              }
            ],
            "description": "ISO 8601 date for an all-day event or ISO 8601 date-time for a timed event. The start and end value types must match; end is exclusive. Timed responses use UTC with a trailing Z; naive date-time inputs are interpreted using tzid, then the authenticated user's timezone, then UTC."
          },
          "tzid": {
            "type": "string",
            "nullable": true,
            "title": "Event-Zeitzone",
            "description": "IANA-Zeitzone für die Wall-Clock-Semantik von Serienterminen",
            "maxLength": 100
          },
          "start_fold": {
            "allOf": [
              {
                "enum": [
                  0,
                  1
                ],
                "type": "integer",
                "description": "* `0` - 0\n* `1` - 1",
                "x-schema-ref": "#/components/schemas/StartFoldEnum"
              }
            ],
            "writeOnly": true
          },
          "end_fold": {
            "allOf": [
              {
                "enum": [
                  0,
                  1
                ],
                "type": "integer",
                "description": "* `0` - 0\n* `1` - 1",
                "x-schema-ref": "#/components/schemas/EndFoldEnum"
              }
            ],
            "writeOnly": true
          },
          "rrule": {
            "type": "string",
            "nullable": true,
            "title": "Wiederholungsregel",
            "maxLength": 1000
          },
          "slots_enabled": {
            "type": "boolean",
            "title": "Teilnehmerverwaltung aktivieren"
          },
          "recurrences_enabled": {
            "type": "boolean",
            "title": "Wiederholungen aktivieren"
          },
          "materialize": {
            "type": "boolean",
            "writeOnly": true,
            "default": false
          },
          "recurrence_occurrence_action": {
            "allOf": [
              {
                "enum": [
                  "keep",
                  "delete"
                ],
                "type": "string",
                "description": "* `keep` - keep\n* `delete` - delete",
                "x-schema-ref": "#/components/schemas/RecurrenceOccurrenceActionEnum"
              }
            ],
            "writeOnly": true
          },
          "cover_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "required": [
          "end",
          "start"
        ],
        "x-schema-ref": "#/components/schemas/EventWrite"
      }
    },
    "responseStatuses": [
      "201",
      "400",
      "401",
      "403",
      "404",
      "500"
    ],
    "requiredScopes": [
      "events:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendar_events_list",
    "method": "GET",
    "path": "/api/v1/calendars/{calendar_id}/events",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      },
      {
        "name": "from",
        "in": "query",
        "required": false,
        "description": "Inclusive local start date (YYYY-MM-DD) in the authenticated user's timezone.",
        "type": "string",
        "format": "date"
      },
      {
        "name": "to",
        "in": "query",
        "required": false,
        "description": "Exclusive local end date (YYYY-MM-DD) in the authenticated user's timezone.",
        "type": "string",
        "format": "date"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "events:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendar_favorite_delete",
    "method": "DELETE",
    "path": "/api/v1/calendars/{calendar_id}/favorite",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "204",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "calendars:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendar_favorite_upsert",
    "method": "PUT",
    "path": "/api/v1/calendars/{calendar_id}/favorite",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "201",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "calendars:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendars_create",
    "method": "POST",
    "path": "/api/v1/calendars",
    "tags": [
      "calendars"
    ],
    "parameters": [],
    "requestBodyRequired": true,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "visibility": {
            "enum": [
              "ORG",
              "PRIVATE",
              "PLATFORM",
              "PUBLIC"
            ],
            "type": "string",
            "description": "* `ORG` - Org\n* `PRIVATE` - Private\n* `PLATFORM` - Platform\n* `PUBLIC` - Public",
            "x-schema-ref": "#/components/schemas/VisibilityEnum"
          },
          "remote_url": {
            "type": "string",
            "format": "uri",
            "nullable": true
          },
          "org_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "manager_usernames": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
          },
          "cover_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "icon_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "required": [
          "title"
        ],
        "x-schema-ref": "#/components/schemas/CalendarWrite"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "visibility": {
            "enum": [
              "ORG",
              "PRIVATE",
              "PLATFORM",
              "PUBLIC"
            ],
            "type": "string",
            "description": "* `ORG` - Org\n* `PRIVATE` - Private\n* `PLATFORM` - Platform\n* `PUBLIC` - Public",
            "x-schema-ref": "#/components/schemas/VisibilityEnum"
          },
          "remote_url": {
            "type": "string",
            "format": "uri",
            "nullable": true
          },
          "org_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "manager_usernames": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
          },
          "cover_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "icon_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "required": [
          "title"
        ],
        "x-schema-ref": "#/components/schemas/CalendarWrite"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "visibility": {
            "enum": [
              "ORG",
              "PRIVATE",
              "PLATFORM",
              "PUBLIC"
            ],
            "type": "string",
            "description": "* `ORG` - Org\n* `PRIVATE` - Private\n* `PLATFORM` - Platform\n* `PUBLIC` - Public",
            "x-schema-ref": "#/components/schemas/VisibilityEnum"
          },
          "remote_url": {
            "type": "string",
            "format": "uri",
            "nullable": true
          },
          "org_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "manager_usernames": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
          },
          "cover_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "icon_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "required": [
          "title"
        ],
        "x-schema-ref": "#/components/schemas/CalendarWrite"
      }
    },
    "responseStatuses": [
      "201",
      "400",
      "401",
      "403",
      "500"
    ],
    "requiredScopes": [
      "calendars:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendars_delete",
    "method": "DELETE",
    "path": "/api/v1/calendars/{calendar_id}",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "204",
      "400",
      "401",
      "403",
      "404",
      "500"
    ],
    "requiredScopes": [
      "calendars:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendars_ics_import",
    "method": "POST",
    "path": "/api/v1/calendars/{calendar_id}/ics-import",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": true,
    "requestContentTypes": [
      "multipart/form-data",
      "application/x-www-form-urlencoded"
    ],
    "requestSchemas": {
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "ics_file": {
            "type": "string",
            "format": "uri"
          }
        },
        "required": [
          "ics_file"
        ],
        "x-schema-ref": "#/components/schemas/CalendarIcsImportRequest"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "ics_file": {
            "type": "string",
            "format": "uri"
          }
        },
        "required": [
          "ics_file"
        ],
        "x-schema-ref": "#/components/schemas/CalendarIcsImportRequest"
      }
    },
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "calendars:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendars_list",
    "method": "GET",
    "path": "/api/v1/calendars",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_ids",
        "in": "query",
        "required": false,
        "description": "Optional comma-separated calendar UUID filter.",
        "type": "string"
      },
      {
        "name": "org",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "scope",
        "in": "query",
        "required": false,
        "description": "Filter for calendar list.",
        "type": "string",
        "enum": [
          "accessible",
          "bookmarked",
          "favorites",
          "managed",
          "related",
          "sidebar"
        ]
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403"
    ],
    "requiredScopes": [
      "calendars:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": true
  },
  {
    "operationId": "calendars_regenerate_ics_token",
    "method": "POST",
    "path": "/api/v1/calendars/{calendar_id}/ics-token",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "calendars:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendars_remote_refresh",
    "method": "POST",
    "path": "/api/v1/calendars/{calendar_id}/remote-refresh",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": true,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string"
          },
          "count": {
            "type": "integer"
          },
          "calendar": {
            "type": "object",
            "properties": {
              "calendar_id": {
                "type": "string",
                "format": "uuid",
                "readOnly": true
              },
              "title": {
                "type": "string",
                "maxLength": 255
              },
              "slug": {
                "type": "string",
                "nullable": true,
                "description": "URL-freundlicher Name für das Teilen des Kalenders",
                "maxLength": 255,
                "pattern": "^[-a-zA-Z0-9_]+$"
              },
              "description": {
                "type": "string",
                "nullable": true,
                "maxLength": 1000
              },
              "visibility": {
                "enum": [
                  "ORG",
                  "PRIVATE",
                  "PLATFORM",
                  "PUBLIC"
                ],
                "type": "string",
                "description": "* `ORG` - Org\n* `PRIVATE` - Private\n* `PLATFORM` - Platform\n* `PUBLIC` - Public",
                "x-schema-ref": "#/components/schemas/VisibilityEnum"
              },
              "remote_url": {
                "type": "string",
                "format": "uri",
                "nullable": true,
                "maxLength": 2048
              },
              "fetch_frequency": {
                "type": "integer",
                "maximum": 2147483647,
                "minimum": -2147483648,
                "nullable": true,
                "description": "Wie oft der Remote-Kalender abgerufen wird (in Minuten). Null = deaktiviert"
              },
              "last_fetch_attempt": {
                "type": "string",
                "format": "date-time",
                "nullable": true,
                "description": "Zeitpunkt des letzten Abrufversuchs"
              },
              "last_fetch_success": {
                "type": "string",
                "format": "date-time",
                "nullable": true,
                "description": "Zeitpunkt des letzten erfolgreichen Abrufs"
              },
              "organization_id": {
                "type": "string",
                "format": "uuid",
                "readOnly": true
              },
              "organization_name": {
                "type": "string",
                "readOnly": true,
                "nullable": true
              },
              "organization_slug": {
                "type": "string",
                "readOnly": true,
                "nullable": true
              },
              "organization_join_url": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "owner_username": {
                "type": "string",
                "readOnly": true,
                "nullable": true
              },
              "manager_usernames": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "readOnly": true
              },
              "color": {
                "type": "string",
                "readOnly": true
              },
              "is_public": {
                "type": "boolean",
                "readOnly": true
              },
              "user_can_view": {
                "type": "boolean",
                "readOnly": true
              },
              "is_bookmarked": {
                "type": "boolean",
                "readOnly": true
              },
              "is_favorite": {
                "type": "boolean",
                "readOnly": true
              },
              "is_primary": {
                "type": "boolean",
                "readOnly": true
              },
              "user_is_manager": {
                "type": "boolean",
                "readOnly": true
              },
              "user_is_org_member": {
                "type": "boolean",
                "readOnly": true
              },
              "user_is_owner": {
                "type": "boolean",
                "readOnly": true
              },
              "share_url": {
                "type": "string",
                "readOnly": true
              },
              "qr_url": {
                "type": "string",
                "readOnly": true
              },
              "ics_feed_url": {
                "type": "string",
                "readOnly": true
              },
              "ics_qr_url": {
                "type": "string",
                "readOnly": true
              },
              "obfuscated_ics_url": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "can_regenerate_ics_token": {
                "type": "boolean",
                "readOnly": true
              },
              "cover_asset_id": {
                "type": "string",
                "format": "uuid",
                "readOnly": true,
                "nullable": true
              },
              "cover_url": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "icon_asset_id": {
                "type": "string",
                "format": "uuid",
                "readOnly": true,
                "nullable": true
              },
              "icon_url": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "date_created": {
                "type": "string",
                "format": "date-time",
                "readOnly": true
              },
              "date_modified": {
                "type": "string",
                "format": "date-time",
                "readOnly": true
              }
            },
            "required": [
              "calendar_id",
              "can_regenerate_ics_token",
              "color",
              "cover_asset_id",
              "cover_url",
              "date_created",
              "date_modified",
              "icon_asset_id",
              "icon_url",
              "ics_feed_url",
              "ics_qr_url",
              "is_bookmarked",
              "is_favorite",
              "is_primary",
              "is_public",
              "manager_usernames",
              "obfuscated_ics_url",
              "organization_id",
              "organization_join_url",
              "organization_name",
              "organization_slug",
              "owner_username",
              "qr_url",
              "share_url",
              "title",
              "user_can_view",
              "user_is_manager",
              "user_is_org_member",
              "user_is_owner"
            ],
            "x-schema-ref": "#/components/schemas/Calendar"
          }
        },
        "required": [
          "calendar",
          "count",
          "message",
          "success"
        ],
        "x-schema-ref": "#/components/schemas/CalendarRemoteRefresh"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string"
          },
          "count": {
            "type": "integer"
          },
          "calendar": {
            "type": "object",
            "properties": {
              "calendar_id": {
                "type": "string",
                "format": "uuid",
                "readOnly": true
              },
              "title": {
                "type": "string",
                "maxLength": 255
              },
              "slug": {
                "type": "string",
                "nullable": true,
                "description": "URL-freundlicher Name für das Teilen des Kalenders",
                "maxLength": 255,
                "pattern": "^[-a-zA-Z0-9_]+$"
              },
              "description": {
                "type": "string",
                "nullable": true,
                "maxLength": 1000
              },
              "visibility": {
                "enum": [
                  "ORG",
                  "PRIVATE",
                  "PLATFORM",
                  "PUBLIC"
                ],
                "type": "string",
                "description": "* `ORG` - Org\n* `PRIVATE` - Private\n* `PLATFORM` - Platform\n* `PUBLIC` - Public",
                "x-schema-ref": "#/components/schemas/VisibilityEnum"
              },
              "remote_url": {
                "type": "string",
                "format": "uri",
                "nullable": true,
                "maxLength": 2048
              },
              "fetch_frequency": {
                "type": "integer",
                "maximum": 2147483647,
                "minimum": -2147483648,
                "nullable": true,
                "description": "Wie oft der Remote-Kalender abgerufen wird (in Minuten). Null = deaktiviert"
              },
              "last_fetch_attempt": {
                "type": "string",
                "format": "date-time",
                "nullable": true,
                "description": "Zeitpunkt des letzten Abrufversuchs"
              },
              "last_fetch_success": {
                "type": "string",
                "format": "date-time",
                "nullable": true,
                "description": "Zeitpunkt des letzten erfolgreichen Abrufs"
              },
              "organization_id": {
                "type": "string",
                "format": "uuid",
                "readOnly": true
              },
              "organization_name": {
                "type": "string",
                "readOnly": true,
                "nullable": true
              },
              "organization_slug": {
                "type": "string",
                "readOnly": true,
                "nullable": true
              },
              "organization_join_url": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "owner_username": {
                "type": "string",
                "readOnly": true,
                "nullable": true
              },
              "manager_usernames": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "readOnly": true
              },
              "color": {
                "type": "string",
                "readOnly": true
              },
              "is_public": {
                "type": "boolean",
                "readOnly": true
              },
              "user_can_view": {
                "type": "boolean",
                "readOnly": true
              },
              "is_bookmarked": {
                "type": "boolean",
                "readOnly": true
              },
              "is_favorite": {
                "type": "boolean",
                "readOnly": true
              },
              "is_primary": {
                "type": "boolean",
                "readOnly": true
              },
              "user_is_manager": {
                "type": "boolean",
                "readOnly": true
              },
              "user_is_org_member": {
                "type": "boolean",
                "readOnly": true
              },
              "user_is_owner": {
                "type": "boolean",
                "readOnly": true
              },
              "share_url": {
                "type": "string",
                "readOnly": true
              },
              "qr_url": {
                "type": "string",
                "readOnly": true
              },
              "ics_feed_url": {
                "type": "string",
                "readOnly": true
              },
              "ics_qr_url": {
                "type": "string",
                "readOnly": true
              },
              "obfuscated_ics_url": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "can_regenerate_ics_token": {
                "type": "boolean",
                "readOnly": true
              },
              "cover_asset_id": {
                "type": "string",
                "format": "uuid",
                "readOnly": true,
                "nullable": true
              },
              "cover_url": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "icon_asset_id": {
                "type": "string",
                "format": "uuid",
                "readOnly": true,
                "nullable": true
              },
              "icon_url": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "date_created": {
                "type": "string",
                "format": "date-time",
                "readOnly": true
              },
              "date_modified": {
                "type": "string",
                "format": "date-time",
                "readOnly": true
              }
            },
            "required": [
              "calendar_id",
              "can_regenerate_ics_token",
              "color",
              "cover_asset_id",
              "cover_url",
              "date_created",
              "date_modified",
              "icon_asset_id",
              "icon_url",
              "ics_feed_url",
              "ics_qr_url",
              "is_bookmarked",
              "is_favorite",
              "is_primary",
              "is_public",
              "manager_usernames",
              "obfuscated_ics_url",
              "organization_id",
              "organization_join_url",
              "organization_name",
              "organization_slug",
              "owner_username",
              "qr_url",
              "share_url",
              "title",
              "user_can_view",
              "user_is_manager",
              "user_is_org_member",
              "user_is_owner"
            ],
            "x-schema-ref": "#/components/schemas/Calendar"
          }
        },
        "required": [
          "calendar",
          "count",
          "message",
          "success"
        ],
        "x-schema-ref": "#/components/schemas/CalendarRemoteRefresh"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string"
          },
          "count": {
            "type": "integer"
          },
          "calendar": {
            "type": "object",
            "properties": {
              "calendar_id": {
                "type": "string",
                "format": "uuid",
                "readOnly": true
              },
              "title": {
                "type": "string",
                "maxLength": 255
              },
              "slug": {
                "type": "string",
                "nullable": true,
                "description": "URL-freundlicher Name für das Teilen des Kalenders",
                "maxLength": 255,
                "pattern": "^[-a-zA-Z0-9_]+$"
              },
              "description": {
                "type": "string",
                "nullable": true,
                "maxLength": 1000
              },
              "visibility": {
                "enum": [
                  "ORG",
                  "PRIVATE",
                  "PLATFORM",
                  "PUBLIC"
                ],
                "type": "string",
                "description": "* `ORG` - Org\n* `PRIVATE` - Private\n* `PLATFORM` - Platform\n* `PUBLIC` - Public",
                "x-schema-ref": "#/components/schemas/VisibilityEnum"
              },
              "remote_url": {
                "type": "string",
                "format": "uri",
                "nullable": true,
                "maxLength": 2048
              },
              "fetch_frequency": {
                "type": "integer",
                "maximum": 2147483647,
                "minimum": -2147483648,
                "nullable": true,
                "description": "Wie oft der Remote-Kalender abgerufen wird (in Minuten). Null = deaktiviert"
              },
              "last_fetch_attempt": {
                "type": "string",
                "format": "date-time",
                "nullable": true,
                "description": "Zeitpunkt des letzten Abrufversuchs"
              },
              "last_fetch_success": {
                "type": "string",
                "format": "date-time",
                "nullable": true,
                "description": "Zeitpunkt des letzten erfolgreichen Abrufs"
              },
              "organization_id": {
                "type": "string",
                "format": "uuid",
                "readOnly": true
              },
              "organization_name": {
                "type": "string",
                "readOnly": true,
                "nullable": true
              },
              "organization_slug": {
                "type": "string",
                "readOnly": true,
                "nullable": true
              },
              "organization_join_url": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "owner_username": {
                "type": "string",
                "readOnly": true,
                "nullable": true
              },
              "manager_usernames": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "readOnly": true
              },
              "color": {
                "type": "string",
                "readOnly": true
              },
              "is_public": {
                "type": "boolean",
                "readOnly": true
              },
              "user_can_view": {
                "type": "boolean",
                "readOnly": true
              },
              "is_bookmarked": {
                "type": "boolean",
                "readOnly": true
              },
              "is_favorite": {
                "type": "boolean",
                "readOnly": true
              },
              "is_primary": {
                "type": "boolean",
                "readOnly": true
              },
              "user_is_manager": {
                "type": "boolean",
                "readOnly": true
              },
              "user_is_org_member": {
                "type": "boolean",
                "readOnly": true
              },
              "user_is_owner": {
                "type": "boolean",
                "readOnly": true
              },
              "share_url": {
                "type": "string",
                "readOnly": true
              },
              "qr_url": {
                "type": "string",
                "readOnly": true
              },
              "ics_feed_url": {
                "type": "string",
                "readOnly": true
              },
              "ics_qr_url": {
                "type": "string",
                "readOnly": true
              },
              "obfuscated_ics_url": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "can_regenerate_ics_token": {
                "type": "boolean",
                "readOnly": true
              },
              "cover_asset_id": {
                "type": "string",
                "format": "uuid",
                "readOnly": true,
                "nullable": true
              },
              "cover_url": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "icon_asset_id": {
                "type": "string",
                "format": "uuid",
                "readOnly": true,
                "nullable": true
              },
              "icon_url": {
                "type": "string",
                "nullable": true,
                "readOnly": true
              },
              "date_created": {
                "type": "string",
                "format": "date-time",
                "readOnly": true
              },
              "date_modified": {
                "type": "string",
                "format": "date-time",
                "readOnly": true
              }
            },
            "required": [
              "calendar_id",
              "can_regenerate_ics_token",
              "color",
              "cover_asset_id",
              "cover_url",
              "date_created",
              "date_modified",
              "icon_asset_id",
              "icon_url",
              "ics_feed_url",
              "ics_qr_url",
              "is_bookmarked",
              "is_favorite",
              "is_primary",
              "is_public",
              "manager_usernames",
              "obfuscated_ics_url",
              "organization_id",
              "organization_join_url",
              "organization_name",
              "organization_slug",
              "owner_username",
              "qr_url",
              "share_url",
              "title",
              "user_can_view",
              "user_is_manager",
              "user_is_org_member",
              "user_is_owner"
            ],
            "x-schema-ref": "#/components/schemas/Calendar"
          }
        },
        "required": [
          "calendar",
          "count",
          "message",
          "success"
        ],
        "x-schema-ref": "#/components/schemas/CalendarRemoteRefresh"
      }
    },
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "calendars:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "calendars_retrieve",
    "method": "GET",
    "path": "/api/v1/calendars/{calendar_id}",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      },
      {
        "name": "days",
        "in": "query",
        "required": false,
        "description": "Number of days to include for upcoming_events (1-90, default 7). Only valid when include=upcoming_events is set.",
        "type": "integer"
      },
      {
        "name": "include",
        "in": "query",
        "required": false,
        "description": "Optional expansions. Supported: upcoming_events.",
        "type": "string",
        "enum": [
          "upcoming_events"
        ]
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "calendars:read"
    ],
    "conditionalScopes": {
      "include_upcoming_events": [
        "events:read"
      ]
    },
    "anonymousAllowed": true
  },
  {
    "operationId": "calendars_update",
    "method": "PATCH",
    "path": "/api/v1/calendars/{calendar_id}",
    "tags": [
      "calendars"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "visibility": {
            "enum": [
              "ORG",
              "PRIVATE",
              "PLATFORM",
              "PUBLIC"
            ],
            "type": "string",
            "description": "* `ORG` - Org\n* `PRIVATE` - Private\n* `PLATFORM` - Platform\n* `PUBLIC` - Public",
            "x-schema-ref": "#/components/schemas/VisibilityEnum"
          },
          "remote_url": {
            "type": "string",
            "format": "uri",
            "nullable": true
          },
          "org_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "manager_usernames": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
          },
          "cover_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "icon_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedCalendarWrite"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "visibility": {
            "enum": [
              "ORG",
              "PRIVATE",
              "PLATFORM",
              "PUBLIC"
            ],
            "type": "string",
            "description": "* `ORG` - Org\n* `PRIVATE` - Private\n* `PLATFORM` - Platform\n* `PUBLIC` - Public",
            "x-schema-ref": "#/components/schemas/VisibilityEnum"
          },
          "remote_url": {
            "type": "string",
            "format": "uri",
            "nullable": true
          },
          "org_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "manager_usernames": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
          },
          "cover_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "icon_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedCalendarWrite"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "visibility": {
            "enum": [
              "ORG",
              "PRIVATE",
              "PLATFORM",
              "PUBLIC"
            ],
            "type": "string",
            "description": "* `ORG` - Org\n* `PRIVATE` - Private\n* `PLATFORM` - Platform\n* `PUBLIC` - Public",
            "x-schema-ref": "#/components/schemas/VisibilityEnum"
          },
          "remote_url": {
            "type": "string",
            "format": "uri",
            "nullable": true
          },
          "org_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "manager_usernames": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
          },
          "cover_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "icon_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedCalendarWrite"
      }
    },
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404",
      "500"
    ],
    "requiredScopes": [
      "calendars:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "event_manager_registrations_create",
    "method": "POST",
    "path": "/api/v1/events/{event_id}/manager-registrations",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": true,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "event_slot_id": {
            "type": "string",
            "format": "uuid"
          },
          "attendee_username": {
            "type": "string"
          },
          "attendee_name": {
            "type": "string",
            "maxLength": 255
          },
          "status": {
            "allOf": [
              {
                "enum": [
                  "APPLIED",
                  "CONFIRMED",
                  "REJECTED",
                  "WAITLIST",
                  "WITHDRAWN",
                  "CANCELLED"
                ],
                "type": "string",
                "description": "* `APPLIED` - Angefragt\n* `CONFIRMED` - Bestätigt\n* `REJECTED` - Abgelehnt\n* `WAITLIST` - Warteliste\n* `WITHDRAWN` - Zurückgezogen\n* `CANCELLED` - Abgesagt",
                "x-schema-ref": "#/components/schemas/StatusEnum"
              }
            ],
            "default": "CONFIRMED"
          }
        },
        "required": [
          "event_slot_id"
        ],
        "x-schema-ref": "#/components/schemas/ManagerRegistrationCreate"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "event_slot_id": {
            "type": "string",
            "format": "uuid"
          },
          "attendee_username": {
            "type": "string"
          },
          "attendee_name": {
            "type": "string",
            "maxLength": 255
          },
          "status": {
            "allOf": [
              {
                "enum": [
                  "APPLIED",
                  "CONFIRMED",
                  "REJECTED",
                  "WAITLIST",
                  "WITHDRAWN",
                  "CANCELLED"
                ],
                "type": "string",
                "description": "* `APPLIED` - Angefragt\n* `CONFIRMED` - Bestätigt\n* `REJECTED` - Abgelehnt\n* `WAITLIST` - Warteliste\n* `WITHDRAWN` - Zurückgezogen\n* `CANCELLED` - Abgesagt",
                "x-schema-ref": "#/components/schemas/StatusEnum"
              }
            ],
            "default": "CONFIRMED"
          }
        },
        "required": [
          "event_slot_id"
        ],
        "x-schema-ref": "#/components/schemas/ManagerRegistrationCreate"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "event_slot_id": {
            "type": "string",
            "format": "uuid"
          },
          "attendee_username": {
            "type": "string"
          },
          "attendee_name": {
            "type": "string",
            "maxLength": 255
          },
          "status": {
            "allOf": [
              {
                "enum": [
                  "APPLIED",
                  "CONFIRMED",
                  "REJECTED",
                  "WAITLIST",
                  "WITHDRAWN",
                  "CANCELLED"
                ],
                "type": "string",
                "description": "* `APPLIED` - Angefragt\n* `CONFIRMED` - Bestätigt\n* `REJECTED` - Abgelehnt\n* `WAITLIST` - Warteliste\n* `WITHDRAWN` - Zurückgezogen\n* `CANCELLED` - Abgesagt",
                "x-schema-ref": "#/components/schemas/StatusEnum"
              }
            ],
            "default": "CONFIRMED"
          }
        },
        "required": [
          "event_slot_id"
        ],
        "x-schema-ref": "#/components/schemas/ManagerRegistrationCreate"
      }
    },
    "responseStatuses": [
      "201",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "slots:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "event_registration_audit_list",
    "method": "GET",
    "path": "/api/v1/events/{event_id}/registration-audit",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200"
    ],
    "requiredScopes": [
      "slots:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "event_registration_candidates_list",
    "method": "GET",
    "path": "/api/v1/events/{event_id}/manager-registrations",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200"
    ],
    "requiredScopes": [
      "slots:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "event_registration_history_list",
    "method": "GET",
    "path": "/api/v1/events/{event_id}/registration-history",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200"
    ],
    "requiredScopes": [
      "slots:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "event_registrations_cancel_all",
    "method": "POST",
    "path": "/api/v1/events/{event_id}/registrations",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403",
      "404",
      "500"
    ],
    "requiredScopes": [
      "events:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "event_registrations_summary",
    "method": "GET",
    "path": "/api/v1/events/{event_id}/registrations",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "events:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "event_slot_generators_create",
    "method": "POST",
    "path": "/api/v1/events/{event_id}/slot-generators",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": true,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "readOnly": true
          },
          "generator": {
            "allOf": [
              {
                "enum": [
                  "FixedDurationMaxAttSlotGenerator"
                ],
                "type": "string",
                "description": "* `FixedDurationMaxAttSlotGenerator` - FixedDurationMaxAttSlotGenerator",
                "x-schema-ref": "#/components/schemas/GeneratorEnum"
              }
            ],
            "default": "FixedDurationMaxAttSlotGenerator"
          },
          "name": {
            "type": "string",
            "maxLength": 255
          },
          "duration": {
            "type": "integer",
            "minimum": 10
          },
          "max_attendees": {
            "type": "integer",
            "minimum": 1,
            "nullable": true
          },
          "days_in_advance": {
            "type": "integer",
            "maximum": 30,
            "minimum": 1,
            "default": 12
          },
          "allow_multiple_slots": {
            "type": "boolean",
            "default": false
          },
          "confirmation_type": {
            "enum": [
              "A",
              "C"
            ],
            "type": "string",
            "description": "* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager",
            "x-schema-ref": "#/components/schemas/ConfirmationTypeEnum"
          },
          "allow_multiple_requests": {
            "type": "boolean",
            "default": false
          },
          "show_attendees": {
            "type": "boolean",
            "default": false
          }
        },
        "required": [
          "confirmation_type",
          "duration",
          "id",
          "name"
        ],
        "x-schema-ref": "#/components/schemas/SlotGeneratorConfig"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "readOnly": true
          },
          "generator": {
            "allOf": [
              {
                "enum": [
                  "FixedDurationMaxAttSlotGenerator"
                ],
                "type": "string",
                "description": "* `FixedDurationMaxAttSlotGenerator` - FixedDurationMaxAttSlotGenerator",
                "x-schema-ref": "#/components/schemas/GeneratorEnum"
              }
            ],
            "default": "FixedDurationMaxAttSlotGenerator"
          },
          "name": {
            "type": "string",
            "maxLength": 255
          },
          "duration": {
            "type": "integer",
            "minimum": 10
          },
          "max_attendees": {
            "type": "integer",
            "minimum": 1,
            "nullable": true
          },
          "days_in_advance": {
            "type": "integer",
            "maximum": 30,
            "minimum": 1,
            "default": 12
          },
          "allow_multiple_slots": {
            "type": "boolean",
            "default": false
          },
          "confirmation_type": {
            "enum": [
              "A",
              "C"
            ],
            "type": "string",
            "description": "* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager",
            "x-schema-ref": "#/components/schemas/ConfirmationTypeEnum"
          },
          "allow_multiple_requests": {
            "type": "boolean",
            "default": false
          },
          "show_attendees": {
            "type": "boolean",
            "default": false
          }
        },
        "required": [
          "confirmation_type",
          "duration",
          "id",
          "name"
        ],
        "x-schema-ref": "#/components/schemas/SlotGeneratorConfig"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "readOnly": true
          },
          "generator": {
            "allOf": [
              {
                "enum": [
                  "FixedDurationMaxAttSlotGenerator"
                ],
                "type": "string",
                "description": "* `FixedDurationMaxAttSlotGenerator` - FixedDurationMaxAttSlotGenerator",
                "x-schema-ref": "#/components/schemas/GeneratorEnum"
              }
            ],
            "default": "FixedDurationMaxAttSlotGenerator"
          },
          "name": {
            "type": "string",
            "maxLength": 255
          },
          "duration": {
            "type": "integer",
            "minimum": 10
          },
          "max_attendees": {
            "type": "integer",
            "minimum": 1,
            "nullable": true
          },
          "days_in_advance": {
            "type": "integer",
            "maximum": 30,
            "minimum": 1,
            "default": 12
          },
          "allow_multiple_slots": {
            "type": "boolean",
            "default": false
          },
          "confirmation_type": {
            "enum": [
              "A",
              "C"
            ],
            "type": "string",
            "description": "* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager",
            "x-schema-ref": "#/components/schemas/ConfirmationTypeEnum"
          },
          "allow_multiple_requests": {
            "type": "boolean",
            "default": false
          },
          "show_attendees": {
            "type": "boolean",
            "default": false
          }
        },
        "required": [
          "confirmation_type",
          "duration",
          "id",
          "name"
        ],
        "x-schema-ref": "#/components/schemas/SlotGeneratorConfig"
      }
    },
    "responseStatuses": [
      "201",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "slots:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "event_slot_generators_delete",
    "method": "DELETE",
    "path": "/api/v1/events/{event_id}/slot-generators/{generator_id}",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      },
      {
        "name": "generator_id",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "204",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "slots:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "event_slot_generators_list",
    "method": "GET",
    "path": "/api/v1/events/{event_id}/slot-generators",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200"
    ],
    "requiredScopes": [
      "slots:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "event_slot_generators_run",
    "method": "POST",
    "path": "/api/v1/events/{event_id}/slot-generators/run",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404",
      "500"
    ],
    "requiredScopes": [
      "slots:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "event_slot_generators_update",
    "method": "PATCH",
    "path": "/api/v1/events/{event_id}/slot-generators/{generator_id}",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      },
      {
        "name": "generator_id",
        "in": "path",
        "required": true,
        "type": "string"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "readOnly": true
          },
          "generator": {
            "allOf": [
              {
                "enum": [
                  "FixedDurationMaxAttSlotGenerator"
                ],
                "type": "string",
                "description": "* `FixedDurationMaxAttSlotGenerator` - FixedDurationMaxAttSlotGenerator",
                "x-schema-ref": "#/components/schemas/GeneratorEnum"
              }
            ],
            "default": "FixedDurationMaxAttSlotGenerator"
          },
          "name": {
            "type": "string",
            "maxLength": 255
          },
          "duration": {
            "type": "integer",
            "minimum": 10
          },
          "max_attendees": {
            "type": "integer",
            "minimum": 1,
            "nullable": true
          },
          "days_in_advance": {
            "type": "integer",
            "maximum": 30,
            "minimum": 1,
            "default": 12
          },
          "allow_multiple_slots": {
            "type": "boolean",
            "default": false
          },
          "confirmation_type": {
            "enum": [
              "A",
              "C"
            ],
            "type": "string",
            "description": "* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager",
            "x-schema-ref": "#/components/schemas/ConfirmationTypeEnum"
          },
          "allow_multiple_requests": {
            "type": "boolean",
            "default": false
          },
          "show_attendees": {
            "type": "boolean",
            "default": false
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedSlotGeneratorConfig"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "readOnly": true
          },
          "generator": {
            "allOf": [
              {
                "enum": [
                  "FixedDurationMaxAttSlotGenerator"
                ],
                "type": "string",
                "description": "* `FixedDurationMaxAttSlotGenerator` - FixedDurationMaxAttSlotGenerator",
                "x-schema-ref": "#/components/schemas/GeneratorEnum"
              }
            ],
            "default": "FixedDurationMaxAttSlotGenerator"
          },
          "name": {
            "type": "string",
            "maxLength": 255
          },
          "duration": {
            "type": "integer",
            "minimum": 10
          },
          "max_attendees": {
            "type": "integer",
            "minimum": 1,
            "nullable": true
          },
          "days_in_advance": {
            "type": "integer",
            "maximum": 30,
            "minimum": 1,
            "default": 12
          },
          "allow_multiple_slots": {
            "type": "boolean",
            "default": false
          },
          "confirmation_type": {
            "enum": [
              "A",
              "C"
            ],
            "type": "string",
            "description": "* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager",
            "x-schema-ref": "#/components/schemas/ConfirmationTypeEnum"
          },
          "allow_multiple_requests": {
            "type": "boolean",
            "default": false
          },
          "show_attendees": {
            "type": "boolean",
            "default": false
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedSlotGeneratorConfig"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "readOnly": true
          },
          "generator": {
            "allOf": [
              {
                "enum": [
                  "FixedDurationMaxAttSlotGenerator"
                ],
                "type": "string",
                "description": "* `FixedDurationMaxAttSlotGenerator` - FixedDurationMaxAttSlotGenerator",
                "x-schema-ref": "#/components/schemas/GeneratorEnum"
              }
            ],
            "default": "FixedDurationMaxAttSlotGenerator"
          },
          "name": {
            "type": "string",
            "maxLength": 255
          },
          "duration": {
            "type": "integer",
            "minimum": 10
          },
          "max_attendees": {
            "type": "integer",
            "minimum": 1,
            "nullable": true
          },
          "days_in_advance": {
            "type": "integer",
            "maximum": 30,
            "minimum": 1,
            "default": 12
          },
          "allow_multiple_slots": {
            "type": "boolean",
            "default": false
          },
          "confirmation_type": {
            "enum": [
              "A",
              "C"
            ],
            "type": "string",
            "description": "* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager",
            "x-schema-ref": "#/components/schemas/ConfirmationTypeEnum"
          },
          "allow_multiple_requests": {
            "type": "boolean",
            "default": false
          },
          "show_attendees": {
            "type": "boolean",
            "default": false
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedSlotGeneratorConfig"
      }
    },
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "slots:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "event_slots_create",
    "method": "POST",
    "path": "/api/v1/events/{event_id}/slots",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": true,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "resource": {
            "type": "string",
            "title": "Name des Zeitslots",
            "description": "Z.B. Name des Resource oder Session",
            "maxLength": 255
          },
          "start": {
            "type": "string",
            "format": "date-time",
            "description": "ISO 8601 date-time. Supported inputs: timezone-naive values (interpreted in the authenticated user's timezone, fallback UTC), UTC values with a trailing 'Z', or values with an explicit UTC offset (for example +01:00 or -05:00)."
          },
          "end": {
            "type": "string",
            "format": "date-time",
            "description": "ISO 8601 date-time. Supported inputs: timezone-naive values (interpreted in the authenticated user's timezone, fallback UTC), UTC values with a trailing 'Z', or values with an explicit UTC offset (for example +01:00 or -05:00)."
          },
          "max_attendees": {
            "type": "integer",
            "maximum": 32767,
            "minimum": 0,
            "nullable": true,
            "title": "Maximale Teilnehmer",
            "description": "Keine Obergrenze gewünscht? Feld leer lassen"
          },
          "allow_multiple_slots": {
            "type": "boolean",
            "nullable": true,
            "title": "Mehrfachteilnahmen erlauben",
            "description": "Teilnehmer können mehrere Zeitslots reservieren"
          },
          "allow_multiple_requests": {
            "type": "boolean",
            "nullable": true,
            "title": "Mehrfachanfragen erlauben",
            "description": "Teilnehmer können mehrere Anfragen parallel stellen"
          },
          "confirmation_type": {
            "allOf": [
              {
                "enum": [
                  "A",
                  "C"
                ],
                "type": "string",
                "description": "* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager",
                "x-schema-ref": "#/components/schemas/ConfirmationTypeEnum"
              }
            ],
            "title": "Art der Bestätigung",
            "description": "Wie werden Anfragen bestätigt\n\n* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager"
          },
          "show_attendees": {
            "type": "boolean",
            "title": "Teilnehmer im Event anzeigen",
            "description": "Bestätigte Teilnehmer im Event-Detail anzeigen."
          }
        },
        "required": [
          "end",
          "resource",
          "start"
        ],
        "x-schema-ref": "#/components/schemas/EventSlotWrite"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "resource": {
            "type": "string",
            "title": "Name des Zeitslots",
            "description": "Z.B. Name des Resource oder Session",
            "maxLength": 255
          },
          "start": {
            "type": "string",
            "format": "date-time",
            "description": "ISO 8601 date-time. Supported inputs: timezone-naive values (interpreted in the authenticated user's timezone, fallback UTC), UTC values with a trailing 'Z', or values with an explicit UTC offset (for example +01:00 or -05:00)."
          },
          "end": {
            "type": "string",
            "format": "date-time",
            "description": "ISO 8601 date-time. Supported inputs: timezone-naive values (interpreted in the authenticated user's timezone, fallback UTC), UTC values with a trailing 'Z', or values with an explicit UTC offset (for example +01:00 or -05:00)."
          },
          "max_attendees": {
            "type": "integer",
            "maximum": 32767,
            "minimum": 0,
            "nullable": true,
            "title": "Maximale Teilnehmer",
            "description": "Keine Obergrenze gewünscht? Feld leer lassen"
          },
          "allow_multiple_slots": {
            "type": "boolean",
            "nullable": true,
            "title": "Mehrfachteilnahmen erlauben",
            "description": "Teilnehmer können mehrere Zeitslots reservieren"
          },
          "allow_multiple_requests": {
            "type": "boolean",
            "nullable": true,
            "title": "Mehrfachanfragen erlauben",
            "description": "Teilnehmer können mehrere Anfragen parallel stellen"
          },
          "confirmation_type": {
            "allOf": [
              {
                "enum": [
                  "A",
                  "C"
                ],
                "type": "string",
                "description": "* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager",
                "x-schema-ref": "#/components/schemas/ConfirmationTypeEnum"
              }
            ],
            "title": "Art der Bestätigung",
            "description": "Wie werden Anfragen bestätigt\n\n* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager"
          },
          "show_attendees": {
            "type": "boolean",
            "title": "Teilnehmer im Event anzeigen",
            "description": "Bestätigte Teilnehmer im Event-Detail anzeigen."
          }
        },
        "required": [
          "end",
          "resource",
          "start"
        ],
        "x-schema-ref": "#/components/schemas/EventSlotWrite"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "resource": {
            "type": "string",
            "title": "Name des Zeitslots",
            "description": "Z.B. Name des Resource oder Session",
            "maxLength": 255
          },
          "start": {
            "type": "string",
            "format": "date-time",
            "description": "ISO 8601 date-time. Supported inputs: timezone-naive values (interpreted in the authenticated user's timezone, fallback UTC), UTC values with a trailing 'Z', or values with an explicit UTC offset (for example +01:00 or -05:00)."
          },
          "end": {
            "type": "string",
            "format": "date-time",
            "description": "ISO 8601 date-time. Supported inputs: timezone-naive values (interpreted in the authenticated user's timezone, fallback UTC), UTC values with a trailing 'Z', or values with an explicit UTC offset (for example +01:00 or -05:00)."
          },
          "max_attendees": {
            "type": "integer",
            "maximum": 32767,
            "minimum": 0,
            "nullable": true,
            "title": "Maximale Teilnehmer",
            "description": "Keine Obergrenze gewünscht? Feld leer lassen"
          },
          "allow_multiple_slots": {
            "type": "boolean",
            "nullable": true,
            "title": "Mehrfachteilnahmen erlauben",
            "description": "Teilnehmer können mehrere Zeitslots reservieren"
          },
          "allow_multiple_requests": {
            "type": "boolean",
            "nullable": true,
            "title": "Mehrfachanfragen erlauben",
            "description": "Teilnehmer können mehrere Anfragen parallel stellen"
          },
          "confirmation_type": {
            "allOf": [
              {
                "enum": [
                  "A",
                  "C"
                ],
                "type": "string",
                "description": "* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager",
                "x-schema-ref": "#/components/schemas/ConfirmationTypeEnum"
              }
            ],
            "title": "Art der Bestätigung",
            "description": "Wie werden Anfragen bestätigt\n\n* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager"
          },
          "show_attendees": {
            "type": "boolean",
            "title": "Teilnehmer im Event anzeigen",
            "description": "Bestätigte Teilnehmer im Event-Detail anzeigen."
          }
        },
        "required": [
          "end",
          "resource",
          "start"
        ],
        "x-schema-ref": "#/components/schemas/EventSlotWrite"
      }
    },
    "responseStatuses": [
      "201",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "slots:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "event_slots_delete_all",
    "method": "DELETE",
    "path": "/api/v1/events/{event_id}/slots",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "slots:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "event_slots_list",
    "method": "GET",
    "path": "/api/v1/events/{event_id}/slots",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "slots:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": true
  },
  {
    "operationId": "event_upcoming_list",
    "method": "GET",
    "path": "/api/v1/events/upcoming",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "calendar_ids",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "type": "integer"
      },
      {
        "name": "org",
        "in": "query",
        "required": false,
        "type": "string"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403"
    ],
    "requiredScopes": [
      "events:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": true
  },
  {
    "operationId": "events_delete",
    "method": "DELETE",
    "path": "/api/v1/events/{event_id}",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "204",
      "400",
      "401",
      "403",
      "404",
      "500"
    ],
    "requiredScopes": [
      "events:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "events_list",
    "method": "GET",
    "path": "/api/v1/events",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "calendar_ids",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "end",
        "in": "query",
        "required": true,
        "description": "Exclusive local end date in the authenticated user's timezone.",
        "type": "string",
        "format": "date"
      },
      {
        "name": "org",
        "in": "query",
        "required": false,
        "type": "string"
      },
      {
        "name": "start",
        "in": "query",
        "required": true,
        "description": "Inclusive local start date in the authenticated user's timezone.",
        "type": "string",
        "format": "date"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403"
    ],
    "requiredScopes": [
      "events:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": true
  },
  {
    "operationId": "events_materialize",
    "method": "POST",
    "path": "/api/v1/events/{event_id}/materialize",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "events:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "events_move_targets_list",
    "method": "GET",
    "path": "/api/v1/events/{event_id}/move-targets",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "events:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "events_occurrences_delete",
    "method": "DELETE",
    "path": "/api/v1/events/{event_id}/occurrences",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "events:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "events_occurrences_list",
    "method": "GET",
    "path": "/api/v1/events/{event_id}/occurrences",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "events:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": true
  },
  {
    "operationId": "events_promote_occurrence",
    "method": "POST",
    "path": "/api/v1/events/{event_id}/promote",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404",
      "500"
    ],
    "requiredScopes": [
      "events:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "events_retrieve",
    "method": "GET",
    "path": "/api/v1/events/{event_id}",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "calendar_id",
        "in": "query",
        "required": false,
        "type": "string",
        "format": "uuid"
      },
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      },
      {
        "name": "org",
        "in": "query",
        "required": false,
        "type": "string"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "events:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": true
  },
  {
    "operationId": "events_update",
    "method": "PATCH",
    "path": "/api/v1/events/{event_id}",
    "tags": [
      "events"
    ],
    "parameters": [
      {
        "name": "event_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "owner_calendar_id": {
            "type": "string",
            "format": "uuid"
          },
          "summary": {
            "type": "string",
            "title": "Titel für den Event",
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "nullable": true,
            "title": "Beschreibung",
            "maxLength": 40000
          },
          "location": {
            "type": "string",
            "nullable": true,
            "title": "Adresse/Ort",
            "maxLength": 255
          },
          "location_name": {
            "type": "string",
            "nullable": true,
            "title": "Ortsname",
            "description": "Name des Ortes aus Google Maps",
            "maxLength": 255
          },
          "location_address": {
            "type": "string",
            "nullable": true,
            "title": "Vollständige Adresse",
            "description": "Formatierte Adresse aus Google Maps",
            "maxLength": 500
          },
          "location_lat": {
            "type": "string",
            "format": "decimal",
            "pattern": "^-?\\d{0,4}(?:\\.\\d{0,8})?$",
            "nullable": true,
            "title": "Breitengrad"
          },
          "location_lng": {
            "type": "string",
            "format": "decimal",
            "pattern": "^-?\\d{0,4}(?:\\.\\d{0,8})?$",
            "nullable": true,
            "title": "Längengrad"
          },
          "location_place_id": {
            "type": "string",
            "nullable": true,
            "description": "Google Places ID für zukünftige API-Aufrufe",
            "maxLength": 255
          },
          "start": {
            "oneOf": [
              {
                "type": "string",
                "format": "date"
              },
              {
                "type": "string",
                "format": "date-time"
              }
            ],
            "description": "ISO 8601 date for an all-day event or ISO 8601 date-time for a timed event. The start and end value types must match; end is exclusive. Timed responses use UTC with a trailing Z; naive date-time inputs are interpreted using tzid, then the authenticated user's timezone, then UTC."
          },
          "end": {
            "oneOf": [
              {
                "type": "string",
                "format": "date"
              },
              {
                "type": "string",
                "format": "date-time"
              }
            ],
            "description": "ISO 8601 date for an all-day event or ISO 8601 date-time for a timed event. The start and end value types must match; end is exclusive. Timed responses use UTC with a trailing Z; naive date-time inputs are interpreted using tzid, then the authenticated user's timezone, then UTC."
          },
          "tzid": {
            "type": "string",
            "nullable": true,
            "title": "Event-Zeitzone",
            "description": "IANA-Zeitzone für die Wall-Clock-Semantik von Serienterminen",
            "maxLength": 100
          },
          "start_fold": {
            "allOf": [
              {
                "enum": [
                  0,
                  1
                ],
                "type": "integer",
                "description": "* `0` - 0\n* `1` - 1",
                "x-schema-ref": "#/components/schemas/StartFoldEnum"
              }
            ],
            "writeOnly": true
          },
          "end_fold": {
            "allOf": [
              {
                "enum": [
                  0,
                  1
                ],
                "type": "integer",
                "description": "* `0` - 0\n* `1` - 1",
                "x-schema-ref": "#/components/schemas/EndFoldEnum"
              }
            ],
            "writeOnly": true
          },
          "rrule": {
            "type": "string",
            "nullable": true,
            "title": "Wiederholungsregel",
            "maxLength": 1000
          },
          "slots_enabled": {
            "type": "boolean",
            "title": "Teilnehmerverwaltung aktivieren"
          },
          "recurrences_enabled": {
            "type": "boolean",
            "title": "Wiederholungen aktivieren"
          },
          "materialize": {
            "type": "boolean",
            "writeOnly": true,
            "default": false
          },
          "recurrence_occurrence_action": {
            "allOf": [
              {
                "enum": [
                  "keep",
                  "delete"
                ],
                "type": "string",
                "description": "* `keep` - keep\n* `delete` - delete",
                "x-schema-ref": "#/components/schemas/RecurrenceOccurrenceActionEnum"
              }
            ],
            "writeOnly": true
          },
          "cover_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedEventWrite"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "owner_calendar_id": {
            "type": "string",
            "format": "uuid"
          },
          "summary": {
            "type": "string",
            "title": "Titel für den Event",
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "nullable": true,
            "title": "Beschreibung",
            "maxLength": 40000
          },
          "location": {
            "type": "string",
            "nullable": true,
            "title": "Adresse/Ort",
            "maxLength": 255
          },
          "location_name": {
            "type": "string",
            "nullable": true,
            "title": "Ortsname",
            "description": "Name des Ortes aus Google Maps",
            "maxLength": 255
          },
          "location_address": {
            "type": "string",
            "nullable": true,
            "title": "Vollständige Adresse",
            "description": "Formatierte Adresse aus Google Maps",
            "maxLength": 500
          },
          "location_lat": {
            "type": "string",
            "format": "decimal",
            "pattern": "^-?\\d{0,4}(?:\\.\\d{0,8})?$",
            "nullable": true,
            "title": "Breitengrad"
          },
          "location_lng": {
            "type": "string",
            "format": "decimal",
            "pattern": "^-?\\d{0,4}(?:\\.\\d{0,8})?$",
            "nullable": true,
            "title": "Längengrad"
          },
          "location_place_id": {
            "type": "string",
            "nullable": true,
            "description": "Google Places ID für zukünftige API-Aufrufe",
            "maxLength": 255
          },
          "start": {
            "oneOf": [
              {
                "type": "string",
                "format": "date"
              },
              {
                "type": "string",
                "format": "date-time"
              }
            ],
            "description": "ISO 8601 date for an all-day event or ISO 8601 date-time for a timed event. The start and end value types must match; end is exclusive. Timed responses use UTC with a trailing Z; naive date-time inputs are interpreted using tzid, then the authenticated user's timezone, then UTC."
          },
          "end": {
            "oneOf": [
              {
                "type": "string",
                "format": "date"
              },
              {
                "type": "string",
                "format": "date-time"
              }
            ],
            "description": "ISO 8601 date for an all-day event or ISO 8601 date-time for a timed event. The start and end value types must match; end is exclusive. Timed responses use UTC with a trailing Z; naive date-time inputs are interpreted using tzid, then the authenticated user's timezone, then UTC."
          },
          "tzid": {
            "type": "string",
            "nullable": true,
            "title": "Event-Zeitzone",
            "description": "IANA-Zeitzone für die Wall-Clock-Semantik von Serienterminen",
            "maxLength": 100
          },
          "start_fold": {
            "allOf": [
              {
                "enum": [
                  0,
                  1
                ],
                "type": "integer",
                "description": "* `0` - 0\n* `1` - 1",
                "x-schema-ref": "#/components/schemas/StartFoldEnum"
              }
            ],
            "writeOnly": true
          },
          "end_fold": {
            "allOf": [
              {
                "enum": [
                  0,
                  1
                ],
                "type": "integer",
                "description": "* `0` - 0\n* `1` - 1",
                "x-schema-ref": "#/components/schemas/EndFoldEnum"
              }
            ],
            "writeOnly": true
          },
          "rrule": {
            "type": "string",
            "nullable": true,
            "title": "Wiederholungsregel",
            "maxLength": 1000
          },
          "slots_enabled": {
            "type": "boolean",
            "title": "Teilnehmerverwaltung aktivieren"
          },
          "recurrences_enabled": {
            "type": "boolean",
            "title": "Wiederholungen aktivieren"
          },
          "materialize": {
            "type": "boolean",
            "writeOnly": true,
            "default": false
          },
          "recurrence_occurrence_action": {
            "allOf": [
              {
                "enum": [
                  "keep",
                  "delete"
                ],
                "type": "string",
                "description": "* `keep` - keep\n* `delete` - delete",
                "x-schema-ref": "#/components/schemas/RecurrenceOccurrenceActionEnum"
              }
            ],
            "writeOnly": true
          },
          "cover_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedEventWrite"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "owner_calendar_id": {
            "type": "string",
            "format": "uuid"
          },
          "summary": {
            "type": "string",
            "title": "Titel für den Event",
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "nullable": true,
            "title": "Beschreibung",
            "maxLength": 40000
          },
          "location": {
            "type": "string",
            "nullable": true,
            "title": "Adresse/Ort",
            "maxLength": 255
          },
          "location_name": {
            "type": "string",
            "nullable": true,
            "title": "Ortsname",
            "description": "Name des Ortes aus Google Maps",
            "maxLength": 255
          },
          "location_address": {
            "type": "string",
            "nullable": true,
            "title": "Vollständige Adresse",
            "description": "Formatierte Adresse aus Google Maps",
            "maxLength": 500
          },
          "location_lat": {
            "type": "string",
            "format": "decimal",
            "pattern": "^-?\\d{0,4}(?:\\.\\d{0,8})?$",
            "nullable": true,
            "title": "Breitengrad"
          },
          "location_lng": {
            "type": "string",
            "format": "decimal",
            "pattern": "^-?\\d{0,4}(?:\\.\\d{0,8})?$",
            "nullable": true,
            "title": "Längengrad"
          },
          "location_place_id": {
            "type": "string",
            "nullable": true,
            "description": "Google Places ID für zukünftige API-Aufrufe",
            "maxLength": 255
          },
          "start": {
            "oneOf": [
              {
                "type": "string",
                "format": "date"
              },
              {
                "type": "string",
                "format": "date-time"
              }
            ],
            "description": "ISO 8601 date for an all-day event or ISO 8601 date-time for a timed event. The start and end value types must match; end is exclusive. Timed responses use UTC with a trailing Z; naive date-time inputs are interpreted using tzid, then the authenticated user's timezone, then UTC."
          },
          "end": {
            "oneOf": [
              {
                "type": "string",
                "format": "date"
              },
              {
                "type": "string",
                "format": "date-time"
              }
            ],
            "description": "ISO 8601 date for an all-day event or ISO 8601 date-time for a timed event. The start and end value types must match; end is exclusive. Timed responses use UTC with a trailing Z; naive date-time inputs are interpreted using tzid, then the authenticated user's timezone, then UTC."
          },
          "tzid": {
            "type": "string",
            "nullable": true,
            "title": "Event-Zeitzone",
            "description": "IANA-Zeitzone für die Wall-Clock-Semantik von Serienterminen",
            "maxLength": 100
          },
          "start_fold": {
            "allOf": [
              {
                "enum": [
                  0,
                  1
                ],
                "type": "integer",
                "description": "* `0` - 0\n* `1` - 1",
                "x-schema-ref": "#/components/schemas/StartFoldEnum"
              }
            ],
            "writeOnly": true
          },
          "end_fold": {
            "allOf": [
              {
                "enum": [
                  0,
                  1
                ],
                "type": "integer",
                "description": "* `0` - 0\n* `1` - 1",
                "x-schema-ref": "#/components/schemas/EndFoldEnum"
              }
            ],
            "writeOnly": true
          },
          "rrule": {
            "type": "string",
            "nullable": true,
            "title": "Wiederholungsregel",
            "maxLength": 1000
          },
          "slots_enabled": {
            "type": "boolean",
            "title": "Teilnehmerverwaltung aktivieren"
          },
          "recurrences_enabled": {
            "type": "boolean",
            "title": "Wiederholungen aktivieren"
          },
          "materialize": {
            "type": "boolean",
            "writeOnly": true,
            "default": false
          },
          "recurrence_occurrence_action": {
            "allOf": [
              {
                "enum": [
                  "keep",
                  "delete"
                ],
                "type": "string",
                "description": "* `keep` - keep\n* `delete` - delete",
                "x-schema-ref": "#/components/schemas/RecurrenceOccurrenceActionEnum"
              }
            ],
            "writeOnly": true
          },
          "cover_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedEventWrite"
      }
    },
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404",
      "500"
    ],
    "requiredScopes": [
      "events:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "locations_autocomplete",
    "method": "GET",
    "path": "/api/v1/locations/autocomplete",
    "tags": [
      "locations"
    ],
    "parameters": [
      {
        "name": "query",
        "in": "query",
        "required": true,
        "type": "string"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200"
    ],
    "requiredScopes": [
      "events:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "locations_details",
    "method": "GET",
    "path": "/api/v1/locations/details",
    "tags": [
      "locations"
    ],
    "parameters": [
      {
        "name": "place_id",
        "in": "query",
        "required": true,
        "type": "string"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "400"
    ],
    "requiredScopes": [
      "events:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "me_api_tokens_create",
    "method": "POST",
    "path": "/api/v1/me/api-tokens",
    "tags": [
      "me"
    ],
    "parameters": [],
    "requestBodyRequired": true,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "maxLength": 120
          },
          "scopes": {
            "type": "array",
            "items": {
              "enum": [
                "profile:read",
                "profile:write",
                "calendars:read",
                "calendars:write",
                "events:read",
                "events:write",
                "slots:read",
                "slots:write",
                "organizations:read"
              ],
              "type": "string",
              "description": "* `profile:read` - profile:read\n* `profile:write` - profile:write\n* `calendars:read` - calendars:read\n* `calendars:write` - calendars:write\n* `events:read` - events:read\n* `events:write` - events:write\n* `slots:read` - slots:read\n* `slots:write` - slots:write\n* `organizations:read` - organizations:read",
              "x-schema-ref": "#/components/schemas/ScopesEnum"
            }
          },
          "expires_in_days": {
            "oneOf": [
              {
                "enum": [
                  "30",
                  "90",
                  "365"
                ],
                "type": "string",
                "description": "* `` - \n* `30` - 30\n* `90` - 90\n* `365` - 365",
                "x-schema-ref": "#/components/schemas/ExpiresInDaysEnum"
              },
              {
                "enum": [
                  ""
                ],
                "x-schema-ref": "#/components/schemas/BlankEnum"
              }
            ]
          }
        },
        "required": [
          "name"
        ],
        "x-schema-ref": "#/components/schemas/ApiTokenCreate"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "maxLength": 120
          },
          "scopes": {
            "type": "array",
            "items": {
              "enum": [
                "profile:read",
                "profile:write",
                "calendars:read",
                "calendars:write",
                "events:read",
                "events:write",
                "slots:read",
                "slots:write",
                "organizations:read"
              ],
              "type": "string",
              "description": "* `profile:read` - profile:read\n* `profile:write` - profile:write\n* `calendars:read` - calendars:read\n* `calendars:write` - calendars:write\n* `events:read` - events:read\n* `events:write` - events:write\n* `slots:read` - slots:read\n* `slots:write` - slots:write\n* `organizations:read` - organizations:read",
              "x-schema-ref": "#/components/schemas/ScopesEnum"
            }
          },
          "expires_in_days": {
            "oneOf": [
              {
                "enum": [
                  "30",
                  "90",
                  "365"
                ],
                "type": "string",
                "description": "* `` - \n* `30` - 30\n* `90` - 90\n* `365` - 365",
                "x-schema-ref": "#/components/schemas/ExpiresInDaysEnum"
              },
              {
                "enum": [
                  ""
                ],
                "x-schema-ref": "#/components/schemas/BlankEnum"
              }
            ]
          }
        },
        "required": [
          "name"
        ],
        "x-schema-ref": "#/components/schemas/ApiTokenCreate"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "maxLength": 120
          },
          "scopes": {
            "type": "array",
            "items": {
              "enum": [
                "profile:read",
                "profile:write",
                "calendars:read",
                "calendars:write",
                "events:read",
                "events:write",
                "slots:read",
                "slots:write",
                "organizations:read"
              ],
              "type": "string",
              "description": "* `profile:read` - profile:read\n* `profile:write` - profile:write\n* `calendars:read` - calendars:read\n* `calendars:write` - calendars:write\n* `events:read` - events:read\n* `events:write` - events:write\n* `slots:read` - slots:read\n* `slots:write` - slots:write\n* `organizations:read` - organizations:read",
              "x-schema-ref": "#/components/schemas/ScopesEnum"
            }
          },
          "expires_in_days": {
            "oneOf": [
              {
                "enum": [
                  "30",
                  "90",
                  "365"
                ],
                "type": "string",
                "description": "* `` - \n* `30` - 30\n* `90` - 90\n* `365` - 365",
                "x-schema-ref": "#/components/schemas/ExpiresInDaysEnum"
              },
              {
                "enum": [
                  ""
                ],
                "x-schema-ref": "#/components/schemas/BlankEnum"
              }
            ]
          }
        },
        "required": [
          "name"
        ],
        "x-schema-ref": "#/components/schemas/ApiTokenCreate"
      }
    },
    "responseStatuses": [
      "201",
      "400",
      "401",
      "403"
    ],
    "requiredScopes": [
      "profile:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "me_api_tokens_list",
    "method": "GET",
    "path": "/api/v1/me/api-tokens",
    "tags": [
      "me"
    ],
    "parameters": [],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403"
    ],
    "requiredScopes": [
      "profile:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "me_api_tokens_revoke",
    "method": "DELETE",
    "path": "/api/v1/me/api-tokens/{token_id}",
    "tags": [
      "me"
    ],
    "parameters": [
      {
        "name": "token_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "204",
      "401",
      "403"
    ],
    "requiredScopes": [
      "profile:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "me_delete",
    "method": "DELETE",
    "path": "/api/v1/me",
    "tags": [
      "me"
    ],
    "parameters": [],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "204",
      "401",
      "403",
      "500"
    ],
    "requiredScopes": [
      "profile:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "me_invitation_code_regenerate",
    "method": "POST",
    "path": "/api/v1/me/invitation-code",
    "tags": [
      "me"
    ],
    "parameters": [],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403"
    ],
    "requiredScopes": [
      "profile:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "me_registration_event_list",
    "method": "GET",
    "path": "/api/v1/me/registration-events",
    "tags": [
      "me"
    ],
    "parameters": [],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403"
    ],
    "requiredScopes": [
      "events:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "me_retrieve",
    "method": "GET",
    "path": "/api/v1/me",
    "tags": [
      "me"
    ],
    "parameters": [],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403"
    ],
    "requiredScopes": [
      "profile:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "me_update",
    "method": "PATCH",
    "path": "/api/v1/me",
    "tags": [
      "me"
    ],
    "parameters": [],
    "requestBodyRequired": false,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "first_name": {
            "type": "string",
            "title": "Vorname",
            "maxLength": 150
          },
          "last_name": {
            "type": "string",
            "title": "Nachname",
            "maxLength": 150
          },
          "timezone": {
            "allOf": [
              {
                "enum": [
                  "Africa/Abidjan",
                  "Africa/Accra",
                  "Africa/Addis_Ababa",
                  "Africa/Algiers",
                  "Africa/Asmara",
                  "Africa/Asmera",
                  "Africa/Bamako",
                  "Africa/Bangui",
                  "Africa/Banjul",
                  "Africa/Bissau",
                  "Africa/Blantyre",
                  "Africa/Brazzaville",
                  "Africa/Bujumbura",
                  "Africa/Cairo",
                  "Africa/Casablanca",
                  "Africa/Ceuta",
                  "Africa/Conakry",
                  "Africa/Dakar",
                  "Africa/Dar_es_Salaam",
                  "Africa/Djibouti",
                  "Africa/Douala",
                  "Africa/El_Aaiun",
                  "Africa/Freetown",
                  "Africa/Gaborone",
                  "Africa/Harare",
                  "Africa/Johannesburg",
                  "Africa/Juba",
                  "Africa/Kampala",
                  "Africa/Khartoum",
                  "Africa/Kigali",
                  "Africa/Kinshasa",
                  "Africa/Lagos",
                  "Africa/Libreville",
                  "Africa/Lome",
                  "Africa/Luanda",
                  "Africa/Lubumbashi",
                  "Africa/Lusaka",
                  "Africa/Malabo",
                  "Africa/Maputo",
                  "Africa/Maseru",
                  "Africa/Mbabane",
                  "Africa/Mogadishu",
                  "Africa/Monrovia",
                  "Africa/Nairobi",
                  "Africa/Ndjamena",
                  "Africa/Niamey",
                  "Africa/Nouakchott",
                  "Africa/Ouagadougou",
                  "Africa/Porto-Novo",
                  "Africa/Sao_Tome",
                  "Africa/Timbuktu",
                  "Africa/Tripoli",
                  "Africa/Tunis",
                  "Africa/Windhoek",
                  "America/Adak",
                  "America/Anchorage",
                  "America/Anguilla",
                  "America/Antigua",
                  "America/Araguaina",
                  "America/Argentina/Buenos_Aires",
                  "America/Argentina/Catamarca",
                  "America/Argentina/ComodRivadavia",
                  "America/Argentina/Cordoba",
                  "America/Argentina/Jujuy",
                  "America/Argentina/La_Rioja",
                  "America/Argentina/Mendoza",
                  "America/Argentina/Rio_Gallegos",
                  "America/Argentina/Salta",
                  "America/Argentina/San_Juan",
                  "America/Argentina/San_Luis",
                  "America/Argentina/Tucuman",
                  "America/Argentina/Ushuaia",
                  "America/Aruba",
                  "America/Asuncion",
                  "America/Atikokan",
                  "America/Atka",
                  "America/Bahia",
                  "America/Bahia_Banderas",
                  "America/Barbados",
                  "America/Belem",
                  "America/Belize",
                  "America/Blanc-Sablon",
                  "America/Boa_Vista",
                  "America/Bogota",
                  "America/Boise",
                  "America/Buenos_Aires",
                  "America/Cambridge_Bay",
                  "America/Campo_Grande",
                  "America/Cancun",
                  "America/Caracas",
                  "America/Catamarca",
                  "America/Cayenne",
                  "America/Cayman",
                  "America/Chicago",
                  "America/Chihuahua",
                  "America/Ciudad_Juarez",
                  "America/Coral_Harbour",
                  "America/Cordoba",
                  "America/Costa_Rica",
                  "America/Creston",
                  "America/Cuiaba",
                  "America/Curacao",
                  "America/Danmarkshavn",
                  "America/Dawson",
                  "America/Dawson_Creek",
                  "America/Denver",
                  "America/Detroit",
                  "America/Dominica",
                  "America/Edmonton",
                  "America/Eirunepe",
                  "America/El_Salvador",
                  "America/Ensenada",
                  "America/Fort_Nelson",
                  "America/Fort_Wayne",
                  "America/Fortaleza",
                  "America/Glace_Bay",
                  "America/Godthab",
                  "America/Goose_Bay",
                  "America/Grand_Turk",
                  "America/Grenada",
                  "America/Guadeloupe",
                  "America/Guatemala",
                  "America/Guayaquil",
                  "America/Guyana",
                  "America/Halifax",
                  "America/Havana",
                  "America/Hermosillo",
                  "America/Indiana/Indianapolis",
                  "America/Indiana/Knox",
                  "America/Indiana/Marengo",
                  "America/Indiana/Petersburg",
                  "America/Indiana/Tell_City",
                  "America/Indiana/Vevay",
                  "America/Indiana/Vincennes",
                  "America/Indiana/Winamac",
                  "America/Indianapolis",
                  "America/Inuvik",
                  "America/Iqaluit",
                  "America/Jamaica",
                  "America/Jujuy",
                  "America/Juneau",
                  "America/Kentucky/Louisville",
                  "America/Kentucky/Monticello",
                  "America/Knox_IN",
                  "America/Kralendijk",
                  "America/La_Paz",
                  "America/Lima",
                  "America/Los_Angeles",
                  "America/Louisville",
                  "America/Lower_Princes",
                  "America/Maceio",
                  "America/Managua",
                  "America/Manaus",
                  "America/Marigot",
                  "America/Martinique",
                  "America/Matamoros",
                  "America/Mazatlan",
                  "America/Mendoza",
                  "America/Menominee",
                  "America/Merida",
                  "America/Metlakatla",
                  "America/Mexico_City",
                  "America/Miquelon",
                  "America/Moncton",
                  "America/Monterrey",
                  "America/Montevideo",
                  "America/Montreal",
                  "America/Montserrat",
                  "America/Nassau",
                  "America/New_York",
                  "America/Nipigon",
                  "America/Nome",
                  "America/Noronha",
                  "America/North_Dakota/Beulah",
                  "America/North_Dakota/Center",
                  "America/North_Dakota/New_Salem",
                  "America/Nuuk",
                  "America/Ojinaga",
                  "America/Panama",
                  "America/Pangnirtung",
                  "America/Paramaribo",
                  "America/Phoenix",
                  "America/Port-au-Prince",
                  "America/Port_of_Spain",
                  "America/Porto_Acre",
                  "America/Porto_Velho",
                  "America/Puerto_Rico",
                  "America/Punta_Arenas",
                  "America/Rainy_River",
                  "America/Rankin_Inlet",
                  "America/Recife",
                  "America/Regina",
                  "America/Resolute",
                  "America/Rio_Branco",
                  "America/Rosario",
                  "America/Santa_Isabel",
                  "America/Santarem",
                  "America/Santiago",
                  "America/Santo_Domingo",
                  "America/Sao_Paulo",
                  "America/Scoresbysund",
                  "America/Shiprock",
                  "America/Sitka",
                  "America/St_Barthelemy",
                  "America/St_Johns",
                  "America/St_Kitts",
                  "America/St_Lucia",
                  "America/St_Thomas",
                  "America/St_Vincent",
                  "America/Swift_Current",
                  "America/Tegucigalpa",
                  "America/Thule",
                  "America/Thunder_Bay",
                  "America/Tijuana",
                  "America/Toronto",
                  "America/Tortola",
                  "America/Vancouver",
                  "America/Virgin",
                  "America/Whitehorse",
                  "America/Winnipeg",
                  "America/Yakutat",
                  "America/Yellowknife",
                  "Antarctica/Casey",
                  "Antarctica/Davis",
                  "Antarctica/DumontDUrville",
                  "Antarctica/Macquarie",
                  "Antarctica/Mawson",
                  "Antarctica/McMurdo",
                  "Antarctica/Palmer",
                  "Antarctica/Rothera",
                  "Antarctica/South_Pole",
                  "Antarctica/Syowa",
                  "Antarctica/Troll",
                  "Antarctica/Vostok",
                  "Arctic/Longyearbyen",
                  "Asia/Aden",
                  "Asia/Almaty",
                  "Asia/Amman",
                  "Asia/Anadyr",
                  "Asia/Aqtau",
                  "Asia/Aqtobe",
                  "Asia/Ashgabat",
                  "Asia/Ashkhabad",
                  "Asia/Atyrau",
                  "Asia/Baghdad",
                  "Asia/Bahrain",
                  "Asia/Baku",
                  "Asia/Bangkok",
                  "Asia/Barnaul",
                  "Asia/Beirut",
                  "Asia/Bishkek",
                  "Asia/Brunei",
                  "Asia/Calcutta",
                  "Asia/Chita",
                  "Asia/Choibalsan",
                  "Asia/Chongqing",
                  "Asia/Chungking",
                  "Asia/Colombo",
                  "Asia/Dacca",
                  "Asia/Damascus",
                  "Asia/Dhaka",
                  "Asia/Dili",
                  "Asia/Dubai",
                  "Asia/Dushanbe",
                  "Asia/Famagusta",
                  "Asia/Gaza",
                  "Asia/Hanoi",
                  "Asia/Harbin",
                  "Asia/Hebron",
                  "Asia/Ho_Chi_Minh",
                  "Asia/Hong_Kong",
                  "Asia/Hovd",
                  "Asia/Irkutsk",
                  "Asia/Istanbul",
                  "Asia/Jakarta",
                  "Asia/Jayapura",
                  "Asia/Jerusalem",
                  "Asia/Kabul",
                  "Asia/Kamchatka",
                  "Asia/Karachi",
                  "Asia/Kashgar",
                  "Asia/Kathmandu",
                  "Asia/Katmandu",
                  "Asia/Khandyga",
                  "Asia/Kolkata",
                  "Asia/Krasnoyarsk",
                  "Asia/Kuala_Lumpur",
                  "Asia/Kuching",
                  "Asia/Kuwait",
                  "Asia/Macao",
                  "Asia/Macau",
                  "Asia/Magadan",
                  "Asia/Makassar",
                  "Asia/Manila",
                  "Asia/Muscat",
                  "Asia/Nicosia",
                  "Asia/Novokuznetsk",
                  "Asia/Novosibirsk",
                  "Asia/Omsk",
                  "Asia/Oral",
                  "Asia/Phnom_Penh",
                  "Asia/Pontianak",
                  "Asia/Pyongyang",
                  "Asia/Qatar",
                  "Asia/Qostanay",
                  "Asia/Qyzylorda",
                  "Asia/Rangoon",
                  "Asia/Riyadh",
                  "Asia/Saigon",
                  "Asia/Sakhalin",
                  "Asia/Samarkand",
                  "Asia/Seoul",
                  "Asia/Shanghai",
                  "Asia/Singapore",
                  "Asia/Srednekolymsk",
                  "Asia/Taipei",
                  "Asia/Tashkent",
                  "Asia/Tbilisi",
                  "Asia/Tehran",
                  "Asia/Tel_Aviv",
                  "Asia/Thimbu",
                  "Asia/Thimphu",
                  "Asia/Tokyo",
                  "Asia/Tomsk",
                  "Asia/Ujung_Pandang",
                  "Asia/Ulaanbaatar",
                  "Asia/Ulan_Bator",
                  "Asia/Urumqi",
                  "Asia/Ust-Nera",
                  "Asia/Vientiane",
                  "Asia/Vladivostok",
                  "Asia/Yakutsk",
                  "Asia/Yangon",
                  "Asia/Yekaterinburg",
                  "Asia/Yerevan",
                  "Atlantic/Azores",
                  "Atlantic/Bermuda",
                  "Atlantic/Canary",
                  "Atlantic/Cape_Verde",
                  "Atlantic/Faeroe",
                  "Atlantic/Faroe",
                  "Atlantic/Jan_Mayen",
                  "Atlantic/Madeira",
                  "Atlantic/Reykjavik",
                  "Atlantic/South_Georgia",
                  "Atlantic/St_Helena",
                  "Atlantic/Stanley",
                  "Australia/ACT",
                  "Australia/Adelaide",
                  "Australia/Brisbane",
                  "Australia/Broken_Hill",
                  "Australia/Canberra",
                  "Australia/Currie",
                  "Australia/Darwin",
                  "Australia/Eucla",
                  "Australia/Hobart",
                  "Australia/LHI",
                  "Australia/Lindeman",
                  "Australia/Lord_Howe",
                  "Australia/Melbourne",
                  "Australia/NSW",
                  "Australia/North",
                  "Australia/Perth",
                  "Australia/Queensland",
                  "Australia/South",
                  "Australia/Sydney",
                  "Australia/Tasmania",
                  "Australia/Victoria",
                  "Australia/West",
                  "Australia/Yancowinna",
                  "Brazil/Acre",
                  "Brazil/DeNoronha",
                  "Brazil/East",
                  "Brazil/West",
                  "CET",
                  "CST6CDT",
                  "Canada/Atlantic",
                  "Canada/Central",
                  "Canada/Eastern",
                  "Canada/Mountain",
                  "Canada/Newfoundland",
                  "Canada/Pacific",
                  "Canada/Saskatchewan",
                  "Canada/Yukon",
                  "Chile/Continental",
                  "Chile/EasterIsland",
                  "Cuba",
                  "EET",
                  "EST",
                  "EST5EDT",
                  "Egypt",
                  "Eire",
                  "Etc/GMT",
                  "Etc/GMT+0",
                  "Etc/GMT+1",
                  "Etc/GMT+10",
                  "Etc/GMT+11",
                  "Etc/GMT+12",
                  "Etc/GMT+2",
                  "Etc/GMT+3",
                  "Etc/GMT+4",
                  "Etc/GMT+5",
                  "Etc/GMT+6",
                  "Etc/GMT+7",
                  "Etc/GMT+8",
                  "Etc/GMT+9",
                  "Etc/GMT-0",
                  "Etc/GMT-1",
                  "Etc/GMT-10",
                  "Etc/GMT-11",
                  "Etc/GMT-12",
                  "Etc/GMT-13",
                  "Etc/GMT-14",
                  "Etc/GMT-2",
                  "Etc/GMT-3",
                  "Etc/GMT-4",
                  "Etc/GMT-5",
                  "Etc/GMT-6",
                  "Etc/GMT-7",
                  "Etc/GMT-8",
                  "Etc/GMT-9",
                  "Etc/GMT0",
                  "Etc/Greenwich",
                  "Etc/UCT",
                  "Etc/UTC",
                  "Etc/Universal",
                  "Etc/Zulu",
                  "Europe/Amsterdam",
                  "Europe/Andorra",
                  "Europe/Astrakhan",
                  "Europe/Athens",
                  "Europe/Belfast",
                  "Europe/Belgrade",
                  "Europe/Berlin",
                  "Europe/Bratislava",
                  "Europe/Brussels",
                  "Europe/Bucharest",
                  "Europe/Budapest",
                  "Europe/Busingen",
                  "Europe/Chisinau",
                  "Europe/Copenhagen",
                  "Europe/Dublin",
                  "Europe/Gibraltar",
                  "Europe/Guernsey",
                  "Europe/Helsinki",
                  "Europe/Isle_of_Man",
                  "Europe/Istanbul",
                  "Europe/Jersey",
                  "Europe/Kaliningrad",
                  "Europe/Kiev",
                  "Europe/Kirov",
                  "Europe/Kyiv",
                  "Europe/Lisbon",
                  "Europe/Ljubljana",
                  "Europe/London",
                  "Europe/Luxembourg",
                  "Europe/Madrid",
                  "Europe/Malta",
                  "Europe/Mariehamn",
                  "Europe/Minsk",
                  "Europe/Monaco",
                  "Europe/Moscow",
                  "Europe/Nicosia",
                  "Europe/Oslo",
                  "Europe/Paris",
                  "Europe/Podgorica",
                  "Europe/Prague",
                  "Europe/Riga",
                  "Europe/Rome",
                  "Europe/Samara",
                  "Europe/San_Marino",
                  "Europe/Sarajevo",
                  "Europe/Saratov",
                  "Europe/Simferopol",
                  "Europe/Skopje",
                  "Europe/Sofia",
                  "Europe/Stockholm",
                  "Europe/Tallinn",
                  "Europe/Tirane",
                  "Europe/Tiraspol",
                  "Europe/Ulyanovsk",
                  "Europe/Uzhgorod",
                  "Europe/Vaduz",
                  "Europe/Vatican",
                  "Europe/Vienna",
                  "Europe/Vilnius",
                  "Europe/Volgograd",
                  "Europe/Warsaw",
                  "Europe/Zagreb",
                  "Europe/Zaporozhye",
                  "Europe/Zurich",
                  "Factory",
                  "GB",
                  "GB-Eire",
                  "GMT",
                  "GMT+0",
                  "GMT-0",
                  "GMT0",
                  "Greenwich",
                  "HST",
                  "Hongkong",
                  "Iceland",
                  "Indian/Antananarivo",
                  "Indian/Chagos",
                  "Indian/Christmas",
                  "Indian/Cocos",
                  "Indian/Comoro",
                  "Indian/Kerguelen",
                  "Indian/Mahe",
                  "Indian/Maldives",
                  "Indian/Mauritius",
                  "Indian/Mayotte",
                  "Indian/Reunion",
                  "Iran",
                  "Israel",
                  "Jamaica",
                  "Japan",
                  "Kwajalein",
                  "Libya",
                  "MET",
                  "MST",
                  "MST7MDT",
                  "Mexico/BajaNorte",
                  "Mexico/BajaSur",
                  "Mexico/General",
                  "NZ",
                  "NZ-CHAT",
                  "Navajo",
                  "PRC",
                  "PST8PDT",
                  "Pacific/Apia",
                  "Pacific/Auckland",
                  "Pacific/Bougainville",
                  "Pacific/Chatham",
                  "Pacific/Chuuk",
                  "Pacific/Easter",
                  "Pacific/Efate",
                  "Pacific/Enderbury",
                  "Pacific/Fakaofo",
                  "Pacific/Fiji",
                  "Pacific/Funafuti",
                  "Pacific/Galapagos",
                  "Pacific/Gambier",
                  "Pacific/Guadalcanal",
                  "Pacific/Guam",
                  "Pacific/Honolulu",
                  "Pacific/Johnston",
                  "Pacific/Kanton",
                  "Pacific/Kiritimati",
                  "Pacific/Kosrae",
                  "Pacific/Kwajalein",
                  "Pacific/Majuro",
                  "Pacific/Marquesas",
                  "Pacific/Midway",
                  "Pacific/Nauru",
                  "Pacific/Niue",
                  "Pacific/Norfolk",
                  "Pacific/Noumea",
                  "Pacific/Pago_Pago",
                  "Pacific/Palau",
                  "Pacific/Pitcairn",
                  "Pacific/Pohnpei",
                  "Pacific/Ponape",
                  "Pacific/Port_Moresby",
                  "Pacific/Rarotonga",
                  "Pacific/Saipan",
                  "Pacific/Samoa",
                  "Pacific/Tahiti",
                  "Pacific/Tarawa",
                  "Pacific/Tongatapu",
                  "Pacific/Truk",
                  "Pacific/Wake",
                  "Pacific/Wallis",
                  "Pacific/Yap",
                  "Poland",
                  "Portugal",
                  "ROC",
                  "ROK",
                  "Singapore",
                  "Turkey",
                  "UCT",
                  "US/Alaska",
                  "US/Aleutian",
                  "US/Arizona",
                  "US/Central",
                  "US/East-Indiana",
                  "US/Eastern",
                  "US/Hawaii",
                  "US/Indiana-Starke",
                  "US/Michigan",
                  "US/Mountain",
                  "US/Pacific",
                  "US/Samoa",
                  "UTC",
                  "Universal",
                  "W-SU",
                  "WET",
                  "Zulu"
                ],
                "type": "string",
                "description": "* `Africa/Abidjan` - Africa/Abidjan\n* `Africa/Accra` - Africa/Accra\n* `Africa/Addis_Ababa` - Africa/Addis_Ababa\n* `Africa/Algiers` - Africa/Algiers\n* `Africa/Asmara` - Africa/Asmara\n* `Africa/Asmera` - Africa/Asmera\n* `Africa/Bamako` - Africa/Bamako\n* `Africa/Bangui` - Africa/Bangui\n* `Africa/Banjul` - Africa/Banjul\n* `Africa/Bissau` - Africa/Bissau\n* `Africa/Blantyre` - Africa/Blantyre\n* `Africa/Brazzaville` - Africa/Brazzaville\n* `Africa/Bujumbura` - Africa/Bujumbura\n* `Africa/Cairo` - Africa/Cairo\n* `Africa/Casablanca` - Africa/Casablanca\n* `Africa/Ceuta` - Africa/Ceuta\n* `Africa/Conakry` - Africa/Conakry\n* `Africa/Dakar` - Africa/Dakar\n* `Africa/Dar_es_Salaam` - Africa/Dar_es_Salaam\n* `Africa/Djibouti` - Africa/Djibouti\n* `Africa/Douala` - Africa/Douala\n* `Africa/El_Aaiun` - Africa/El_Aaiun\n* `Africa/Freetown` - Africa/Freetown\n* `Africa/Gaborone` - Africa/Gaborone\n* `Africa/Harare` - Africa/Harare\n* `Africa/Johannesburg` - Africa/Johannesburg\n* `Africa/Juba` - Africa/Juba\n* `Africa/Kampala` - Africa/Kampala\n* `Africa/Khartoum` - Africa/Khartoum\n* `Africa/Kigali` - Africa/Kigali\n* `Africa/Kinshasa` - Africa/Kinshasa\n* `Africa/Lagos` - Africa/Lagos\n* `Africa/Libreville` - Africa/Libreville\n* `Africa/Lome` - Africa/Lome\n* `Africa/Luanda` - Africa/Luanda\n* `Africa/Lubumbashi` - Africa/Lubumbashi\n* `Africa/Lusaka` - Africa/Lusaka\n* `Africa/Malabo` - Africa/Malabo\n* `Africa/Maputo` - Africa/Maputo\n* `Africa/Maseru` - Africa/Maseru\n* `Africa/Mbabane` - Africa/Mbabane\n* `Africa/Mogadishu` - Africa/Mogadishu\n* `Africa/Monrovia` - Africa/Monrovia\n* `Africa/Nairobi` - Africa/Nairobi\n* `Africa/Ndjamena` - Africa/Ndjamena\n* `Africa/Niamey` - Africa/Niamey\n* `Africa/Nouakchott` - Africa/Nouakchott\n* `Africa/Ouagadougou` - Africa/Ouagadougou\n* `Africa/Porto-Novo` - Africa/Porto-Novo\n* `Africa/Sao_Tome` - Africa/Sao_Tome\n* `Africa/Timbuktu` - Africa/Timbuktu\n* `Africa/Tripoli` - Africa/Tripoli\n* `Africa/Tunis` - Africa/Tunis\n* `Africa/Windhoek` - Africa/Windhoek\n* `America/Adak` - America/Adak\n* `America/Anchorage` - America/Anchorage\n* `America/Anguilla` - America/Anguilla\n* `America/Antigua` - America/Antigua\n* `America/Araguaina` - America/Araguaina\n* `America/Argentina/Buenos_Aires` - America/Argentina/Buenos_Aires\n* `America/Argentina/Catamarca` - America/Argentina/Catamarca\n* `America/Argentina/ComodRivadavia` - America/Argentina/ComodRivadavia\n* `America/Argentina/Cordoba` - America/Argentina/Cordoba\n* `America/Argentina/Jujuy` - America/Argentina/Jujuy\n* `America/Argentina/La_Rioja` - America/Argentina/La_Rioja\n* `America/Argentina/Mendoza` - America/Argentina/Mendoza\n* `America/Argentina/Rio_Gallegos` - America/Argentina/Rio_Gallegos\n* `America/Argentina/Salta` - America/Argentina/Salta\n* `America/Argentina/San_Juan` - America/Argentina/San_Juan\n* `America/Argentina/San_Luis` - America/Argentina/San_Luis\n* `America/Argentina/Tucuman` - America/Argentina/Tucuman\n* `America/Argentina/Ushuaia` - America/Argentina/Ushuaia\n* `America/Aruba` - America/Aruba\n* `America/Asuncion` - America/Asuncion\n* `America/Atikokan` - America/Atikokan\n* `America/Atka` - America/Atka\n* `America/Bahia` - America/Bahia\n* `America/Bahia_Banderas` - America/Bahia_Banderas\n* `America/Barbados` - America/Barbados\n* `America/Belem` - America/Belem\n* `America/Belize` - America/Belize\n* `America/Blanc-Sablon` - America/Blanc-Sablon\n* `America/Boa_Vista` - America/Boa_Vista\n* `America/Bogota` - America/Bogota\n* `America/Boise` - America/Boise\n* `America/Buenos_Aires` - America/Buenos_Aires\n* `America/Cambridge_Bay` - America/Cambridge_Bay\n* `America/Campo_Grande` - America/Campo_Grande\n* `America/Cancun` - America/Cancun\n* `America/Caracas` - America/Caracas\n* `America/Catamarca` - America/Catamarca\n* `America/Cayenne` - America/Cayenne\n* `America/Cayman` - America/Cayman\n* `America/Chicago` - America/Chicago\n* `America/Chihuahua` - America/Chihuahua\n* `America/Ciudad_Juarez` - America/Ciudad_Juarez\n* `America/Coral_Harbour` - America/Coral_Harbour\n* `America/Cordoba` - America/Cordoba\n* `America/Costa_Rica` - America/Costa_Rica\n* `America/Creston` - America/Creston\n* `America/Cuiaba` - America/Cuiaba\n* `America/Curacao` - America/Curacao\n* `America/Danmarkshavn` - America/Danmarkshavn\n* `America/Dawson` - America/Dawson\n* `America/Dawson_Creek` - America/Dawson_Creek\n* `America/Denver` - America/Denver\n* `America/Detroit` - America/Detroit\n* `America/Dominica` - America/Dominica\n* `America/Edmonton` - America/Edmonton\n* `America/Eirunepe` - America/Eirunepe\n* `America/El_Salvador` - America/El_Salvador\n* `America/Ensenada` - America/Ensenada\n* `America/Fort_Nelson` - America/Fort_Nelson\n* `America/Fort_Wayne` - America/Fort_Wayne\n* `America/Fortaleza` - America/Fortaleza\n* `America/Glace_Bay` - America/Glace_Bay\n* `America/Godthab` - America/Godthab\n* `America/Goose_Bay` - America/Goose_Bay\n* `America/Grand_Turk` - America/Grand_Turk\n* `America/Grenada` - America/Grenada\n* `America/Guadeloupe` - America/Guadeloupe\n* `America/Guatemala` - America/Guatemala\n* `America/Guayaquil` - America/Guayaquil\n* `America/Guyana` - America/Guyana\n* `America/Halifax` - America/Halifax\n* `America/Havana` - America/Havana\n* `America/Hermosillo` - America/Hermosillo\n* `America/Indiana/Indianapolis` - America/Indiana/Indianapolis\n* `America/Indiana/Knox` - America/Indiana/Knox\n* `America/Indiana/Marengo` - America/Indiana/Marengo\n* `America/Indiana/Petersburg` - America/Indiana/Petersburg\n* `America/Indiana/Tell_City` - America/Indiana/Tell_City\n* `America/Indiana/Vevay` - America/Indiana/Vevay\n* `America/Indiana/Vincennes` - America/Indiana/Vincennes\n* `America/Indiana/Winamac` - America/Indiana/Winamac\n* `America/Indianapolis` - America/Indianapolis\n* `America/Inuvik` - America/Inuvik\n* `America/Iqaluit` - America/Iqaluit\n* `America/Jamaica` - America/Jamaica\n* `America/Jujuy` - America/Jujuy\n* `America/Juneau` - America/Juneau\n* `America/Kentucky/Louisville` - America/Kentucky/Louisville\n* `America/Kentucky/Monticello` - America/Kentucky/Monticello\n* `America/Knox_IN` - America/Knox_IN\n* `America/Kralendijk` - America/Kralendijk\n* `America/La_Paz` - America/La_Paz\n* `America/Lima` - America/Lima\n* `America/Los_Angeles` - America/Los_Angeles\n* `America/Louisville` - America/Louisville\n* `America/Lower_Princes` - America/Lower_Princes\n* `America/Maceio` - America/Maceio\n* `America/Managua` - America/Managua\n* `America/Manaus` - America/Manaus\n* `America/Marigot` - America/Marigot\n* `America/Martinique` - America/Martinique\n* `America/Matamoros` - America/Matamoros\n* `America/Mazatlan` - America/Mazatlan\n* `America/Mendoza` - America/Mendoza\n* `America/Menominee` - America/Menominee\n* `America/Merida` - America/Merida\n* `America/Metlakatla` - America/Metlakatla\n* `America/Mexico_City` - America/Mexico_City\n* `America/Miquelon` - America/Miquelon\n* `America/Moncton` - America/Moncton\n* `America/Monterrey` - America/Monterrey\n* `America/Montevideo` - America/Montevideo\n* `America/Montreal` - America/Montreal\n* `America/Montserrat` - America/Montserrat\n* `America/Nassau` - America/Nassau\n* `America/New_York` - America/New_York\n* `America/Nipigon` - America/Nipigon\n* `America/Nome` - America/Nome\n* `America/Noronha` - America/Noronha\n* `America/North_Dakota/Beulah` - America/North_Dakota/Beulah\n* `America/North_Dakota/Center` - America/North_Dakota/Center\n* `America/North_Dakota/New_Salem` - America/North_Dakota/New_Salem\n* `America/Nuuk` - America/Nuuk\n* `America/Ojinaga` - America/Ojinaga\n* `America/Panama` - America/Panama\n* `America/Pangnirtung` - America/Pangnirtung\n* `America/Paramaribo` - America/Paramaribo\n* `America/Phoenix` - America/Phoenix\n* `America/Port-au-Prince` - America/Port-au-Prince\n* `America/Port_of_Spain` - America/Port_of_Spain\n* `America/Porto_Acre` - America/Porto_Acre\n* `America/Porto_Velho` - America/Porto_Velho\n* `America/Puerto_Rico` - America/Puerto_Rico\n* `America/Punta_Arenas` - America/Punta_Arenas\n* `America/Rainy_River` - America/Rainy_River\n* `America/Rankin_Inlet` - America/Rankin_Inlet\n* `America/Recife` - America/Recife\n* `America/Regina` - America/Regina\n* `America/Resolute` - America/Resolute\n* `America/Rio_Branco` - America/Rio_Branco\n* `America/Rosario` - America/Rosario\n* `America/Santa_Isabel` - America/Santa_Isabel\n* `America/Santarem` - America/Santarem\n* `America/Santiago` - America/Santiago\n* `America/Santo_Domingo` - America/Santo_Domingo\n* `America/Sao_Paulo` - America/Sao_Paulo\n* `America/Scoresbysund` - America/Scoresbysund\n* `America/Shiprock` - America/Shiprock\n* `America/Sitka` - America/Sitka\n* `America/St_Barthelemy` - America/St_Barthelemy\n* `America/St_Johns` - America/St_Johns\n* `America/St_Kitts` - America/St_Kitts\n* `America/St_Lucia` - America/St_Lucia\n* `America/St_Thomas` - America/St_Thomas\n* `America/St_Vincent` - America/St_Vincent\n* `America/Swift_Current` - America/Swift_Current\n* `America/Tegucigalpa` - America/Tegucigalpa\n* `America/Thule` - America/Thule\n* `America/Thunder_Bay` - America/Thunder_Bay\n* `America/Tijuana` - America/Tijuana\n* `America/Toronto` - America/Toronto\n* `America/Tortola` - America/Tortola\n* `America/Vancouver` - America/Vancouver\n* `America/Virgin` - America/Virgin\n* `America/Whitehorse` - America/Whitehorse\n* `America/Winnipeg` - America/Winnipeg\n* `America/Yakutat` - America/Yakutat\n* `America/Yellowknife` - America/Yellowknife\n* `Antarctica/Casey` - Antarctica/Casey\n* `Antarctica/Davis` - Antarctica/Davis\n* `Antarctica/DumontDUrville` - Antarctica/DumontDUrville\n* `Antarctica/Macquarie` - Antarctica/Macquarie\n* `Antarctica/Mawson` - Antarctica/Mawson\n* `Antarctica/McMurdo` - Antarctica/McMurdo\n* `Antarctica/Palmer` - Antarctica/Palmer\n* `Antarctica/Rothera` - Antarctica/Rothera\n* `Antarctica/South_Pole` - Antarctica/South_Pole\n* `Antarctica/Syowa` - Antarctica/Syowa\n* `Antarctica/Troll` - Antarctica/Troll\n* `Antarctica/Vostok` - Antarctica/Vostok\n* `Arctic/Longyearbyen` - Arctic/Longyearbyen\n* `Asia/Aden` - Asia/Aden\n* `Asia/Almaty` - Asia/Almaty\n* `Asia/Amman` - Asia/Amman\n* `Asia/Anadyr` - Asia/Anadyr\n* `Asia/Aqtau` - Asia/Aqtau\n* `Asia/Aqtobe` - Asia/Aqtobe\n* `Asia/Ashgabat` - Asia/Ashgabat\n* `Asia/Ashkhabad` - Asia/Ashkhabad\n* `Asia/Atyrau` - Asia/Atyrau\n* `Asia/Baghdad` - Asia/Baghdad\n* `Asia/Bahrain` - Asia/Bahrain\n* `Asia/Baku` - Asia/Baku\n* `Asia/Bangkok` - Asia/Bangkok\n* `Asia/Barnaul` - Asia/Barnaul\n* `Asia/Beirut` - Asia/Beirut\n* `Asia/Bishkek` - Asia/Bishkek\n* `Asia/Brunei` - Asia/Brunei\n* `Asia/Calcutta` - Asia/Calcutta\n* `Asia/Chita` - Asia/Chita\n* `Asia/Choibalsan` - Asia/Choibalsan\n* `Asia/Chongqing` - Asia/Chongqing\n* `Asia/Chungking` - Asia/Chungking\n* `Asia/Colombo` - Asia/Colombo\n* `Asia/Dacca` - Asia/Dacca\n* `Asia/Damascus` - Asia/Damascus\n* `Asia/Dhaka` - Asia/Dhaka\n* `Asia/Dili` - Asia/Dili\n* `Asia/Dubai` - Asia/Dubai\n* `Asia/Dushanbe` - Asia/Dushanbe\n* `Asia/Famagusta` - Asia/Famagusta\n* `Asia/Gaza` - Asia/Gaza\n* `Asia/Hanoi` - Asia/Hanoi\n* `Asia/Harbin` - Asia/Harbin\n* `Asia/Hebron` - Asia/Hebron\n* `Asia/Ho_Chi_Minh` - Asia/Ho_Chi_Minh\n* `Asia/Hong_Kong` - Asia/Hong_Kong\n* `Asia/Hovd` - Asia/Hovd\n* `Asia/Irkutsk` - Asia/Irkutsk\n* `Asia/Istanbul` - Asia/Istanbul\n* `Asia/Jakarta` - Asia/Jakarta\n* `Asia/Jayapura` - Asia/Jayapura\n* `Asia/Jerusalem` - Asia/Jerusalem\n* `Asia/Kabul` - Asia/Kabul\n* `Asia/Kamchatka` - Asia/Kamchatka\n* `Asia/Karachi` - Asia/Karachi\n* `Asia/Kashgar` - Asia/Kashgar\n* `Asia/Kathmandu` - Asia/Kathmandu\n* `Asia/Katmandu` - Asia/Katmandu\n* `Asia/Khandyga` - Asia/Khandyga\n* `Asia/Kolkata` - Asia/Kolkata\n* `Asia/Krasnoyarsk` - Asia/Krasnoyarsk\n* `Asia/Kuala_Lumpur` - Asia/Kuala_Lumpur\n* `Asia/Kuching` - Asia/Kuching\n* `Asia/Kuwait` - Asia/Kuwait\n* `Asia/Macao` - Asia/Macao\n* `Asia/Macau` - Asia/Macau\n* `Asia/Magadan` - Asia/Magadan\n* `Asia/Makassar` - Asia/Makassar\n* `Asia/Manila` - Asia/Manila\n* `Asia/Muscat` - Asia/Muscat\n* `Asia/Nicosia` - Asia/Nicosia\n* `Asia/Novokuznetsk` - Asia/Novokuznetsk\n* `Asia/Novosibirsk` - Asia/Novosibirsk\n* `Asia/Omsk` - Asia/Omsk\n* `Asia/Oral` - Asia/Oral\n* `Asia/Phnom_Penh` - Asia/Phnom_Penh\n* `Asia/Pontianak` - Asia/Pontianak\n* `Asia/Pyongyang` - Asia/Pyongyang\n* `Asia/Qatar` - Asia/Qatar\n* `Asia/Qostanay` - Asia/Qostanay\n* `Asia/Qyzylorda` - Asia/Qyzylorda\n* `Asia/Rangoon` - Asia/Rangoon\n* `Asia/Riyadh` - Asia/Riyadh\n* `Asia/Saigon` - Asia/Saigon\n* `Asia/Sakhalin` - Asia/Sakhalin\n* `Asia/Samarkand` - Asia/Samarkand\n* `Asia/Seoul` - Asia/Seoul\n* `Asia/Shanghai` - Asia/Shanghai\n* `Asia/Singapore` - Asia/Singapore\n* `Asia/Srednekolymsk` - Asia/Srednekolymsk\n* `Asia/Taipei` - Asia/Taipei\n* `Asia/Tashkent` - Asia/Tashkent\n* `Asia/Tbilisi` - Asia/Tbilisi\n* `Asia/Tehran` - Asia/Tehran\n* `Asia/Tel_Aviv` - Asia/Tel_Aviv\n* `Asia/Thimbu` - Asia/Thimbu\n* `Asia/Thimphu` - Asia/Thimphu\n* `Asia/Tokyo` - Asia/Tokyo\n* `Asia/Tomsk` - Asia/Tomsk\n* `Asia/Ujung_Pandang` - Asia/Ujung_Pandang\n* `Asia/Ulaanbaatar` - Asia/Ulaanbaatar\n* `Asia/Ulan_Bator` - Asia/Ulan_Bator\n* `Asia/Urumqi` - Asia/Urumqi\n* `Asia/Ust-Nera` - Asia/Ust-Nera\n* `Asia/Vientiane` - Asia/Vientiane\n* `Asia/Vladivostok` - Asia/Vladivostok\n* `Asia/Yakutsk` - Asia/Yakutsk\n* `Asia/Yangon` - Asia/Yangon\n* `Asia/Yekaterinburg` - Asia/Yekaterinburg\n* `Asia/Yerevan` - Asia/Yerevan\n* `Atlantic/Azores` - Atlantic/Azores\n* `Atlantic/Bermuda` - Atlantic/Bermuda\n* `Atlantic/Canary` - Atlantic/Canary\n* `Atlantic/Cape_Verde` - Atlantic/Cape_Verde\n* `Atlantic/Faeroe` - Atlantic/Faeroe\n* `Atlantic/Faroe` - Atlantic/Faroe\n* `Atlantic/Jan_Mayen` - Atlantic/Jan_Mayen\n* `Atlantic/Madeira` - Atlantic/Madeira\n* `Atlantic/Reykjavik` - Atlantic/Reykjavik\n* `Atlantic/South_Georgia` - Atlantic/South_Georgia\n* `Atlantic/St_Helena` - Atlantic/St_Helena\n* `Atlantic/Stanley` - Atlantic/Stanley\n* `Australia/ACT` - Australia/ACT\n* `Australia/Adelaide` - Australia/Adelaide\n* `Australia/Brisbane` - Australia/Brisbane\n* `Australia/Broken_Hill` - Australia/Broken_Hill\n* `Australia/Canberra` - Australia/Canberra\n* `Australia/Currie` - Australia/Currie\n* `Australia/Darwin` - Australia/Darwin\n* `Australia/Eucla` - Australia/Eucla\n* `Australia/Hobart` - Australia/Hobart\n* `Australia/LHI` - Australia/LHI\n* `Australia/Lindeman` - Australia/Lindeman\n* `Australia/Lord_Howe` - Australia/Lord_Howe\n* `Australia/Melbourne` - Australia/Melbourne\n* `Australia/NSW` - Australia/NSW\n* `Australia/North` - Australia/North\n* `Australia/Perth` - Australia/Perth\n* `Australia/Queensland` - Australia/Queensland\n* `Australia/South` - Australia/South\n* `Australia/Sydney` - Australia/Sydney\n* `Australia/Tasmania` - Australia/Tasmania\n* `Australia/Victoria` - Australia/Victoria\n* `Australia/West` - Australia/West\n* `Australia/Yancowinna` - Australia/Yancowinna\n* `Brazil/Acre` - Brazil/Acre\n* `Brazil/DeNoronha` - Brazil/DeNoronha\n* `Brazil/East` - Brazil/East\n* `Brazil/West` - Brazil/West\n* `CET` - CET\n* `CST6CDT` - CST6CDT\n* `Canada/Atlantic` - Canada/Atlantic\n* `Canada/Central` - Canada/Central\n* `Canada/Eastern` - Canada/Eastern\n* `Canada/Mountain` - Canada/Mountain\n* `Canada/Newfoundland` - Canada/Newfoundland\n* `Canada/Pacific` - Canada/Pacific\n* `Canada/Saskatchewan` - Canada/Saskatchewan\n* `Canada/Yukon` - Canada/Yukon\n* `Chile/Continental` - Chile/Continental\n* `Chile/EasterIsland` - Chile/EasterIsland\n* `Cuba` - Cuba\n* `EET` - EET\n* `EST` - EST\n* `EST5EDT` - EST5EDT\n* `Egypt` - Egypt\n* `Eire` - Eire\n* `Etc/GMT` - Etc/GMT\n* `Etc/GMT+0` - Etc/GMT+0\n* `Etc/GMT+1` - Etc/GMT+1\n* `Etc/GMT+10` - Etc/GMT+10\n* `Etc/GMT+11` - Etc/GMT+11\n* `Etc/GMT+12` - Etc/GMT+12\n* `Etc/GMT+2` - Etc/GMT+2\n* `Etc/GMT+3` - Etc/GMT+3\n* `Etc/GMT+4` - Etc/GMT+4\n* `Etc/GMT+5` - Etc/GMT+5\n* `Etc/GMT+6` - Etc/GMT+6\n* `Etc/GMT+7` - Etc/GMT+7\n* `Etc/GMT+8` - Etc/GMT+8\n* `Etc/GMT+9` - Etc/GMT+9\n* `Etc/GMT-0` - Etc/GMT-0\n* `Etc/GMT-1` - Etc/GMT-1\n* `Etc/GMT-10` - Etc/GMT-10\n* `Etc/GMT-11` - Etc/GMT-11\n* `Etc/GMT-12` - Etc/GMT-12\n* `Etc/GMT-13` - Etc/GMT-13\n* `Etc/GMT-14` - Etc/GMT-14\n* `Etc/GMT-2` - Etc/GMT-2\n* `Etc/GMT-3` - Etc/GMT-3\n* `Etc/GMT-4` - Etc/GMT-4\n* `Etc/GMT-5` - Etc/GMT-5\n* `Etc/GMT-6` - Etc/GMT-6\n* `Etc/GMT-7` - Etc/GMT-7\n* `Etc/GMT-8` - Etc/GMT-8\n* `Etc/GMT-9` - Etc/GMT-9\n* `Etc/GMT0` - Etc/GMT0\n* `Etc/Greenwich` - Etc/Greenwich\n* `Etc/UCT` - Etc/UCT\n* `Etc/UTC` - Etc/UTC\n* `Etc/Universal` - Etc/Universal\n* `Etc/Zulu` - Etc/Zulu\n* `Europe/Amsterdam` - Europe/Amsterdam\n* `Europe/Andorra` - Europe/Andorra\n* `Europe/Astrakhan` - Europe/Astrakhan\n* `Europe/Athens` - Europe/Athens\n* `Europe/Belfast` - Europe/Belfast\n* `Europe/Belgrade` - Europe/Belgrade\n* `Europe/Berlin` - Europe/Berlin\n* `Europe/Bratislava` - Europe/Bratislava\n* `Europe/Brussels` - Europe/Brussels\n* `Europe/Bucharest` - Europe/Bucharest\n* `Europe/Budapest` - Europe/Budapest\n* `Europe/Busingen` - Europe/Busingen\n* `Europe/Chisinau` - Europe/Chisinau\n* `Europe/Copenhagen` - Europe/Copenhagen\n* `Europe/Dublin` - Europe/Dublin\n* `Europe/Gibraltar` - Europe/Gibraltar\n* `Europe/Guernsey` - Europe/Guernsey\n* `Europe/Helsinki` - Europe/Helsinki\n* `Europe/Isle_of_Man` - Europe/Isle_of_Man\n* `Europe/Istanbul` - Europe/Istanbul\n* `Europe/Jersey` - Europe/Jersey\n* `Europe/Kaliningrad` - Europe/Kaliningrad\n* `Europe/Kiev` - Europe/Kiev\n* `Europe/Kirov` - Europe/Kirov\n* `Europe/Kyiv` - Europe/Kyiv\n* `Europe/Lisbon` - Europe/Lisbon\n* `Europe/Ljubljana` - Europe/Ljubljana\n* `Europe/London` - Europe/London\n* `Europe/Luxembourg` - Europe/Luxembourg\n* `Europe/Madrid` - Europe/Madrid\n* `Europe/Malta` - Europe/Malta\n* `Europe/Mariehamn` - Europe/Mariehamn\n* `Europe/Minsk` - Europe/Minsk\n* `Europe/Monaco` - Europe/Monaco\n* `Europe/Moscow` - Europe/Moscow\n* `Europe/Nicosia` - Europe/Nicosia\n* `Europe/Oslo` - Europe/Oslo\n* `Europe/Paris` - Europe/Paris\n* `Europe/Podgorica` - Europe/Podgorica\n* `Europe/Prague` - Europe/Prague\n* `Europe/Riga` - Europe/Riga\n* `Europe/Rome` - Europe/Rome\n* `Europe/Samara` - Europe/Samara\n* `Europe/San_Marino` - Europe/San_Marino\n* `Europe/Sarajevo` - Europe/Sarajevo\n* `Europe/Saratov` - Europe/Saratov\n* `Europe/Simferopol` - Europe/Simferopol\n* `Europe/Skopje` - Europe/Skopje\n* `Europe/Sofia` - Europe/Sofia\n* `Europe/Stockholm` - Europe/Stockholm\n* `Europe/Tallinn` - Europe/Tallinn\n* `Europe/Tirane` - Europe/Tirane\n* `Europe/Tiraspol` - Europe/Tiraspol\n* `Europe/Ulyanovsk` - Europe/Ulyanovsk\n* `Europe/Uzhgorod` - Europe/Uzhgorod\n* `Europe/Vaduz` - Europe/Vaduz\n* `Europe/Vatican` - Europe/Vatican\n* `Europe/Vienna` - Europe/Vienna\n* `Europe/Vilnius` - Europe/Vilnius\n* `Europe/Volgograd` - Europe/Volgograd\n* `Europe/Warsaw` - Europe/Warsaw\n* `Europe/Zagreb` - Europe/Zagreb\n* `Europe/Zaporozhye` - Europe/Zaporozhye\n* `Europe/Zurich` - Europe/Zurich\n* `Factory` - Factory\n* `GB` - GB\n* `GB-Eire` - GB-Eire\n* `GMT` - GMT\n* `GMT+0` - GMT+0\n* `GMT-0` - GMT-0\n* `GMT0` - GMT0\n* `Greenwich` - Greenwich\n* `HST` - HST\n* `Hongkong` - Hongkong\n* `Iceland` - Iceland\n* `Indian/Antananarivo` - Indian/Antananarivo\n* `Indian/Chagos` - Indian/Chagos\n* `Indian/Christmas` - Indian/Christmas\n* `Indian/Cocos` - Indian/Cocos\n* `Indian/Comoro` - Indian/Comoro\n* `Indian/Kerguelen` - Indian/Kerguelen\n* `Indian/Mahe` - Indian/Mahe\n* `Indian/Maldives` - Indian/Maldives\n* `Indian/Mauritius` - Indian/Mauritius\n* `Indian/Mayotte` - Indian/Mayotte\n* `Indian/Reunion` - Indian/Reunion\n* `Iran` - Iran\n* `Israel` - Israel\n* `Jamaica` - Jamaica\n* `Japan` - Japan\n* `Kwajalein` - Kwajalein\n* `Libya` - Libya\n* `MET` - MET\n* `MST` - MST\n* `MST7MDT` - MST7MDT\n* `Mexico/BajaNorte` - Mexico/BajaNorte\n* `Mexico/BajaSur` - Mexico/BajaSur\n* `Mexico/General` - Mexico/General\n* `NZ` - NZ\n* `NZ-CHAT` - NZ-CHAT\n* `Navajo` - Navajo\n* `PRC` - PRC\n* `PST8PDT` - PST8PDT\n* `Pacific/Apia` - Pacific/Apia\n* `Pacific/Auckland` - Pacific/Auckland\n* `Pacific/Bougainville` - Pacific/Bougainville\n* `Pacific/Chatham` - Pacific/Chatham\n* `Pacific/Chuuk` - Pacific/Chuuk\n* `Pacific/Easter` - Pacific/Easter\n* `Pacific/Efate` - Pacific/Efate\n* `Pacific/Enderbury` - Pacific/Enderbury\n* `Pacific/Fakaofo` - Pacific/Fakaofo\n* `Pacific/Fiji` - Pacific/Fiji\n* `Pacific/Funafuti` - Pacific/Funafuti\n* `Pacific/Galapagos` - Pacific/Galapagos\n* `Pacific/Gambier` - Pacific/Gambier\n* `Pacific/Guadalcanal` - Pacific/Guadalcanal\n* `Pacific/Guam` - Pacific/Guam\n* `Pacific/Honolulu` - Pacific/Honolulu\n* `Pacific/Johnston` - Pacific/Johnston\n* `Pacific/Kanton` - Pacific/Kanton\n* `Pacific/Kiritimati` - Pacific/Kiritimati\n* `Pacific/Kosrae` - Pacific/Kosrae\n* `Pacific/Kwajalein` - Pacific/Kwajalein\n* `Pacific/Majuro` - Pacific/Majuro\n* `Pacific/Marquesas` - Pacific/Marquesas\n* `Pacific/Midway` - Pacific/Midway\n* `Pacific/Nauru` - Pacific/Nauru\n* `Pacific/Niue` - Pacific/Niue\n* `Pacific/Norfolk` - Pacific/Norfolk\n* `Pacific/Noumea` - Pacific/Noumea\n* `Pacific/Pago_Pago` - Pacific/Pago_Pago\n* `Pacific/Palau` - Pacific/Palau\n* `Pacific/Pitcairn` - Pacific/Pitcairn\n* `Pacific/Pohnpei` - Pacific/Pohnpei\n* `Pacific/Ponape` - Pacific/Ponape\n* `Pacific/Port_Moresby` - Pacific/Port_Moresby\n* `Pacific/Rarotonga` - Pacific/Rarotonga\n* `Pacific/Saipan` - Pacific/Saipan\n* `Pacific/Samoa` - Pacific/Samoa\n* `Pacific/Tahiti` - Pacific/Tahiti\n* `Pacific/Tarawa` - Pacific/Tarawa\n* `Pacific/Tongatapu` - Pacific/Tongatapu\n* `Pacific/Truk` - Pacific/Truk\n* `Pacific/Wake` - Pacific/Wake\n* `Pacific/Wallis` - Pacific/Wallis\n* `Pacific/Yap` - Pacific/Yap\n* `Poland` - Poland\n* `Portugal` - Portugal\n* `ROC` - ROC\n* `ROK` - ROK\n* `Singapore` - Singapore\n* `Turkey` - Turkey\n* `UCT` - UCT\n* `US/Alaska` - US/Alaska\n* `US/Aleutian` - US/Aleutian\n* `US/Arizona` - US/Arizona\n* `US/Central` - US/Central\n* `US/East-Indiana` - US/East-Indiana\n* `US/Eastern` - US/Eastern\n* `US/Hawaii` - US/Hawaii\n* `US/Indiana-Starke` - US/Indiana-Starke\n* `US/Michigan` - US/Michigan\n* `US/Mountain` - US/Mountain\n* `US/Pacific` - US/Pacific\n* `US/Samoa` - US/Samoa\n* `UTC` - UTC\n* `Universal` - Universal\n* `W-SU` - W-SU\n* `WET` - WET\n* `Zulu` - Zulu",
                "x-schema-ref": "#/components/schemas/TimezoneEnum"
              }
            ],
            "title": "Zeitzone"
          },
          "language": {
            "allOf": [
              {
                "enum": [
                  "de",
                  "en"
                ],
                "type": "string",
                "description": "* `de` - Deutsch\n* `en` - English",
                "x-schema-ref": "#/components/schemas/Language1afEnum"
              }
            ],
            "title": "Sprache",
            "description": "Bevorzugte Sprache für die Benutzeroberfläche\n\n* `de` - Deutsch\n* `en` - English"
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedUserProfileWrite"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "first_name": {
            "type": "string",
            "title": "Vorname",
            "maxLength": 150
          },
          "last_name": {
            "type": "string",
            "title": "Nachname",
            "maxLength": 150
          },
          "timezone": {
            "allOf": [
              {
                "enum": [
                  "Africa/Abidjan",
                  "Africa/Accra",
                  "Africa/Addis_Ababa",
                  "Africa/Algiers",
                  "Africa/Asmara",
                  "Africa/Asmera",
                  "Africa/Bamako",
                  "Africa/Bangui",
                  "Africa/Banjul",
                  "Africa/Bissau",
                  "Africa/Blantyre",
                  "Africa/Brazzaville",
                  "Africa/Bujumbura",
                  "Africa/Cairo",
                  "Africa/Casablanca",
                  "Africa/Ceuta",
                  "Africa/Conakry",
                  "Africa/Dakar",
                  "Africa/Dar_es_Salaam",
                  "Africa/Djibouti",
                  "Africa/Douala",
                  "Africa/El_Aaiun",
                  "Africa/Freetown",
                  "Africa/Gaborone",
                  "Africa/Harare",
                  "Africa/Johannesburg",
                  "Africa/Juba",
                  "Africa/Kampala",
                  "Africa/Khartoum",
                  "Africa/Kigali",
                  "Africa/Kinshasa",
                  "Africa/Lagos",
                  "Africa/Libreville",
                  "Africa/Lome",
                  "Africa/Luanda",
                  "Africa/Lubumbashi",
                  "Africa/Lusaka",
                  "Africa/Malabo",
                  "Africa/Maputo",
                  "Africa/Maseru",
                  "Africa/Mbabane",
                  "Africa/Mogadishu",
                  "Africa/Monrovia",
                  "Africa/Nairobi",
                  "Africa/Ndjamena",
                  "Africa/Niamey",
                  "Africa/Nouakchott",
                  "Africa/Ouagadougou",
                  "Africa/Porto-Novo",
                  "Africa/Sao_Tome",
                  "Africa/Timbuktu",
                  "Africa/Tripoli",
                  "Africa/Tunis",
                  "Africa/Windhoek",
                  "America/Adak",
                  "America/Anchorage",
                  "America/Anguilla",
                  "America/Antigua",
                  "America/Araguaina",
                  "America/Argentina/Buenos_Aires",
                  "America/Argentina/Catamarca",
                  "America/Argentina/ComodRivadavia",
                  "America/Argentina/Cordoba",
                  "America/Argentina/Jujuy",
                  "America/Argentina/La_Rioja",
                  "America/Argentina/Mendoza",
                  "America/Argentina/Rio_Gallegos",
                  "America/Argentina/Salta",
                  "America/Argentina/San_Juan",
                  "America/Argentina/San_Luis",
                  "America/Argentina/Tucuman",
                  "America/Argentina/Ushuaia",
                  "America/Aruba",
                  "America/Asuncion",
                  "America/Atikokan",
                  "America/Atka",
                  "America/Bahia",
                  "America/Bahia_Banderas",
                  "America/Barbados",
                  "America/Belem",
                  "America/Belize",
                  "America/Blanc-Sablon",
                  "America/Boa_Vista",
                  "America/Bogota",
                  "America/Boise",
                  "America/Buenos_Aires",
                  "America/Cambridge_Bay",
                  "America/Campo_Grande",
                  "America/Cancun",
                  "America/Caracas",
                  "America/Catamarca",
                  "America/Cayenne",
                  "America/Cayman",
                  "America/Chicago",
                  "America/Chihuahua",
                  "America/Ciudad_Juarez",
                  "America/Coral_Harbour",
                  "America/Cordoba",
                  "America/Costa_Rica",
                  "America/Creston",
                  "America/Cuiaba",
                  "America/Curacao",
                  "America/Danmarkshavn",
                  "America/Dawson",
                  "America/Dawson_Creek",
                  "America/Denver",
                  "America/Detroit",
                  "America/Dominica",
                  "America/Edmonton",
                  "America/Eirunepe",
                  "America/El_Salvador",
                  "America/Ensenada",
                  "America/Fort_Nelson",
                  "America/Fort_Wayne",
                  "America/Fortaleza",
                  "America/Glace_Bay",
                  "America/Godthab",
                  "America/Goose_Bay",
                  "America/Grand_Turk",
                  "America/Grenada",
                  "America/Guadeloupe",
                  "America/Guatemala",
                  "America/Guayaquil",
                  "America/Guyana",
                  "America/Halifax",
                  "America/Havana",
                  "America/Hermosillo",
                  "America/Indiana/Indianapolis",
                  "America/Indiana/Knox",
                  "America/Indiana/Marengo",
                  "America/Indiana/Petersburg",
                  "America/Indiana/Tell_City",
                  "America/Indiana/Vevay",
                  "America/Indiana/Vincennes",
                  "America/Indiana/Winamac",
                  "America/Indianapolis",
                  "America/Inuvik",
                  "America/Iqaluit",
                  "America/Jamaica",
                  "America/Jujuy",
                  "America/Juneau",
                  "America/Kentucky/Louisville",
                  "America/Kentucky/Monticello",
                  "America/Knox_IN",
                  "America/Kralendijk",
                  "America/La_Paz",
                  "America/Lima",
                  "America/Los_Angeles",
                  "America/Louisville",
                  "America/Lower_Princes",
                  "America/Maceio",
                  "America/Managua",
                  "America/Manaus",
                  "America/Marigot",
                  "America/Martinique",
                  "America/Matamoros",
                  "America/Mazatlan",
                  "America/Mendoza",
                  "America/Menominee",
                  "America/Merida",
                  "America/Metlakatla",
                  "America/Mexico_City",
                  "America/Miquelon",
                  "America/Moncton",
                  "America/Monterrey",
                  "America/Montevideo",
                  "America/Montreal",
                  "America/Montserrat",
                  "America/Nassau",
                  "America/New_York",
                  "America/Nipigon",
                  "America/Nome",
                  "America/Noronha",
                  "America/North_Dakota/Beulah",
                  "America/North_Dakota/Center",
                  "America/North_Dakota/New_Salem",
                  "America/Nuuk",
                  "America/Ojinaga",
                  "America/Panama",
                  "America/Pangnirtung",
                  "America/Paramaribo",
                  "America/Phoenix",
                  "America/Port-au-Prince",
                  "America/Port_of_Spain",
                  "America/Porto_Acre",
                  "America/Porto_Velho",
                  "America/Puerto_Rico",
                  "America/Punta_Arenas",
                  "America/Rainy_River",
                  "America/Rankin_Inlet",
                  "America/Recife",
                  "America/Regina",
                  "America/Resolute",
                  "America/Rio_Branco",
                  "America/Rosario",
                  "America/Santa_Isabel",
                  "America/Santarem",
                  "America/Santiago",
                  "America/Santo_Domingo",
                  "America/Sao_Paulo",
                  "America/Scoresbysund",
                  "America/Shiprock",
                  "America/Sitka",
                  "America/St_Barthelemy",
                  "America/St_Johns",
                  "America/St_Kitts",
                  "America/St_Lucia",
                  "America/St_Thomas",
                  "America/St_Vincent",
                  "America/Swift_Current",
                  "America/Tegucigalpa",
                  "America/Thule",
                  "America/Thunder_Bay",
                  "America/Tijuana",
                  "America/Toronto",
                  "America/Tortola",
                  "America/Vancouver",
                  "America/Virgin",
                  "America/Whitehorse",
                  "America/Winnipeg",
                  "America/Yakutat",
                  "America/Yellowknife",
                  "Antarctica/Casey",
                  "Antarctica/Davis",
                  "Antarctica/DumontDUrville",
                  "Antarctica/Macquarie",
                  "Antarctica/Mawson",
                  "Antarctica/McMurdo",
                  "Antarctica/Palmer",
                  "Antarctica/Rothera",
                  "Antarctica/South_Pole",
                  "Antarctica/Syowa",
                  "Antarctica/Troll",
                  "Antarctica/Vostok",
                  "Arctic/Longyearbyen",
                  "Asia/Aden",
                  "Asia/Almaty",
                  "Asia/Amman",
                  "Asia/Anadyr",
                  "Asia/Aqtau",
                  "Asia/Aqtobe",
                  "Asia/Ashgabat",
                  "Asia/Ashkhabad",
                  "Asia/Atyrau",
                  "Asia/Baghdad",
                  "Asia/Bahrain",
                  "Asia/Baku",
                  "Asia/Bangkok",
                  "Asia/Barnaul",
                  "Asia/Beirut",
                  "Asia/Bishkek",
                  "Asia/Brunei",
                  "Asia/Calcutta",
                  "Asia/Chita",
                  "Asia/Choibalsan",
                  "Asia/Chongqing",
                  "Asia/Chungking",
                  "Asia/Colombo",
                  "Asia/Dacca",
                  "Asia/Damascus",
                  "Asia/Dhaka",
                  "Asia/Dili",
                  "Asia/Dubai",
                  "Asia/Dushanbe",
                  "Asia/Famagusta",
                  "Asia/Gaza",
                  "Asia/Hanoi",
                  "Asia/Harbin",
                  "Asia/Hebron",
                  "Asia/Ho_Chi_Minh",
                  "Asia/Hong_Kong",
                  "Asia/Hovd",
                  "Asia/Irkutsk",
                  "Asia/Istanbul",
                  "Asia/Jakarta",
                  "Asia/Jayapura",
                  "Asia/Jerusalem",
                  "Asia/Kabul",
                  "Asia/Kamchatka",
                  "Asia/Karachi",
                  "Asia/Kashgar",
                  "Asia/Kathmandu",
                  "Asia/Katmandu",
                  "Asia/Khandyga",
                  "Asia/Kolkata",
                  "Asia/Krasnoyarsk",
                  "Asia/Kuala_Lumpur",
                  "Asia/Kuching",
                  "Asia/Kuwait",
                  "Asia/Macao",
                  "Asia/Macau",
                  "Asia/Magadan",
                  "Asia/Makassar",
                  "Asia/Manila",
                  "Asia/Muscat",
                  "Asia/Nicosia",
                  "Asia/Novokuznetsk",
                  "Asia/Novosibirsk",
                  "Asia/Omsk",
                  "Asia/Oral",
                  "Asia/Phnom_Penh",
                  "Asia/Pontianak",
                  "Asia/Pyongyang",
                  "Asia/Qatar",
                  "Asia/Qostanay",
                  "Asia/Qyzylorda",
                  "Asia/Rangoon",
                  "Asia/Riyadh",
                  "Asia/Saigon",
                  "Asia/Sakhalin",
                  "Asia/Samarkand",
                  "Asia/Seoul",
                  "Asia/Shanghai",
                  "Asia/Singapore",
                  "Asia/Srednekolymsk",
                  "Asia/Taipei",
                  "Asia/Tashkent",
                  "Asia/Tbilisi",
                  "Asia/Tehran",
                  "Asia/Tel_Aviv",
                  "Asia/Thimbu",
                  "Asia/Thimphu",
                  "Asia/Tokyo",
                  "Asia/Tomsk",
                  "Asia/Ujung_Pandang",
                  "Asia/Ulaanbaatar",
                  "Asia/Ulan_Bator",
                  "Asia/Urumqi",
                  "Asia/Ust-Nera",
                  "Asia/Vientiane",
                  "Asia/Vladivostok",
                  "Asia/Yakutsk",
                  "Asia/Yangon",
                  "Asia/Yekaterinburg",
                  "Asia/Yerevan",
                  "Atlantic/Azores",
                  "Atlantic/Bermuda",
                  "Atlantic/Canary",
                  "Atlantic/Cape_Verde",
                  "Atlantic/Faeroe",
                  "Atlantic/Faroe",
                  "Atlantic/Jan_Mayen",
                  "Atlantic/Madeira",
                  "Atlantic/Reykjavik",
                  "Atlantic/South_Georgia",
                  "Atlantic/St_Helena",
                  "Atlantic/Stanley",
                  "Australia/ACT",
                  "Australia/Adelaide",
                  "Australia/Brisbane",
                  "Australia/Broken_Hill",
                  "Australia/Canberra",
                  "Australia/Currie",
                  "Australia/Darwin",
                  "Australia/Eucla",
                  "Australia/Hobart",
                  "Australia/LHI",
                  "Australia/Lindeman",
                  "Australia/Lord_Howe",
                  "Australia/Melbourne",
                  "Australia/NSW",
                  "Australia/North",
                  "Australia/Perth",
                  "Australia/Queensland",
                  "Australia/South",
                  "Australia/Sydney",
                  "Australia/Tasmania",
                  "Australia/Victoria",
                  "Australia/West",
                  "Australia/Yancowinna",
                  "Brazil/Acre",
                  "Brazil/DeNoronha",
                  "Brazil/East",
                  "Brazil/West",
                  "CET",
                  "CST6CDT",
                  "Canada/Atlantic",
                  "Canada/Central",
                  "Canada/Eastern",
                  "Canada/Mountain",
                  "Canada/Newfoundland",
                  "Canada/Pacific",
                  "Canada/Saskatchewan",
                  "Canada/Yukon",
                  "Chile/Continental",
                  "Chile/EasterIsland",
                  "Cuba",
                  "EET",
                  "EST",
                  "EST5EDT",
                  "Egypt",
                  "Eire",
                  "Etc/GMT",
                  "Etc/GMT+0",
                  "Etc/GMT+1",
                  "Etc/GMT+10",
                  "Etc/GMT+11",
                  "Etc/GMT+12",
                  "Etc/GMT+2",
                  "Etc/GMT+3",
                  "Etc/GMT+4",
                  "Etc/GMT+5",
                  "Etc/GMT+6",
                  "Etc/GMT+7",
                  "Etc/GMT+8",
                  "Etc/GMT+9",
                  "Etc/GMT-0",
                  "Etc/GMT-1",
                  "Etc/GMT-10",
                  "Etc/GMT-11",
                  "Etc/GMT-12",
                  "Etc/GMT-13",
                  "Etc/GMT-14",
                  "Etc/GMT-2",
                  "Etc/GMT-3",
                  "Etc/GMT-4",
                  "Etc/GMT-5",
                  "Etc/GMT-6",
                  "Etc/GMT-7",
                  "Etc/GMT-8",
                  "Etc/GMT-9",
                  "Etc/GMT0",
                  "Etc/Greenwich",
                  "Etc/UCT",
                  "Etc/UTC",
                  "Etc/Universal",
                  "Etc/Zulu",
                  "Europe/Amsterdam",
                  "Europe/Andorra",
                  "Europe/Astrakhan",
                  "Europe/Athens",
                  "Europe/Belfast",
                  "Europe/Belgrade",
                  "Europe/Berlin",
                  "Europe/Bratislava",
                  "Europe/Brussels",
                  "Europe/Bucharest",
                  "Europe/Budapest",
                  "Europe/Busingen",
                  "Europe/Chisinau",
                  "Europe/Copenhagen",
                  "Europe/Dublin",
                  "Europe/Gibraltar",
                  "Europe/Guernsey",
                  "Europe/Helsinki",
                  "Europe/Isle_of_Man",
                  "Europe/Istanbul",
                  "Europe/Jersey",
                  "Europe/Kaliningrad",
                  "Europe/Kiev",
                  "Europe/Kirov",
                  "Europe/Kyiv",
                  "Europe/Lisbon",
                  "Europe/Ljubljana",
                  "Europe/London",
                  "Europe/Luxembourg",
                  "Europe/Madrid",
                  "Europe/Malta",
                  "Europe/Mariehamn",
                  "Europe/Minsk",
                  "Europe/Monaco",
                  "Europe/Moscow",
                  "Europe/Nicosia",
                  "Europe/Oslo",
                  "Europe/Paris",
                  "Europe/Podgorica",
                  "Europe/Prague",
                  "Europe/Riga",
                  "Europe/Rome",
                  "Europe/Samara",
                  "Europe/San_Marino",
                  "Europe/Sarajevo",
                  "Europe/Saratov",
                  "Europe/Simferopol",
                  "Europe/Skopje",
                  "Europe/Sofia",
                  "Europe/Stockholm",
                  "Europe/Tallinn",
                  "Europe/Tirane",
                  "Europe/Tiraspol",
                  "Europe/Ulyanovsk",
                  "Europe/Uzhgorod",
                  "Europe/Vaduz",
                  "Europe/Vatican",
                  "Europe/Vienna",
                  "Europe/Vilnius",
                  "Europe/Volgograd",
                  "Europe/Warsaw",
                  "Europe/Zagreb",
                  "Europe/Zaporozhye",
                  "Europe/Zurich",
                  "Factory",
                  "GB",
                  "GB-Eire",
                  "GMT",
                  "GMT+0",
                  "GMT-0",
                  "GMT0",
                  "Greenwich",
                  "HST",
                  "Hongkong",
                  "Iceland",
                  "Indian/Antananarivo",
                  "Indian/Chagos",
                  "Indian/Christmas",
                  "Indian/Cocos",
                  "Indian/Comoro",
                  "Indian/Kerguelen",
                  "Indian/Mahe",
                  "Indian/Maldives",
                  "Indian/Mauritius",
                  "Indian/Mayotte",
                  "Indian/Reunion",
                  "Iran",
                  "Israel",
                  "Jamaica",
                  "Japan",
                  "Kwajalein",
                  "Libya",
                  "MET",
                  "MST",
                  "MST7MDT",
                  "Mexico/BajaNorte",
                  "Mexico/BajaSur",
                  "Mexico/General",
                  "NZ",
                  "NZ-CHAT",
                  "Navajo",
                  "PRC",
                  "PST8PDT",
                  "Pacific/Apia",
                  "Pacific/Auckland",
                  "Pacific/Bougainville",
                  "Pacific/Chatham",
                  "Pacific/Chuuk",
                  "Pacific/Easter",
                  "Pacific/Efate",
                  "Pacific/Enderbury",
                  "Pacific/Fakaofo",
                  "Pacific/Fiji",
                  "Pacific/Funafuti",
                  "Pacific/Galapagos",
                  "Pacific/Gambier",
                  "Pacific/Guadalcanal",
                  "Pacific/Guam",
                  "Pacific/Honolulu",
                  "Pacific/Johnston",
                  "Pacific/Kanton",
                  "Pacific/Kiritimati",
                  "Pacific/Kosrae",
                  "Pacific/Kwajalein",
                  "Pacific/Majuro",
                  "Pacific/Marquesas",
                  "Pacific/Midway",
                  "Pacific/Nauru",
                  "Pacific/Niue",
                  "Pacific/Norfolk",
                  "Pacific/Noumea",
                  "Pacific/Pago_Pago",
                  "Pacific/Palau",
                  "Pacific/Pitcairn",
                  "Pacific/Pohnpei",
                  "Pacific/Ponape",
                  "Pacific/Port_Moresby",
                  "Pacific/Rarotonga",
                  "Pacific/Saipan",
                  "Pacific/Samoa",
                  "Pacific/Tahiti",
                  "Pacific/Tarawa",
                  "Pacific/Tongatapu",
                  "Pacific/Truk",
                  "Pacific/Wake",
                  "Pacific/Wallis",
                  "Pacific/Yap",
                  "Poland",
                  "Portugal",
                  "ROC",
                  "ROK",
                  "Singapore",
                  "Turkey",
                  "UCT",
                  "US/Alaska",
                  "US/Aleutian",
                  "US/Arizona",
                  "US/Central",
                  "US/East-Indiana",
                  "US/Eastern",
                  "US/Hawaii",
                  "US/Indiana-Starke",
                  "US/Michigan",
                  "US/Mountain",
                  "US/Pacific",
                  "US/Samoa",
                  "UTC",
                  "Universal",
                  "W-SU",
                  "WET",
                  "Zulu"
                ],
                "type": "string",
                "description": "* `Africa/Abidjan` - Africa/Abidjan\n* `Africa/Accra` - Africa/Accra\n* `Africa/Addis_Ababa` - Africa/Addis_Ababa\n* `Africa/Algiers` - Africa/Algiers\n* `Africa/Asmara` - Africa/Asmara\n* `Africa/Asmera` - Africa/Asmera\n* `Africa/Bamako` - Africa/Bamako\n* `Africa/Bangui` - Africa/Bangui\n* `Africa/Banjul` - Africa/Banjul\n* `Africa/Bissau` - Africa/Bissau\n* `Africa/Blantyre` - Africa/Blantyre\n* `Africa/Brazzaville` - Africa/Brazzaville\n* `Africa/Bujumbura` - Africa/Bujumbura\n* `Africa/Cairo` - Africa/Cairo\n* `Africa/Casablanca` - Africa/Casablanca\n* `Africa/Ceuta` - Africa/Ceuta\n* `Africa/Conakry` - Africa/Conakry\n* `Africa/Dakar` - Africa/Dakar\n* `Africa/Dar_es_Salaam` - Africa/Dar_es_Salaam\n* `Africa/Djibouti` - Africa/Djibouti\n* `Africa/Douala` - Africa/Douala\n* `Africa/El_Aaiun` - Africa/El_Aaiun\n* `Africa/Freetown` - Africa/Freetown\n* `Africa/Gaborone` - Africa/Gaborone\n* `Africa/Harare` - Africa/Harare\n* `Africa/Johannesburg` - Africa/Johannesburg\n* `Africa/Juba` - Africa/Juba\n* `Africa/Kampala` - Africa/Kampala\n* `Africa/Khartoum` - Africa/Khartoum\n* `Africa/Kigali` - Africa/Kigali\n* `Africa/Kinshasa` - Africa/Kinshasa\n* `Africa/Lagos` - Africa/Lagos\n* `Africa/Libreville` - Africa/Libreville\n* `Africa/Lome` - Africa/Lome\n* `Africa/Luanda` - Africa/Luanda\n* `Africa/Lubumbashi` - Africa/Lubumbashi\n* `Africa/Lusaka` - Africa/Lusaka\n* `Africa/Malabo` - Africa/Malabo\n* `Africa/Maputo` - Africa/Maputo\n* `Africa/Maseru` - Africa/Maseru\n* `Africa/Mbabane` - Africa/Mbabane\n* `Africa/Mogadishu` - Africa/Mogadishu\n* `Africa/Monrovia` - Africa/Monrovia\n* `Africa/Nairobi` - Africa/Nairobi\n* `Africa/Ndjamena` - Africa/Ndjamena\n* `Africa/Niamey` - Africa/Niamey\n* `Africa/Nouakchott` - Africa/Nouakchott\n* `Africa/Ouagadougou` - Africa/Ouagadougou\n* `Africa/Porto-Novo` - Africa/Porto-Novo\n* `Africa/Sao_Tome` - Africa/Sao_Tome\n* `Africa/Timbuktu` - Africa/Timbuktu\n* `Africa/Tripoli` - Africa/Tripoli\n* `Africa/Tunis` - Africa/Tunis\n* `Africa/Windhoek` - Africa/Windhoek\n* `America/Adak` - America/Adak\n* `America/Anchorage` - America/Anchorage\n* `America/Anguilla` - America/Anguilla\n* `America/Antigua` - America/Antigua\n* `America/Araguaina` - America/Araguaina\n* `America/Argentina/Buenos_Aires` - America/Argentina/Buenos_Aires\n* `America/Argentina/Catamarca` - America/Argentina/Catamarca\n* `America/Argentina/ComodRivadavia` - America/Argentina/ComodRivadavia\n* `America/Argentina/Cordoba` - America/Argentina/Cordoba\n* `America/Argentina/Jujuy` - America/Argentina/Jujuy\n* `America/Argentina/La_Rioja` - America/Argentina/La_Rioja\n* `America/Argentina/Mendoza` - America/Argentina/Mendoza\n* `America/Argentina/Rio_Gallegos` - America/Argentina/Rio_Gallegos\n* `America/Argentina/Salta` - America/Argentina/Salta\n* `America/Argentina/San_Juan` - America/Argentina/San_Juan\n* `America/Argentina/San_Luis` - America/Argentina/San_Luis\n* `America/Argentina/Tucuman` - America/Argentina/Tucuman\n* `America/Argentina/Ushuaia` - America/Argentina/Ushuaia\n* `America/Aruba` - America/Aruba\n* `America/Asuncion` - America/Asuncion\n* `America/Atikokan` - America/Atikokan\n* `America/Atka` - America/Atka\n* `America/Bahia` - America/Bahia\n* `America/Bahia_Banderas` - America/Bahia_Banderas\n* `America/Barbados` - America/Barbados\n* `America/Belem` - America/Belem\n* `America/Belize` - America/Belize\n* `America/Blanc-Sablon` - America/Blanc-Sablon\n* `America/Boa_Vista` - America/Boa_Vista\n* `America/Bogota` - America/Bogota\n* `America/Boise` - America/Boise\n* `America/Buenos_Aires` - America/Buenos_Aires\n* `America/Cambridge_Bay` - America/Cambridge_Bay\n* `America/Campo_Grande` - America/Campo_Grande\n* `America/Cancun` - America/Cancun\n* `America/Caracas` - America/Caracas\n* `America/Catamarca` - America/Catamarca\n* `America/Cayenne` - America/Cayenne\n* `America/Cayman` - America/Cayman\n* `America/Chicago` - America/Chicago\n* `America/Chihuahua` - America/Chihuahua\n* `America/Ciudad_Juarez` - America/Ciudad_Juarez\n* `America/Coral_Harbour` - America/Coral_Harbour\n* `America/Cordoba` - America/Cordoba\n* `America/Costa_Rica` - America/Costa_Rica\n* `America/Creston` - America/Creston\n* `America/Cuiaba` - America/Cuiaba\n* `America/Curacao` - America/Curacao\n* `America/Danmarkshavn` - America/Danmarkshavn\n* `America/Dawson` - America/Dawson\n* `America/Dawson_Creek` - America/Dawson_Creek\n* `America/Denver` - America/Denver\n* `America/Detroit` - America/Detroit\n* `America/Dominica` - America/Dominica\n* `America/Edmonton` - America/Edmonton\n* `America/Eirunepe` - America/Eirunepe\n* `America/El_Salvador` - America/El_Salvador\n* `America/Ensenada` - America/Ensenada\n* `America/Fort_Nelson` - America/Fort_Nelson\n* `America/Fort_Wayne` - America/Fort_Wayne\n* `America/Fortaleza` - America/Fortaleza\n* `America/Glace_Bay` - America/Glace_Bay\n* `America/Godthab` - America/Godthab\n* `America/Goose_Bay` - America/Goose_Bay\n* `America/Grand_Turk` - America/Grand_Turk\n* `America/Grenada` - America/Grenada\n* `America/Guadeloupe` - America/Guadeloupe\n* `America/Guatemala` - America/Guatemala\n* `America/Guayaquil` - America/Guayaquil\n* `America/Guyana` - America/Guyana\n* `America/Halifax` - America/Halifax\n* `America/Havana` - America/Havana\n* `America/Hermosillo` - America/Hermosillo\n* `America/Indiana/Indianapolis` - America/Indiana/Indianapolis\n* `America/Indiana/Knox` - America/Indiana/Knox\n* `America/Indiana/Marengo` - America/Indiana/Marengo\n* `America/Indiana/Petersburg` - America/Indiana/Petersburg\n* `America/Indiana/Tell_City` - America/Indiana/Tell_City\n* `America/Indiana/Vevay` - America/Indiana/Vevay\n* `America/Indiana/Vincennes` - America/Indiana/Vincennes\n* `America/Indiana/Winamac` - America/Indiana/Winamac\n* `America/Indianapolis` - America/Indianapolis\n* `America/Inuvik` - America/Inuvik\n* `America/Iqaluit` - America/Iqaluit\n* `America/Jamaica` - America/Jamaica\n* `America/Jujuy` - America/Jujuy\n* `America/Juneau` - America/Juneau\n* `America/Kentucky/Louisville` - America/Kentucky/Louisville\n* `America/Kentucky/Monticello` - America/Kentucky/Monticello\n* `America/Knox_IN` - America/Knox_IN\n* `America/Kralendijk` - America/Kralendijk\n* `America/La_Paz` - America/La_Paz\n* `America/Lima` - America/Lima\n* `America/Los_Angeles` - America/Los_Angeles\n* `America/Louisville` - America/Louisville\n* `America/Lower_Princes` - America/Lower_Princes\n* `America/Maceio` - America/Maceio\n* `America/Managua` - America/Managua\n* `America/Manaus` - America/Manaus\n* `America/Marigot` - America/Marigot\n* `America/Martinique` - America/Martinique\n* `America/Matamoros` - America/Matamoros\n* `America/Mazatlan` - America/Mazatlan\n* `America/Mendoza` - America/Mendoza\n* `America/Menominee` - America/Menominee\n* `America/Merida` - America/Merida\n* `America/Metlakatla` - America/Metlakatla\n* `America/Mexico_City` - America/Mexico_City\n* `America/Miquelon` - America/Miquelon\n* `America/Moncton` - America/Moncton\n* `America/Monterrey` - America/Monterrey\n* `America/Montevideo` - America/Montevideo\n* `America/Montreal` - America/Montreal\n* `America/Montserrat` - America/Montserrat\n* `America/Nassau` - America/Nassau\n* `America/New_York` - America/New_York\n* `America/Nipigon` - America/Nipigon\n* `America/Nome` - America/Nome\n* `America/Noronha` - America/Noronha\n* `America/North_Dakota/Beulah` - America/North_Dakota/Beulah\n* `America/North_Dakota/Center` - America/North_Dakota/Center\n* `America/North_Dakota/New_Salem` - America/North_Dakota/New_Salem\n* `America/Nuuk` - America/Nuuk\n* `America/Ojinaga` - America/Ojinaga\n* `America/Panama` - America/Panama\n* `America/Pangnirtung` - America/Pangnirtung\n* `America/Paramaribo` - America/Paramaribo\n* `America/Phoenix` - America/Phoenix\n* `America/Port-au-Prince` - America/Port-au-Prince\n* `America/Port_of_Spain` - America/Port_of_Spain\n* `America/Porto_Acre` - America/Porto_Acre\n* `America/Porto_Velho` - America/Porto_Velho\n* `America/Puerto_Rico` - America/Puerto_Rico\n* `America/Punta_Arenas` - America/Punta_Arenas\n* `America/Rainy_River` - America/Rainy_River\n* `America/Rankin_Inlet` - America/Rankin_Inlet\n* `America/Recife` - America/Recife\n* `America/Regina` - America/Regina\n* `America/Resolute` - America/Resolute\n* `America/Rio_Branco` - America/Rio_Branco\n* `America/Rosario` - America/Rosario\n* `America/Santa_Isabel` - America/Santa_Isabel\n* `America/Santarem` - America/Santarem\n* `America/Santiago` - America/Santiago\n* `America/Santo_Domingo` - America/Santo_Domingo\n* `America/Sao_Paulo` - America/Sao_Paulo\n* `America/Scoresbysund` - America/Scoresbysund\n* `America/Shiprock` - America/Shiprock\n* `America/Sitka` - America/Sitka\n* `America/St_Barthelemy` - America/St_Barthelemy\n* `America/St_Johns` - America/St_Johns\n* `America/St_Kitts` - America/St_Kitts\n* `America/St_Lucia` - America/St_Lucia\n* `America/St_Thomas` - America/St_Thomas\n* `America/St_Vincent` - America/St_Vincent\n* `America/Swift_Current` - America/Swift_Current\n* `America/Tegucigalpa` - America/Tegucigalpa\n* `America/Thule` - America/Thule\n* `America/Thunder_Bay` - America/Thunder_Bay\n* `America/Tijuana` - America/Tijuana\n* `America/Toronto` - America/Toronto\n* `America/Tortola` - America/Tortola\n* `America/Vancouver` - America/Vancouver\n* `America/Virgin` - America/Virgin\n* `America/Whitehorse` - America/Whitehorse\n* `America/Winnipeg` - America/Winnipeg\n* `America/Yakutat` - America/Yakutat\n* `America/Yellowknife` - America/Yellowknife\n* `Antarctica/Casey` - Antarctica/Casey\n* `Antarctica/Davis` - Antarctica/Davis\n* `Antarctica/DumontDUrville` - Antarctica/DumontDUrville\n* `Antarctica/Macquarie` - Antarctica/Macquarie\n* `Antarctica/Mawson` - Antarctica/Mawson\n* `Antarctica/McMurdo` - Antarctica/McMurdo\n* `Antarctica/Palmer` - Antarctica/Palmer\n* `Antarctica/Rothera` - Antarctica/Rothera\n* `Antarctica/South_Pole` - Antarctica/South_Pole\n* `Antarctica/Syowa` - Antarctica/Syowa\n* `Antarctica/Troll` - Antarctica/Troll\n* `Antarctica/Vostok` - Antarctica/Vostok\n* `Arctic/Longyearbyen` - Arctic/Longyearbyen\n* `Asia/Aden` - Asia/Aden\n* `Asia/Almaty` - Asia/Almaty\n* `Asia/Amman` - Asia/Amman\n* `Asia/Anadyr` - Asia/Anadyr\n* `Asia/Aqtau` - Asia/Aqtau\n* `Asia/Aqtobe` - Asia/Aqtobe\n* `Asia/Ashgabat` - Asia/Ashgabat\n* `Asia/Ashkhabad` - Asia/Ashkhabad\n* `Asia/Atyrau` - Asia/Atyrau\n* `Asia/Baghdad` - Asia/Baghdad\n* `Asia/Bahrain` - Asia/Bahrain\n* `Asia/Baku` - Asia/Baku\n* `Asia/Bangkok` - Asia/Bangkok\n* `Asia/Barnaul` - Asia/Barnaul\n* `Asia/Beirut` - Asia/Beirut\n* `Asia/Bishkek` - Asia/Bishkek\n* `Asia/Brunei` - Asia/Brunei\n* `Asia/Calcutta` - Asia/Calcutta\n* `Asia/Chita` - Asia/Chita\n* `Asia/Choibalsan` - Asia/Choibalsan\n* `Asia/Chongqing` - Asia/Chongqing\n* `Asia/Chungking` - Asia/Chungking\n* `Asia/Colombo` - Asia/Colombo\n* `Asia/Dacca` - Asia/Dacca\n* `Asia/Damascus` - Asia/Damascus\n* `Asia/Dhaka` - Asia/Dhaka\n* `Asia/Dili` - Asia/Dili\n* `Asia/Dubai` - Asia/Dubai\n* `Asia/Dushanbe` - Asia/Dushanbe\n* `Asia/Famagusta` - Asia/Famagusta\n* `Asia/Gaza` - Asia/Gaza\n* `Asia/Hanoi` - Asia/Hanoi\n* `Asia/Harbin` - Asia/Harbin\n* `Asia/Hebron` - Asia/Hebron\n* `Asia/Ho_Chi_Minh` - Asia/Ho_Chi_Minh\n* `Asia/Hong_Kong` - Asia/Hong_Kong\n* `Asia/Hovd` - Asia/Hovd\n* `Asia/Irkutsk` - Asia/Irkutsk\n* `Asia/Istanbul` - Asia/Istanbul\n* `Asia/Jakarta` - Asia/Jakarta\n* `Asia/Jayapura` - Asia/Jayapura\n* `Asia/Jerusalem` - Asia/Jerusalem\n* `Asia/Kabul` - Asia/Kabul\n* `Asia/Kamchatka` - Asia/Kamchatka\n* `Asia/Karachi` - Asia/Karachi\n* `Asia/Kashgar` - Asia/Kashgar\n* `Asia/Kathmandu` - Asia/Kathmandu\n* `Asia/Katmandu` - Asia/Katmandu\n* `Asia/Khandyga` - Asia/Khandyga\n* `Asia/Kolkata` - Asia/Kolkata\n* `Asia/Krasnoyarsk` - Asia/Krasnoyarsk\n* `Asia/Kuala_Lumpur` - Asia/Kuala_Lumpur\n* `Asia/Kuching` - Asia/Kuching\n* `Asia/Kuwait` - Asia/Kuwait\n* `Asia/Macao` - Asia/Macao\n* `Asia/Macau` - Asia/Macau\n* `Asia/Magadan` - Asia/Magadan\n* `Asia/Makassar` - Asia/Makassar\n* `Asia/Manila` - Asia/Manila\n* `Asia/Muscat` - Asia/Muscat\n* `Asia/Nicosia` - Asia/Nicosia\n* `Asia/Novokuznetsk` - Asia/Novokuznetsk\n* `Asia/Novosibirsk` - Asia/Novosibirsk\n* `Asia/Omsk` - Asia/Omsk\n* `Asia/Oral` - Asia/Oral\n* `Asia/Phnom_Penh` - Asia/Phnom_Penh\n* `Asia/Pontianak` - Asia/Pontianak\n* `Asia/Pyongyang` - Asia/Pyongyang\n* `Asia/Qatar` - Asia/Qatar\n* `Asia/Qostanay` - Asia/Qostanay\n* `Asia/Qyzylorda` - Asia/Qyzylorda\n* `Asia/Rangoon` - Asia/Rangoon\n* `Asia/Riyadh` - Asia/Riyadh\n* `Asia/Saigon` - Asia/Saigon\n* `Asia/Sakhalin` - Asia/Sakhalin\n* `Asia/Samarkand` - Asia/Samarkand\n* `Asia/Seoul` - Asia/Seoul\n* `Asia/Shanghai` - Asia/Shanghai\n* `Asia/Singapore` - Asia/Singapore\n* `Asia/Srednekolymsk` - Asia/Srednekolymsk\n* `Asia/Taipei` - Asia/Taipei\n* `Asia/Tashkent` - Asia/Tashkent\n* `Asia/Tbilisi` - Asia/Tbilisi\n* `Asia/Tehran` - Asia/Tehran\n* `Asia/Tel_Aviv` - Asia/Tel_Aviv\n* `Asia/Thimbu` - Asia/Thimbu\n* `Asia/Thimphu` - Asia/Thimphu\n* `Asia/Tokyo` - Asia/Tokyo\n* `Asia/Tomsk` - Asia/Tomsk\n* `Asia/Ujung_Pandang` - Asia/Ujung_Pandang\n* `Asia/Ulaanbaatar` - Asia/Ulaanbaatar\n* `Asia/Ulan_Bator` - Asia/Ulan_Bator\n* `Asia/Urumqi` - Asia/Urumqi\n* `Asia/Ust-Nera` - Asia/Ust-Nera\n* `Asia/Vientiane` - Asia/Vientiane\n* `Asia/Vladivostok` - Asia/Vladivostok\n* `Asia/Yakutsk` - Asia/Yakutsk\n* `Asia/Yangon` - Asia/Yangon\n* `Asia/Yekaterinburg` - Asia/Yekaterinburg\n* `Asia/Yerevan` - Asia/Yerevan\n* `Atlantic/Azores` - Atlantic/Azores\n* `Atlantic/Bermuda` - Atlantic/Bermuda\n* `Atlantic/Canary` - Atlantic/Canary\n* `Atlantic/Cape_Verde` - Atlantic/Cape_Verde\n* `Atlantic/Faeroe` - Atlantic/Faeroe\n* `Atlantic/Faroe` - Atlantic/Faroe\n* `Atlantic/Jan_Mayen` - Atlantic/Jan_Mayen\n* `Atlantic/Madeira` - Atlantic/Madeira\n* `Atlantic/Reykjavik` - Atlantic/Reykjavik\n* `Atlantic/South_Georgia` - Atlantic/South_Georgia\n* `Atlantic/St_Helena` - Atlantic/St_Helena\n* `Atlantic/Stanley` - Atlantic/Stanley\n* `Australia/ACT` - Australia/ACT\n* `Australia/Adelaide` - Australia/Adelaide\n* `Australia/Brisbane` - Australia/Brisbane\n* `Australia/Broken_Hill` - Australia/Broken_Hill\n* `Australia/Canberra` - Australia/Canberra\n* `Australia/Currie` - Australia/Currie\n* `Australia/Darwin` - Australia/Darwin\n* `Australia/Eucla` - Australia/Eucla\n* `Australia/Hobart` - Australia/Hobart\n* `Australia/LHI` - Australia/LHI\n* `Australia/Lindeman` - Australia/Lindeman\n* `Australia/Lord_Howe` - Australia/Lord_Howe\n* `Australia/Melbourne` - Australia/Melbourne\n* `Australia/NSW` - Australia/NSW\n* `Australia/North` - Australia/North\n* `Australia/Perth` - Australia/Perth\n* `Australia/Queensland` - Australia/Queensland\n* `Australia/South` - Australia/South\n* `Australia/Sydney` - Australia/Sydney\n* `Australia/Tasmania` - Australia/Tasmania\n* `Australia/Victoria` - Australia/Victoria\n* `Australia/West` - Australia/West\n* `Australia/Yancowinna` - Australia/Yancowinna\n* `Brazil/Acre` - Brazil/Acre\n* `Brazil/DeNoronha` - Brazil/DeNoronha\n* `Brazil/East` - Brazil/East\n* `Brazil/West` - Brazil/West\n* `CET` - CET\n* `CST6CDT` - CST6CDT\n* `Canada/Atlantic` - Canada/Atlantic\n* `Canada/Central` - Canada/Central\n* `Canada/Eastern` - Canada/Eastern\n* `Canada/Mountain` - Canada/Mountain\n* `Canada/Newfoundland` - Canada/Newfoundland\n* `Canada/Pacific` - Canada/Pacific\n* `Canada/Saskatchewan` - Canada/Saskatchewan\n* `Canada/Yukon` - Canada/Yukon\n* `Chile/Continental` - Chile/Continental\n* `Chile/EasterIsland` - Chile/EasterIsland\n* `Cuba` - Cuba\n* `EET` - EET\n* `EST` - EST\n* `EST5EDT` - EST5EDT\n* `Egypt` - Egypt\n* `Eire` - Eire\n* `Etc/GMT` - Etc/GMT\n* `Etc/GMT+0` - Etc/GMT+0\n* `Etc/GMT+1` - Etc/GMT+1\n* `Etc/GMT+10` - Etc/GMT+10\n* `Etc/GMT+11` - Etc/GMT+11\n* `Etc/GMT+12` - Etc/GMT+12\n* `Etc/GMT+2` - Etc/GMT+2\n* `Etc/GMT+3` - Etc/GMT+3\n* `Etc/GMT+4` - Etc/GMT+4\n* `Etc/GMT+5` - Etc/GMT+5\n* `Etc/GMT+6` - Etc/GMT+6\n* `Etc/GMT+7` - Etc/GMT+7\n* `Etc/GMT+8` - Etc/GMT+8\n* `Etc/GMT+9` - Etc/GMT+9\n* `Etc/GMT-0` - Etc/GMT-0\n* `Etc/GMT-1` - Etc/GMT-1\n* `Etc/GMT-10` - Etc/GMT-10\n* `Etc/GMT-11` - Etc/GMT-11\n* `Etc/GMT-12` - Etc/GMT-12\n* `Etc/GMT-13` - Etc/GMT-13\n* `Etc/GMT-14` - Etc/GMT-14\n* `Etc/GMT-2` - Etc/GMT-2\n* `Etc/GMT-3` - Etc/GMT-3\n* `Etc/GMT-4` - Etc/GMT-4\n* `Etc/GMT-5` - Etc/GMT-5\n* `Etc/GMT-6` - Etc/GMT-6\n* `Etc/GMT-7` - Etc/GMT-7\n* `Etc/GMT-8` - Etc/GMT-8\n* `Etc/GMT-9` - Etc/GMT-9\n* `Etc/GMT0` - Etc/GMT0\n* `Etc/Greenwich` - Etc/Greenwich\n* `Etc/UCT` - Etc/UCT\n* `Etc/UTC` - Etc/UTC\n* `Etc/Universal` - Etc/Universal\n* `Etc/Zulu` - Etc/Zulu\n* `Europe/Amsterdam` - Europe/Amsterdam\n* `Europe/Andorra` - Europe/Andorra\n* `Europe/Astrakhan` - Europe/Astrakhan\n* `Europe/Athens` - Europe/Athens\n* `Europe/Belfast` - Europe/Belfast\n* `Europe/Belgrade` - Europe/Belgrade\n* `Europe/Berlin` - Europe/Berlin\n* `Europe/Bratislava` - Europe/Bratislava\n* `Europe/Brussels` - Europe/Brussels\n* `Europe/Bucharest` - Europe/Bucharest\n* `Europe/Budapest` - Europe/Budapest\n* `Europe/Busingen` - Europe/Busingen\n* `Europe/Chisinau` - Europe/Chisinau\n* `Europe/Copenhagen` - Europe/Copenhagen\n* `Europe/Dublin` - Europe/Dublin\n* `Europe/Gibraltar` - Europe/Gibraltar\n* `Europe/Guernsey` - Europe/Guernsey\n* `Europe/Helsinki` - Europe/Helsinki\n* `Europe/Isle_of_Man` - Europe/Isle_of_Man\n* `Europe/Istanbul` - Europe/Istanbul\n* `Europe/Jersey` - Europe/Jersey\n* `Europe/Kaliningrad` - Europe/Kaliningrad\n* `Europe/Kiev` - Europe/Kiev\n* `Europe/Kirov` - Europe/Kirov\n* `Europe/Kyiv` - Europe/Kyiv\n* `Europe/Lisbon` - Europe/Lisbon\n* `Europe/Ljubljana` - Europe/Ljubljana\n* `Europe/London` - Europe/London\n* `Europe/Luxembourg` - Europe/Luxembourg\n* `Europe/Madrid` - Europe/Madrid\n* `Europe/Malta` - Europe/Malta\n* `Europe/Mariehamn` - Europe/Mariehamn\n* `Europe/Minsk` - Europe/Minsk\n* `Europe/Monaco` - Europe/Monaco\n* `Europe/Moscow` - Europe/Moscow\n* `Europe/Nicosia` - Europe/Nicosia\n* `Europe/Oslo` - Europe/Oslo\n* `Europe/Paris` - Europe/Paris\n* `Europe/Podgorica` - Europe/Podgorica\n* `Europe/Prague` - Europe/Prague\n* `Europe/Riga` - Europe/Riga\n* `Europe/Rome` - Europe/Rome\n* `Europe/Samara` - Europe/Samara\n* `Europe/San_Marino` - Europe/San_Marino\n* `Europe/Sarajevo` - Europe/Sarajevo\n* `Europe/Saratov` - Europe/Saratov\n* `Europe/Simferopol` - Europe/Simferopol\n* `Europe/Skopje` - Europe/Skopje\n* `Europe/Sofia` - Europe/Sofia\n* `Europe/Stockholm` - Europe/Stockholm\n* `Europe/Tallinn` - Europe/Tallinn\n* `Europe/Tirane` - Europe/Tirane\n* `Europe/Tiraspol` - Europe/Tiraspol\n* `Europe/Ulyanovsk` - Europe/Ulyanovsk\n* `Europe/Uzhgorod` - Europe/Uzhgorod\n* `Europe/Vaduz` - Europe/Vaduz\n* `Europe/Vatican` - Europe/Vatican\n* `Europe/Vienna` - Europe/Vienna\n* `Europe/Vilnius` - Europe/Vilnius\n* `Europe/Volgograd` - Europe/Volgograd\n* `Europe/Warsaw` - Europe/Warsaw\n* `Europe/Zagreb` - Europe/Zagreb\n* `Europe/Zaporozhye` - Europe/Zaporozhye\n* `Europe/Zurich` - Europe/Zurich\n* `Factory` - Factory\n* `GB` - GB\n* `GB-Eire` - GB-Eire\n* `GMT` - GMT\n* `GMT+0` - GMT+0\n* `GMT-0` - GMT-0\n* `GMT0` - GMT0\n* `Greenwich` - Greenwich\n* `HST` - HST\n* `Hongkong` - Hongkong\n* `Iceland` - Iceland\n* `Indian/Antananarivo` - Indian/Antananarivo\n* `Indian/Chagos` - Indian/Chagos\n* `Indian/Christmas` - Indian/Christmas\n* `Indian/Cocos` - Indian/Cocos\n* `Indian/Comoro` - Indian/Comoro\n* `Indian/Kerguelen` - Indian/Kerguelen\n* `Indian/Mahe` - Indian/Mahe\n* `Indian/Maldives` - Indian/Maldives\n* `Indian/Mauritius` - Indian/Mauritius\n* `Indian/Mayotte` - Indian/Mayotte\n* `Indian/Reunion` - Indian/Reunion\n* `Iran` - Iran\n* `Israel` - Israel\n* `Jamaica` - Jamaica\n* `Japan` - Japan\n* `Kwajalein` - Kwajalein\n* `Libya` - Libya\n* `MET` - MET\n* `MST` - MST\n* `MST7MDT` - MST7MDT\n* `Mexico/BajaNorte` - Mexico/BajaNorte\n* `Mexico/BajaSur` - Mexico/BajaSur\n* `Mexico/General` - Mexico/General\n* `NZ` - NZ\n* `NZ-CHAT` - NZ-CHAT\n* `Navajo` - Navajo\n* `PRC` - PRC\n* `PST8PDT` - PST8PDT\n* `Pacific/Apia` - Pacific/Apia\n* `Pacific/Auckland` - Pacific/Auckland\n* `Pacific/Bougainville` - Pacific/Bougainville\n* `Pacific/Chatham` - Pacific/Chatham\n* `Pacific/Chuuk` - Pacific/Chuuk\n* `Pacific/Easter` - Pacific/Easter\n* `Pacific/Efate` - Pacific/Efate\n* `Pacific/Enderbury` - Pacific/Enderbury\n* `Pacific/Fakaofo` - Pacific/Fakaofo\n* `Pacific/Fiji` - Pacific/Fiji\n* `Pacific/Funafuti` - Pacific/Funafuti\n* `Pacific/Galapagos` - Pacific/Galapagos\n* `Pacific/Gambier` - Pacific/Gambier\n* `Pacific/Guadalcanal` - Pacific/Guadalcanal\n* `Pacific/Guam` - Pacific/Guam\n* `Pacific/Honolulu` - Pacific/Honolulu\n* `Pacific/Johnston` - Pacific/Johnston\n* `Pacific/Kanton` - Pacific/Kanton\n* `Pacific/Kiritimati` - Pacific/Kiritimati\n* `Pacific/Kosrae` - Pacific/Kosrae\n* `Pacific/Kwajalein` - Pacific/Kwajalein\n* `Pacific/Majuro` - Pacific/Majuro\n* `Pacific/Marquesas` - Pacific/Marquesas\n* `Pacific/Midway` - Pacific/Midway\n* `Pacific/Nauru` - Pacific/Nauru\n* `Pacific/Niue` - Pacific/Niue\n* `Pacific/Norfolk` - Pacific/Norfolk\n* `Pacific/Noumea` - Pacific/Noumea\n* `Pacific/Pago_Pago` - Pacific/Pago_Pago\n* `Pacific/Palau` - Pacific/Palau\n* `Pacific/Pitcairn` - Pacific/Pitcairn\n* `Pacific/Pohnpei` - Pacific/Pohnpei\n* `Pacific/Ponape` - Pacific/Ponape\n* `Pacific/Port_Moresby` - Pacific/Port_Moresby\n* `Pacific/Rarotonga` - Pacific/Rarotonga\n* `Pacific/Saipan` - Pacific/Saipan\n* `Pacific/Samoa` - Pacific/Samoa\n* `Pacific/Tahiti` - Pacific/Tahiti\n* `Pacific/Tarawa` - Pacific/Tarawa\n* `Pacific/Tongatapu` - Pacific/Tongatapu\n* `Pacific/Truk` - Pacific/Truk\n* `Pacific/Wake` - Pacific/Wake\n* `Pacific/Wallis` - Pacific/Wallis\n* `Pacific/Yap` - Pacific/Yap\n* `Poland` - Poland\n* `Portugal` - Portugal\n* `ROC` - ROC\n* `ROK` - ROK\n* `Singapore` - Singapore\n* `Turkey` - Turkey\n* `UCT` - UCT\n* `US/Alaska` - US/Alaska\n* `US/Aleutian` - US/Aleutian\n* `US/Arizona` - US/Arizona\n* `US/Central` - US/Central\n* `US/East-Indiana` - US/East-Indiana\n* `US/Eastern` - US/Eastern\n* `US/Hawaii` - US/Hawaii\n* `US/Indiana-Starke` - US/Indiana-Starke\n* `US/Michigan` - US/Michigan\n* `US/Mountain` - US/Mountain\n* `US/Pacific` - US/Pacific\n* `US/Samoa` - US/Samoa\n* `UTC` - UTC\n* `Universal` - Universal\n* `W-SU` - W-SU\n* `WET` - WET\n* `Zulu` - Zulu",
                "x-schema-ref": "#/components/schemas/TimezoneEnum"
              }
            ],
            "title": "Zeitzone"
          },
          "language": {
            "allOf": [
              {
                "enum": [
                  "de",
                  "en"
                ],
                "type": "string",
                "description": "* `de` - Deutsch\n* `en` - English",
                "x-schema-ref": "#/components/schemas/Language1afEnum"
              }
            ],
            "title": "Sprache",
            "description": "Bevorzugte Sprache für die Benutzeroberfläche\n\n* `de` - Deutsch\n* `en` - English"
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedUserProfileWrite"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "first_name": {
            "type": "string",
            "title": "Vorname",
            "maxLength": 150
          },
          "last_name": {
            "type": "string",
            "title": "Nachname",
            "maxLength": 150
          },
          "timezone": {
            "allOf": [
              {
                "enum": [
                  "Africa/Abidjan",
                  "Africa/Accra",
                  "Africa/Addis_Ababa",
                  "Africa/Algiers",
                  "Africa/Asmara",
                  "Africa/Asmera",
                  "Africa/Bamako",
                  "Africa/Bangui",
                  "Africa/Banjul",
                  "Africa/Bissau",
                  "Africa/Blantyre",
                  "Africa/Brazzaville",
                  "Africa/Bujumbura",
                  "Africa/Cairo",
                  "Africa/Casablanca",
                  "Africa/Ceuta",
                  "Africa/Conakry",
                  "Africa/Dakar",
                  "Africa/Dar_es_Salaam",
                  "Africa/Djibouti",
                  "Africa/Douala",
                  "Africa/El_Aaiun",
                  "Africa/Freetown",
                  "Africa/Gaborone",
                  "Africa/Harare",
                  "Africa/Johannesburg",
                  "Africa/Juba",
                  "Africa/Kampala",
                  "Africa/Khartoum",
                  "Africa/Kigali",
                  "Africa/Kinshasa",
                  "Africa/Lagos",
                  "Africa/Libreville",
                  "Africa/Lome",
                  "Africa/Luanda",
                  "Africa/Lubumbashi",
                  "Africa/Lusaka",
                  "Africa/Malabo",
                  "Africa/Maputo",
                  "Africa/Maseru",
                  "Africa/Mbabane",
                  "Africa/Mogadishu",
                  "Africa/Monrovia",
                  "Africa/Nairobi",
                  "Africa/Ndjamena",
                  "Africa/Niamey",
                  "Africa/Nouakchott",
                  "Africa/Ouagadougou",
                  "Africa/Porto-Novo",
                  "Africa/Sao_Tome",
                  "Africa/Timbuktu",
                  "Africa/Tripoli",
                  "Africa/Tunis",
                  "Africa/Windhoek",
                  "America/Adak",
                  "America/Anchorage",
                  "America/Anguilla",
                  "America/Antigua",
                  "America/Araguaina",
                  "America/Argentina/Buenos_Aires",
                  "America/Argentina/Catamarca",
                  "America/Argentina/ComodRivadavia",
                  "America/Argentina/Cordoba",
                  "America/Argentina/Jujuy",
                  "America/Argentina/La_Rioja",
                  "America/Argentina/Mendoza",
                  "America/Argentina/Rio_Gallegos",
                  "America/Argentina/Salta",
                  "America/Argentina/San_Juan",
                  "America/Argentina/San_Luis",
                  "America/Argentina/Tucuman",
                  "America/Argentina/Ushuaia",
                  "America/Aruba",
                  "America/Asuncion",
                  "America/Atikokan",
                  "America/Atka",
                  "America/Bahia",
                  "America/Bahia_Banderas",
                  "America/Barbados",
                  "America/Belem",
                  "America/Belize",
                  "America/Blanc-Sablon",
                  "America/Boa_Vista",
                  "America/Bogota",
                  "America/Boise",
                  "America/Buenos_Aires",
                  "America/Cambridge_Bay",
                  "America/Campo_Grande",
                  "America/Cancun",
                  "America/Caracas",
                  "America/Catamarca",
                  "America/Cayenne",
                  "America/Cayman",
                  "America/Chicago",
                  "America/Chihuahua",
                  "America/Ciudad_Juarez",
                  "America/Coral_Harbour",
                  "America/Cordoba",
                  "America/Costa_Rica",
                  "America/Creston",
                  "America/Cuiaba",
                  "America/Curacao",
                  "America/Danmarkshavn",
                  "America/Dawson",
                  "America/Dawson_Creek",
                  "America/Denver",
                  "America/Detroit",
                  "America/Dominica",
                  "America/Edmonton",
                  "America/Eirunepe",
                  "America/El_Salvador",
                  "America/Ensenada",
                  "America/Fort_Nelson",
                  "America/Fort_Wayne",
                  "America/Fortaleza",
                  "America/Glace_Bay",
                  "America/Godthab",
                  "America/Goose_Bay",
                  "America/Grand_Turk",
                  "America/Grenada",
                  "America/Guadeloupe",
                  "America/Guatemala",
                  "America/Guayaquil",
                  "America/Guyana",
                  "America/Halifax",
                  "America/Havana",
                  "America/Hermosillo",
                  "America/Indiana/Indianapolis",
                  "America/Indiana/Knox",
                  "America/Indiana/Marengo",
                  "America/Indiana/Petersburg",
                  "America/Indiana/Tell_City",
                  "America/Indiana/Vevay",
                  "America/Indiana/Vincennes",
                  "America/Indiana/Winamac",
                  "America/Indianapolis",
                  "America/Inuvik",
                  "America/Iqaluit",
                  "America/Jamaica",
                  "America/Jujuy",
                  "America/Juneau",
                  "America/Kentucky/Louisville",
                  "America/Kentucky/Monticello",
                  "America/Knox_IN",
                  "America/Kralendijk",
                  "America/La_Paz",
                  "America/Lima",
                  "America/Los_Angeles",
                  "America/Louisville",
                  "America/Lower_Princes",
                  "America/Maceio",
                  "America/Managua",
                  "America/Manaus",
                  "America/Marigot",
                  "America/Martinique",
                  "America/Matamoros",
                  "America/Mazatlan",
                  "America/Mendoza",
                  "America/Menominee",
                  "America/Merida",
                  "America/Metlakatla",
                  "America/Mexico_City",
                  "America/Miquelon",
                  "America/Moncton",
                  "America/Monterrey",
                  "America/Montevideo",
                  "America/Montreal",
                  "America/Montserrat",
                  "America/Nassau",
                  "America/New_York",
                  "America/Nipigon",
                  "America/Nome",
                  "America/Noronha",
                  "America/North_Dakota/Beulah",
                  "America/North_Dakota/Center",
                  "America/North_Dakota/New_Salem",
                  "America/Nuuk",
                  "America/Ojinaga",
                  "America/Panama",
                  "America/Pangnirtung",
                  "America/Paramaribo",
                  "America/Phoenix",
                  "America/Port-au-Prince",
                  "America/Port_of_Spain",
                  "America/Porto_Acre",
                  "America/Porto_Velho",
                  "America/Puerto_Rico",
                  "America/Punta_Arenas",
                  "America/Rainy_River",
                  "America/Rankin_Inlet",
                  "America/Recife",
                  "America/Regina",
                  "America/Resolute",
                  "America/Rio_Branco",
                  "America/Rosario",
                  "America/Santa_Isabel",
                  "America/Santarem",
                  "America/Santiago",
                  "America/Santo_Domingo",
                  "America/Sao_Paulo",
                  "America/Scoresbysund",
                  "America/Shiprock",
                  "America/Sitka",
                  "America/St_Barthelemy",
                  "America/St_Johns",
                  "America/St_Kitts",
                  "America/St_Lucia",
                  "America/St_Thomas",
                  "America/St_Vincent",
                  "America/Swift_Current",
                  "America/Tegucigalpa",
                  "America/Thule",
                  "America/Thunder_Bay",
                  "America/Tijuana",
                  "America/Toronto",
                  "America/Tortola",
                  "America/Vancouver",
                  "America/Virgin",
                  "America/Whitehorse",
                  "America/Winnipeg",
                  "America/Yakutat",
                  "America/Yellowknife",
                  "Antarctica/Casey",
                  "Antarctica/Davis",
                  "Antarctica/DumontDUrville",
                  "Antarctica/Macquarie",
                  "Antarctica/Mawson",
                  "Antarctica/McMurdo",
                  "Antarctica/Palmer",
                  "Antarctica/Rothera",
                  "Antarctica/South_Pole",
                  "Antarctica/Syowa",
                  "Antarctica/Troll",
                  "Antarctica/Vostok",
                  "Arctic/Longyearbyen",
                  "Asia/Aden",
                  "Asia/Almaty",
                  "Asia/Amman",
                  "Asia/Anadyr",
                  "Asia/Aqtau",
                  "Asia/Aqtobe",
                  "Asia/Ashgabat",
                  "Asia/Ashkhabad",
                  "Asia/Atyrau",
                  "Asia/Baghdad",
                  "Asia/Bahrain",
                  "Asia/Baku",
                  "Asia/Bangkok",
                  "Asia/Barnaul",
                  "Asia/Beirut",
                  "Asia/Bishkek",
                  "Asia/Brunei",
                  "Asia/Calcutta",
                  "Asia/Chita",
                  "Asia/Choibalsan",
                  "Asia/Chongqing",
                  "Asia/Chungking",
                  "Asia/Colombo",
                  "Asia/Dacca",
                  "Asia/Damascus",
                  "Asia/Dhaka",
                  "Asia/Dili",
                  "Asia/Dubai",
                  "Asia/Dushanbe",
                  "Asia/Famagusta",
                  "Asia/Gaza",
                  "Asia/Hanoi",
                  "Asia/Harbin",
                  "Asia/Hebron",
                  "Asia/Ho_Chi_Minh",
                  "Asia/Hong_Kong",
                  "Asia/Hovd",
                  "Asia/Irkutsk",
                  "Asia/Istanbul",
                  "Asia/Jakarta",
                  "Asia/Jayapura",
                  "Asia/Jerusalem",
                  "Asia/Kabul",
                  "Asia/Kamchatka",
                  "Asia/Karachi",
                  "Asia/Kashgar",
                  "Asia/Kathmandu",
                  "Asia/Katmandu",
                  "Asia/Khandyga",
                  "Asia/Kolkata",
                  "Asia/Krasnoyarsk",
                  "Asia/Kuala_Lumpur",
                  "Asia/Kuching",
                  "Asia/Kuwait",
                  "Asia/Macao",
                  "Asia/Macau",
                  "Asia/Magadan",
                  "Asia/Makassar",
                  "Asia/Manila",
                  "Asia/Muscat",
                  "Asia/Nicosia",
                  "Asia/Novokuznetsk",
                  "Asia/Novosibirsk",
                  "Asia/Omsk",
                  "Asia/Oral",
                  "Asia/Phnom_Penh",
                  "Asia/Pontianak",
                  "Asia/Pyongyang",
                  "Asia/Qatar",
                  "Asia/Qostanay",
                  "Asia/Qyzylorda",
                  "Asia/Rangoon",
                  "Asia/Riyadh",
                  "Asia/Saigon",
                  "Asia/Sakhalin",
                  "Asia/Samarkand",
                  "Asia/Seoul",
                  "Asia/Shanghai",
                  "Asia/Singapore",
                  "Asia/Srednekolymsk",
                  "Asia/Taipei",
                  "Asia/Tashkent",
                  "Asia/Tbilisi",
                  "Asia/Tehran",
                  "Asia/Tel_Aviv",
                  "Asia/Thimbu",
                  "Asia/Thimphu",
                  "Asia/Tokyo",
                  "Asia/Tomsk",
                  "Asia/Ujung_Pandang",
                  "Asia/Ulaanbaatar",
                  "Asia/Ulan_Bator",
                  "Asia/Urumqi",
                  "Asia/Ust-Nera",
                  "Asia/Vientiane",
                  "Asia/Vladivostok",
                  "Asia/Yakutsk",
                  "Asia/Yangon",
                  "Asia/Yekaterinburg",
                  "Asia/Yerevan",
                  "Atlantic/Azores",
                  "Atlantic/Bermuda",
                  "Atlantic/Canary",
                  "Atlantic/Cape_Verde",
                  "Atlantic/Faeroe",
                  "Atlantic/Faroe",
                  "Atlantic/Jan_Mayen",
                  "Atlantic/Madeira",
                  "Atlantic/Reykjavik",
                  "Atlantic/South_Georgia",
                  "Atlantic/St_Helena",
                  "Atlantic/Stanley",
                  "Australia/ACT",
                  "Australia/Adelaide",
                  "Australia/Brisbane",
                  "Australia/Broken_Hill",
                  "Australia/Canberra",
                  "Australia/Currie",
                  "Australia/Darwin",
                  "Australia/Eucla",
                  "Australia/Hobart",
                  "Australia/LHI",
                  "Australia/Lindeman",
                  "Australia/Lord_Howe",
                  "Australia/Melbourne",
                  "Australia/NSW",
                  "Australia/North",
                  "Australia/Perth",
                  "Australia/Queensland",
                  "Australia/South",
                  "Australia/Sydney",
                  "Australia/Tasmania",
                  "Australia/Victoria",
                  "Australia/West",
                  "Australia/Yancowinna",
                  "Brazil/Acre",
                  "Brazil/DeNoronha",
                  "Brazil/East",
                  "Brazil/West",
                  "CET",
                  "CST6CDT",
                  "Canada/Atlantic",
                  "Canada/Central",
                  "Canada/Eastern",
                  "Canada/Mountain",
                  "Canada/Newfoundland",
                  "Canada/Pacific",
                  "Canada/Saskatchewan",
                  "Canada/Yukon",
                  "Chile/Continental",
                  "Chile/EasterIsland",
                  "Cuba",
                  "EET",
                  "EST",
                  "EST5EDT",
                  "Egypt",
                  "Eire",
                  "Etc/GMT",
                  "Etc/GMT+0",
                  "Etc/GMT+1",
                  "Etc/GMT+10",
                  "Etc/GMT+11",
                  "Etc/GMT+12",
                  "Etc/GMT+2",
                  "Etc/GMT+3",
                  "Etc/GMT+4",
                  "Etc/GMT+5",
                  "Etc/GMT+6",
                  "Etc/GMT+7",
                  "Etc/GMT+8",
                  "Etc/GMT+9",
                  "Etc/GMT-0",
                  "Etc/GMT-1",
                  "Etc/GMT-10",
                  "Etc/GMT-11",
                  "Etc/GMT-12",
                  "Etc/GMT-13",
                  "Etc/GMT-14",
                  "Etc/GMT-2",
                  "Etc/GMT-3",
                  "Etc/GMT-4",
                  "Etc/GMT-5",
                  "Etc/GMT-6",
                  "Etc/GMT-7",
                  "Etc/GMT-8",
                  "Etc/GMT-9",
                  "Etc/GMT0",
                  "Etc/Greenwich",
                  "Etc/UCT",
                  "Etc/UTC",
                  "Etc/Universal",
                  "Etc/Zulu",
                  "Europe/Amsterdam",
                  "Europe/Andorra",
                  "Europe/Astrakhan",
                  "Europe/Athens",
                  "Europe/Belfast",
                  "Europe/Belgrade",
                  "Europe/Berlin",
                  "Europe/Bratislava",
                  "Europe/Brussels",
                  "Europe/Bucharest",
                  "Europe/Budapest",
                  "Europe/Busingen",
                  "Europe/Chisinau",
                  "Europe/Copenhagen",
                  "Europe/Dublin",
                  "Europe/Gibraltar",
                  "Europe/Guernsey",
                  "Europe/Helsinki",
                  "Europe/Isle_of_Man",
                  "Europe/Istanbul",
                  "Europe/Jersey",
                  "Europe/Kaliningrad",
                  "Europe/Kiev",
                  "Europe/Kirov",
                  "Europe/Kyiv",
                  "Europe/Lisbon",
                  "Europe/Ljubljana",
                  "Europe/London",
                  "Europe/Luxembourg",
                  "Europe/Madrid",
                  "Europe/Malta",
                  "Europe/Mariehamn",
                  "Europe/Minsk",
                  "Europe/Monaco",
                  "Europe/Moscow",
                  "Europe/Nicosia",
                  "Europe/Oslo",
                  "Europe/Paris",
                  "Europe/Podgorica",
                  "Europe/Prague",
                  "Europe/Riga",
                  "Europe/Rome",
                  "Europe/Samara",
                  "Europe/San_Marino",
                  "Europe/Sarajevo",
                  "Europe/Saratov",
                  "Europe/Simferopol",
                  "Europe/Skopje",
                  "Europe/Sofia",
                  "Europe/Stockholm",
                  "Europe/Tallinn",
                  "Europe/Tirane",
                  "Europe/Tiraspol",
                  "Europe/Ulyanovsk",
                  "Europe/Uzhgorod",
                  "Europe/Vaduz",
                  "Europe/Vatican",
                  "Europe/Vienna",
                  "Europe/Vilnius",
                  "Europe/Volgograd",
                  "Europe/Warsaw",
                  "Europe/Zagreb",
                  "Europe/Zaporozhye",
                  "Europe/Zurich",
                  "Factory",
                  "GB",
                  "GB-Eire",
                  "GMT",
                  "GMT+0",
                  "GMT-0",
                  "GMT0",
                  "Greenwich",
                  "HST",
                  "Hongkong",
                  "Iceland",
                  "Indian/Antananarivo",
                  "Indian/Chagos",
                  "Indian/Christmas",
                  "Indian/Cocos",
                  "Indian/Comoro",
                  "Indian/Kerguelen",
                  "Indian/Mahe",
                  "Indian/Maldives",
                  "Indian/Mauritius",
                  "Indian/Mayotte",
                  "Indian/Reunion",
                  "Iran",
                  "Israel",
                  "Jamaica",
                  "Japan",
                  "Kwajalein",
                  "Libya",
                  "MET",
                  "MST",
                  "MST7MDT",
                  "Mexico/BajaNorte",
                  "Mexico/BajaSur",
                  "Mexico/General",
                  "NZ",
                  "NZ-CHAT",
                  "Navajo",
                  "PRC",
                  "PST8PDT",
                  "Pacific/Apia",
                  "Pacific/Auckland",
                  "Pacific/Bougainville",
                  "Pacific/Chatham",
                  "Pacific/Chuuk",
                  "Pacific/Easter",
                  "Pacific/Efate",
                  "Pacific/Enderbury",
                  "Pacific/Fakaofo",
                  "Pacific/Fiji",
                  "Pacific/Funafuti",
                  "Pacific/Galapagos",
                  "Pacific/Gambier",
                  "Pacific/Guadalcanal",
                  "Pacific/Guam",
                  "Pacific/Honolulu",
                  "Pacific/Johnston",
                  "Pacific/Kanton",
                  "Pacific/Kiritimati",
                  "Pacific/Kosrae",
                  "Pacific/Kwajalein",
                  "Pacific/Majuro",
                  "Pacific/Marquesas",
                  "Pacific/Midway",
                  "Pacific/Nauru",
                  "Pacific/Niue",
                  "Pacific/Norfolk",
                  "Pacific/Noumea",
                  "Pacific/Pago_Pago",
                  "Pacific/Palau",
                  "Pacific/Pitcairn",
                  "Pacific/Pohnpei",
                  "Pacific/Ponape",
                  "Pacific/Port_Moresby",
                  "Pacific/Rarotonga",
                  "Pacific/Saipan",
                  "Pacific/Samoa",
                  "Pacific/Tahiti",
                  "Pacific/Tarawa",
                  "Pacific/Tongatapu",
                  "Pacific/Truk",
                  "Pacific/Wake",
                  "Pacific/Wallis",
                  "Pacific/Yap",
                  "Poland",
                  "Portugal",
                  "ROC",
                  "ROK",
                  "Singapore",
                  "Turkey",
                  "UCT",
                  "US/Alaska",
                  "US/Aleutian",
                  "US/Arizona",
                  "US/Central",
                  "US/East-Indiana",
                  "US/Eastern",
                  "US/Hawaii",
                  "US/Indiana-Starke",
                  "US/Michigan",
                  "US/Mountain",
                  "US/Pacific",
                  "US/Samoa",
                  "UTC",
                  "Universal",
                  "W-SU",
                  "WET",
                  "Zulu"
                ],
                "type": "string",
                "description": "* `Africa/Abidjan` - Africa/Abidjan\n* `Africa/Accra` - Africa/Accra\n* `Africa/Addis_Ababa` - Africa/Addis_Ababa\n* `Africa/Algiers` - Africa/Algiers\n* `Africa/Asmara` - Africa/Asmara\n* `Africa/Asmera` - Africa/Asmera\n* `Africa/Bamako` - Africa/Bamako\n* `Africa/Bangui` - Africa/Bangui\n* `Africa/Banjul` - Africa/Banjul\n* `Africa/Bissau` - Africa/Bissau\n* `Africa/Blantyre` - Africa/Blantyre\n* `Africa/Brazzaville` - Africa/Brazzaville\n* `Africa/Bujumbura` - Africa/Bujumbura\n* `Africa/Cairo` - Africa/Cairo\n* `Africa/Casablanca` - Africa/Casablanca\n* `Africa/Ceuta` - Africa/Ceuta\n* `Africa/Conakry` - Africa/Conakry\n* `Africa/Dakar` - Africa/Dakar\n* `Africa/Dar_es_Salaam` - Africa/Dar_es_Salaam\n* `Africa/Djibouti` - Africa/Djibouti\n* `Africa/Douala` - Africa/Douala\n* `Africa/El_Aaiun` - Africa/El_Aaiun\n* `Africa/Freetown` - Africa/Freetown\n* `Africa/Gaborone` - Africa/Gaborone\n* `Africa/Harare` - Africa/Harare\n* `Africa/Johannesburg` - Africa/Johannesburg\n* `Africa/Juba` - Africa/Juba\n* `Africa/Kampala` - Africa/Kampala\n* `Africa/Khartoum` - Africa/Khartoum\n* `Africa/Kigali` - Africa/Kigali\n* `Africa/Kinshasa` - Africa/Kinshasa\n* `Africa/Lagos` - Africa/Lagos\n* `Africa/Libreville` - Africa/Libreville\n* `Africa/Lome` - Africa/Lome\n* `Africa/Luanda` - Africa/Luanda\n* `Africa/Lubumbashi` - Africa/Lubumbashi\n* `Africa/Lusaka` - Africa/Lusaka\n* `Africa/Malabo` - Africa/Malabo\n* `Africa/Maputo` - Africa/Maputo\n* `Africa/Maseru` - Africa/Maseru\n* `Africa/Mbabane` - Africa/Mbabane\n* `Africa/Mogadishu` - Africa/Mogadishu\n* `Africa/Monrovia` - Africa/Monrovia\n* `Africa/Nairobi` - Africa/Nairobi\n* `Africa/Ndjamena` - Africa/Ndjamena\n* `Africa/Niamey` - Africa/Niamey\n* `Africa/Nouakchott` - Africa/Nouakchott\n* `Africa/Ouagadougou` - Africa/Ouagadougou\n* `Africa/Porto-Novo` - Africa/Porto-Novo\n* `Africa/Sao_Tome` - Africa/Sao_Tome\n* `Africa/Timbuktu` - Africa/Timbuktu\n* `Africa/Tripoli` - Africa/Tripoli\n* `Africa/Tunis` - Africa/Tunis\n* `Africa/Windhoek` - Africa/Windhoek\n* `America/Adak` - America/Adak\n* `America/Anchorage` - America/Anchorage\n* `America/Anguilla` - America/Anguilla\n* `America/Antigua` - America/Antigua\n* `America/Araguaina` - America/Araguaina\n* `America/Argentina/Buenos_Aires` - America/Argentina/Buenos_Aires\n* `America/Argentina/Catamarca` - America/Argentina/Catamarca\n* `America/Argentina/ComodRivadavia` - America/Argentina/ComodRivadavia\n* `America/Argentina/Cordoba` - America/Argentina/Cordoba\n* `America/Argentina/Jujuy` - America/Argentina/Jujuy\n* `America/Argentina/La_Rioja` - America/Argentina/La_Rioja\n* `America/Argentina/Mendoza` - America/Argentina/Mendoza\n* `America/Argentina/Rio_Gallegos` - America/Argentina/Rio_Gallegos\n* `America/Argentina/Salta` - America/Argentina/Salta\n* `America/Argentina/San_Juan` - America/Argentina/San_Juan\n* `America/Argentina/San_Luis` - America/Argentina/San_Luis\n* `America/Argentina/Tucuman` - America/Argentina/Tucuman\n* `America/Argentina/Ushuaia` - America/Argentina/Ushuaia\n* `America/Aruba` - America/Aruba\n* `America/Asuncion` - America/Asuncion\n* `America/Atikokan` - America/Atikokan\n* `America/Atka` - America/Atka\n* `America/Bahia` - America/Bahia\n* `America/Bahia_Banderas` - America/Bahia_Banderas\n* `America/Barbados` - America/Barbados\n* `America/Belem` - America/Belem\n* `America/Belize` - America/Belize\n* `America/Blanc-Sablon` - America/Blanc-Sablon\n* `America/Boa_Vista` - America/Boa_Vista\n* `America/Bogota` - America/Bogota\n* `America/Boise` - America/Boise\n* `America/Buenos_Aires` - America/Buenos_Aires\n* `America/Cambridge_Bay` - America/Cambridge_Bay\n* `America/Campo_Grande` - America/Campo_Grande\n* `America/Cancun` - America/Cancun\n* `America/Caracas` - America/Caracas\n* `America/Catamarca` - America/Catamarca\n* `America/Cayenne` - America/Cayenne\n* `America/Cayman` - America/Cayman\n* `America/Chicago` - America/Chicago\n* `America/Chihuahua` - America/Chihuahua\n* `America/Ciudad_Juarez` - America/Ciudad_Juarez\n* `America/Coral_Harbour` - America/Coral_Harbour\n* `America/Cordoba` - America/Cordoba\n* `America/Costa_Rica` - America/Costa_Rica\n* `America/Creston` - America/Creston\n* `America/Cuiaba` - America/Cuiaba\n* `America/Curacao` - America/Curacao\n* `America/Danmarkshavn` - America/Danmarkshavn\n* `America/Dawson` - America/Dawson\n* `America/Dawson_Creek` - America/Dawson_Creek\n* `America/Denver` - America/Denver\n* `America/Detroit` - America/Detroit\n* `America/Dominica` - America/Dominica\n* `America/Edmonton` - America/Edmonton\n* `America/Eirunepe` - America/Eirunepe\n* `America/El_Salvador` - America/El_Salvador\n* `America/Ensenada` - America/Ensenada\n* `America/Fort_Nelson` - America/Fort_Nelson\n* `America/Fort_Wayne` - America/Fort_Wayne\n* `America/Fortaleza` - America/Fortaleza\n* `America/Glace_Bay` - America/Glace_Bay\n* `America/Godthab` - America/Godthab\n* `America/Goose_Bay` - America/Goose_Bay\n* `America/Grand_Turk` - America/Grand_Turk\n* `America/Grenada` - America/Grenada\n* `America/Guadeloupe` - America/Guadeloupe\n* `America/Guatemala` - America/Guatemala\n* `America/Guayaquil` - America/Guayaquil\n* `America/Guyana` - America/Guyana\n* `America/Halifax` - America/Halifax\n* `America/Havana` - America/Havana\n* `America/Hermosillo` - America/Hermosillo\n* `America/Indiana/Indianapolis` - America/Indiana/Indianapolis\n* `America/Indiana/Knox` - America/Indiana/Knox\n* `America/Indiana/Marengo` - America/Indiana/Marengo\n* `America/Indiana/Petersburg` - America/Indiana/Petersburg\n* `America/Indiana/Tell_City` - America/Indiana/Tell_City\n* `America/Indiana/Vevay` - America/Indiana/Vevay\n* `America/Indiana/Vincennes` - America/Indiana/Vincennes\n* `America/Indiana/Winamac` - America/Indiana/Winamac\n* `America/Indianapolis` - America/Indianapolis\n* `America/Inuvik` - America/Inuvik\n* `America/Iqaluit` - America/Iqaluit\n* `America/Jamaica` - America/Jamaica\n* `America/Jujuy` - America/Jujuy\n* `America/Juneau` - America/Juneau\n* `America/Kentucky/Louisville` - America/Kentucky/Louisville\n* `America/Kentucky/Monticello` - America/Kentucky/Monticello\n* `America/Knox_IN` - America/Knox_IN\n* `America/Kralendijk` - America/Kralendijk\n* `America/La_Paz` - America/La_Paz\n* `America/Lima` - America/Lima\n* `America/Los_Angeles` - America/Los_Angeles\n* `America/Louisville` - America/Louisville\n* `America/Lower_Princes` - America/Lower_Princes\n* `America/Maceio` - America/Maceio\n* `America/Managua` - America/Managua\n* `America/Manaus` - America/Manaus\n* `America/Marigot` - America/Marigot\n* `America/Martinique` - America/Martinique\n* `America/Matamoros` - America/Matamoros\n* `America/Mazatlan` - America/Mazatlan\n* `America/Mendoza` - America/Mendoza\n* `America/Menominee` - America/Menominee\n* `America/Merida` - America/Merida\n* `America/Metlakatla` - America/Metlakatla\n* `America/Mexico_City` - America/Mexico_City\n* `America/Miquelon` - America/Miquelon\n* `America/Moncton` - America/Moncton\n* `America/Monterrey` - America/Monterrey\n* `America/Montevideo` - America/Montevideo\n* `America/Montreal` - America/Montreal\n* `America/Montserrat` - America/Montserrat\n* `America/Nassau` - America/Nassau\n* `America/New_York` - America/New_York\n* `America/Nipigon` - America/Nipigon\n* `America/Nome` - America/Nome\n* `America/Noronha` - America/Noronha\n* `America/North_Dakota/Beulah` - America/North_Dakota/Beulah\n* `America/North_Dakota/Center` - America/North_Dakota/Center\n* `America/North_Dakota/New_Salem` - America/North_Dakota/New_Salem\n* `America/Nuuk` - America/Nuuk\n* `America/Ojinaga` - America/Ojinaga\n* `America/Panama` - America/Panama\n* `America/Pangnirtung` - America/Pangnirtung\n* `America/Paramaribo` - America/Paramaribo\n* `America/Phoenix` - America/Phoenix\n* `America/Port-au-Prince` - America/Port-au-Prince\n* `America/Port_of_Spain` - America/Port_of_Spain\n* `America/Porto_Acre` - America/Porto_Acre\n* `America/Porto_Velho` - America/Porto_Velho\n* `America/Puerto_Rico` - America/Puerto_Rico\n* `America/Punta_Arenas` - America/Punta_Arenas\n* `America/Rainy_River` - America/Rainy_River\n* `America/Rankin_Inlet` - America/Rankin_Inlet\n* `America/Recife` - America/Recife\n* `America/Regina` - America/Regina\n* `America/Resolute` - America/Resolute\n* `America/Rio_Branco` - America/Rio_Branco\n* `America/Rosario` - America/Rosario\n* `America/Santa_Isabel` - America/Santa_Isabel\n* `America/Santarem` - America/Santarem\n* `America/Santiago` - America/Santiago\n* `America/Santo_Domingo` - America/Santo_Domingo\n* `America/Sao_Paulo` - America/Sao_Paulo\n* `America/Scoresbysund` - America/Scoresbysund\n* `America/Shiprock` - America/Shiprock\n* `America/Sitka` - America/Sitka\n* `America/St_Barthelemy` - America/St_Barthelemy\n* `America/St_Johns` - America/St_Johns\n* `America/St_Kitts` - America/St_Kitts\n* `America/St_Lucia` - America/St_Lucia\n* `America/St_Thomas` - America/St_Thomas\n* `America/St_Vincent` - America/St_Vincent\n* `America/Swift_Current` - America/Swift_Current\n* `America/Tegucigalpa` - America/Tegucigalpa\n* `America/Thule` - America/Thule\n* `America/Thunder_Bay` - America/Thunder_Bay\n* `America/Tijuana` - America/Tijuana\n* `America/Toronto` - America/Toronto\n* `America/Tortola` - America/Tortola\n* `America/Vancouver` - America/Vancouver\n* `America/Virgin` - America/Virgin\n* `America/Whitehorse` - America/Whitehorse\n* `America/Winnipeg` - America/Winnipeg\n* `America/Yakutat` - America/Yakutat\n* `America/Yellowknife` - America/Yellowknife\n* `Antarctica/Casey` - Antarctica/Casey\n* `Antarctica/Davis` - Antarctica/Davis\n* `Antarctica/DumontDUrville` - Antarctica/DumontDUrville\n* `Antarctica/Macquarie` - Antarctica/Macquarie\n* `Antarctica/Mawson` - Antarctica/Mawson\n* `Antarctica/McMurdo` - Antarctica/McMurdo\n* `Antarctica/Palmer` - Antarctica/Palmer\n* `Antarctica/Rothera` - Antarctica/Rothera\n* `Antarctica/South_Pole` - Antarctica/South_Pole\n* `Antarctica/Syowa` - Antarctica/Syowa\n* `Antarctica/Troll` - Antarctica/Troll\n* `Antarctica/Vostok` - Antarctica/Vostok\n* `Arctic/Longyearbyen` - Arctic/Longyearbyen\n* `Asia/Aden` - Asia/Aden\n* `Asia/Almaty` - Asia/Almaty\n* `Asia/Amman` - Asia/Amman\n* `Asia/Anadyr` - Asia/Anadyr\n* `Asia/Aqtau` - Asia/Aqtau\n* `Asia/Aqtobe` - Asia/Aqtobe\n* `Asia/Ashgabat` - Asia/Ashgabat\n* `Asia/Ashkhabad` - Asia/Ashkhabad\n* `Asia/Atyrau` - Asia/Atyrau\n* `Asia/Baghdad` - Asia/Baghdad\n* `Asia/Bahrain` - Asia/Bahrain\n* `Asia/Baku` - Asia/Baku\n* `Asia/Bangkok` - Asia/Bangkok\n* `Asia/Barnaul` - Asia/Barnaul\n* `Asia/Beirut` - Asia/Beirut\n* `Asia/Bishkek` - Asia/Bishkek\n* `Asia/Brunei` - Asia/Brunei\n* `Asia/Calcutta` - Asia/Calcutta\n* `Asia/Chita` - Asia/Chita\n* `Asia/Choibalsan` - Asia/Choibalsan\n* `Asia/Chongqing` - Asia/Chongqing\n* `Asia/Chungking` - Asia/Chungking\n* `Asia/Colombo` - Asia/Colombo\n* `Asia/Dacca` - Asia/Dacca\n* `Asia/Damascus` - Asia/Damascus\n* `Asia/Dhaka` - Asia/Dhaka\n* `Asia/Dili` - Asia/Dili\n* `Asia/Dubai` - Asia/Dubai\n* `Asia/Dushanbe` - Asia/Dushanbe\n* `Asia/Famagusta` - Asia/Famagusta\n* `Asia/Gaza` - Asia/Gaza\n* `Asia/Hanoi` - Asia/Hanoi\n* `Asia/Harbin` - Asia/Harbin\n* `Asia/Hebron` - Asia/Hebron\n* `Asia/Ho_Chi_Minh` - Asia/Ho_Chi_Minh\n* `Asia/Hong_Kong` - Asia/Hong_Kong\n* `Asia/Hovd` - Asia/Hovd\n* `Asia/Irkutsk` - Asia/Irkutsk\n* `Asia/Istanbul` - Asia/Istanbul\n* `Asia/Jakarta` - Asia/Jakarta\n* `Asia/Jayapura` - Asia/Jayapura\n* `Asia/Jerusalem` - Asia/Jerusalem\n* `Asia/Kabul` - Asia/Kabul\n* `Asia/Kamchatka` - Asia/Kamchatka\n* `Asia/Karachi` - Asia/Karachi\n* `Asia/Kashgar` - Asia/Kashgar\n* `Asia/Kathmandu` - Asia/Kathmandu\n* `Asia/Katmandu` - Asia/Katmandu\n* `Asia/Khandyga` - Asia/Khandyga\n* `Asia/Kolkata` - Asia/Kolkata\n* `Asia/Krasnoyarsk` - Asia/Krasnoyarsk\n* `Asia/Kuala_Lumpur` - Asia/Kuala_Lumpur\n* `Asia/Kuching` - Asia/Kuching\n* `Asia/Kuwait` - Asia/Kuwait\n* `Asia/Macao` - Asia/Macao\n* `Asia/Macau` - Asia/Macau\n* `Asia/Magadan` - Asia/Magadan\n* `Asia/Makassar` - Asia/Makassar\n* `Asia/Manila` - Asia/Manila\n* `Asia/Muscat` - Asia/Muscat\n* `Asia/Nicosia` - Asia/Nicosia\n* `Asia/Novokuznetsk` - Asia/Novokuznetsk\n* `Asia/Novosibirsk` - Asia/Novosibirsk\n* `Asia/Omsk` - Asia/Omsk\n* `Asia/Oral` - Asia/Oral\n* `Asia/Phnom_Penh` - Asia/Phnom_Penh\n* `Asia/Pontianak` - Asia/Pontianak\n* `Asia/Pyongyang` - Asia/Pyongyang\n* `Asia/Qatar` - Asia/Qatar\n* `Asia/Qostanay` - Asia/Qostanay\n* `Asia/Qyzylorda` - Asia/Qyzylorda\n* `Asia/Rangoon` - Asia/Rangoon\n* `Asia/Riyadh` - Asia/Riyadh\n* `Asia/Saigon` - Asia/Saigon\n* `Asia/Sakhalin` - Asia/Sakhalin\n* `Asia/Samarkand` - Asia/Samarkand\n* `Asia/Seoul` - Asia/Seoul\n* `Asia/Shanghai` - Asia/Shanghai\n* `Asia/Singapore` - Asia/Singapore\n* `Asia/Srednekolymsk` - Asia/Srednekolymsk\n* `Asia/Taipei` - Asia/Taipei\n* `Asia/Tashkent` - Asia/Tashkent\n* `Asia/Tbilisi` - Asia/Tbilisi\n* `Asia/Tehran` - Asia/Tehran\n* `Asia/Tel_Aviv` - Asia/Tel_Aviv\n* `Asia/Thimbu` - Asia/Thimbu\n* `Asia/Thimphu` - Asia/Thimphu\n* `Asia/Tokyo` - Asia/Tokyo\n* `Asia/Tomsk` - Asia/Tomsk\n* `Asia/Ujung_Pandang` - Asia/Ujung_Pandang\n* `Asia/Ulaanbaatar` - Asia/Ulaanbaatar\n* `Asia/Ulan_Bator` - Asia/Ulan_Bator\n* `Asia/Urumqi` - Asia/Urumqi\n* `Asia/Ust-Nera` - Asia/Ust-Nera\n* `Asia/Vientiane` - Asia/Vientiane\n* `Asia/Vladivostok` - Asia/Vladivostok\n* `Asia/Yakutsk` - Asia/Yakutsk\n* `Asia/Yangon` - Asia/Yangon\n* `Asia/Yekaterinburg` - Asia/Yekaterinburg\n* `Asia/Yerevan` - Asia/Yerevan\n* `Atlantic/Azores` - Atlantic/Azores\n* `Atlantic/Bermuda` - Atlantic/Bermuda\n* `Atlantic/Canary` - Atlantic/Canary\n* `Atlantic/Cape_Verde` - Atlantic/Cape_Verde\n* `Atlantic/Faeroe` - Atlantic/Faeroe\n* `Atlantic/Faroe` - Atlantic/Faroe\n* `Atlantic/Jan_Mayen` - Atlantic/Jan_Mayen\n* `Atlantic/Madeira` - Atlantic/Madeira\n* `Atlantic/Reykjavik` - Atlantic/Reykjavik\n* `Atlantic/South_Georgia` - Atlantic/South_Georgia\n* `Atlantic/St_Helena` - Atlantic/St_Helena\n* `Atlantic/Stanley` - Atlantic/Stanley\n* `Australia/ACT` - Australia/ACT\n* `Australia/Adelaide` - Australia/Adelaide\n* `Australia/Brisbane` - Australia/Brisbane\n* `Australia/Broken_Hill` - Australia/Broken_Hill\n* `Australia/Canberra` - Australia/Canberra\n* `Australia/Currie` - Australia/Currie\n* `Australia/Darwin` - Australia/Darwin\n* `Australia/Eucla` - Australia/Eucla\n* `Australia/Hobart` - Australia/Hobart\n* `Australia/LHI` - Australia/LHI\n* `Australia/Lindeman` - Australia/Lindeman\n* `Australia/Lord_Howe` - Australia/Lord_Howe\n* `Australia/Melbourne` - Australia/Melbourne\n* `Australia/NSW` - Australia/NSW\n* `Australia/North` - Australia/North\n* `Australia/Perth` - Australia/Perth\n* `Australia/Queensland` - Australia/Queensland\n* `Australia/South` - Australia/South\n* `Australia/Sydney` - Australia/Sydney\n* `Australia/Tasmania` - Australia/Tasmania\n* `Australia/Victoria` - Australia/Victoria\n* `Australia/West` - Australia/West\n* `Australia/Yancowinna` - Australia/Yancowinna\n* `Brazil/Acre` - Brazil/Acre\n* `Brazil/DeNoronha` - Brazil/DeNoronha\n* `Brazil/East` - Brazil/East\n* `Brazil/West` - Brazil/West\n* `CET` - CET\n* `CST6CDT` - CST6CDT\n* `Canada/Atlantic` - Canada/Atlantic\n* `Canada/Central` - Canada/Central\n* `Canada/Eastern` - Canada/Eastern\n* `Canada/Mountain` - Canada/Mountain\n* `Canada/Newfoundland` - Canada/Newfoundland\n* `Canada/Pacific` - Canada/Pacific\n* `Canada/Saskatchewan` - Canada/Saskatchewan\n* `Canada/Yukon` - Canada/Yukon\n* `Chile/Continental` - Chile/Continental\n* `Chile/EasterIsland` - Chile/EasterIsland\n* `Cuba` - Cuba\n* `EET` - EET\n* `EST` - EST\n* `EST5EDT` - EST5EDT\n* `Egypt` - Egypt\n* `Eire` - Eire\n* `Etc/GMT` - Etc/GMT\n* `Etc/GMT+0` - Etc/GMT+0\n* `Etc/GMT+1` - Etc/GMT+1\n* `Etc/GMT+10` - Etc/GMT+10\n* `Etc/GMT+11` - Etc/GMT+11\n* `Etc/GMT+12` - Etc/GMT+12\n* `Etc/GMT+2` - Etc/GMT+2\n* `Etc/GMT+3` - Etc/GMT+3\n* `Etc/GMT+4` - Etc/GMT+4\n* `Etc/GMT+5` - Etc/GMT+5\n* `Etc/GMT+6` - Etc/GMT+6\n* `Etc/GMT+7` - Etc/GMT+7\n* `Etc/GMT+8` - Etc/GMT+8\n* `Etc/GMT+9` - Etc/GMT+9\n* `Etc/GMT-0` - Etc/GMT-0\n* `Etc/GMT-1` - Etc/GMT-1\n* `Etc/GMT-10` - Etc/GMT-10\n* `Etc/GMT-11` - Etc/GMT-11\n* `Etc/GMT-12` - Etc/GMT-12\n* `Etc/GMT-13` - Etc/GMT-13\n* `Etc/GMT-14` - Etc/GMT-14\n* `Etc/GMT-2` - Etc/GMT-2\n* `Etc/GMT-3` - Etc/GMT-3\n* `Etc/GMT-4` - Etc/GMT-4\n* `Etc/GMT-5` - Etc/GMT-5\n* `Etc/GMT-6` - Etc/GMT-6\n* `Etc/GMT-7` - Etc/GMT-7\n* `Etc/GMT-8` - Etc/GMT-8\n* `Etc/GMT-9` - Etc/GMT-9\n* `Etc/GMT0` - Etc/GMT0\n* `Etc/Greenwich` - Etc/Greenwich\n* `Etc/UCT` - Etc/UCT\n* `Etc/UTC` - Etc/UTC\n* `Etc/Universal` - Etc/Universal\n* `Etc/Zulu` - Etc/Zulu\n* `Europe/Amsterdam` - Europe/Amsterdam\n* `Europe/Andorra` - Europe/Andorra\n* `Europe/Astrakhan` - Europe/Astrakhan\n* `Europe/Athens` - Europe/Athens\n* `Europe/Belfast` - Europe/Belfast\n* `Europe/Belgrade` - Europe/Belgrade\n* `Europe/Berlin` - Europe/Berlin\n* `Europe/Bratislava` - Europe/Bratislava\n* `Europe/Brussels` - Europe/Brussels\n* `Europe/Bucharest` - Europe/Bucharest\n* `Europe/Budapest` - Europe/Budapest\n* `Europe/Busingen` - Europe/Busingen\n* `Europe/Chisinau` - Europe/Chisinau\n* `Europe/Copenhagen` - Europe/Copenhagen\n* `Europe/Dublin` - Europe/Dublin\n* `Europe/Gibraltar` - Europe/Gibraltar\n* `Europe/Guernsey` - Europe/Guernsey\n* `Europe/Helsinki` - Europe/Helsinki\n* `Europe/Isle_of_Man` - Europe/Isle_of_Man\n* `Europe/Istanbul` - Europe/Istanbul\n* `Europe/Jersey` - Europe/Jersey\n* `Europe/Kaliningrad` - Europe/Kaliningrad\n* `Europe/Kiev` - Europe/Kiev\n* `Europe/Kirov` - Europe/Kirov\n* `Europe/Kyiv` - Europe/Kyiv\n* `Europe/Lisbon` - Europe/Lisbon\n* `Europe/Ljubljana` - Europe/Ljubljana\n* `Europe/London` - Europe/London\n* `Europe/Luxembourg` - Europe/Luxembourg\n* `Europe/Madrid` - Europe/Madrid\n* `Europe/Malta` - Europe/Malta\n* `Europe/Mariehamn` - Europe/Mariehamn\n* `Europe/Minsk` - Europe/Minsk\n* `Europe/Monaco` - Europe/Monaco\n* `Europe/Moscow` - Europe/Moscow\n* `Europe/Nicosia` - Europe/Nicosia\n* `Europe/Oslo` - Europe/Oslo\n* `Europe/Paris` - Europe/Paris\n* `Europe/Podgorica` - Europe/Podgorica\n* `Europe/Prague` - Europe/Prague\n* `Europe/Riga` - Europe/Riga\n* `Europe/Rome` - Europe/Rome\n* `Europe/Samara` - Europe/Samara\n* `Europe/San_Marino` - Europe/San_Marino\n* `Europe/Sarajevo` - Europe/Sarajevo\n* `Europe/Saratov` - Europe/Saratov\n* `Europe/Simferopol` - Europe/Simferopol\n* `Europe/Skopje` - Europe/Skopje\n* `Europe/Sofia` - Europe/Sofia\n* `Europe/Stockholm` - Europe/Stockholm\n* `Europe/Tallinn` - Europe/Tallinn\n* `Europe/Tirane` - Europe/Tirane\n* `Europe/Tiraspol` - Europe/Tiraspol\n* `Europe/Ulyanovsk` - Europe/Ulyanovsk\n* `Europe/Uzhgorod` - Europe/Uzhgorod\n* `Europe/Vaduz` - Europe/Vaduz\n* `Europe/Vatican` - Europe/Vatican\n* `Europe/Vienna` - Europe/Vienna\n* `Europe/Vilnius` - Europe/Vilnius\n* `Europe/Volgograd` - Europe/Volgograd\n* `Europe/Warsaw` - Europe/Warsaw\n* `Europe/Zagreb` - Europe/Zagreb\n* `Europe/Zaporozhye` - Europe/Zaporozhye\n* `Europe/Zurich` - Europe/Zurich\n* `Factory` - Factory\n* `GB` - GB\n* `GB-Eire` - GB-Eire\n* `GMT` - GMT\n* `GMT+0` - GMT+0\n* `GMT-0` - GMT-0\n* `GMT0` - GMT0\n* `Greenwich` - Greenwich\n* `HST` - HST\n* `Hongkong` - Hongkong\n* `Iceland` - Iceland\n* `Indian/Antananarivo` - Indian/Antananarivo\n* `Indian/Chagos` - Indian/Chagos\n* `Indian/Christmas` - Indian/Christmas\n* `Indian/Cocos` - Indian/Cocos\n* `Indian/Comoro` - Indian/Comoro\n* `Indian/Kerguelen` - Indian/Kerguelen\n* `Indian/Mahe` - Indian/Mahe\n* `Indian/Maldives` - Indian/Maldives\n* `Indian/Mauritius` - Indian/Mauritius\n* `Indian/Mayotte` - Indian/Mayotte\n* `Indian/Reunion` - Indian/Reunion\n* `Iran` - Iran\n* `Israel` - Israel\n* `Jamaica` - Jamaica\n* `Japan` - Japan\n* `Kwajalein` - Kwajalein\n* `Libya` - Libya\n* `MET` - MET\n* `MST` - MST\n* `MST7MDT` - MST7MDT\n* `Mexico/BajaNorte` - Mexico/BajaNorte\n* `Mexico/BajaSur` - Mexico/BajaSur\n* `Mexico/General` - Mexico/General\n* `NZ` - NZ\n* `NZ-CHAT` - NZ-CHAT\n* `Navajo` - Navajo\n* `PRC` - PRC\n* `PST8PDT` - PST8PDT\n* `Pacific/Apia` - Pacific/Apia\n* `Pacific/Auckland` - Pacific/Auckland\n* `Pacific/Bougainville` - Pacific/Bougainville\n* `Pacific/Chatham` - Pacific/Chatham\n* `Pacific/Chuuk` - Pacific/Chuuk\n* `Pacific/Easter` - Pacific/Easter\n* `Pacific/Efate` - Pacific/Efate\n* `Pacific/Enderbury` - Pacific/Enderbury\n* `Pacific/Fakaofo` - Pacific/Fakaofo\n* `Pacific/Fiji` - Pacific/Fiji\n* `Pacific/Funafuti` - Pacific/Funafuti\n* `Pacific/Galapagos` - Pacific/Galapagos\n* `Pacific/Gambier` - Pacific/Gambier\n* `Pacific/Guadalcanal` - Pacific/Guadalcanal\n* `Pacific/Guam` - Pacific/Guam\n* `Pacific/Honolulu` - Pacific/Honolulu\n* `Pacific/Johnston` - Pacific/Johnston\n* `Pacific/Kanton` - Pacific/Kanton\n* `Pacific/Kiritimati` - Pacific/Kiritimati\n* `Pacific/Kosrae` - Pacific/Kosrae\n* `Pacific/Kwajalein` - Pacific/Kwajalein\n* `Pacific/Majuro` - Pacific/Majuro\n* `Pacific/Marquesas` - Pacific/Marquesas\n* `Pacific/Midway` - Pacific/Midway\n* `Pacific/Nauru` - Pacific/Nauru\n* `Pacific/Niue` - Pacific/Niue\n* `Pacific/Norfolk` - Pacific/Norfolk\n* `Pacific/Noumea` - Pacific/Noumea\n* `Pacific/Pago_Pago` - Pacific/Pago_Pago\n* `Pacific/Palau` - Pacific/Palau\n* `Pacific/Pitcairn` - Pacific/Pitcairn\n* `Pacific/Pohnpei` - Pacific/Pohnpei\n* `Pacific/Ponape` - Pacific/Ponape\n* `Pacific/Port_Moresby` - Pacific/Port_Moresby\n* `Pacific/Rarotonga` - Pacific/Rarotonga\n* `Pacific/Saipan` - Pacific/Saipan\n* `Pacific/Samoa` - Pacific/Samoa\n* `Pacific/Tahiti` - Pacific/Tahiti\n* `Pacific/Tarawa` - Pacific/Tarawa\n* `Pacific/Tongatapu` - Pacific/Tongatapu\n* `Pacific/Truk` - Pacific/Truk\n* `Pacific/Wake` - Pacific/Wake\n* `Pacific/Wallis` - Pacific/Wallis\n* `Pacific/Yap` - Pacific/Yap\n* `Poland` - Poland\n* `Portugal` - Portugal\n* `ROC` - ROC\n* `ROK` - ROK\n* `Singapore` - Singapore\n* `Turkey` - Turkey\n* `UCT` - UCT\n* `US/Alaska` - US/Alaska\n* `US/Aleutian` - US/Aleutian\n* `US/Arizona` - US/Arizona\n* `US/Central` - US/Central\n* `US/East-Indiana` - US/East-Indiana\n* `US/Eastern` - US/Eastern\n* `US/Hawaii` - US/Hawaii\n* `US/Indiana-Starke` - US/Indiana-Starke\n* `US/Michigan` - US/Michigan\n* `US/Mountain` - US/Mountain\n* `US/Pacific` - US/Pacific\n* `US/Samoa` - US/Samoa\n* `UTC` - UTC\n* `Universal` - Universal\n* `W-SU` - W-SU\n* `WET` - WET\n* `Zulu` - Zulu",
                "x-schema-ref": "#/components/schemas/TimezoneEnum"
              }
            ],
            "title": "Zeitzone"
          },
          "language": {
            "allOf": [
              {
                "enum": [
                  "de",
                  "en"
                ],
                "type": "string",
                "description": "* `de` - Deutsch\n* `en` - English",
                "x-schema-ref": "#/components/schemas/Language1afEnum"
              }
            ],
            "title": "Sprache",
            "description": "Bevorzugte Sprache für die Benutzeroberfläche\n\n* `de` - Deutsch\n* `en` - English"
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedUserProfileWrite"
      }
    },
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403"
    ],
    "requiredScopes": [
      "profile:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_asset_create",
    "method": "POST",
    "path": "/api/v1/organizations/{org_id}/assets",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": true,
    "requestContentTypes": [
      "multipart/form-data",
      "application/x-www-form-urlencoded"
    ],
    "requestSchemas": {
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "type": {
            "enum": [
              "image"
            ],
            "type": "string",
            "description": "* `image` - Image",
            "x-schema-ref": "#/components/schemas/TypeEnum"
          },
          "file": {
            "type": "string",
            "format": "uri"
          },
          "label": {
            "type": "string",
            "maxLength": 255
          }
        },
        "required": [
          "file",
          "type"
        ],
        "x-schema-ref": "#/components/schemas/OrganizationAssetUpload"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "type": {
            "enum": [
              "image"
            ],
            "type": "string",
            "description": "* `image` - Image",
            "x-schema-ref": "#/components/schemas/TypeEnum"
          },
          "file": {
            "type": "string",
            "format": "uri"
          },
          "label": {
            "type": "string",
            "maxLength": 255
          }
        },
        "required": [
          "file",
          "type"
        ],
        "x-schema-ref": "#/components/schemas/OrganizationAssetUpload"
      }
    },
    "responseStatuses": [
      "201",
      "400",
      "403",
      "409"
    ],
    "requiredScopes": [],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_asset_delete",
    "method": "DELETE",
    "path": "/api/v1/organizations/{org_id}/assets/{asset_id}",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "asset_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      },
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "204",
      "401",
      "403",
      "404",
      "409"
    ],
    "requiredScopes": [],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_asset_list",
    "method": "GET",
    "path": "/api/v1/organizations/{org_id}/assets",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200"
    ],
    "requiredScopes": [],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_asset_retrieve",
    "method": "GET",
    "path": "/api/v1/organizations/{org_id}/assets/{asset_id}",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "asset_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      },
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_asset_update",
    "method": "PATCH",
    "path": "/api/v1/organizations/{org_id}/assets/{asset_id}",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "asset_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      },
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "label": {
            "type": "string",
            "nullable": true,
            "maxLength": 255
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedOrganizationAssetRename"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "label": {
            "type": "string",
            "nullable": true,
            "maxLength": 255
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedOrganizationAssetRename"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "label": {
            "type": "string",
            "nullable": true,
            "maxLength": 255
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedOrganizationAssetRename"
      }
    },
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_discourse_disable",
    "method": "POST",
    "path": "/api/v1/organizations/{org_id}/discourse/disable",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "organizations:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_discourse_enable",
    "method": "POST",
    "path": "/api/v1/organizations/{org_id}/discourse/enable",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "organizations:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_discourse_sync",
    "method": "POST",
    "path": "/api/v1/organizations/{org_id}/discourse/sync",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "organizations:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_invitation_code_regenerate",
    "method": "POST",
    "path": "/api/v1/organizations/{org_id}/invitation-code",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "organizations:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_invitation_remove",
    "method": "DELETE",
    "path": "/api/v1/organizations/{org_id}/invitations/{invitation_id}",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "invitation_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      },
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "204",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "organizations:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_invitations_create",
    "method": "POST",
    "path": "/api/v1/organizations/{org_id}/invitations",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": true,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "emails": {
            "type": "string"
          }
        },
        "required": [
          "emails"
        ],
        "x-schema-ref": "#/components/schemas/InvitationBatchCreate"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "emails": {
            "type": "string"
          }
        },
        "required": [
          "emails"
        ],
        "x-schema-ref": "#/components/schemas/InvitationBatchCreate"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "emails": {
            "type": "string"
          }
        },
        "required": [
          "emails"
        ],
        "x-schema-ref": "#/components/schemas/InvitationBatchCreate"
      }
    },
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "organizations:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_invitations_list",
    "method": "GET",
    "path": "/api/v1/organizations/{org_id}/invitations",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "organizations:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_join_by_code",
    "method": "POST",
    "path": "/api/v1/organizations/join",
    "tags": [
      "organizations"
    ],
    "parameters": [],
    "requestBodyRequired": true,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "code": {
            "type": "string"
          }
        },
        "required": [
          "code"
        ],
        "x-schema-ref": "#/components/schemas/OrganizationJoin"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "code": {
            "type": "string"
          }
        },
        "required": [
          "code"
        ],
        "x-schema-ref": "#/components/schemas/OrganizationJoin"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "code": {
            "type": "string"
          }
        },
        "required": [
          "code"
        ],
        "x-schema-ref": "#/components/schemas/OrganizationJoin"
      }
    },
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403"
    ],
    "requiredScopes": [
      "organizations:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_membership_favorite_clear",
    "method": "DELETE",
    "path": "/api/v1/organizations/{org_id}/membership/favorite",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "organizations:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_membership_favorite_set",
    "method": "PUT",
    "path": "/api/v1/organizations/{org_id}/membership/favorite",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "organizations:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_membership_leave",
    "method": "DELETE",
    "path": "/api/v1/organizations/{org_id}/membership",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "204",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "organizations:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_membership_remove",
    "method": "DELETE",
    "path": "/api/v1/organizations/{org_id}/memberships/{membership_id}",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "membership_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      },
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "204",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "organizations:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_membership_update",
    "method": "PATCH",
    "path": "/api/v1/organizations/{org_id}/memberships/{membership_id}",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "membership_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      },
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "role": {
            "enum": [
              "O",
              "M",
              "U"
            ],
            "type": "string",
            "description": "* `O` - Admin\n* `M` - Manager\n* `U` - Benutzer",
            "x-schema-ref": "#/components/schemas/RoleEnum"
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedMembershipWrite"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "role": {
            "enum": [
              "O",
              "M",
              "U"
            ],
            "type": "string",
            "description": "* `O` - Admin\n* `M` - Manager\n* `U` - Benutzer",
            "x-schema-ref": "#/components/schemas/RoleEnum"
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedMembershipWrite"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "role": {
            "enum": [
              "O",
              "M",
              "U"
            ],
            "type": "string",
            "description": "* `O` - Admin\n* `M` - Manager\n* `U` - Benutzer",
            "x-schema-ref": "#/components/schemas/RoleEnum"
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedMembershipWrite"
      }
    },
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "organizations:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organization_memberships_list",
    "method": "GET",
    "path": "/api/v1/organizations/{org_id}/memberships",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      },
      {
        "name": "search",
        "in": "query",
        "required": false,
        "description": "Filter memberships by username, first name, or last name.",
        "type": "string"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "organizations:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organizations_create",
    "method": "POST",
    "path": "/api/v1/organizations",
    "tags": [
      "organizations"
    ],
    "parameters": [],
    "requestBodyRequired": true,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "maxLength": 100
          },
          "teaser_text": {
            "type": "string",
            "nullable": true,
            "maxLength": 50
          },
          "description": {
            "type": "string",
            "nullable": true,
            "maxLength": 1024
          }
        },
        "required": [
          "name"
        ],
        "x-schema-ref": "#/components/schemas/OrganizationCreate"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "maxLength": 100
          },
          "teaser_text": {
            "type": "string",
            "nullable": true,
            "maxLength": 50
          },
          "description": {
            "type": "string",
            "nullable": true,
            "maxLength": 1024
          }
        },
        "required": [
          "name"
        ],
        "x-schema-ref": "#/components/schemas/OrganizationCreate"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "maxLength": 100
          },
          "teaser_text": {
            "type": "string",
            "nullable": true,
            "maxLength": 50
          },
          "description": {
            "type": "string",
            "nullable": true,
            "maxLength": 1024
          }
        },
        "required": [
          "name"
        ],
        "x-schema-ref": "#/components/schemas/OrganizationCreate"
      }
    },
    "responseStatuses": [
      "201",
      "400",
      "401",
      "403",
      "500"
    ],
    "requiredScopes": [
      "organizations:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organizations_delete",
    "method": "DELETE",
    "path": "/api/v1/organizations/{org_id}",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "204",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "organizations:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organizations_list",
    "method": "GET",
    "path": "/api/v1/organizations",
    "tags": [
      "organizations"
    ],
    "parameters": [],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403"
    ],
    "requiredScopes": [
      "organizations:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organizations_retrieve",
    "method": "GET",
    "path": "/api/v1/organizations/{org_id}",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "organizations:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "organizations_update",
    "method": "PATCH",
    "path": "/api/v1/organizations/{org_id}",
    "tags": [
      "organizations"
    ],
    "parameters": [
      {
        "name": "org_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "maxLength": 100
          },
          "teaser_text": {
            "type": "string",
            "nullable": true,
            "maxLength": 50
          },
          "description": {
            "type": "string",
            "nullable": true,
            "maxLength": 1024
          },
          "language": {
            "enum": [
              "de",
              "en"
            ],
            "type": "string",
            "description": "* `de` - de\n* `en` - en",
            "x-schema-ref": "#/components/schemas/OrganizationWriteLanguageEnum"
          },
          "join_policy": {
            "enum": [
              "INVITATION_ONLY",
              "FREE_TO_JOIN"
            ],
            "type": "string",
            "description": "* `INVITATION_ONLY` - INVITATION_ONLY\n* `FREE_TO_JOIN` - FREE_TO_JOIN",
            "x-schema-ref": "#/components/schemas/OrganizationWriteJoinPolicyEnum"
          },
          "default_calendar_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "logo_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "icon_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "calendar_background_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedOrganizationWrite"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "maxLength": 100
          },
          "teaser_text": {
            "type": "string",
            "nullable": true,
            "maxLength": 50
          },
          "description": {
            "type": "string",
            "nullable": true,
            "maxLength": 1024
          },
          "language": {
            "enum": [
              "de",
              "en"
            ],
            "type": "string",
            "description": "* `de` - de\n* `en` - en",
            "x-schema-ref": "#/components/schemas/OrganizationWriteLanguageEnum"
          },
          "join_policy": {
            "enum": [
              "INVITATION_ONLY",
              "FREE_TO_JOIN"
            ],
            "type": "string",
            "description": "* `INVITATION_ONLY` - INVITATION_ONLY\n* `FREE_TO_JOIN` - FREE_TO_JOIN",
            "x-schema-ref": "#/components/schemas/OrganizationWriteJoinPolicyEnum"
          },
          "default_calendar_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "logo_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "icon_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "calendar_background_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedOrganizationWrite"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "maxLength": 100
          },
          "teaser_text": {
            "type": "string",
            "nullable": true,
            "maxLength": 50
          },
          "description": {
            "type": "string",
            "nullable": true,
            "maxLength": 1024
          },
          "language": {
            "enum": [
              "de",
              "en"
            ],
            "type": "string",
            "description": "* `de` - de\n* `en` - en",
            "x-schema-ref": "#/components/schemas/OrganizationWriteLanguageEnum"
          },
          "join_policy": {
            "enum": [
              "INVITATION_ONLY",
              "FREE_TO_JOIN"
            ],
            "type": "string",
            "description": "* `INVITATION_ONLY` - INVITATION_ONLY\n* `FREE_TO_JOIN` - FREE_TO_JOIN",
            "x-schema-ref": "#/components/schemas/OrganizationWriteJoinPolicyEnum"
          },
          "default_calendar_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "logo_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "icon_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "calendar_background_asset_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedOrganizationWrite"
      }
    },
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404",
      "500"
    ],
    "requiredScopes": [
      "organizations:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "slot_registrations_manager_action",
    "method": "POST",
    "path": "/api/v1/slots/{slot_id}/registrations/{registration_id}/{action}",
    "tags": [
      "slots"
    ],
    "parameters": [
      {
        "name": "action",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "registration_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      },
      {
        "name": "slot_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "slots:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "slot_registrations_register",
    "method": "POST",
    "path": "/api/v1/slots/{slot_id}/registrations/register",
    "tags": [
      "slots"
    ],
    "parameters": [
      {
        "name": "slot_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "201",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "slots:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "slot_registrations_waitlist",
    "method": "POST",
    "path": "/api/v1/slots/{slot_id}/registrations/waitlist",
    "tags": [
      "slots"
    ],
    "parameters": [
      {
        "name": "slot_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "201",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "slots:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "slot_registrations_withdraw",
    "method": "POST",
    "path": "/api/v1/slots/{slot_id}/registrations/withdraw",
    "tags": [
      "slots"
    ],
    "parameters": [
      {
        "name": "slot_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "204",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "slots:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "slots_delete",
    "method": "DELETE",
    "path": "/api/v1/slots/{slot_id}",
    "tags": [
      "slots"
    ],
    "parameters": [
      {
        "name": "slot_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "204",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "slots:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  },
  {
    "operationId": "slots_retrieve",
    "method": "GET",
    "path": "/api/v1/slots/{slot_id}",
    "tags": [
      "slots"
    ],
    "parameters": [
      {
        "name": "slot_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [],
    "requestSchemas": {},
    "responseStatuses": [
      "200",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "slots:read"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": true
  },
  {
    "operationId": "slots_update",
    "method": "PATCH",
    "path": "/api/v1/slots/{slot_id}",
    "tags": [
      "slots"
    ],
    "parameters": [
      {
        "name": "slot_id",
        "in": "path",
        "required": true,
        "type": "string",
        "format": "uuid"
      }
    ],
    "requestBodyRequired": false,
    "requestContentTypes": [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data"
    ],
    "requestSchemas": {
      "application/json": {
        "type": "object",
        "properties": {
          "resource": {
            "type": "string",
            "title": "Name des Zeitslots",
            "description": "Z.B. Name des Resource oder Session",
            "maxLength": 255
          },
          "start": {
            "type": "string",
            "format": "date-time",
            "description": "ISO 8601 date-time. Supported inputs: timezone-naive values (interpreted in the authenticated user's timezone, fallback UTC), UTC values with a trailing 'Z', or values with an explicit UTC offset (for example +01:00 or -05:00)."
          },
          "end": {
            "type": "string",
            "format": "date-time",
            "description": "ISO 8601 date-time. Supported inputs: timezone-naive values (interpreted in the authenticated user's timezone, fallback UTC), UTC values with a trailing 'Z', or values with an explicit UTC offset (for example +01:00 or -05:00)."
          },
          "max_attendees": {
            "type": "integer",
            "maximum": 32767,
            "minimum": 0,
            "nullable": true,
            "title": "Maximale Teilnehmer",
            "description": "Keine Obergrenze gewünscht? Feld leer lassen"
          },
          "allow_multiple_slots": {
            "type": "boolean",
            "nullable": true,
            "title": "Mehrfachteilnahmen erlauben",
            "description": "Teilnehmer können mehrere Zeitslots reservieren"
          },
          "allow_multiple_requests": {
            "type": "boolean",
            "nullable": true,
            "title": "Mehrfachanfragen erlauben",
            "description": "Teilnehmer können mehrere Anfragen parallel stellen"
          },
          "confirmation_type": {
            "allOf": [
              {
                "enum": [
                  "A",
                  "C"
                ],
                "type": "string",
                "description": "* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager",
                "x-schema-ref": "#/components/schemas/ConfirmationTypeEnum"
              }
            ],
            "title": "Art der Bestätigung",
            "description": "Wie werden Anfragen bestätigt\n\n* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager"
          },
          "show_attendees": {
            "type": "boolean",
            "title": "Teilnehmer im Event anzeigen",
            "description": "Bestätigte Teilnehmer im Event-Detail anzeigen."
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedEventSlotWrite"
      },
      "application/x-www-form-urlencoded": {
        "type": "object",
        "properties": {
          "resource": {
            "type": "string",
            "title": "Name des Zeitslots",
            "description": "Z.B. Name des Resource oder Session",
            "maxLength": 255
          },
          "start": {
            "type": "string",
            "format": "date-time",
            "description": "ISO 8601 date-time. Supported inputs: timezone-naive values (interpreted in the authenticated user's timezone, fallback UTC), UTC values with a trailing 'Z', or values with an explicit UTC offset (for example +01:00 or -05:00)."
          },
          "end": {
            "type": "string",
            "format": "date-time",
            "description": "ISO 8601 date-time. Supported inputs: timezone-naive values (interpreted in the authenticated user's timezone, fallback UTC), UTC values with a trailing 'Z', or values with an explicit UTC offset (for example +01:00 or -05:00)."
          },
          "max_attendees": {
            "type": "integer",
            "maximum": 32767,
            "minimum": 0,
            "nullable": true,
            "title": "Maximale Teilnehmer",
            "description": "Keine Obergrenze gewünscht? Feld leer lassen"
          },
          "allow_multiple_slots": {
            "type": "boolean",
            "nullable": true,
            "title": "Mehrfachteilnahmen erlauben",
            "description": "Teilnehmer können mehrere Zeitslots reservieren"
          },
          "allow_multiple_requests": {
            "type": "boolean",
            "nullable": true,
            "title": "Mehrfachanfragen erlauben",
            "description": "Teilnehmer können mehrere Anfragen parallel stellen"
          },
          "confirmation_type": {
            "allOf": [
              {
                "enum": [
                  "A",
                  "C"
                ],
                "type": "string",
                "description": "* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager",
                "x-schema-ref": "#/components/schemas/ConfirmationTypeEnum"
              }
            ],
            "title": "Art der Bestätigung",
            "description": "Wie werden Anfragen bestätigt\n\n* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager"
          },
          "show_attendees": {
            "type": "boolean",
            "title": "Teilnehmer im Event anzeigen",
            "description": "Bestätigte Teilnehmer im Event-Detail anzeigen."
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedEventSlotWrite"
      },
      "multipart/form-data": {
        "type": "object",
        "properties": {
          "resource": {
            "type": "string",
            "title": "Name des Zeitslots",
            "description": "Z.B. Name des Resource oder Session",
            "maxLength": 255
          },
          "start": {
            "type": "string",
            "format": "date-time",
            "description": "ISO 8601 date-time. Supported inputs: timezone-naive values (interpreted in the authenticated user's timezone, fallback UTC), UTC values with a trailing 'Z', or values with an explicit UTC offset (for example +01:00 or -05:00)."
          },
          "end": {
            "type": "string",
            "format": "date-time",
            "description": "ISO 8601 date-time. Supported inputs: timezone-naive values (interpreted in the authenticated user's timezone, fallback UTC), UTC values with a trailing 'Z', or values with an explicit UTC offset (for example +01:00 or -05:00)."
          },
          "max_attendees": {
            "type": "integer",
            "maximum": 32767,
            "minimum": 0,
            "nullable": true,
            "title": "Maximale Teilnehmer",
            "description": "Keine Obergrenze gewünscht? Feld leer lassen"
          },
          "allow_multiple_slots": {
            "type": "boolean",
            "nullable": true,
            "title": "Mehrfachteilnahmen erlauben",
            "description": "Teilnehmer können mehrere Zeitslots reservieren"
          },
          "allow_multiple_requests": {
            "type": "boolean",
            "nullable": true,
            "title": "Mehrfachanfragen erlauben",
            "description": "Teilnehmer können mehrere Anfragen parallel stellen"
          },
          "confirmation_type": {
            "allOf": [
              {
                "enum": [
                  "A",
                  "C"
                ],
                "type": "string",
                "description": "* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager",
                "x-schema-ref": "#/components/schemas/ConfirmationTypeEnum"
              }
            ],
            "title": "Art der Bestätigung",
            "description": "Wie werden Anfragen bestätigt\n\n* `A` - Automatische Bestätigung\n* `C` - Bestätigung durch Event Manager"
          },
          "show_attendees": {
            "type": "boolean",
            "title": "Teilnehmer im Event anzeigen",
            "description": "Bestätigte Teilnehmer im Event-Detail anzeigen."
          }
        },
        "x-schema-ref": "#/components/schemas/PatchedEventSlotWrite"
      }
    },
    "responseStatuses": [
      "200",
      "400",
      "401",
      "403",
      "404"
    ],
    "requiredScopes": [
      "slots:write"
    ],
    "conditionalScopes": {},
    "anonymousAllowed": false
  }
] as const satisfies readonly ApiOperation[];

export const API_OPERATION_BY_ID: ReadonlyMap<string, ApiOperation> = new Map(
  API_OPERATIONS.map((operation) => [operation.operationId, operation]),
);
