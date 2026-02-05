# expo-permissions-store

A Redux Toolkit (RTK Query) store for managing Expo permissions. Provides a centralized, type-safe way to check and request permissions in your React Native / Expo app.

## Features

- RTK Query-based state management
- Detailed permission state (status, canAskAgain, expires)
- Auto re-check on app foreground
- Flexible exports: use the built-in store or integrate into your own
- Full TypeScript support
- No UI components - just state management

## Installation

```bash
npm install expo-permissions-store
```

### Peer Dependencies

```bash
npm install @reduxjs/toolkit react-redux expo-camera expo-media-library expo-location expo-notifications expo-contacts expo-calendar expo-tracking-transparency
```

> Install only the expo modules you need. Unused permission modules are optional.

## Quick Start

### Option 1: Use the Built-in Store

```tsx
import { Provider } from "react-redux";
import {
  store,
  useGetPermissionQuery,
  useRequestPermissionMutation,
} from "expo-permissions-store";

function App() {
  return (
    <Provider store={store}>
      <MyComponent />
    </Provider>
  );
}

function MyComponent() {
  const { data: cameraPermission, isLoading } = useGetPermissionQuery("camera");
  const [requestPermission] = useRequestPermissionMutation();

  if (isLoading) return <Text>Checking permission...</Text>;

  if (cameraPermission?.status !== "granted") {
    return (
      <Button
        title="Grant Camera Access"
        onPress={() => requestPermission("camera")}
      />
    );
  }

  return <CameraView />;
}
```

### Option 2: Integrate into Your Store

```typescript
import { configureStore } from "@reduxjs/toolkit";
import { permissionsApi } from "expo-permissions-store";

const store = configureStore({
  reducer: {
    // ...your reducers
    [permissionsApi.reducerPath]: permissionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(permissionsApi.middleware),
});
```

### Option 3: Custom Configuration

```typescript
import { createPermissionsApi } from "expo-permissions-store";

const customPermissionsApi = createPermissionsApi({
  // Only include permissions you need
  permissions: ["camera", "microphone", "mediaLibrary"],

  // Disable foreground re-check
  recheckOnForeground: false,
});

// Use in your store
const store = configureStore({
  reducer: {
    [customPermissionsApi.reducerPath]: customPermissionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customPermissionsApi.middleware),
});
```

## API Reference

### Hooks

#### `useGetPermissionQuery(permissionType)`

Check the current status of a permission.

```typescript
const { data, isLoading, error, refetch } = useGetPermissionQuery("camera");
```

Returns:

```typescript
{
  data: {
    status: 'undetermined' | 'granted' | 'denied' | 'limited';
    canAskAgain: boolean;
    expires: 'never' | number;
  } | undefined;
  isLoading: boolean;
  error: Error | undefined;
  refetch: () => void;
}
```

#### `useRequestPermissionMutation()`

Request a permission from the user.

```typescript
const [requestPermission, { isLoading, data, error }] =
  useRequestPermissionMutation();

// Trigger request
await requestPermission("camera");
```

### Permission Types

```typescript
type PermissionType =
  | "camera"
  | "microphone"
  | "mediaLibrary"
  | "locationForeground"
  | "locationBackground"
  | "notifications"
  | "contacts"
  | "calendar"
  | "tracking"; // iOS only
```

### Configuration Options

```typescript
interface PermissionsConfig {
  // Which permissions to include
  // Default: all permissions
  permissions?: PermissionType[];

  // Re-check permissions when app returns to foreground
  // Default: true
  recheckOnForeground?: boolean;

  // Automatically check all permissions on store creation
  // Default: false
  autoCheckOnMount?: boolean;

  // RTK Query cache time in seconds
  // Default: Infinity
  cacheTime?: number;
}
```

## Exports

| Export                         | Description                               |
| ------------------------------ | ----------------------------------------- |
| `store`                        | Pre-configured Redux store                |
| `permissionsApi`               | RTK Query API slice with default config   |
| `createPermissionsApi`         | Factory function for custom configuration |
| `useGetPermissionQuery`        | Hook to check permission status           |
| `useRequestPermissionMutation` | Hook to request permission                |
| `PermissionType`               | Union type of all permission names        |
| `PermissionState`              | Type for permission state object          |
| `PermissionsConfig`            | Type for configuration options            |

## Permission State

Each permission returns a detailed state object:

| Property      | Type                                                   | Description                               |
| ------------- | ------------------------------------------------------ | ----------------------------------------- |
| `status`      | `'undetermined' \| 'granted' \| 'denied' \| 'limited'` | Current permission status                 |
| `canAskAgain` | `boolean`                                              | Whether the app can prompt the user again |
| `expires`     | `'never' \| number`                                    | When the permission expires               |

## Platform Notes

- `tracking` permission is iOS 14+ only. On Android, it returns `granted`.
- `locationBackground` requires `locationForeground` to be granted first.
- `limited` status is iOS 14+ only (for photos).

## License

MIT
