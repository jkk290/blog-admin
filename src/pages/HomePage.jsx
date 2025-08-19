import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function HomePage() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        navigate('/')
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true)
                const response = await fetch('http://localhost:3000/api/posts')

                if (!response.ok) {
                    throw new Error('Failed to fetch posts')
                }

                const data = await response.json()
                setPosts(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPosts()
    }, [])

    return (
        <div>
            <h1>Homepage - All Posts</h1>
            { isLoading ? <h2>Loading...</h2> : null}
            { error ? <h2>Error: {error}</h2> : null}
            <ul>
                {posts.map(post => {
                    return (
                        <li key={post.id}>
                            <Link to={`/posts/${post.id}`}>
                                <h2>{post.title}</h2>
                            </Link>
                            <p>Author: {post.postAuthor.username}</p>
                        </li>
                    )                    
                })}
            </ul>
        </div>
    )
}

export default HomePage