<template>
  <div class="room-info font-sans text-center p-4 rounded">
    <div class="share-code">
      <span class="text-xs">Share the room code</span>
      <div 
      class="code border text-2xl font-bold rounded cursor-pointer"
      @click="onCopy($room.roomCode)"
      >
        {{ $room.roomCode }}
      </div>
    </div>
    <span class="text-xs ">or,</span>
    <div class="share-link">
      <span class="text-xs">Join using the link</span>
      <div 
        class="link relative flex items-center gap-1 pl-2 pr-1 py-1 border rounded cursor-pointer"
        @click="onCopy(roomLink)"
      >
        <div class="flex-grow overflow-hidden text-ellipsis text-xs whitespace-nowrap">{{ roomLink }}</div>
        <button
          class="copy-action text-sm px-2 rounded"
        >
          Copy
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useRoom from '~/store/room';
import { POSITION, useToast } from 'vue-toastification';

const $room = useRoom();
const toast = useToast();

const roomLink = computed(() => `${window.location.origin}/room/${$room.roomCode}`);

function onCopy(text: string) {
  toast.success('Copied to clipboard', {
    position: POSITION.BOTTOM_LEFT,
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
  });
  navigator.clipboard.writeText(text);
}
</script>

<style lang="scss" scoped>
.code, .link {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;

  color: #fff;
}
</style>