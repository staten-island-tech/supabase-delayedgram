export interface User {
  id: string
  username: string
  email?: string
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
  email: string | null
  username: string | null
}
export interface AuthState {
  isAuthenticated: boolean
}
export interface AppUser {
  id: string
  email: string
  username: string
}
export interface post {
  caption: string
  image_url: string
  created_at: string
}