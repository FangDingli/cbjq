<script lang="ts" setup>
import { darkTheme } from 'naive-ui'
import Index from './pages/index.vue'
import { useGlobalState } from './store/index'
import AppProvider from './components/AppProvider.vue'

const state = useGlobalState()

const theme = computed(() => (state.isDarkTheme.value ? darkTheme : undefined))
</script>

<template>
  <NConfigProvider style="height: 100%" :theme>
    <AppProvider>
      <Index></Index>
    </AppProvider>

    <NGlobalStyle></NGlobalStyle>
  </NConfigProvider>
</template>
