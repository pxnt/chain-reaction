<template>
  <div
    class="w-full h-full overflow-hidden flex flex-col items-center justify-center space-y-4">
    <div class="flex items-center space-x-2">
      <div class="animate-spin rounded-full h-8 w-8 border-2 border-orange border-t-transparent"></div>
      <div class="text-2xl font-bold text-light">
        Servers are cold starting...
      </div>
    </div>
    <div class="text-lg text-white/80">
      Please wait for a minute
    </div>
    <div class="flex space-x-1 mt-4">
      <div class="w-2 h-2 bg-orange rounded-full animate-pulse delay-0"></div>
      <div class="w-2 h-2 bg-orange rounded-full animate-pulse delay-150"></div>
      <div class="w-2 h-2 bg-orange rounded-full animate-pulse delay-300"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component for showing cold start loading state
</script>

<style lang="scss" scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

.delay-150 {
  animation-delay: 0.15s;
}

.delay-300 {
  animation-delay: 0.3s;
}
</style>
