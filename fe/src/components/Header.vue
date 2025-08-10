<template>
  <div class="header h-10 px-2 flex items-center justify-between backdrop-blur-2xl bg-slate-600">
    <div class="title font-bold text-2xl text-light">Chain Reaction</div>
    <div v-if="showPlayerNameInput" class="player-name font-mono">
      <span class="text-light">Player Name: </span>
      <input :value="$globalStore.playerName" type="text" class="px-2 rounded focus:outline-slate-400" @input="onPlayerNameInput" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { PageNames } from '~/config/route';
import useGlobalStore from '~/store/global';

const $route = useRoute();
const $globalStore = useGlobalStore();

const showPlayerNameInput = computed(() => $route.name === PageNames.Home);

function onPlayerNameInput(event: Event) {
  const playerName = (event.target as HTMLInputElement).value;
  $globalStore.setPlayerName(playerName);
}
</script>