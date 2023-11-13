import { User } from '@firebase/auth'

export type FirebaseUser = User

// ----- FRUITS -----

export interface Fruit {
  id: string
  name: string
  rating: number
}
