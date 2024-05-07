<script setup lang="ts">
import { createTextVNode, defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

defineOptions({
  name: 'AppProvider',
})

const ContextHolder = defineComponent({
  name: 'ContextHolder',
  setup() {
    function register() {
      window.$message = useMessage()
    }

    register()

    return () => createTextVNode()
  },
})
</script>

<template>
  <NMessageProvider>
    <ContextHolder />
    <slot></slot>
  </NMessageProvider>
</template>
