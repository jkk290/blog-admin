import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import NavBar from './NavBar'

function ProtectedRoute( { element } ) {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        navigate('/')
        return
    }
    
    <NavBar />
    return element
}

export default ProtectedRoute