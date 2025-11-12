<template>
  <div class="flex w-full h-screen">
    <main class="flex-1 px-6 flex flex-col gap-10">
      <Header />
      <RouterView />
    </main>
    <Sidebar />
  </div>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";
</script>
