<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { ColorPicker } from 'vue-color-kit';
import 'vue-color-kit/dist/vue-color-kit.css';
import IconLibrary from './icons/IconLibrary.vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  borderColor: {
    type: String,
    required: true
  }
});

const emit = defineEmits([
  'update:borderColor',
  'close'
]);

// Color picker handler
function handleColorChange(color: any) {
  // Extract the hex value from the color object
  const hexColor = color.hex;
  emit('update:borderColor', hexColor);
}
</script>

<template>
  <div class="color-picker-overlay" :class="{ 'visible': isVisible }">
    <div class="overlay-header">
      <h2>Border color</h2>
      <button class="close-button" @click="emit('close')" title="Close color picker">
        <IconLibrary name="close" size="14" color="#fff" />
      </button>
    </div>
    <div class="color-picker-container">
      <ColorPicker
        theme="dark"
        :color="borderColor"
        :sucker-hide="true"
        @changeColor="handleColorChange"
      />
    </div>
    <div class="current-color">
      <div class="color-preview" :style="{ backgroundColor: borderColor }"></div>
      <div class="color-value">{{ borderColor }}</div>
    </div>
  </div>
</template>

<style scoped>
.color-picker-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 8px;
  padding: 15px;
  width: 280px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.color-picker-overlay.visible {
  opacity: 1;
  pointer-events: auto;
}

.overlay-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
}

.overlay-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: white;
}

.close-button {
  background-color: rgba(255, 0, 0, 0.7);
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: rgba(255, 0, 0, 0.9);
}

.color-picker-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.current-color {
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.color-preview {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-right: 10px;
}

.color-value {
  color: white;
  font-family: monospace;
  font-size: 14px;
}

/* Override some of the color picker styles to fit our UI */
:deep(.vue-color-kit) {
  width: 100%;
  max-width: 250px;
}

:deep(.vue-color-kit .color-type) {
  margin-top: 8px;
}

:deep(.vue-color-kit .color-fields) {
  margin-top: 8px;
}
</style>
