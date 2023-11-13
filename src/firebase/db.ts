import { Fruit } from '../models'
import { v4 as uuid } from 'uuid'

import { get, onValue, ref, set } from '@firebase/database'
import { getUser } from './auth'
import { db } from './index'

// ----- UTILS -----

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function watchData(path: string, cb: (data: any) => void) {
  const { uid } = getUser()
  if (!uid) return
  const theRef = ref(db, `users/${uid}/${path}`)
  onValue(theRef, (snapshot) => cb(snapshot.val() || []))
}

function getDataOnce(path: string) {
  const { uid } = getUser()
  if (!uid) return Promise.resolve([])
  return get(ref(db, `users/${uid}/${path}`)).then((snapshot) =>
    !snapshot.exists() ? [] : snapshot.val(),
  )
}

function setData(path: string, data: Fruit[]) {
  const { uid } = getUser()
  if (!uid) return Promise.resolve()
  return set(ref(db, `users/${uid}/${path}`), data)
}

// ----- FUNCTIONS -----

export function watchFruits(cb: (fruits: Fruit[]) => void): void {
  watchData('fruits', cb)
}

export async function getOneFruit(id: string): Promise<Fruit | undefined> {
  const fruits = (await getDataOnce('fruits')) as Fruit[]
  return fruits.find((fruit: Fruit) => fruit.id === id)
}

export async function createNewFruit(
  newFruitInfo: Omit<Fruit, 'id'>,
): Promise<Fruit> {
  const currentFruits = (await getDataOnce('fruits')) as Fruit[]

  const newId = uuid()
  const newFruitWithId = { ...newFruitInfo, id: newId }
  const newFruits = [...currentFruits, newFruitWithId]

  return setData('fruits', newFruits).then(() => newFruitWithId)
}

export async function deleteFruit(id: string): Promise<void> {
  const currentFruits = (await getDataOnce('fruits')) as Fruit[]

  const newFruits = currentFruits.filter((fruit: Fruit) => fruit.id !== id)

  return setData('fruits', newFruits)
}

export async function updateFruit(
  id: string,
  newRating: number,
): Promise<Fruit> {
  const currentFruits = (await getDataOnce('fruits')) as Fruit[]

  const newFruits = currentFruits.map((fruit: Fruit) => {
    if (fruit.id === id) fruit.rating = newRating
    return fruit
  })

  return setData('fruits', newFruits).then(
    () => getOneFruit(id) as unknown as Fruit,
  )
}
