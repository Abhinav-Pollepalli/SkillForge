
const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:8000";
export async function signInWithGoogle(
  credential: string
) {
  const response = await fetch(
    `${API_BASE}/auth/google`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credential,
      }),
    }
  )

  const data = await response.json()

  localStorage.setItem("token", data.token)

  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  )

  window.location.reload()

  return data
}