<template>
  <div class="color-tiles mt-2 w-full grid grid-cols-2 gap-4">
    <div 
    v-for="color, colorKey in Constants.Colors"
     :key="colorKey" 
     class="color-tile relative rounded w-full group" 
     :class="{
      'animate-color-tile': getPlayerByColor(color),
     }"
     :style="{
      '--color': color,
    }">
      <button 
        v-if="showRemovePlayer && isPlayerRemovable(color)"
        class="remove-player font-sans z-10 hidden group-hover:block absolute top-1 right-1 shadow-md text-xs px-1 rounded-full cursor-pointer"
        @click="removePlayer(color)"
       >
       Remove
      </button>

      <div class="ball-wrapper w-2/3 aspect-square mx-auto">
        <Ball :color="color" :count="1" />
      </div>

      <div class="divider border border-dashed border-dark-3" />

      <div class="player py-1 px-2 text-center">
        <span v-if="getPlayerByColor(color)" class="font-semibold">{{ getPlayerByColor(color) }}</span>
        <span v-else class="text-xs">Waiting for player...</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Constants from '~/config';
import Ball from '../../Board/Ball.vue';
import usePlayers from '~/store/players';
import { computed, ref } from 'vue';
import { IPlayer } from '~/types/player';
import useGameActions from '~/store/gameActions';

const $players = usePlayers();
const $gameActions = useGameActions();

const noOfPlayers = ref(4);

const showRemovePlayer = computed(() => {
  return $players.isHost
});

const playerToColorMap = computed(() => {
  return Object.values($players.playersMap).reduce((acc, player) => {
    acc[player.color] = player;
    return acc;
  }, {} as Record<string, IPlayer>);
})

function getPlayerByColor(color: string) {
  const player = playerToColorMap.value[color];

  if (!player) {
    return null;
  }

  if (player.id === $players.currentPlayer?.id) {
    return `${player.name} (You)`;
  }

  return player.name;
}

function isPlayerRemovable(color: string) {
  const player = playerToColorMap.value[color];

  if (!player) {
    return false;
  }

  if (player.id === $players.currentPlayer?.id) {
    return false;
  }

  return true;
}

function removePlayer(color: string) {
  const playerIdToRemove = playerToColorMap.value[color].id;
  $gameActions.removePlayer(playerIdToRemove);
}
</script>

<style lang="scss" scoped>
.start-game {
  box-shadow: 2px 6px rgb(71, 114, 10);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 1px 4px rgb(71, 114, 10);
  }
}

.color-tile {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;

  color: #fff;
}

.animate-color-tile {
  box-shadow: 0px 0px 10px 0px var(--color);
}

.remove-player {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;

  color: #fff;
}
</style>