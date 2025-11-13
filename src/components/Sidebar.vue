<template>
  <aside class="w-full lg:w-75 h-auto lg:h-full bg-container px-4 py-4 lg:py-0">
    <router-link to="/" class="flex items-center justify-center">
      <img src="../assets/logo.png" alt="로고" class="w-32 h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 pointer-none lg:block hidden">
    </router-link>
    <LoginButton />
  </aside>
</template>
<script setup lang="ts">
import LoginButton from './LoginButton.vue';


</script>