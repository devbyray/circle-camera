<script setup lang="ts">
import IconLibrary from './icons/IconLibrary.vue';

defineProps({
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

// Predefined colors
const predefinedColors = [
  '#ffffff', // White
  '#000000', // Black
  '#ff0000', // Red
  '#00ff00', // Green
  '#0000ff', // Blue
  '#ffff00', // Yellow
  '#ff00ff', // Magenta
  '#00ffff', // Cyan
  '#ff8000', // Orange
  '#8000ff'  // Purple
];

// Custom color input is bound directly to the input elements

// Handle color selection
function selectColor(color: string) {
  emit('update:borderColor', color);
}

// Handle custom color input
function handleCustomColorInput(event: Event) {
  const input = event.target as HTMLInputElement;
  emit('update:borderColor', input.value);
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

    <div class="color-grid">
      <button
        v-for="color in predefinedColors"
        :key="color"
        class="color-button"
        :style="{ backgroundColor: color }"
        :class="{ 'active': borderColor === color }"
        @click="selectColor(color)"
        :title="color"
      ></button>
    </div>

    <div class="custom-color">
      <input
        type="color"
        :value="borderColor"
        @input="handleCustomColorInput"
        class="color-input"
      />
      <input
        type="text"
        :value="borderColor"
        @input="handleCustomColorInput"
        class="hex-input"
        maxlength="7"
        pattern="#[0-9A-Fa-f]{6}"
      />
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
  width: 200px;
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
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 8px;
}

.overlay-header h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: white;
}

.close-button {
  background-color: rgba(255, 0, 0, 0.7);
  border: none;
  color: white;
  width: 20px;
  height: 20px;
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

.color-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-bottom: 10px;
}

.color-button {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}

.color-button:hover {
  transform: scale(1.1);
}

.color-button.active {
  border: 2px solid white;
  transform: scale(1.1);
}

.custom-color {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.color-input {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
}

.hex-input {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  font-family: monospace;
  font-size: 12px;
}

.hex-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
}
</style>
