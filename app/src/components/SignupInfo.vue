<template>
  <div
    class="min-h-screen flex justify-center items-center bg-gradient-to-r from-[#1B1F52] to-[#7A7C95]"
  >
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-6">SIGN UP</h1>
      <form @submit.prevent="handleSignUp" class="space-y-4">
        <input
          v-model="email"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A7C95] focus:border-transparent"
          type="email"
          placeholder="EMAIL"
        />
        <input
          v-model="username"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A7C95] focus:border-transparent"
          type="text"
          pattern="[A-Za-z0-9._]+"
          placeholder="USERNAME"
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
          SIGN UP
        </button>
        <nav class="items-center text-center">
          <RouterLink
            to="/"
            class="text-center text-[#1B1F52] hover:text-[#1B1F52] hover:underline transition duration-200"
          >
            Have an account? Log in!
          </RouterLink>
        </nav>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './userlist'
import { supabase } from '../supabaseclient'

const email = ref('')
const username = ref('')
const password = ref('')

const router = useRouter()
const auth = useAuthStore()

const handleSignUp = async () => {
  try {
    await auth.signUp({
      email: email.value,
      password: password.value,
      username: username.value,
    })

    alert('Sign-up successful! 🎉')
    router.push('/home')

    email.value = ''
    username.value = ''
    password.value = ''
  } catch (err: any) {
    alert(`Sign-up failed: ${err.message}`)
    console.error('Sign-up error:', err)
  }
}
</script>
<style>
form{
  font-family: "Cabin", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings:
    "wdth" 100;
}
h1{
  font-family: "Abril Fatface", serif;
  font-weight: 400;
  font-style: normal;
}
</style>
