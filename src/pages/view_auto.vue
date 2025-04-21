<template>
  

  
  <transition name="fade">
    <div v-if="isLoading">
      <Loader/>
    </div>
  </transition>


  <div v-show="!isLoading" class="dark:bg-gray-900 h-screen">
    <main class="container mx-auto p-4 ">
      <div class="flex items-center justify-between">
        <h1 class="dark:text-white max-sm:text-2xl sm:text-4xl md:text-5xl text-6xl font-bold">Notre galerie</h1>
        <DarkMode />
      </div>

      <p class="mt-2 dark:text-white">Voici quelques-unes de nos plus belles photos</p>
      <Gallery   :photos="photos"  :openModal="openModal" />
        
    </main>
  </div>

  <Modal
    v-if="showModal"
    :photo="photo_seleted"
    :show="showModal"
    :showSlider="showSlider"
    @close="showModal = false"
    @prev="goPrev"
    @next="goNext"
    :hasPrev="selectedIndex > 0"
    :hasNext="selectedIndex < photos.length - 1"
    @toggle-slider="showSlider = !showSlider"
  />


  <!-- rotation d'écran -->
  <!-- <RotationHint v-if="showRotationHint" :src="rotation.src" /> -->





</template>

<script setup>
import gsap from 'gsap';
import Loader from '@/components/Loader.vue';
import ScrollTrigger from 'gsap/ScrollTrigger';
import DarkMode from '@/components/DarkMode.vue';
import Gallery from '@/components/Gallery.vue';
import Modal from '@/components/Modal.vue';
import vehicule_data from '@/data/vehicules.json';
import { ref, onMounted, onBeforeUnmount, watch} from 'vue';


// import RotationHint from '@/components/RotationHint.vue';

gsap.registerPlugin(ScrollTrigger);

// const photos = ref([
//   { 
//     id: 1,
//     avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
//     apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
//     alt: 'Photo 2' , 
//   },
//   { 
//     id: 2,
//     avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
//     apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
//     alt: 'Photo 2' , 
//   },
//   { 
//     id: 3,
//     avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
//     apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
//     alt: 'Photo 3' , 
//   },
//   { 
//     id: 4,
//     avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
//     apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
//     alt: 'Photo 4' , 
//   },
//   { 
//     id: 5,
//     avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
//     apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
//     alt: 'Photo 5' , 
//   },
//   { 
//     id: 6,
//     avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
//     apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
//     alt: 'Photo 6' , 
//   },
//   { 
//     id: 7,
//     avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
//     apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
//     alt: 'Photo 7' , 
//   },
//   { 
//     id: 8,
//     avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
//     apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
//     alt: 'Photo 8' , 
//   },
//   { 
//     id: 9,
//     avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
//     apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
//     alt: 'Photo 9' , 
//   },
//   { 
//     id: 10,
//     avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
//     apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
//     alt: 'Photo 10' , 
//   },
//   { 
//     id: 11,
//     avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
//     apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
//     alt: 'Photo 11' , 
//   },
//   { 
//     id: 12,
//     avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
//     apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
//     alt: 'Photo 12' , 
//   },
//   { 
//     id: 13,
//     avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
//     apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
//     alt: 'Photo 13' , 
//   },
//   { 
//     id: 14,
//     avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
//     apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
//     alt: 'Photo 14' , 
//   },
//   { 
//     id: 15,
//     avant: new URL('../assets/images/jeep_avant.jpg', import.meta.url).href,
//     apres: new URL('../assets/images/jeep_apres.jpg', import.meta.url).href,
//     alt: 'Photo 15' , 
//   },
  
// ]);


const photos = ref(vehicule_data.map((item, index) => ({
  id: index + 1,
  avant: new URL(`../assets/images/vehicule/${item.avant}`, import.meta.url).href,
  apres: new URL(`../assets/images/vehicule/${item.apres}`, import.meta.url).href,
  alt: `Photo ${index + 1}`,
}))); 

// const rotation = ref({
//   src: new URL('../assets/images/rotation.gif', import.meta.url).href,
// })

const photo_seleted = ref(null);
const showModal = ref(false);
const isLoading = ref(true);



const isLandscape = ref(window.matchMedia("(orientation: landscape)").matches);
// const showRotationHint = ref(false);

const selectedIndex = ref(0);
const showSlider = ref(false);

const openModal = (photo) => {
  checkOrientation();

  // selectedIndex.value = photos.value.find(p => p.id === photo.id);
  photo_seleted.value = photos.value.find(p => p.id === photo.id);;
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

  setTimeout(() => {
    isLoading.value = false;

    // Animate gallery items
    gsap.from('.gallery-item', {
      scrollTrigger: {
        trigger: '.gallery-item',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
    });

  }, 1500); 


 

});

onBeforeUnmount(() => {
  window.removeEventListener('orientationchange', handleOrientationChange);
  window.removeEventListener('resize', handleOrientationChange);
});

</script>