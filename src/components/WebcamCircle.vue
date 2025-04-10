<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { startCamera, stopCamera } from '../utils/cameraUtils';

const props = defineProps<{
  selectedCameraId: string;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
}>();

const videoRef = ref<HTMLVideoElement | null>(null);
const emit = defineEmits(['error']);

// Start camera when component mounts or camera changes
onMounted(async () => {
  if (props.selectedCameraId) {
    try {
      await startCamera(videoRef.value, props.selectedCameraId);
    } catch (error) {
      emit('error', error instanceof Error ? error.message : String(error));
    }
  }
});

// Clean up on unmount
onUnmounted(() => {
  stopCamera(videoRef.value);
});

// Watch for camera changes
watch(() => props.selectedCameraId, async (newCameraId) => {
  if (newCameraId) {
    try {
      await startCamera(videoRef.value, newCameraId);
    } catch (error) {
      emit('error', error instanceof Error ? error.message : String(error));
    }
  }
});
</script>

<template>
  <div
    class="webcam-wrapper"
    :style="{
      borderRadius: `${borderRadius}%`,
      border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none'
    }"
  >
    <div
      class="webcam-circle"
      :style="{
        borderRadius: `${borderRadius}%`
      }"
    >
      <video ref="videoRef" autoplay playsinline muted></video>
    </div>
  </div>
</template>

<style scoped>
.webcam-wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.webcam-circle {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: move;
  position: relative;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
