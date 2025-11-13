<template>
  <div class="flex flex-col w-full max-w-2xl gap-8 py-8 mx-auto">
    <h1 class="text-2xl font-semibold">내전 생성</h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
      <!-- 내전 날짜 입력 -->
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-gray-300">내전 날짜</label>
        <input
          v-model="matchDate"
          type="date"
          required
          class="w-full px-4 py-3 text-white border rounded-lg bg-box border-line focus:outline-none focus:ring-2 focus:ring-playbutton focus:border-transparent"
        />
      </div>

      <!-- 내전 시간 입력 -->
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-gray-300">내전 시작 시간</label>
        <input
          v-model="matchTime"
          type="time"
          required
          class="w-full px-4 py-3 text-white border rounded-lg bg-box border-line focus:outline-none focus:ring-2 focus:ring-playbutton focus:border-transparent"
        />
      </div>

      <!-- 플레이어 등록 -->
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-gray-300">대기열 등록</label>

        <!-- 선택된 플레이어 목록 -->
        <div v-if="selectedPlayers.length > 0" class="flex flex-col gap-2 mb-3">
          <div
            v-for="(player, index) in selectedPlayers"
            :key="player.id"
            class="flex items-center justify-between px-4 py-3 border rounded-lg bg-box border-line"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center w-10 h-10 text-sm font-semibold bg-gray-700 rounded-full"
              >
                {{ player.gameName?.charAt(0).toUpperCase() || "U" }}
              </div>
              <div class="flex flex-col">
                <span class="font-medium text-white">{{
                  player.gameName
                }}</span>
                <span v-if="player.tagLine" class="text-xs text-gray-400"
                  >#{{ player.tagLine }}</span
                >
              </div>
            </div>
            <button
              type="button"
              @click="removePlayer(index)"
              class="px-3 py-1 text-sm text-gray-400 transition-colors border rounded-lg bg-box border-line hover:text-white hover:border-gray-400"
            >
              삭제
            </button>
          </div>
        </div>

        <!-- 유저 검색 및 추가 -->
        <div class="flex flex-col gap-3">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="유저 검색..."
              class="w-full px-4 py-3 text-white placeholder-gray-500 border rounded-lg bg-box border-line focus:outline-none focus:ring-2 focus:ring-playbutton focus:border-transparent"
              @input="handleSearch"
            />
            <Search
              v-if="!searchQuery"
              :size="20"
              class="absolute text-gray-400 -translate-y-1/2 pointer-events-none right-4 top-1/2"
            />
          </div>

          <!-- 검색 결과 리스트 -->
          <div
            v-if="searchQuery && filteredUsers.length > 0"
            class="overflow-y-auto border rounded-lg max-h-60 bg-box border-line"
          >
            <button
              v-for="user in filteredUsers"
              :key="user.id"
              type="button"
              @click="addPlayer(user)"
              class="flex items-center w-full gap-3 px-4 py-3 transition-colors border-b hover:bg-container border-line last:border-b-0"
            >
              <div
                class="flex items-center justify-center w-10 h-10 text-sm font-semibold bg-gray-700 rounded-full shrink-0"
              >
                {{ user.gameName?.charAt(0).toUpperCase() || "U" }}
              </div>
              <div class="flex flex-col flex-1 text-left">
                <span class="font-medium text-white">{{ user.gameName }}</span>
                <span v-if="user.tagLine" class="text-xs text-gray-400"
                  >#{{ user.tagLine }}</span
                >
              </div>
              <Plus :size="20" class="text-gray-400 shrink-0" />
            </button>
          </div>

          <div
            v-if="searchQuery && filteredUsers.length === 0 && !isLoadingUsers"
            class="px-4 py-3 text-sm text-center text-gray-400 border rounded-lg bg-box border-line"
          >
            검색 결과가 없습니다.
          </div>

          <div
            v-if="isLoadingUsers"
            class="px-4 py-3 text-sm text-center text-gray-400 border rounded-lg bg-box border-line"
          >
            검색 중...
          </div>
        </div>
      </div>

      <button
        type="submit"
        :disabled="isSubmitting || selectedPlayers.length === 0"
        class="w-full px-6 py-4 font-semibold text-white transition-colors rounded-lg bg-playbutton hover:bg-white hover:text-playbutton disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isSubmitting ? "생성 중..." : "내전 생성하기" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Plus, Search } from "lucide-vue-next";
