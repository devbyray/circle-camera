<template>
  <div class="accordion">
    <h2 class="text-xl font-semibold mb-4" v-if="title">{{ title }}</h2>
    <div class="space-y-3">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>