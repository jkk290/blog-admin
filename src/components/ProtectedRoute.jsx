import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import NavBar from './NavBar'

function ProtectedRoute( { element } ) {
    const navigate = useNavigate()
    const { isAuthenticated, isLoading } = useAuth()

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/')
        }        
    }, [isAuthenticated, navigate])

    console.log('Are you authenticated?', isAuthenticated)

    if (isAuthenticated === null || isLoading) {
        return <h1>Checking authorization...</h1>
    }

    if (isAuthenticated === false) {        
        return null
    }    
   
    return (
        <>
        <NavBar />
        { element }
        </>        
    )
}

export default ProtectedRoute