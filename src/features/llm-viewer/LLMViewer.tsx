import { useState, useEffect } from 'react'
import { useLLMStore } from '~/shared/stores/llmStore'
import { Icon } from '~/shared/components'
import './llm-viewer.css'

export function LLMViewer({ refreshKey }: { refreshKey: number }) {
  const selected = useLLMStore(s => s.getSelected())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
  }, [selected?.id, refreshKey])

  if (!selected) {
    return (
      <div className="viewer-empty">
        <Icon name="smart_toy" size={48} />
        <p>Select an LLM to get started</p>
      </div>
    )
  }

  return (
    <div className="viewer-container">
      {loading && (
        <div className="viewer-loading">
          <div className="spinner" />
          <p>Loading {selected.name}...</p>
        </div>
      )}
      <iframe
        key={`${selected.id}-${refreshKey}`}
        src={selected.url}
        className="viewer-iframe"
        style={{ opacity: loading ? 0 : 1 }}
        onLoad={() => setLoading(false)}
        allow="clipboard-write; clipboard-read"
      />
    </div>
  )
}
