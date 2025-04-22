<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <GalleryItem
      v-for="(photo, index) in photos"
      :key="photo.id"
      :photo="photo"
      @click="() => $emit('open', index)"
    />
  </div>
</template>

<script setup>
import GalleryItem from './GalleryItem.vue';

defineProps(['photos']);
defineEmits(['open']);
</script>
