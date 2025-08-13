<template>
  <div 
    ref="boxesRef"
    class="reactor grid"
    :class="[
      $players.isCurrentPlayersTurn && !$reactor.reactionInProgress
        ? 'cursor-pointer'
    : 'cursor-not-allowed',
    ]"
    :style="{
    '--transitionDuration': `${Constants.TransitionDuration}ms`,
    '--cols': $reactor.cols,
    '--rows': $reactor.rows,
  }">
    <div 
      v-for="_, ind in totalBoxes" 
      ref="boxRef" :key="`box-${ind}`" 
      :class="[
        'box relative flex justify-center items-center text-3xl border aspect-square p-0.5',
        {
          'clickable': isBoxClickable(ind),
        },
        $players.isCurrentPlayersTurn && !$reactor.reactionInProgress && isBoxClickable(ind)
          ? 'cursor-pointer'
          : 'cursor-not-allowed',
      ]"
      @click="onAddBall(ind)"
    >
    
      <!-- <span class="absolute top-0 left-0">{{ getBox(ind).count }}</span> -->

      <TravellingBalls v-if="isTravellingBall(getRow(ind), getCol(ind))" :row="getRow(ind)" :col="getCol(ind)" :color="travellingBallColor" />
      <Ball v-else :count="getBox(ind).count" :color="getBox(ind).color" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Constants from '../../config';
import useReactorStore from '../../store/reactor';
import Ball from './Ball.vue';
import TravellingBalls from './TravellingBalls.vue';
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import usePlayers from '~/store/players';
import useRoom from '~/store/room';
import eventBus from '~/services/EventBus';
import { soc_addBallToAllPlayers } from '~/helpers/room';
import useModal from '~/store/modal';

const $room = useRoom();
const $players = usePlayers();
const $reactor = useReactorStore();
const $modal = useModal();
// $reactor.fillRandomValue();

const boxRef = ref<HTMLDivElement[]>([]);
const boxesRef = ref<HTMLDivElement>();

const totalBoxes = computed(() => $reactor.rows * $reactor.cols);
const travellingBallColor = computed(() => {
  return $players.playersMap[$reactor.playerIdInProgress]?.color
});
const isCurrentPlayerReactionInProgress = computed(() => $reactor.playerIdInProgress === $players.playerIdTurn);

watch(() => $reactor.isGameOver, (newVal) => {
  if (newVal) {
    handleGameOver();
  }
});


onMounted(async () => {
  eventBus.$on('add_ball', (data) => handlePlayerAddBall(data.playerId, data.row, data.col));

  nextTick(() => {
    setTimeout(globalStyle, 500);
    window.addEventListener('resize', globalStyle);
  });

  if ($reactor.isGameOver) {
    handleGameOver();
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', globalStyle);
  eventBus.$off('add_ball', (data) => handlePlayerAddBall(data.playerId, data.row, data.col));
});

// methods
function getRow(ind: number) {
  return ~~(ind / $reactor.cols);
}

function getCol(ind: number) {
  return ind % $reactor.cols;
}

function getBox(ind: number) {
  const row = getRow(ind);
  const col = getCol(ind);

  return $reactor.ballsMatrix?.[row]?.[col] || {};
}

function isBoxClickable(ind: number) {
  const box = getBox(ind);
  return !$reactor.reactionInProgress &&
    $players.isCurrentPlayersTurn &&
    (
      !box.playerId ||
      box.playerId === $players.currentPlayer?.id
    );
}

function globalStyle() {
  const boxWidth = boxRef.value?.[0].getBoundingClientRect().width;
  boxesRef.value?.style.setProperty('--boxWidth', `${boxWidth}px`);
}

function isTravellingBall(row: number, col: number) {
  return !!$reactor.travellingBalls.find(
    (travellingBall) => travellingBall.fromRow === row && travellingBall.fromCol === col
  )
}

function onAddBall(ind: number) {
  if (!isBoxClickable(ind)) {
    return;
  }
  const row = getRow(ind);
  const col = getCol(ind);

  handlePlayerAddBall($players.currentPlayer?.id || '', row, col);
}

async function handlePlayerAddBall(playerId: string, row: number, col: number) {
  if ($reactor.reactionInProgress) return;
  $reactor.reactionInProgress = true;

  if (playerId === $players.currentPlayer?.id) {
    soc_addBallToAllPlayers({ row, col });
  } else {
    // blink the box animation for 1.5 seconds
    // update css variable "--blink-color" to the player color
    const playerColor = $players.playersMap[playerId]?.color;
    const ind = row * $reactor.cols + col;
    const box = boxRef.value?.[ind];
    if (box) {
      box.style.setProperty('--blink-color', playerColor);
      box.classList.add('blink');
      setTimeout(() => {
        box.classList.remove('blink');
      }, 1500);
    }
  }

  $reactor.startReaction(row, col);
  reactOnUI();
}

async function waitForUIToRender() {
  return nextTick(async () => new Promise(
    (res) => setTimeout(() => res(''), Constants.TransitionDuration)
  ));
}

async function reactOnUI() {
  while ($reactor.travellingBalls.length) {
    await waitForUIToRender();
    $reactor.react();
  }


  if (isCurrentPlayerReactionInProgress.value) {
    console.log('curr playerTurn')
    $players.setPlayerTurnOver();
  }

  $reactor.reactionInProgress = false;
}

function handleGameOver() {
  const freqMap = $reactor.playerIdToBoxCountMap;
  const winnerEntry = Object.entries(freqMap).find(([_, count]) => count && count > 0);
  const winnerId = winnerEntry ? winnerEntry[0] : '';
  if (winnerId) {
    $modal.openGameOverModal(winnerId);
  }
}
</script>

<style lang="scss" scoped>
.reactor {
  gap: 4px;

  grid-template-columns: repeat(var(--cols), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
  aspect-ratio: var(--cols) / var(--rows);
  max-width: calc((100vh - 120px) * var(--cols) / var(--rows));
}

.box {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;

  &.clickable:hover {
    background-color: teal;
  }

  &.blink {
    animation: blink .5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes blink {
    0% {
      background-color: color-mix(in srgb, var(--blink-color) 20%, transparent);
    }
    50% {
      background-color: rgba(255, 255, 255, 0.18);
    }
    100% {
      background-color: color-mix(in srgb, var(--blink-color) 20%, transparent);
    }
  }
}
</style>