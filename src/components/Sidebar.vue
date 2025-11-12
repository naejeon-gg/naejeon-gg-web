<template>
  <aside class="w-75 h-full bg-container px-4">
    <router-link to="/" class="flex items-center justify-center">
      <img src="../assets/logo.png" alt="로고" class="w-56 h-56 pointer-none">
    </router-link>
    <LoginButton />
  </aside>
</template>
<script setup lang="ts">
import LoginButton from './LoginButton.vue';


</script>