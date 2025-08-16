import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Signup() {
    const [firstNameField, setFirstNameField] = useState('')
    const [lastNameField, setLastNameField] = useState('')
    const [usernameField, setUsernameField] = useState('')
    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')
    const [confirmPasswordField, setConfirmPasswordField] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstNameField,
                    lastName: lastNameField,
                    username: usernameField,
                    email: emailField,
                    password: passwordField,
                    confirmPassword: confirmPasswordField
                })
            })
            const data = await response.json()
            console.log(data)
            navigate('/')
        } catch (error) {
            console.error(error.message)
        }
    }
     
    return (
        <div>
            <form method='post' onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name: </label>
                <input 
                    type="text" 
                    name='firstName' 
                    id='firstName'
                    value={firstNameField}
                    onChange={(e) => setFirstNameField(e.target.value)}
                />
                <br />
                <label htmlFor="lastName">Last Name (optional): </label>
                <input 
                    type="text" 
                    name='lastName' 
                    id='lastName'
                    value={lastNameField}
                    onChange={(e) => setLastNameField(e.target.value)}
                />
                <br />
                <label htmlFor="username">Username: </label>
                <input 
                    type="text" 
                    name='username' 
                    id='username'
                    value={usernameField}
                    onChange={(e) => setUsernameField(e.target.value)}
                />
                <br />
                <label htmlFor="email">Email (optional): </label>
                <input 
                    type="email" 
                    name='email' 
                    id='email'
                    value={emailField}
                    onChange={(e) => setEmailField(e.target.value)}
                />
                <br />
                <label htmlFor="password">Password: </label>
                <input 
                    type="password" 
                    name='password' 
                    id='password' 
                    value={passwordField}
                    onChange={(e) => setPasswordField(e.target.value)}
                />
                <br />
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input 
                    type="password" 
                    name='confirmPassword' 
                    id='confirmPassword'
                    value={confirmPasswordField}
                    onChange={(e) => setConfirmPasswordField(e.target.value)}
                />
                <br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Signup