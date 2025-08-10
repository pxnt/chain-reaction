<template>
  <div class="rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl overflow-hidden">
    <div class="px-4 pt-3 pb-2 flex items-center justify-between">
      <div class="text-xs uppercase tracking-wider font-semibold text-light/90">Leaderboard</div>
    </div>

    <div class="players px-2 pb-2">
      <TransitionGroup name="list" tag="div" class="flex flex-col gap-1">
        <div
          v-for="(player, index) in leaderboard"
          :key="player.id"
          class="player grid grid-cols-[1.25rem_1fr_auto] items-center px-3 py-2 rounded-lg text-light/90 hover:bg-white/5 transition-colors"
          :class="{
            'bg-white/10 ring-1 ring-white/20': $players.playerIdTurn === player.id,
          }"
        >
          <div class="rank text-[0.7rem] font-semibold text-light/70 tabular-nums">{{ index + 1 }}</div>
          <div class="name flex items-center gap-2 min-w-0">
            <span class="inline-block w-3 h-3 rounded-full shrink-0" :style="{ backgroundColor: player.color }" />
            <span class="truncate">{{ player.name }}</span>
            <span v-if="$players.currentPlayer?.id === player.id" class="ml-1 text-[0.65rem] px-1.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-light/80">You</span>
          </div>
          <div class="score text-right font-mono tabular-nums text-light">
            {{ player.score }}
          </div>
        </div>
      </TransitionGroup>
    </div>

    <div class="remaining-boxes flex justify-between items-center gap-4 text-sm text-light/90 border-t border-white/10 px-4 py-2">
      <div class="">Total Boxes</div>
      <div class="font-semibold tabular-nums">{{ $players.totalBoxes }}</div>
    </div>
  </div>
  </template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import usePlayers from '../store/players';
import { IPlayer } from '../types/player';
import _ from 'lodash';

const $players = usePlayers();

const leaderboard = ref<IPlayer[]>([]);

const debouncedLeaderboard = _.debounce(computeLeaderboard, 600);

watch(() => $players.leaderboard, (newVal) => {
  debouncedLeaderboard();
});

onMounted(() => {
  computeLeaderboard();
});

function computeLeaderboard() {
  let _leaderboard = Object.values($players.leaderboard);
  _leaderboard.sort((a, b) => {
    // Primary sort by score (descending)
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // Secondary sort by player ID to ensure stability
    return a.id.localeCompare(b.id);
  });
  leaderboard.value = _leaderboard;
}
</script>

<style scoped lang="scss">
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
