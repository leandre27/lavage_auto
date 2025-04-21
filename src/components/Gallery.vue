<template>
    <div class="gallery-item w-full grid max-sm:grid-cols-1 md:grid-cols-2 grid-cols-3 space-y-6 space-x-2 items-center justify-center mt-4">
      <GalleryItem
        v-for="photo in photos"
        :key="photo.id"
        :photo="photo"
        @click="openModal(photo)"
      />
    </div>
  </template>
  
  <script setup>
  import GalleryItem from './GalleryItem.vue';
  
  defineProps(['photos', 'openModal']);
  </script>
  