import { GoogleLogin } from "@react-oauth/google";
const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:8000";
import { getMe } from "@/lib/api";


export default function LoginButton() {
  return (
    <GoogleLogin
        theme="filled_black"
        shape="pill"
        size="large"
        width="450"
        onSuccess={async (credentialResponse) => {
            const response = await fetch(
            `${API_BASE}/auth/google`,
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                credential: credentialResponse.credential,
                }),
            }
            )
            
            const data = await response.json()

            if (!response.ok) {
                console.error("Login failed:", data.detail);
                return;
            }

            localStorage.setItem("token", data.token)

            const user = await getMe()

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            )

            window.location.reload()

        }}
        onError={() => {
            alert("Google login failed. Please try again.");
        }}
        />
  )
}