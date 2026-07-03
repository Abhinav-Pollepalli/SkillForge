import { cn } from '@/lib/utils'

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn('bg-sf-surface-2 rounded animate-shimmer', className)}
      aria-hidden="true"
    />
  )
}

function SkeletonModule() {
  return (
    <div className="bg-sf-surface-2 border border-sf-border rounded-sf p-5">
      <SkeletonBlock className="w-16 h-2.5 mb-3" />
      <SkeletonBlock className="w-3/4 h-4 mb-4" />
      <div className="space-y-2.5 mb-4">
        <SkeletonBlock className="w-full h-3" />
        <SkeletonBlock className="w-5/6 h-3" />
        <SkeletonBlock className="w-4/6 h-3" />
        <SkeletonBlock className="w-3/4 h-3" />
      </div>
      <SkeletonBlock className="w-full h-[3px] mt-4 rounded-full" />
    </div>
  )
}

export function CurriculumSkeleton() {
  return (
    <div
      className="bg-sf-surface border border-sf-border rounded-sf p-6 animate-fade-in"
      role="status"
      aria-label="Generating curriculum…"
    >
     
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sf-border">
        <SkeletonBlock className="w-36 h-5" />
        <SkeletonBlock className="w-20 h-[22px] rounded-full" />
        <SkeletonBlock className="w-16 h-[22px] rounded-full" />
      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonModule key={i} />
        ))}
      </div>

      <p className="sr-only">Generating your personalized curriculum…</p>
    </div>
  )
}
