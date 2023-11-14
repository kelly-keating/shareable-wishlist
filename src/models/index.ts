import { User } from '@firebase/auth'

export type FirebaseUser = User

// ----- LISTS -----

export type PotentialWishlist = Wishlist | null

export interface Wishlist {
  uid: string
  items?: Record<string, ListItem>
}

export interface ListItem {
  id: string
  name: string
  tier: "common" | "uncommon" | "rare" | "epic" | "legendary"
  price?: number
  details?: string
  links?: UrlLink[]
}

interface UrlLink {
  name: string
  url: string
}

// ----- USERS -----

export interface UserData {
  displayName: string
  img: string
}
