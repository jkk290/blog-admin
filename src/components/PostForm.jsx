import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

function PostForm({ formClose }) {    
    const [titleField, setTitleField] = useState('')
    const [textField, setTextField] = useState('')
    const [error, setError] = useState(null)
    const { authToken, userId } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/api/posts', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    postTitle: titleField,
                    postText: textField,
                    authorId: userId
                })
            })

            const data = response.json()

            if (response.ok) {
                formClose()
                alert('Post created successfully')
            } else {
                setError(data.message)
            }

        } catch (error) {
            setError(error)
        }
    }

    return (
        <div>
            <h1>Add New Post</h1>
            {error ? <h2>{error}</h2> : null}
            <form method='post' onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title: </label>
                <input 
                type="text" 
                name='postTitle' 
                value={titleField}
                onChange={(e) => setTitleField(e.target.value)}
                />
                <br />
                <label htmlFor="postText">Text: </label>
                <textarea 
                name="postText" 
                id="postText"
                value={textField}
                onChange={(e) => setTextField(e.target.value)}
                ></textarea>
                <br />
                <button type='submit'>Submit</button><button onClick={formClose}>Cancel</button>
            </form>
        </div>
    )
}

export default PostForm