<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { getAvailableCameras } from '../utils/cameraUtils';
import { startDrag } from '../utils/windowUtils';
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
  showSettings.value = !showSettings.value;
  console.log('Settings toggled:', showSettings.value);
}

// Toggle color picker
function toggleColorPicker() {
  showColorPicker.value = !showColorPicker.value;
  console.log('Color picker toggled:', showColorPicker.value);
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
