import { defineStore } from 'pinia';
import { ref } from 'vue';

const useModal = defineStore('modal', () => {
  const showPlayerRemoved = ref(false);

  function showPlayerRemovedModal() {
    showPlayerRemoved.value = true;
  }

  function closePlayerRemovedModal() {
    showPlayerRemoved.value = false;
  }

  return {
    showPlayerRemoved,
    showPlayerRemovedModal,
    closePlayerRemovedModal,
  }
})

export default useModal;