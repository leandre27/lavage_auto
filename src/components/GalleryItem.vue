<template>
  <div class="cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg rounded overflow-hidden">
    <div class="flex">
      <img :src="photo.avant" :alt="photo.alt" class="w-1/2 object-cover h-48" />
      <img :src="photo.apres" :alt="photo.alt" class="w-1/2 object-cover h-48" />
    </div>
  </div>
</template>

<script setup>
defineProps(['photo']);
</script>
