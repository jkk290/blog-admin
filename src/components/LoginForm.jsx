import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

function LoginForm({ onClose }) {
    const { setAuth } = useAuth()
    const [usernameField, setUsernameField] = useState('')
    const [passwordField, setPasswordField] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: usernameField,
                    password: passwordField
                })
            })

            const data = await response.json()

            if (response.ok) {
                const decoded = jwtDecode(data.token)
                setAuth(data.token, decoded.sub, decoded.username)
                onClose()
            } else {
                console.error('Login failed: ', data.message)
            }
        } catch (error) {
            console.error('Unable to login, ',error)
        }

    }

    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input 
                    type="text" 
                    value={usernameField} 
                    name="username" 
                    onChange={(e) => setUsernameField(e.target.value)}
                />
                <label htmlFor="password">Password: </label>
                <input 
                    type="password" 
                    value={passwordField} 
                    name="password" 
                    onChange={(e) => setPasswordField(e.target.value)}
                />
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default LoginForm