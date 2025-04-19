<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { getAvailableCameras } from '../utils/cameraUtils';
import { startDrag } from '../utils/windowUtils';
import WebcamCircle from './WebcamCircle.vue';
import WindowControls from './WindowControls.vue';
import MenuBar from './MenuBar.vue';
import BrandingBar from './BrandingBar.vue';
import ColorPickerOverlay from './ColorPickerOverlay.vue';
import UpdateChecker from './UpdateChecker.vue';
import UpdateOverlay from './UpdateOverlay.vue';

// State
const availableCameras = ref<MediaDeviceInfo[]>([]);
const selectedCameraId = ref<string>('');
const errorMessage = ref("");
const cameraSize = ref(300);

// Camera appearance settings
const borderRadius = ref(100); // 50% = circle, 0% = square
const borderWidth = ref(0);
const borderColor = ref('#ffffff');
const showSettings = ref(false);
const showColorPicker = ref(false);

// Update state
const updateAvailable = ref(false);
const showUpdateOverlay = ref(false);
const updateInfo = ref({ version: '', notes: '', releaseUrl: '' });
const updateProgress = ref(0);
const updateInProgress = ref(false);
const updateError = ref('');
const updateCheckerRef = ref<InstanceType<typeof UpdateChecker> | null>(null);

// Store unsubscribe functions to properly clean them up when component is unmounted
const unsubscribeFunctions = ref<Array<() => void>>([]);

// Initialize cameras
async function initializeCameras() {
  try {
    const cameras = await getAvailableCameras();
    availableCameras.value = cameras;

    if (cameras.length > 0 && !selectedCameraId.value) {
      selectedCameraId.value = cameras[0].deviceId;
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error);
  }
}

// Handle camera error
function handleCameraError(message: string) {
  errorMessage.value = message;
}

// Handle resize
function handleResize(change: number) {
  cameraSize.value += change;
  // Ensure minimum and maximum size
  if (cameraSize.value <= 200) {
    cameraSize.value = 200;
  } else if (cameraSize.value > 350) {
    cameraSize.value = 350;
  }
}

// Toggle settings menu
function toggleSettings() {
  showSettings.value = !showSettings.value;
  console.log('Settings toggled:', showSettings.value);
}

// Toggle color picker
function toggleColorPicker() {
  showColorPicker.value = !showColorPicker.value;
  console.log('Color picker toggled:', showColorPicker.value);
}

// Toggle update overlay
function toggleUpdateOverlay() {
  showUpdateOverlay.value = !showUpdateOverlay.value;
  console.log('Update overlay toggled:', showUpdateOverlay.value);
}

// Update handlers
function handleUpdateAvailable(info: { version: string; notes: string; releaseUrl: string }) {
  updateAvailable.value = true;
  updateInfo.value = info;
  console.log('Update available:', info);
}

function handleUpdateProgress(progress: number) {
  updateProgress.value = progress;
  updateInProgress.value = true;
}

function handleUpdateError(error: Error | string) {
  updateError.value = error instanceof Error ? error.message : String(error);
  updateInProgress.value = false;
}

function handleUpdateComplete() {
  updateInProgress.value = false;
  // Show some success message or notification
  alert('Update installed successfully! The application will now restart.');
}

async function installUpdate() {
  if (!updateCheckerRef.value) return;
  
  try {
    updateInProgress.value = true;
    const success = await updateCheckerRef.value.installUpdate();
    if (!success) {
      updateError.value = 'Failed to install update';
    }
  } catch (error) {
    updateError.value = error instanceof Error ? error.message : String(error);
    updateInProgress.value = false;
  }
}

function skipUpdate() {
  showUpdateOverlay.value = false;
  // Perhaps store a preference not to show this update again
}

