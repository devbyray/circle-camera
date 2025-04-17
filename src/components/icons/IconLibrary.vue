<script setup lang="ts">
import { defineProps } from 'vue';
import { 
  Settings as SettingsIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Link as LinkIcon,
  Camera as CameraIcon,
  ColorPalette as ColorPaletteIcon,
  Square as SquareIcon,
  Ellipse as CircleIcon,
  Resize as ResizeIcon,
  CloudDownload as Download
} from '@vicons/ionicons5';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 20
  },
  color: {
    type: String,
    default: 'currentColor'
  }
});

// Map of icon names to components
const iconMap = {
  'settings': SettingsIcon,
  'close': CloseIcon,
  'add': AddIcon,
  'remove': RemoveIcon,
  'link': LinkIcon,
  'camera': CameraIcon,
  'color-palette': ColorPaletteIcon,
  'square': SquareIcon,
  'circle': CircleIcon,
  'resize': ResizeIcon,
  'download': Download
};

// Get the icon component based on the name prop
const IconComponent = iconMap[props.name as keyof typeof iconMap];
</script>

<template>
  <component 
    :is="IconComponent" 
    :style="{ 
      width: typeof size === 'number' ? `${size}px` : size, 
      height: typeof size === 'number' ? `${size}px` : size,
      color: color 
    }" 
  />
</template>

<style scoped>
/* Add any additional styling here */
</style>
