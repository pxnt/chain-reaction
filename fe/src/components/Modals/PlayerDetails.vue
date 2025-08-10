<template>
  <Modal>
    <div class="body flex flex-col bg-light-1 p-4 w-100 rounded font-mono">
      <div class="title text-xl text-center font-semibold">
        Enter player name
      </div>
      <!-- Player name -->
      <input :value="name" type="text" placeholder="eg: John Cena"
        class="border border-dark-1 mt-4 bg-transparent w-full h-10 p-2 rounded focus:outline-slate-400"
        @input="onNameInput" />
      <!-- Room Code -->
      <input :value="name" type="text" placeholder="eg: John Cena"
          class="border border-dark-1 mt-4 bg-transparent w-full h-10 p-2 rounded focus:outline-slate-400"
          @input="onRoomCodeInput" />

      <div class="flex gap-3">
        <button class="action grow p-2 mt-4 mx-auto rounded shadow-md text-light bg-orange" @click="onJoin">
          Join room
        </button>
        <button class="action grow p-2 mt-4 mx-auto rounded shadow-md text-light bg-lime-600" @click="onJoin">
          Create room
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '../Modal.vue';
import useGameActions from '../../store/gameActions';

const $gameActions = useGameActions();

const roomCode = ref('');
const name = ref('');

function onNameInput(event: any) {
  name.value = event.target.value;
}

function onRoomCodeInput(event: any) {
  roomCode.value = event.target.value;
}

function onJoin() {
  if (!name.value || !name.value.trim()) {
    return;
  }

  $gameActions.playerJoin(roomCode.value, name.value);
}
</script>

<style lang="scss" scoped>
.action {
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
}
</style>
