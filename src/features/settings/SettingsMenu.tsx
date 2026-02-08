import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Icon } from '~/shared/components'
import { useSettingsStore } from '~/shared/stores/settingsStore'
import { useLLMStore } from '~/shared/stores/llmStore'
import './settings.css'

export function SettingsMenu() {
  const resetSettings = useSettingsStore(s => s.resetSettings)
  const { customProviders, removeCustomProvider } = useLLMStore()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="settings-trigger">
        <Icon name="settings" size={20} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="settings-content" align="end">
          {customProviders.length > 0 && (
            <>
              <DropdownMenu.Label className="settings-label">Custom LLMs</DropdownMenu.Label>
              {customProviders.map(p => (
                <DropdownMenu.Item
                  key={p.id}
                  className="settings-item danger"
                  onSelect={() => removeCustomProvider(p.id)}
                >
                  <Icon name="delete" size={16} />
                  <span>Remove {p.name}</span>
                </DropdownMenu.Item>
              ))}
              <DropdownMenu.Separator className="settings-separator" />
            </>
          )}

          <DropdownMenu.Item className="settings-item danger" onSelect={resetSettings}>
            <Icon name="restart_alt" size={16} />
            <span>Reset all settings</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
