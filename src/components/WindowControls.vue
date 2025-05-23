<script setup lang="ts">
import { closeApp } from '../utils/windowUtils'
import IconLibrary from './icons/IconLibrary.vue'

defineProps<{
	cameraSize: number
	updateAvailable: boolean
}>()

const emit = defineEmits(['resize', 'toggleSettings', 'toggleColorPicker', 'toggleUpdateOverlay'])

function resizeCamera(change: number) {
	emit('resize', change)
}

function toggleSettings() {
	emit('toggleSettings')
}

function toggleColorPicker() {
	emit('toggleColorPicker')
}

function toggleUpdateOverlay() {
	emit('toggleUpdateOverlay')
}

function handleCloseApp() {
	closeApp()
}
</script>

<template>
	<div class="window-controls">
		<div class="left-controls">
			<button class="control-button settings" @click="toggleSettings" title="Settings">
				<IconLibrary name="settings" size="16" color="#fff" />
			</button>
			<button class="control-button color-picker" @click="toggleColorPicker" title="Color Picker">
				<IconLibrary name="color-palette" size="16" color="#fff" />
			</button>
			<button
				v-if="updateAvailable"
				class="control-button update-available"
				@click="toggleUpdateOverlay"
				title="Update Available"
			>
      <span class="update-indicator">1</span>
				<IconLibrary name="download" size="16" color="#ccc" />
			</button>
		</div>

		<div class="right-controls">
			<button
				class="control-button resize"
				v-if="cameraSize > 100"
				@click="resizeCamera(-20)"
				title="Decrease size (- key)"
			>
				<IconLibrary name="remove" size="24" />
			</button>
			<button
				class="control-button resize"
				v-if="cameraSize < 350"
				@click="resizeCamera(20)"
				title="Increase size (+ key)"
			>
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

.control-button.update-available {
	position: relative;
}
.update-indicator {
  position: absolute;
  width: 1rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
	background-color: rgba(255, 0, 0, 0.7);
  font-size: 9px;
  top: -6px;
  right: -6px;
  border-radius: 100%;
  padding: 0.2rem;
}
.control-button.update-available:hover .update-indicator {
  color: #fff;
}

@keyframes pulse {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(1);
	}
}
</style>
