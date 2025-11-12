<template>
  <div class="w-full">
    <table class="w-full border-collapse calendar-table">
      <thead>
        <tr>
          <th class="p-4 text-center">일</th>
          <th class="p-4 text-center">월</th>
          <th class="p-4 text-center">화</th>
          <th class="p-4 text-center">수</th>
          <th class="p-4 text-center">목</th>
          <th class="p-4 text-center">금</th>
          <th class="p-4 text-center">토</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            v-for="day in weekDays"
            :key="day.date"
            class="p-4 align-top"
            :class="{ 'today': day.isToday }">
            <div class="text-right text-3xl font-light mb-4 opacity-60">{{ day.dateNum }}</div>
            <div v-for="event in day.events" :key="event.id" class="mb-3">
              <div class="text-sm mb-1">{{ event.time }}</div>
              <div class="font-bold" :style="{ color: event.color }">{{ event.title }}</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';

const today = ref(new Date());

// 예시 이벤트 데이터
const mockEvents = [
  { id: 1, date: 9, time: '18:30 시작', title: '승리', color: '#6B9CFF' },
  { id: 2, date: 10, time: '14:00 시작', title: '패배', color: '#FF6B6B' },
  { id: 3, date: 14, time: '21:30 시작', title: '매치 전', color: '#FFFFFF' },
];

const weekDays = computed(() => {
  const days = [];
  const currentDay = today.value.getDay(); // 0(일) ~ 6(토)
  const startOfWeek = new Date(today.value);
  startOfWeek.setDate(today.value.getDate() - currentDay);

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    const isToday = date.toDateString() === today.value.toDateString();
    const dateNum = date.getDate();

    // 해당 날짜의 이벤트 필터링
    const dayEvents = mockEvents.filter(event => event.date === dateNum);

    days.push({
      day: dayNames[i],
      date: date.getTime(),
      dateStr: `${date.getMonth() + 1}/${date.getDate()}`,
      dateNum: dateNum,
      isToday,
      events: dayEvents
    });
  }

  return days;
});
</script>
<style scoped>
.calendar-table th,
.calendar-table td {
  border: 1px solid var(--color-line);
  background-color: var(--color-box);
}

.calendar-table .today {
  background-color: rgba(59, 130, 246, 0.1);
}
</style>