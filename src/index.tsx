import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { ChakraProvider } from '@chakra-ui/react'

import './firebase'

import { AuthProvider } from './firebase/AuthContext'
import routes from './routes'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <AuthProvider>
      <ChakraProvider>
        <RouterProvider router={routes} />
      </ChakraProvider>
    </AuthProvider>,
  )
})
