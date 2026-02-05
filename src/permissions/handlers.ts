import type { PermissionState, PermissionType } from "../types";

export type PermissionResponse = {
  status: string;
  canAskAgain?: boolean;
  expires?: "never" | number;
  granted?: boolean;
};

export type Result<T> =
  | { data: T; error: undefined }
  | { data: undefined; error: string };

export function normalizeResponse(
  response: PermissionResponse
): PermissionState {
  const status = response.status as PermissionState["status"];
  return {
    status:
      status === "granted" || status === "denied" || status === "limited"
        ? status
        : "undetermined",
    canAskAgain: response.canAskAgain ?? true,
    expires: response.expires ?? "never",
  };
}

// Use require() for Metro bundler compatibility - Metro cannot analyze dynamic import()
function safeRequire<T>(id: string): Result<T> {
  /* eslint-disable @typescript-eslint/no-require-imports */
  switch (id) {
    case "expo-camera":
      return { data: require("expo-camera"), error: undefined };
    case "expo-media-library":
      return { data: require("expo-media-library"), error: undefined };
    case "expo-location":
      return { data: require("expo-location"), error: undefined };
    case "expo-notifications":
      return { data: require("expo-notifications"), error: undefined };
    case "expo-contacts":
      return { data: require("expo-contacts"), error: undefined };
    case "expo-calendar":
      return { data: require("expo-calendar"), error: undefined };
    case "expo-tracking-transparency":
      return { data: require("expo-tracking-transparency"), error: undefined };
    default:
      return { data: undefined, error: `Unknown module: ${id}` };
  }
  /* eslint-enable @typescript-eslint/no-require-imports */
}

export async function getPermission(
  type: PermissionType
): Promise<Result<PermissionState>> {
  switch (type) {
    case "camera": {
      const result = safeRequire<typeof import("expo-camera")>("expo-camera");
      if (result.error) return { data: undefined, error: result.error };
      const response = await result.data!.Camera.getCameraPermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    case "microphone": {
      const result = safeRequire<typeof import("expo-camera")>("expo-camera");
      if (result.error) return { data: undefined, error: result.error };
      const response =
        await result.data!.Camera.getMicrophonePermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    case "mediaLibrary": {
      const result =
        safeRequire<typeof import("expo-media-library")>("expo-media-library");
      if (result.error) return { data: undefined, error: result.error };
      const response = await result.data!.getPermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    case "locationForeground": {
      const result =
        safeRequire<typeof import("expo-location")>("expo-location");
      if (result.error) return { data: undefined, error: result.error };
      const response = await result.data!.getForegroundPermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    case "locationBackground": {
      const result =
        safeRequire<typeof import("expo-location")>("expo-location");
      if (result.error) return { data: undefined, error: result.error };
      const response = await result.data!.getBackgroundPermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    case "notifications": {
      const result =
        safeRequire<typeof import("expo-notifications")>("expo-notifications");
      if (result.error) return { data: undefined, error: result.error };
      const response = await result.data!.getPermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    case "contacts": {
      const result =
        safeRequire<typeof import("expo-contacts")>("expo-contacts");
      if (result.error) return { data: undefined, error: result.error };
      const response = await result.data!.getPermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    case "calendar": {
      const result =
        safeRequire<typeof import("expo-calendar")>("expo-calendar");
      if (result.error) return { data: undefined, error: result.error };
      const response = await result.data!.getCalendarPermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    case "tracking": {
      const result = safeRequire<typeof import("expo-tracking-transparency")>(
        "expo-tracking-transparency"
      );
      if (result.error) return { data: undefined, error: result.error };
      const response = await result.data!.getTrackingPermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    default: {
      const _exhaustive: never = type;
      return {
        data: undefined,
        error: `Unknown permission type: ${_exhaustive}`,
      };
    }
  }
}

export async function requestPermission(
  type: PermissionType
): Promise<Result<PermissionState>> {
  switch (type) {
    case "camera": {
      const result = safeRequire<typeof import("expo-camera")>("expo-camera");
      if (result.error) return { data: undefined, error: result.error };
      const response =
        await result.data!.Camera.requestCameraPermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    case "microphone": {
      const result = safeRequire<typeof import("expo-camera")>("expo-camera");
      if (result.error) return { data: undefined, error: result.error };
      const response =
        await result.data!.Camera.requestMicrophonePermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    case "mediaLibrary": {
      const result =
        safeRequire<typeof import("expo-media-library")>("expo-media-library");
      if (result.error) return { data: undefined, error: result.error };
      const response = await result.data!.requestPermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    case "locationForeground": {
      const result =
        safeRequire<typeof import("expo-location")>("expo-location");
      if (result.error) return { data: undefined, error: result.error };
      const response = await result.data!.requestForegroundPermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    case "locationBackground": {
      const result =
        safeRequire<typeof import("expo-location")>("expo-location");
      if (result.error) return { data: undefined, error: result.error };
      const response = await result.data!.requestBackgroundPermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    case "notifications": {
      const result =
        safeRequire<typeof import("expo-notifications")>("expo-notifications");
      if (result.error) return { data: undefined, error: result.error };
      const response = await result.data!.requestPermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    case "contacts": {
      const result =
        safeRequire<typeof import("expo-contacts")>("expo-contacts");
      if (result.error) return { data: undefined, error: result.error };
      const response = await result.data!.requestPermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    case "calendar": {
      const result =
        safeRequire<typeof import("expo-calendar")>("expo-calendar");
      if (result.error) return { data: undefined, error: result.error };
      const response = await result.data!.requestCalendarPermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    case "tracking": {
      const result = safeRequire<typeof import("expo-tracking-transparency")>(
        "expo-tracking-transparency"
      );
      if (result.error) return { data: undefined, error: result.error };
      const response = await result.data!.requestTrackingPermissionsAsync();
      return { data: normalizeResponse(response), error: undefined };
    }

    default: {
      const _exhaustive: never = type;
      return {
        data: undefined,
        error: `Unknown permission type: ${_exhaustive}`,
      };
    }
  }
}
