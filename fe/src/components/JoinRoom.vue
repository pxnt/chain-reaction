<template>
  <div class="join-room flex flex-col p-4 w-100 rounded font-mono">
    <div class="title text-xl text-center font-semibold">
      Join Room
    </div>
    <!-- Room Code -->
    <div class="flex gap-2">
      <input 
        :value="roomCode" 
        type="text"
        placeholder="Room code"
        class="border border-dark-1 mt-4 bg-transparent w-full h-10 p-2 rounded focus:outline-slate-400"
        @keydown.enter="onJoin"
        @input="onRoomCodeInput"
      >

      <!-- <div class="flex gap-3"> -->
        <button 
          class="action w-40 p-2 mt-4 mx-auto rounded shadow-md hover:opacity-95"
          @click="onJoin"
        >
          Join
        </button>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useGlobalStore from '../store/global';
import { useRouter } from 'vue-router';
import RoomService from '~/services/RoomService';
import { isValidRoomCode } from '~/utils/misc';
import { joinResponseHandler } from '~/helpers/room';

const $router = useRouter();
const $globalStore = useGlobalStore();

const roomCode = ref('');

function onRoomCodeInput(event: Event) {
  roomCode.value = (event.target as HTMLInputElement).value;
}

async function onJoin() {
  // validate room code
  if (!isValidRoomCode(roomCode.value)) {
    return;
  }

  if($globalStore.getPreviousRoom(roomCode.value)) {
    $router.push(`/room/${roomCode.value}`);
    return;
  }

  if(!$globalStore.playerName) {
    $router.push(`/room/${roomCode.value}/player`);
    return;
  }

  // join api
  $globalStore.setJoinRoomInProgress(true);
  const response = await RoomService.join({
    roomCode: roomCode.value,
    playerName: $globalStore.playerName,
  });
  $globalStore.setJoinRoomInProgress(false);

  if (response) {
    joinResponseHandler(response);

    $router.push(`/room/${roomCode.value}`);
  }
}
</script>

<style lang="scss" scoped>
.join-room {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;

  color: #fff;
}

.action {
  background: linear-gradient(135deg, #7bdcb5, #00d2ff);
  color: #000;
  font-weight: 600;
}
</style>