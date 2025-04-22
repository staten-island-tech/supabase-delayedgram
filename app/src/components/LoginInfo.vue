<template>
  <div
    class="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-800 to-gray-400"
  >
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-6">LOGIN</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
          v-model="usernameOrEmail"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          type="text"
          pattern="[A-Za-z0-9._@]+"
          placeholder="USERNAME/EMAIL"
        />
        <input
          v-model="password"
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
          LOGIN
        </button>
        <nav class="items-center text-center">
          <RouterLink
            to="/signup"
            class="text-blue-800 hover:text-blue-900 hover:underline transition duration-200"
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
import { useAuthStore } from '../components/userslist'
// Define refs for username/email and password
const usernameOrEmail = ref('')
const password = ref('')

// Access the router instance for programmatic navigation
const router = useRouter();
interface User {
    id: number;
    username: string;
    email: string;
    password: string;
  }
const users: User[] = [];
// Handle form submission and navigation
const handleLogin = () => {
  // Find the user by username or email
  const user = users.find(
    (u: User) => usernameOrEmail.value === u.username || usernameOrEmail.value === u.email
  );

  if (!user) {
    alert("This isn't an existing account. Try signing up.")
    return
  }

  // Then, check if the password matches the existing user's password
  if (user.password !== password.value) {
    alert('Incorrect password. Please try again.')
    return
  }

  // If both checks pass, navigate to HomeView
  router.push('/home')
}

</script>

<style scoped></style>
