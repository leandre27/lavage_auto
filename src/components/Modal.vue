<template>
  <div v-if="show" class="fixed h-screen w-full z-50">
    <div class="fixed inset-0 bg-black opacity-90"></div>
    <div class="fixed inset-0 flex flex-col items-center justify-center space-y-4 px-4">
      <button @click="$emit('close')" class="absolute text-red-600 top-2 right-2 px-4 py-2 cursor-pointer">
        <Close/>
      </button>

      <div class="relative flex items-center justify-center">
        <button v-if="hasPrev" @click="$emit('prev')" class="absolute left-2"><LeftArrow /></button>
        <div class="flex items-center justify-center space-x-2 p-4 rounded-lg shadow-lg">
          <template v-if="!showSlider">
            <img :src="photo.avant" :alt="photo.alt" class="w-2/5 h-auto" />
            <img :src="photo.apres" :alt="photo.alt" class="w-2/5 h-auto" />
          </template>
          <template v-else>
            <ImgComparisonSlider class="w-[60%] max-sm:max-w-[600px] max-w-[700px] h-auto">
              <img slot="first" :src="photo.avant" class="w-full object-contain" />
              <img slot="second" :src="photo.apres" class="w-full object-contain" />
            </ImgComparisonSlider>
          </template>
        </div>

        <button v-if="hasNext" @click="$emit('next')" class="absolute right-2"><RightArrow /></button>
      </div>

      <button class="mt-4 bg-white text-black px-4 py-2 rounded-lg shadow-md font-semibold text-sm"
        @click="$emit('toggle-slider')">
        {{ showSlider ? "Revenir à la vue séparée" : "Comparer avec le slider" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import LeftArrow from '@/components/icons/LeftArrow.vue';
import RightArrow from '@/components/icons/RightArrow.vue';
import { ImgComparisonSlider } from '@img-comparison-slider/vue';
import Close from './icons/Close.vue';

const props = defineProps(['photo', 'show', 'showSlider', 'hasPrev', 'hasNext']);




</script>
