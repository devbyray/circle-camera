<script setup lang="ts">
// Import version directly from package.json
import { version as appVersion } from '../../package.json';
// Import the invoke function from Tauri API
import { invoke } from '@tauri-apps/api/core';

const repoUrl = 'https://circlecamera.com';

// Function to open the website
async function openWebsite() {
  console.log('Opening website:', repoUrl);
  try {
    console.log('Attempting to use custom open_url command...');
    // Use the invoke method to call our custom command
    // This should work more reliably
    await invoke('open_url', { url: repoUrl });
    console.log('Custom open_url command completed');
  } catch (error) {
    console.error('Error opening website with Tauri API:', error);
    // Fallback to window.open if Tauri API fails
    try {
      console.log('Attempting fallback with window.open...');
      window.open(repoUrl, '_blank');
      console.log('window.open call completed');
    } catch (e) {
      console.error('Fallback also failed:', e);
    }
  }
}
</script>

<template>
  <div class="branding-bar">
    <button class="branding" @click="openWebsite">
      <img src="/icon.svg" alt="Circle Camera Logo" class="logo" />
      <div class="app-info">
        <div class="app-name">Circle Camera</div>
        <div class="app-version">v{{ appVersion }}</div>
      </div>
    </button>
  </div>
</template>

<style scoped>
.branding-bar {
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 100;
}

.branding {
  display: flex;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 0;
}

.branding:hover {
  background-color: rgba(168, 177, 255, 0.7);
}

.logo {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.app-info {
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: flex-start;
}

.app-info,
.app-version {
  line-height: 12px;
}

.app-name {
  font-size: 12px;
  font-weight: 500;
  color: white;
}

.app-version {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
}

/* Branding visibility is controlled by the parent component */
</style>
