<template>
  <div
    class="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 to-pink-400"
  >
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-6">SIGN UP</h1>
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <input
          v-model="email"
          required
          type="email"
          placeholder="EMAIL"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg ..."
        />
        <input
          v-model="username"
          required
          type="text"
          pattern="[A-Za-z0-9._]+"
          placeholder="USERNAME"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg ..."
        />
        <input
          v-model="password"
          required
          type="password"
          pattern="[A-Za-z0-9._]+"
          placeholder="PASSWORD"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg ..."
        />
        <button
          type="submit"
          class="w-full py-2 bg-blue-400 text-white font-semibold rounded-lg ..."
        >
          SIGN UP
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../components/userslist'

const auth = useAuthStore()
const email = ref('')
const username = ref('')
const password = ref('')

const handleSubmit = async () => {
  try {
    await auth.signUp(email.value, password.value, username.value)
    alert('Sign up successful!')
  } catch (error) {
    if (error instanceof Error) {
      alert('Error signing up: ' + error.message)
    } else {
      alert('Unknown error occurred.')
    }
  }
}
</script>

<style scoped></style>
