<template>
  <main class="grid w-full h-screen overflow-hidden">
    <Header class="header" />
    <div class="body overflow-hidden">
      <RouterView :key="route.path" />
    </div>
    <PlayerRemovedModal v-if="$modal.showPlayerRemoved" @close="closePlayerRemovedModal" />
  </main>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Header from '../components/Header.vue';
import PlayerRemovedModal from '../components/Modals/PlayerRemoved.vue';
import useModal from '../store/modal';

const $modal = useModal();

const route = useRoute()

function closePlayerRemovedModal() {
  $modal.closePlayerRemovedModal();
}
</script>

<style lang="scss" scoped>
main {
  // background: radial-gradient(ellipse, #564a42, #463d36 70%, #37302b), #37302b;
  background: linear-gradient(135deg, var(--bg1), var(--bg2), var(--bg3));
  grid-template-rows: max-content;
  grid-template-areas:
      "header"
      "body";
}

.header {
  grid-area: header;
}

.bodt {
  grid-area: body;
}
</style>
