<template>
  <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="relative w-[95%] max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden p-4">
      <!-- Bouton fermeture -->
      <button
        class="absolute top-4 right-4 text-white text-2xl bg-red-500 hover:bg-red-600 w-10 h-10 flex items-center justify-center rounded-full shadow-md transition"
        @click="$emit('close')"
      >
        ✖
      </button>

      <!-- Contenu principal -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Bouton précédent -->
        <button
          @click="$emit('prev')"
          :disabled="!hasPrev"
          class="text-white text-3xl px-3 py-2 hover:scale-110 transition disabled:opacity-30"
        >
          ◀
        </button>

        <!-- Images Avant / Après -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center items-center w-full">
          <img
            :src="photo.avant"
            alt="Avant"
            class="w-full sm:w-1/2 h-64 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
          />
          <img
            :src="photo.apres"
            alt="Après"
            class="w-full sm:w-1/2 h-64 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        <!-- Bouton suivant -->
        <button
          @click="$emit('next')"
          :disabled="!hasNext"
          class="text-white text-3xl px-3 py-2 hover:scale-110 transition disabled:opacity-30"
        >
          ▶
        </button>
      </div>

      <!-- Légende ou Numéro -->
      <p class="mt-6 text-center text-gray-300 text-sm">Avant / Après - Véhicule en cours</p>
    </div>
  </div>
</template>

<script setup>
defineProps(['photo', 'show', 'hasPrev', 'hasNext'])
defineEmits(['close', 'prev', 'next'])
</script>
