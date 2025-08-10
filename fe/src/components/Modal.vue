<template>
  <Teleport to="#layer-1">
    <div class="fixed w-screen h-screen flex justify-center items-center">
      <Transition name="bounceOut" appear v-click-outside="closeModal">
        <div class="relative">
          <button class="absolute -top-10 -right-10 text-white text-2xl hover:text-gray-300 transition-colors"
            @click="closeModal">
            ×
          </button>
          <slot></slot>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}
</script>

<style scoped></style>
