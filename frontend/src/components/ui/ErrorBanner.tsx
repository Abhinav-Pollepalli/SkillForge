interface ErrorBannerProps {
  message: string
  onDismiss?: () => void
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="flex items-center gap-2.5 px-4 py-3 mb-4 rounded-sf-sm bg-red-500/8 border border-red-500/20"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 stroke-sf-red fill-none stroke-[1.8] flex-shrink-0"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span className="text-[13px] text-sf-red flex-1">{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-sf-red/60 hover:text-sf-red transition-colors bg-transparent border-0 cursor-pointer p-0"
          aria-label="Dismiss error"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  )
}
