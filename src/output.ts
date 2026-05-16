import { VooshApiError } from "./client.js";

import { CliError, EXIT_CODES, type ExitCode } from "./errors.js";

export interface IoStreams {
  stdout: Pick<NodeJS.WriteStream, "write">;
  stderr: Pick<NodeJS.WriteStream, "write">;
}

export interface JsonErrorShape {
  error: {
    code: string;
    message: string;
    status?: number;
    requestId?: string;
    details?: unknown;
  };
}

export function writeJson(io: IoStreams, value: unknown): void {
  io.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

export function writeHuman(io: IoStreams, value: unknown): void {
  io.stdout.write(`${formatHuman(value)}\n`);
}

export function writeError(io: IoStreams, error: unknown, json: boolean): ExitCode {
  const normalized = normalizeError(error);
  if (json) {
    io.stderr.write(`${JSON.stringify({ error: normalized.error }, null, 2)}\n`);
  } else {
    const status = normalized.error.status ? ` (${normalized.error.status})` : "";
    const requestId = normalized.error.requestId ? ` [request_id=${normalized.error.requestId}]` : "";
    io.stderr.write(`Error${status}: ${normalized.error.message} [code=${normalized.error.code}]${requestId}\n`);
  }
  return normalized.exitCode;
}

export function renderResult(io: IoStreams, value: unknown, options: { json: boolean; quiet: boolean }): void {
  if (options.quiet && !options.json) {
    return;
  }
  if (options.json) {
    writeJson(io, value);
  } else {
    writeHuman(io, value);
  }
}

function normalizeError(error: unknown): JsonErrorShape & { exitCode: ExitCode } {
  if (error instanceof VooshApiError) {
    return {
      exitCode: EXIT_CODES.apiOrRuntimeError,
      error: {
        code: error.code ?? "api_error",
        message: error.detail ?? error.message,
        status: error.status,
        requestId: error.requestId,
        details: error.body,
      },
    };
  }
  if (error instanceof CliError) {
    return {
      exitCode: error.exitCode,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    };
  }
  if (error instanceof Error) {
    return {
      exitCode: EXIT_CODES.apiOrRuntimeError,
      error: {
        code: "runtime_error",
        message: error.message,
      },
    };
  }
  return {
    exitCode: EXIT_CODES.apiOrRuntimeError,
    error: {
      code: "runtime_error",
      message: "Unknown runtime error.",
      details: error,
    },
  };
}

function formatHuman(value: unknown): string {
  if (value === null || value === undefined) {
    return "OK";
  }
  if (Array.isArray(value)) {
    return value.map((item) => formatHuman(item)).join("\n");
  }
  if (typeof value !== "object") {
    return String(value);
  }

  const record = value as Record<string, unknown>;
  if (Array.isArray(record.results)) {
    if (record.results.length === 0) {
      return "No results.";
    }
    return record.results.map((item) => summarizeRecord(item)).join("\n");
  }
  return summarizeRecord(record);
}

function summarizeRecord(value: unknown): string {
  if (!value || typeof value !== "object") {
    return String(value);
  }
  const record = value as Record<string, unknown>;
  const preferred = ["username", "email", "calendar_id", "title", "name", "id"];
  const parts: string[] = [];
  for (const key of preferred) {
    if (record[key] !== undefined && record[key] !== null) {
      parts.push(`${key}: ${String(record[key])}`);
    }
  }
  if (parts.length > 0) {
    return parts.join(" | ");
  }
  return JSON.stringify(record);
}
