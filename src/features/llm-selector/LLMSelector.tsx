import { useState, useMemo } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Icon } from '~/shared/components'
import { useLLMStore } from '~/shared/stores/llmStore'
import { PRESET_LLMS } from '~/shared/config/llmConfig'
import { AddCustomLLM } from './AddCustomLLM'
import './llm-selector.css'

export function LLMSelector() {
  const selectLLM = useLLMStore(s => s.selectLLM)
  const selectedId = useLLMStore(s => s.selectedId)
  const customProviders = useLLMStore(s => s.customProviders)
  const [showAddCustom, setShowAddCustom] = useState(false)

  const providers = useMemo(() => [...PRESET_LLMS, ...customProviders], [customProviders])
  const selected = useMemo(() => {
    if (!selectedId) return null
    return providers.find(p => p.id === selectedId) ?? null
  }, [selectedId, providers])

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="selector-trigger">
          {selected?.logo ? (
            <img src={selected.logo} alt="" className="trigger-logo" />
          ) : (
            <Icon name={selected?.icon || 'smart_toy'} size={18} />
          )}
          <span>{selected?.name ?? 'Select AI'}</span>
          <Icon name="expand_more" size={18} />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="selector-content" align="start">
            {providers.map(provider => (
              <DropdownMenu.Item
                key={provider.id}
                className="selector-item"
                onSelect={() => selectLLM(provider.id)}
              >
                <div className="item-logo">
                  {provider.logo ? (
                    <img src={provider.logo} alt="" />
                  ) : (
                    <Icon name={provider.icon} size={18} />
                  )}
                </div>
                <span>{provider.name}</span>
                {provider.isCustom && (
                  <span className="badge">Custom</span>
                )}
                {selected?.id === provider.id && (
                  <Icon name="check" size={16} className="check-icon" />
                )}
              </DropdownMenu.Item>
            ))}
            <DropdownMenu.Separator className="selector-separator" />
            <DropdownMenu.Item
              className="selector-item add-custom"
              onSelect={() => setShowAddCustom(true)}
            >
              <div className="item-logo add-logo">
                <Icon name="add" size={18} />
              </div>
              <span>Add custom AI</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {showAddCustom && (
        <AddCustomLLM onClose={() => setShowAddCustom(false)} />
      )}
    </>
  )
}
