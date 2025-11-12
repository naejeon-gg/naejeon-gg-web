<template>
  <div class="w-full h-full flex items-center justify-center flex-col">
    <div class="w-120 flex flex-col items-center justify-center">
      <img src="../assets/logo.png" alt="logo" class="w-64 h-64" />
      <h1 class="text-3xl font-bold">라이엇 아이디 연결</h1>
      <div class="w-full flex items-center gap-2 mt-8">
        <input
          type="text"
          v-model="gameName"
          placeholder="닉네임"
          class="bg-box outline-none p-2 border border-line rounded-lg flex-1" />
        <p>#</p>
        <input
          type="text"
          v-model="tagLine"
          placeholder="KR1"
          class="bg-box outline-none p-2 border border-line rounded-lg flex-1" />
      </div>
      <button class="bg-riot py-4 w-full mt-16 rounded-lg cursor-pointer" @click="handleSubmit">계정 연결</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { authApi } from "../api/auth";
import { AxiosError } from "axios";
import { router } from "../router";

const gameName = ref("");
const tagLine = ref("");

const handleSubmit = async () => {
  try{
    const res = await authApi.login(gameName.value, tagLine.value);
    if(res.status === 200){
      alert("라이엇 아이디가 성공적으로 연결되었습니다.");
      router.replace("/");
    }
  }catch(e){
    const error = e as AxiosError;
    alert(error.response?.data as string);
  }
}
</script>
