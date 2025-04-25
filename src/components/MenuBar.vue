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

// Shape options - original functions kept for reference
async function setSquareShape() {
  try {
    console.log('Setting square shape');
    emit('update:borderRadius', 0);

    // Call the Rust function after updating the UI
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('set_square_shape');
    } catch (invokeError) {
      console.error('Error invoking set_square_shape:', invokeError);
    }
  } catch (error) {
    console.error('Error setting square shape:', error);
  }
}

async function setCircleShape() {
  try {
    console.log('Setting circle shape');
    emit('update:borderRadius', 50);

    // Call the Rust function after updating the UI
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('set_circle_shape');
    } catch (invokeError) {
      console.error('Error invoking set_circle_shape:', invokeError);
    }
  } catch (error) {
    console.error('Error setting circle shape:', error);
  }
}

// Direct shape functions that work more reliably on Windows
async function setSquareShapeDirect() {
  try {
    console.log('Setting square shape directly');
    // Update the UI directly
    emit('update:borderRadius', 0);

    // Close the settings panel
    closeSettings();

    // Call the Rust function directly
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('set_border_radius', { radius: 0 });
      console.log('Successfully set square shape');
    } catch (invokeError) {
      console.error('Error setting square shape:', invokeError);
    }
  } catch (error) {
    console.error('Error in setSquareShapeDirect:', error);
  }
}

async function setCircleShapeDirect() {
  try {
    console.log('Setting circle shape directly');
    // Update the UI directly
    emit('update:borderRadius', 50);

    // Close the settings panel
    closeSettings();

    // Call the Rust function directly
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('set_border_radius', { radius: 50 });
      console.log('Successfully set circle shape');
    } catch (invokeError) {
      console.error('Error setting circle shape:', invokeError);
    }
  } catch (error) {
    console.error('Error in setCircleShapeDirect:', error);
  }
}

// Border width options - original functions kept for reference
async function setNoBorder() {
  try {
    console.log('Setting no border');
    emit('update:borderWidth', 0);

    // Call the Rust function after updating the UI
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('set_no_border');
    } catch (invokeError) {
      console.error('Error invoking set_no_border:', invokeError);
    }
  } catch (error) {
    console.error('Error setting no border:', error);
  }
}

async function setThinBorder() {
  try {
    console.log('Setting thin border');
    emit('update:borderWidth', 2);

    // Call the Rust function after updating the UI
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('set_thin_border');
    } catch (invokeError) {
      console.error('Error invoking set_thin_border:', invokeError);
    }
  } catch (error) {
    console.error('Error setting thin border:', error);
  }
}

async function setMediumBorder() {
  try {
    console.log('Setting medium border');
    emit('update:borderWidth', 5);

    // Call the Rust function after updating the UI
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('set_medium_border');
    } catch (invokeError) {
      console.error('Error invoking set_medium_border:', invokeError);
    }
  } catch (error) {
    console.error('Error setting medium border:', error);
  }
}

async function setThickBorder() {
  try {
    console.log('Setting thick border');
    emit('update:borderWidth', 10);

    // Call the Rust function after updating the UI
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('set_thick_border');
    } catch (invokeError) {
      console.error('Error invoking set_thick_border:', invokeError);
    }
  } catch (error) {
    console.error('Error setting thick border:', error);
  }
}

// Direct border width functions that work more reliably on Windows
async function setNoBorderDirect() {
  try {
    console.log('Setting no border directly');
    // Update the UI directly
    emit('update:borderWidth', 0);

    // Close the settings panel
    closeSettings();

    // Call the Rust function directly
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('set_border_width', { width: 0 });
      console.log('Successfully set no border');
    } catch (invokeError) {
      console.error('Error setting no border:', invokeError);
    }
  } catch (error) {
    console.error('Error in setNoBorderDirect:', error);
  }
}

async function setThinBorderDirect() {
  try {
    console.log('Setting thin border directly');
    // Update the UI directly
    emit('update:borderWidth', 2);

    // Close the settings panel
    closeSettings();

    // Call the Rust function directly
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('set_border_width', { width: 2 });
      console.log('Successfully set thin border');
    } catch (invokeError) {
      console.error('Error setting thin border:', invokeError);
    }
  } catch (error) {
    console.error('Error in setThinBorderDirect:', error);
  }
}

