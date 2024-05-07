<script lang="ts" setup>
import { numberColorDict } from '~/composables/dict'
// import type { BlockState } from '../types'

const props = defineProps<{ block: number }>()

const getBlockClass = (block: number) => {
  if (block === -1) {
    // return 'bg-gray-400/40'
    return 'rgb(156 163 175 / 0.4)'
  }
  if (block === 0) {
    // return 'bg-gray-100/10'
    return 'rgb(243 244 246 / 0.1)'
  }
  return `${numberColorDict[block]}99`
}
</script>

<template>
  <button
    class="flex-center min-w-8 min-h-8 m-1px hover:bg-gray-500/40!"
    text="black dark:white"
    :style="{ backgroundColor: getBlockClass(props.block) }"
    border="0.5 gray-800/80 dark:gray-100/50"
  >
    <template v-if="props.block !== -1 && props.block !== 0">{{ props.block }}</template>
  </button>
</template>

<style></style>
