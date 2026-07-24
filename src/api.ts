import type { PermissionsApi } from "./createApi";
import { createPermissionsApi } from "./createApi";

/**
 * Pre-configured permissions API with default settings
 */
export const permissionsApi: PermissionsApi = createPermissionsApi();

export const {
  useGetPermissionQuery,
  useLazyGetPermissionQuery,
  useRequestPermissionMutation,
  usePrefetch,
} = permissionsApi;
