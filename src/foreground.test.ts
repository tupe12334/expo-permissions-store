/* eslint-disable import/order, no-restricted-syntax */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { setupForegroundListener } from "./foreground";
import type { PermissionsApi } from "./createApi";

// Override the global mock for this test file
const mockRemove = vi.fn();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockAddEventListener = vi.fn(() => ({ remove: mockRemove })) as any;

vi.mock("react-native", () => ({
  AppState: {
    currentState: "active",
    addEventListener: mockAddEventListener,
  },
}));

describe.skip("foreground", () => {
  let mockApi: PermissionsApi;
  let mockInvalidateTags: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockInvalidateTags = vi.fn();
    mockApi = {
      util: {
        invalidateTags: mockInvalidateTags,
      },
    } as unknown as PermissionsApi;
  });

  describe("setupForegroundListener", () => {
    it("should add event listener for app state changes", () => {
      setupForegroundListener(mockApi);

      expect(mockAddEventListener).toHaveBeenCalledWith(
        "change",
        expect.any(Function)
      );
    });

    it("should return unsubscribe function", () => {
      const unsubscribe = setupForegroundListener(mockApi);

      expect(typeof unsubscribe).toBe("function");
    });

    it("should call remove when unsubscribe is called", () => {
      const unsubscribe = setupForegroundListener(mockApi);

      unsubscribe();

      expect(mockRemove).toHaveBeenCalled();
    });

    it("should invalidate tags when app comes to foreground from background", () => {
      setupForegroundListener(mockApi);

      const callback = mockAddEventListener.mock.calls[0][1];

      // Simulate going to background
      callback("background");
      expect(mockInvalidateTags).not.toHaveBeenCalled();

      // Simulate coming back to foreground
      callback("active");
      expect(mockInvalidateTags).toHaveBeenCalledWith(["Permission"]);
    });

    it("should invalidate tags when app comes to foreground from inactive", () => {
      setupForegroundListener(mockApi);

      const callback = mockAddEventListener.mock.calls[0][1];

      // Simulate going to inactive
      callback("inactive");
      expect(mockInvalidateTags).not.toHaveBeenCalled();

      // Simulate coming back to foreground
      callback("active");
      expect(mockInvalidateTags).toHaveBeenCalledWith(["Permission"]);
    });

    it("should not invalidate tags when staying in active state", () => {
      setupForegroundListener(mockApi);

      const callback = mockAddEventListener.mock.calls[0][1];

      // App is already active, simulate another active state change
      callback("active");
      expect(mockInvalidateTags).not.toHaveBeenCalled();
    });

    it("should not invalidate tags when going to background", () => {
      setupForegroundListener(mockApi);

      const callback = mockAddEventListener.mock.calls[0][1];

      callback("background");
      expect(mockInvalidateTags).not.toHaveBeenCalled();
    });

    it("should track state transitions correctly across multiple changes", () => {
      setupForegroundListener(mockApi);

      const callback = mockAddEventListener.mock.calls[0][1];

      // Initial state is "active"
      // Go to background
      callback("background");
      expect(mockInvalidateTags).not.toHaveBeenCalled();

      // Come back to foreground - should invalidate
      callback("active");
      expect(mockInvalidateTags).toHaveBeenCalledTimes(1);

      // Stay in foreground - should not invalidate again
      callback("active");
      expect(mockInvalidateTags).toHaveBeenCalledTimes(1);

      // Go to inactive
      callback("inactive");
      expect(mockInvalidateTags).toHaveBeenCalledTimes(1);

      // Come back to foreground - should invalidate again
      callback("active");
      expect(mockInvalidateTags).toHaveBeenCalledTimes(2);
    });
  });
});
