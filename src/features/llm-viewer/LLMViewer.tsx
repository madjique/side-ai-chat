import { useState, useMemo, useRef, useEffect } from 'react'
import { useLLMStore } from '~/shared/stores/llmStore'
import { PRESET_LLMS } from '~/shared/config/llmConfig'
import { Icon } from '~/shared/components'
import './llm-viewer.css'

export function LLMViewer({ refreshKey }: { refreshKey: number }) {
  const selectedId = useLLMStore(s => s.selectedId)
  const customProviders = useLLMStore(s => s.customProviders)
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set())
  const [visitedIds, setVisitedIds] = useState<Set<string>>(new Set())
  const refreshKeys = useRef<Record<string, number>>({})
  const prevRefreshKey = useRef(refreshKey)

  const providers = useMemo(() => [...PRESET_LLMS, ...customProviders], [customProviders])

  // Track which LLMs have been visited (only render those iframes)
  useEffect(() => {
    if (selectedId && !visitedIds.has(selectedId)) {
      setVisitedIds(prev => new Set([...prev, selectedId]))
    }
  }, [selectedId, visitedIds])

  // Handle refresh - mark current LLM as not loaded and update its refresh key
  useEffect(() => {
    if (refreshKey !== prevRefreshKey.current && selectedId) {
      prevRefreshKey.current = refreshKey
      refreshKeys.current[selectedId] = refreshKey
      setLoadedIds(prev => {
        const next = new Set(prev)
        next.delete(selectedId)
        return next
      })
    }
  }, [refreshKey, selectedId])

  if (!selectedId) {
    return (
      <div className="viewer-empty">
        <Icon name="smart_toy" size={48} />
        <p>Select an LLM to get started</p>
      </div>
    )
  }

  const selected = providers.find(p => p.id === selectedId)
  const isCurrentLoaded = loadedIds.has(selectedId)

  return (
    <div className="viewer-container">
      {!isCurrentLoaded && selected && (
        <div className="viewer-loading">
          <div className="spinner" />
          <p>Loading {selected.name}...</p>
        </div>
      )}
      
      {/* Render all visited LLM iframes, hide non-selected ones */}
      {providers
        .filter(p => visitedIds.has(p.id))
        .map(provider => (
          <iframe
            key={`${provider.id}-${refreshKeys.current[provider.id] ?? 0}`}
            src={provider.url}
            className="viewer-iframe"
            style={{
              opacity: provider.id === selectedId && isCurrentLoaded ? 1 : 0,
              pointerEvents: provider.id === selectedId ? 'auto' : 'none',
              position: provider.id === selectedId ? 'relative' : 'absolute',
              zIndex: provider.id === selectedId ? 1 : 0
            }}
            onLoad={() => setLoadedIds(prev => new Set([...prev, provider.id]))}
            allow="clipboard-write; clipboard-read"
          />
        ))}
    </div>
  )
}
