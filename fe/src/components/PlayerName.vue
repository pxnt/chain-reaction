<template>
  <div class="create-room flex flex-col bg-light-1 p-4 w-100 rounded font-mono">
    <div class="title text-xl text-center font-semibold">
      Enter your nickname
    </div>

    <div class="flex gap-2">
      <!-- Player Name -->
      <input :value="$global.playerName" type="text" placeholder="Player nickname"
        class="border border-dark-1 mt-4 bg-transparent w-full h-10 p-2 rounded focus:outline-slate-400"
        @input="onPlayerNameInput" />
        >

      <button class="action w-40 p-2 mt-4 mx-auto rounded shadow-md text-light bg-lime-600 hover:opacity-95"
        @click="onJoin">
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { joinResponseHandler } from '~/helpers/room';
import RoomService from '~/services/RoomService';
import useGlobalStore from '~/store/global';

const $route = useRoute();
const $router = useRouter();
const $global = useGlobalStore();

const roomCode = ref('');

onMounted(() => {
  roomCode.value = $route.params.roomCode as string;
});

function onPlayerNameInput(event: Event) {
  const name = (event.target as HTMLInputElement).value;
  $global.setPlayerName(name);
}

async function onJoin() {
  if(!$global.playerName) {
    return;
  }

  const response = await RoomService.join({
    playerName: $global.playerName,
    roomCode: roomCode.value,
  });

  if (response) {
    joinResponseHandler(response);

    $router.push(`/room/${roomCode.value}`);
  }
}
</script>
