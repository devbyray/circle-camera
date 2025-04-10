<script setup lang="ts">
defineProps<{
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  availableCameras: MediaDeviceInfo[];
  selectedCameraId: string;
}>();

const emit = defineEmits([
  'update:borderRadius',
  'update:borderWidth',
  'update:borderColor',
  'update:selectedCameraId'
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

// Border color options
function setWhiteBorder() {
  emit('update:borderColor', '#ffffff');
}

function setBlackBorder() {
  emit('update:borderColor', '#000000');
}

function setRedBorder() {
  emit('update:borderColor', '#ff0000');
}

function setBlueBorder() {
  emit('update:borderColor', '#0000ff');
}

function setGreenBorder() {
  emit('update:borderColor', '#00ff00');
}
</script>

<template>
  <div class="menu-bar">
    <div class="menu-section">
      <h3>Camera</h3>
      <select
        class="camera-select"
        :value="selectedCameraId"
        @change="(e) => emit('update:selectedCameraId', (e.target as HTMLSelectElement).value)"
      >
        <option v-for="camera in availableCameras" :key="camera.deviceId" :value="camera.deviceId">
          {{ camera.label || `Camera ${camera.deviceId.substring(0, 5)}...` }}
        </option>
      </select>
    </div>
    <div class="menu-section">
      <h3>Shape</h3>
      <button @click="setSquareShape" :class="{ active: borderRadius === 0 }">Square</button>
      <button @click="setCircleShape" :class="{ active: borderRadius === 50 }">Circle</button>
    </div>

    <div class="menu-section">
      <h3>Border Width</h3>
      <button @click="setNoBorder" :class="{ active: borderWidth === 0 }">None</button>
      <button @click="setThinBorder" :class="{ active: borderWidth === 2 }">Thin</button>
      <button @click="setMediumBorder" :class="{ active: borderWidth === 5 }">Medium</button>
      <button @click="setThickBorder" :class="{ active: borderWidth === 10 }">Thick</button>
    </div>

    <div class="menu-section">
      <h3>Border Color</h3>
      <div class="color-buttons">
        <button
          @click="setWhiteBorder"
          class="color-button white-button"
          :class="{ active: borderColor === '#ffffff' }"
        ></button>
        <button
          @click="setBlackBorder"
          class="color-button black-button"
          :class="{ active: borderColor === '#000000' }"
        ></button>
        <button
          @click="setRedBorder"
          class="color-button red-button"
          :class="{ active: borderColor === '#ff0000' }"
        ></button>
        <button
          @click="setBlueBorder"
          class="color-button blue-button"
          :class="{ active: borderColor === '#0000ff' }"
        ></button>
        <button
          @click="setGreenBorder"
          class="color-button green-button"
          :class="{ active: borderColor === '#00ff00' }"
        ></button>
      </div>
    </div>
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
}

#container:hover .menu-bar {
  opacity: 1;
  pointer-events: auto;
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

.color-buttons {
  display: flex;
  gap: 8px;
}

.color-button {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  padding: 0;
  border: 2px solid transparent;
}

.color-button.active {
  border-color: rgba(255, 255, 255, 0.8);
}

.white-button {
  background-color: #ffffff;
}

.black-button {
  background-color: #000000;
}

.red-button {
  background-color: #ff0000;
}

.blue-button {
  background-color: #0000ff;
}

.green-button {
  background-color: #00ff00;
}

.camera-select {
  width: 100%;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 5px;
}

.camera-select option {
  background-color: #333;
  color: white;
}
</style>
