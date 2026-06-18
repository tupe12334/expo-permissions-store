import { describe, it, expect, vi } from "vitest";

import {
  ALL_PERMISSIONS,
  DEFAULT_CONFIG,
  createPermissionsApi,
  permissionsApi,
  useGetPermissionQuery,
  useLazyGetPermissionQuery,
  useRequestPermissionMutation,
  usePrefetch,
  store,
  setupForegroundListener,
} from "./index";

vi.mock("./permissions/handlers", () => ({
  getPermission: vi.fn(),
  requestPermission: vi.fn(),
}));

describe("index exports", () => {
  describe("type exports", () => {
    it("should export ALL_PERMISSIONS", () => {
      expect(ALL_PERMISSIONS).toBeDefined();
      expect(Array.isArray(ALL_PERMISSIONS)).toBe(true);
      expect(ALL_PERMISSIONS).toHaveLength(9);
    });

    it("should export DEFAULT_CONFIG", () => {
      expect(DEFAULT_CONFIG).toBeDefined();
      expect(DEFAULT_CONFIG.permissions).toBeDefined();
      expect(DEFAULT_CONFIG.recheckOnForeground).toBe(true);
      expect(DEFAULT_CONFIG.autoCheckOnMount).toBe(false);
      expect(DEFAULT_CONFIG.cacheTime).toBe(Infinity);
    });
  });

  describe("API factory export", () => {
    it("should export createPermissionsApi", () => {
      expect(createPermissionsApi).toBeDefined();
      expect(typeof createPermissionsApi).toBe("function");
    });

    it("should create API with createPermissionsApi", () => {
      const api = createPermissionsApi();
      expect(api.reducerPath).toBe("permissionsApi");
      expect(api.endpoints.getPermission).toBeDefined();
      expect(api.endpoints.requestPermission).toBeDefined();
    });
  });

  describe("pre-configured API exports", () => {
    it("should export permissionsApi", () => {
      expect(permissionsApi).toBeDefined();
      expect(permissionsApi.reducerPath).toBe("permissionsApi");
    });

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
  });

  describe("store exports", () => {
    it("should export store", () => {
      expect(store).toBeDefined();
      expect(store.getState).toBeDefined();
      expect(store.dispatch).toBeDefined();
    });
  });

  describe("utility exports", () => {
    it("should export setupForegroundListener", () => {
      expect(setupForegroundListener).toBeDefined();
      expect(typeof setupForegroundListener).toBe("function");
    });

    it("setupForegroundListener should return cleanup function", () => {
      const cleanup = setupForegroundListener(permissionsApi);
      expect(typeof cleanup).toBe("function");
      cleanup();
    });
  });
});
