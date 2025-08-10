<template>
  <div class="home relative w-full h-full flex gap-24 justify-center items-center">
    <CreateRoom />
    <JoinRoom />
  </div>
</template>

<script setup lang="ts">
import CreateRoom from '../components/CreateRoom.vue';
import JoinRoom from '../components/JoinRoom.vue';
</script>