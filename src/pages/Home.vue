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

  <aside v-if="showModal && !showRotationHint" class="fixed h-screen w-full z-50">
    <div class="fixed inset-0 bg-black opacity-90"></div>
    <div class="fixed inset-0 flex flex-col items-center justify-center space-y-4 px-4">
      <button @click="showModal = false" class="absolute text-red-600 top-2 right-2 px-4 py-2">
        <!-- svg -->
      </button>

      <div class="flex flex-col items-center justify-center">
        <div class="relative flex items-center justify-center">
          <button v-if="selectedIndex > 0" @click="goPrev" class="absolute left-2">
            <LeftArrow />
          </button>

          <div class="flex items-center justify-center space-x-2 p-4  rounded-lg shadow-lg">
            <template v-if="!showSlider">
              <img
                :src="photo_seleted?.avant"
                :alt="photo_seleted?.alt"
                class="w-4/12 h-auto"
              />
              <img
                :src="photo_seleted?.apres"
                :alt="photo_seleted?.alt"
                class="w-4/12 h-auto"
              />
            </template>

            <template v-else>
              <ImgComparisonSlider class="w-[66vw] max-w-[900px] h-auto">
                <img slot="first" class="w-full object-contain" :src="photo_seleted?.avant" />
                <img slot="second" class="w-full object-contain" :src="photo_seleted?.apres" />
              </ImgComparisonSlider>
            </template>
          </div>

          <button v-if="selectedIndex < photos.length - 1" @click="goNext" class="absolute right-2">
            <RightArrow />
          </button>
        </div>

        <button
          class="mt-4 bg-white text-black px-4 py-2 rounded-lg shadow-md font-semibold text-sm"
          @click="showSlider = !showSlider"  >
          {{ showSlider ? "Revenir à la vue séparée" : "Comparer avec le slider" }}
        </button>
      </div>



    </div>
  </aside>



  <!-- rotation d'écran -->
  <aside v-if="showRotationHint" class="fixed inset-0 bg-blue-500 bg-opacity-90 z-50 flex flex-col items-center text-center justify-center text-white">
    <img :src="rotation.src" alt="rotation" class="w-11 h-11 object-contain mb-4" />
    <p class="text-sm font-semibold">Veuillez faire pivoter votre appareil en mode paysage pour voir les photos</p>
  </aside>





</template>

<script setup>
import LeftArrow from '@/components/icons/LeftArrow.vue';
import RightArrow from '@/components/icons/RightArrow.vue';
import { ref, onMounted, onBeforeUnmount, watch} from 'vue';
import { ImgComparisonSlider } from '@img-comparison-slider/vue';
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
const rotation = ref({
  src: new URL('../assets/images/rotation.gif', import.meta.url).href,
})

const photo_seleted = ref(null);
const showModal = ref(false);


const isLandscape = ref(window.matchMedia("(orientation: landscape)").matches);
const showRotationHint = ref(false);

const selectedIndex = ref(0);
const showSlider = ref(false);

const openModal = (photo) => {
  checkOrientation();
  if (!isLandscape.value) {
    showRotationHint.value = true;
    return;
  }
  selectedIndex.value = photos.value.findIndex(p => p.id === photo.id);
  photo_seleted.value = photos.value[selectedIndex.value];
  showModal.value = true;
  showSlider.value = false; // Reset slider view
};

const goNext = () => {
  if (selectedIndex.value < photos.value.length - 1) {
    selectedIndex.value++;
    photo_seleted.value = photos.value[selectedIndex.value];
    showSlider.value = false;
  }
};

const goPrev = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--;
    photo_seleted.value = photos.value[selectedIndex.value];
    showSlider.value = false;
  }
};

const checkOrientation = () => {
  isLandscape.value = window.matchMedia("(orientation: landscape)").matches;
};



const handleOrientationChange = () => {
  checkOrientation();
  if (isLandscape.value && showRotationHint.value) {
    showRotationHint.value = false;
    showModal.value = true;
  }
};

onMounted(() => {
  window.addEventListener('orientationchange', handleOrientationChange);
  window.addEventListener('resize', handleOrientationChange);
});

onBeforeUnmount(() => {
  window.removeEventListener('orientationchange', handleOrientationChange);
  window.removeEventListener('resize', handleOrientationChange);
});

</script>