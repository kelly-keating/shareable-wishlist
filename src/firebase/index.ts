import { initializeApp } from '@firebase/app'
import { getAuth } from '@firebase/auth'
import { getDatabase } from '@firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCQB_tuWOjgZ7AXTOl-AZBNUpg2CW5UrWQ",
  authDomain: "prezzies4me.firebaseapp.com",
  databaseURL: "https://prezzies4me-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "prezzies4me",
  storageBucket: "prezzies4me.appspot.com",
  messagingSenderId: "937385757187",
  appId: "1:937385757187:web:8c876fa1c649c6d8f6dc36"
}
const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export const db = getDatabase(firebaseApp)
