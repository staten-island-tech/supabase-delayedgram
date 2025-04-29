import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabaseclient'
import type { SignUpData, SignInData, AuthUser } from '@/components/AllInterfaces'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))

  const signUp = async ({ email, password, username }: SignUpData) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw new Error(`Auth sign-up failed: ${error.message}`)

    const userId = data.user?.id
    token.value = data.session?.access_token ?? null
    localStorage.setItem('token', token.value ?? '')

    if (userId) {
      const { error: profileError } = await supabase
        .from('MainUserTable')
        .insert({ id: userId, username })

      if (profileError) throw new Error(`Failed to create user profile: ${profileError.message}`)

      user.value = { id: userId, username }
    }
  }

  const signIn = async ({ email, password }: SignInData) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(`Sign-in failed: ${error.message}`)

    token.value = data.session?.access_token ?? null
    localStorage.setItem('token', token.value ?? '')

    const userId = data.user?.id
    if (userId) {
      const { data: profileData, error: profileError } = await supabase
        .from('MainUserTable')
        .select('username')
        .eq('id', userId)
        .single()

      if (profileError) throw profileError

      user.value = { id: userId, username: profileData.username }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  return { user, token, signUp, signIn }
})
