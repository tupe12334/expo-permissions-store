import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  PermissionsConfig,
  PermissionState,
  PermissionType,
} from "./types";
import { DEFAULT_CONFIG } from "./types";
import { getPermission, requestPermission } from "./permissions/handlers";

export function createPermissionsApi(config: PermissionsConfig = {}) {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  const api = createApi({
    reducerPath: "permissionsApi",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Permission"],
    endpoints: (builder) => ({
      getPermission: builder.query<PermissionState, PermissionType>({
        queryFn: async (permissionType) => {
          if (!mergedConfig.permissions.includes(permissionType)) {
            return {
              error: {
                status: "CUSTOM_ERROR",
                error: `Permission "${permissionType}" is not configured`,
              },
            };
          }

          try {
            const data = await getPermission(permissionType);
            return { data };
          } catch (error) {
            return {
              error: {
                status: "CUSTOM_ERROR",
                error: error instanceof Error ? error.message : "Unknown error",
              },
            };
          }
        },
        providesTags: (_, __, permissionType) => [
          { type: "Permission", id: permissionType },
        ],
        keepUnusedDataFor: mergedConfig.cacheTime,
      }),

      requestPermission: builder.mutation<PermissionState, PermissionType>({
        queryFn: async (permissionType) => {
          if (!mergedConfig.permissions.includes(permissionType)) {
            return {
              error: {
                status: "CUSTOM_ERROR",
                error: `Permission "${permissionType}" is not configured`,
              },
            };
          }

          try {
            const data = await requestPermission(permissionType);
            return { data };
          } catch (error) {
            return {
              error: {
                status: "CUSTOM_ERROR",
                error: error instanceof Error ? error.message : "Unknown error",
              },
            };
          }
        },
        invalidatesTags: (_, __, permissionType) => [
          { type: "Permission", id: permissionType },
        ],
      }),
    }),
  });

  return {
    ...api,
    config: mergedConfig,
  };
}

export type PermissionsApi = ReturnType<typeof createPermissionsApi>;
