import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function PostEditor() {
    const [post, setPost] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [titleField, setTitleField] = useState('')
    const [textField, setTextField] = useState('')
    const { postId } = useParams()
    const { authToken } = useAuth()

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
                setTitleField(data.title)
                setTextField(data.text)
            }
            catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }  

        fetchPost()
    }, [postId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    postTitle: titleField,
                    postText: textField
                })
            })

            const data = await response.json()

            if (response.ok) {
                alert('Post saved')
                return
            } else {
                console.error('Failed to update post: ', data.message)
            }
        } catch (error) {
            console.error('Failed to update post ',error)
        }
    }

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>            
        )
    }

    if (error) {
        return (
            <div>
                <h1>{error}</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Post Editor</h1>
            <form method='put' onSubmit={handleSubmit}>
                <label htmlFor="titleField">Title: </label>
                <input 
                type="text" 
                name='titleField' 
                value={titleField}
                onChange={(e) => setTitleField(e.target.value)}
                />
                <br />
                <label htmlFor="textField">Text: </label>
                <textarea 
                name="textField" 
                id="TextField"
                onChange={(e) => setTextField(e.target.value)}
                value={textField}
                ></textarea>
                <br />
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default PostEditor