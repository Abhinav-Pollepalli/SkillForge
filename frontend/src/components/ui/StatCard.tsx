import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: number | string
  subLabel?: string
  subColor?: 'green' | 'accent' | 'muted' | 'red'
}

const subColorMap = {
  green: 'text-sf-green',
  accent: 'text-sf-accent',
  muted: 'text-sf-muted',
  red: 'text-red-500',
}

export function StatCard({ label, value, subLabel, subColor = 'muted' }: StatCardProps) {
  return (
    <div className="bg-sf-surface border border-sf-border rounded-sf p-4">
      <div className="text-[11.5px] text-sf-muted font-medium mb-1.5">{label}</div>
      <div className="text-[22px] font-bold text-sf-text tracking-tight">{value}</div>
      {subLabel && (
        <div className={cn('text-[11px] mt-0.5', subColorMap[subColor])}>{subLabel}</div>
      )}
    </div>
  )
}
