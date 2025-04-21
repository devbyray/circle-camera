<template>
  <div>
    <section class="py-20 md:py-32">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center mb-16">
          <h1 class="mb-6">Download Circle Camera</h1>
          <p class="text-xl text-gray-400 mb-10">
            Get started with Circle Camera today - free for Windows and macOS.
          </p>
        </div>

        <div class="max-w-5xl mx-auto">
          <div class="grid md:grid-cols-2 gap-10">
            <!-- macOS Download -->
            <div class="bg-gray-900/50 p-10 rounded-xl border border-gray-800 text-center">
              <img src="/images/apple-logo.svg" alt="macOS" class="w-20 h-20 mx-auto mb-6 text-gray-300" />
              <h2 class="text-2xl mb-4">macOS</h2>
              <p class="text-gray-400 mb-6">Compatible with macOS 10.15 Catalina and newer</p>
              <a href="#" class="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-lg transition-colors inline-block">
                Download for Mac
              </a>
              <p class="text-sm text-gray-500 mt-4">Version 1.0.0 - Released April 18, 2025</p>
            </div>
            
            <!-- Windows Download (Disabled) -->
            <div class="bg-gray-900/30 p-10 rounded-xl border border-gray-800/50 text-center relative opacity-70">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="px-4 py-2 bg-gray-800/80 text-white rounded-full font-medium">Coming Soon</span>
              </div>
              <div class="filter grayscale blur-[0.5px]">
                <img src="/images/windows-logo.svg" alt="Windows" class="w-20 h-20 mx-auto mb-6 text-gray-400" />
                <h2 class="text-2xl mb-4 text-gray-500">Windows</h2>
                <p class="text-gray-500 mb-6">Compatible with Windows 10 and newer</p>
                <button disabled class="px-8 py-3 rounded-full bg-gray-700 text-gray-400 font-medium text-lg inline-block cursor-not-allowed">
                  Download for Windows
                </button>
                <p class="text-sm text-gray-600 mt-4">Version 1.0.0 - Coming Soon</p>
              </div>
            </div>
          </div>
          
          <!-- Installation Instructions -->
          <div class="mt-20">
            <h2 class="text-center mb-12">Installation Guide</h2>
            
            <div class="space-y-8">
              <!-- macOS Instructions -->
              <div class="bg-gray-900/30 p-8 rounded-xl">
                <h3 class="mb-4">Installing on macOS</h3>
                <ol class="list-decimal list-inside space-y-4 text-gray-300">
                  <li>Download the DMG file using the button above</li>
                  <li>Open the downloaded file</li>
                  <li>Drag Circle Camera to your Applications folder</li>
                  <li>Open Circle Camera from your Applications folder</li>
                  <li>If you see a security warning, go to System Preferences > Security & Privacy and click "Open Anyway"</li>
                </ol>
              </div>
              
              <!-- Windows Instructions -->
              <div class="bg-gray-900/30 p-8 rounded-xl opacity-70">
                <h3 class="mb-4 text-gray-500">Installing on Windows</h3>
                <ol class="list-decimal list-inside space-y-4 text-gray-500">
                  <li>Download the installer using the button above</li>
                  <li>Open the downloaded file</li>
                  <li>If SmartScreen appears, click "More info" and then "Run anyway"</li>
                  <li>Follow the installation wizard instructions</li>
                  <li>Launch Circle Camera from the Start menu or desktop shortcut</li>
                </ol>
              </div>
            </div>
          </div>

          <!-- FAQ Section -->
          <div class="mt-20">
            <h2 class="text-center mb-12">Frequently Asked Questions</h2>
            
            <div class="space-y-6">
              <div class="border border-gray-800 rounded-lg overflow-hidden">
                <div class="p-6 bg-gray-900/50">
                  <h3 class="text-xl">Is Circle Camera free?</h3>
                </div>
                <div class="p-6 bg-gray-900/30">
                  <p>Yes! Circle Camera is completely free to download and use. We may introduce premium features in the future, but the core functionality will always remain free.</p>
                </div>
              </div>
              
              <div class="border border-gray-800 rounded-lg overflow-hidden">
                <div class="p-6 bg-gray-900/50">
                  <h3 class="text-xl">Can I use Circle Camera with any video conferencing app?</h3>
                </div>
                <div class="p-6 bg-gray-900/30">
                  <p>Absolutely! Circle Camera works with Zoom, Microsoft Teams, Google Meet, Webex, and any other application that can access your webcam.</p>
                </div>
              </div>
              
              <div class="border border-gray-800 rounded-lg overflow-hidden">
                <div class="p-6 bg-gray-900/50">
                  <h3 class="text-xl">What are the system requirements?</h3>
                </div>
                <div class="p-6 bg-gray-900/30">
                  <p>Circle Camera is designed to be lightweight. It runs on macOS 10.15+ and Windows 10+. We recommend at least 4GB of RAM and any webcam compatible with your operating system.</p>
                </div>
              </div>
            </div>
            
            <div class="text-center mt-12">
              <NuxtLink to="/faq" class="text-blue-500 hover:text-blue-400">
                View all FAQs →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Make SVG icons lighter in dark mode */
img[src$=".svg"] {
  filter: brightness(1.5);
}
</style>