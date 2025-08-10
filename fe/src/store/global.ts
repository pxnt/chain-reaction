import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { addPlayerNameToLocalStorage } from '~/helpers/localStorage';
import { ILocalStorageRoom } from '~/types/localStorage';

const useGlobalStore = defineStore('global', () => {
  const playerName = ref('');
  const previousRooms = ref<Record<string, ILocalStorageRoom>>({});

  const loading = reactive({
    joinRoom: false,
    createRoom: false,
  });

  function setPlayerName(name: string) {
    playerName.value = name;
    addPlayerNameToLocalStorage(name);
  }

  function setPreviousRooms(rooms: Record<string, ILocalStorageRoom>) {
    previousRooms.value = rooms;
  }

  function setCreateRoomInProgress(status: boolean) {
    loading.createRoom = status;
  }

  function setJoinRoomInProgress(status: boolean) {
    loading.joinRoom = status;
  }

  function getPreviousRoom(roomCode: string) {
    return previousRooms.value[roomCode];
  }

  return {
    playerName,
    loading,

    setPlayerName,
    setPreviousRooms,
    getPreviousRoom,
    setCreateRoomInProgress,
    setJoinRoomInProgress,
  };
});

export default useGlobalStore;