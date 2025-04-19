#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Configuration ---
EXPECTED_BRANCH="main"
TARGET_BRANCH=${1:-$EXPECTED_BRANCH} # Use first argument as branch override, default to EXPECTED_BRANCH

# --- Branch Check ---
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "$TARGET_BRANCH" ]; then
  echo "Error: Release script must be run on the '$TARGET_BRANCH' branch. Current branch is '$CURRENT_BRANCH'."
  echo "You can override the target branch by passing it as an argument: ./scripts/release.sh <branch_name>"
  exit 1
fi
echo "Running on correct branch: $CURRENT_BRANCH"

# --- Get Version ---
VERSION=$(jq -r .version package.json)
if [ -z "$VERSION" ]; then
    echo "Error: Could not extract version from package.json"
    exit 1
fi
echo "Found version: $VERSION"
TAG="v$VERSION"

# --- Validate ---
echo "Running validation..."
pnpm validate

# --- Build ---
echo "Building universal macOS DMG..."
# Using --target universal-apple-darwin explicitly for clarity
pnpm tauri build --target universal-apple-darwin

# --- Prepare Release Assets ---
# Note: tauri.conf.json productName is "Circle Camera"
PRODUCT_NAME="Circle Camera"
DMG_NAME="${PRODUCT_NAME}_${VERSION}_universal.dmg"
# Corrected path to include the target architecture
DMG_PATH="src-tauri/target/universal-apple-darwin/release/bundle/dmg/$DMG_NAME"

if [ ! -f "$DMG_PATH" ]; then
    echo "Error: Built DMG file not found at $DMG_PATH"
    exit 1
fi
echo "DMG file found: $DMG_PATH"

# --- Create GitHub Draft Release ---
echo "Creating draft release $TAG on GitHub..."

# Check if release already exists
if gh release view "$TAG" > /dev/null 2>&1; then
  echo "Warning: Release $TAG already exists. Skipping creation, attempting to upload assets."
  # Optionally, delete existing assets or the release itself if needed
  # gh release delete "$TAG" -y
else
  gh release create "$TAG" \
    --draft \
    --title "$VERSION" \
    --notes "Draft release for version $VERSION."
  echo "Draft release $TAG created."
fi

echo "Uploading asset: $DMG_PATH"
gh release upload "$TAG" "$DMG_PATH" --clobber

echo "Successfully created draft release $TAG and uploaded $DMG_NAME."
# Use gh repo view to reliably get owner/repo
REPO_FULL_NAME=$(gh repo view --json owner,name --jq '.owner.login + "/" + .name')
echo "Please review the draft release on GitHub: https://github.com/$REPO_FULL_NAME/releases/edit/$TAG"

