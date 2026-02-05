import type { PermissionState, PermissionType } from "../types";

type PermissionResponse = {
  status: string;
  canAskAgain?: boolean;
  expires?: "never" | number;
  granted?: boolean;
};

function normalizeResponse(response: PermissionResponse): PermissionState {
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

async function tryImport<T>(moduleName: string): Promise<T | null> {
  try {
    return await import(moduleName);
  } catch {
    return null;
  }
}

export async function getPermission(
  type: PermissionType
): Promise<PermissionState> {
  switch (type) {
    case "camera": {
      const Camera =
        await tryImport<typeof import("expo-camera")>("expo-camera");
      if (!Camera) throw new Error("expo-camera is not installed");
      const response = await Camera.Camera.getCameraPermissionsAsync();
      return normalizeResponse(response);
    }

    case "microphone": {
      const Camera =
        await tryImport<typeof import("expo-camera")>("expo-camera");
      if (!Camera) throw new Error("expo-camera is not installed");
      const response = await Camera.Camera.getMicrophonePermissionsAsync();
      return normalizeResponse(response);
    }

    case "mediaLibrary": {
      const MediaLibrary =
        await tryImport<typeof import("expo-media-library")>(
          "expo-media-library"
        );
      if (!MediaLibrary) throw new Error("expo-media-library is not installed");
      const response = await MediaLibrary.getPermissionsAsync();
      return normalizeResponse(response);
    }

    case "locationForeground": {
      const Location =
        await tryImport<typeof import("expo-location")>("expo-location");
      if (!Location) throw new Error("expo-location is not installed");
      const response = await Location.getForegroundPermissionsAsync();
      return normalizeResponse(response);
    }

    case "locationBackground": {
      const Location =
        await tryImport<typeof import("expo-location")>("expo-location");
      if (!Location) throw new Error("expo-location is not installed");
      const response = await Location.getBackgroundPermissionsAsync();
      return normalizeResponse(response);
    }

    case "notifications": {
      const Notifications =
        await tryImport<typeof import("expo-notifications")>(
          "expo-notifications"
        );
      if (!Notifications)
        throw new Error("expo-notifications is not installed");
      const response = await Notifications.getPermissionsAsync();
      return normalizeResponse(response);
    }

    case "contacts": {
      const Contacts =
        await tryImport<typeof import("expo-contacts")>("expo-contacts");
      if (!Contacts) throw new Error("expo-contacts is not installed");
      const response = await Contacts.getPermissionsAsync();
      return normalizeResponse(response);
    }

    case "calendar": {
      const Calendar =
        await tryImport<typeof import("expo-calendar")>("expo-calendar");
      if (!Calendar) throw new Error("expo-calendar is not installed");
      const response = await Calendar.getCalendarPermissionsAsync();
      return normalizeResponse(response);
    }

    case "tracking": {
      const Tracking = await tryImport<
        typeof import("expo-tracking-transparency")
      >("expo-tracking-transparency");
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
      const Camera =
        await tryImport<typeof import("expo-camera")>("expo-camera");
      if (!Camera) throw new Error("expo-camera is not installed");
      const response = await Camera.Camera.requestCameraPermissionsAsync();
      return normalizeResponse(response);
    }

    case "microphone": {
      const Camera =
        await tryImport<typeof import("expo-camera")>("expo-camera");
      if (!Camera) throw new Error("expo-camera is not installed");
      const response = await Camera.Camera.requestMicrophonePermissionsAsync();
      return normalizeResponse(response);
    }

    case "mediaLibrary": {
      const MediaLibrary =
        await tryImport<typeof import("expo-media-library")>(
          "expo-media-library"
        );
      if (!MediaLibrary) throw new Error("expo-media-library is not installed");
      const response = await MediaLibrary.requestPermissionsAsync();
      return normalizeResponse(response);
    }

    case "locationForeground": {
      const Location =
        await tryImport<typeof import("expo-location")>("expo-location");
      if (!Location) throw new Error("expo-location is not installed");
      const response = await Location.requestForegroundPermissionsAsync();
      return normalizeResponse(response);
    }

    case "locationBackground": {
      const Location =
        await tryImport<typeof import("expo-location")>("expo-location");
      if (!Location) throw new Error("expo-location is not installed");
      const response = await Location.requestBackgroundPermissionsAsync();
      return normalizeResponse(response);
    }

    case "notifications": {
      const Notifications =
        await tryImport<typeof import("expo-notifications")>(
          "expo-notifications"
        );
      if (!Notifications)
        throw new Error("expo-notifications is not installed");
      const response = await Notifications.requestPermissionsAsync();
      return normalizeResponse(response);
    }

    case "contacts": {
      const Contacts =
        await tryImport<typeof import("expo-contacts")>("expo-contacts");
      if (!Contacts) throw new Error("expo-contacts is not installed");
      const response = await Contacts.requestPermissionsAsync();
      return normalizeResponse(response);
    }

    case "calendar": {
      const Calendar =
        await tryImport<typeof import("expo-calendar")>("expo-calendar");
      if (!Calendar) throw new Error("expo-calendar is not installed");
      const response = await Calendar.requestCalendarPermissionsAsync();
      return normalizeResponse(response);
    }

    case "tracking": {
      const Tracking = await tryImport<
        typeof import("expo-tracking-transparency")
      >("expo-tracking-transparency");
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
