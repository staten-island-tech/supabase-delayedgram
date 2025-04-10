<template>
    <div class="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 to-pink-400">
      <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h1 class="text-3xl font-semibold text-center text-gray-800 mb-6">SIGN UP</h1>
        <form class="space-y-4">
            <input
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            type="email"
            placeholder="EMAIL"
          >
            <input
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            type="text"
            pattern="[A-Za-z0-9._]+"
            placeholder="USERNAME"
          >
          <input
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
            SIGN UP
          </button>
          <nav class="items-center text-center">
            <router-link 
            to="/login" 
            class="text-center text-blue-400 hover:text-blue-500 hover:underline transition duration-200"
          >
            Have an account? Log in!
          </router-link>
        </nav>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

  </script>
  
  <style scoped></style>
  