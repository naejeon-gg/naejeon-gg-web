<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <main
    class="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center gap-10 px-6 py-12"
  >
    <div class="flex items-center justify-center gap-6">
      <a
        href="https://vite.dev"
        target="_blank"
        class="transition-transform duration-200 hover:-translate-y-1"
      >
        <img
          src="/vite.svg"
          alt="Vite logo"
          class="h-24 w-24 drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]"
        />
      </a>
      <a
        href="https://vuejs.org/"
        target="_blank"
        class="transition-transform duration-200 hover:-translate-y-1"
      >
        <img
          src="./assets/vue.svg"
          alt="Vue logo"
          class="h-24 w-24 drop-shadow-[0_0_30px_rgba(45,212,191,0.45)]"
        />
      </a>
    </div>

    <HelloWorld msg="Vite + Vue + Tailwind CSS" />
  </main>
</template>
