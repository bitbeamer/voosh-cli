import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { EXIT_CODES, CliError } from "./errors.js";

export interface CliEnv {
  VOOSH_API_TOKEN?: string;
  VOOSH_API_URL?: string;
  VOOSH_CONFIG_PATH?: string;
  XDG_CONFIG_HOME?: string;
  APPDATA?: string;
  HOME?: string;
  USERPROFILE?: string;
  [key: string]: string | undefined;
}

export interface GlobalOptions {
  json?: boolean;
  quiet?: boolean;
  apiUrl?: string;
  profile?: string;
  timezone?: string;
  color?: boolean;
}

export interface CliConfig {
  apiUrl: string;
  apiUrlSource: ConfigValueSource;
  token?: string;
  tokenSource: ConfigValueSource | "none";
  profile: string;
  configPath: string;
  json: boolean;
  quiet: boolean;
  color: boolean;
}

export interface StoredProfile {
  apiUrl?: string;
  token?: string;
}

export interface StoredConfig {
  profiles: Record<string, StoredProfile>;
}

export type ConfigValueSource = "flag" | "env" | "profile" | "default";

const DEFAULT_API_URL = "https://voo.sh";
const DEFAULT_PROFILE = "default";

export function resolveConfig(options: GlobalOptions, env: CliEnv): CliConfig {
  const profile = normalizeProfileName(options.profile);
  const configPath = getConfigPath(env);
  const stored = loadConfig(configPath);
  const storedProfile = stored.profiles[profile] ?? {};
  const apiUrlResolution = resolveApiUrl(options, env, storedProfile);
  const tokenResolution = resolveToken(env, storedProfile);

  return {
    apiUrl: apiUrlResolution.value,
    apiUrlSource: apiUrlResolution.source,
    token: tokenResolution.value,
    tokenSource: tokenResolution.source,
    profile,
    configPath,
    json: Boolean(options.json),
    quiet: Boolean(options.quiet),
    color: options.color !== false,
  };
}

export function requireToken(config: CliConfig): string {
  if (!config.token) {
    throw new CliError("No API token configured. Set VOOSH_API_TOKEN or run `voosh auth login --token <token>`.", {
      code: "missing_api_token",
      exitCode: EXIT_CODES.usageOrConfigError,
    });
  }
  return config.token;
}

export function getConfigPath(env: CliEnv): string {
  if (env.VOOSH_CONFIG_PATH) {
    return env.VOOSH_CONFIG_PATH;
  }

  // Deterministic platform-style config path used by the Node CLI:
  // - Windows-style env: %APPDATA%/voosh/config.json
  // - XDG env: $XDG_CONFIG_HOME/voosh/config.json
  // - POSIX fallback: $HOME/.config/voosh/config.json
  // - Test/sandbox fallback when no home env is supplied: ./.voosh/config.json
  if (env.APPDATA) {
    return join(env.APPDATA, "voosh", "config.json");
  }
  if (env.XDG_CONFIG_HOME) {
    return join(env.XDG_CONFIG_HOME, "voosh", "config.json");
  }
  const home = env.HOME ?? env.USERPROFILE;
  if (home) {
    return join(home, ".config", "voosh", "config.json");
  }
  return join(process.cwd(), ".voosh", "config.json");
}

export function loadConfig(configPath: string): StoredConfig {
  if (!existsSync(configPath)) {
    return emptyConfig();
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(configPath, "utf8"));
  } catch (error) {
    throw new CliError(`Could not read config file at ${configPath}.`, {
      code: "invalid_config_file",
      exitCode: EXIT_CODES.usageOrConfigError,
      details: error instanceof Error ? error.message : error,
    });
  }

  if (!isRecord(parsed)) {
    throw invalidConfigShape(configPath);
  }
  const profilesValue = parsed.profiles;
  if (profilesValue === undefined) {
    return emptyConfig();
  }
  if (!isRecord(profilesValue)) {
    throw invalidConfigShape(configPath);
  }

  const profiles: Record<string, StoredProfile> = {};
  for (const [name, rawProfile] of Object.entries(profilesValue)) {
    if (!isRecord(rawProfile)) {
      throw invalidConfigShape(configPath);
    }
    const profile: StoredProfile = {};
    if (rawProfile.apiUrl !== undefined) {
      if (typeof rawProfile.apiUrl !== "string") {
        throw invalidConfigShape(configPath);
      }
      profile.apiUrl = stripTrailingSlash(rawProfile.apiUrl);
    }
    if (rawProfile.token !== undefined) {
      if (typeof rawProfile.token !== "string") {
        throw invalidConfigShape(configPath);
      }
      profile.token = rawProfile.token;
    }
    profiles[name] = profile;
  }

  return { profiles };
}

export function saveConfig(configPath: string, config: StoredConfig): void {
  mkdirSync(dirname(configPath), { recursive: true });
  writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, { mode: 0o600 });
}

export function updateProfile(configPath: string, profileName: string, update: (profile: StoredProfile) => void): StoredConfig {
  const config = loadConfig(configPath);
  const profile = { ...(config.profiles[profileName] ?? {}) };
  update(profile);
  config.profiles[profileName] = profile;
  saveConfig(configPath, config);
  return config;
}

export function normalizeBaseUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new CliError("API URL must not be empty.", {
      code: "invalid_api_url",
      exitCode: EXIT_CODES.usageOrConfigError,
    });
  }

  try {
    const url = new URL(trimmed);
    if (!url.protocol || !url.hostname) {
      throw new Error("missing protocol or hostname");
    }
    return stripTrailingSlash(url.toString());
  } catch {
    throw new CliError("API URL must be an absolute URL.", {
      code: "invalid_api_url",
      exitCode: EXIT_CODES.usageOrConfigError,
    });
  }
}

export function previewToken(token: string | undefined): string | null {
  if (!token) {
    return null;
  }
  if (token.length <= 8) {
    return `${token.slice(0, 2)}…${token.slice(-2)}`;
  }
  return `${token.slice(0, 4)}…${token.slice(-4)}`;
}

function resolveApiUrl(options: GlobalOptions, env: CliEnv, profile: StoredProfile): { value: string; source: ConfigValueSource } {
  if (options.apiUrl) {
    return { value: normalizeBaseUrl(options.apiUrl), source: "flag" };
  }
  if (env.VOOSH_API_URL) {
    return { value: normalizeBaseUrl(env.VOOSH_API_URL), source: "env" };
  }
  if (profile.apiUrl) {
    return { value: normalizeBaseUrl(profile.apiUrl), source: "profile" };
  }
  return { value: DEFAULT_API_URL, source: "default" };
}

function resolveToken(env: CliEnv, profile: StoredProfile): { value?: string; source: ConfigValueSource | "none" } {
  if (env.VOOSH_API_TOKEN) {
    return { value: env.VOOSH_API_TOKEN, source: "env" };
  }
  if (profile.token) {
    return { value: profile.token, source: "profile" };
  }
  return { source: "none" };
}

function normalizeProfileName(value: string | undefined): string {
  const profile = (value ?? DEFAULT_PROFILE).trim();
  if (!profile) {
    throw new CliError("Profile name must not be empty.", {
      code: "invalid_profile",
      exitCode: EXIT_CODES.usageOrConfigError,
    });
  }
  return profile;
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function emptyConfig(): StoredConfig {
  return { profiles: {} };
}

function invalidConfigShape(configPath: string): CliError {
  return new CliError(`Invalid config file shape at ${configPath}.`, {
    code: "invalid_config_file",
    exitCode: EXIT_CODES.usageOrConfigError,
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
