import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [authToken, setAuthToken] = useState(null) 
    const [userId, setUserId] = useState(null)
    const [username, setUsername] = useState(null)

    const setAuth = useCallback((token, userId, username) => {
        setIsAuthenticated(true)
        setUserId(userId)
        setUsername(username)
        setAuthToken(token)
        localStorage.setItem('authToken', token)
        setIsLoading(false)

        if (error) {
            setError(null)
        }
    }, [error])    

    const logout = useCallback(() => {
        setIsAuthenticated(false)
        setUserId(null)
        setUsername(null)
        setAuthToken(null)
        localStorage.removeItem('authToken')
        setIsLoading(false)

        if (error) {
            setError(null)
        }
    },[error])
   
    useEffect( () => {
        const checkToken = async () => {            
            const existingToken = localStorage.getItem('authToken')
            
            if(existingToken) {
                try {
                    const response = await fetch('http://localhost:3000/api/auth/verify', {
                        headers: {
                            'Content-Type': 'Application/JSON',
                            'Authorization': `Bearer ${existingToken}`
                        } 
                    })

                    if (response.status === 200) {
                        const decoded = jwtDecode(existingToken)
                        setAuth(existingToken, decoded.sub, decoded.username)
                        return
                    }
                } catch (error) {
                    console.error(error.message)
                }                
            }
            logout()
        }
        checkToken()        
    }, [setAuth, logout])

    const contextValue = {
        isAuthenticated,
        isLoading,
        error,
        userId,
        username,
        authToken,
        setAuth,
        logout
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

