<template>
  <Modal>
    <div class="body flex flex-col bg-light-1 p-4 w-100 rounded font-mono min-w-80 max-w-100">
      <div class="title text-2xl text-center font-semibold">
        Game Over
      </div>
      <div class="mt-2 text-center" v-if="winner">
        <div class="text-sm opacity-80">Winner</div>
        <div class="mt-1 flex items-center justify-center gap-2">
          <span class="inline-block h-3 w-3 rounded-full" :style="{ backgroundColor: winner.color }" />
          <span class="text-xl">{{ winner.name }}</span>
        </div>
      </div>

      <div class="flex gap-3 mt-4">
        <button class="grow p-2 mx-auto rounded shadow-md text-light bg-orange" @click="onClose">
          Close
        </button>
      </div>
    </div>
  </Modal>
  
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Modal from '../Modal.vue';
import useModal from '~/store/modal';
import usePlayers from '~/store/players';
import { useRouter } from 'vue-router';

const $modal = useModal();
const $players = usePlayers();
const $router = useRouter();

const winner = computed(() => {
  const id = $modal.gameOverWinnerId;
  return id ? $players.playersMap[id] : undefined;
});

function onClose() {
  $modal.closeGameOverModal();
  $router.push('/');
}
</script>

<style lang="scss" scoped>
</style>


