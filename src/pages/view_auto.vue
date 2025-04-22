<template>
  <div :class="isDark ? 'bg-black text-white' : 'bg-white text-gray-900'" class="min-h-screen transition-colors duration-500">
    <div class="p-4">
      <!-- Header -->
      <header class="text-center mb-8">
        <router-link to="/">
          <h1 class="text-3xl font-extrabold tracking-wide leading-tight">
            Galerie <span :class="isDark ? 'text-purple-500' : 'text-indigo-600'">Voitures</span>
          </h1>
          <p :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="text-sm mt-2">Comparaison Avant / Après lavage</p>
        </router-link>

        <button
          class="mt-4 px-4 py-1 rounded-full border text-xs transition-all duration-300"
          :class="isDark ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-200 text-gray-800 border-gray-400'"
          @click="toggleDark"
        >
          {{ isDark ? 'Mode Jour ☀️' : 'Mode Nuit 🌙' }}
        </button>
      </header>

      <!-- Galerie -->
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(car, index) in voitures" :key="index" class="cursor-pointer group" @click="openModal(index)">
          <div class="rounded-xl overflow-hidden shadow-lg">
            <div class="grid grid-cols-2 gap-0">
              <img :src="car.avant" class="object-cover w-full h-52 transition-transform duration-300 group-hover:scale-105" />
              <img :src="car.apres" class="object-cover w-full h-52 transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div class="p-2 text-center text-sm font-medium opacity-80">Avant / Après</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
  <div class="relative w-full max-w-6xl h-[90vh] flex flex-col items-center justify-center overflow-hidden">

    <!-- Bouton Fermer -->
    <button class="absolute top-5 right-6 text-3xl text-white hover:text-red-400 z-50" @click="closeModal">✖</button>

    <!-- Swiper -->
    <Swiper
      :modules="[Navigation]"
      :navigation="true"
      :initial-slide="activeIndex"
      class="w-full h-full swiper-clean"
    >
      <SwiperSlide v-for="(car, idx) in voitures" :key="idx">
        <div class="flex flex-col md:flex-row items-center justify-center gap-4 h-full px-4">
          <img
            :src="car.avant"
            class="rounded-xl object-contain w-full md:w-1/2 h-[80vh] transition-transform duration-300 hover:scale-105"
          />
          <img
            :src="car.apres"
            class="rounded-xl object-contain w-full md:w-1/2 h-[80vh] transition-transform duration-300 hover:scale-105"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import vehicule_data from '@/data/vehicules.json';
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

const isDark = ref(true)
const toggleDark = () => (isDark.value = !isDark.value)

const voitures = ref( vehicule_data.map((item) => {
  return {
    avant: new URL(`../assets/images/vehicule/${item.avant}`, import.meta.url).href,
    apres: new URL(`../assets/images/vehicule/${item.apres}`, import.meta.url).href,
    alt: item.alt,
    id: item.id
  }
}))


console.log(voitures.value);

  

const showModal = ref(false)
const activeIndex = ref(0)

const openModal = (index) => {
  activeIndex.value = index
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>

<style>
.swiper-clean .swiper-button-next,
.swiper-clean .swiper-button-prev {
  color: #fff;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}
</style>
