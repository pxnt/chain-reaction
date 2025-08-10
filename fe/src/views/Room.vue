<template>
  <!-- <div> -->
  <div class="main-container flex h-full overflow-auto">
    <template v-if="$room.isRunning">
      <div class="left-section w-[200px]">
        <Leaderboard class="mt-4" />
      </div>

      <div class="relative grow flex justify-center items-center p-10 overflow-hidden">
        <Transition name="bounceOut" appear>
          <!-- min-w-[500px] -->
          <!-- max-w-[700px] -->
          <Reactor class="grow" />
        </Transition>
      </div>

      <div class="right-section">
      </div>
    </template>

    <!-- Modals -->
    <LobbyModal v-if="$room.isWaiting" />
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import Reactor from '../components/Board/Reactor.vue';
import Leaderboard from '../components/Leaderboard.vue';
import { onBeforeUnmount, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import LobbyModal from '~/components/Modals/Lobby/index.vue';
import useRoom from '~/store/room';
import roomSocketService from '~/services/RoomSocketService';

const $route = useRoute();
const roomCode = $route.params.roomCode as string;

const $room = useRoom();

onMounted(() => {
  roomSocketService.init(roomCode);
});

onBeforeUnmount(() => {
  roomSocketService.disconnect();
});
</script>

<style lang="scss" scoped></style>