import { EmptyState } from '@/components/ui'
import { HistoryItemRow } from '@/components/curriculum'
import type { AppActions } from '@/hooks/useAppState'
import type { AppState } from '@/types'
import { pluralize } from '@/lib/utils'
import { deleteCurriculum, saveCurriculumToLibrary, unsaveCurriculum } from '@/lib/api'
import { useState } from 'react'

interface HistoryViewProps {
  state: AppState
  actions: AppActions
}

export function HistoryView({ state, actions }: HistoryViewProps) {
  const [curriculumToDelete, setCurriculumToDelete] =
    useState<string | null>(null)
  

  const handleDelete = async () => {
    if (!curriculumToDelete) return

    try {
      await deleteCurriculum(Number(curriculumToDelete))
      actions.deleteHistoryItem(curriculumToDelete)
      setCurriculumToDelete(null)
    } catch (error) {
      console.error('Failed to delete curriculum', error)
    }
  }

  const handleToggleSave = async (curriculumId: string) => {
    const curriculum = state.history.find(h => h.id === curriculumId)?.curriculum
    if (!curriculum) return

    const currentlySaved = state.saved.some((s) => s.id === curriculumId)

    try {
      if (currentlySaved) {
        await unsaveCurriculum(curriculumId)
        actions.unsaveCurriculum(curriculumId)
        actions.updateHistoryItemSaved(curriculumId, false)
      } else {
        await saveCurriculumToLibrary(curriculumId)
        actions.saveCurriculum(curriculum)
        actions.updateHistoryItemSaved(curriculumId, true)
      }
    } catch (err) {
      console.error('Failed to toggle save:', err)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold tracking-tight text-sf-text mb-1">
          Curriculum history
        </h1>
        <p className="text-[14px] text-sf-muted">
          {state.history.length > 0
            ? `${pluralize(state.history.length, 'curriculum')} generated. Click any to reload it.`
            : 'Curriculums you generate will appear here.'}
        </p>
      </div>

      {state.history.length === 0 ? (
        <EmptyState
          icon={
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
          title="No history yet"
          description="Curriculums you generate will appear here so you can revisit them anytime."
        />
      ) : (
        <div className="flex flex-col gap-2">
          {state.history.map((item, i) => (
            <HistoryItemRow
              key={item.id}
              item={item}
              accentIndex={i}
              onClick={() => actions.loadHistoryItem(item)}
              onDelete={(id) => {
                setCurriculumToDelete(id)
              }}
              onToggleSave={handleToggleSave}
            />
          ))}
        </div>
      )}

      {curriculumToDelete && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setCurriculumToDelete(null)}
        >
          <div
            className="bg-sf-surface-2 border border-sf-border rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-sf-text mb-2">
              Delete curriculum?
            </h2>

            <p className="text-sf-muted mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCurriculumToDelete(null)}
                className="px-4 py-2 rounded border border-sf-border hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}