<script setup lang="ts">
import { closeApp } from '../utils/windowUtils';

defineProps<{
  cameraSize: number;
}>();

const emit = defineEmits(['resize', 'toggleSettings']);

function resizeCamera(change: number) {
  emit('resize', change);
}

function handleCloseApp() {
  closeApp();
}

function handleToggleSettings() {
  emit('toggleSettings');
}
</script>

<template>
  <div class="window-controls">
    <button class="control-button settings" @click="handleToggleSettings" title="Settings">
      ⚙️
    </button>
    <button class="control-button resize" @click="resizeCamera(-20)" title="Decrease size">
      -
    </button>
    <button class="control-button resize" @click="resizeCamera(20)" title="Increase size">
      +
    </button>
    <button class="control-button close" @click="handleCloseApp" title="Close">
      ✕
    </button>
  </div>
</template>

<style scoped>
.window-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
  opacity: 0; /* Hidden by default */
  transition: opacity 0.3s;
  -webkit-app-region: no-drag; /* Make controls not draggable */
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
  -webkit-app-region: no-drag; /* Make buttons not draggable */
}

.control-button:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.control-button.close:hover {
  background-color: #ff3e00;
}

.control-button.settings {
  font-size: 10px;
}
</style>
