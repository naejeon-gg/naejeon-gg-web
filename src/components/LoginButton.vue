<template>
  <a
    :href="url"
    class="w-full rounded-lg flex items-center justify-center bg-riot py-4">
    <img
      src="../assets/riot.png"
      alt="라이엇 로고"
      class="w-8 h-8 inline-block mr-2 pointer-none" />
    <p class="font-black">라이엇 로그인</p>
  </a>
</template>
<script setup lang="ts">
const clientId = import.meta.env.VITE_RIOT_CLIENT_ID;
const redirect = encodeURIComponent(import.meta.env.VITE_RIOT_REDIRECT_URI);
const scope = encodeURIComponent("openid profile");
const url = `https://auth.riotgames.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirect}&scope=${scope}`;
</script>
