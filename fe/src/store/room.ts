import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { RoomState, type IRoom } from '../types/room'


const useRoom = defineStore('room', () => {
  const roomCode = ref('')
  const roomState = ref(RoomState.WAITING);

  const isWaiting = computed(() => roomState.value === RoomState.WAITING);
  const isRunning = computed(() => roomState.value === RoomState.STARTED);

  function setRoom(_room: IRoom) {
    roomCode.value = _room.code;
    setRoomState(_room.state);
  }

  function setRoomState(state: RoomState) {
    roomState.value = state;
  }

  function $reset() {
    roomCode.value = '';
    roomState.value = RoomState.WAITING;
  }

  return {
    roomCode,
    roomState,

    isWaiting,
    isRunning,

    setRoom,
    setRoomState,
    $reset,
  }
});

export default useRoom
