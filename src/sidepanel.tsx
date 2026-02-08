import { useState } from 'react'
import { useTheme } from '~/shared/hooks/useTheme'
import { useSettingsStore } from '~/shared/stores/settingsStore'
import { OnboardingFlow } from '~/features/onboarding'
import { LLMSelector } from '~/features/llm-selector'
import { LLMViewer } from '~/features/llm-viewer'
import { SettingsMenu } from '~/features/settings'
import { Icon } from '~/shared/components'
import './styles/global.css'

export default function SidePanel() {
  useTheme()
  const onboardingComplete = useSettingsStore(s => s.onboardingComplete)
  const [refreshKey, setRefreshKey] = useState(0)

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
        </div>
        <SettingsMenu />
      </header>
      <main className="panel-main">
        <LLMViewer refreshKey={refreshKey} />
      </main>
    </div>
  )
}