async function setMediumBorderDirect() {
  try {
    console.log('Setting medium border directly');
    // Update the UI directly
    emit('update:borderWidth', 5);

    // Close the settings panel
    closeSettings();

    // Call the Rust function directly
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('set_border_width', { width: 5 });
      console.log('Successfully set medium border');
    } catch (invokeError) {
      console.error('Error setting medium border:', invokeError);
    }
  } catch (error) {
    console.error('Error in setMediumBorderDirect:', error);
  }
}

async function setThickBorderDirect() {
  try {
    console.log('Setting thick border directly');
    // Update the UI directly
    emit('update:borderWidth', 10);

    // Close the settings panel
    closeSettings();

    // Call the Rust function directly
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      await invoke('set_border_width', { width: 10 });
      console.log('Successfully set thick border');
    } catch (invokeError) {
      console.error('Error setting thick border:', invokeError);
    }
  } catch (error) {
    console.error('Error in setThickBorderDirect:', error);
  }
}

// Color picker is now in a separate component

// Function to select camera directly
async function selectCameraDirect(deviceId: string) {
  try {
    console.log('Selecting camera directly:', deviceId);
    // Update the UI directly
    emit('update:selectedCameraId', deviceId);

    // Close the settings panel
    closeSettings();
  } catch (error) {
    console.error('Error in selectCameraDirect:', error);
  }
}

// Function to close settings panel
async function closeSettings() {
  console.log('Closing settings panel');
  try {
    // First emit the close event
    emit('close');

    // Then try to use the Tauri event system to ensure cross-component communication
    try {
      const { emit: tauriEmit } = await import('@tauri-apps/api/event');
      await tauriEmit('close-settings', {});
      console.log('Emitted close-settings event via Tauri');
    } catch (tauriError) {
      console.error('Error emitting Tauri event:', tauriError);
    }

    // Force a UI update
    await new Promise(resolve => setTimeout(resolve, 0));

    console.log('Settings panel should be closed now');
  } catch (error) {
    console.error('Error closing settings panel:', error);
  }
}

// No longer need the reload function
</script>

<template>
  <div class="menu-bar" :class="{ 'visible': isVisible }" @click.stop @keydown.esc="closeSettings">
    <div class="menu-header">
      <h2>Circle Camera Settings</h2>
      <button class="close-button" @click.stop="closeSettings" title="Close settings">
        <IconLibrary name="close" />
        <span class="close-text">Close</span>
      </button>
    </div>
    <div class="menu-section">
      <h3>Camera</h3>
      <div class="camera-buttons">
        <button v-for="camera in availableCameras" :key="camera.deviceId"
          :class="{ active: selectedCameraId === camera.deviceId }"
          @click.stop="selectCameraDirect(camera.deviceId)">
          {{ getShortCameraName(camera) }}
        </button>
      </div>
    </div>
    <div class="menu-section">
      <h3>Shape</h3>
      <div class="shape-buttons">
        <button @click.stop="setSquareShapeDirect" :class="{ active: borderRadius === 0 }" class="icon-button">
          <IconLibrary name="square" size="16" color="#fff" />
          <span>Square</span>
        </button>
        <button @click.stop="setCircleShapeDirect" :class="{ active: borderRadius === 50 }" class="icon-button">
          <IconLibrary name="circle" size="16" color="#fff" />
          <span>Circle</span>
        </button>
      </div>
    </div>

    <div class="menu-section">
      <h3>Border Width</h3>
      <button @click.stop="setNoBorderDirect()" :class="{ active: borderWidth === 0 }">None</button>
      <button @click.stop="setThinBorderDirect()" :class="{ active: borderWidth === 2 }">Thin</button>
      <button @click.stop="setMediumBorderDirect()" :class="{ active: borderWidth === 5 }">Medium</button>
      <button @click.stop="setThickBorderDirect()" :class="{ active: borderWidth === 10 }">Thick</button>
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
  user-select: none;
}

.menu-bar.visible {
  opacity: 1;
  pointer-events: auto !important;
  visibility: visible;
  z-index: 2000;
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
  min-width: 32px;
  height: 32px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  pointer-events: auto; /* Ensure the button is clickable */
  z-index: 1001; /* Ensure it's above other elements */
  padding: 0 12px;
}

.close-text {
  margin-left: 5px;
  font-weight: bold;
  font-size: 14px;
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
  pointer-events: auto; /* Ensure buttons are clickable */
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
