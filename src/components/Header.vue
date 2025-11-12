<template>
  <header
    class="w-full flex flex-col md:flex-row items-stretch md:items-start gap-2 md:gap-4">
    <div
      class="flex-1 border-b-2 border-line pb-2 pt-4 flex justify-center md:justify-end px-2 md:px-4 gap-4 md:gap-8">
      <router-link to="/" class="font-semibold text-base md:text-lg hover:-translate-y-1 transition-transform"
        >홈</router-link
      >
      <router-link to="/history" class="font-semibold text-base md:text-lg hover:-translate-y-1 transition-transform"
        >내전 전적</router-link
      >
      <router-link
        to="/schedule"
        class="lg:hidden font-semibold text-base md:text-lg"
        >매치 일정</router-link
      >
    </div>
    <router-link
      to="/matchmaker"
      class="bg-playbutton px-8 md:px-16 py-4 md:py-6 text-xl md:text-2xl font-extrabold rounded-none hover:bg-white hover:text-playbutton cursor-pointer hexagon-button text-center"
      >매치 생성하기</router-link
    >
    <div
      class="lg:flex flex-1 border-b-2 border-line pb-2 pt-4 hidden justify-center md:justify-start px-2 md:px-4">
      <router-link to="/schedule" class="font-semibold text-base md:text-lg hover:-translate-y-1 transition-transform"
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
@media (max-width: 48rem) {
  .hexagon-button {
    clip-path: none;
  }
}
</style>
