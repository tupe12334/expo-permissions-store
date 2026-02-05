import { AppState, type AppStateStatus } from "react-native";
import type { PermissionsApi } from "./createApi";

/**
 * Sets up a listener to invalidate permission cache when app returns to foreground
 * This handles the case where users change permissions in device settings
 */
export function setupForegroundListener(api: PermissionsApi): () => void {
  let previousState: AppStateStatus = AppState.currentState;

  const subscription = AppState.addEventListener("change", (nextState) => {
    if (previousState !== "active" && nextState === "active") {
      // App came to foreground - invalidate all permission caches
      api.util.invalidateTags(["Permission"]);
    }
    previousState = nextState;
  });

  return () => subscription.remove();
}
