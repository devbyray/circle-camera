<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { getAvailableCameras } from '../utils/cameraUtils';
import { startDrag } from '../utils/windowUtils';
import WebcamCircle from './WebcamCircle.vue';
import ControlsDropdown from './ControlsDropdown.vue';
import WindowControls from './WindowControls.vue';
import SettingsOverlay from './SettingsOverlay.vue';

// State
const availableCameras = ref<MediaDeviceInfo[]>([]);
const selectedCameraId = ref<string>('');
const errorMessage = ref("");
const cameraSize = ref(300);
const showSettings = ref(false);

// Camera appearance settings
const borderRadius = ref(50); // 50% = circle, 0% = square
const borderWidth = ref(0);
const borderColor = ref('#ffffff');

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
  // Ensure minimum size
  if (cameraSize.value < 100) {
    cameraSize.value = 100;
  }
}

// Toggle settings overlay
function toggleSettings() {
  showSettings.value = !showSettings.value;
}

// Lifecycle hooks
onMounted(async () => {
  await initializeCameras();
});

// No need to call stopCamera here as it's handled in the WebcamCircle component
onUnmounted(() => {
  // Clean up if needed
});
</script>

<template>
  <main class="container">
    <div
      class="webcam-container"
      :style="{ width: `${cameraSize}px`, height: `${cameraSize}px` }"
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

      <!-- Camera selection dropdown - visible on hover -->
      <ControlsDropdown
        :availableCameras="availableCameras"
        :selectedCameraId="selectedCameraId"
        @update:selectedCameraId="selectedCameraId = $event"
      />

      <!-- Window controls - visible on hover -->
      <WindowControls
        :cameraSize="cameraSize"
        @resize="handleResize"
        @toggleSettings="toggleSettings"
      />

      <!-- Settings overlay - visible when settings button is clicked -->
      <SettingsOverlay
        :availableCameras="availableCameras"
        :selectedCameraId="selectedCameraId"
        :borderRadius="borderRadius"
        :borderWidth="borderWidth"
        :borderColor="borderColor"
        :isVisible="showSettings"
        @update:selectedCameraId="selectedCameraId = $event"
        @update:borderRadius="borderRadius = $event"
        @update:borderWidth="borderWidth = $event"
        @update:borderColor="borderColor = $event"
        @close="showSettings = false"
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
.webcam-container:hover :deep(.window-controls) {
  opacity: 1; /* Make controls visible on hover */
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
