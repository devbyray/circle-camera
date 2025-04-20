# Circle Camera Release Process

This document details the process for creating and publishing new releases of the Circle Camera app using the local release script.

## Overview

Circle Camera uses a shell script (`scripts/release.sh`) to facilitate the release process locally. This script handles:

1.  Validating the code.
2.  Verifying signing keys are in place.
3.  Building the universal macOS DMG installer with proper code signing.
4.  Generating the update information with signatures.
5.  Creating a draft GitHub release with the installer and update file attached.

## Local Release Process

### Prerequisites

Before running the release script, ensure you have the following installed and configured:

*   **Git**: For branch checking and getting the remote URL.
*   **pnpm**: For running validation and build scripts.
*   **jq**: For parsing the version number from `package.json`.
*   **GitHub CLI (`gh`)**: For creating the draft release and uploading assets. You need to be authenticated (`gh auth login`).
*   **Rust toolchain**: With the `x86_64-apple-darwin` and `aarch64-apple-darwin` targets installed (`rustup target add x86_64-apple-darwin`).
*   **Tauri signing keys**: Required for the update system (see "Setting up Signing Keys" section below).

### Setting up Signing Keys

The update system requires cryptographic keys for signing and verifying app updates:

1. **Generate the key pair** (only once):
   ```
   npx @tauri-apps/cli signer generate -w ~/.tauri/circle-camera.key
   ```

2. **Verify the keys exist**:
   ```
   ls -la ~/.tauri/circle-camera.key*
   ```
   You should see both `circle-camera.key` (private key) and `circle-camera.key.pub` (public key).

3. **Configure environment variables**: Add to your `.env` file or shell profile:
   ```
   export TAURI_SIGNING_PRIVATE_KEY=~/.tauri/circle-camera.key
   ```

4. **Verify the public key in config**: Ensure `src-tauri/tauri.conf.json` contains the correct public key from `~/.tauri/circle-camera.key.pub` in the `plugins.updater.pubkey` field.

### Triggering a New Release

To create a new release:

1.  **Ensure you are on the `main` branch.** The script checks this by default.
2.  **Update version numbers**: Increment the version in:
    *   `package.json`
    *   `src-tauri/tauri.conf.json`
3.  **Commit and push** these changes.
4.  **Run the release script**: `pnpm run release` (or directly `./scripts/release.sh`).

### Version Numbering

Circle Camera follows [Semantic Versioning](https://semver.org/) (SemVer):

- **X.Y.Z** format where:
  - **X** is the major version (breaking changes)
  - **Y** is the minor version (new features, non-breaking)
  - **Z** is the patch version (bug fixes)

Example: `0.3.0` → `0.3.1` for a patch release.

### The Release Script (`scripts/release.sh`)

The script performs the following steps:

1.  **Branch Check**: Verifies you are on the `main` branch (can be overridden for testing: `./scripts/release.sh <branch-name>`).
2.  **Get Version**: Extracts the version from `package.json` to create the tag (e.g., `v0.3.1`).
3.  **Validate**: Runs `pnpm validate` (checks TypeScript and Rust code).
4.  **Signing Key Check**: Verifies that the required signing keys exist.
5.  **Environment Variable Setup**: Ensures the `TAURI_SIGNING_PRIVATE_KEY` environment variable is set.
6.  **Build**: Runs `pnpm tauri build --target universal-apple-darwin` to create the universal DMG with embedded public key.
7.  **Generate Update Information**: Runs `pnpm generate:update-json` to create the `latest.json` file with signatures for the update system.
8.  **Create Draft Release**: Uses `gh release create` to make a draft release on GitHub with the extracted tag.
9.  **Upload Assets**: Uploads both the built DMG and `latest.json` to the draft release.

## Auto-Update System

The Circle Camera app includes an auto-update system that checks for new releases and can download and install them automatically. This system requires:

1. **Proper Signing**: Each release must be signed using the private key.
2. **Update Information**: The `latest.json` file must be generated and uploaded to the release.
3. **Public Key Distribution**: The app must be built with the public key embedded.

The release script handles all these requirements automatically, but it's important to understand how they work if you need to troubleshoot issues.

### Update Flow

1. When the app starts, it checks the URL specified in `tauri.conf.json` (`plugins.updater.endpoints`) for the `latest.json` file.
2. If a newer version is found, the app downloads the update package.
3. The signature in the `latest.json` file is verified using the embedded public key.
4. If verification succeeds, the app offers to install the update.

## Manual Steps After Script Completion

Once the script finishes successfully:

1.  **Go to GitHub Releases** in the repository.
2.  **Find the draft release** created by the script (e.g., `v0.3.1`).
3.  **Edit the release notes**:
    *   Add a detailed changelog.
    *   List new features, improvements, and bug fixes.
4.  **Review the attached assets**:
    *   Verify the universal DMG is present.
    *   Verify the `latest.json` file is present with correct signatures.
5.  **Publish the release** when ready.

## Testing Before Publishing

Before publishing the release:

1.  Download the macOS DMG from the draft release.
2.  Install and test the application on:
    *   macOS with Apple Silicon (M1/M2/M3)
    *   macOS with Intel processor
3.  Verify that all new features/fixes work correctly.
4.  Test the auto-update mechanism:
    *   Install an older version of the app.
    *   Publish the new release.
    *   Verify that the older version detects and can update to the new version.

## Troubleshooting the Update System

If updates aren't working correctly:

1. **Check the public key**: Ensure the public key in `tauri.conf.json` matches the actual public key at `~/.tauri/circle-camera.key.pub`.
2. **Verify signatures**: Check that the `latest.json` file contains valid signatures.
3. **Validate endpoints**: Make sure the update endpoint in `tauri.conf.json` points to the correct location where `latest.json` is hosted.
4. **Debug logging**: Enable verbose logging in the app to see the update process in detail.

## Platform Support

Currently, Circle Camera officially supports:
- macOS (Universal - Apple Silicon & Intel)

Windows is not officially supported or built by the release script.

## Handling Hotfixes

For emergency fixes:

1.  Create a branch from the latest release tag.
2.  Fix the issue and update the version number (e.g., `X.Y.Z+1`) in `package.json` and `tauri.conf.json`.
3.  Commit, push, and merge to `main`.
4.  Run the release script from the `main` branch: `pnpm run release`.

## Troubleshooting Release Issues

If the release script fails:

1.  Check the script's output for specific error messages.
2.  Common issues include:
    *   Missing prerequisites (`jq`, `gh`).
    *   `gh` CLI not authenticated.
    *   Rust build errors (check `pnpm validate` output).
    *   Incorrect Git branch.
    *   Network issues during GitHub API calls.
    *   Missing or incorrect signing keys.
    *   Environment variables not set correctly.

## Signing Key Security

The private signing key is critical for the security of your update system:

1. **Never commit the private key** to version control.
2. **Limit access** to only trusted release maintainers.
3. **Back up the private key** securely - losing it means you'll need to create a new key pair and users will need to reinstall the app.
4. **Consider password protection** for the private key when generating it.

## Release Announcements

After publishing a release:

1.  Update the website/documentation with the new version details.
2.  Post announcements on relevant channels.