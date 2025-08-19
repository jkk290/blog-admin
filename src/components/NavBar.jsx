import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function NavBar() {
    const { username, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className='navBar'>
            <ul>
                <li><Link to={'/admin'}>Home</Link></li>
                <li>{username} <button onClick={handleLogout}>Logout</button></li>                
            </ul>
        </div>
    )
}

export default NavBar