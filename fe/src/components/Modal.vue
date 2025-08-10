<template>
  <Teleport to="#layout-layer-1">
    <div class="relative w-full h-full flex justify-center items-center">
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
