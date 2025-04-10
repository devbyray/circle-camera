<script setup lang="ts">
import { closeApp } from '../utils/windowUtils';
import IconLibrary from './icons/IconLibrary.vue';

defineProps<{
  cameraSize: number;
}>();

const emit = defineEmits(['resize', 'toggleSettings']);

function resizeCamera(change: number) {
  emit('resize', change);
}

function toggleSettings() {
  emit('toggleSettings');
}

function handleCloseApp() {
  closeApp();
}


</script>

<template>
  <div class="window-controls">
    <div class="left-controls">
      <button class="control-button settings" @click="toggleSettings" title="Settings">
        <IconLibrary name="settings" size="24" />
      </button>
    </div>

    <div class="right-controls">
      <button class="control-button resize" @click="resizeCamera(-20)" title="Decrease size">
        <IconLibrary name="remove" size="24" />
      </button>
      <button class="control-button resize" @click="resizeCamera(20)" title="Increase size">
        <IconLibrary name="add" size="24" />
      </button>

      <button class="control-button close" @click="handleCloseApp" title="Close">
        <IconLibrary name="close" size="24" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.window-controls {
  width: calc(100% - 20px);
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
  opacity: 0;
  /* Hidden by default */
  transition: opacity 0.3s;
  -webkit-app-region: no-drag;
  /* Make controls not draggable */
  pointer-events: auto;
  /* Ensure buttons are clickable */
}

.left-controls,
.right-controls {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.control-button {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  transition: background-color 0.2s;
  -webkit-app-region: no-drag;
}

.control-button svg {
  transition: color 0.2s;
}

.control-button:hover {
  background-color: var(--brand-color-darker);
  color: black;
}

.control-button.close:hover {
  background-color: #ff3e00;
}

/* .control-button.settings {
  font-size: 12px;
}

.control-button.settings:hover {
  background-color: rgba(0, 0, 0, 1);
} */
</style>
