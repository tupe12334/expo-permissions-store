export type PermissionType =
  | "camera"
  | "microphone"
  | "mediaLibrary"
  | "locationForeground"
  | "locationBackground"
  | "notifications"
  | "contacts"
  | "calendar"
  | "tracking";

export type PermissionStatus =
  | "undetermined"
  | "granted"
  | "denied"
  | "limited";

export interface PermissionState {
  status: PermissionStatus;
  canAskAgain: boolean;
  expires: "never" | number;
}

export interface PermissionsConfig {
  /**
   * Which permissions to include in the API
   * @default all permissions
   */
  permissions?: PermissionType[];

  /**
   * Re-check permissions when app returns to foreground
   * @default true
   */
  recheckOnForeground?: boolean;

  /**
   * Automatically check all configured permissions on store creation
   * @default false
   */
  autoCheckOnMount?: boolean;

  /**
   * RTK Query cache time in seconds
   * @default Infinity
   */
  cacheTime?: number;
}

export const ALL_PERMISSIONS: PermissionType[] = [
  "camera",
  "microphone",
  "mediaLibrary",
  "locationForeground",
  "locationBackground",
  "notifications",
  "contacts",
  "calendar",
  "tracking",
];

export const DEFAULT_CONFIG: Required<PermissionsConfig> = {
  permissions: ALL_PERMISSIONS,
  recheckOnForeground: true,
  autoCheckOnMount: false,
  cacheTime: Infinity,
};
