<template>
  <div class="py-16 md:py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto">
        <!-- Article Header -->
        <div v-if="post" class="mb-12">
          <div class="mb-6 text-sm text-gray-400">
            {{ new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            <span v-if="post.author" class="mx-2">•</span>
            <span v-if="post.author">{{ post.author }}</span>
          </div>
          
          <h1 class="mb-6 text-5xl">{{ post.title }}</h1>
          
          <p v-if="post.description" class="text-xl mb-8 italic">{{ post.description }}</p>
          
          <nav>
            <NuxtLink :to="post.releaseUrl" target="_blank" class="px-6 py-4 rounded-full bg-primary-dark hover:bg-primary text-white font-medium transition-colors">
              <span>Download this version</span>
            </NuxtLink>
          </nav>
        </div>
      
        
        <!-- Article Content -->
        <div v-if="post" class="prose prose-invert prose-lg max-w-none">
          <ContentRenderer :value="post" />
        </div>
        
        <!-- Article Footer -->
        <div v-if="post" class="mt-16 pt-10 border-t border-gray-800">
          <div v-if="post.tags && post.tags.length" class="mb-8">
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in post.tags" :key="tag" class="px-4 py-1.5 rounded-full bg-gray-800 text-gray-300 text-sm">
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="flex justify-between">
            <NuxtLink to="/changelog" class="text-blue-500 hover:text-blue-400 flex items-center gap-2">
              <span>← Back to changelog</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Get the current route to extract the slug
const route = useRoute()

// Get the slug from the route params
const slug = route.params.slug

// Properly construct the path for the changelog post
const postPath = Array.isArray(slug) ? `/changelog/${slug.join('/')}` : `/changelog/${slug}`

// Fetch the changelog post using Nuxt Content v3 API with queryCollection
const { data: post } = await useAsyncData(`changelog-post-${postPath}`, () => {
  return queryCollection('changelog').path(`/changelog/${slug}`).first()
})
</script>