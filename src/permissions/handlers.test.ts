import { describe, it, expect } from "vitest";
import { normalizeResponse, type PermissionResponse } from "./handlers";

describe("handlers", () => {
  describe("normalizeResponse", () => {
    it("should normalize granted status", () => {
      const response: PermissionResponse = {
        status: "granted",
        canAskAgain: true,
        expires: "never",
      };

      const result = normalizeResponse(response);

      expect(result).toEqual({
        status: "granted",
        canAskAgain: true,
        expires: "never",
      });
    });

    it("should normalize denied status", () => {
      const response: PermissionResponse = {
        status: "denied",
        canAskAgain: false,
        expires: "never",
      };

      const result = normalizeResponse(response);

      expect(result).toEqual({
        status: "denied",
        canAskAgain: false,
        expires: "never",
      });
    });

    it("should normalize limited status", () => {
      const response: PermissionResponse = {
        status: "limited",
        canAskAgain: true,
        expires: "never",
      };

      const result = normalizeResponse(response);

      expect(result).toEqual({
        status: "limited",
        canAskAgain: true,
        expires: "never",
      });
    });

    it("should normalize undetermined status", () => {
      const response: PermissionResponse = {
        status: "undetermined",
        canAskAgain: true,
        expires: "never",
      };

      const result = normalizeResponse(response);

      expect(result.status).toBe("undetermined");
    });

    it("should normalize unknown status to undetermined", () => {
      const response: PermissionResponse = {
        status: "unknown_status",
        canAskAgain: true,
        expires: "never",
      };

      const result = normalizeResponse(response);

      expect(result.status).toBe("undetermined");
    });

    it("should default canAskAgain to true when not provided", () => {
      const response: PermissionResponse = {
        status: "granted",
        expires: "never",
      };

      const result = normalizeResponse(response);

      expect(result.canAskAgain).toBe(true);
    });

    it("should preserve canAskAgain false value", () => {
      const response: PermissionResponse = {
        status: "denied",
        canAskAgain: false,
        expires: "never",
      };

      const result = normalizeResponse(response);

      expect(result.canAskAgain).toBe(false);
    });

    it("should default expires to never when not provided", () => {
      const response: PermissionResponse = {
        status: "granted",
        canAskAgain: true,
      };

      const result = normalizeResponse(response);

      expect(result.expires).toBe("never");
    });

    it("should handle numeric expires value", () => {
      const response: PermissionResponse = {
        status: "granted",
        canAskAgain: true,
        expires: 1234567890,
      };

      const result = normalizeResponse(response);

      expect(result.expires).toBe(1234567890);
    });

    it("should ignore granted field from response", () => {
      const response: PermissionResponse = {
        status: "granted",
        canAskAgain: true,
        expires: "never",
        granted: true,
      };

      const result = normalizeResponse(response);

      expect(result).not.toHaveProperty("granted");
      expect(result).toEqual({
        status: "granted",
        canAskAgain: true,
        expires: "never",
      });
    });

    it("should handle minimal response with only status", () => {
      const response: PermissionResponse = {
        status: "granted",
      };

      const result = normalizeResponse(response);

      expect(result).toEqual({
        status: "granted",
        canAskAgain: true,
        expires: "never",
      });
    });
  });

  describe("module structure", () => {
    it("should export getPermission function", async () => {
      const { getPermission } = await import("./handlers");
      expect(typeof getPermission).toBe("function");
    });

    it("should export requestPermission function", async () => {
      const { requestPermission } = await import("./handlers");
      expect(typeof requestPermission).toBe("function");
    });

    it("should export normalizeResponse function", async () => {
      const { normalizeResponse } = await import("./handlers");
      expect(typeof normalizeResponse).toBe("function");
    });
  });

  // NOTE: getPermission and requestPermission functions require React Native environment
  // with actual expo modules. They are tested indirectly through createApi.test.ts
  // which mocks the handlers module.
});
