import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { parse } from "yaml";

const repoRoot = resolve(import.meta.dirname, "..");
const schemaPath = resolve(repoRoot, "openapi/openapi.yaml");
const outputPath = resolve(repoRoot, "src/generated/operations.ts");
const document = parse(await readFile(schemaPath, "utf8"));
const methods = ["get", "put", "post", "delete", "patch", "head", "options", "trace"];
const operations = [];

for (const [path, pathItem] of Object.entries(document.paths ?? {})) {
  for (const method of methods) {
    const operation = pathItem?.[method];
    if (!operation?.operationId) continue;

    const security = operation.security ?? document.security ?? [];
    const parameters = [...(pathItem.parameters ?? []), ...(operation.parameters ?? [])]
      .filter((parameter) => parameter && typeof parameter === "object" && !parameter.$ref)
      .map((parameter) => ({
        name: parameter.name,
        in: parameter.in,
        required: Boolean(parameter.required),
        description: parameter.description || undefined,
        type: parameter.schema?.type,
        format: parameter.schema?.format,
        enum: parameter.schema?.enum,
      }));
    const requestContentTypes = Object.keys(operation.requestBody?.content ?? {});
    const requestSchemas = Object.fromEntries(
      Object.entries(operation.requestBody?.content ?? {}).map(([contentType, content]) => [
        contentType,
        resolveSchema(content?.schema),
      ]),
    );

    operations.push({
      operationId: operation.operationId,
      method: method.toUpperCase(),
      path,
      tags: operation.tags ?? [],
      summary: operation.summary || undefined,
      description: operation.description || undefined,
      parameters,
      requestBodyRequired: Boolean(operation.requestBody?.required),
      requestContentTypes,
      requestSchemas,
      responseStatuses: Object.keys(operation.responses ?? {}),
      requiredScopes: operation["x-required-scopes"] ?? [],
      conditionalScopes: operation["x-conditional-scopes"] ?? {},
      anonymousAllowed: security.length === 0 || security.some((entry) => Object.keys(entry).length === 0),
    });
  }
}

operations.sort((left, right) => left.operationId.localeCompare(right.operationId));

function resolveSchema(schema, seenReferences = new Set()) {
  if (Array.isArray(schema)) {
    return schema.map((value) => resolveSchema(value, seenReferences));
  }
  if (!schema || typeof schema !== "object") return schema ?? null;

  const reference = schema?.$ref;
  if (reference?.startsWith("#/")) {
    if (seenReferences.has(reference)) return schema;
    const resolved = reference
      .slice(2)
      .split("/")
      .reduce((value, segment) => value?.[segment.replaceAll("~1", "/").replaceAll("~0", "~")], document);
    if (resolved) {
      return {
        ...resolveSchema(resolved, new Set([...seenReferences, reference])),
        "x-schema-ref": reference,
      };
    }
  }

  return Object.fromEntries(
    Object.entries(schema).map(([key, value]) => [key, resolveSchema(value, seenReferences)]),
  );
}

const source = `/**
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

export const API_OPERATIONS = ${JSON.stringify(operations, null, 2)} as const satisfies readonly ApiOperation[];

export const API_OPERATION_BY_ID: ReadonlyMap<string, ApiOperation> = new Map(
  API_OPERATIONS.map((operation) => [operation.operationId, operation]),
);
`;

await writeFile(outputPath, source);
console.log(`Generated ${operations.length} API operations in ${outputPath}`);
