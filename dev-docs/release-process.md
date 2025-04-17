# Circle Camera Release Process

This document details the process for creating and publishing new releases of the Circle Camera app.

## Overview

Circle Camera uses an automated GitHub Actions workflow to build, package, and release the application. The workflow is designed to:

1. Detect version changes
2. Build installers for supported platforms (macOS only)
3. Generate update information
4. Create a draft GitHub release

## Automated Release Process

### Triggering a New Release

A new release is automatically triggered whenever a change to the version number is detected in:
- `package.json`
- `src-tauri/tauri.conf.json`

When a PR that includes version changes is merged to the `main` branch, the GitHub Actions workflow will automatically start.

### Version Numbering

Circle Camera follows [Semantic Versioning](https://semver.org/) (SemVer):

- **X.Y.Z** format where:
  - **X** is the major version (breaking changes)
  - **Y** is the minor version (new features, non-breaking)
  - **Z** is the patch version (bug fixes)

Example: `0.2.0` → `0.3.0` for a minor version with new features

### Version Update Checklist

When preparing a release:

1. **Update both version files**:
   - `package.json`: Update the `"version"` field
   - `src-tauri/tauri.conf.json`: Update the version in the `"package"` section

2. **Create a PR** with these changes and any other code changes for the release

3. **Merge to main** after review and approval

## GitHub Actions Workflow

The workflow (defined in `.github/workflows/release.yml`) performs these steps:

1. **Check Version**: Compares current and previous versions
2. **Build macOS Installers**: 
   - Builds for Apple Silicon (M1/M2) architecture
   - Builds for Intel architecture
3. **Generate Update JSON**: Creates the `latest.json` file for auto-updates
4. **Create Release**:
   - Makes a draft GitHub release
   - Uploads installers and `latest.json`
   - Prepares release notes template

## Manual Steps After Automation

Once the GitHub Actions workflow completes, you need to:

1. **Go to GitHub Releases** in the repository
2. **Find the draft release** created by the workflow
3. **Edit the release notes**:
   - Replace the template with actual changelog details
   - List new features, improvements, and bug fixes
4. **Review the attached assets**:
   - Verify that all installers are present
   - Check that `latest.json` is included and correct
5. **Publish the release** when ready

## Testing Before Publishing

Before publishing the release:

1. Download the macOS installers from the draft release
2. Install and test the application on:
   - macOS with Apple Silicon (M1/M2)
   - macOS with Intel processor
3. Verify that all new features work correctly
4. Test the auto-update mechanism (if relevant)

## Update System Verification

To verify the update system:

1. Ensure the previous version of the app is installed
2. Publish the release
3. Open the previous version and ensure it detects the update
4. Test the update installation process

## Platform Support

Currently, Circle Camera officially supports:
- macOS (Apple Silicon)
- macOS (Intel)

Windows is not officially supported at this time. If Windows support is added in the future, the GitHub workflow comments can be uncommented to enable Windows builds.

## Handling Hotfixes

For emergency fixes:

1. Create a branch from the latest release tag
2. Fix the issue and update version to `X.Y.Z+1`
3. Create PR and merge to main
4. The workflow will create a new draft release automatically

## Troubleshooting Release Issues

If the GitHub Actions workflow fails:

1. Check the workflow logs for errors
2. Common issues include:
   - Rust build errors
   - Missing dependencies
   - Permission issues with GitHub tokens
   - Incorrect artifact paths

## Release Announcements

After publishing a release:

1. Update the website with the new version details
2. Post announcements on relevant channels
3. Update documentation if user-facing changes were made

## Reverting Releases

In case a critical issue is found in a release:

1. Create a new release with the fix
2. Do not delete the problematic release (to maintain version continuity)
3. Mark the problematic release as "pre-release" and add a warning in its notes