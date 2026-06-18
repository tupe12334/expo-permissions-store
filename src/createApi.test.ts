import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { createPermissionsApi } from "./createApi";
import { ALL_PERMISSIONS, DEFAULT_CONFIG } from "./types";
import { getPermission, requestPermission } from "./permissions/handlers";

vi.mock("./permissions/handlers", () => ({
  getPermission: vi.fn(),
  requestPermission: vi.fn(),
}));

const mockGetPermission = vi.mocked(getPermission);
const mockRequestPermission = vi.mocked(requestPermission);

function createTestStore(api: ReturnType<typeof createPermissionsApi>) {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
}

describe("createApi", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("createPermissionsApi", () => {
    it("should create API with default config", () => {
      const api = createPermissionsApi();

      expect(api.config).toEqual(DEFAULT_CONFIG);
      expect(api.reducerPath).toBe("permissionsApi");
    });

    it("should merge custom config with defaults", () => {
      const api = createPermissionsApi({
        permissions: ["camera", "microphone"],
        cacheTime: 60,
      });

      expect(api.config.permissions).toEqual(["camera", "microphone"]);
      expect(api.config.cacheTime).toBe(60);
      expect(api.config.recheckOnForeground).toBe(true);
      expect(api.config.autoCheckOnMount).toBe(false);
    });

    it("should have getPermission endpoint", () => {
      const api = createPermissionsApi();

      expect(api.endpoints.getPermission).toBeDefined();
    });

    it("should have requestPermission endpoint", () => {
      const api = createPermissionsApi();

      expect(api.endpoints.requestPermission).toBeDefined();
    });

    it("should export useGetPermissionQuery hook", () => {
      const api = createPermissionsApi();

      expect(api.useGetPermissionQuery).toBeDefined();
    });

    it("should export useLazyGetPermissionQuery hook", () => {
      const api = createPermissionsApi();

      expect(api.useLazyGetPermissionQuery).toBeDefined();
    });

    it("should export useRequestPermissionMutation hook", () => {
      const api = createPermissionsApi();

      expect(api.useRequestPermissionMutation).toBeDefined();
    });

    it("should export usePrefetch hook", () => {
      const api = createPermissionsApi();

      expect(api.usePrefetch).toBeDefined();
    });

    it("should have reducer", () => {
      const api = createPermissionsApi();

      expect(api.reducer).toBeDefined();
      expect(typeof api.reducer).toBe("function");
    });

    it("should have middleware", () => {
      const api = createPermissionsApi();

      expect(api.middleware).toBeDefined();
    });

    it("should have util with invalidateTags", () => {
      const api = createPermissionsApi();

      expect(api.util.invalidateTags).toBeDefined();
    });
  });

  describe("config options", () => {
    it("should apply custom cacheTime", () => {
      const api = createPermissionsApi({
        cacheTime: 30,
      });

      expect(api.config.cacheTime).toBe(30);
    });

    it("should apply custom permissions list", () => {
      const api = createPermissionsApi({
        permissions: ["camera", "microphone", "notifications"],
      });

      expect(api.config.permissions).toEqual([
        "camera",
        "microphone",
        "notifications",
      ]);
    });

    it("should override recheckOnForeground", () => {
      const api = createPermissionsApi({
        recheckOnForeground: false,
      });

      expect(api.config.recheckOnForeground).toBe(false);
    });

    it("should override autoCheckOnMount", () => {
      const api = createPermissionsApi({
        autoCheckOnMount: true,
      });

      expect(api.config.autoCheckOnMount).toBe(true);
    });

    it("should have all permissions configured by default", () => {
      const api = createPermissionsApi();

      expect(api.config.permissions).toEqual(ALL_PERMISSIONS);
      expect(api.config.permissions).toHaveLength(9);
    });
  });

  describe("getPermission queryFn", () => {
    it("should return data on successful permission check", async () => {
      mockGetPermission.mockResolvedValue({
        data: {
          status: "granted",
          canAskAgain: true,
          expires: "never",
        },
        error: undefined,
      });

      const api = createPermissionsApi();
      const store = createTestStore(api);

      const result = await store.dispatch(
        api.endpoints.getPermission.initiate("camera")
      );

      expect(mockGetPermission).toHaveBeenCalledWith("camera");
      expect(result.data).toEqual({
        status: "granted",
        canAskAgain: true,
        expires: "never",
      });
    });

    it("should return error for unconfigured permission", async () => {
      const api = createPermissionsApi({ permissions: ["microphone"] });
      const store = createTestStore(api);

      const result = await store.dispatch(
        api.endpoints.getPermission.initiate("camera")
      );

      expect(result.error).toEqual({
        status: "CUSTOM_ERROR",
        error: 'Permission "camera" is not configured',
      });
    });

    it("should return error when handler returns error result", async () => {
      mockGetPermission.mockResolvedValue({
        data: undefined,
        error: "expo-camera is not installed",
      });

      const api = createPermissionsApi();
      const store = createTestStore(api);

      const result = await store.dispatch(
        api.endpoints.getPermission.initiate("camera")
      );

      expect(result.error).toEqual({
        status: "CUSTOM_ERROR",
        error: "expo-camera is not installed",
      });
    });

    it("should provide tags for cache invalidation", async () => {
      mockGetPermission.mockResolvedValue({
        data: {
          status: "granted",
          canAskAgain: true,
          expires: "never",
        },
        error: undefined,
      });

      const api = createPermissionsApi();
      const store = createTestStore(api);

      await store.dispatch(api.endpoints.getPermission.initiate("camera"));

      const state = store.getState();
      const queries = state[api.reducerPath].queries;

      expect(Object.keys(queries).length).toBeGreaterThan(0);
    });
  });

  describe("requestPermission queryFn", () => {
    it("should return data on successful permission request", async () => {
      mockRequestPermission.mockResolvedValue({
        data: {
          status: "granted",
          canAskAgain: true,
          expires: "never",
        },
        error: undefined,
      });

      const api = createPermissionsApi();
      const store = createTestStore(api);

      const result = await store.dispatch(
        api.endpoints.requestPermission.initiate("camera")
      );

      expect(mockRequestPermission).toHaveBeenCalledWith("camera");
      expect(result.data).toEqual({
        status: "granted",
        canAskAgain: true,
        expires: "never",
      });
    });

    it("should return error for unconfigured permission", async () => {
      const api = createPermissionsApi({ permissions: ["microphone"] });
      const store = createTestStore(api);

      const result = await store.dispatch(
        api.endpoints.requestPermission.initiate("camera")
      );

      expect(result.error).toEqual({
        status: "CUSTOM_ERROR",
        error: 'Permission "camera" is not configured',
      });
    });

    it("should return error when handler returns error result", async () => {
      mockRequestPermission.mockResolvedValue({
        data: undefined,
        error: "expo-camera is not installed",
      });

      const api = createPermissionsApi();
      const store = createTestStore(api);

      const result = await store.dispatch(
        api.endpoints.requestPermission.initiate("camera")
      );

      expect(result.error).toEqual({
        status: "CUSTOM_ERROR",
        error: "expo-camera is not installed",
      });
    });

    it("should invalidate tags after mutation", async () => {
      mockRequestPermission.mockResolvedValue({
        data: {
          status: "granted",
          canAskAgain: true,
          expires: "never",
        },
        error: undefined,
      });

      const api = createPermissionsApi();
      const store = createTestStore(api);

      await store.dispatch(api.endpoints.requestPermission.initiate("camera"));

      const state = store.getState();
      expect(state[api.reducerPath]).toBeDefined();
    });
  });
});
