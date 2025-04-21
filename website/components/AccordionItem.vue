<template>
  <div class="accordion-item border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
    <h3>
      <button 
        class="accordion-trigger w-full p-6 flex justify-between items-center text-left bg-gray-100 dark:bg-gray-900/50 hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-colors"
        @click="toggle"
        @keydown.space.prevent="toggle"
        @keydown.enter.prevent="toggle"
        :aria-expanded="isOpen"
        :aria-controls="itemId"
        :id="headerId"
      >
        <span class="text-xl text-gray-800 dark:text-white">{{ title }}</span>
        <span class="transition-transform" :class="{ 'rotate-180': isOpen }">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </span>
      </button>
    </h3>
    <div 
      :id="itemId"
      role="region"
      :aria-labelledby="headerId"
      v-show="isOpen"
      class="accordion-content p-6 bg-white dark:bg-gray-900/30"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  initialOpen: {
    type: Boolean,
    default: false
  }
});

const isOpen = ref(props.initialOpen);
const itemId = ref('');
const headerId = ref('');

// Generate unique IDs for accessibility
onMounted(() => {
  const uniqueId = `accordion-${Math.random().toString(36).substring(2, 10)}`;
  itemId.value = `${uniqueId}-panel`;
  headerId.value = `${uniqueId}-header`;
});

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>