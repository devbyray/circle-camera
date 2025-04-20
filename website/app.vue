<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-zinc-950 text-white;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-bold;
  }

  h1 {
    @apply text-4xl md:text-5xl lg:text-6xl;
  }

  h2 {
    @apply text-3xl md:text-4xl;
  }

  h3 {
    @apply text-2xl md:text-3xl;
  }

  a {
    @apply text-blue-500 hover:text-blue-400 transition-colors;
  }
}
</style>
