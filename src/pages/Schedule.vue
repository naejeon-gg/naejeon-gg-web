<template>
  <div class="w-full flex flex-col gap-4">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <h1 class="text-2xl font-bold">매치 일정</h1>

      <div class="flex items-center gap-4">
        <!-- Calendar Navigation -->
        <div v-if="viewMode === 'calendar'" class="flex items-center gap-4">
          <button
            @click="changeMonth(-1)"
            class="px-4 py-2 bg-box border border-line rounded-lg hover:border-gray-600 transition-colors">
            이전
          </button>
          <span class="text-lg font-semibold"
            >{{ currentYear }}년 {{ currentMonth }}월</span
          >
          <button
            @click="changeMonth(1)"
            class="px-4 py-2 bg-box border border-line rounded-lg hover:border-gray-600 transition-colors">
            다음
          </button>
        </div>

        <!-- List View Date Selector -->
        <div v-else class="flex items-center gap-2">
          <select
            v-model="selectedYear"
            class="px-4 py-2 bg-box border border-line rounded-lg text-white hover:border-gray-600 transition-colors">
            <option v-for="year in availableYears" :key="year" :value="year">
              {{ year }}년
            </option>
          </select>
          <select
            v-model="selectedMonth"
            class="px-4 py-2 bg-box border border-line rounded-lg text-white hover:border-gray-600 transition-colors">
            <option v-for="month in 12" :key="month" :value="month">
              {{ month }}월
            </option>
          </select>
        </div>

        <!-- View Toggle -->
        <div class="flex bg-box border border-line rounded-lg overflow-hidden">
          <button
            @click="viewMode = 'calendar'"
            class="px-4 py-2 transition-colors"
            :class="
              viewMode === 'calendar'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            ">
            달력
          </button>
          <button
            @click="viewMode = 'list'"
            class="px-4 py-2 transition-colors border-l border-line"
            :class="
              viewMode === 'list'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            ">
            리스트
          </button>
        </div>
      </div>
    </div>

    <!-- Calendar View -->
    <div
      v-if="viewMode === 'calendar'"
      class="w-full rounded-xl overflow-hidden border border-line">
      <table class="w-full table-fixed">
        <thead>
          <tr>
            <th class="p-4 text-center border-r border-b border-line bg-box w-[14.28%]">
              일
            </th>
            <th class="p-4 text-center border-r border-b border-line bg-box w-[14.28%]">
              월
            </th>
            <th class="p-4 text-center border-r border-b border-line bg-box w-[14.28%]">
              화
            </th>
            <th class="p-4 text-center border-r border-b border-line bg-box w-[14.28%]">
              수
            </th>
            <th class="p-4 text-center border-r border-b border-line bg-box w-[14.28%]">
              목
            </th>
            <th class="p-4 text-center border-r border-b border-line bg-box w-[14.28%]">
              금
            </th>
            <th class="p-4 text-center border-b border-line bg-box w-[14.28%]">토</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, weekIndex) in calendarWeeks" :key="weekIndex">
            <td
              v-for="(day, dayIndex) in week"
              :key="dayIndex"
              class="p-4 align-top bg-box h-32 border-b border-line"
              :class="[
                { 'bg-blue-50/5': day.isToday },
                { 'opacity-50': !day.isCurrentMonth },
                dayIndex < 6 ? 'border-r border-line' : '',
              ]">
              <div class="text-right text-2xl font-light mb-3 opacity-60">
                {{ day.date }}
              </div>
              <div v-for="event in day.events" :key="event.id" class="mb-2">
                <div class="text-xs mb-1">{{ event.time }}</div>
                <div class="font-bold text-sm" :style="{ color: event.color }">
                  {{ event.title }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- List View -->
    <div v-else class="space-y-4">
      <div v-if="allEvents.length === 0" class="bg-box border border-line rounded-lg p-8 flex flex-col items-center justify-center text-center">
        <div class="text-gray-400 text-lg mb-2">일정이 없습니다</div>
        <div class="text-gray-500 text-sm">선택한 기간에 예정된 매치가 없습니다</div>
      </div>
      <div
        v-for="event in allEvents"
        :key="event.id"
        class="bg-box border border-line rounded-lg p-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="text-center">
            <div class="text-3xl font-bold opacity-60">{{ event.date }}</div>
            <div class="text-xs text-gray-400">{{ event.month }}월</div>
          </div>
          <div class="border-l border-line pl-4">
            <div class="font-bold text-lg" :style="{ color: event.color }">
              {{ event.title }}
            </div>
            <div class="text-gray-400 text-sm mt-1">{{ event.time }}</div>
          </div>
        </div>
        <div class="text-gray-400 text-sm">
          {{ event.dayOfWeek }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";

const currentDate = ref(new Date());
const viewMode = ref<"calendar" | "list">("calendar");

// List view date selection
const selectedYear = ref(new Date().getFullYear());
const selectedMonth = ref(new Date().getMonth() + 1);

// Available years (current year ± 5 years)
const availableYears = computed(() => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = -5; i <= 5; i++) {
    years.push(currentYear + i);
  }
  return years;
});

