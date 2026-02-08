import { useState } from 'react'
import { Button } from '~/shared/components'
import { PRESET_LLMS, type LLMProvider } from '~/shared/config/llmConfig'
import { useLLMStore } from '~/shared/stores/llmStore'
import { useSettingsStore } from '~/shared/stores/settingsStore'
import './onboarding.css'

export function OnboardingFlow() {
  const [step, setStep] = useState<'welcome' | 'select-llm'>('welcome')
  const selectLLM = useLLMStore(s => s.selectLLM)
  const completeOnboarding = useSettingsStore(s => s.completeOnboarding)

  const handleLLMSelect = (provider: LLMProvider) => {
    selectLLM(provider.id)
    completeOnboarding()
  }

  if (step === 'welcome') {
    return (
      <div className="onboarding">
        <div className="welcome-card">
          <div className="welcome-icon">
            <span className="material-symbols-outlined">neurology</span>
          </div>
          <h1>Side AI Chat</h1>
          <p>Access your favorite AI assistants in a convenient side panel</p>
          <Button onClick={() => setStep('select-llm')}>Get Started</Button>
        </div>
        <div className="welcome-footer">
          <span>Powered by open source</span>
        </div>
      </div>
    )
  }

  return (
    <div className="onboarding">
      <div className="select-content">
        <h2>Choose your AI</h2>
        <p>Select your preferred assistant to get started</p>
        <div className="llm-grid">
          {PRESET_LLMS.map(llm => (
            <button
              key={llm.id}
              className="llm-card"
              onClick={() => handleLLMSelect(llm)}
            >
              <div className="llm-logo">
                {llm.logo ? (
                  <img src={llm.logo} alt={llm.name} />
                ) : (
                  <span className="material-symbols-outlined">{llm.icon}</span>
                )}
              </div>
              <span className="llm-name">{llm.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
