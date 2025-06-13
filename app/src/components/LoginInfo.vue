<template>
  <div
    class="min-h-screen flex justify-center items-center bg-gradient-to-r from-[#1B1F52] to-[#7A7C95]"
  >
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-6">LOGIN</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
          v-model="email"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A7C95] focus:border-transparent"
          type="text"
          pattern="[A-Za-z0-9._@]+"
          placeholder="EMAIL"
        />
        <input
          v-model="password"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A7C95] focus:border-transparent"
          type="password"
          pattern="[A-Za-z0-9._]+"
          placeholder="PASSWORD"
        />
        <button
          type="submit"
          class="w-full py-2 bg-[#1B1F52] text-white font-semibold rounded-lg hover:bg-[#494c7e] transition duration-200 block text-center"
        >
          LOGIN
        </button>
        <nav class="items-center text-center">
          <RouterLink
            to="/signup"
            class="text-center text-[#1B1F52] hover:text-[#1B1F52] hover:underline transition duration-200"
          >
            Don't have an account? Click here to sign up!
          </RouterLink>
        </nav>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../components/lib/supabaseclient'
import { useUserStore } from './userlist'

const email = ref('')
const password = ref('')
const router = useRouter()

const userStore = useUserStore()

const handleLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) {
      console.error('Login error:', error.message)
      if (error.message.includes('Invalid login credentials')) {
        alert('Incorrect email or password. Please try again.')
      } else {
        alert(`Login failed: ${error.message}`)
      }
      return
    }

    userStore.isLoggedIn = true

    const { data: usernameData, error: usernameError } = await supabase
      .from('users')
      .select('username')
      .eq('id', data.user?.id)
      .single()

    if (usernameError) {
      console.error('Error fetching username:', usernameError.message)
    }

    const email2 = data.user?.email ?? ''
    userStore.user = {
      id: data.user?.id ?? '',
      username: usernameData?.username ?? '',
      email: email2,
    }

    router.push('/home')
    showNotification('Logged in successfully.')

    email.value = ''
    password.value = ''
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error occurred.'
    alert(`Login failed: ${message}`)
  }
}

function showNotification(message: string, duration = 3000) {
  let container = document.getElementById('notification-container')
  if (!container) {
    container = document.createElement('div')
    container.id = 'notification-container'
    container.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50'
    document.body.appendChild(container)
  }

  const notification = document.createElement('div')
  notification.className = `
    bg-[#C0BFBF] text-white px-4 py-2 rounded shadow-md mb-2
    opacity-90 transition-opacity duration-300 ease-in-out
  `.trim()
  notification.textContent = message

  container.appendChild(notification)

  setTimeout(() => {
    notification.classList.add('opacity-0')
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, duration)
}
</script>
<style scoped>
form {
  font-family: 'Cabin', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: 'wdth' 100;
}
h1 {
  font-family: 'Yeseva One', serif;
  font-weight: 400;
  font-style: normal;
}
</style>
