import { clsx, type ClassValue } from 'clsx'
import type { ExperienceLevel } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function levelToVariant(
  level: ExperienceLevel,
): 'beginner' | 'intermediate' | 'advanced' {
  return level
}

export function levelLabel(level: ExperienceLevel): string {
  const map: Record<ExperienceLevel, string> = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  }
  return map[level]
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? `${count} ${singular}` : `${count} ${plural ?? singular + 's'}`
}
