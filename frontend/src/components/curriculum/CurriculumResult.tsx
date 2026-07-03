import { Badge, Button } from '@/components/ui'
import { ModuleCard } from './ModuleCard'
import { levelLabel } from '@/lib/utils'
import type { Curriculum } from '@/types'

interface CurriculumResultProps {
  curriculum: Curriculum
  isSaved: boolean
  onSave: () => void
  onNew: () => void
}

export function CurriculumResult({
  curriculum,
  isSaved,
  onSave,
}: CurriculumResultProps) {
  const level = levelLabel(curriculum.level)
  const levelVariant = curriculum.level

  return (
    <section
      id="curriculum-result"
      className="bg-sf-surface border border-sf-border rounded-sf p-6 animate-fade-in"
      aria-label={`Curriculum for ${curriculum.topic}`}
    >
      
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5 pb-4 border-b border-sf-border">
        <div>
          <h2 className="text-[16px] font-bold text-sf-text tracking-tight mb-2">
            {curriculum.topic}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={levelVariant}>{level}</Badge>
            <Badge variant="neutral">
              <svg
                viewBox="0 0 24 24"
                className="w-[11px] h-[11px] stroke-current fill-none stroke-2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {curriculum.totalHours} hours
            </Badge>
            <Badge variant="neutral">{curriculum.modules.length} modules</Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant={isSaved ? "ghost" : "ghost"}
            onClick={onSave}
            aria-label={isSaved ? 'Unsave curriculum' : 'Save curriculum'}
          >
            <svg
              viewBox="0 0 24 24"
              className={`w-3.5 h-3.5 stroke-current stroke-[1.8] ${isSaved ? 'fill-current' : 'fill-none'}`}
              aria-hidden="true"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            {isSaved ? 'Saved' : 'Save'}
          </Button>

        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {curriculum.modules.map((module, index) => (
          <ModuleCard key={module.id} module={module} index={index} />
        ))}
      </div>
    </section>
  )
}
