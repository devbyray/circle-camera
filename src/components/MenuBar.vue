<script setup lang="ts">
import IconLibrary from './icons/IconLibrary.vue';
defineProps<{
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  availableCameras: MediaDeviceInfo[];
  selectedCameraId: string;
  isVisible: boolean;
}>();

// Function to get a short name for the camera
function getShortCameraName(camera: MediaDeviceInfo): string {
  if (camera.label) {
    // If we have a label, use the first part of it
    const parts = camera.label.split(' ');
    if (parts.length > 1) {
      return parts[0]; // Return first word
    }
    return camera.label.substring(0, 10) + (camera.label.length > 10 ? '...' : '');
  }
  // If no label, use a short version of the device ID
  return `Cam ${camera.deviceId.substring(0, 4)}`;
}

const emit = defineEmits([
  'update:borderRadius',
  'update:borderWidth',
  'update:borderColor',
  'update:selectedCameraId',
  'close'
]);

// Shape options
function setSquareShape() {
  emit('update:borderRadius', 0);
}

function setCircleShape() {
  emit('update:borderRadius', 50);
}

// Border width options
function setNoBorder() {
  emit('update:borderWidth', 0);
}

function setThinBorder() {
  emit('update:borderWidth', 2);
}

function setMediumBorder() {
  emit('update:borderWidth', 5);
}

function setThickBorder() {
  emit('update:borderWidth', 10);
}

// Color picker is now in a separate component
</script>

<template>
  <div class="menu-bar" :class="{ 'visible': isVisible }">
    <div class="menu-header">
      <h2>Circle Camera Settings</h2>
      <button class="close-button" @click="emit('close')" title="Close settings">
        <IconLibrary name="close" />
      </button>
    </div>
    <div class="menu-section">
      <h3>Camera</h3>
      <div class="camera-buttons">
        <button v-for="camera in availableCameras" :key="camera.deviceId"
          :class="{ active: selectedCameraId === camera.deviceId }"
          @click="emit('update:selectedCameraId', camera.deviceId)">
          {{ getShortCameraName(camera) }}
        </button>
      </div>
    </div>
    <div class="menu-section">
      <h3>Shape</h3>
      <div class="shape-buttons">
        <button @click="setSquareShape" :class="{ active: borderRadius === 0 }" class="icon-button">
          <IconLibrary name="square" size="16" color="#fff" />
          <span>Square</span>
        </button>
        <button @click="setCircleShape" :class="{ active: borderRadius === 50 }" class="icon-button">
          <IconLibrary name="circle" size="16" color="#fff" />
          <span>Circle</span>
        </button>
      </div>
    </div>

    <div class="menu-section">
      <h3>Border Width</h3>
      <button @click="setNoBorder" :class="{ active: borderWidth === 0 }">None</button>
      <button @click="setThinBorder" :class="{ active: borderWidth === 2 }">Thin</button>
      <button @click="setMediumBorder" :class="{ active: borderWidth === 5 }">Medium</button>
      <button @click="setThickBorder" :class="{ active: borderWidth === 10 }">Thick</button>
    </div>

    <!-- Border color is now in a separate overlay -->
  </div>
</template>

<style scoped>
.menu-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  padding: 15px;
  width: 250px;
  color: white;
  z-index: 1000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  -webkit-app-region: no-drag;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  visibility: hidden;
}

.menu-bar.visible {
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
}

.menu-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.shape-buttons {
  display: flex;
  gap: 10px;
}

.close-button {
  background-color: rgba(255, 0, 0, 0.7);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: rgba(255, 0, 0, 0.9);
}

.menu-section {
  margin-bottom: 15px;
}

.menu-section h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}

button {
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

button.active {
  background-color: rgba(255, 255, 255, 0.3);
  font-weight: bold;
}

.icon-button {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-buttons {
  display: flex;
  gap: 8px;
}

/* Color picker is now in a separate component */

.camera-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 5px;
}
</style>
