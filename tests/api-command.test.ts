import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";
import { parse } from "yaml";
import { readFile } from "node:fs/promises";

import {
  executeApiOperation,
  parseJson,
  parseNamedFile,
  parseNamedValue,
} from "../src/api-command.js";
import { CliError } from "../src/errors.js";
import { API_OPERATION_BY_ID, API_OPERATIONS } from "../src/generated/operations.js";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

describe("generated API operation catalog", () => {
  it("contains every operation from the bundled OpenAPI document exactly once", async () => {
    const document = parse(await readFile(new URL("../openapi/openapi.yaml", import.meta.url), "utf8"));
    const documentOperationIds = Object.values(document.paths as Record<string, Record<string, unknown>>)
      .flatMap((pathItem) => Object.values(pathItem))
      .filter((value): value is { operationId: string } => Boolean(
        value && typeof value === "object" && "operationId" in value,
      ))
      .map((operation) => operation.operationId)
      .sort();
    const generatedOperationIds = API_OPERATIONS.map((operation) => operation.operationId).sort();

    expect(generatedOperationIds).toEqual(documentOperationIds);
    expect(new Set(generatedOperationIds).size).toBe(generatedOperationIds.length);
    expect(generatedOperationIds).toContain("organization_asset_create");
    expect(generatedOperationIds).toContain("calendar_composition_replace");
    expect(generatedOperationIds).toContain("slot_registrations_manager_action");

    for (const operation of API_OPERATIONS.filter((candidate) => candidate.requestContentTypes.length > 0)) {
      expect(
        operation.requestContentTypes.includes("application/json")
          || operation.requestContentTypes.includes("multipart/form-data"),
        `${operation.operationId} has no request representation supported by api call`,
      ).toBe(true);
    }
  });
});

describe("generic API operation requests", () => {
  it("interpolates path parameters, preserves repeated query values, and authenticates", async () => {
    const operation = API_OPERATION_BY_ID.get("slot_registrations_manager_action")!;
    let capturedRequest: Request | undefined;

    const response = await executeApiOperation({
      baseUrl: "https://voo.sh",
      token: "secret-token",
      operation,
      pathValues: [
        { name: "slot_id", value: "slot with spaces" },
        { name: "registration_id", value: "registration/1" },
        { name: "action", value: "confirm" },
      ],
      queryValues: [
        { name: "include", value: "event" },
        { name: "include", value: "calendar" },
      ],
      fetch: async (request) => {
        capturedRequest = new Request(request);
        return new Response(JSON.stringify({ code: "updated" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    });

    expect(capturedRequest!.url).toBe(
      "https://voo.sh/api/v1/slots/slot%20with%20spaces/registrations/registration%2F1/confirm?include=event&include=calendar",
    );
    expect(capturedRequest!.headers.get("Authorization")).toBe("Bearer secret-token");
    expect(response).toEqual({ status: 200, data: { code: "updated" } });
  });

  it("sends JSON bodies and returns a stable no-content result", async () => {
    const updateOperation = API_OPERATION_BY_ID.get("me_update")!;
    let requestBody: unknown;

    await executeApiOperation({
      baseUrl: "https://voo.sh",
      operation: updateOperation,
      jsonBody: { language: "en" },
      fetch: async (request) => {
        requestBody = await new Request(request).json();
        return new Response(JSON.stringify({ language: "en" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    });
    expect(requestBody).toEqual({ language: "en" });

    const deleteOperation = API_OPERATION_BY_ID.get("me_delete")!;
    const deleted = await executeApiOperation({
      baseUrl: "https://voo.sh",
      operation: deleteOperation,
      fetch: async () => new Response(null, { status: 204 }),
    });
    expect(deleted).toEqual({ status: 204, data: { code: "no_content", status: 204 } });
  });

  it("uploads multipart form values and files", async () => {
    const directory = await mkdtemp(join(tmpdir(), "voosh-cli-upload-"));
    temporaryDirectories.push(directory);
    const imagePath = join(directory, "demo.png");
    await writeFile(imagePath, Buffer.from([137, 80, 78, 71]));
    const operation = API_OPERATION_BY_ID.get("organization_asset_create")!;
    let capturedForm: FormData | undefined;

    await executeApiOperation({
      baseUrl: "https://voo.sh",
      operation,
      pathValues: [{ name: "org_id", value: "org-1" }],
      formValues: [
        { name: "type", value: "image" },
        { name: "label", value: "Demo image" },
      ],
      files: [{ name: "file", path: imagePath }],
      fetch: async (request) => {
        capturedForm = await new Request(request).formData();
        return new Response(JSON.stringify({ asset: { asset_id: "asset-1" } }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      },
    });

    expect(capturedForm!.get("type")).toBe("image");
    expect(capturedForm!.get("label")).toBe("Demo image");
    const file = capturedForm!.get("file") as File;
    expect(file.name).toBe("demo.png");
    expect(file.type).toBe("image/png");
    expect(file.size).toBe(4);
  });

  it("validates generic CLI values before making requests", async () => {
    expect(parseNamedValue("name=value=with=equals", "--query")).toEqual({
      name: "name",
      value: "value=with=equals",
    });
    expect(parseNamedFile("file=/tmp/demo.png")).toEqual({ name: "file", path: "/tmp/demo.png" });
    expect(() => parseJson("not-json", "--body")).toThrowError(CliError);

    await expect(executeApiOperation({
      baseUrl: "https://voo.sh",
      operation: API_OPERATION_BY_ID.get("events_retrieve")!,
      fetch: async () => {
        throw new Error("must not be called");
      },
    })).rejects.toMatchObject({ code: "missing_path_parameter", exitCode: 2 });
  });
});
