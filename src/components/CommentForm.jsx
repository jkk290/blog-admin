import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext'

function CommentForm({ onChange }) {
    const [textField, setTextField] = useState('')
    const { postId } = useParams()
    const { userId, username, authToken } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    authorId: userId,
                    commentText: textField
                })
            })

            const data = await response.json()

            if (response.ok) {
                data.commentAuthor = { username } 
                const newComment = data
                onChange(newComment)
            } else {
                console.error('Failed to create comment: ', data.message)
            }
        } catch (error) {
            console.error('Failed to create comment ',error)
        }
    }

    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <label htmlFor="text">Comment: </label>
                <textarea 
                    name="commentText" 
                    id="commentText" 
                    onChange={(e) => setTextField(e.target.value)}
                    value={textField}
                >
                </textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CommentForm