import { cn } from '@/lib/utils'
import type { ExperienceLevel } from '@/types'

interface BadgeProps {
  children: React.ReactNode
  variant?: ExperienceLevel | 'neutral' | 'accent'
  className?: string
}

const variantStyles: Record<string, string> = {
  beginner:
    'bg-green-500/10 text-green-400 border border-green-500/25',
  intermediate:
    'bg-amber-500/10 text-amber-400 border border-amber-500/25',
  advanced:
    'bg-sf-accent-dim text-sf-accent border border-sf-accent-border',
  neutral:
    'bg-white/5 text-sf-muted border border-sf-border',
  accent:
    'bg-sf-accent-dim text-sf-accent border border-sf-accent-border',
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
