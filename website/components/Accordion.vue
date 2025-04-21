<template>
  <div class="accordion">
    <h2 class="text-xl font-semibold mb-4" v-if="title">{{ title }}</h2>
    <div class="space-y-3">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  singleOpen: {
    type: Boolean,
    default: false
  }
})

// Keep track of open items
const openItemIds = ref(new Set());

// Function to check if an item is open
function isOpen(id) {
  return openItemIds.value.has(id);
}

// Function to toggle an item's open state
function toggle(id) {
  if (openItemIds.value.has(id)) {
    openItemIds.value.delete(id);
  } else {
    // If singleOpen is true, close all other items
    if (props.singleOpen) {
      openItemIds.value.clear();
    }
    openItemIds.value.add(id);
  }
}

// Make the functions available to child AccordionItems
provide('accordionContext', { isOpen, toggle });
</script>