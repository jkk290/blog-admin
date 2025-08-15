import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null) 
    const [userId, setUserId] = useState(null)

    const setAuth = (token, userId) => {
        setIsAuthenticated(true)
        setUserId(userId)
        localStorage.setItem('authToken', token)
        setIsLoading(false)

        if (error) {
            setError(null)
        }
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUserId(null)
        localStorage.removeItem('authToken')

        if (error) {
            setError(null)
        }
    }

    const contextValue = {
        isAuthenticated,
        isLoading,
        error,
        userId,
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

