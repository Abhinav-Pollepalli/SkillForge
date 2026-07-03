

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'

export interface CurriculumModule {
  id: string
  title: string
  duration: string

  topics: string[]
  objectives: string[]
  exercises: string[]
  projects: string[]

  outcome: string
  progress?: number
}

export interface Curriculum {
  id: string
  topic: string
  level: ExperienceLevel
  modules: CurriculumModule[]
  generatedAt: Date
  totalHours: number
}

export interface HistoryItem {
  id: string
  topic: string
  level: ExperienceLevel
  generatedAt: Date
  curriculum: Curriculum
  saved: boolean
}



export type ViewType = 'dashboard' | 'history' | 'saved' | 'settings'

export interface AppState {
  view: ViewType
  loading: boolean
  error: string | null
  curriculum: Curriculum | null
  formTopic: string
  formLevel: ExperienceLevel | ''
  history: HistoryItem[]
  saved: Curriculum[]
  settings: UserSettings
  sidebarOpen: boolean
}

export interface UserSettings {
  emailNotifications: boolean
  autoSave: boolean
  weeklyDigest: boolean
  darkMode: boolean
}




export interface User {
  id: number
  google_id: string
  email: string
  name: string
  curriculum_generations: number
  remaining_generations: number
  max_generations: number
}

export interface GenerateCurriculumRequest {
  topic: string
  level: ExperienceLevel
}

export interface GenerateCurriculumResponse {
  curriculum: Curriculum
}



export interface NavItem {
  id: ViewType
  label: string
  icon: React.ReactNode
}

export interface StatCardProps {
  label: string
  value: number | string
  subLabel?: string
  subColor?: 'green' | 'accent' | 'muted'
}

export interface BadgeVariant {
  variant: 'beginner' | 'intermediate' | 'advanced' | 'neutral' | 'accent'
}


