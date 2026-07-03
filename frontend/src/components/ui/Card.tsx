import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-sf-surface border border-sf-border rounded-sf p-6',
        className,
      )}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  icon?: React.ReactNode
  title: string
  subtitle?: string
}

export function CardHeader({ icon, title, subtitle }: CardHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-[18px]">
      {icon && (
        <div className="w-8 h-8 rounded-lg bg-sf-accent-dim border border-sf-accent-border flex items-center justify-center flex-shrink-0">
          <span className="text-sf-accent [&>svg]:w-[15px] [&>svg]:h-[15px] [&>svg]:stroke-current [&>svg]:fill-none [&>svg]:stroke-[1.8]">
            {icon}
          </span>
        </div>
      )}
      <div>
        <div className="text-[20px] font-semibold text-sf-text">{title}</div>
        {subtitle && (
          <div className="text-[12px] text-sf-muted">{subtitle}</div>
        )}
      </div>
    </div>
  )
}
