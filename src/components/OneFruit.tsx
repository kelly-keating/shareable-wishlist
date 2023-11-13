import { Fruit } from '../models'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { deleteFruit, getOneFruit, updateFruit } from '../firebase/db'

function OneFruit() {
  const { id } = useParams() as { id: string }
  const goTo = useNavigate()

  const [fruit, setFruit] = useState(null as Fruit | null)

  useEffect(() => {
    getOneFruit(id)
      .then((data) => (data ? setFruit(data) : goTo('/')))
      .catch((err) => console.error(err))
  }, [id, goTo])

  const upYum = () => id && fruit && changeRating(id, fruit.rating + 1)
  const downYum = () => id && fruit && changeRating(id, fruit.rating - 1)

  const changeRating = (id: string, rating: number) => {
    updateFruit(id, rating)
      .then((data) => setFruit(data))
      .catch((err) => console.error(err))
  }

  const handleDelete = () => {
    if (confirm('Are you sure?')) {
      deleteFruit(id)
        .then(() => goTo('/'))
        .catch((err) => console.error(err))
    }
  }

  return (
    <div>
      <h2>{fruit ? fruit.name : '...loading'}</h2>
      {fruit && (
        <>
          <p>Current deliciousness rating: {fruit.rating}</p>
          <button onClick={upYum}>Yum!</button>
          <button onClick={downYum}>Ew!</button>
          <button onClick={handleDelete}>
            Delete this fruit from existence
          </button>
        </>
      )}
    </div>
  )
}

export default OneFruit
