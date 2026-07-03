import { cn } from '@/lib/utils'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
}

export function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-sf-border last:border-0">
      {(label || description) && (
        <div>
          {label && <div className="text-[13.5px] font-medium text-sf-text">{label}</div>}
          {description && <div className="text-[12px] text-sf-muted mt-0.5">{description}</div>}
        </div>
      )}
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative w-9 h-5 rounded-full border-0 cursor-pointer transition-colors flex-shrink-0',
          checked ? 'bg-sf-accent' : 'bg-sf-border',
        )}
      >
        <span
          className={cn(
            'absolute top-[3px] w-3.5 h-3.5 rounded-full bg-white transition-[left]',
            checked ? 'left-[19px]' : 'left-[3px]',
          )}
        />
        <span className="sr-only">{label}</span>
      </button>
    </div>
  )
}