const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonth = computed(() => currentDate.value.getMonth() + 1);

const changeMonth = (delta: number) => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() + delta);
  currentDate.value = newDate;
};

// Mock events data - 더 많은 데이터 추가
const allMockEvents = [
  // 2024년 11월
  {
    id: 1,
    year: 2024,
    month: 11,
    date: 9,
    time: "18:30",
    title: "승리",
    color: "#6B9CFF",
  },
  {
    id: 2,
    year: 2024,
    month: 11,
    date: 10,
    time: "14:00",
    title: "패배",
    color: "#FF6B6B",
  },
  {
    id: 3,
    year: 2024,
    month: 11,
    date: 14,
    time: "21:30",
    title: "매치 전",
    color: "#FFFFFF",
  },
  // 2024년 12월
  {
    id: 4,
    year: 2024,
    month: 12,
    date: 5,
    time: "19:00",
    title: "승리",
    color: "#6B9CFF",
  },
  {
    id: 5,
    year: 2024,
    month: 12,
    date: 12,
    time: "20:00",
    title: "매치 전",
    color: "#FFFFFF",
  },
  {
    id: 6,
    year: 2024,
    month: 12,
    date: 20,
    time: "18:00",
    title: "패배",
    color: "#FF6B6B",
  },
  // 2025년 1월
  {
    id: 7,
    year: 2025,
    month: 1,
    date: 3,
    time: "16:00",
    title: "승리",
    color: "#6B9CFF",
  },
  {
    id: 8,
    year: 2025,
    month: 1,
    date: 15,
    time: "19:30",
    title: "매치 전",
    color: "#FFFFFF",
  },
  // 2025년 11월
  {
    id: 9,
    year: 2025,
    month: 11,
    date: 5,
    time: "18:30",
    title: "승리",
    color: "#6B9CFF",
  },
  {
    id: 10,
    year: 2025,
    month: 11,
    date: 12,
    time: "20:00",
    title: "패배",
    color: "#FF6B6B",
  },
  {
    id: 11,
    year: 2025,
    month: 11,
    date: 18,
    time: "21:30",
    title: "매치 전",
    color: "#FFFFFF",
  },
  {
    id: 12,
    year: 2025,
    month: 11,
    date: 22,
    time: "19:00",
    title: "승리",
    color: "#6B9CFF",
  },
  {
    id: 13,
    year: 2025,
    month: 11,
    date: 25,
    time: "15:30",
    title: "패배",
    color: "#FF6B6B",
  },
  {
    id: 14,
    year: 2025,
    month: 11,
    date: 28,
    time: "20:00",
    title: "매치 전",
    color: "#FFFFFF",
  },
];

// Calendar view - current month only
const mockEvents = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth() + 1;

  return allMockEvents
    .filter((event) => event.year === year && event.month === month)
    .map(({ year, month, ...rest }) => rest);
});

// All events for list view - filtered by selected year/month
const allEvents = computed(() => {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  return allMockEvents
    .filter(
      (event) =>
        event.year === selectedYear.value && event.month === selectedMonth.value
    )
    .map((event) => {
      const eventDate = new Date(event.year, event.month - 1, event.date);
      return {
        ...event,
        dayOfWeek: dayNames[eventDate.getDay()],
      };
    })
    .sort((a, b) => a.date - b.date);
});

const calendarWeeks = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const today = new Date();

  // 이번 달의 첫날과 마지막 날
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 첫 주의 시작일 (일요일부터 시작)
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  // 마지막 주의 종료일 (토요일까지)
  const endDate = new Date(lastDay);
  endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

  const weeks = [];
  const currentWeekDate = new Date(startDate);

  while (currentWeekDate <= endDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = currentWeekDate.getDate();
      const isCurrentMonth = currentWeekDate.getMonth() === month;
      const isToday = currentWeekDate.toDateString() === today.toDateString();

      // 해당 날짜의 이벤트 필터링
      const dayEvents = isCurrentMonth
        ? mockEvents.value.filter((event) => event.date === date)
        : [];

      week.push({
        date,
        isCurrentMonth,
        isToday,
        events: dayEvents,
      });

      currentWeekDate.setDate(currentWeekDate.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
});
</script>
