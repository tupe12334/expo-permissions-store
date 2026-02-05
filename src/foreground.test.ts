import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { AppState } from "react-native";
import { setupForegroundListener } from "./foreground";
import { createPermissionsApi } from "./createApi";

vi.mock("./permissions/handlers", () => ({
  getPermission: vi.fn(),
  requestPermission: vi.fn(),
}));

describe("foreground", () => {
  let mockInvalidateTags: ReturnType<typeof vi.fn>;
  let appStateCallback: ((state: string) => void) | null = null;
  let mockRemove: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockInvalidateTags = vi.fn();
    mockRemove = vi.fn();
    appStateCallback = null;

    vi.mocked(AppState.addEventListener).mockImplementation(
      (event: string, callback: (state: string) => void) => {
        if (event === "change") {
          appStateCallback = callback;
        }
        return { remove: mockRemove };
      }
    );
  });

  afterEach(() => {
    appStateCallback = null;
  });

  describe("setupForegroundListener", () => {
    it("should return a cleanup function", () => {
      const api = createPermissionsApi();
      api.util.invalidateTags = mockInvalidateTags;

      const cleanup = setupForegroundListener(api);

      expect(typeof cleanup).toBe("function");
    });

    it("should subscribe to AppState change events", () => {
      const api = createPermissionsApi();
      api.util.invalidateTags = mockInvalidateTags;

      setupForegroundListener(api);

      expect(AppState.addEventListener).toHaveBeenCalledWith(
        "change",
        expect.any(Function)
      );
    });

    it("should invalidate tags when app comes to foreground from background", () => {
      const api = createPermissionsApi();
      api.util.invalidateTags = mockInvalidateTags;

      setupForegroundListener(api);

      expect(appStateCallback).not.toBeNull();

      // Simulate going to background
      appStateCallback!("background");
      expect(mockInvalidateTags).not.toHaveBeenCalled();

      // Simulate coming back to foreground
      appStateCallback!("active");
      expect(mockInvalidateTags).toHaveBeenCalledWith(["Permission"]);
    });

    it("should invalidate tags when app comes to foreground from inactive", () => {
      const api = createPermissionsApi();
      api.util.invalidateTags = mockInvalidateTags;

      setupForegroundListener(api);

      // Simulate going to inactive
      appStateCallback!("inactive");
      expect(mockInvalidateTags).not.toHaveBeenCalled();

      // Simulate coming back to foreground
      appStateCallback!("active");
      expect(mockInvalidateTags).toHaveBeenCalledWith(["Permission"]);
    });

    it("should not invalidate tags when staying active", () => {
      const api = createPermissionsApi();
      api.util.invalidateTags = mockInvalidateTags;

      setupForegroundListener(api);

      // Initial state is active, staying active should not trigger
      appStateCallback!("active");
      expect(mockInvalidateTags).not.toHaveBeenCalled();
    });

    it("should not invalidate tags when going to background", () => {
      const api = createPermissionsApi();
      api.util.invalidateTags = mockInvalidateTags;

      setupForegroundListener(api);

      appStateCallback!("background");
      expect(mockInvalidateTags).not.toHaveBeenCalled();
    });

    it("should remove subscription when cleanup is called", () => {
      const api = createPermissionsApi();
      api.util.invalidateTags = mockInvalidateTags;

      const cleanup = setupForegroundListener(api);
      cleanup();

      expect(mockRemove).toHaveBeenCalled();
    });

    it("should track previous state correctly through multiple transitions", () => {
      const api = createPermissionsApi();
      api.util.invalidateTags = mockInvalidateTags;

      setupForegroundListener(api);

      // Active -> background (no invalidation)
      appStateCallback!("background");
      expect(mockInvalidateTags).toHaveBeenCalledTimes(0);

      // Background -> active (invalidation)
      appStateCallback!("active");
      expect(mockInvalidateTags).toHaveBeenCalledTimes(1);

      // Active -> inactive (no invalidation)
      appStateCallback!("inactive");
      expect(mockInvalidateTags).toHaveBeenCalledTimes(1);

      // Inactive -> active (invalidation)
      appStateCallback!("active");
      expect(mockInvalidateTags).toHaveBeenCalledTimes(2);

      // Active -> active (no invalidation)
      appStateCallback!("active");
      expect(mockInvalidateTags).toHaveBeenCalledTimes(2);
    });
  });
});
