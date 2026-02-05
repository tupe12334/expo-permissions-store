import { describe, it, expect, vi } from "vitest";

import { store, type RootState, type AppDispatch } from "./store";
import { permissionsApi } from "./api";

vi.mock("./permissions/handlers", () => ({
  getPermission: vi.fn().mockResolvedValue({
    data: { status: "granted", canAskAgain: true, expires: "never" },
    error: undefined,
  }),
  requestPermission: vi.fn().mockResolvedValue({
    data: { status: "granted", canAskAgain: true, expires: "never" },
    error: undefined,
  }),
}));

describe("store", () => {
  describe("store configuration", () => {
    it("should be a valid Redux store", () => {
      expect(store).toBeDefined();
      expect(store.getState).toBeDefined();
      expect(store.dispatch).toBeDefined();
      expect(store.subscribe).toBeDefined();
    });

    it("should have permissionsApi reducer", () => {
      const state = store.getState();
      expect(state[permissionsApi.reducerPath]).toBeDefined();
    });

    it("should have initial state with queries and mutations", () => {
      const state = store.getState();
      const apiState = state[permissionsApi.reducerPath];

      expect(apiState).toHaveProperty("queries");
      expect(apiState).toHaveProperty("mutations");
    });

    it("should be able to dispatch actions", () => {
      expect(() => {
        store.dispatch({ type: "TEST_ACTION" });
      }).not.toThrow();
    });
  });

  describe("type exports", () => {
    it("should export RootState type", () => {
      const state: RootState = store.getState();
      expect(state).toBeDefined();
    });

    it("should export AppDispatch type", () => {
      const dispatch: AppDispatch = store.dispatch;
      expect(dispatch).toBeDefined();
    });
  });

  describe("API integration", () => {
    it("should allow dispatching API actions", async () => {
      const result = store.dispatch(
        permissionsApi.endpoints.getPermission.initiate("camera")
      );

      expect(result).toBeDefined();
      expect(result.abort).toBeDefined();
      expect(result.unsubscribe).toBeDefined();

      result.unsubscribe();
    });
  });
});
