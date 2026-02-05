import { describe, it, expect, vi } from "vitest";

import {
  permissionsApi,
  useGetPermissionQuery,
  useLazyGetPermissionQuery,
  useRequestPermissionMutation,
  usePrefetch,
} from "./api";
import { DEFAULT_CONFIG } from "./types";

vi.mock("./permissions/handlers", () => ({
  getPermission: vi.fn(),
  requestPermission: vi.fn(),
}));

describe("api", () => {
  describe("permissionsApi", () => {
    it("should be a pre-configured API instance", () => {
      expect(permissionsApi).toBeDefined();
      expect(permissionsApi.reducerPath).toBe("permissionsApi");
    });

    it("should have default config", () => {
      expect(permissionsApi.config).toEqual(DEFAULT_CONFIG);
    });

    it("should have getPermission endpoint", () => {
      expect(permissionsApi.endpoints.getPermission).toBeDefined();
    });

    it("should have requestPermission endpoint", () => {
      expect(permissionsApi.endpoints.requestPermission).toBeDefined();
    });

    it("should have reducer", () => {
      expect(permissionsApi.reducer).toBeDefined();
      expect(typeof permissionsApi.reducer).toBe("function");
    });

    it("should have middleware", () => {
      expect(permissionsApi.middleware).toBeDefined();
    });

    it("should have util functions", () => {
      expect(permissionsApi.util).toBeDefined();
      expect(permissionsApi.util.invalidateTags).toBeDefined();
    });
  });

  describe("exported hooks", () => {
    it("should export useGetPermissionQuery", () => {
      expect(useGetPermissionQuery).toBeDefined();
      expect(typeof useGetPermissionQuery).toBe("function");
    });

    it("should export useLazyGetPermissionQuery", () => {
      expect(useLazyGetPermissionQuery).toBeDefined();
      expect(typeof useLazyGetPermissionQuery).toBe("function");
    });

    it("should export useRequestPermissionMutation", () => {
      expect(useRequestPermissionMutation).toBeDefined();
      expect(typeof useRequestPermissionMutation).toBe("function");
    });

    it("should export usePrefetch", () => {
      expect(usePrefetch).toBeDefined();
      expect(typeof usePrefetch).toBe("function");
    });

    it("should have hooks match API hooks", () => {
      expect(useGetPermissionQuery).toBe(permissionsApi.useGetPermissionQuery);
      expect(useLazyGetPermissionQuery).toBe(
        permissionsApi.useLazyGetPermissionQuery
      );
      expect(useRequestPermissionMutation).toBe(
        permissionsApi.useRequestPermissionMutation
      );
      expect(usePrefetch).toBe(permissionsApi.usePrefetch);
    });
  });
});
