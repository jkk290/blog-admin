import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Comments from '../components/Comments';

function PostPage() {
    const { postId } = useParams();

    const [post, setPost] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {                
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${postId}`)
                
                if (response.status === 404) {
                    setError('Post not found')
                    setIsLoading(false)
                    return
                }
                if (!response.ok) {
                    throw new Error('Failed to fetch post')
                }

                const data = await response.json()
                setPost(data)
            }
            catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }  

        fetchPost()
    }, [postId])

    if (isLoading) {
        return (
            <div>
                <Link to={'/'}>Back</Link>
                <h1>Loading...</h1>
            </div>            
        )
    }

    if (error) {
        return (
            <div>
                <Link to={'/'}>Back</Link>
                <h1>{error}</h1>
            </div>
        )
    }

    return (
        <>
            <div>
                <Link to={'/'}>Back</Link>
                <h1>{post.title}</h1>
                <p>{post.text}</p>             
            </div>
            <div>
                <Comments postId={postId}/>
            </div>
        </>
        
    )
}

export default PostPage