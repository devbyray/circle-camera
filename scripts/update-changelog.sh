#!/bin/bash

# Script to update CHANGELOG.md with the latest GitHub releases
# Usage: ./scripts/update-changelog.sh

set -e

# Repository information
REPO_OWNER="devbyray"
REPO_NAME="circle-camera"

# File paths
CHANGELOG_FILE="CHANGELOG.md"
TEMP_FILE="/tmp/changelog_temp.md"

echo "Fetching latest releases from GitHub..."

# Get all releases from GitHub in a more detailed format that's easier to parse
LATEST_RELEASES=$(gh release list --repo ${REPO_OWNER}/${REPO_NAME} --limit 10 --json tagName,publishedAt,name,isLatest)

if [ $? -ne 0 ]; then
  echo "Error: Failed to fetch releases from GitHub. Make sure you're authenticated with 'gh auth login'."
  exit 1
fi

# Create the header of the CHANGELOG
cat > $TEMP_FILE << EOF
# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

EOF

# Sort releases by publishedAt in descending order (newest first)
echo "$LATEST_RELEASES" | jq 'sort_by(.publishedAt) | reverse' > /tmp/sorted_releases.json

# Process each release from the sorted JSON output
cat /tmp/sorted_releases.json | jq -c '.[]' | while read -r release; do
  # Extract tag name and published date from the JSON
  TAG=$(echo $release | jq -r '.tagName')
  PUBLISHED_AT=$(echo $release | jq -r '.publishedAt')
  
  # Format the date to a more readable format (YYYY-MM-DD)
  DATE=$(date -u -j -f "%Y-%m-%dT%H:%M:%SZ" "$PUBLISHED_AT" "+%Y-%m-%d" 2>/dev/null || echo "$PUBLISHED_AT")
  
  # Extract version number without the 'v' prefix for the CHANGELOG if it exists
  VERSION=${TAG#v}
  
  if [ -n "$TAG" ]; then
    echo "Processing release $VERSION (tag: $TAG) from $DATE"
    
    # Write version header to temp file
    echo "## $VERSION ($DATE)" >> $TEMP_FILE
    echo -e "\n" >> $TEMP_FILE
    
    # Get detailed release information including body content
    RELEASE_BODY=$(gh release view "$TAG" --repo ${REPO_OWNER}/${REPO_NAME} --json body -q '.body')
    
    if [ $? -ne 0 ] || [ -z "$RELEASE_BODY" ] || [ "$RELEASE_BODY" == "null" ]; then
      echo "No release notes found for $TAG" >&2
      continue
    fi
    
    # Process features section
    if [[ "$RELEASE_BODY" == *"### Features"* ]] || [[ "$RELEASE_BODY" == *"feat:"* ]] || [[ "$RELEASE_BODY" == *"Features"* ]]; then
      echo "### Features" >> $TEMP_FILE
      echo -e "\n" >> $TEMP_FILE
      
      # Try different patterns to extract feature content
      if [[ "$RELEASE_BODY" == *"### Features"* ]]; then
        # Extract content between ### Features and the next heading
        FEATURES=$(echo "$RELEASE_BODY" | sed -n '/### Features/,/^###/p' | sed '1d;/^###/d')
        echo "$FEATURES" >> $TEMP_FILE
      elif [[ "$RELEASE_BODY" == *"feat:"* ]]; then
        # Extract lines containing feat:
        echo "$RELEASE_BODY" | grep -E '^\* feat:|^- feat:' | sed 's/^\* feat:/*/g' | sed 's/^- feat:/*/g' >> $TEMP_FILE
      fi
      
      echo -e "\n" >> $TEMP_FILE
    fi
    
    # Process bug fixes section
    if [[ "$RELEASE_BODY" == *"### Bug Fixes"* ]] || [[ "$RELEASE_BODY" == *"fix:"* ]] || [[ "$RELEASE_BODY" == *"Bug Fixes"* ]]; then
      echo "### Bug Fixes" >> $TEMP_FILE
      echo -e "\n" >> $TEMP_FILE
      
      # Try different patterns to extract bugfix content
      if [[ "$RELEASE_BODY" == *"### Bug Fixes"* ]]; then
        # Extract content between ### Bug Fixes and the next heading
        BUGFIXES=$(echo "$RELEASE_BODY" | sed -n '/### Bug Fixes/,/^###/p' | sed '1d;/^###/d')
        echo "$BUGFIXES" >> $TEMP_FILE
      elif [[ "$RELEASE_BODY" == *"fix:"* ]]; then
        # Extract lines containing fix:
        echo "$RELEASE_BODY" | grep -E '^\* fix:|^- fix:' | sed 's/^\* fix:/*/g' | sed 's/^- fix:/*/g' >> $TEMP_FILE
      fi
      
      echo -e "\n" >> $TEMP_FILE
    fi
    
    # Check for pull requests in the body that don't already include feature or bugfix markers
    if [[ "$RELEASE_BODY" == *"by @"* ]]; then
      # Extract pull request lines that aren't already captured in Features or Bug Fixes sections
      PR_CONTENT=$(echo "$RELEASE_BODY" | grep "by @" | grep -v "Full Changelog" | grep -v "feat:" | grep -v "fix:")
      if [ -n "$PR_CONTENT" ]; then
        echo "$PR_CONTENT" >> $TEMP_FILE
        echo -e "\n" >> $TEMP_FILE
      fi
    fi
    
    # Check for changelog URL
    if [[ "$RELEASE_BODY" == *"Full Changelog"* ]]; then
      # Extract the full changelog line
      CHANGELOG_URL=$(echo "$RELEASE_BODY" | grep "Full Changelog")
      echo "$CHANGELOG_URL" >> $TEMP_FILE
      echo -e "\n" >> $TEMP_FILE
    fi
  fi
done

# Remove duplicate empty lines
cat $TEMP_FILE | sed '/^$/N;/^\n$/D' > "${TEMP_FILE}.clean"
mv "${TEMP_FILE}.clean" $TEMP_FILE

# Replace original CHANGELOG with new one
mv $TEMP_FILE $CHANGELOG_FILE

echo "CHANGELOG.md has been updated with the latest releases."