interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-[52px] h-[52px] rounded-[14px] bg-sf-surface-2 border border-sf-border flex items-center justify-center mb-4 [&>svg]:w-[22px] [&>svg]:h-[22px] [&>svg]:stroke-sf-muted [&>svg]:fill-none [&>svg]:stroke-[1.5]">
        {icon}
      </div>
      <div className="text-[14px] font-semibold text-sf-text mb-1">{title}</div>
      <div className="text-[13px] text-sf-muted max-w-[280px] leading-relaxed">{description}</div>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
