import { defineStore } from 'pinia';
import { ref } from 'vue';

const useModal = defineStore('modal', () => {
  const showPlayerRemoved = ref(false);
  const showGameOver = ref(false);
  const gameOverWinnerId = ref('');

  function showPlayerRemovedModal() {
    showPlayerRemoved.value = true;
  }

  function closePlayerRemovedModal() {
    showPlayerRemoved.value = false;
  }

  function openGameOverModal(winnerId: string) {
    gameOverWinnerId.value = winnerId;
    showGameOver.value = true;
  }

  function closeGameOverModal() {
    showGameOver.value = false;
    gameOverWinnerId.value = '';
  }

  return {
    showPlayerRemoved,
    showPlayerRemovedModal,
    closePlayerRemovedModal,
    showGameOver,
    gameOverWinnerId,
    openGameOverModal,
    closeGameOverModal,
  }
})

export default useModal;