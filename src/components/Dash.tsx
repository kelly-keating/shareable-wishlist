import { Link, Outlet } from 'react-router-dom'

import { signOut } from '../firebase/auth'
import { useAuth } from '../firebase/AuthContext'

function Dash() {
  const user = useAuth()

  const removeUser = () => {
    signOut()
  }

  return (
    <>
      <header>
        <h1>Fruits!</h1>
        {user && <p>Welcome {user.displayName}</p>}
        <nav>
          <Link to="/">Home</Link>
          {' | '}
          <Link to="/add">Add a fruit</Link>
          {!user && (
            <>
              {' | '}
              <Link to="/log-in">Log in</Link>
            </>
          )}
        </nav>
        {user && <button onClick={removeUser}>Log out</button>}
      </header>

      <Outlet />
    </>
  )
}

export default Dash
