<template>
  <div class="py-16 md:py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto">
        <ContentDoc v-slot="{ doc }">
          <!-- Article Header -->
          <div class="mb-12">
            <div class="mb-6 text-sm text-gray-400">
              {{ new Date(doc.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              <span v-if="doc.author" class="mx-2">•</span>
              <span v-if="doc.author">{{ doc.author }}</span>
            </div>
            
            <h1 class="mb-6">{{ doc.title }}</h1>
            
            <p v-if="doc.description" class="text-xl text-gray-300 mb-8">{{ doc.description }}</p>
            
            <div v-if="doc.image" class="mb-10">
              <img :src="doc.image" :alt="doc.title" class="w-full rounded-xl shadow-lg border border-gray-800" />
            </div>
          </div>
          
          <!-- Article Content -->
          <div class="prose prose-invert prose-lg max-w-none">
            <ContentRenderer :value="doc" />
          </div>
          
          <!-- Article Footer -->
          <div class="mt-16 pt-10 border-t border-gray-800">
            <div v-if="doc.tags && doc.tags.length" class="mb-8">
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in doc.tags" :key="tag" class="px-4 py-1.5 rounded-full bg-gray-800 text-gray-300 text-sm">
                  {{ tag }}
                </span>
              </div>
            </div>
            
            <div class="flex justify-between">
              <NuxtLink to="/blog" class="text-blue-500 hover:text-blue-400 flex items-center gap-2">
                <span>← Back to blog</span>
              </NuxtLink>
            </div>
          </div>
        </ContentDoc>
      </div>
    </div>
  </div>
</template>