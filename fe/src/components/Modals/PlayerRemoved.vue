<template>
  <Modal>
    <div class="body flex flex-col bg-light-1 p-4 w-100 rounded font-mono">
      <div class="title text-xl text-center font-semibold">
        You've been removed from the room
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Modal from '../Modal.vue';
import { useRouter } from 'vue-router';
import useModal from '~/store/modal';

const $router = useRouter();
const $modal = useModal();

onMounted(() => {
  let _timeout: NodeJS.Timeout | null = null;

  _timeout = setTimeout(() => {
    $router.push('/');

    $modal.closePlayerRemovedModal();
    if (_timeout) {
      clearTimeout(_timeout);
    }

  }, 5000);
});
</script>