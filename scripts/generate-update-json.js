#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import os from 'os';
import dotenv from 'dotenv';

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(rootDir, '.env') });

// Read the version from package.json
const packageJsonPath = path.join(rootDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

// Get current date in ISO format
const pubDate = new Date().toISOString();

// GitHub repo details
const repoOwner = 'devbyray';
const repoName = 'circle-camera';

// Get the path to the DMG file
const aarch64DmgPath = path.join(rootDir, 'src-tauri', 'target', 'release', 'bundle', 'dmg', `Circle Camera_${version}_aarch64.dmg`);
console.log(`Looking for DMG file at: ${aarch64DmgPath}`);

// Get the path to the signature file that Tauri auto-generated
const signaturePath = path.join(rootDir, 'src-tauri', 'target', 'release', 'bundle', 'macos', `Circle Camera.app.tar.gz.sig`);
console.log(`Looking for signature file at: ${signaturePath}`);

// Check if the DMG file exists
if (!fs.existsSync(aarch64DmgPath)) {
  console.error(`❌ ARM64 DMG not found at: ${aarch64DmgPath}`);
  process.exit(1);
}

// Check if the signature file exists
if (!fs.existsSync(signaturePath)) {
  console.error(`❌ Signature file not found at: ${signaturePath}`);
  process.exit(1);
}

// Read the signature file
const signature = fs.readFileSync(signaturePath, 'utf8').trim();
console.log(`✅ Found signature for update package`);

// Create the update JSON structure
const updateJson = {
  version,
  notes: `Circle Camera ${version} release`,
  pub_date: pubDate,
  platforms: {
    'darwin-aarch64': {
      signature,
      url: `https://github.com/${repoOwner}/${repoName}/releases/download/v${version}/Circle.Camera_${version}_aarch64.dmg`
    }
  }
};

// Write the file
const outputPath = path.join(rootDir, 'latest.json');
fs.writeFileSync(outputPath, JSON.stringify(updateJson, null, 2), 'utf8');

console.log(`🔄 Created latest.json for version ${version}`);
console.log(`📝 File saved at: ${outputPath}`);
console.log('');
console.log('📋 Release checklist:');
console.log('   1. Build your app for all platforms');
console.log('   2. Upload this latest.json file to your GitHub release');
console.log('   3. Upload your application binaries');
console.log('   4. Make sure file URLs in latest.json match your actual release assets');