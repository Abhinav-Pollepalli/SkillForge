import { EmptyState, Button } from '@/components/ui'
import { HistoryItemRow } from '@/components/curriculum'
import type { AppActions } from '@/hooks/useAppState'
import type { AppState, HistoryItem } from '@/types'
import { pluralize } from '@/lib/utils'
import { unsaveCurriculum } from '@/lib/api'

interface SavedViewProps {
  state: AppState
  actions: AppActions
}

export function SavedView({ state, actions }: SavedViewProps) {
 
  const savedAsHistoryItems: HistoryItem[] = state.saved.map((c) => ({
    id: c.id,
    topic: c.topic,
    level: c.level,
    generatedAt: c.generatedAt,
    curriculum: c,
    saved: true,
  }))

  const handleToggleSave = async (curriculumId: string) => {
    const curriculum = state.saved.find(s => s.id === curriculumId)
    if (!curriculum) return

    try {
      await unsaveCurriculum(curriculumId)
      actions.unsaveCurriculum(curriculumId)
      actions.updateHistoryItemSaved(curriculumId, false)
    } catch (err) {
      console.error('Failed to unsave curriculum:', err)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">

      <div className="mb-6">
        <h1 className="text-[22px] font-bold tracking-tight text-sf-text mb-1">
          Saved curriculums
        </h1>
        <p className="text-[14px] text-sf-muted">
          {state.saved.length > 0
            ? `${pluralize(state.saved.length, 'curriculum')} pinned to your library.`
            : 'Pin curriculums here for quick access.'}
        </p>
      </div>

      {savedAsHistoryItems.length === 0 ? (
        <EmptyState
          icon={
            <svg viewBox="0 0 24 24">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          }
          title="Nothing saved yet"
          description='Generate a curriculum and click "Save" to pin it to your library.'
          action={
            <Button onClick={() => actions.setView('dashboard')}>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-2" aria-hidden="true">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Generate one now
            </Button>
          }
        />
      ) : (
        <div className="flex flex-col gap-2">
          {savedAsHistoryItems.map((item, i) => (
            <HistoryItemRow
              key={item.id}
              item={item}
              accentIndex={i}
              onClick={() => actions.loadHistoryItem(item)}
              onToggleSave={handleToggleSave}
            />
          ))}
        </div>
      )}
    </div>
  )
}
