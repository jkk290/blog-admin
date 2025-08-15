import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoginForm from './LoginForm'

function NavBar() {
    const [loginFormOpen, setLoginFormOpen] = useState(false)
    const { isAuthenticated, username, logout } = useAuth()
    
    const toggleLoginForm = () => {
        setLoginFormOpen(!loginFormOpen)
    }

    const closeLoginForm = () => {
        setLoginFormOpen(false)
    }

    return (
        <div className='navBar'>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                {!isAuthenticated ? <li><button onClick={toggleLoginForm}>Login</button></li> : <li>{username} <button onClick={logout}>Logout</button></li> }
                {loginFormOpen ? <LoginForm onClose={closeLoginForm}/> : null}
                
            </ul>
        </div>
    )
}

export default NavBar