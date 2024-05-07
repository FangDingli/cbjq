import { createGlobalState } from '@vueuse/core'
import { useOsTheme } from 'naive-ui'

export const useGlobalState = createGlobalState(() => {
  // eslint-disable-next-line prefer-const
  let isDarkTheme = ref(false)
  const htmlRoot = document.getElementsByTagName('html')

  const osTheme = useOsTheme()

  if (osTheme.value === 'dark') {
    isDarkTheme.value = true
  }

  watchEffect(() => {
    if (isDarkTheme.value) {
      htmlRoot[0].classList.add('dark')
    } else {
      htmlRoot[0].classList.remove('dark')
    }
  })

  return { isDarkTheme }
})
