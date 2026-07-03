import { Badge } from '@/components/ui'
import { formatDate, levelLabel } from '@/lib/utils'
import type { HistoryItem as HistoryItemType } from '@/types'

interface HistoryItemProps {
  item: HistoryItemType
  onClick: () => void
  onDelete?: (id: string) => void
  onToggleSave?: (id: string) => void
  accentIndex?: number
}

const ACCENT_COLORS = [
  { bg: 'bg-sf-accent-dim', border: 'border-sf-accent-border', icon: 'text-sf-accent' },
  { bg: 'bg-green-500/10', border: 'border-green-500/25', icon: 'text-green-400' },
  { bg: 'bg-amber-500/10', border: 'border-amber-500/25', icon: 'text-amber-400' },
  { bg: 'bg-sky-500/10', border: 'border-sky-500/25', icon: 'text-sky-400' },
]

export function HistoryItemRow({
  item,
  onClick,
  onDelete,
  onToggleSave,
  accentIndex = 0,
}: HistoryItemProps) {
  const colors = ACCENT_COLORS[accentIndex % ACCENT_COLORS.length]

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="flex items-center gap-3 px-3.5 py-3 bg-sf-surface-2 border border-sf-border rounded-sf-sm
                 cursor-pointer transition-all w-full text-left hover:border-sf-border-hover hover:bg-white/[0.03]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sf-accent"
      aria-label={`Load curriculum: ${item.topic}, ${levelLabel(item.level)}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick()
        }
      }}
    >
  
      <div
        className={`w-8 h-8 rounded-[7px] flex items-center justify-center flex-shrink-0 border ${colors.bg} ${colors.border}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          className={`w-3.5 h-3.5 stroke-current fill-none stroke-2 stroke-round ${colors.icon}`}
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>

     
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-sf-text truncate">
          {item.topic}
        </div>
        <div className="text-[11px] text-sf-muted">
          {levelLabel(item.level)} · {item.curriculum.modules.length} modules ·{' '}
          {formatDate(item.generatedAt)}
        </div>
      </div>


      <div className="flex items-center gap-2 flex-shrink-0">
        <Badge variant={item.level}>
          {levelLabel(item.level)}
        </Badge>

        {onToggleSave && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleSave(item.id)
            }}
            className="p-1.5 rounded hover:bg-white/5 text-sf-muted hover:text-sf-accent transition-colors"
            aria-label={item.saved ? 'Unsave curriculum' : 'Save curriculum'}
          >
            <svg
              viewBox="0 0 24 24"
              className={`w-4 h-4 stroke-current stroke-[1.8] ${item.saved ? 'fill-current' : 'fill-none'}`}
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        )}

        {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(item.id)
          }}
          className="p-1.5 rounded hover:bg-white/5 text-sf-muted hover:text-red-400 transition-colors"
          aria-label={`Delete ${item.topic}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 stroke-current fill-none stroke-[2]"
          >
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
          </svg>
        </button>
      )}

        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5 stroke-sf-muted fill-none stroke-[1.8]"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  )
}