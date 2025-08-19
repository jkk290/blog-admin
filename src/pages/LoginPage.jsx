import { useState } from 'react'
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const { setAuth, logout, verifyAdmin } = useAuth()
    const [usernameField, setUsernameField] = useState('')
    const [passwordField, setPasswordField] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

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

                const isAdmin = await verifyAdmin(data.token, decoded.username)
                if (!isAdmin) {
                    logout()
                    setError('Unauthorized, not an admin')
                } else {
                    navigate('/admin')
                }              
            } else {
                setError(`Login failed: ${data.message}`)
            }
        } catch (error) {
            setError(`Unable to login: ${error}`)
        }
    }

    return (
        <div>
            <h1>Admin Login</h1>
            <h2 className='errorMsg'>{error}</h2>
            <form method='post' onSubmit={handleSubmit}>
                <label htmlFor="usernameField">Username: </label>
                <input 
                type="text" 
                name='usernameField'
                value={usernameField}
                onChange={(e) => setUsernameField(e.target.value)}
                />
                <br />
                <label htmlFor="passwordField">Password: </label>
                <input 
                type="password" 
                name='passwordField'
                value={passwordField}
                onChange={(e) => setPasswordField(e.target.value)}
                />
                <br />
                <button type='submit'>Log in</button>
            </form>
        </div>
    )
}

export default LoginPage