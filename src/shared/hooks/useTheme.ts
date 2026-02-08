import { useEffect } from 'react'
import { useSettingsStore } from '~/shared/stores/settingsStore'

export function useTheme() {
  const { theme, setTheme } = useSettingsStore()

  useEffect(() => {
    const root = document.documentElement
    
    const applyTheme = (isDark: boolean) => {
      root.setAttribute('data-theme', isDark ? 'dark' : 'light')
    }

    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      applyTheme(mediaQuery.matches)
      
      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches)
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    } else {
      applyTheme(theme === 'dark')
    }
  }, [theme])

  return { theme, setTheme }
}
