import { configureStore } from "@reduxjs/toolkit";
import { permissionsApi } from "./api";

/**
 * Pre-configured store with permissions API
 * Use this for quick setup without integrating into an existing store
 */
export const store = configureStore({
  reducer: {
    [permissionsApi.reducerPath]: permissionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(permissionsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
