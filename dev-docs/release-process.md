# Circle Camera Release Process

This document details the process for creating and publishing new releases of the Circle Camera app using the local release script.

## Overview

Circle Camera uses a shell script (`scripts/release.sh`) to facilitate the release process locally. This script handles:

1.  Validating the code.
2.  Building the universal macOS DMG installer.
3.  Creating a draft GitHub release with the installer attached.

## Local Release Process

### Prerequisites

Before running the release script, ensure you have the following installed and configured:

*   **Git**: For branch checking and getting the remote URL.
*   **pnpm**: For running validation and build scripts.
*   **jq**: For parsing the version number from `package.json`.
*   **GitHub CLI (`gh`)**: For creating the draft release and uploading assets. You need to be authenticated (`gh auth login`).
*   **Rust toolchain**: With the `x86_64-apple-darwin` and `aarch64-apple-darwin` targets installed (`rustup target add x86_64-apple-darwin`).

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
4.  **Build**: Runs `pnpm tauri build --target universal-apple-darwin` to create the universal DMG.
5.  **Create Draft Release**: Uses `gh release create` to make a draft release on GitHub with the extracted tag.
6.  **Upload Asset**: Uses `gh release upload` to attach the built DMG to the draft release.

## Manual Steps After Script Completion

Once the script finishes successfully:

1.  **Go to GitHub Releases** in the repository.
2.  **Find the draft release** created by the script (e.g., `v0.3.1`).
3.  **Edit the release notes**:
    *   Add a detailed changelog.
    *   List new features, improvements, and bug fixes.
4.  **Review the attached assets**:
    *   Verify the universal DMG is present.
5.  **Publish the release** when ready.

## Testing Before Publishing

Before publishing the release:

1.  Download the macOS DMG from the draft release.
2.  Install and test the application on:
    *   macOS with Apple Silicon (M1/M2/M3)
    *   macOS with Intel processor
3.  Verify that all new features/fixes work correctly.
4.  Test the auto-update mechanism by generating the `latest.json` (this is currently a separate manual step if needed, see `scripts/generate-update-json.js`).

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

## Release Announcements

After publishing a release:

1.  Update the website/documentation with the new version details.
2.  Post announcements on relevant channels.