import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { chromeStorage } from './persistence'
import type { LLMProvider } from '~/shared/config/llmConfig'
import { PRESET_LLMS } from '~/shared/config/llmConfig'

type LLMState = {
  selectedId: string | null
  customProviders: LLMProvider[]
  getAllProviders: () => LLMProvider[]
  getSelected: () => LLMProvider | null
  selectLLM: (id: string) => void
  addCustomProvider: (provider: Omit<LLMProvider, 'id' | 'isCustom'>) => void
  removeCustomProvider: (id: string) => void
}

export const useLLMStore = create<LLMState>()(
  persist(
    (set, get) => ({
      selectedId: null,
      customProviders: [],

      getAllProviders: () => [...PRESET_LLMS, ...get().customProviders],

      getSelected: () => {
        const { selectedId } = get()
        if (!selectedId) return null
        return get().getAllProviders().find(p => p.id === selectedId) ?? null
      },

      selectLLM: (id) => set({ selectedId: id }),

      addCustomProvider: (provider) => {
        const newProvider: LLMProvider = {
          ...provider,
          id: `custom-${Date.now()}`,
          isCustom: true
        }
        set(state => ({ customProviders: [...state.customProviders, newProvider] }))
      },

      removeCustomProvider: (id) => {
        set(state => ({
          customProviders: state.customProviders.filter(p => p.id !== id),
          selectedId: state.selectedId === id ? PRESET_LLMS[0]?.id ?? null : state.selectedId
        }))
      }
    }),
    {
      name: 'llm-store',
      storage: createJSONStorage(() => chromeStorage)
    }
  )
)
