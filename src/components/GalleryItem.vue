<template>
    <div 
      class="flex justify-center space-x-0.5 items-center rounded-md shadow-xl overflow-hidden cursor-pointer"
      @click="$emit('click')"
    >
      <img :src="photo.avant" :alt="photo.alt" class="w-full h-44 object-cover" />
      <img :src="photo.apres" :alt="photo.alt" class="w-full h-44 object-cover" />
    </div>
  </template>
  
  <script setup>
  defineProps(['photo']);
  </script>
  