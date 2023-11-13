import { FirebaseUser } from '../models'
import { onAuthStateChanged } from '@firebase/auth'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import auth from './auth'

type PotentialUser = FirebaseUser | null
type ContextState = { user: PotentialUser } | undefined
interface Props {
  children: ReactNode
}

const FBAuthContext = createContext(undefined as ContextState)

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState(null as PotentialUser)
  const val = { user }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser)
    return unsub
  }, [])

  return <FBAuthContext.Provider value={val}>{children}</FBAuthContext.Provider>
}

export function useAuth() {
  const context = useContext(FBAuthContext)
  if (context === undefined) {
    throw new Error('lol, you forgot your AuthProvider')
  }
  return context.user
}
