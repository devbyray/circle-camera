<template>
  <div class="min-h-screen flex flex-col bg-black text-white">
    <!-- Header -->
    <header class="py-6 border-b border-gray-800">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <NuxtLink to="/" class="text-2xl font-bold text-white hover:text-blue-400">
              Circle Camera
            </NuxtLink>
          </div>
          
          <nav class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/features" class="text-gray-300 hover:text-white transition-colors">Features</NuxtLink>
            <NuxtLink to="/pricing" class="text-gray-300 hover:text-white transition-colors">Pricing</NuxtLink>
            <NuxtLink to="/blog" class="text-gray-300 hover:text-white transition-colors">Blog</NuxtLink>
            <NuxtLink to="https://docs.circlecamera.com" class="text-gray-300 hover:text-white transition-colors">Docs</NuxtLink>
          </nav>
          
          <div class="flex items-center space-x-4">
            <NuxtLink to="/download" class="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors">
              Download
            </NuxtLink>
            
            <!-- Mobile menu button -->
            <button class="md:hidden text-gray-300 hover:text-white">
              <!-- Replace with proper icon component or SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="py-12 border-t border-gray-800 mt-20">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-semibold mb-4">Circle Camera</h3>
            <p class="text-gray-400 max-w-xs">A sleek, minimalist webcam app that displays your camera feed in a perfect circle.</p>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Product</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/features" class="text-gray-400 hover:text-white">Features</NuxtLink></li>
              <li><NuxtLink to="/pricing" class="text-gray-400 hover:text-white">Pricing</NuxtLink></li>
              <li><NuxtLink to="/download" class="text-gray-400 hover:text-white">Download</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Resources</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/blog" class="text-gray-400 hover:text-white">Blog</NuxtLink></li>
              <li><NuxtLink to="https://docs.circlecamera.com" class="text-gray-400 hover:text-white">Documentation</NuxtLink></li>
              <li><NuxtLink to="/faq" class="text-gray-400 hover:text-white">FAQ</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Connect</h4>
            <ul class="space-y-2">
              <li><a href="https://github.com/devbyray/circle-camera" target="_blank" class="text-gray-400 hover:text-white">GitHub</a></li>
              <li><a href="https://twitter.com/circlecamera" target="_blank" class="text-gray-400 hover:text-white">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div class="mt-12 pt-8 border-t border-gray-800 text-center">
          <p class="text-gray-500">&copy; {{ new Date().getFullYear() }} Circle Camera. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>