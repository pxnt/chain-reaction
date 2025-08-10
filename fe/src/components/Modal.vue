<template>
  <Teleport to="#root-layer-1">
    <div class="fixed w-screen h-screen flex justify-center items-center">
      <Transition name="bounceOut" appear>
        <div class="relative">
          <slot></slot>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
