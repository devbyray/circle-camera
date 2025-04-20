#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';
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

// Function to find the private key - use env var first, then fallback to standard locations
function findPrivateKey() {
  // First check the environment variable from .env
  if (process.env.TAURI_SIGNING_PRIVATE_KEY) {
    const envKeyPath = process.env.TAURI_SIGNING_PRIVATE_KEY;
    if (fs.existsSync(envKeyPath)) {
      console.log(`Using key from TAURI_SIGNING_PRIVATE_KEY: ${envKeyPath}`);
      return envKeyPath;
    } else {
      console.warn(`⚠️ Key specified in TAURI_SIGNING_PRIVATE_KEY not found: ${envKeyPath}`);
    }
  }

  // Fallback to standard locations
  const projectKeyPath = path.join(rootDir, '.tauri', 'circle-camera.key');
  const userKeyPath = path.join(os.homedir(), '.tauri', 'circle-camera.key');
  
  if (fs.existsSync(projectKeyPath)) {
    console.log(`Using project key at: ${projectKeyPath}`);
    return projectKeyPath;
  } else if (fs.existsSync(userKeyPath)) {
    console.log(`Using user key at: ${userKeyPath}`);
    return userKeyPath;
  } else {
    console.error('❌ No private key found. Please check:');
    console.error(`  1. TAURI_SIGNING_PRIVATE_KEY in .env file`);
    console.error(`  2. ${projectKeyPath}`);
    console.error(`  3. ${userKeyPath}`);
    return null;
  }
}

// Function to manually sign DMG files using Tauri signer CLI directly
function generateSignature(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return '';
  }

  try {
    const keyPath = findPrivateKey();
    if (!keyPath) {
      throw new Error('No private key found');
    }

    // Run the tauri CLI with explicit key path
    console.log(`Signing file: ${filePath}`);
    
    let command = `npx --yes @tauri-apps/cli signer sign -k "${keyPath}" "${filePath}"`;
    
    // Add password if provided in environment variables
    if (process.env.TAURI_SIGNING_PRIVATE_KEY_PASSWORD) {
      command = `npx --yes @tauri-apps/cli signer sign -k "${keyPath}" -p "${process.env.TAURI_SIGNING_PRIVATE_KEY_PASSWORD}" "${filePath}"`;
    }
    
    const signature = execSync(
      command,
      { encoding: 'utf8', stdio: ['inherit', 'pipe', 'inherit'] }
    ).trim();
    
    console.log(`✅ Generated signature for ${path.basename(filePath)}`);
    return signature;
  } catch (error) {
    console.error(`❌ Failed to generate signature: ${error.message}`);
    return '';
  }
}

// Get the DMG paths - FIXED PATH to point to correct location
const aarch64DmgPath = path.join(rootDir, 'src-tauri', 'target', 'release', 'bundle', 'dmg', `Circle Camera_${version}_aarch64.dmg`);

console.log(`Looking for DMG file at: ${aarch64DmgPath}`);

// Generate signatures for available files
let aarch64Signature = '';

if (fs.existsSync(aarch64DmgPath)) {
  aarch64Signature = generateSignature(aarch64DmgPath);
} else {
  console.error(`❌ ARM64 DMG not found at: ${aarch64DmgPath}`);
  process.exit(1); // Exit if the main DMG file is not found
}

// Create the update JSON structure
const updateJson = {
  version,
  notes: `Circle Camera ${version} release`,
  pub_date: pubDate,
  platforms: {}
};

// Add platforms based on available builds
if (aarch64Signature) {
  updateJson.platforms['darwin-aarch64'] = {
    signature: aarch64Signature,
    url: `https://github.com/${repoOwner}/${repoName}/releases/download/v${version}/Circle.Camera_${version}_aarch64.dmg`
  };
}

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