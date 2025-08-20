import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function UnpublishedPosts() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const { authToken } = useAuth()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/posts/unpublished', {
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `Bearer ${authToken}`
                    }                    
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch posts')
                }
                const data = await response.json()
                setPosts(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPosts()
    }, [authToken])

    return (
        <div>
            <h1>Unpublished Posts</h1>
            {isLoading ? <h2>Loading...</h2> : null}
            {error ? <h2>{error}</h2> : null}
            <ul>
                {posts.map(post => {
                    return (
                        <li key={post.id}>
                            <Link to={`admin/posts/${post.id}`}>
                                <h2>{post.title}</h2>
                            </Link>
                        </li>
                    )                    
                })}
            </ul>            
        </div>
    )    

}

export default UnpublishedPosts