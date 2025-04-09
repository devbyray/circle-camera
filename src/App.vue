<script setup lang="ts">
// Add TypeScript declarations for Tauri
declare global {
  interface Window {
    __TAURI__?: any;
  }
  interface Navigator {
    webkitGetUserMedia?: (constraints: MediaStreamConstraints,
                         successCallback: (stream: MediaStream) => void,
                         errorCallback: (error: Error) => void) => void;
  }
}

// Import the main container component
import WebcamContainer from './components/WebcamContainer.vue';
</script>

<template>
  <WebcamContainer />
</template>

<style>
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #f6f6f6;
  background-color: transparent;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}

#app {
  height: 100%;
  background-color: transparent;
}
</style>