<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-gray-800 dark:text-white">
    <!-- Header -->
    <header class="py-6 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-zinc-950 z-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <NuxtLink to="/" class="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 inline-flex gap-4">
              <img src="/images/app-logo.svg" class="w-8" width="32" height="32" alt="Circle Camera logo" />
              Circle Camera
            </NuxtLink>
          </div>
          
          <nav class="hidden md:flex items-center space-x-8">
            <NuxtLink to="https://docs.circlecamera.com" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Docs</NuxtLink>
            <NuxtLink to="/changelog" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Changelog</NuxtLink>
            <NuxtLink to="/blog" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Blog</NuxtLink>
          </nav>
          
          <div class="flex items-center space-x-4">
            <!-- Theme Toggle Button -->
            <ThemeToggle />
            
            <NuxtLink to="/download" class="px-6 py-2 rounded-full bg-primary-dark hover:bg-primary text-white font-medium transition-colors">
              Download
            </NuxtLink>
            
            <!-- Mobile menu button -->
            <button 
              class="md:hidden cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              @click="toggleMobileMenu"
              aria-label="Toggle mobile menu"
              :aria-expanded="mobileMenuOpen"
            >
              <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div 
      v-if="mobileMenuOpen" 
      class="fixed inset-0 bg-white dark:bg-zinc-950 z-40 md:hidden flex flex-col"
      @keydown.escape="closeMobileMenu"
    >
      <div class="container mx-auto px-4 py-6 flex-grow">
        <nav class="flex flex-col space-y-6 mt-8 text-center">
          <NuxtLink 
            to="/features" 
            class="text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
            @click="closeMobileMenu"
          >
            Features
          </NuxtLink>
          <NuxtLink 
            to="/pricing" 
            class="text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
            @click="closeMobileMenu"
          >
            Pricing
          </NuxtLink>
          <NuxtLink 
            to="/blog" 
            class="text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
            @click="closeMobileMenu"
          >
            Blog
          </NuxtLink>
          <NuxtLink 
            to="https://docs.circlecamera.com" 
            class="text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
            @click="closeMobileMenu"
          >
            Docs
          </NuxtLink>
          <NuxtLink 
            to="/changelog" 
            class="text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
            @click="closeMobileMenu"
          >
            Changelog
          </NuxtLink>
          <div class="border-t border-gray-200 dark:border-gray-800 pt-6">
            <NuxtLink 
              to="/download" 
              class="inline-block px-8 py-3 rounded-full bg-primary-dark hover:bg-primary text-white font-medium transition-colors"
              @click="closeMobileMenu"
            >
              Download
            </NuxtLink>
          </div>
        </nav>
      </div>
    </div>

    <!-- Main content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="py-12 border-t border-gray-200 dark:border-gray-800 mt-20 bg-gray-50 dark:bg-transparent">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Circle Camera</h3>
            <p class="text-gray-600 dark:text-gray-400 max-w-xs">A sleek, minimalist webcam app that displays your camera feed in a perfect circle.</p>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4 text-gray-800 dark:text-white">Product</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/features" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Features</NuxtLink></li>
              <li><NuxtLink to="/pricing" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Pricing</NuxtLink></li>
              <li><NuxtLink to="/download" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Download</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4 text-gray-800 dark:text-white">Resources</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/blog" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Blog</NuxtLink></li>
              <li><NuxtLink to="https://docs.circlecamera.com" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Documentation</NuxtLink></li>
              <li><NuxtLink to="/faq" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">FAQ</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4 text-gray-800 dark:text-white">Connect</h4>
            <ul class="space-y-2">
              <li><a href="https://github.com/devbyray/circle-camera" target="_blank" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">GitHub</a></li>
              <li><a href="https://twitter.com/circlecamera" target="_blank" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p class="text-gray-500">&copy; {{ new Date().getFullYear() }} Circle Camera. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ThemeToggle from '~/components/ThemeToggle.vue'

// Mobile menu state
const mobileMenuOpen = ref(false)

// Toggle mobile menu
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
  
  // When menu is open, prevent scrolling on the body
  if (mobileMenuOpen.value) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
}

// Close mobile menu
function closeMobileMenu() {
  mobileMenuOpen.value = false
  document.body.classList.remove('overflow-hidden')
}

// Close mobile menu on route change
watch(() => useRoute().fullPath, () => {
  closeMobileMenu()
})

// Close mobile menu on escape key press
if (process.client) {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuOpen.value) {
      closeMobileMenu()
    }
  })
}
</script>

<style>
body.overflow-hidden {
  overflow: hidden;
}
</style>