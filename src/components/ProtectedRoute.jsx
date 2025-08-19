import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import NavBar from './NavBar'

function ProtectedRoute( { element } ) {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/')
        }        
    }, [isAuthenticated, navigate])

    if (!isAuthenticated) {        
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