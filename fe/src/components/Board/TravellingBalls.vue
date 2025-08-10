<template>
  <section class="ball-container travelling-balls" :style="{ color }">
    <figure v-for="direction, ind in directions" :key="`direction-${ind}`" class="ball" :class="[direction]" />
    <!-- <figure class="ball up"></figure>
    <figure class="ball down"></figure>
    <figure class="ball left"></figure>
    <figure class="ball right"></figure> -->
  </section>
</template>

<script>
import { mapStores } from 'pinia'
import useReactorStore from '../../store/reactor'
import { Directions } from '../../config'

export default {
  props: {
    row: {
      type: Number,
      default: 0,
    },
    col: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: 'red',
    },
  },

  computed: {
    ...mapStores(useReactorStore),

    directions() {
      const Movements = {
        [Directions.UP]: [-1, 0],
        [Directions.DOWN]: [1, 0],
        [Directions.LEFT]: [0, -1],
        [Directions.RIGHT]: [0, 1],
      }

      const isValidBox = (x, y) =>
        x >= 0 && y >= 0 && x < this.reactorStore.rows && y < this.reactorStore.cols

      const directions = []
      Object.entries(Movements).forEach(([direction, [moveX, moveY]]) => {
        const targetRow = this.row + moveX
        const targetCol = this.col + moveY

        if (isValidBox(targetRow, targetCol))
          directions.push(direction)
      })

      return directions
    },

    count() {
      return this.reactorStore.ballsMatrix[this.row][this.col].count
    },
  },
}
</script>

<style lang="scss" scoped>
.travelling-balls {
  z-index: 1;

  .up {
    animation: up var(--transitionDuration) linear infinite;
  }

  .down {
    animation: down var(--transitionDuration)  linear infinite;
  }

  .left {
    animation: left var(--transitionDuration) linear infinite;
  }

  .right {
    animation: right var(--transitionDuration) linear infinite;
  }
}

@keyframes up {
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(calc(var(--boxWidth) * -1));
    opacity: 0;
  }
}

@keyframes down {
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(var(--boxWidth));
    opacity: 0;
  }
}

@keyframes left {
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(calc(var(--boxWidth) * -1));
    opacity: 0;
  }
}

@keyframes right {
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(var(--boxWidth));
    opacity: 0;
  }
}
</style>
