import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Debug function to check Tauri availability
async function checkTauriStatus() {
  console.log('Checking Tauri status...');
  console.log('window.__TAURI__ exists:', typeof window.__TAURI__ !== 'undefined');
  
  try {
    const tauriApp = await import('@tauri-apps/api/app');
    console.log('Tauri app API available:', typeof tauriApp !== 'undefined');
    
    if (typeof tauriApp.getVersion === 'function') {
      const version = await tauriApp.getVersion();
      console.log('App version from Tauri:', version);
    } else {
      console.log('Tauri getVersion is not a function');
    }
  } catch (error) {
    console.error('Error importing Tauri app API:', error);
  }
  
  try {
    const updater = await import('@tauri-apps/plugin-updater');
    console.log('Tauri updater plugin available:', typeof updater !== 'undefined');
    console.log('Tauri updater check function:', typeof updater.check);
  } catch (error) {
    console.error('Error importing Tauri updater plugin:', error);
  }
}

// Check Tauri status after a short delay to ensure everything is loaded
setTimeout(checkTauriStatus, 1000);

createApp(App).mount('#app')