// Listen for events from Rust
async function setupEventListeners() {
  try {
    // Check if we're running in a Tauri context
    if (!(window && window.__TAURI__ !== undefined)) {
      console.log('Tauri API not available - skipping event listeners');
      return;
    }
    
    // Dynamically import the event API
    let listen;
    try {
      const eventModule = await import('@tauri-apps/api/event');
      listen = eventModule.listen;
      
      if (typeof listen !== 'function') {
        console.warn('Tauri event API not available or not a function - skipping event listeners');
        return;
      }
    } catch (error) {
      console.error('Failed to import event module:', error);
      return;
    }

    console.log('Setting up Tauri event listeners...');

    try {
      // Listen for border radius changes
      const unlistenRadius = await listen('set-border-radius', (event) => {
        console.log('Received border radius event:', event);
        borderRadius.value = event.payload as number;
      });
      unsubscribeFunctions.value.push(unlistenRadius);
      console.log('Border radius listener setup complete');
    } catch (e) {
      console.error('Error setting up border-radius listener:', e);
    }

    try {
      // Listen for border width changes
      const unlistenWidth = await listen('set-border-width', (event) => {
        console.log('Received border width event:', event);
        borderWidth.value = event.payload as number;
      });
      unsubscribeFunctions.value.push(unlistenWidth);
      console.log('Border width listener setup complete');
    } catch (e) {
      console.error('Error setting up border-width listener:', e);
    }

    try {
      // Listen for border color changes
      const unlistenColor = await listen('set-border-color', (event) => {
        console.log('Received border color event:', event);
        borderColor.value = event.payload as string;
      });
      unsubscribeFunctions.value.push(unlistenColor);
      console.log('Border color listener setup complete');
    } catch (e) {
      console.error('Error setting up border-color listener:', e);
    }
    
    console.log('Tauri event listeners setup complete');
  } catch (error) {
    console.error('Error setting up event listeners:', error);
  }
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(event: KeyboardEvent) {
  // Check if any input elements are focused
  const activeElement = document.activeElement;
  const isInputFocused = activeElement instanceof HTMLInputElement ||
                         activeElement instanceof HTMLTextAreaElement ||
                         activeElement instanceof HTMLSelectElement;

  // Only process shortcuts if no input is focused
  if (!isInputFocused) {
    // Zoom in with '+' or '=' keys
    if (event.key === '+' || event.key === '=') {
      handleResize(20);
    }
    // Zoom out with '-' key
    else if (event.key === '-') {
      handleResize(-20);
    }
  }
}

// Lifecycle hooks
onMounted(async () => {
  await initializeCameras();
  await setupEventListeners();

  // Add keyboard event listener
  window.addEventListener('keydown', handleKeyboardShortcuts);
});

// No need to call stopCamera here as it's handled in the WebcamCircle component
onUnmounted(() => {
  // Remove keyboard event listener
  window.removeEventListener('keydown', handleKeyboardShortcuts);
  
  // Unsubscribe from all event listeners
  unsubscribeFunctions.value.forEach(unsubscribe => {
    try {
      unsubscribe();
    } catch (e) {
      console.error('Error unsubscribing from event:', e);
    }
  });
});
</script>

<template>
  <main class="container" id="container">
    <div
      class="webcam-container"
      :style="{
        width: `${cameraSize}px`,
        height: `${cameraSize}px`
      }"
      @mousedown="startDrag"
    >
      <!-- Main webcam component -->
      <WebcamCircle
        :selectedCameraId="selectedCameraId"
        :borderRadius="borderRadius"
        :borderWidth="borderWidth"
        :borderColor="borderColor"
        @error="handleCameraError"
      />

      <!-- Branding bar - visible on hover -->
      <BrandingBar />

      <!-- Window controls - visible on hover -->
      <WindowControls
        :cameraSize="cameraSize"
        :updateAvailable="updateAvailable"
        @resize="handleResize"
        @toggleSettings="toggleSettings"
        @toggleColorPicker="toggleColorPicker"
        @toggleUpdateOverlay="toggleUpdateOverlay"
      />

      <!-- Menu Bar for settings -->
      <MenuBar
        :borderRadius="borderRadius"
        :borderWidth="borderWidth"
        :borderColor="borderColor"
        :availableCameras="availableCameras"
        :selectedCameraId="selectedCameraId"
        :isVisible="showSettings"
        @update:borderRadius="(val: number) => { borderRadius = val; console.log('Border radius updated:', val); }"
        @update:borderWidth="(val: number) => { borderWidth = val; console.log('Border width updated:', val); }"
        @update:borderColor="(val: string) => { borderColor = val; console.log('Border color updated:', val); }"
        @update:selectedCameraId="(val: string) => { selectedCameraId = val; console.log('Camera updated:', val); }"
        @close="showSettings = false"
      />

      <!-- Color Picker Overlay -->
      <ColorPickerOverlay
        :borderColor="borderColor"
        :isVisible="showColorPicker"
        @update:borderColor="(val: string) => { borderColor = val; console.log('Border color updated:', val); }"
        @close="showColorPicker = false"
      />
      
      <!-- Update Checker (invisible logic component) -->
      <UpdateChecker
        ref="updateCheckerRef"
        @update-available="handleUpdateAvailable"
        @update-progress="handleUpdateProgress"
        @update-error="handleUpdateError"
        @update-complete="handleUpdateComplete"
      />
      
      <!-- Update Overlay -->
      <UpdateOverlay
        :isVisible="showUpdateOverlay"
        :updateInfo="updateInfo"
        :updateProgress="updateProgress"
        :updateInProgress="updateInProgress"
        :updateError="updateError"
        @install-update="installUpdate"
        @skip-update="skipUpdate"
        @close="showUpdateOverlay = false"
      />
    </div>

    <div class="error-message" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0;
  margin: 0;
  position: relative;
}

.webcam-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-app-region: drag; /* For compatibility */
}

.webcam-container:hover :deep(.controls-dropdown),
.webcam-container:hover :deep(.window-controls),
.webcam-container:hover :deep(.branding-bar) {
  opacity: 1; /* Make controls visible on hover */
  pointer-events: auto; /* Ensure controls are clickable */
}

.error-message {
  color: #ff3e00;
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px 10px;
  border-radius: 4px;
}
</style>
