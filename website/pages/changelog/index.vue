<template>
  <div>
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center mb-16">
          <h1 class="mb-2 text-4xl">Circle Camera Releases</h1>
          <p class="text-xl text-gray-400 italic">
            Product updates.
          </p>
        </div>

        <div class="max-w-5xl mx-auto">
          <div class="grid gap-12">
            <div v-for="post in changelogPosts" :key="post.path" class="flex flex-col md:flex-row gap-8 border-b border-gray-800 pb-12">
              
              <div class="w-full">
                <div class="text-sm text-gray-400 mb-2">{{ new Date(post.date).toLocaleDateString() }}</div>
                <h2 class="text-2xl mb-4">
                  <NuxtLink :to="post.path" class="hover:text-blue-400 transition-colors">
                    {{ post.title }}
                  </NuxtLink>
                </h2>
                <p class=" mb-4">{{ post.description }}</p>
                <div class="flex items-center mt-4">
                  <div class="ml-auto">
                    <NuxtLink :to="post.path" class="text-blue-500 hover:text-blue-400">
                      Read more →
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="!changelogPosts || changelogPosts.length === 0" class="text-center py-20">
              <h3 class="text-xl mb-4">No changelog posts yet</h3>
              <p class="text-gray-400">Check back soon for new changelog posts!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Fetch all changelog posts with queryCollection API (Nuxt Content v3)
const { data: changelogPosts } = await useAsyncData('changelogPosts', () => {
	return queryCollection('changelog')
    .select('title', 'description', 'path', 'id', 'date', 'version', 'releaseUrl')
    .order('date', 'DESC')
    .all()
})
</script>