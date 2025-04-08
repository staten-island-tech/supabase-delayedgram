<template>
  <div class="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 to-pink-400">
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-6">LOGIN</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
          v-model="username"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          type="text"
          pattern="[A-Za-z0-9._]+"
          placeholder="USERNAME"
        >
        <input
          v-model="password"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          type="password"
          pattern="[A-Za-z0-9._]+"
          placeholder="PASSWORD"
        >
        <button
          type="submit"
          class="w-full py-2 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-200 block text-center"
        >
          LOGIN
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { users } from './userslist'; // Import the users array from another file

// Define refs for username and password
const username = ref('');
const password = ref('');

// Access the router instance for programmatic navigation
const router = useRouter();

// Handle form submission and navigation
const handleLogin = () => {
  interface User {
    id: number;
    username: string;
    password: string;
  }
  const users: User[] = [
  { id: 1, username: 'john_doe', password: 'password123' },
  { id: 2, username: 'jane_doe', password: 'securepass456' },
  // Add more users as needed
];
  const user = users.find((u: User) => u.username === username.value);
  console.log(users)
  if (!user) {
    alert("This isn't an existing account. Try signing up.");
    return;
  }

  // Then, check if the password matches the existing user's password
  if (user.password !== password.value) {
    // If password doesn't match, alert
    alert('Incorrect password. Please try again.');
    return;
  }

  // If both checks pass, navigate to HomeView
  router.push('/home');
};
</script>

<style scoped></style>