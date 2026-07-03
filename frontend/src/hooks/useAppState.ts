import { useReducer, useCallback } from 'react'
import type { AppState, ViewType, Curriculum, ExperienceLevel, HistoryItem, UserSettings } from '@/types'



type Action =
  | { type: 'SET_VIEW'; payload: ViewType }
  | { type: 'SET_FORM_TOPIC'; payload: string }
  | { type: 'SET_FORM_LEVEL'; payload: ExperienceLevel | '' }
  | { type: 'GENERATE_START' }
  | { type: 'GENERATE_SUCCESS'; payload: Curriculum }
  | { type: 'GENERATE_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SAVE_CURRICULUM'; payload: Curriculum }
  | { type: 'UNSAVE_CURRICULUM'; payload: string }
  | { type: 'UPDATE_HISTORY_ITEM_SAVED'; payload: { id: string; saved: boolean } }
  | { type: 'LOAD_HISTORY_ITEM'; payload: HistoryItem }
  | { type: 'SET_HISTORY'; payload: HistoryItem[] }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR'; payload: boolean }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<UserSettings> }
  | { type: 'DELETE_HISTORY_ITEM'; payload: string }



const initialState: AppState = {
  view: 'dashboard',
  loading: false,
  error: null,
  curriculum: null,
  formTopic: '',
  formLevel: '',
  history: [],
  saved: [],
  settings: {
    emailNotifications: true,
    autoSave: false,
    weeklyDigest: true,
    darkMode: true,
  },
  sidebarOpen: false,
}


function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, view: action.payload, sidebarOpen: false }

    case 'SET_FORM_TOPIC':
      return { ...state, formTopic: action.payload, error: null }

    case 'SET_FORM_LEVEL':
      return { ...state, formLevel: action.payload, error: null }

    case 'GENERATE_START':
      return { ...state, loading: true, error: null, curriculum: null }

    case 'GENERATE_SUCCESS': {
      const curriculum = action.payload
      const historyItem: HistoryItem = {
        id: curriculum.id,
        topic: curriculum.topic,
        level: curriculum.level,
        generatedAt: curriculum.generatedAt,
        curriculum,
        saved: false,
      }
      const newSaved = state.settings.autoSave
        ? [curriculum, ...state.saved.filter((s) => s.id !== curriculum.id)]
        : state.saved
      return {
        ...state,
        loading: false,
        curriculum,
        history: [historyItem, ...state.history],
        saved: newSaved,
      }
    }

    case 'GENERATE_ERROR':
      return { ...state, loading: false, error: action.payload }

    case 'CLEAR_ERROR':
      return { ...state, error: null }

    case 'SAVE_CURRICULUM': {
      const already = state.saved.some((s) => s.id === action.payload.id)
      if (already) return state
      return { ...state, saved: [action.payload, ...state.saved] }
    }

    case 'UNSAVE_CURRICULUM':
      return { ...state, saved: state.saved.filter((s) => s.id !== action.payload) }

    case 'UPDATE_HISTORY_ITEM_SAVED':
      return {
        ...state,
        history: state.history.map((item) =>
          item.id === action.payload.id
            ? { ...item, saved: action.payload.saved }
            : item
        ),
      }

    case 'LOAD_HISTORY_ITEM':
      return {
        ...state,
        view: 'dashboard',
        curriculum: action.payload.curriculum,
        formTopic: action.payload.topic,
        formLevel: action.payload.level,
        sidebarOpen: false,
      }
    case 'DELETE_HISTORY_ITEM':
      return {
        ...state,
        history: state.history.filter(
          (item) => item.id !== action.payload
        ),
        saved: state.saved.filter(
          (curriculum) => curriculum.id !== action.payload
        ),
        curriculum:
          state.curriculum?.id === action.payload
            ? null
            : state.curriculum,
      }
      
    case 'SET_HISTORY':
      const savedCurriculums = action.payload
        .filter((item) => item.saved)
        .map((item) => item.curriculum)
      return {
        ...state,
        history: action.payload,
        saved: savedCurriculums,
      }

    case 'CLEAR_HISTORY':
      return { ...state, history: [], saved: [], curriculum: null }

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }

    case 'SET_SIDEBAR':
      return { ...state, sidebarOpen: action.payload }

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } }

    default:
      return state
  }
}



export function useAppState() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setView = useCallback((view: ViewType) => dispatch({ type: 'SET_VIEW', payload: view }), [])
  const setFormTopic = useCallback((topic: string) => dispatch({ type: 'SET_FORM_TOPIC', payload: topic }), [])
  const setFormLevel = useCallback((level: ExperienceLevel | '') => dispatch({ type: 'SET_FORM_LEVEL', payload: level }), [])
  const startGenerate = useCallback(() => dispatch({ type: 'GENERATE_START' }), [])
  const succeedGenerate = useCallback((c: Curriculum) => dispatch({ type: 'GENERATE_SUCCESS', payload: c }), [])
  const failGenerate = useCallback((msg: string) => dispatch({ type: 'GENERATE_ERROR', payload: msg }), [])
  const clearError = useCallback(() => dispatch({ type: 'CLEAR_ERROR' }), [])
  const saveCurriculum = useCallback((c: Curriculum) => dispatch({ type: 'SAVE_CURRICULUM', payload: c }), [])
  const unsaveCurriculum = useCallback((id: string) => dispatch({ type: 'UNSAVE_CURRICULUM', payload: id }), [])
  const updateHistoryItemSaved = useCallback((id: string, saved: boolean) => dispatch({ type: 'UPDATE_HISTORY_ITEM_SAVED', payload: { id, saved } }), [])
  const loadHistoryItem = useCallback((item: HistoryItem) => dispatch({ type: 'LOAD_HISTORY_ITEM', payload: item }), [])
  const deleteHistoryItem = useCallback((id: string) => dispatch({type: 'DELETE_HISTORY_ITEM', payload: id,}), [])
  const setHistory = useCallback((history: HistoryItem[]) =>dispatch({type: 'SET_HISTORY', payload: history,}), [])
  const clearHistory = useCallback(() => dispatch({ type: 'CLEAR_HISTORY' }), [])
  const toggleSidebar = useCallback(() => dispatch({ type: 'TOGGLE_SIDEBAR' }), [])
  const setSidebar = useCallback((open: boolean) => dispatch({ type: 'SET_SIDEBAR', payload: open }), [])
  const updateSettings = useCallback((s: Partial<UserSettings>) => dispatch({ type: 'UPDATE_SETTINGS', payload: s }), [])

  return {
    state,
    setView,
    setFormTopic,
    setFormLevel,
    startGenerate,
    succeedGenerate,
    failGenerate,
    clearError,
    saveCurriculum,
    unsaveCurriculum,
    updateHistoryItemSaved,
    loadHistoryItem,
    clearHistory,
    toggleSidebar,
    setSidebar,
    updateSettings,
    setHistory,
    deleteHistoryItem,
  }
}

export type AppActions = ReturnType<typeof useAppState>
