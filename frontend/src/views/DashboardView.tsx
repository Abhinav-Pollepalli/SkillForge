import { useRef, useEffect } from 'react'
import { StatCard, EmptyState } from '@/components/ui'
import {
  GenerateForm,
  CurriculumSkeleton,
  CurriculumResult,
  HistoryItemRow,
} from '@/components/curriculum'
import { Card, CardHeader } from '@/components/ui'
import type { AppActions } from '@/hooks/useAppState'
import type { AppState } from '@/types'
import { generateCurriculum, getMe, saveCurriculumToLibrary, unsaveCurriculum } from "@/lib/api"

interface DashboardViewProps {
  state: AppState
  actions: AppActions
}

export function DashboardView({ state, actions }: DashboardViewProps) {
  const resultRef = useRef<HTMLDivElement>(null)

  const user = JSON.parse(
    localStorage.getItem("user") ?? "null"
  )


  useEffect(() => {
    if (state.curriculum && !state.loading) {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [state.curriculum, state.loading])

  const handleGenerate = async () => {
    if (!state.formTopic.trim()) {
      actions.failGenerate('Please enter a topic to generate a curriculum.')
      return
    }
    if (!state.formLevel) {
      actions.failGenerate('Please select your experience level.')
      return
    }

    actions.startGenerate()
    try {
      const { curriculum } = await generateCurriculum({
        topic: state.formTopic.trim(),
        level: state.formLevel,
      })

      const user = await getMe()

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      )

      actions.succeedGenerate(curriculum)
      actions.setFormTopic("")
    } catch (err) {
      actions.failGenerate(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      )
    }
  }

  const isSaved = state.curriculum
    ? state.saved.some((s) => s.id === state.curriculum!.id)
    : false

  const handleSave = async (curriculumId?: string) => {
    const id = curriculumId || state.curriculum?.id
    if (!id) return

    const curriculum = state.curriculum || state.history.find(h => h.id === id)?.curriculum
    if (!curriculum) return

    const currentlySaved = state.saved.some((s) => s.id === id)

    try {
      if (currentlySaved) {
        await unsaveCurriculum(id)
        actions.unsaveCurriculum(id)
        actions.updateHistoryItemSaved(id, false)
      } else {
        await saveCurriculumToLibrary(id)
        actions.saveCurriculum(curriculum)
        actions.updateHistoryItemSaved(id, true)
      }
    } catch (err) {
      console.error('Failed to toggle save:', err)
    }
  }

  const recentHistory = state.history.slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-7">
        <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-sf-accent uppercase tracking-[0.1em] mb-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sf-accent ai-powered-dot" aria-hidden="true" />
          AI-Powered
        </div>
        <h1 className="text-[26px] font-bold tracking-tight text-sf-text leading-tight mb-2">
          Build your personalized<br className="hidden sm:block" /> learning path
        </h1>
        <p className="text-[14px] text-sf-muted leading-relaxed max-w-lg">
          Enter a topic and your experience level. SkillForge uses AI to generate a
          structured, module-by-module curriculum tailored to exactly where you are.
        </p>
      </div>


      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <StatCard
          label="Curriculums generated"
          value={state.history.length}
          subLabel={
            user
              ? `${user.remaining_generations} / ${user.max_generations} remaining`
              : ""
          }
          subColor="green"
        />
        <StatCard
          label="Modules created"
          value={state.history.reduce((a, h) => a + h.curriculum.modules.length, 0)}
          subLabel="Personalized"
          subColor="accent"
        />
        <div className="col-span-2 sm:col-span-1">
          <StatCard
            label="Saved curriculums"
            value={state.saved.length}
            subLabel="In library"
            subColor="red"
          />
        </div>
      </div>


      <GenerateForm
        topic={state.formTopic}
        level={state.formLevel}
        loading={state.loading}
        error={state.error}
        onTopicChange={actions.setFormTopic}
        onLevelChange={actions.setFormLevel}
        onSubmit={handleGenerate}
        onDismissError={actions.clearError}
      />


      {state.loading && <CurriculumSkeleton />}


      {state.curriculum && !state.loading && (
        <div ref={resultRef}>
          <CurriculumResult
            curriculum={state.curriculum}
            isSaved={isSaved}
            onSave={handleSave}
            onNew={() => {
              actions.setFormTopic('')
              actions.setFormLevel('')
            }}
          />
        </div>
      )}


      {!state.curriculum && !state.loading && recentHistory.length > 0 && (
        <Card>
          <CardHeader
            icon={
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            }
            title="Recent curriculums"
            subtitle="Click any to reload"
          />
          <div className="flex flex-col gap-2">
            {recentHistory.map((item, i) => (
              <HistoryItemRow
                key={item.id}
                item={item}
                accentIndex={i}
                onClick={() => actions.loadHistoryItem(item)}
                onDelete={() => actions.deleteHistoryItem(item.id)}
                onToggleSave={handleSave}
              />
            ))}
          </div>
        </Card>
      )}


      {!state.curriculum && !state.loading && recentHistory.length === 0 && (
        <Card>
          <EmptyState
            icon={
              <svg viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            }
            title="No curriculums yet"
            description="Enter a topic above to forge your personalized learning path."
          />
        </Card>
      )}

      <footer className="mt-12 border-t border-sf-border pt-6 text-center text-xs text-sf-muted">
        © 2026 SkillForge • Built by{" "}
        <a
          href="https://github.com/Abhinav-Pollepalli"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sf-accent hover:underline"
        >
          Abhinav Pollepalli
        </a>
      </footer>
    </div>

    
  )
}
