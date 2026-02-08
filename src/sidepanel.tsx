import { useState, useMemo } from 'react'
import { useTheme } from '~/shared/hooks/useTheme'
import { useSettingsStore } from '~/shared/stores/settingsStore'
import { useLLMStore } from '~/shared/stores/llmStore'
import { PRESET_LLMS } from '~/shared/config/llmConfig'
import { OnboardingFlow } from '~/features/onboarding'
import { LLMSelector } from '~/features/llm-selector'
import { LLMViewer } from '~/features/llm-viewer'
import { SettingsMenu } from '~/features/settings'
import { Icon } from '~/shared/components'
import './styles/global.css'

export default function SidePanel() {
  useTheme()
  const onboardingComplete = useSettingsStore(s => s.onboardingComplete)
  const selectedId = useLLMStore(s => s.selectedId)
  const customProviders = useLLMStore(s => s.customProviders)
  const [refreshKey, setRefreshKey] = useState(0)

  const providers = useMemo(() => [...PRESET_LLMS, ...customProviders], [customProviders])
  const selected = useMemo(() => {
    if (!selectedId) return null
    return providers.find(p => p.id === selectedId) ?? null
  }, [selectedId, providers])

  const handleOpenInTab = () => {
    if (selected?.url) {
      chrome.tabs.create({ url: selected.url })
      window.close()
    }
  }

  if (!onboardingComplete) {
    return <OnboardingFlow />
  }

  return (
    <div className="panel">
      <header className="panel-header">
        <div className="header-left">
          <LLMSelector />
          <button 
            className="icon-btn" 
            onClick={() => setRefreshKey(k => k + 1)}
            title="Refresh"
          >
            <Icon name="refresh" size={18} />
          </button>
          <button 
            className="icon-btn" 
            onClick={handleOpenInTab}
            title="Open in new tab"
            disabled={!selected}
          >
            <Icon name="open_in_new" size={18} />
          </button>
        </div>
        <SettingsMenu />
      </header>
      <main className="panel-main">
        <LLMViewer refreshKey={refreshKey} />
      </main>
    </div>
  )
}
