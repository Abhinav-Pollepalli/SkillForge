import { capitalize } from '@/lib/utils'
import type { ViewType } from '@/types'

interface TopbarProps {
  view: ViewType
  onNewCurriculum: () => void
  onMenuToggle: () => void
}

export function Topbar({ view, onNewCurriculum, onMenuToggle }: TopbarProps) {
  return (
    <header className="h-[53px] border-b border-sf-border flex items-center px-6 gap-3 flex-shrink-0">

      <button
        onClick={onMenuToggle}
        className="md:hidden sf-btn-ghost p-2 !gap-0"
        aria-label="Open menu"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 stroke-current fill-none stroke-[1.8] stroke-round"
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <span className="text-[14px] font-medium text-sf-text flex-1">
        {capitalize(view)}
      </span>

      <button
        onClick={onNewCurriculum}
        className="sf-btn-ghost text-[13px]"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5 stroke-current fill-none stroke-2 stroke-round"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        New curriculum
      </button>

    </header>
  )
}