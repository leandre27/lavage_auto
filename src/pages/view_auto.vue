<template>
  <div :class="isDark ? 'bg-black text-white' : 'bg-white text-gray-900'" class="min-h-screen transition-colors duration-500">
    <div class="p-4">
      <!-- Header -->
      <header class="text-center mb-8">
        <router-link to="/">
          <h1 class="text-3xl font-extrabold tracking-wide leading-tight">
            {{ $t('gallery') }} <span :class="isDark ? 'text-purple-500' : 'text-indigo-600'"> {{ $t('vehicule') }} </span>
          </h1>
          <p :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="text-sm mt-2"> {{ $t('car.title') }} </p>
        </router-link>

        <div class="flex flex-col mt-2">
          <button @click="switchLang">
                🌐 {{ currentLang === 'fr' ? 'English' : 'Français' }}
          </button>
          <button
            class="mt-4 px-4 py-1 rounded-full border text-xs transition-all duration-300"
            :class="isDark ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-200 text-gray-800 border-gray-400'"
            @click="toggleDark"
          >
          {{ isDark ? $t('mode-jour') : $t('mode-nuit') }}
        </button>
        </div>
      </header>

      <!-- Galerie -->
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(car, index) in voitures" :key="index" class="cursor-pointer group" @click="openModal(index)">
          <div class="rounded-xl overflow-hidden shadow-lg">
            <div class="grid grid-cols-2 gap-0">
              <img :src="car.avant" class="object-cover w-full h-52 transition-transform duration-300 group-hover:scale-105" />
              <img :src="car.apres" class="object-cover w-full h-52 transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div class="p-2 text-center text-sm font-medium opacity-80"> {{ $t('before') }} / {{ $t('after') }} </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
  <div class="relative w-full max-w-6xl h-[90vh] flex flex-col items-center justify-center overflow-hidden">

    <!-- Bouton Fermer -->
    <button class="absolute top-5 right-4 text-xl text-red-700 cursor-pointer z-50" @click="closeModal">
      <Close/>
    </button>

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
  <Loader/>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import vehicule_data from '@/data/vehicules.json';
import Loader from '@/components/Loader.vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'




import { useI18n } from 'vue-i18n'
import Close from '@/components/icons/Close.vue';

const { locale } = useI18n()
const currentLang = ref(locale.value)

const switchLang = () => {
  currentLang.value = currentLang.value === 'fr' ? 'en' : 'fr'
  locale.value = currentLang.value
}
  

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
