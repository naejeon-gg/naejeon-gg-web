<template>
  <div v-if="selectedMatch" class="mb-10">
    <!-- Match Detail Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">매치 상세</h1>
      <button
        @click="handleDetailClick(null)"
        class="text-gray-400 hover:text-white transition-colors">
        닫기
      </button>
    </div>

    <!-- Match Summary Card -->
    <div
      class="rounded-lg p-6 mb-6"
      :class="selectedMatch.isVictory ? 'bg-[#28344E] border-l-8 border-l-win' : 'bg-[#59343B] border-l-8 border-l-defeat'">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-4 mb-2">
            <span
              class="text-2xl font-bold"
              :class="selectedMatch.isVictory ? 'text-win' : 'text-defeat'">
              {{ selectedMatch.isVictory ? 'Victory' : 'Defeat' }}
            </span>
            <span class="text-gray-400">{{ selectedMatch.duration }}</span>
          </div>
          <div class="text-gray-400 text-sm">{{ selectedMatch.gameType }} • {{ selectedMatch.time }}</div>
        </div>

        <div class="flex items-center gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-white">{{ selectedMatch.kills }}/{{ selectedMatch.deaths }}/{{ selectedMatch.assists }}</div>
            <div class="text-gray-400 text-sm">{{ selectedMatch.kda }} KDA</div>
          </div>
          <div class="text-center">
            <div class="text-xl font-semibold" :class="selectedMatch.isVictory ? 'text-win' : 'text-white'">{{ selectedMatch.rank }}</div>
            <div class="text-gray-400 text-sm">순위</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <!-- Champion Info -->
      <div class="bg-box border border-line rounded-lg p-4">
        <h3 class="text-lg font-semibold mb-4">챔피언 정보</h3>
        <div class="flex items-center gap-4">
          <div class="relative">
            <div class="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
              <span class="text-gray-400">Champion</span>
            </div>
            <div class="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-white text-sm font-bold">
              {{ selectedMatch.level }}
            </div>
          </div>
          <div>
            <div class="text-white font-semibold mb-1">Champion Name</div>
            <div class="text-gray-400 text-sm">Level {{ selectedMatch.level }}</div>
            <div class="flex items-center gap-2 mt-2">
              <div class="w-3 h-3 bg-yellow-600 rounded-sm"></div>
              <span class="text-white text-sm">{{ selectedMatch.tier }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Game Stats -->
      <div class="bg-box border border-line rounded-lg p-4">
        <h3 class="text-lg font-semibold mb-4">게임 통계</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-400">킬 관여율</span>
            <span class="text-white font-semibold">{{ selectedMatch.stats.pkill }}%</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">CS</span>
            <span class="text-white font-semibold">{{ selectedMatch.stats.cs }} ({{ selectedMatch.stats.csPerMin }})</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">맵 점유율</span>
            <span class="text-white font-semibold">{{ selectedMatch.mapName }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Items Section -->
    <div class="bg-box border border-line rounded-lg p-4 mb-6">
      <h3 class="text-lg font-semibold mb-4">아이템 빌드</h3>
      <div class="flex gap-2 flex-wrap">
        <div v-for="i in 6" :key="i" class="w-12 h-12 rounded bg-gray-700"></div>
        <div class="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center">
          <span class="text-sm font-bold">0</span>
        </div>
      </div>
    </div>

    <!-- Teams Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Ally Team -->
      <div class="bg-box border border-line rounded-lg p-4">
        <h3 class="text-lg font-semibold mb-4 text-win">아군 팀</h3>
        <div class="space-y-2">
          <div v-for="i in 5" :key="i" class="flex items-center gap-3 p-2 bg-container rounded">
            <div class="w-8 h-8 rounded bg-gray-700"></div>
            <div class="flex-1">
              <div class="text-white text-sm font-semibold">Player {{ i }}</div>
              <div class="text-gray-400 text-xs">Champion {{ i }}</div>
            </div>
            <div class="text-right">
              <div class="text-white text-sm font-semibold">{{ 5 + i }}/{{ 3 + i }}/{{ 8 + i }}</div>
              <div class="text-gray-400 text-xs">{{ Math.floor((5 + i + 8 + i) / (3 + i)) }}:1 KDA</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enemy Team -->
      <div class="bg-box border border-line rounded-lg p-4">
        <h3 class="text-lg font-semibold mb-4 text-defeat">적군 팀</h3>
        <div class="space-y-2">
          <div v-for="i in 5" :key="i" class="flex items-center gap-3 p-2 bg-container rounded">
            <div class="w-8 h-8 rounded bg-gray-700"></div>
            <div class="flex-1">
              <div class="text-white text-sm font-semibold">Enemy {{ i }}</div>
              <div class="text-gray-400 text-xs">Champion {{ i }}</div>
            </div>
            <div class="text-right">
              <div class="text-white text-sm font-semibold">{{ 4 + i }}/{{ 4 + i }}/{{ 6 + i }}</div>
              <div class="text-gray-400 text-xs">{{ Math.floor((4 + i + 6 + i) / (4 + i)) }}:1 KDA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full max-w-7xl space-y-2">
    <h2 class="text-xl font-semibold mb-4">전체 전적</h2>
    <MatchItem v-for="match in matchHistory" :key="match.id" v-bind="match" @click="handleDetailClick(match.id)" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed, inject, type Ref } from "vue";
import MatchItem from "../components/MatchItem.vue";
import { router } from "../router";
import { useRoute } from "vue-router";

const route = useRoute();
const scrollContainer = inject<Ref<HTMLElement | null>>('scrollContainer');

const handleDetailClick = (matchId: number | null) => {
  if (matchId === null) {
    router.push({ path: `/history` });
  } else {
    router.push({ path: `/history`, query: { id: matchId } });
  }

  if (scrollContainer?.value) {
    scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// 쿼리스트링 가져오기
const matchId = ref(route.query.id);

watch(() => route.query.id, (newId) => {
  matchId.value = newId;
});

// 선택된 매치 찾기
const selectedMatch = computed(() => {
  if (!matchId.value) return null;
  return matchHistory.value.find(match => match.id === Number(matchId.value));
});

const matchHistory = ref([
  {
    id: 1,
    isVictory: false,
    gameType: "Ranked Solo/Duo",
    time: "3 days ago",
    duration: "34m 46s",
    kills: 7,
    deaths: 6,
    assists: 3,
    kda: "1.67:1",
    rank: "7th",
    tier: "Gold 2",
    level: 17,
    mapName: "Laning 51 : 49",
    stats: {
      pkill: 32,
      cs: 276,
      csPerMin: "7.9",
    },
    badges: {
      doubleKill: true,
      struggle: true,
    },
  },
  {
    id: 2,
    isVictory: true,
    gameType: "Ranked Solo/Duo",
    time: "3 days ago",
    duration: "24m 52s",
    kills: 11,
    deaths: 6,
    assists: 11,
    kda: "3.67:1",
    rank: "2nd",
    tier: "Gold 2",
    level: 14,
    mapName: "Laning 44 : 56",
    stats: {
      pkill: 58,
      cs: 173,
      csPerMin: "7",
    },
    badges: {},
  },
  {
    id: 3,
    isVictory: true,
    gameType: "Ranked Solo/Duo",
    time: "4 days ago",
    duration: "28m 15s",
    kills: 9,
    deaths: 4,
    assists: 8,
    kda: "4.25:1",
    rank: "3rd",
    tier: "Gold 2",
    level: 15,
    mapName: "Laning 48 : 52",
    stats: {
      pkill: 45,
      cs: 215,
      csPerMin: "7.6",
    },
    badges: {
      doubleKill: true,
    },
  },
  {
    id: 4,
    isVictory: false,
    gameType: "Ranked Solo/Duo",
    time: "5 days ago",
    duration: "31m 22s",
    kills: 5,
    deaths: 8,
    assists: 6,
    kda: "1.38:1",
    rank: "6th",
    tier: "Gold 2",
    level: 16,
    mapName: "Laning 46 : 54",
    stats: {
      pkill: 28,
      cs: 198,
      csPerMin: "6.3",
    },
    badges: {
      struggle: true,
    },
  },
  {
    id: 5,
    isVictory: true,
    gameType: "Ranked Solo/Duo",
    time: "5 days ago",
    duration: "26m 38s",
    kills: 13,
    deaths: 3,
    assists: 9,
    kda: "7.33:1",
    rank: "1st",
    tier: "Gold 2",
    level: 14,
    mapName: "Laning 42 : 58",
    stats: {
      pkill: 62,
      cs: 187,
      csPerMin: "7.0",
    },
    badges: {
      doubleKill: true,
    },
  },
  {
    id: 6,
    isVictory: false,
    gameType: "Ranked Solo/Duo",
    time: "6 days ago",
    duration: "29m 12s",
    kills: 4,
    deaths: 9,
    assists: 5,
    kda: "1.00:1",
    rank: "8th",
    tier: "Gold 2",
    level: 15,
    mapName: "Laning 44 : 56",
    stats: {
      pkill: 25,
      cs: 164,
      csPerMin: "5.6",
    },
    badges: {
      struggle: true,
    },
  },
  {
    id: 7,
    isVictory: true,
    gameType: "Ranked Solo/Duo",
    time: "1 week ago",
    duration: "32m 45s",
    kills: 8,
    deaths: 5,
    assists: 12,
    kda: "4.00:1",
    rank: "4th",
    tier: "Gold 2",
    level: 16,
    mapName: "Laning 50 : 50",
    stats: {
      pkill: 48,
      cs: 234,
      csPerMin: "7.2",
    },
    badges: {},
  },
  {
    id: 8,
    isVictory: true,
    gameType: "Ranked Solo/Duo",
    time: "1 week ago",
    duration: "22m 18s",
    kills: 15,
    deaths: 2,
    assists: 7,
    kda: "11.00:1",
    rank: "1st",
    tier: "Gold 2",
    level: 13,
    mapName: "Laning 38 : 62",
    stats: {
      pkill: 68,
      cs: 152,
      csPerMin: "6.8",
    },
    badges: {
      doubleKill: true,
    },
  },
  {
    id: 9,
    isVictory: false,
    gameType: "Ranked Solo/Duo",
    time: "1 week ago",
    duration: "36m 52s",
    kills: 6,
    deaths: 7,
    assists: 4,
    kda: "1.43:1",
    rank: "5th",
    tier: "Gold 3",
    level: 18,
    mapName: "Laning 52 : 48",
    stats: {
      pkill: 35,
      cs: 289,
      csPerMin: "7.8",
    },
    badges: {},
  },
  {
    id: 10,
    isVictory: true,
    gameType: "Ranked Solo/Duo",
    time: "1 week ago",
    duration: "27m 33s",
    kills: 10,
    deaths: 4,
    assists: 9,
    kda: "4.75:1",
    rank: "2nd",
    tier: "Gold 3",
    level: 14,
    mapName: "Laning 45 : 55",
    stats: {
      pkill: 52,
      cs: 198,
      csPerMin: "7.2",
    },
    badges: {
      doubleKill: true,
    },
  },
  {
    id: 11,
    isVictory: false,
    gameType: "Ranked Solo/Duo",
    time: "2 weeks ago",
    duration: "30m 08s",
    kills: 3,
    deaths: 10,
    assists: 6,
    kda: "0.90:1",
    rank: "9th",
    tier: "Gold 3",
    level: 15,
    mapName: "Laning 48 : 52",
    stats: {
      pkill: 22,
      cs: 182,
      csPerMin: "6.0",
    },
    badges: {
      struggle: true,
    },
  },
  {
    id: 12,
    isVictory: true,
    gameType: "Ranked Solo/Duo",
    time: "2 weeks ago",
    duration: "25m 47s",
    kills: 12,
    deaths: 3,
    assists: 8,
    kda: "6.67:1",
    rank: "1st",
    tier: "Gold 3",
    level: 14,
    mapName: "Laning 40 : 60",
    stats: {
      pkill: 65,
      cs: 176,
      csPerMin: "6.8",
    },
    badges: {
      doubleKill: true,
    },
  },
  {
    id: 13,
    isVictory: false,
    gameType: "Ranked Solo/Duo",
    time: "2 weeks ago",
    duration: "33m 21s",
    kills: 7,
    deaths: 8,
    assists: 5,
    kda: "1.50:1",
    rank: "6th",
    tier: "Gold 3",
    level: 17,
    mapName: "Laning 49 : 51",
    stats: {
      pkill: 38,
      cs: 245,
      csPerMin: "7.4",
    },
    badges: {},
  },
  {
    id: 14,
    isVictory: true,
    gameType: "Ranked Solo/Duo",
    time: "2 weeks ago",
    duration: "28m 56s",
    kills: 9,
    deaths: 5,
    assists: 11,
    kda: "4.00:1",
    rank: "3rd",
    tier: "Gold 3",
    level: 15,
    mapName: "Laning 46 : 54",
    stats: {
      pkill: 50,
      cs: 207,
      csPerMin: "7.2",
    },
    badges: {},
  },
  {
    id: 15,
    isVictory: true,
    gameType: "Ranked Solo/Duo",
    time: "2 weeks ago",
    duration: "31m 14s",
    kills: 11,
    deaths: 4,
    assists: 10,
    kda: "5.25:1",
    rank: "2nd",
    tier: "Gold 4",
    level: 16,
    mapName: "Laning 43 : 57",
    stats: {
      pkill: 55,
      cs: 223,
      csPerMin: "7.1",
    },
    badges: {
      doubleKill: true,
    },
  },
]);
</script>
