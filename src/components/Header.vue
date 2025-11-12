<template>
  <header class="w-full flex items-start gap-4">
    <div class="flex-1 border-b-2 border-line pb-2 pt-4 flex justify-end px-4">
      <router-link to="/history" class="font-semibold text-lg"
        >내전 전적</router-link
      >
    </div>
    <router-link
      to="/matchmaker"
      class="bg-playbutton px-16 py-6 text-2xl font-extrabold rounded-none hover:bg-white hover:text-playbutton cursor-pointer hexagon-button"
      >매치 생성하기</router-link
    >
    <div
      class="flex-1 border-b-2 border-line pb-2 pt-4 flex justify-start px-4">
      <router-link to="/schedule" class="font-semibold text-lg"
        >매치 일정</router-link
      >
    </div>
  </header>
</template>
<script setup lang="ts"></script>
<style scoped>
.hexagon-button {
  clip-path: polygon(0% 0%, 100% 0%, 100% 60%, 85% 100%, 15% 100%, 0% 60%);
  transition: all 0.3s ease;
}
</style>
