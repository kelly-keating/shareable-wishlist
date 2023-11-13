import { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { signIn } from '../firebase/auth'

function LogIn() {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const email = (e.target as HTMLFormElement).email.value
    const password = (e.target as HTMLFormElement).password.value

    try {
      await signIn(email, password)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button type="submit">Login</button>
      </form>
      <p>
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

export default LogIn
