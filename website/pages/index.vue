<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 md:py-32">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center flex flex-col items-center">
          <img src="/images/app-logo.svg" class="w-24 mb-8" />
          <h1 class="mb-8">
            A sleek, minimalist webcam app
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500">
              in a perfect circle.
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Enhance your video calls with a clean, distraction-free camera feed that perfectly frames your face.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <NuxtLink to="/download" class="px-8 py-3 rounded-full bg-primary-dark hover:bg-primary text-white font-medium text-lg transition-colors">
              Download Now
            </NuxtLink>
            <NuxtLink to="/features" class="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 text-gray-800 dark:text-white font-medium text-lg transition-colors">
              Learn More
            </NuxtLink>
          </div>
          
          <!-- Hero Image -->
          <div class="mt-16 relative">
            <div class="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl"></div>
            <img src="/images/hero-screenshot.png" alt="Circle Camera in action" class="rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 mx-auto" />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-center mb-16">Designed for <span class="text-blue-600 dark:text-blue-500">perfect video calls</span></h2>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-gray-100/80 dark:bg-gray-900/50 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
            <div class="w-12 h-12 bg-primary/10 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
              <span class="text-2xl">🎯</span>
            </div>
            <h3 class="text-xl mb-4">Perfect Circle Format</h3>
            <p class="text-gray-600 dark:text-gray-400">Frame yourself in a clean, perfectly circular display that eliminates distractions.</p>
          </div>
          
          <!-- Feature 2 -->
          <div class="bg-gray-100/80 dark:bg-gray-900/50 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
            <div class="w-12 h-12 bg-primary/10 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
              <span class="text-2xl">🎨</span>
            </div>
            <h3 class="text-xl mb-4">Customizable Colors</h3>
            <p class="text-gray-600 dark:text-gray-400">Choose from a variety of colors to match your brand or mood for the perfect look.</p>
          </div>
          
          <!-- Feature 3 -->
          <div class="bg-gray-100/80 dark:bg-gray-900/50 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
            <div class="w-12 h-12 bg-primary/10 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
              <span class="text-2xl">⚡</span>
            </div>
            <h3 class="text-xl mb-4">Lightweight & Fast</h3>
            <p class="text-gray-600 dark:text-gray-400">Minimal CPU usage, ensuring your calls stay smooth even on older hardware.</p>
          </div>
          
          <!-- Feature 4 -->
          <div class="bg-gray-100/80 dark:bg-gray-900/50 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
            <div class="w-12 h-12 bg-primary/10 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
              <span class="text-2xl">🖥️</span>
            </div>
            <h3 class="text-xl mb-4">Works with Any App</h3>
            <p class="text-gray-600 dark:text-gray-400">Compatible with Zoom, Teams, Google Meet, and all other video conferencing apps.</p>
          </div>
          
          <!-- Feature 5 -->
          <div class="bg-gray-100/80 dark:bg-gray-900/50 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
            <div class="w-12 h-12 bg-primary/10 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
              <span class="text-2xl">🔒</span>
            </div>
            <h3 class="text-xl mb-4">Privacy Focused</h3>
            <p class="text-gray-600 dark:text-gray-400">Your video never leaves your device - we respect your privacy and security.</p>
          </div>
          
          <!-- Feature 6 -->
          <div class="bg-gray-100/80 dark:bg-gray-900/50 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
            <div class="w-12 h-12 bg-primary/10 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
              <span class="text-2xl">🔄</span>
            </div>
            <h3 class="text-xl mb-4">Always Updated</h3>
            <p class="text-gray-600 dark:text-gray-400">Regular updates with new features and improvements, all completely free.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof Section -->
    <section class="py-20 bg-gradient-to-b from-gray-50/80 to-transparent dark:from-gray-900/50 dark:to-transparent">
      <div class="container mx-auto px-4">
        <h2 class="text-center mb-16">Loved by <span class="text-blue-600 dark:text-blue-500">professionals worldwide</span></h2>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/30">
            <div class="flex items-center mb-4">
              <div class="text-yellow-500">★★★★★</div>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-6">"Circle Camera has completely transformed my video calls. The clean aesthetic makes me look more professional with minimal effort."</p>
            <div class="flex items-center">
              <div class="ml-3">
                <div class="font-medium">Sarah Johnson</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Marketing Director</div>
              </div>
            </div>
          </div>
          
          <!-- Testimonial 2 -->
          <div class="p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/30">
            <div class="flex items-center mb-4">
              <div class="text-yellow-500">★★★★★</div>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-6">"As a developer who's on calls all day, I appreciate how lightweight Circle Camera is. It doesn't slow down my system like other webcam apps."</p>
            <div class="flex items-center">
              <div class="ml-3">
                <div class="font-medium">Michael Chen</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Software Engineer</div>
              </div>
            </div>
          </div>
          
          <!-- Testimonial 3 -->
          <div class="p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/30">
            <div class="flex items-center mb-4">
              <div class="text-yellow-500">★★★★★</div>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-6">"I use Circle Camera for all my YouTube content now. The circular format gives my videos a unique and professional look."</p>
            <div class="flex items-center">
              <div class="ml-3">
                <div class="font-medium">Emma Rodriguez</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Content Creator</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/30 dark:to-purple-900/30 border border-gray-200 dark:border-gray-800">
          <h2 class="mb-6">Ready to upgrade your video calls?</h2>
          <p class="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've enhanced their online presence with Circle Camera.
          </p>
          <NuxtLink to="/download" class="px-8 py-3 rounded-full bg-primary-dark hover:bg-primary text-white font-medium text-lg transition-colors">
            Download for Free
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Latest from blog section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-12">
          <h2>Latest from our blog</h2>
          <NuxtLink to="/blog" class="text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400">
            View all posts →
          </NuxtLink>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Blog post previews will be rendered here -->
          <div v-for="article in blogPosts" :key="article._path" class="bg-gray-100/80 dark:bg-gray-900/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
            <NuxtLink :to="article._path">
              <img v-if="article.image" :src="article.image" :alt="article.title" class="w-full h-48 object-cover" />
              <div class="p-6">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ new Date(article.date).toLocaleDateString() }}</div>
                <h3 class="text-xl mb-3">{{ article.title }}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">{{ article.description }}</p>
                <div class="text-blue-600 dark:text-blue-500">Read more →</div>
              </div>
            </NuxtLink>
          </div>
          <div v-if="!blogPosts || blogPosts.length === 0" class="col-span-3 text-center py-10">
            <p>Check back soon for new blog posts!</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Fetch blog posts with queryCollection API (Nuxt Content v3)
const { data: blogPosts } = await useAsyncData('blogPosts', () => {
  return queryCollection('content')
    .where('path', 'LIKE', '/blog/%')
    .limit(3)
    .find()
})
</script>