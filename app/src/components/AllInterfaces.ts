export interface User {
  id: number
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
