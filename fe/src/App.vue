<template>
  <GlobalLayout>
    <RouterView />
  </GlobalLayout>
  <div id="root-layer-1" class="absolute z-10 top-0 left-0"></div>
</template>

<script setup lang="ts">
import GlobalLayout from './layouts/global.vue';
</script>

<style lang="scss">
.bounceOut-enter-active {
  animation: bounceOut 1s ease-out;
}

.bounceOut-leave-active {
  animation: bounceOut 1s ease-out reverse;
}

@keyframes bounceOut {

  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animationTimingFunction: ease-in-out;
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    transform: scale3d(1.03, 1.03, 1.03);
    opacity: 1;
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
</style>