<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { getAvailableCameras } from '../utils/cameraUtils';
import { startDrag, closeApp } from '../utils/windowUtils';
import WebcamCircle from './WebcamCircle.vue';
import WindowControls from './WindowControls.vue';
import MenuBar from './MenuBar.vue';
import BrandingBar from './BrandingBar.vue';
import ColorPickerOverlay from './ColorPickerOverlay.vue';

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
  // Force a true state change to ensure reactivity
  showSettings.value = !showSettings.value;
  console.log('Settings toggled:', showSettings.value);

  // If we're showing settings, make sure color picker is hidden
  if (showSettings.value) {
    showColorPicker.value = false;
  }

  // Debug output to console
  console.log('Current settings state:', {
    showSettings: showSettings.value,
    showColorPicker: showColorPicker.value
  });
}

// Close settings menu
function closeSettings() {
  console.log('Closing settings from WebcamContainer');
  showSettings.value = false;

  // Force a UI update
  setTimeout(() => {
    if (showSettings.value === false) {
      console.log('Settings confirmed closed');
    } else {
      console.log('Failed to close settings, forcing close');
      showSettings.value = false;
    }
  }, 50);
}

// Toggle color picker
function toggleColorPicker() {
  showColorPicker.value = !showColorPicker.value;
  console.log('Color picker toggled:', showColorPicker.value);
}

// Update functions for settings
function updateBorderRadius(val: number) {
  console.log('Border radius updated:', val);
  borderRadius.value = val;
}

function updateBorderWidth(val: number) {
  console.log('Border width updated:', val);
  borderWidth.value = val;
}

function updateBorderColor(val: string) {
  console.log('Border color updated:', val);
  borderColor.value = val;
}

function updateSelectedCamera(val: string) {
  console.log('Camera updated:', val);
  selectedCameraId.value = val;
}



// Listen for events from Rust
async function setupEventListeners() {
  try {
    const { listen } = await import('@tauri-apps/api/event');

    // Listen for border radius changes
    listen('set-border-radius', (event) => {
      console.log('Received border radius event:', event);
      borderRadius.value = event.payload as number;
    });

    // Listen for border width changes
    listen('set-border-width', (event) => {
      console.log('Received border width event:', event);
      borderWidth.value = event.payload as number;
    });

    // Listen for border color changes
    listen('set-border-color', (event) => {
      console.log('Received border color event:', event);
      borderColor.value = event.payload as string;
    });

    // Listen for close settings event
    listen('close-settings', () => {
      console.log('Received close-settings event');
      showSettings.value = false;
    });
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

  // Process Escape key regardless of focus state
  if (event.key === 'Escape') {
    if (showSettings.value) {
      showSettings.value = false;
      console.log('Settings closed with Escape key');
      event.preventDefault();
      return;
    } else if (showColorPicker.value) {
      showColorPicker.value = false;
      console.log('Color picker closed with Escape key');
      event.preventDefault();
      return;
    } else if (!isInputFocused) {
      closeApp();
      return;
    }
  }

  // Close settings with 'C' key
  if (event.key === 'c' || event.key === 'C') {
    if (showSettings.value) {
      showSettings.value = false;
      console.log('Settings closed with C key');
      event.preventDefault();
      return;
    }
  }

  // Only process other shortcuts if no input is focused
  if (!isInputFocused) {
    // Zoom in with '+' or '=' keys
    if (event.key === '+' || event.key === '=') {
      handleResize(20);
    }
    // Zoom out with '-' key
    else if (event.key === '-') {
      handleResize(-20);
    }
    // Toggle settings with 's' key
    else if (event.key === 's' || event.key === 'S') {
      toggleSettings();
      event.preventDefault();
    }
  }
}

// Lifecycle hooks
onMounted(async () => {
  await initializeCameras();
  await setupEventListeners();

  // Add keyboard event listener
  window.addEventListener('keydown', handleKeyboardShortcuts);

  // Add closeSettings to window object for direct access
  if (!window.__TAURI_METADATA__) {
    window.__TAURI_METADATA__ = {};
  }
  window.__TAURI_METADATA__.closeSettings = () => {
    showSettings.value = false;
    console.log('Settings closed via global function');
  };
});

// No need to call stopCamera here as it's handled in the WebcamCircle component
onUnmounted(() => {
  // Remove keyboard event listener
  window.removeEventListener('keydown', handleKeyboardShortcuts);
});
</script>

<template>
  <main class="container" id="container" @click="showSettings ? closeSettings() : null">
    <!-- Direct close button that will always work -->
    <button v-if="showSettings" class="direct-close-button" @click.stop="showSettings = false">Close Settings</button>
    <!-- We don't need emergency close buttons anymore -->
    <div
      class="webcam-container"
      :style="{
        width: `${cameraSize}px`,
        height: `${cameraSize}px`
      }"
      @mousedown="startDrag"
      @click.stop
    >
      <!-- Main webcam component -->
      <WebcamCircle
        :selectedCameraId="selectedCameraId"
        :borderRadius="borderRadius"
        :borderWidth="borderWidth"
        :borderColor="borderColor"
        @error="handleCameraError"
      />

      <!-- Camera selection is now in the settings menu -->

      <!-- Branding bar - visible on hover -->
      <BrandingBar />

      <!-- Window controls - visible on hover -->
      <WindowControls
        :cameraSize="cameraSize"
        @resize="handleResize"
        @toggleSettings="toggleSettings"
        @toggleColorPicker="toggleColorPicker"
      />

      <!-- Menu Bar for settings -->
      <MenuBar
        :borderRadius="borderRadius"
        :borderWidth="borderWidth"
        :borderColor="borderColor"
        :availableCameras="availableCameras"
        :selectedCameraId="selectedCameraId"
        :isVisible="showSettings"
        @update:borderRadius="updateBorderRadius"
        @update:borderWidth="updateBorderWidth"
        @update:borderColor="updateBorderColor"
        @update:selectedCameraId="updateSelectedCamera"
        @close="closeSettings"
      />

      <!-- Color Picker Overlay -->
      <ColorPickerOverlay
        :borderColor="borderColor"
        :isVisible="showColorPicker"
        @update:borderColor="(val: string) => { borderColor = val; console.log('Border color updated:', val); }"
        @close="showColorPicker = false"
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

/* Direct close button */
.direct-close-button {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #ff3b30;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  z-index: 3000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.direct-close-button:hover {
  background-color: #ff1a0e;
}
</style>
