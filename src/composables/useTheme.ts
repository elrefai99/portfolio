import { ref, watch, onMounted } from 'vue'
import { usePreferredDark } from '@vueuse/core'

export type ThemeMode = 'light' | 'dark' | 'auto'

export function useTheme() {
     const STORAGE_KEY = 'theme-mode'

     const prefersDark = usePreferredDark()

     const themeMode = ref<ThemeMode>('auto')

     const isDark = ref(false)

     const applyTheme = (dark: boolean) => {
          isDark.value = dark
          if (dark) {
               document.documentElement.classList.add('dark')
          } else {
               document.documentElement.classList.remove('dark')
          }
     }

     const updateTheme = () => {
          if (themeMode.value === 'auto') {
               applyTheme(prefersDark.value)
          } else {
               applyTheme(themeMode.value === 'dark')
          }
     }

     const setThemeMode = (mode: ThemeMode) => {
          themeMode.value = mode
          localStorage.setItem(STORAGE_KEY, mode)
          updateTheme()
     }

     const toggleTheme = () => {
          if (isDark.value) {
               setThemeMode('light')
          } else {
               setThemeMode('dark')
          }
     }

     const cycleTheme = () => {
          const modes: ThemeMode[] = ['light', 'dark', 'auto']
          const currentIndex = modes.indexOf(themeMode.value)
          const nextIndex = (currentIndex + 1) % modes.length
          setThemeMode(modes[nextIndex])
     }

     const initTheme = () => {
          const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
          if (stored && ['light', 'dark', 'auto'].includes(stored)) {
               themeMode.value = stored
          }
          updateTheme()
     }

     watch(prefersDark, () => {
          if (themeMode.value === 'auto') {
               updateTheme()
          }
     })

     onMounted(() => {
          initTheme()
     })

     return {
          themeMode,
          isDark,
          setThemeMode,
          toggleTheme,
          cycleTheme,
     }
}
