<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { version as appVersion } from '../../package.json';

const updateAvailable = ref(false);
const updateVersion = ref('');
const updateInProgress = ref(false);
const updateError = ref('');
let updateObject = ref<any | null>(null);

// Development mode flag - set to true to simulate an update notification in dev mode
const DEV_MODE = true;

// Check if we're running in a Tauri context
function isTauriAvailable() {
  return Boolean(window && window.__TAURI__ !== undefined);
}

// Check for updates when the component mounts
onMounted(async () => {
  try {
    console.log('Checking for updates...');
    
    // In DEV_MODE, show a simulated update
    if (DEV_MODE) {
      console.log('DEV MODE: Simulating update notification');
      setTimeout(() => {
        updateAvailable.value = true;
        updateVersion.value = '0.3.0';
      }, 2000); // Delay for 2 seconds to simulate network request
      return;
    }
    
    // First check if Tauri is available
    if (!isTauriAvailable()) {
      console.log('Tauri API not available - skipping update check');
      return;
    }
    
    // Safe imports with proper error handling
    let getVersion;
    let check;
    
    try {
      const appModule = await import('@tauri-apps/api/app');
      getVersion = appModule.getVersion;
    } catch (error) {
      console.error('Failed to import app module:', error);
      updateError.value = 'Failed to initialize app module';
      return;
    }
    
    try {
      const updaterModule = await import('@tauri-apps/plugin-updater');
      check = updaterModule.check;
    } catch (error) {
      console.error('Failed to import updater module:', error);
      updateError.value = 'Failed to initialize updater module';
      return;
    }
    
    // Only proceed if all required functions are available
    if (typeof getVersion !== 'function' || typeof check !== 'function') {
      console.error('Required Tauri functions not available');
      updateError.value = 'Update API not available';
      return;
    }
    
    // Get the current app version
    const currentVersion = await getVersion();
    console.log('Current app version:', currentVersion);
    
    // Check for updates
    const update = await check();
    updateObject.value = update;
    
    if (update) {
      console.log('Update available:', update.version);
      updateAvailable.value = true;
      updateVersion.value = update.version;
    } else {
      console.log('No update available');
    }
  } catch (error) {
    console.error('Error checking for updates:', error);
    updateError.value = error instanceof Error ? error.message : String(error);
  }
});

// Function to install the update
async function handleInstallUpdate() {
  if (!updateAvailable.value) return;
  
  try {
    updateInProgress.value = true;
    console.log('Starting update installation...');
    
    // In DEV_MODE, simulate installation process
    if (DEV_MODE) {
      console.log('DEV MODE: Simulating update installation');
      // Simulate download progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        console.log(`Download progress: ${i}%`);
      }
      
      // Show success message
      alert('Update installed successfully! App would restart in production.');
      updateInProgress.value = false;
      return;
    }
    
    // Real update installation for production
    if (updateObject.value) {
      // Download and install the update
      await updateObject.value.downloadAndInstall();
    } else {
      throw new Error('Update object not available');
    }
    
    // The app will restart after installation, so we won't reach this point
    updateInProgress.value = false;
  } catch (error) {
    console.error('Error installing update:', error);
    updateError.value = error instanceof Error ? error.message : String(error);
    updateInProgress.value = false;
  }
}
</script>

<template>
  <div v-if="updateAvailable" class="update-notification">
    <div class="update-message">
      <span>New version {{ updateVersion }} available!</span>
      <button 
        @click="handleInstallUpdate" 
        :disabled="updateInProgress"
        class="update-button"
      >
        {{ updateInProgress ? 'Updating...' : 'Update Now' }}
      </button>
    </div>
    <div v-if="updateError" class="update-error">{{ updateError }}</div>
  </div>
</template>

<style scoped>
.update-notification {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 8px 12px;
  z-index: 1000;
  max-width: 250px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.update-message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  color: white;
  font-size: 12px;
}

.update-button {
  background-color: #4c7af0;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;
}

.update-button:hover:not(:disabled) {
  background-color: #5c8aff;
}

.update-button:disabled {
  background-color: #4c7af080;
  cursor: not-allowed;
}

.update-error {
  color: #ff6b6b;
  font-size: 10px;
  margin-top: 4px;
}
</style>