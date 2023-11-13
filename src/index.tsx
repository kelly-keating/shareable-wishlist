import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import './firebase'

import { AuthProvider } from './firebase/AuthContext'
import routes from './routes'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>,
  )
})
