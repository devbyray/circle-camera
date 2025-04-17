#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read the version from package.json
const packageJsonPath = path.join(rootDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

// Get current date in ISO format
const pubDate = new Date().toISOString();

// GitHub repo details
const repoOwner = 'devbyray';
const repoName = 'circle-camera';

// Create the update JSON structure
const updateJson = {
  version,
  notes: `Circle Camera ${version} release`,
  pub_date: pubDate,
  platforms: {
    'darwin-x86_64': {
      signature: '',
      url: `https://github.com/${repoOwner}/${repoName}/releases/download/${version}/Circle.Camera_${version}_x64.dmg`
    },
    'darwin-aarch64': {
      signature: '',
      url: `https://github.com/${repoOwner}/${repoName}/releases/download/${version}/Circle.Camera_${version}_aarch64.dmg`
    },
    // 'windows-x86_64': {
    //   signature: '',
    //   url: `https://github.com/${repoOwner}/${repoName}/releases/download/${version}/Circle.Camera_${version}_x64-setup.exe`
    // }
  }
};

// Write the file
const outputPath = path.join(rootDir, 'latest.json');
fs.writeFileSync(outputPath, JSON.stringify(updateJson, null, 2), 'utf8');

console.log(`🔄 Created latest.json for version ${version}`);
console.log(`📝 File saved at: ${outputPath}`);
console.log('');
console.log('⚠️ Important: For secure updates, add signatures to the JSON file.');
console.log('   See: https://tauri.app/v2/guides/distribution/updater');
console.log('');
console.log('📋 Release checklist:');
console.log('   1. Build your app for all platforms');
console.log('   2. Upload this latest.json file to your GitHub release');
console.log('   3. Upload your application binaries');
console.log('   4. Make sure file URLs in latest.json match your actual release assets');