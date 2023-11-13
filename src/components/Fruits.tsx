import { Fruit } from '../models'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { watchFruits } from '../firebase/db'
import { useAuth } from '../firebase/AuthContext'

function Fruits() {
  const [fruits, setFruits] = useState([] as Fruit[])
  const user = useAuth()

  useEffect(() => {
    if (user) watchFruits((data) => setFruits(data))
  }, [user])

  if (!user) {
    return (
      <div>
        <h2>No one logged in!</h2>
        <p>
          You need to <Link to="/register">register</Link> or{' '}
          <Link to="log-in">log in</Link> to use this site
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2>Your Fruits</h2>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.id}>
            <Link to={'/' + fruit.id}>{fruit.name}</Link> ( rating:{' '}
            {'⭐️'.repeat(fruit.rating)} )
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Fruits
