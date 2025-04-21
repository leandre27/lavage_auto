<template>
    <button @click="toggleDarkMode" class="bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-2 rounded-full shadow-lg">
  🌞 / 🌙
    </button>
</template>
<script setup>
import { onMounted } from 'vue';

const toggleDarkMode = () => {
  const html = document.documentElement;
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
});
</script>
