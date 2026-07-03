import { cn } from '@/lib/utils'
import type { CurriculumModule } from '@/types'

const ACCENT_COLORS = [
  { bg: 'bg-sf-accent-dim', border: 'border-sf-accent-border', text: 'text-sf-accent', dot: 'bg-sf-accent' },
  { bg: 'bg-green-500/10', border: 'border-green-500/25', text: 'text-green-400', dot: 'bg-green-400' },
  { bg: 'bg-amber-500/10', border: 'border-amber-500/25', text: 'text-amber-400', dot: 'bg-amber-400' },
  { bg: 'bg-sky-500/10', border: 'border-sky-500/25', text: 'text-sky-400', dot: 'bg-sky-400' },
]

interface ModuleCardProps {
  module: CurriculumModule
  index: number
}

export function ModuleCard({ module, index }: ModuleCardProps) {
  const colors = ACCENT_COLORS[index % ACCENT_COLORS.length]

  return (
    <article className="bg-sf-surface-2 border border-sf-border rounded-sf p-[18px] transition-colors hover:border-sf-border-hover">
      <div className={cn('text-[10.5px] font-bold uppercase tracking-[0.1em] mb-1.5', colors.text)}>
        Module {index + 1} · {module.duration}
      </div>

      <h3 className="text-[13.5px] font-semibold text-sf-text mb-2.5 tracking-tight leading-snug">
        {module.title}
      </h3>

       <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-sf-accent mb-2">
          Topics
        </h4>
    
      <ul className="space-y-1.5 mb-3" aria-label="Topics covered">
        {module.topics.map((topic, i) => (
          <li key={i} className="flex items-start gap-1.5 text-[12.5px] text-sf-muted leading-relaxed">
            <span
              className={cn('w-1 h-1 rounded-full mt-[7px] flex-shrink-0', colors.dot)}
              aria-hidden="true"
            />
            {topic}
          </li>
        ))}
      </ul>

      {module.exercises.length > 0 && (
        <div className="mb-3">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-sf-accent mb-2">
            Exercises
          </h4>

          <ul className="space-y-1.5">
            {module.exercises.map((exercise, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-[12px] text-sf-muted leading-relaxed"
              >
                <span
                  className={cn(
                    'w-1 h-1 rounded-full mt-[7px] flex-shrink-0',
                    colors.dot
                  )}
                />
                {exercise}
              </li>
            ))}
          </ul>
        </div>
      )}


      {module.projects.length > 0 && (
        <div className="mb-3">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-sf-accent mb-2">
            Projects
          </h4>

          <ul className="space-y-1.5">
            {module.projects.map((project, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-[12px] text-sf-muted leading-relaxed"
              >
                <span
                  className={cn(
                    'w-1 h-1 rounded-full mt-[7px] flex-shrink-0',
                    colors.dot
                  )}
                />
                {project}
              </li>
            ))}
          </ul>
        </div>
      )}

      
      <div>
        <div className="flex items-center gap-1 text-[11.5px] text-sf-muted mb-2">
          <svg
            viewBox="0 0 24 24"
            className="w-3 h-3 stroke-current fill-none stroke-2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {module.duration}
        </div>

        <span
          className={cn(
            'inline-block rounded-full text-[10.5px] font-semibold px-2.5 py-0.5 border',
            colors.bg,
            colors.text,
            colors.border,
          )}
        >
          ✦ Objective: {module.outcome}
        </span>

        
        <div
          className="h-[3px] bg-sf-border rounded-full mt-3"
          role="progressbar"
          aria-valuenow={module.progress ?? 0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${module.title} progress`}
        >
          <div
            className={cn('h-full rounded-full transition-all duration-500', colors.dot)}
            style={{ width: `${module.progress ?? 0}%` }}
          />
        </div>
      </div>
    </article>
  )
}
