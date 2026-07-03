import { useRef } from 'react'
import { Card, CardHeader, Button, ErrorBanner } from '@/components/ui'
import type { ExperienceLevel } from '@/types'

interface GenerateFormProps {
  topic: string
  level: ExperienceLevel | ''
  loading: boolean
  error: string | null
  onTopicChange: (t: string) => void
  onLevelChange: (l: ExperienceLevel | '') => void
  onSubmit: () => void
  onDismissError: () => void
}

const LEVEL_OPTIONS: { value: ExperienceLevel; label: string }[] = [
  { value: 'beginner', label: 'Beginner — just starting out' },
  { value: 'intermediate', label: 'Intermediate — some experience' },
  { value: 'advanced', label: 'Advanced — deep expertise' },
]

export function GenerateForm({
  topic,
  level,
  loading,
  error,
  onTopicChange,
  onLevelChange,
  onSubmit,
  onDismissError,
}: GenerateFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSubmit()
  }

  return (
    <Card>
      <CardHeader
        title="Generate curriculum"
        subtitle="Personalized Curricula for Any Skill"
      />

      {error && <ErrorBanner message={error} onDismiss={onDismissError} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="topic-input" className="text-[12px] font-medium text-sf-muted">
            Topic or skill
          </label>
          <input
            id="topic-input"
            ref={inputRef}
            type="text"
            className="sf-input"
            placeholder="e.g. Machine Learning, Web Dev…"
            value={topic}
            onChange={(e) => onTopicChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            aria-label="Topic or skill to learn"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="level-select" className="text-[12px] font-medium text-sf-muted">
            Experience level
          </label>
          <select
            id="level-select"
            className="sf-input"
            value={level}
            onChange={(e) => onLevelChange(e.target.value as ExperienceLevel | '')}
            disabled={loading}
            aria-label="Your experience level"
          >
            <option value="" disabled>
              Select level…
            </option>
            {LEVEL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button
        onClick={onSubmit}
        loading={loading}
        disabled={loading}
        aria-busy={loading}
      >

        {loading ? 'Generating…' : 'Generate curriculum'}
      </Button>
    </Card>
  )
}
