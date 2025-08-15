import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function PostPage() {
    const { postId } = useParams();

    const [post, setPost] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {                
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
                console.log('Got response', response)
                
                if (response.status === 404) {
                    setError('Post not found')
                    setIsLoading(false)
                    return
                }
                if (!response.ok) {
                    throw new Error('Failed to fetch post')
                }

                const data = await response.json();
                setPost(data);
            }
            catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false);
            }
        }  

        fetchPost()
    }, [postId])

    if (isLoading) {
        return (<h1>Loading...</h1>)
    }

    if (error) {
        console.log(error)
        return (<h1>{error}</h1>)
    }

    return (
        <>
            <div>
                <h1>{post.title}</h1>
                <p>{post.text}</p>
            </div>
            <div>
                <h2>Post comments</h2>
            </div>
        </>
        
    )
}

export default PostPage