# Boilerplate

- TypeScript
- Vite
- React
- React Router
- Sass
- Firebase (Auth, Realtime DB, Hosting)

## Getting started

https://console.firebase.google.com/u/0/

To prepare the project:

```bash
  npm install
```

Running the following command will start the client running on [port 5173](http://localhost:5173).

```bash
  npm run dev
```

## Firebase

### Register your project

Within [firebase's console](https://console.firebase.google.com/u/0) create a new project (the project ID will become the temp url so keep an eye on it ;))

Register your web app and it should prompt you to include hosting (yes please) and then take you through more steps to set up your project.

### Setup

This project already has firebase npm modules, but requires the unique information for your app. After registering, the app details should be shown to you. Copy these for use in `src/firebase/index.ts`.

Make sure you have the firebase tools istalled globally:

```sh
npm install -g firebase-tools
firebase login
```

Within the main directory of your project you can then run

```sh
firebase init
```

### Customization

During the `init` prompt you want to make sure you select:

- Realtime Database
- Hosting

Realtime DB:

- We already have a `database.rules.json`, so don't need to overwrite it unless you want the default rules.

Hosting:

- Our public directory will be `dist` as it is our build output directory.
- As we have no server routes and one `index.html`, we want to configure it as a single page app

The above `init` process will create two files:

- .firebaserc
- firebase.json

### Add providers

Back in the main page for the project within the firebase console, there is a left side menu where we can add tech to our project. Under `build` select:

- Authentication
  Enable the native provider - email/password.

- Realtime Database
  Location can be left as US or changed to Asia.
  Rules can be copied from database.rules.json or left as is for now (you should change it when you know what's up though, means you can access things).

- Hosting
  Can be found in this menu too if you ever need to redo that.

## Adding modules

<details>
<summary>Auth0</summary>

## Installation

```bash
npm i -D @auth0/auth0-react
```

## Provider

Include the `Auth0Provider` in `client/index.tsx`:

```tsx
import { Auth0Provider } from '@auth0/auth0-react'

// ...

createRoot(document.getElementById('app')).render(
  <Auth0Provider
    domain="dev-kelly.au.auth0.com"
    {/* clientId="someclientidgoeshere" */}
    authorizationParams={{
      redirect_uri: window.location.origin,
      {/* audience: 'https://the-app-url/api', */}
      scope: 'openid profile email offline_access',
    }}
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    <App />
  </Auth0Provider>,
)
```

The auth0 hook can then be used in any component:

```tsx
import { useAuth0 } from '@auth0/auth0-react'

// ...

const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

// ...
```

The user object contains a unique `sub` property, essentially the user's id to auth0, which will not change and can be used to identify unique data in firebase if included.

</details>

<details>

<summary>Chakra UI</summary>

## Installation

```bash
  npm i -D @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

## Provider

In `client/index.tsx`:

```tsx
import { ChakraProvider } from '@chakra-ui/react'

// ...

createRoot(document.getElementById('app')).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
)
```

## Example components

Since chakra uses components for styling, but these come from multiple imports, we can create a file to import the components we want to use and export them from this one file. This also gives us a place to add any custom components we want to use (such as the Link below).

```tsx
import * as rrd from 'react-router-dom'
import * as chakra from '@chakra-ui/react'
import * as icons from '@chakra-ui/icons'

interface LinkProps {
  children: React.ReactNode
  to: string
  color?: string
}
export function Link({ children, to, color = 'teal.500' }: LinkProps) {
  return (
    <chakra.Link as={rrd.Link} to={to} color={color}>
      {children}
    </chakra.Link>
  )
}

export const Tile = chakra.Card
export const TileHeader = chakra.CardHeader
export const TileBody = chakra.CardBody
export const TileFooter = chakra.CardFooter

export const CheckCircle = icons.CheckCircleIcon
export const Star = icons.StarIcon
export const ChevronDown = icons.ChevronDownIcon
export const ArrowLeft = icons.ArrowLeftIcon
export const ArrowRight = icons.ArrowRightIcon
```

</details>

<details>

<summary>Redux</summary>

## Installation

```bash
  npm i -D redux react-redux
```

....more to come

</details>
