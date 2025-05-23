<template>
    <div :class="isDark ? 'bg-black text-white' : 'bg-white text-gray-900'" class="min-h-screen transition-colors duration-500">
      <div class="p-4">
        <!-- Header -->
        <header class="text-center mb-8">
          <router-link to="/">
              <h1 class="text-3xl font-extrabold tracking-wide leading-tight">
                {{ $t('gallery') }} <span :class="isDark ? 'text-purple-500' : 'text-indigo-600'"> {{ $t('terrasse') }} </span>
              </h1>
              <p :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="text-sm mt-2">
                {{ $t('sol.title') }}
              </p>
          </router-link>

          <div class=" flex flex-col mt-2">
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
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(image, index) in terrasseImages"
            :key="index"
            class="relative overflow-hidden rounded-xl cursor-pointer shadow-md group"
            @click="openModal(index)"
          >
            <img :src="image" class="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300" />
            <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-white text-lg font-semibold">
              Voir
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal Swiper -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button class="absolute top-5 right-4 text-xl text-red-700 cursor-pointer z-50" @click="closeModal">
            <Close/>
          </button>
          <swiper
          :initial-slide="selectedIndex"
          :slides-per-view="1"
          class="w-[90%] max-w-4xl rounded-2xl"
          :navigation="true"
          :pagination="{ clickable: true }"
        >
          <swiper-slide v-for="(image, index) in terrasseImages" :key="index" class="flex justify-center items-center">
            <img :src="image" class="rounded-xl max-h-[80vh] object-contain" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <Loader/>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import 'swiper/css'
  import 'swiper/css/navigation'
  import 'swiper/css/pagination'
  import Terasse_data from '@/data/terasse.json'
  import Loader from '@/components/Loader.vue'

  import { useI18n } from 'vue-i18n'

  const { locale } = useI18n()
  const currentLang = ref(locale.value)

  const switchLang = () => {
    currentLang.value = currentLang.value === 'fr' ? 'en' : 'fr'
    locale.value = currentLang.value
  }
  

  
  const isDark = ref(true)
  const toggleDark = () => (isDark.value = !isDark.value)
  
  const terrasseImages = ref(Terasse_data.map(item => {
    
    console.log(item);
    
    return new URL(`../assets/images/terasse/${item.img}`, import.meta.url).href
  }))

  console.log(terrasseImages.value);
  
  
  const showModal = ref(false)
  const selectedIndex = ref(0)
  
  const openModal = (index) => {
    selectedIndex.value = index
    showModal.value = true
  }
  const closeModal = () => {
    showModal.value = false
  }
  </script>
  
  <style scoped>
  .swiper-button-next,
  .swiper-button-prev {
    color: white;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.8));
  }
  .swiper-pagination-bullet-active {
    background: white;
  }
  </style>
  