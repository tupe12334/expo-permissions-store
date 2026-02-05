import type { PermissionState, PermissionType } from "../types";

export type PermissionResponse = {
  status: string;
  canAskAgain?: boolean;
  expires?: "never" | number;
  granted?: boolean;
};

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safeRequire(id: string): any {
  try {
    /* eslint-disable @typescript-eslint/no-require-imports */
    switch (id) {
      case "expo-camera":
        return require("expo-camera");
      case "expo-media-library":
        return require("expo-media-library");
      case "expo-location":
        return require("expo-location");
      case "expo-notifications":
        return require("expo-notifications");
      case "expo-contacts":
        return require("expo-contacts");
      case "expo-calendar":
        return require("expo-calendar");
      case "expo-tracking-transparency":
        return require("expo-tracking-transparency");
      default:
        return null;
    }
    /* eslint-enable @typescript-eslint/no-require-imports */
  } catch {
    return null;
  }
}

export async function getPermission(
  type: PermissionType
): Promise<PermissionState> {
  switch (type) {
    case "camera": {
      const Camera = safeRequire("expo-camera") as
        | typeof import("expo-camera")
        | null;
      if (!Camera) throw new Error("expo-camera is not installed");
      const response = await Camera.Camera.getCameraPermissionsAsync();
      return normalizeResponse(response);
    }

    case "microphone": {
      const Camera = safeRequire("expo-camera") as
        | typeof import("expo-camera")
        | null;
      if (!Camera) throw new Error("expo-camera is not installed");
      const response = await Camera.Camera.getMicrophonePermissionsAsync();
      return normalizeResponse(response);
    }

    case "mediaLibrary": {
      const MediaLibrary = safeRequire("expo-media-library") as
        | typeof import("expo-media-library")
        | null;
      if (!MediaLibrary) throw new Error("expo-media-library is not installed");
      const response = await MediaLibrary.getPermissionsAsync();
      return normalizeResponse(response);
    }

    case "locationForeground": {
      const Location = safeRequire("expo-location") as
        | typeof import("expo-location")
        | null;
      if (!Location) throw new Error("expo-location is not installed");
      const response = await Location.getForegroundPermissionsAsync();
      return normalizeResponse(response);
    }

    case "locationBackground": {
      const Location = safeRequire("expo-location") as
        | typeof import("expo-location")
        | null;
      if (!Location) throw new Error("expo-location is not installed");
      const response = await Location.getBackgroundPermissionsAsync();
      return normalizeResponse(response);
    }

    case "notifications": {
      const Notifications = safeRequire("expo-notifications") as
        | typeof import("expo-notifications")
        | null;
      if (!Notifications)
        throw new Error("expo-notifications is not installed");
      const response = await Notifications.getPermissionsAsync();
      return normalizeResponse(response);
    }

    case "contacts": {
      const Contacts = safeRequire("expo-contacts") as
        | typeof import("expo-contacts")
        | null;
      if (!Contacts) throw new Error("expo-contacts is not installed");
      const response = await Contacts.getPermissionsAsync();
      return normalizeResponse(response);
    }

    case "calendar": {
      const Calendar = safeRequire("expo-calendar") as
        | typeof import("expo-calendar")
        | null;
      if (!Calendar) throw new Error("expo-calendar is not installed");
      const response = await Calendar.getCalendarPermissionsAsync();
      return normalizeResponse(response);
    }

    case "tracking": {
      const Tracking = safeRequire("expo-tracking-transparency") as
        | typeof import("expo-tracking-transparency")
        | null;
      if (!Tracking)
        throw new Error("expo-tracking-transparency is not installed");
      const response = await Tracking.getTrackingPermissionsAsync();
      return normalizeResponse(response);
    }

    default: {
      const _exhaustive: never = type;
      throw new Error(`Unknown permission type: ${_exhaustive}`);
    }
  }
}

export async function requestPermission(
  type: PermissionType
): Promise<PermissionState> {
  switch (type) {
    case "camera": {
      const Camera = safeRequire("expo-camera") as
        | typeof import("expo-camera")
        | null;
      if (!Camera) throw new Error("expo-camera is not installed");
      const response = await Camera.Camera.requestCameraPermissionsAsync();
      return normalizeResponse(response);
    }

    case "microphone": {
      const Camera = safeRequire("expo-camera") as
        | typeof import("expo-camera")
        | null;
      if (!Camera) throw new Error("expo-camera is not installed");
      const response = await Camera.Camera.requestMicrophonePermissionsAsync();
      return normalizeResponse(response);
    }

    case "mediaLibrary": {
      const MediaLibrary = safeRequire("expo-media-library") as
        | typeof import("expo-media-library")
        | null;
      if (!MediaLibrary) throw new Error("expo-media-library is not installed");
      const response = await MediaLibrary.requestPermissionsAsync();
      return normalizeResponse(response);
    }

    case "locationForeground": {
      const Location = safeRequire("expo-location") as
        | typeof import("expo-location")
        | null;
      if (!Location) throw new Error("expo-location is not installed");
      const response = await Location.requestForegroundPermissionsAsync();
      return normalizeResponse(response);
    }

    case "locationBackground": {
      const Location = safeRequire("expo-location") as
        | typeof import("expo-location")
        | null;
      if (!Location) throw new Error("expo-location is not installed");
      const response = await Location.requestBackgroundPermissionsAsync();
      return normalizeResponse(response);
    }

    case "notifications": {
      const Notifications = safeRequire("expo-notifications") as
        | typeof import("expo-notifications")
        | null;
      if (!Notifications)
        throw new Error("expo-notifications is not installed");
      const response = await Notifications.requestPermissionsAsync();
      return normalizeResponse(response);
    }

    case "contacts": {
      const Contacts = safeRequire("expo-contacts") as
        | typeof import("expo-contacts")
        | null;
      if (!Contacts) throw new Error("expo-contacts is not installed");
      const response = await Contacts.requestPermissionsAsync();
      return normalizeResponse(response);
    }

    case "calendar": {
      const Calendar = safeRequire("expo-calendar") as
        | typeof import("expo-calendar")
        | null;
      if (!Calendar) throw new Error("expo-calendar is not installed");
      const response = await Calendar.requestCalendarPermissionsAsync();
      return normalizeResponse(response);
    }

    case "tracking": {
      const Tracking = safeRequire("expo-tracking-transparency") as
        | typeof import("expo-tracking-transparency")
        | null;
      if (!Tracking)
        throw new Error("expo-tracking-transparency is not installed");
      const response = await Tracking.requestTrackingPermissionsAsync();
      return normalizeResponse(response);
    }

    default: {
      const _exhaustive: never = type;
      throw new Error(`Unknown permission type: ${_exhaustive}`);
    }
  }
}
