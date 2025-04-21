<template>
    <div
      v-if="showLoader"
      class="fixed inset-0 flex justify-center items-center bg-gray-100 z-50 overflow-hidden transition-opacity duration-1000"
      :class="{ 'opacity-0': fadeOut }"
    >
      <span class="absolute text-2xl sm:text-4xl font-bold uppercase text-slate-900 z-10 animate-scale-text">
        Wetjet
      </span>
  
      <div
        v-for="(col, index) in 8"
        :key="index"
        class="h-screen w-[12.5%] bg-slate-900"
        :class="index % 2 === 0 ? 'animate-slide-up' : 'animate-slide-down'"
      ></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const showLoader = ref(true)
  const fadeOut = ref(false)
  
  onMounted(() => {
    setTimeout(() => {
      fadeOut.value = true
      setTimeout(() => {
        showLoader.value = false
      }, 1000) // temps de transition après le fondu
    }, 2500) // temps d'affichage du loader avant le fondu
  })
  </script>
  
  <style scoped>
  @keyframes slide-up {
    50% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
  @keyframes slide-down {
    50% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(100%);
    }
  }
  @keyframes scale-text {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  
  .animate-slide-up {
    animation: slide-up 1s ease-in-out forwards;
  }
  .animate-slide-down {
    animation: slide-down 1s ease-in-out forwards;
  }
  .animate-scale-text {
    animation: scale-text 1s ease-in-out forwards;
  }
  </style>
  