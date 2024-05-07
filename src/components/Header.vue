<script lang="ts" setup>
import { useGlobalState } from '~/store'
import MoonIcon from '~icons/tdesign/moon'
import SunnyIcon from '~icons/tdesign/sunny'
import GithubIcon from '~icons/tdesign/logo-github'

const state = useGlobalState()

const switchDarkTheme = () => {
  state.isDarkTheme.value = !state.isDarkTheme.value
}

const openGithub = () => {
  window.open('https://github.com/FangDingli/cbjq')
}
</script>

<template>
  <div class="w-full h-full" flex="~ justify-around items-center">
    <div></div>
    <NH1 style="margin: 0"> <NText type="info">尘白禁区信源研析工具</NText> </NH1>
    <div flex="justify-items-end" text="16px">
      <i v-show="state.isDarkTheme.value" cursor-pointer @click="switchDarkTheme">
        <SunnyIcon></SunnyIcon>
      </i>
      <i v-show="!state.isDarkTheme.value" cursor-pointer @click="switchDarkTheme">
        <MoonIcon></MoonIcon>
      </i>
      <i cursor-pointer ml-4 @click="openGithub">
        <GithubIcon></GithubIcon>
      </i>
    </div>
  </div>
</template>
