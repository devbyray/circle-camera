# Circle Camera Update System

This document explains how the automatic update system works in Circle Camera and how to maintain it as a developer.

## Overview

Circle Camera uses Tauri's updater plugin to provide automatic updates to users. The system consists of several components:

1. **Update Configuration**: Defined in `tauri.conf.json` 
2. **Update JSON Generator**: Script that creates `latest.json` for releases
3. **UI Components**: Components that handle the update notification and installation
4. **Development Mode**: Simulated updates for testing during development

## Update Flow

Here's the general flow of how updates work:

1. When the app starts, it checks for updates by fetching a `latest.json` file from a configured endpoint
2. If a newer version is available, a green update icon appears in the app UI
3. When the user clicks this icon, they see an overlay with release information
4. The user can then choose to install the update, view release notes, or skip the update
5. If they choose to install, the app downloads the appropriate binary and installs it
6. The app then restarts with the new version

## Components

### 1. Configuration in `tauri.conf.json`

The update endpoint is configured in `src-tauri/tauri.conf.json`:

```json
"plugins": {
  "updater": {
    "active": true,
    "endpoints": [
      "https://github.com/devbyray/circle-camera/releases/latest/download/latest.json"
    ],
    "dialog": true,
    "pubkey": ""
  }
}
```

- `active`: Enables the update functionality
- `endpoints`: URLs where the app will look for the `latest.json` file
- `dialog`: When true, shows a dialog for secure update confirmations
- `pubkey`: For signed updates (recommended for production)

### 2. Update JSON Generator

The `scripts/generate-update-json.js` script generates a `latest.json` file with information about the latest release, including download URLs for each platform.

Run this script after building a new version:

```bash
pnpm generate:update-json
```

### 3. UI Components

Several Vue components work together to provide the update experience:

- **UpdateChecker.vue**: Handles checking for updates and communicating with the Tauri API
- **WebcamContainer.vue**: Manages the update state and coordinates between components
- **WindowControls.vue**: Displays the update icon when an update is available
- **UpdateOverlay.vue**: Shows update details and options when the icon is clicked

### 4. Development Mode

During development, the update system uses a simulated mode:
- It automatically detects development mode using `import.meta.env.DEV`
- It simulates an update notification with a version newer than the current app version
- It shows a simulated download progress when installing
- This allows testing the UI without needing actual update packages

## Testing Updates

To test the update system:

### In Development Mode

Updates are automatically simulated:

1. Run the app in development: `pnpm tauri dev`
2. After a few seconds, the update icon should appear
3. Click it to see the update overlay
4. Test the installation simulation

### With Local Server

For more accurate testing:

1. Build your app: `pnpm tauri build`
2. Create a `latest.json` file with a version higher than your current app
3. Run the local test server: `pnpm serve:update`
4. Launch your built app (not in dev mode)
5. It should detect the update from your local server

## Production Release Process

When releasing a new version:

1. Update the version in both `package.json` and `tauri.conf.json`
2. Build the app for all target platforms: `pnpm tauri build`
3. Generate the update JSON: `pnpm generate:update-json`
4. Create a GitHub release with the new version tag
5. Upload the app binaries and the `latest.json` file to the release
6. Existing users will get the update notification the next time they launch their app

## Security Considerations

For production releases, it's recommended to sign your updates:

1. Generate a key pair for signing
2. Set the public key in the `pubkey` field in `tauri.conf.json`
3. Sign your updates with the private key
4. This prevents unauthorized updates from being installed

## Troubleshooting

If users report issues with updates:

1. Verify that `latest.json` is accessible at the configured endpoint
2. Confirm that the version in `latest.json` is actually newer than the user's version
3. Check that the download URLs in `latest.json` are correct for each platform
4. Verify that GitHub release assets are publicly accessible
5. Look for errors in the application logs