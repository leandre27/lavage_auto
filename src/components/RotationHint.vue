<template>
    <div class="fixed inset-0 bg-blue-500 bg-opacity-90 z-50 flex flex-col items-center text-center justify-center text-white">
      <img :src="src" alt="rotation" class="w-11 h-11 object-contain mb-4" />
      <p class="text-sm font-semibold">Veuillez faire pivoter votre appareil en mode paysage pour voir les photos</p>
    </div>
  </template>
  
  <script setup>
  defineProps(['src']);
  </script>
  