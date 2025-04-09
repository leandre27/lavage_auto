<template>
  <main class="container mx-auto p-2">
    <h1 class="dark:text-white max-sm:text-xl sm:text-2xl md:text-3xl text-5xl font-bold">Notre galerie</h1>
    <p class="mt-2">Voici quelques-unes de nos plus belles photos</p>
    <div class="w-full grid grid-cols-3 space-y-6 space-x-2 items-center justify-center mt-4">
      <div 
        class="flex justify-center space-x-0.5 items-center rounded-md shadow-xl overflow-hidden cursor-pointer" 
        v-for="(photo, index) in photos" :key="index"
        @click="openModal(photo)"
        >
          <img 
            :src="photo.avant" 
            :alt="photo.alt" 
            class="w-full h-52 object-cover"/>
          <img 
            :src="photo.apres" 
            :alt="photo.alt" 
            class="w-full h-52 object-cover"/>
      </div>
    </div>
  </main>

  <aside :class="[showModal ? 'fixed h-screen w-full' : 'hidden']">
    <div class="fixed inset-0 bg-black opacity-90"></div>
    <div class="fixed inset-0 flex items-center justify-center">
      <button @click="showModal = false" class=" absolute text-red-600 top-2 right-2 px-4 py-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" 
          width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x">
          <circle cx="12" cy="12" r="10"/>
          <path d="m15 9-6 6"/>
          <path d="m9 9 6 6"/>
        </svg>
      </button>
      <div class="flex items-center justify-center space-x-2 rounded-lg shadow-lg p-4">
        <LeftArrow class="absolute left-2"/>
        <RightArrow class="absolute right-2"/>
        <img :src="photo_seleted?.avant" :alt="photo_seleted?.alt" class="w-4/12 h-auto mb-4"/>
        <img :src="photo_seleted?.apres" :alt="photo_seleted?.alt" class="w-4/12 h-auto mb-4"/>
      </div>
    </div>

  </aside>




</template>

<script setup>
import LeftArrow from '@/components/icons/LeftArrow.vue';
import RightArrow from '@/components/icons/RightArrow.vue';
import { ref } from 'vue';
const photos = ref([
  { 
    id: 1,
    avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
    apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
    alt: 'Photo 2' , 
  },
  { 
    id: 2,
    avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
    apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
    alt: 'Photo 2' , 
  },
  { 
    id: 3,
    avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
    apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
    alt: 'Photo 3' , 
  },
  { 
    id: 4,
    avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
    apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
    alt: 'Photo 4' , 
  },
  { 
    id: 5,
    avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
    apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
    alt: 'Photo 5' , 
  },
  { 
    id: 6,
    avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
    apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
    alt: 'Photo 6' , 
  },
  { 
    id: 7,
    avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
    apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
    alt: 'Photo 7' , 
  },
  { 
    id: 8,
    avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
    apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
    alt: 'Photo 8' , 
  },
  { 
    id: 9,
    avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
    apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
    alt: 'Photo 9' , 
  },
  { 
    id: 10,
    avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
    apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
    alt: 'Photo 10' , 
  },
  { 
    id: 11,
    avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
    apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
    alt: 'Photo 11' , 
  },
  { 
    id: 12,
    avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
    apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
    alt: 'Photo 12' , 
  },
  { 
    id: 13,
    avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
    apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
    alt: 'Photo 13' , 
  },
  { 
    id: 14,
    avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
    apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
    alt: 'Photo 14' , 
  },
  { 
    id: 15,
    avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
    apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
    alt: 'Photo 15' , 
  },
  
]);


const photo_seleted = ref(null);
const showModal = ref(false);
const openModal = (photo) => {
  photo_seleted.value = photo;
  showModal.value = true;
};

</script>