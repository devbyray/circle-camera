<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { version as appVersion } from '../../package.json';

// Update the interface to match Tauri's Update type structure
interface UpdateInfo {
  version: string;
  notes?: string;
  date?: string;
  downloadAndInstall: (progressCallback?: (progress: number) => void) => Promise<void>;
}

const updateAvailable = ref(false);
const updateVersion = ref('');
const updateInProgress = ref(false);
const updateError = ref('');
let updateObject = ref<UpdateInfo | null>(null);

// Emit events instead of showing UI directly
const emit = defineEmits(['update-available', 'update-progress', 'update-error', 'update-complete']);

// Determine if we're in development mode, allowing override via environment variable
// You can set VITE_FORCE_UPDATE_DEV_MODE=true or VITE_FORCE_UPDATE_DEV_MODE=false in .env file
const ENV_OVERRIDE = import.meta.env.VITE_FORCE_UPDATE_DEV_MODE;
const DEV_MODE = ENV_OVERRIDE !== undefined 
  ? ENV_OVERRIDE === 'true'
  : import.meta.env.DEV;

// Generate a simulated update version based on the current app version
function generateSimulatedUpdateVersion() {
  // Parse the current version into components (major.minor.patch)
  const versionParts = appVersion.split('.').map(part => parseInt(part, 10));
  
  // Increment the minor version by 1 for the simulated update
  if (versionParts.length >= 2) {
    versionParts[1] += 1;
  } else {
    // Fallback if version format is unexpected
    return '0.3.0'; 
  }
  
  // Return the new version string
  return versionParts.join('.');
}

// Generate the simulated update version
const simulatedVersion = generateSimulatedUpdateVersion();

// Check if we're running in a Tauri context
function isTauriAvailable() {
  return Boolean(window && window.__TAURI__ !== undefined);
}

// Check for updates when the component mounts
onMounted(async () => {
  try {
    console.log('Checking for updates...');
    console.log('Running in development mode:', DEV_MODE);
    console.log('Current app version:', appVersion);
    
    // In DEV_MODE, simulate an update
    if (DEV_MODE) {
      console.log(`DEV MODE: Simulating update notification for version ${simulatedVersion}`);
      setTimeout(() => {
        updateAvailable.value = true;
        updateVersion.value = simulatedVersion;
        // Emit event for parent components to handle
        emit('update-available', {
          version: simulatedVersion,
          notes: `This is a simulated update from version ${appVersion} with new features and improvements.`,
          releaseUrl: `https://github.com/devbyray/circle-camera/releases/tag/${simulatedVersion}`
        });
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
    const updateResult = await check();
    
    if (updateResult) {
      // Create a wrapper that adapts the Tauri Update type to our UpdateInfo interface
      updateObject.value = {
        version: updateResult.version,
        notes: updateResult.body || '',  // Change 'notes' to 'body' which is the correct property
        date: updateResult.date || '',
        downloadAndInstall: (progressCallback?: (progress: number) => void) => {
          return updateResult.downloadAndInstall((event) => {
            // Convert the DownloadEvent to a simple number progress
            if (event.event === 'Progress' && progressCallback && 'data' in event) {
              // Use the chunkLength as a proxy for progress percentage
              // or implement a custom progress calculation
              progressCallback(event.data.chunkLength);
            }
          });
        }
      };
      
      console.log('Update available:', updateObject.value.version);
      updateAvailable.value = true;
      updateVersion.value = updateObject.value.version;
      
      // Emit event for parent components to handle
      emit('update-available', {
        version: updateObject.value.version,
        notes: updateObject.value.notes || 'No release notes available',
        releaseUrl: `https://github.com/devbyray/circle-camera/releases/tag/${updateObject.value.version}`
      });
    } else {
      console.log('No update available');
    }
  } catch (error) {
    console.error('Error checking for updates:', error);
    updateError.value = error instanceof Error ? error.message : String(error);
    emit('update-error', error);
  }
});

// External method that can be called by the parent component
function installUpdate() {
  return handleInstallUpdate();
}

// Function to install the update
async function handleInstallUpdate() {
  if (!updateAvailable.value) return false;
  
  try {
    updateInProgress.value = true;
    emit('update-progress', 0); // Start progress
    
    // In DEV_MODE, simulate installation process
    if (DEV_MODE) {
      console.log(`DEV MODE: Simulating installation of version ${simulatedVersion}`);
      // Simulate download progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        console.log(`Download progress: ${i}%`);
        emit('update-progress', i);
      }
      
      // Show success message
      emit('update-complete');
      updateInProgress.value = false;
      return true;
    }
    
    // Real update installation for production
    if (updateObject.value) {
      // Download and install the update
      await updateObject.value.downloadAndInstall(
        (progress) => {
          console.log('Download progress:', progress);
          emit('update-progress', progress);
        }
      );
      
      // The app will restart after installation, so we won't reach this point
      updateInProgress.value = false;
      return true;
    } else {
      throw new Error('Update object not available');
    }
  } catch (error) {
    console.error('Error installing update:', error);
    updateError.value = error instanceof Error ? error.message : String(error);
    updateInProgress.value = false;
    emit('update-error', error);
    return false;
  }
}

// Expose methods to parent components
defineExpose({ installUpdate });
</script>

<template>
  <!-- No UI rendering in this component anymore, it just emits events -->
</template>