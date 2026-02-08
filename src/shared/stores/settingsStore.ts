import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { chromeStorage } from './persistence'

export type Theme = 'light' | 'dark' | 'auto'

type SettingsState = {
  theme: Theme
  onboardingComplete: boolean
  setTheme: (theme: Theme) => void
  completeOnboarding: () => void
  resetSettings: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      onboardingComplete: false,

      setTheme: (theme) => set({ theme }),
      completeOnboarding: () => set({ onboardingComplete: true }),
      resetSettings: () => set({ theme: 'light', onboardingComplete: false })
    }),
    {
      name: 'settings-store',
      storage: createJSONStorage(() => chromeStorage)
    }
  )
)
