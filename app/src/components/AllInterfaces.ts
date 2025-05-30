export interface User {
  id: string
  username: string
  email?: string
  password?: string
}

export interface SignUpData {
  email: string
  password: string
  username: string
}

export interface SignInData {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  username: string
}

export interface FUser {
  id: string
  username: string
  followers: number
  following: number
}
