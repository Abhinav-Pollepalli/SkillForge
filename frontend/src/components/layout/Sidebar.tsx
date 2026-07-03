import { cn } from '@/lib/utils'
import type { ViewType } from '@/types'

interface NavItem {
  id: ViewType
  label: string
  icon: React.ReactNode
}

interface SidebarProps {
  currentView: ViewType
  historyCount: number
  isOpen: boolean
  onNavigate: (view: ViewType) => void
  onClose: () => void
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'history',
    label: 'History',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    id: 'saved',
    label: 'Saved',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
]

const BOTTOM_ITEMS: NavItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
]

function NavButton({
  item,
  isActive,
  badge,
  onClick,
}: {
  item: NavItem
  isActive: boolean
  badge?: number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'sf-nav-item',
        '[&>svg]:w-4 [&>svg]:h-4 [&>svg]:stroke-current [&>svg]:fill-none [&>svg]:stroke-[1.8] [&>svg]:stroke-linecap-round [&>svg]:stroke-linejoin-round [&>svg]:flex-shrink-0',
        isActive && 'sf-nav-item-active',
      )}
    >
      {item.icon}
      <span>{item.label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="ml-auto bg-sf-accent text-white text-[10px] font-semibold rounded-full px-1.5 py-px">
          {badge}
        </span>
      )}
    </button>
  )
}

export function Sidebar({ currentView, historyCount, isOpen, onNavigate, onClose }: SidebarProps) {
  const userStr = localStorage.getItem("user");
  let user = null;

  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch {
    console.warn("Invalid user data in localStorage");
    localStorage.removeItem("user");
  }

  const initials =
    user?.name
      ?.split(' ')
      .map((part: string) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? '?'
    return (
    <>
 
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'w-[220px] flex-shrink-0 bg-sf-surface border-r border-sf-border flex flex-col h-full',
          'fixed md:static z-50 md:z-auto transition-transform duration-200',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
        aria-label="Main navigation"
      >
 
        <div className="flex items-center gap-2.5 px-4 py-[18px] border-b border-sf-border">
          
          <span className="text-[20px] font-bold text-sf-text tracking-tight">
            Skill Forge
          </span>
        </div>


        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <div className="mb-5">
            <div className="text-[10px] font-semibold text-sf-muted uppercase tracking-widest px-2 mb-1">
              Workspace
            </div>
            <div className="flex flex-col gap-0.5">
              {NAV_ITEMS.map((item) => (
                <NavButton
                  key={item.id}
                  item={item}
                  isActive={currentView === item.id}
                  badge={item.id === 'history' ? historyCount : undefined}
                  onClick={() => onNavigate(item.id)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-semibold text-sf-muted uppercase tracking-widest px-2 mb-1">
              Account
            </div>
            <div className="flex flex-col gap-0.5">
              {BOTTOM_ITEMS.map((item) => (
                <NavButton
                  key={item.id}
                  item={item}
                  isActive={currentView === item.id}
                  onClick={() => onNavigate(item.id)}
                />
              ))}
            </div>
          </div>
        </nav>


        <div className="px-2 py-3 border-t border-sf-border">
          <div onClick={() => onNavigate('settings')} className="flex items-center gap-2.5 px-2 py-1.5 rounded-sf-sm hover:bg-white/4 cursor-pointer transition-colors">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sf-accent to-violet-400 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
              {initials}
            </div>
            <div className="overflow-hidden min-w-0">
              <div className="text-[12.5px] font-medium text-sf-text truncate">
                {user?.name}
              </div>

              <div className="text-[11px] text-sf-muted truncate">
                {user?.email}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
