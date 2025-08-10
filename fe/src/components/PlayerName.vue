<template>
  <div class="create-room flex flex-col p-4 w-100 rounded font-mono">
    <div class="title text-xl text-center font-semibold">
      Enter your nickname
    </div>

    <div class="flex gap-2 items-center mt-4">
      <!-- Player Name -->
      <input :value="$global.playerName" type="text" placeholder="Player nickname"
        class="border bg-transparent w-full h-10 p-2 rounded focus:outline-slate-400"
        @input="onPlayerNameInput" />
        
       >

      <button class="action w-40 p-2 mx-auto rounded shadow-md bg-lime-600 hover:opacity-95"
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

<style scoped lang="scss">
.create-room {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;

  color: #fff;
}
</style>
