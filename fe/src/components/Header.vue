<template>
  <div class="header h-10 px-2 flex items-center justify-between backdrop-blur-2xl bg-slate-600">
    <a href="/">
      <div class="title font-bold text-2xl text-light">Chain Reaction</div>
    </a>
    <div v-if="showPlayerNameInput" class="player-name font-mono">
      <span class="text-light">Player Name: </span>
      <input :value="$globalStore.playerName" type="text" class="px-2 rounded focus:outline-slate-400"
        @input="onPlayerNameInput" />
    </div>
    <button v-if="showEndGameButton" class="bg-red-500 text-white px-2 py-1 rounded-md" @click="endGame">End
      Game</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PageNames } from '~/config/route';
import useGlobalStore from '~/store/global';
import RoomService from '~/services/RoomService';
import useRoom from '~/store/room';
import usePlayers from '~/store/players';

const $route = useRoute();
const $globalStore = useGlobalStore();
const $router = useRouter();
const $room = useRoom();
const $players = usePlayers();

const showPlayerNameInput = computed(() => $route.name === PageNames.Home);
const showEndGameButton = computed(() => $route.name === PageNames.Room && $players.isHost);

function onPlayerNameInput(event: Event) {
  const playerName = (event.target as HTMLInputElement).value;
  $globalStore.setPlayerName(playerName);
}

async function endGame() {
  await RoomService.end({ roomCode: $room.roomCode });
  $router.push({ name: PageNames.Home });
}
</script>