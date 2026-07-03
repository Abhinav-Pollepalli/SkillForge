import { useState } from 'react'
import { Card, CardHeader, Toggle, Button } from '@/components/ui'
import type { AppActions } from '@/hooks/useAppState'
import type { AppState } from '@/types'
import { deleteAllCurriculums } from '@/lib/api'

interface SettingsViewProps {
  state: AppState
  actions: AppActions
}

function SettingsRow({
  label,
  description,
  action,
}: {
  label: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-sf-border last:border-0">
      <div>
        <div className="text-[13.5px] font-medium text-sf-text">{label}</div>
        {description && (
          <div className="text-[12px] text-sf-muted mt-0.5">
            {description}
          </div>
        )}
      </div>
      {action}
    </div>
  )
}

export function SettingsView({ state, actions }: SettingsViewProps) {
  const { settings } = state
  const user = JSON.parse(
    localStorage.getItem("user") ?? "null"
  )

  const [showClearHistoryModal, setShowClearHistoryModal] = useState(false)

  const handleClearHistory = async () => {
    try {
      await deleteAllCurriculums()
      actions.clearHistory()
      setShowClearHistoryModal(false)
    } catch (error) {
      console.error('Failed to clear history', error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold tracking-tight text-sf-text mb-1">
          Settings
        </h1>
        <p className="text-[14px] text-sf-muted">
          Manage your account and preferences.
        </p>
      </div>


      <Card className="mb-4">
        <CardHeader
          icon={
            <svg viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
          title="Profile"
        />
        <div className="h-px bg-sf-border mb-1" />

        <SettingsRow
          label="Name"
          description={user?.name}
        />

        <SettingsRow
          label="Email"
          description={user?.email}
        />

        <SettingsRow
          label="Account"
          description="Signed in with Google"
          action={
            <Button
              variant="neon"
              size="sm"
              onClick={() => {
                localStorage.removeItem("token")
                localStorage.removeItem("user")

                window.location.reload()
              }}
            >
              Logout
            </Button>
          }
        />
      </Card>


      <Card className="mb-4">
        <CardHeader
          icon={
            <svg viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          }
          title="Preferences"
        />
        <div className="h-px bg-sf-border mb-1" />

        <Toggle
          checked={settings.darkMode}
          onChange={(v) =>
            actions.updateSettings({ darkMode: v })
          }
          label="Dark mode"
          description="Switch between dark and light interface"
        />

      </Card>


      <Card className="mb-4">
        <CardHeader
          icon={
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8h.01" />
              <path d="M11 12h1v4h1" />
            </svg>
          }
          title="About SkillForge"
        />
        <div className="h-px bg-sf-border mb-1" />

        <SettingsRow
          label="Version"
          description="1.0.0"
        />

        <SettingsRow
          label="Built with"
          description="React • TypeScript • FastAPI • PostgreSQL • Gemini 3.1 Flash Lite"
        />

        <SettingsRow
          label="Developer"
          description="Abhinav Pollepalli"
        />

        <SettingsRow
          label="GitHub"
          action={
            <a
              href="https://github.com/Abhinav-Pollepalli/SkillForge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sf-accent hover:underline text-sm"
            >
              View Repository
            </a>
          }
        />

        <SettingsRow
          label="LinkedIn"
          action={
            <a
              href="https://www.linkedin.com/in/abhinav-pollepalli/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sf-accent hover:underline text-sm"
            >
              View LinkedIn
            </a>
          }
        />

      </Card>


      <Card>
        <CardHeader
          icon={
            <svg viewBox="0 0 24 24" className="!stroke-sf-red">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
          }
          title="Danger zone"
        />
        <div className="h-px bg-sf-border mb-1" />

        <SettingsRow
          label="Clear all history"
          description="Permanently delete all generated and saved curriculums"
          action={
            <Button
              variant="danger-neon"
              size="sm"
              onClick={() => setShowClearHistoryModal(true)}
              disabled={
                state.history.length === 0 &&
                state.saved.length === 0
              }
            >
              Clear
            </Button>
          }
        />

      </Card>

      {showClearHistoryModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowClearHistoryModal(false)}
        >
          <div
            className="bg-sf-surface-2 border border-sf-border rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-sf-text mb-2">
              Clear all history?
            </h2>

            <p className="text-sf-muted mb-6">
              This will permanently delete all generated and saved curriculums.
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowClearHistoryModal(false)}
                className="px-4 py-2 rounded border border-sf-border hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                onClick={handleClearHistory}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}