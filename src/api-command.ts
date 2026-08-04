import { basename, extname } from "node:path";
import { readFile } from "node:fs/promises";

import type { ApiOperation } from "./generated/operations.js";
import { CliError, EXIT_CODES } from "./errors.js";
import { VooshApiError } from "./client.js";

export interface NamedValue {
  name: string;
  value: string;
}

export interface NamedFile {
  name: string;
  path: string;
}

export interface ApiOperationRequest {
  baseUrl: string;
  token?: string;
  operation: ApiOperation;
  pathValues?: NamedValue[];
  queryValues?: NamedValue[];
  headerValues?: NamedValue[];
  jsonBody?: unknown;
  formValues?: NamedValue[];
  files?: NamedFile[];
  fetch?: typeof fetch;
}

export interface ApiOperationResponse {
  status: number;
  data: unknown;
}

export async function executeApiOperation(request: ApiOperationRequest): Promise<ApiOperationResponse> {
  const fetchImplementation = request.fetch ?? globalThis.fetch;
  if (!fetchImplementation) {
    throw new Error("A fetch implementation is required to call the voo.sh API.");
  }

  const path = interpolatePath(request.operation, request.pathValues ?? []);
  const url = new URL(path, `${request.baseUrl.replace(/\/+$/, "")}/`);
  for (const { name, value } of request.queryValues ?? []) {
    url.searchParams.append(name, value);
  }

  const headers = new Headers({ Accept: "application/json" });
  if (request.token) {
    headers.set("Authorization", `Bearer ${request.token}`);
  }
  for (const { name, value } of request.headerValues ?? []) {
    headers.set(name, value);
  }

  const body = await createRequestBody(request, headers);
  const apiRequest = new Request(url, {
    method: request.operation.method,
    headers,
    body,
  });
  const response = await fetchImplementation(apiRequest);
  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    throw new VooshApiError({
      status: response.status,
      body: responseBody,
      requestId: response.headers.get("X-Request-ID") ?? undefined,
    });
  }

  return {
    status: response.status,
    data: responseBody ?? { code: "no_content", status: response.status },
  };
}

export function parseNamedValue(value: string, optionName: string): NamedValue {
  const separator = value.indexOf("=");
  if (separator < 1) {
    throw usageError(`${optionName} expects NAME=VALUE.`);
  }
  return {
    name: value.slice(0, separator).trim(),
    value: value.slice(separator + 1),
  };
}

export function parseNamedFile(value: string): NamedFile {
  const parsed = parseNamedValue(value, "--file");
  if (!parsed.value.trim()) {
    throw usageError("--file expects NAME=PATH with a non-empty path.");
  }
  return { name: parsed.name, path: parsed.value };
}

export function parseJson(value: string, source: string): unknown {
  try {
    return JSON.parse(value);
  } catch (error) {
    throw new CliError(`${source} must contain valid JSON.`, {
      code: "invalid_json_body",
      exitCode: EXIT_CODES.usageOrConfigError,
      details: { source, cause: error instanceof Error ? error.message : String(error) },
    });
  }
}

export async function readJsonFile(path: string): Promise<unknown> {
  let contents: string;
  try {
    contents = await readFile(path, "utf8");
  } catch (error) {
    throw new CliError(`Could not read JSON body file: ${path}`, {
      code: "body_file_unreadable",
      exitCode: EXIT_CODES.usageOrConfigError,
      details: { path, cause: error instanceof Error ? error.message : String(error) },
    });
  }
  return parseJson(contents, path);
}

function interpolatePath(operation: ApiOperation, values: NamedValue[]): string {
  const byName = new Map(values.map(({ name, value }) => [name, value]));
  return operation.path.replace(/\{([^}]+)\}/g, (_match, name: string) => {
    const value = byName.get(name);
    if (value === undefined || value === "") {
      throw new CliError(`Missing path parameter: ${name}`, {
        code: "missing_path_parameter",
        exitCode: EXIT_CODES.usageOrConfigError,
        details: { operation_id: operation.operationId, parameter: name },
      });
    }
    return encodeURIComponent(value);
  });
}

async function createRequestBody(request: ApiOperationRequest, headers: Headers): Promise<BodyInit | undefined> {
  const hasMultipart = Boolean(request.formValues?.length || request.files?.length);
  if (request.jsonBody !== undefined && hasMultipart) {
    throw usageError("Use either a JSON body or multipart --form/--file values, not both.");
  }

  if (hasMultipart) {
    const form = new FormData();
    for (const { name, value } of request.formValues ?? []) {
      form.append(name, value);
    }
    for (const file of request.files ?? []) {
      let contents: Buffer;
      try {
        contents = await readFile(file.path);
      } catch (error) {
        throw new CliError(`Could not read upload file: ${file.path}`, {
          code: "upload_file_unreadable",
          exitCode: EXIT_CODES.usageOrConfigError,
          details: { path: file.path, cause: error instanceof Error ? error.message : String(error) },
        });
      }
      form.append(file.name, new Blob([contents], { type: contentTypeFor(file.path) }), basename(file.path));
    }
    return form;
  }

  if (request.jsonBody !== undefined) {
    headers.set("Content-Type", "application/json");
    return JSON.stringify(request.jsonBody);
  }

  return undefined;
}

async function parseResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204 || response.status === 205) return undefined;
  const contentType = response.headers.get("Content-Type") ?? "";
  if (contentType.includes("json")) {
    return response.json().catch(() => undefined);
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length === 0) return undefined;
  if (contentType.startsWith("text/") || contentType.includes("xml") || contentType.includes("calendar")) {
    return new TextDecoder().decode(bytes);
  }
  return {
    content_type: contentType || "application/octet-stream",
    encoding: "base64",
    data: Buffer.from(bytes).toString("base64"),
  };
}

function contentTypeFor(path: string): string {
  const extension = extname(path).toLowerCase();
  return {
    ".gif": "image/gif",
    ".ics": "text/calendar",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  }[extension] ?? "application/octet-stream";
}

function usageError(message: string): CliError {
  return new CliError(message, {
    code: "usage_error",
    exitCode: EXIT_CODES.usageOrConfigError,
  });
}
