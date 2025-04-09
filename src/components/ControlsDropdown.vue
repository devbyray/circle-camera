<script setup lang="ts">
defineProps<{
  availableCameras: MediaDeviceInfo[];
  selectedCameraId: string;
}>();

const emit = defineEmits(['update:selectedCameraId']);

function handleCameraChange(event: Event) {
  const select = event.target as HTMLSelectElement;
  emit('update:selectedCameraId', select.value);
}
</script>

<template>
  <div class="controls-dropdown">
    <select :value="selectedCameraId" @change="handleCameraChange" class="camera-select">
      <option v-for="camera in availableCameras" :key="camera.deviceId" :value="camera.deviceId">
        {{ camera.label || `Camera ${availableCameras.indexOf(camera) + 1}` }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.controls-dropdown {
  position: absolute;
  bottom: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  padding: 5px 10px;
  z-index: 10;
  transition: opacity 0.3s;
  opacity: 0; /* Hidden by default */
  -webkit-app-region: no-drag; /* Make controls not draggable */
}

.camera-select {
  background-color: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  -webkit-app-region: no-drag; /* Make select not draggable */
}

.camera-select:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.6);
}
</style>
