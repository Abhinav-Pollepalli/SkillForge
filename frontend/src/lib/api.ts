import type {
  GenerateCurriculumRequest,
  GenerateCurriculumResponse,
  Curriculum,
  CurriculumModule,
  HistoryItem,
  User,
} from '@/types'






function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

async function handleResponse(res: Response): Promise<Response> {
  if (res.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.reload()
    throw new Error('Session expired')
  }
  return res
}

export async function getMe(): Promise<User> {
  const API_BASE =
    import.meta.env.VITE_API_BASE || "http://localhost:8000";

  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  await handleResponse(res)

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail)
  }

  return await res.json();

}


export async function generateCurriculum(
  request: GenerateCurriculumRequest,
): Promise<GenerateCurriculumResponse> {
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

  const token = localStorage.getItem("token")

  const res = await fetch(`${API_BASE}/curriculum`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      topic: request.topic,
      experience_level: request.level
    }),
  })

  await handleResponse(res)

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail)
  }

  const backendData = await res.json()



  const modules: CurriculumModule[] = backendData.modules.map((m: any) => ({
    id: generateId(),
    title: m.title,
    duration: `${m.estimated_hours} hours`,

    topics: m.topics ?? [],
    objectives: m.objectives ?? [],
    exercises: m.exercises ?? [],
    projects: m.projects ?? [],

    outcome: m.objectives?.[0] ?? 'Master the module concepts',
    progress: 0,
  }))

  const curriculum: Curriculum = {
    id: String(backendData.id),
    topic: request.topic,
    level: request.level,
    modules,
    generatedAt: new Date(),
    totalHours: backendData.modules.reduce(
      (sum: number, m: any) => sum + m.estimated_hours,
      0
    ),
  }

  return { curriculum }
}


export async function saveCurriculumToLibrary(
  curriculumId: string,
): Promise<{ success: boolean }> {
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'
  const token = localStorage.getItem("token")

  const response = await fetch(
    `${API_BASE}/curriculum/${curriculumId}/save`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  await handleResponse(response)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail)
  }

  return { success: true }
}

export async function unsaveCurriculum(
  curriculumId: string,
): Promise<{ success: boolean }> {
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'
  const token = localStorage.getItem("token")

  const response = await fetch(
    `${API_BASE}/curriculum/${curriculumId}/unsave`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  await handleResponse(response)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail)
  }

  return { success: true }
}



export async function deleteCurriculum(id: number): Promise<void> {
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'
  const token = localStorage.getItem("token")

 const response = await fetch(
    `${API_BASE}/curriculum/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  await handleResponse(response)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail)
  }
}

export async function deleteAllCurriculums(): Promise<void> {
  const API_BASE =import.meta.env.VITE_API_BASE || 'http://localhost:8000'
  const token = localStorage.getItem("token")

  const response = await fetch(
    `${API_BASE}/curriculum`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  await handleResponse(response)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail)
  }
}


export async function getAllCurriculums(): Promise<HistoryItem[]> {
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

  const token = localStorage.getItem("token")

  const res = await fetch(`${API_BASE}/curriculum`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  await handleResponse(res)

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail)
  }

  const data = await res.json()

  return data.map((item: any) => {

    const modules: CurriculumModule[] = item.curriculum.modules.map((m: any) => ({
      id: generateId(),
      title: m.title,
      duration: `${m.estimated_hours} hours`,
      topics: m.topics,
      objectives: m.objectives ?? [],
      exercises: m.exercises ?? [],
      projects: m.projects ?? [],
      outcome: m.objectives?.[0] ?? 'Master the module concepts',
      progress: 0,
    }))

    const curriculum: Curriculum = {
      id: String(item.id),
      topic: item.topic,
      level: item.level,
      modules,
      generatedAt: new Date(item.generatedAt),
      totalHours: item.curriculum.modules.reduce(
        (sum: number, m: any) => sum + m.estimated_hours,
        0
      ),
    }

    return {
      id: String(item.id),
      topic: item.topic,
      level: item.level,
      generatedAt: new Date(item.generatedAt),
      curriculum,
      saved: item.saved || false,
    }
  })

}
