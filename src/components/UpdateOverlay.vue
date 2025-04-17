<script setup lang="ts">
import IconLibrary from './icons/IconLibrary.vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  updateInfo: {
    type: Object,
    required: true,
    default: () => ({
      version: '',
      notes: '',
      releaseUrl: ''
    })
  },
  updateProgress: {
    type: Number,
    default: 0
  },
  updateInProgress: {
    type: Boolean,
    default: false
  },
  updateError: {
    type: String,
    default: ''
  }
});

const emit = defineEmits([
  'install-update',
  'skip-update',
  'close'
]);

function installUpdate() {
  emit('install-update');
}

function openReleaseNotes() {
  if (props.updateInfo.releaseUrl) {
    window.open(props.updateInfo.releaseUrl, '_blank');
  }
}

function closeOverlay() {
  emit('close');
}

function skipUpdate() {
  emit('skip-update');
}
</script>

<template>
  <div class="update-overlay" :class="{ 'visible': isVisible }">
    <div class="overlay-header">
      <h2>Update Available</h2>
      <button class="close-button" @click="closeOverlay" title="Close">
        <IconLibrary name="close" size="14" color="#fff" />
      </button>
    </div>

    <div class="overlay-content">
      <div class="update-info">
        <div class="version">
          <IconLibrary name="arrow-up-circle" size="20" color="#4AE04E" />
          <span>Version {{ updateInfo.version }} is now available!</span>
        </div>

        <div class="notes" v-if="updateInfo.notes">
          <p>{{ updateInfo.notes }}</p>
        </div>
      </div>

      <div v-if="updateInProgress" class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${updateProgress}%` }"></div>
        </div>
        <span class="progress-text">{{ updateProgress }}%</span>
      </div>

      <div v-if="updateError" class="error-message">
        {{ updateError }}
      </div>

      <div class="action-buttons">
        <button 
          class="action-button release-notes" 
          @click="openReleaseNotes" 
          :disabled="!updateInfo.releaseUrl || updateInProgress"
        >
          Release Notes
        </button>
        
        <button 
          class="action-button skip" 
          @click="skipUpdate" 
          :disabled="updateInProgress"
        >
          Skip
        </button>
        
        <button 
          class="action-button install" 
          @click="installUpdate" 
          :disabled="updateInProgress"
        >
          {{ updateInProgress ? 'Installing...' : 'Update' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.update-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 8px;
  padding: 15px;
  width: 350px;
  max-width: 90%;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.update-overlay.visible {
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
  font-size: 16px;
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

.overlay-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.update-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.version {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 14px;
}

.notes {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  max-height: 100px;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 8px;
}

.notes p {
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 5px;
}

.action-button {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;
}

.action-button:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.2);
}

.action-button.install {
  background-color: #4AE04E;
  color: #000;
}

.action-button.install:hover:not(:disabled) {
  background-color: #3ac03f;
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #4AE04E;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  color: white;
  min-width: 36px;
  text-align: right;
}

.error-message {
  background-color: rgba(255, 0, 0, 0.2);
  color: #ff6b6b;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
}
</style>