export interface User {
  id: string
  username: string
  email?: string
  password?: string
  posts: number
  followers: number
  following: number
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
export interface AuthState {
  isAuthenticated: boolean
}
