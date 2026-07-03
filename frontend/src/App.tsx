import { useEffect } from 'react'
import { Sidebar, Topbar } from '@/components/layout'
import { DashboardView, HistoryView, SavedView, SettingsView } from '@/views'
import { useAppState } from '@/hooks/useAppState'
import { getAllCurriculums } from '@/lib/api'
import LoginView from '@/views/LoginView'




export default function App() {
  const { state, ...actions } = useAppState()
  const token = localStorage.getItem("token")
  if (!token) {
    return <LoginView />
  }
  

  useEffect(() => {
  
    const root = document.documentElement  
    if (state.settings.darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [state.settings.darkMode]) 

  useEffect(() => {
    async function loadHistory() {
      try {
        const history = await getAllCurriculums()
        actions.setHistory(history)
      } catch (error) {
        console.error('Failed to load history:', error)
      }
    }

    loadHistory()
  }, [])

  
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) actions.setSidebar(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [actions])

  const handleNewCurriculum = () => {
    actions.setView('dashboard')
    actions.setFormTopic('')
    actions.setFormLevel('')

    setTimeout(() => {
      document.getElementById('topic-input')?.focus()
    }, 50)
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-sf-bg text-sf-text">
      <Sidebar
        currentView={state.view}
        historyCount={state.history.length}
        isOpen={state.sidebarOpen}
        onNavigate={actions.setView}
        onClose={() => actions.setSidebar(false)}
      />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Topbar
          view={state.view}
          onNewCurriculum={handleNewCurriculum}
          onMenuToggle={actions.toggleSidebar}
        />

        <main
          className="flex-1 overflow-y-auto px-6 py-7 md:px-8"
          id="main-content"
          aria-label="Main content"
        >
          {state.view === 'dashboard' && (
            <DashboardView state={state} actions={{ state, ...actions }} />
          )}
          {state.view === 'history' && (
            <HistoryView state={state} actions={{ state, ...actions }} />
          )}
          {state.view === 'saved' && (
            <SavedView state={state} actions={{ state, ...actions }} />
          )}
          {state.view === 'settings' && (
            <SettingsView state={state} actions={{ state, ...actions }} />
          )}
        </main>
      </div>
    </div>
  )
}
