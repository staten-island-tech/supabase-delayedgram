import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/components/lib/supabaseclient'
import type { AppUser } from '../AllInterfaces'

export const useUserStore = defineStore('user', () => {
  const user = ref<AppUser | null>(null)
  const isLoggedIn = ref(false)

  const users = async () => {
    const { data, error } = await supabase.from('users').select('*').limit(1)
    if (error) {
      console.error('Connection test failed:', error.message)
    } else if (!data || data.length === 0) {
      console.warn('No data returned')
    } else {
      console.log('Supabase connected. Data:', data)
    }
  }

  const login = (userData: AppUser): void => {
    user.value = userData
    isLoggedIn.value = true
  }

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
    isLoggedIn.value = false
  }

  const checkLoggedInStatus = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session?.user) {
      const userData: AppUser = {
        id: session.user.id,
        email: session.user.email ?? '',
        username: session.user.user_metadata.username,
      }
      login(userData)
    } else {
      await logout()
    }
  }

  const initAuthListener = (): void => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        login({
          id: session.user.id,
          email: session.user.email ?? '',
          username: session.user.user_metadata.username,
        })
      } else {
        logout()
      }
    })
  }

  return {
    user,
    isLoggedIn,
    users,
    login,
    logout,
    checkLoggedInStatus,
    initAuthListener,
  }
})



