export const EXIT_CODES = {
  success: 0,
  apiOrRuntimeError: 1,
  usageOrConfigError: 2,
} as const;

export type ExitCode = (typeof EXIT_CODES)[keyof typeof EXIT_CODES];

export class CliError extends Error {
  readonly code: string;
  readonly exitCode: ExitCode;
  readonly details: unknown;

  constructor(message: string, options: { code?: string; exitCode?: ExitCode; details?: unknown } = {}) {
    super(message);
    this.name = "CliError";
    this.code = options.code ?? "cli_error";
    this.exitCode = options.exitCode ?? EXIT_CODES.apiOrRuntimeError;
    this.details = options.details;
  }
}
