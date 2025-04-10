<script setup lang="ts">
defineProps<{
  availableCameras: MediaDeviceInfo[];
  selectedCameraId: string;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  isVisible: boolean;
}>();

const emit = defineEmits([
  'update:selectedCameraId',
  'update:borderRadius',
  'update:borderWidth',
  'update:borderColor',
  'close'
]);

function updateCamera(event: Event) {
  const select = event.target as HTMLSelectElement;
  emit('update:selectedCameraId', select.value);
}

function updateBorderRadius(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = parseInt(input.value);
  console.log('Updating border radius to:', value);
  emit('update:borderRadius', value);
}

function updateBorderWidth(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = parseInt(input.value);
  console.log('Updating border width to:', value);
  emit('update:borderWidth', value);
}

// For real-time updates during slider movement
function updateBorderRadiusLive(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = parseInt(input.value);
  console.log('Live updating border radius to:', value);
  emit('update:borderRadius', value);
}

function updateBorderWidthLive(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = parseInt(input.value);
  console.log('Live updating border width to:', value);
  emit('update:borderWidth', value);
}

function updateBorderColor(event: Event) {
  const input = event.target as HTMLInputElement;
  emit('update:borderColor', input.value);
}

function closeOverlay() {
  emit('close');
}
</script>

<template>
  <div class="settings-overlay" v-if="isVisible">
    <div class="settings-header">
      <h3>Camera Settings</h3>
      <button class="close-button" @click="closeOverlay">✕</button>
    </div>

    <div class="settings-section">
      <label for="camera-select">Camera</label>
      <select
        id="camera-select"
        :value="selectedCameraId"
        @change="updateCamera"
        class="settings-select"
      >
        <option v-for="camera in availableCameras" :key="camera.deviceId" :value="camera.deviceId">
          {{ camera.label || `Camera ${availableCameras.indexOf(camera) + 1}` }}
        </option>
      </select>
    </div>

    <div class="settings-section">
      <label for="border-radius">Shape (Square to Circle)</label>
      <div class="slider-container">
        <input
          type="range"
          id="border-radius"
          min="0"
          max="50"
          :value="borderRadius"
          @input="updateBorderRadiusLive"
          @change="updateBorderRadius"
          class="slider"
        >
        <span class="slider-value">{{ borderRadius }}%</span>
      </div>
    </div>

    <div class="settings-section">
      <label for="border-width">Border Width</label>
      <div class="slider-container">
        <input
          type="range"
          id="border-width"
          min="0"
          max="10"
          :value="borderWidth"
          @input="updateBorderWidthLive"
          @change="updateBorderWidth"
          class="slider"
        >
        <span class="slider-value">{{ borderWidth }}px</span>
      </div>
    </div>

    <div class="settings-section">
      <label for="border-color">Border Color</label>
      <div class="color-picker-container">
        <input
          type="color"
          id="border-color"
          :value="borderColor"
          @input="updateBorderColor"
          class="color-picker"
        >
        <span class="color-value">{{ borderColor }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-width: 300px;
  z-index: 100;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  -webkit-app-region: no-drag;
  pointer-events: auto; /* Ensure overlay is interactive */
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
}

.settings-header h3 {
  margin: 0;
  font-size: 16px;
  color: white;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
}

.settings-section {
  margin-bottom: 15px;
}

.settings-section label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.settings-select {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  padding: 8px;
  font-size: 14px;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 5px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  border: none;
}

.slider-value {
  min-width: 40px;
  text-align: right;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.color-picker-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-picker {
  -webkit-appearance: none;
  appearance: none;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.color-picker::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-picker::-webkit-color-swatch {
  border: none;
  border-radius: 5px;
}

.color-value {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}
</style>
