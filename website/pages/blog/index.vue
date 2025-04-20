<template>
  <div>
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center mb-16">
          <h1 class="mb-6">Circle Camera Blog</h1>
          <p class="text-xl text-gray-400">
            Updates, tutorials, and insights about Circle Camera and video conferencing.
          </p>
        </div>

        <div class="max-w-5xl mx-auto">
          <ContentList path="/blog">
            <template #default="{ list }">
              <div class="grid gap-12">
                <div v-for="article in list" :key="article._path" class="flex flex-col md:flex-row gap-8 border-b border-gray-800 pb-12">
                  <div class="md:w-1/3">
                    <NuxtLink :to="article._path">
                      <img v-if="article.image" :src="article.image" :alt="article.title" class="w-full h-48 object-cover rounded-xl border border-gray-800" />
                      <div v-else class="w-full h-48 bg-gray-800 rounded-xl flex items-center justify-center">
                        <span class="text-gray-400">No image</span>
                      </div>
                    </NuxtLink>
                  </div>
                  
                  <div class="md:w-2/3">
                    <div class="text-sm text-gray-400 mb-2">{{ new Date(article.date).toLocaleDateString() }}</div>
                    <h2 class="text-2xl mb-4">
                      <NuxtLink :to="article._path" class="hover:text-blue-400 transition-colors">
                        {{ article.title }}
                      </NuxtLink>
                    </h2>
                    <p class="text-gray-400 mb-4">{{ article.description }}</p>
                    <div class="flex items-center mt-4">
                      <div class="flex flex-wrap gap-2">
                        <span v-for="tag in article.tags" :key="tag" class="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-300">
                          {{ tag }}
                        </span>
                      </div>
                      <div class="ml-auto">
                        <NuxtLink :to="article._path" class="text-blue-500 hover:text-blue-400">
                          Read more →
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #empty>
              <div class="text-center py-20">
                <h3 class="text-xl mb-4">No blog posts yet</h3>
                <p class="text-gray-400">Check back soon for new articles!</p>
              </div>
            </template>
          </ContentList>
        </div>
      </div>
    </section>
  </div>
</template>