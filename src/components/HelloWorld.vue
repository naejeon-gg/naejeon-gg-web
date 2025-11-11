<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <section
    class="flex w-full max-w-3xl flex-col items-center gap-8 text-center"
  >
    <div class="flex flex-col gap-2">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
        Welcome
      </p>
      <h1 class="text-4xl font-bold sm:text-5xl">
        {{ msg }}
      </h1>
      <p class="text-base text-slate-300 sm:text-lg">
        Opinionated starter with Vite for lightning-fast DX, Vue for delightful
        UI, and Tailwind CSS for utility-first styling.
      </p>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <button
        type="button"
        class="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-400"
        @click="count++"
      >
        Count: {{ count }}
      </button>
      <a
        href="https://tailwindcss.com/docs/guides/vite"
        target="_blank"
        class="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-slate-200 transition hover:border-slate-500 hover:text-white"
      >
        Tailwind Docs
      </a>
    </div>

    <p class="max-w-2xl text-sm text-slate-400">
      Edit
      <code
        class="rounded bg-slate-900/60 px-2 py-1 font-mono text-xs text-slate-200"
        >components/HelloWorld.vue</code
      >
      to try hot module replacement and start building your next idea.
    </p>
  </section>
</template>
