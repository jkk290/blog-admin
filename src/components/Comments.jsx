import { useEffect, useState } from "react"

function Comments({ postId }) {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`)

                if (response.status === 404) {
                    setError('No Comments')
                    setIsLoading(false)
                    return
                }
                if (!response.ok) {
                    throw new Error('Failed to fetch comments')
                }
                const data = await response.json()
                setComments(data)

            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchComments()
    }, [postId])

    if (isLoading) {
        return <h1>Loading comments...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div>
            <h2>Comments</h2>
            <button>Add comment</button>
            <ul>
                {comments.map(comment => {
                    return (
                        <li key={comment.id}>
                            <p>{comment.text}</p>
                            <p>{comment.commentAuthor.username}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Comments