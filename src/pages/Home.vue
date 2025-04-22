<template>
    <div :class="isDark ? 'bg-black text-white' : 'bg-white text-gray-900'" class="min-h-screen transition-colors duration-500">
      <div class="p-4">
        <!-- Header -->
        <header class="text-center mb-8">
            <h1 class="text-3xl font-extrabold tracking-wide leading-tight">
              WET<span :class="isDark ? 'text-purple-500' : 'text-indigo-600'">JET</span>
            </h1>
            <p :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="text-sm mt-2">
              {{ $t('home') }}
            </p>
            <div class="flex flex-col mt-2">
              <button @click="switchLang">
                🌐 {{ currentLang === 'fr' ? 'English' : 'Français' }}
              </button>
            </div>
  
          <!-- Toggle Mode -->
          <button
            class="mt-4 px-4 py-1 rounded-full border text-xs transition-all duration-300"
            :class="isDark ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-200 text-gray-800 border-gray-400'"
            @click="toggleDark"
          >
          {{ isDark ? $t('mode-jour') : $t('mode-nuit') }}
        </button>
        </header>
  
        <!-- Services -->
        <section class="space-y-8">
          <!-- Voiture -->
          <div
            ref="voitureCard"
            class="relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            @click="goToGallery('vehicule')"
          >
            <img
              :src="photos[0].url"
              :alt="photos[0].alt"
              class="absolute inset-0 w-full h-full object-cover brightness-75"
            />
            <div
              class="absolute inset-0 flex flex-col justify-end p-4 bg-black/40 backdrop-blur-sm"
            >
              <h2 class="text-white text-xl font-bold drop-shadow-[0_2px_4px_rgba(139,92,246,0.8)]">
                {{ $t('subtitle-car.title') }}
              </h2>
              <p class="text-sm mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-gray-200">
                {{ $t('subtitle-car.describe') }}
              </p>
            </div>
          </div>
  
          <!-- Sol -->
          <div
            ref="solCard"
            class="relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            @click="goToGallery('sol')"
          >
            <img
              :src="photos[1].url"
            :alt="photos[1].alt"
              class="absolute inset-0 w-full h-full object-cover brightness-75"
            />
            <div
              class="absolute inset-0 flex flex-col justify-end p-4 bg-black/40 backdrop-blur-sm"
            >
              <h2 class="text-white text-xl font-bold drop-shadow-[0_2px_4px_rgba(99,102,241,0.8)]">
                {{ $t('subtitle-sol.title') }}
              </h2>
              <p class="text-sm mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-gray-200">
                {{ $t('subtitle-sol.describe') }}              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
    

    <Loader/>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Loader from '@/components/Loader.vue'
import gsap from 'gsap'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const currentLang = ref(locale.value)

const switchLang = () => {
  currentLang.value = currentLang.value === 'fr' ? 'en' : 'fr'
  locale.value = currentLang.value
}
  
  const router = useRouter()
  const voitureCard = ref(null)
  const solCard = ref(null)
  
  const isDark = ref(true)
  
  const toggleDark = () => {
    isDark.value = !isDark.value
  }
  
  const goToGallery = (type) => {
    router.push(type)
  }
  
  onMounted(() => {
    gsap.from([voitureCard.value, solCard.value], {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3,
      ease: 'power2.out',
    })
  })


  const photos = ref([
    {
        id: 1,
        url: new URL('@/assets/images/vehicule/jeep_apres.jpg', import.meta.url).href,
        alt: 'Lavage voiture',   
    },
    {
        id: 2,
        url: new URL('@/assets/images/terasse/1.jpg', import.meta.url).href,
        alt: 'Lavage sol',
    }
  ])
  </script>
  