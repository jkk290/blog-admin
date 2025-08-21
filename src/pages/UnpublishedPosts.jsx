import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import PostForm from '../components/PostForm'

function UnpublishedPosts() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [postFormOpen, setPostFormOpen] = useState(false)
    const { authToken } = useAuth()
    const formRef = useRef(null)

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

    useEffect(() => {
        const dialog = formRef.current
        const handleClose = () => {
            console.log('closing modal...')
            setPostFormOpen(false)
        }

        if (postFormOpen) {
            dialog?.showModal()
            dialog?.addEventListener('close', handleClose)
        } else {
            dialog?.close()            
        }
        
        return () => {
            dialog?.removeEventListener('close', handleClose)
        }
    }, [postFormOpen])

    const handlePublish = async (postId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${postId}/publish`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })

            const data = await response.json()

            if (response.ok) {
                alert('Post published')
                return
            } else {
                console.error('Failed to publish post: ', data.message)
            }
        } catch (error) {
            console.error('Failed to publish post ',error)
        }
    }

    const formClose = () => {
        setPostFormOpen(false)
    }

    return (
        <div>
            <h1>Unpublished Posts</h1>
            <button onClick={() => setPostFormOpen(true)}>New Post</button>
            {isLoading ? <h2>Loading...</h2> : null}
            {error ? <h2>{error}</h2> : null}
            <ul>
                {posts.map(post => {
                    return (
                        <li key={post.id}>
                            <Link to={`${post.id}`}>
                                <h2>{post.title}</h2>
                            </Link>
                            <button onClick={() => handlePublish(post.id)}>Publish</button>
                        </li>
                    )                    
                })}
            </ul>
            {postFormOpen ? <dialog ref={formRef}><PostForm formClose={formClose}/></dialog> : null}            
        </div>
    )
}

export default UnpublishedPosts