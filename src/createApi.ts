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

          const result = await getPermission(permissionType);
          if (result.error) {
            return {
              error: {
                status: "CUSTOM_ERROR",
                error: result.error,
              },
            };
          }
          return { data: result.data };
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

          const result = await requestPermission(permissionType);
          if (result.error) {
            return {
              error: {
                status: "CUSTOM_ERROR",
                error: result.error,
              },
            };
          }
          return { data: result.data };
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
