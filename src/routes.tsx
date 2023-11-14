import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom'
import { useAuth } from './firebase/AuthContext'

import Dash from './components/Dash'
import Landing from './components/Landing'
import Wishlist from './components/Wishlist'
import YourList from './components/YourList'
import Register from './components/Register'
import LogIn from './components/LogIn'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Dash />}>
      <Route index element={<AuthRoute element={<YourList />} altElement={<Landing />} />} />
      <Route path="wishlist/:id" element={<Wishlist />} />
      <Route
        path="register"
        element={<AuthRoute noUser element={<Register />} />}
      />
      <Route path="log-in" element={<AuthRoute noUser element={<LogIn />} />} />
    </Route>,
  ),
)

export default routes

// ----- ROUTE UTILS -----

interface AuthRouteProps {
  element: React.ReactNode
  altElement?: React.ReactNode
  noUser?: boolean
}

function AuthRoute({
  element,
  altElement = <Navigate to="/" replace />,
  noUser = false,
}: AuthRouteProps) {
  const user = useAuth()

  const showElem = noUser ? !user : user
  return showElem ? element : altElement
}