// import { apiClient } from "../libs/axios";

interface User {
  id: number;
  gameName: string;
  tagLine?: string;
}

const router = useRouter();

const matchDate = ref("");
const matchTime = ref("");
const selectedPlayers = ref<User[]>([]);
const allUsers = ref<User[]>([]);
const searchQuery = ref("");
const isLoadingUsers = ref(false);
const isSubmitting = ref(false);

// 검색 필터링된 유저 리스트
const filteredUsers = computed(() => {
  if (!searchQuery.value.trim()) return [];

  const query = searchQuery.value.toLowerCase().trim();
  return allUsers.value.filter(
    (user) =>
      !selectedPlayers.value.some((selected) => selected.id === user.id) &&
      (user.gameName.toLowerCase().includes(query) ||
        (user.tagLine && user.tagLine.toLowerCase().includes(query)))
  );
});

// 유저 리스트 가져오기
const fetchUsers = async () => {
  isLoadingUsers.value = true;
  try {
    // 서버 추가 되면 주석 해제
    // const response = await apiClient.get("/users");
    // allUsers.value = response.data;

    // 임시: 더미 데이터
    allUsers.value = [
      { id: 1, gameName: "Player1", tagLine: "KR1" },
      { id: 2, gameName: "Player2", tagLine: "KR1" },
      { id: 3, gameName: "Player3", tagLine: "KR1" },
      { id: 4, gameName: "Player4", tagLine: "KR1" },
      { id: 5, gameName: "Player5", tagLine: "KR1" },
      { id: 6, gameName: "Player6", tagLine: "KR1" },
      { id: 7, gameName: "Player7", tagLine: "KR1" },
      { id: 8, gameName: "Player8", tagLine: "KR1" },
      { id: 9, gameName: "Player9", tagLine: "KR1" },
      { id: 10, gameName: "Player10", tagLine: "KR1" },
    ];
  } catch (error) {
    console.error("유저 리스트 가져오기 실패:", error);
  } finally {
    isLoadingUsers.value = false;
  }
};

// 검색 처리
const handleSearch = () => {
  // 검색은 computed로 자동 처리됨
};

// 플레이어 추가
const addPlayer = (user: User) => {
  if (!selectedPlayers.value.some((p) => p.id === user.id)) {
    selectedPlayers.value.push(user);
    searchQuery.value = "";
  }
};

// 플레이어 삭제
const removePlayer = (index: number) => {
  selectedPlayers.value.splice(index, 1);
};

// 폼 제출
const handleSubmit = async () => {
  if (isSubmitting.value) return;

  if (!matchDate.value || !matchTime.value) {
    alert("날짜와 시간을 입력해주세요.");
    return;
  }

  if (selectedPlayers.value.length === 0) {
    alert("최소 1명의 플레이어를 등록해주세요.");
    return;
  }

  isSubmitting.value = true;

  try {
    // 서버 추가 되면 근데 서버 된다해도 될지 모름
    // const response = await apiClient.post("/matches", {
    //   date: matchDate.value,
    //   time: matchTime.value,
    //   playerIds: selectedPlayers.value.map((p) => p.id),
    // });

    // 매치 아이디 있으면 그 아이디로 이동
    // if (response.data.matchId) {
    //   router.push(`/match/${response.data.matchId}`);
    //   return;
    // }

    // 홈으로 이동
    alert("내전이 생성되었습니다!");
    router.push("/");
  } catch (error) {
    console.error("매치 생성 실패:", error);
    alert("매치 생성에 실패했습니다. 다시 시도해주세요.");
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

