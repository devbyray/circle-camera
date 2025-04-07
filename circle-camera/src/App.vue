<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// Add TypeScript declarations for Tauri
declare global {
  interface Window {
    __TAURI__?: any;
  }
  interface Navigator {
    webkitGetUserMedia?: (constraints: MediaStreamConstraints,
                         successCallback: (stream: MediaStream) => void,
                         errorCallback: (error: Error) => void) => void;
  }
}

const videoRef = ref<HTMLVideoElement | null>(null);
const availableCameras = ref<MediaDeviceInfo[]>([]);
const selectedCameraId = ref<string>('');
const errorMessage = ref("");
const cameraSize = ref(300);

// Workaround for Tauri v2 camera access
// Based on https://github.com/tauri-apps/tauri/issues/5370#issuecomment-2493318187
const getMediaDevices = async () => {
  // Check if we're in a Tauri environment
  const isTauri = window.__TAURI__ !== undefined;

  if (isTauri) {
    try {
      // Create a mock MediaDevices object if needed
      if (!navigator.mediaDevices) {
        // @ts-ignore - We're adding this object
        navigator.mediaDevices = {};
      }

      // Create a getUserMedia function if it doesn't exist
      if (!navigator.mediaDevices.getUserMedia) {
        // @ts-ignore - We're adding this function
        navigator.mediaDevices.getUserMedia = async (constraints: MediaStreamConstraints) => {
          try {
            // Fallback to a mock stream with a black video
            const mockVideo = document.createElement('video');
            mockVideo.srcObject = new MediaStream();
            return mockVideo.srcObject;
          } catch (error) {
            console.error('Error in getUserMedia:', error);
            throw error;
          }
        };
      }

      // Create an enumerateDevices function if it doesn't exist
      if (!navigator.mediaDevices.enumerateDevices) {
        // @ts-ignore - We're creating a mock implementation
        navigator.mediaDevices.enumerateDevices = async () => {
          // Return a mock device
          return [{
            deviceId: 'default',
            kind: 'videoinput' as MediaDeviceKind,
            label: 'Default Camera',
            groupId: 'default',
            toJSON: () => ({
              deviceId: 'default',
              kind: 'videoinput',
              label: 'Default Camera',
              groupId: 'default'
            })
          }];
        };
      }
    } catch (error) {
      console.error('Error setting up media devices:', error);
    }
  }

  return navigator.mediaDevices;
};

// Get list of available cameras
async function getAvailableCameras() {
  try {
    const mediaDevices = await getMediaDevices();

    // First request camera access to get proper labels
    const initialStream = await mediaDevices.getUserMedia({ video: true });

    // Now enumerate devices to get the labels
    const devices = await mediaDevices.enumerateDevices();
    availableCameras.value = devices.filter(device => device.kind === 'videoinput');

    // Stop the initial stream if it's a real stream
    if (initialStream && initialStream.getTracks) {
      initialStream.getTracks().forEach(track => track.stop());
    }

    console.log('Available cameras:', availableCameras.value);

    if (availableCameras.value.length > 0 && !selectedCameraId.value) {
      selectedCameraId.value = availableCameras.value[0].deviceId;
      await startCamera();
    }
  } catch (error) {
    console.error('Error getting cameras:', error);
    errorMessage.value = 'Failed to get camera list: ' + (error instanceof Error ? error.message : String(error));
  }
}

// Start the camera with the selected device
async function startCamera() {
  try {
    // Stop any existing stream
    stopCamera();

    // Get media devices with our helper
    const mediaDevices = await getMediaDevices();

    // Start new stream
    const stream = await mediaDevices.getUserMedia({
      video: {
        deviceId: selectedCameraId.value ? { exact: selectedCameraId.value } : undefined
      }
    });

    if (videoRef.value) {
      videoRef.value.srcObject = stream;
    }
  } catch (error) {
    console.error('Error accessing camera:', error);
    errorMessage.value = 'Failed to access camera: ' + (error instanceof Error ? error.message : String(error));
  }
}

// Stop the camera stream
function stopCamera() {
  if (videoRef.value && videoRef.value.srcObject) {
    const stream = videoRef.value.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());
    videoRef.value.srcObject = null;
  }
}

// Handle camera selection change
async function handleCameraChange() {
  await startCamera();
}

// Function to close the app
async function closeApp() {
  try {
    console.log('Attempting to close app...');
    // First stop the camera to release resources
    stopCamera();

    // Use the Rust command to close the app
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('close_app');
    } catch (error) {
      console.error('Error closing app with Rust command:', error);

      // Fallback to JS API
      try {
        const { Window } = await import('@tauri-apps/api/window');
        const appWindow = Window.getCurrent();
        await appWindow.close();
      } catch (fallbackError) {
        console.error('Error with fallback close method:', fallbackError);
      }
    }
  } catch (error) {
    console.error('Error in closeApp:', error);
  }
}

// Function to resize the camera
function resizeCamera(newSize: number) {
  cameraSize.value = newSize;
}

// Note: We're using the data-tauri-drag-region attribute for dragging instead of JavaScript

// Lifecycle hooks
onMounted(async () => {
  await getAvailableCameras();
});

onUnmounted(() => {
  stopCamera();
});
</script>

<template>
  <main class="container">
    <div class="webcam-container" :style="{ width: `${cameraSize}px`, height: `${cameraSize}px` }">
      <div class="webcam-circle" data-tauri-drag-region>
        <video ref="videoRef" autoplay playsinline muted></video>
      </div>

      <!-- Camera selection dropdown - visible on hover -->
      <div class="controls-dropdown">
        <select v-model="selectedCameraId" @change="handleCameraChange" class="camera-select">
          <option v-for="camera in availableCameras" :key="camera.deviceId" :value="camera.deviceId">
            {{ camera.label || `Camera ${availableCameras.indexOf(camera) + 1}` }}
          </option>
        </select>
      </div>

      <!-- Window controls - visible on hover -->
      <div class="window-controls">
        <button class="control-button close" @click="closeApp" title="Close">
          ✕
        </button>
        <button class="control-button resize" @click="resizeCamera(cameraSize - 20)" title="Decrease size">
          -
        </button>
        <button class="control-button resize" @click="resizeCamera(cameraSize + 20)" title="Increase size">
          +
        </button>
      </div>
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
}

.webcam-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  cursor: move;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.controls-dropdown {
  position: absolute;
  bottom: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  padding: 5px 10px;
  z-index: 10;
  transition: opacity 0.3s;
  opacity: 0; /* Hidden by default */
}

.webcam-container:hover .controls-dropdown {
  opacity: 1; /* Visible on hover */
}

.camera-select {
  background-color: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
}

.camera-select:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.6);
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

.window-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
  opacity: 0; /* Hidden by default */
  transition: opacity 0.3s;
}

.webcam-container:hover .window-controls {
  opacity: 1; /* Visible on hover */
}

.control-button {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  transition: background-color 0.2s;
}

.control-button:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.control-button.close:hover {
  background-color: #ff3e00;
}
</style>

<style>
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #f6f6f6;
  background-color: transparent;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}

#app {
  height: 100%;
  background-color: transparent;
}
</style>