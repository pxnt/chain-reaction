<template>
  <main class="grid w-full h-full min-h-screen overflow-hidden">
    <Header class="header" />
    <div class="body">
      <RouterView :key="route.path" />
    </div>
    <PlayerRemovedModal v-if="$modal.showPlayerRemoved" @close="closePlayerRemovedModal" />
    <!-- footer -->
    <footer
      class="footer w-full px-4 py-4 text-center text-white/80 border-t border-white/10"
      role="contentinfo"
      aria-label="Site footer"
      itemscope
      itemtype="https://schema.org/Organization"
    >
      <meta itemprop="name" content="Chain Reaction" />
      <p class="text-xs">
        Made with <span aria-label="love" role="img">❤️</span>
        by
        <a
          href="https://pxnt.me"
          target="_blank"
          rel="noopener noreferrer author"
          class="underline hover:no-underline"
          itemprop="url"
        >PXNT</a>
      </p>
      <p class="mt-1 text-[11px] text-white/60">
        Real-time multiplayer chain reaction game. Strategic moves, cascading reactions, and competitive leaderboards.
      </p>
    </footer>
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
  grid-template-rows: max-content 1fr max-content;
  grid-template-areas:
      "header"
      "body"
      "footer";
}

.header {
  grid-area: header;
}

.body {
  grid-area: body;
}

.footer {
  grid-area: footer;
}
</style>
