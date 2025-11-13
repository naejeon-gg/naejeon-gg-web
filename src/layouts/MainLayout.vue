<template>
  <div class="flex flex-col lg:flex-row w-full h-screen">
    <main class="flex-1 px-3 md:px-6 flex flex-col overflow-hidden">
      <Header />
      <div ref="scrollContainer" class="w-full flex-1 overflow-y-scroll scrollbar-hide pb-6 md:pb-10 lg:px-6 mt-4">
        <div className="pointer-events-none sticky top-0 w-full h-8 bg-linear-to-t from-transparent to-bg z-9999" />
        <RouterView />
      </div>
    </main>
    <Sidebar />
  </div>
</template>
<script setup lang="ts">
import { ref, provide } from "vue";
import { RouterView } from "vue-router";
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";

const scrollContainer = ref<HTMLElement | null>(null);
provide('scrollContainer', scrollContainer);
</script>
