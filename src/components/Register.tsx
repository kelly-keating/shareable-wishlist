import { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { signUp } from '../firebase/auth'

function Register() {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const email = (e.target as HTMLFormElement).email.value
    const password = (e.target as HTMLFormElement).password.value
    const confirmPassword = (e.target as HTMLFormElement)['confirm-password']
      .value
    const displayName = (e.target as HTMLFormElement)['display-name'].value

    if (password !== confirmPassword) {
      return alert("Passwords don't match. Please try again.")
    }

    try {
      await signUp(email, password, displayName)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="display-name">Display name</label>
        <input type="text" id="display-name" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" />
        <button type="submit">Register</button>
      </form>
      <p>
        Returning user? <Link to="/log-in">Log in</Link>
      </p>
    </div>
  )
}

export default Register
