<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-full hover:bg-gray-800/50 dark:hover:bg-gray-800/50 hover:bg-gray-200/50 transition-colors"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    aria-label="Toggle dark/light mode"
  >
    <!-- Sun icon for dark mode (shows when in dark mode to indicate you can switch to light) -->
    <svg
      v-if="isDark"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-yellow-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    <!-- Moon icon for light mode (shows when in light mode to indicate you can switch to dark) -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-gray-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// State to track dark/light mode
const isDark = ref(true)

// Toggle between dark and light modes
function toggleTheme() {
  isDark.value = !isDark.value
  updateTheme()
}

// Apply the current theme to the document
function updateTheme() {
  // Add/remove dark class from HTML element
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Initialize theme based on localStorage or system preference
onMounted(() => {
  // This function needs to run client-side only
  if (typeof window === 'undefined') return
  
  // First, check for theme in localStorage
  const savedTheme = localStorage.getItem('theme')
  
  if (savedTheme) {
    // Use the saved user preference
    isDark.value = savedTheme === 'dark'
  } else {
    // If no saved preference, use the system preference
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  
  // Apply the theme immediately
  updateTheme()
  
  // Create a script element to prevent flash of incorrect theme
  const themeScript = document.createElement('script')
  themeScript.innerHTML = `
    (function() {
      const theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })()
  `
  document.head.appendChild(themeScript)
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
      // Only change if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        isDark.value = event.matches
        updateTheme()
      }
    })
})
</script>