import { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [authToken, setAuthToken] = useState(null) 
    const [userId, setUserId] = useState(null)
    const [username, setUsername] = useState(null)

    const setAuth = (token, userId, username) => {
        setIsAuthenticated(true)
        setUserId(userId)
        setUsername(username)
        setAuthToken(token)
        localStorage.setItem('authToken', token)
        setIsLoading(false)
        setError(null)
    }   

    const logout = () => {
        setIsAuthenticated(false)
        setUserId(null)
        setUsername(null)
        setAuthToken(null)
        localStorage.removeItem('authToken')
        setIsLoading(false)
        setError(null)
    }

    const verifyAdmin = async (token, username) => {
        const response = await fetch('http://localhost:3000/api/auth/checkAdmin', {
            method: 'post',
            headers: {
                'Content-Type': 'Application/JSON',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                username: username
            })
        })

        if (!response.ok) {
            throw new Error('Unable to verify admin status')
        }

        const data = await response.json()
        console.log('Is user admin? ', data)
        return data.admin
    }
   
    useEffect( () => {
        const checkToken = async () => {
            console.log('Checking for existing token...')
            const existingToken = localStorage.getItem('authToken')
            
            if(existingToken) {
                try {
                    console.log('Found token, verifying with api...')
                    const response = await fetch('http://localhost:3000/api/auth/verify', {
                        headers: {
                            'Content-Type': 'Application/JSON',
                            'Authorization': `Bearer ${existingToken}`
                        } 
                    })

                    if (response.status === 200) {
                        console.log('Token is still valid, updating auth status...')
                        const decoded = jwtDecode(existingToken)
                        setIsAuthenticated(true)
                        setUserId(decoded.sub)
                        setUsername(decoded.username)
                        setAuthToken(existingToken)
                        setIsLoading(false)
                        setError(null)
                        return
                    }
                } catch (error) {
                    console.error(error.message)
                }                
            }
            console.log('Token is not valid...')
            setIsAuthenticated(false)
            setUserId(null)
            setUsername(null)
            setAuthToken(null)
            localStorage.removeItem('authToken')
            setIsLoading(false)
            setError(null)
        }
        checkToken()        
    }, [])

    const contextValue = {
        isAuthenticated,
        isLoading,
        error,
        userId,
        username,
        authToken,
        setAuth,
        logout,
        verifyAdmin
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }

    return context
}

export {
    AuthProvider,
    useAuth
}

