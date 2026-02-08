import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Icon, Button } from '~/shared/components'
import { useLLMStore } from '~/shared/stores/llmStore'
import './add-custom.css'

type Props = {
  onClose: () => void
}

export function AddCustomLLM({ onClose }: Props) {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const addCustomProvider = useLLMStore(s => s.addCustomProvider)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && url) {
      addCustomProvider({ name, url, icon: 'language' })
      onClose()
    }
  }

  return (
    <Dialog.Root open onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">Add Custom LLM</Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="My LLM"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="url">URL</label>
              <input
                id="url"
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com/chat"
                required
              />
            </div>
            <div className="dialog-actions">
              <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
              <Button type="submit">Add</Button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button className="dialog-close" aria-label="Close">
              <Icon name="close" size={18} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
