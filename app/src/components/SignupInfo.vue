<template>
  <div
    class="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-800 to-gray-400"
  >
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-6">SIGN UP</h1>
      <form class="space-y-4">
        <input
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          type="email"
          placeholder="EMAIL"
        />
        <input
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          type="text"
          pattern="[A-Za-z0-9._]+"
          placeholder="USERNAME"
        />
        <input
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          type="password"
          pattern="[A-Za-z0-9._]+"
          placeholder="PASSWORD"
        />
        <button
          type="submit"
          class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 block text-center"
        >
          SIGN UP
        </button>
        <nav class="items-center text-center">
          <router-link
            to="/"
            class="text-center text-blue-800 hover:text-blue-900 hover:underline transition duration-200"
          >
            Have an account? Log in!
          </router-link>
        </nav>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../supabaseclient' // Import Supabase client
import { users } from '../components/userslist'

// Define refs for form data
const username = ref('')
const email = ref('')
const password = ref('')

// Handle form submission and store data in Supabase
const handleSignUp = async () => {
  // Insert the data into the 'users' table
  const { data, error } = await supabase
    .from('users') // Table name
    .insert([{ username: username.value, email: email.value, password: password.value }])
  console.log(users)

  if (error) {
    alert(`Error: ${error.message}`)
  } else {
    alert('User signed up successfully!')
    // Optionally, redirect or clear the form here
    username.value = ''
    email.value = ''
    password.value = ''
  }
}
</script>
