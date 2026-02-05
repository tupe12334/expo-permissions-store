// Types
export type {
  PermissionType,
  PermissionStatus,
  PermissionState,
  PermissionsConfig,
} from "./types";
export { ALL_PERMISSIONS, DEFAULT_CONFIG } from "./types";

// API factory
export { createPermissionsApi, type PermissionsApi } from "./createApi";

// Pre-configured API and hooks
export {
  permissionsApi,
  useGetPermissionQuery,
  useLazyGetPermissionQuery,
  useRequestPermissionMutation,
  usePrefetch,
} from "./api";

// Pre-configured store
export { store, type RootState, type AppDispatch } from "./store";

// Utilities
export { setupForegroundListener } from "./foreground";
