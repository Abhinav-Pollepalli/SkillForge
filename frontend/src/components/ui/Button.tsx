import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: | 'primary'
    | 'primary'
    | 'ghost'
    | 'danger'
    | 'outline'
    | 'gradient'
    | 'glass'
    | 'neon'
    | 'soft'
    | 'elevated'
    | 'pill'
    | 'icon'
    | 'fab'
    | 'glow'
    | 'terminal'
    | 'cyberpunk'
    | 'retro'
    | 'destructive-outline'
    | 'premium'
    | 'rainbow'
    | 'danger-neon'
    | 'holographic'
    | 'aurora'
    | 'plasma'
    | 'cosmic'
    | 'void'
    | 'cyber'
    | 'matrix'
    | 'legendary'
    | 'obsidian'
    | 'crystal'
    | 'forge'
    | 'starlight'
    | 'quantum'
    
  size?: 'sm' | 'md'
  loading?: boolean
  children: React.ReactNode
}
const variantStyles = {
  primary:
    'bg-sf-accent text-white hover:bg-[#6b5cf5] disabled:opacity-50 disabled:cursor-not-allowed',

  ghost:
    'bg-sf-surface-2 text-sf-muted border border-sf-border hover:text-sf-text hover:border-sf-border-hover',

  danger:
    'bg-red-500/8 text-sf-red border border-red-500/20 hover:bg-red-500/12',

  outline:
    'border border-sf-border bg-transparent text-sf-text hover:bg-sf-surface-2',

  gradient:
    'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90',

  glass:
    'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15',

  neon:
    'border border-sf-accent text-sf-accent shadow-[0_0_12px_rgba(124,108,255,0.5)] hover:shadow-[0_0_24px_rgba(124,108,255,0.9)]',

  soft:
    'bg-slate-700/30 text-slate-200 hover:bg-slate-700/50',

  elevated:
    'bg-sf-surface-2 text-sf-text shadow-lg hover:shadow-xl',

  pill:
    'bg-sf-accent text-white rounded-full px-6 hover:bg-[#6b5cf5]',

  icon:
    'bg-sf-surface-2 text-sf-text p-2 aspect-square',

  fab:
    'bg-sf-accent text-white rounded-full shadow-xl hover:scale-105',

  glow:
    'bg-sf-accent text-white hover:shadow-[0_0_20px_rgba(124,108,255,0.8)]',

  terminal:
    'bg-black text-green-400 border border-green-500 font-mono hover:bg-green-500/10',

  cyberpunk:
    'bg-yellow-400 text-black border-2 border-pink-500 uppercase tracking-wider',

  retro:
    'bg-indigo-700 text-white border-4 border-indigo-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.4)]',

  'destructive-outline':
    'border border-red-500 text-red-400 bg-transparent hover:bg-red-500/10',

  premium:
    'bg-gradient-to-r from-amber-500 to-yellow-300 text-black font-semibold',

  rainbow:
    'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-white',

  'danger-neon':
    'border border-red-500 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.5)] hover:shadow-[0_0_24px_rgba(239,68,68,0.9)]',

  aurora:
  'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white hover:opacity-90',

  holographic:
  'bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white border border-white/20 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_32px_rgba(168,85,247,0.7)]',

  plasma:
    'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.8)] hover:shadow-[0_0_40px_rgba(168,85,247,1)]',

  cosmic:
    'bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white border border-purple-500/30 hover:border-purple-400/50',

  void:
    'bg-black/80 text-purple-300 border border-purple-500/20 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]',

  cyber:
    'bg-slate-950 text-cyan-300 border border-cyan-400/30 uppercase tracking-wider hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]',

  matrix:
    'bg-black text-green-400 border border-green-500 shadow-[0_0_12px_rgba(34,197,94,0.4)] hover:shadow-[0_0_24px_rgba(34,197,94,0.8)]',

  legendary:
    'bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 text-black font-bold shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:shadow-[0_0_32px_rgba(251,191,36,0.8)]',

  obsidian:
    'bg-gradient-to-b from-slate-800 to-black text-white border border-slate-700 hover:border-slate-500',

  crystal:
    'bg-white/5 backdrop-blur-xl border border-cyan-400/20 text-cyan-200 hover:border-cyan-300/50 hover:bg-white/10',


  starlight:
    'bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white hover:shadow-[0_0_24px_rgba(139,92,246,0.7)]',

  quantum:
    'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_16px_rgba(59,130,246,0.5)] hover:shadow-[0_0_32px_rgba(59,130,246,0.9)]',

  forge:
    'bg-gradient-to-r from-[#7c6cff] to-[#9f7aea] text-white shadow-[0_0_25px_rgba(124,108,255,0.8)] hover:shadow-[0_0_50px_rgba(124,108,255,1)] hover:brightness-110 transition-all',


  
} as const


const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs gap-1',
  md: 'px-4 py-2 text-[13.5px] gap-1.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center rounded-sf-sm font-semibold transition-all cursor-pointer border-0',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span
          className="w-3.5 h-3.5 border-2 border-white/25 border-t-white rounded-full animate-spin"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
}
