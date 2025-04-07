<template>
  <div class="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-pink-500">
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-6">LOGIN</h1>
      <form class="space-y-4">
        <input
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text"
          pattern="[A-Za-z0-9._]+"
          placeholder="USERNAME"
        >
        <input
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="password"
          pattern="[A-Za-z0-9._-]+"
          placeholder="PASSWORD"
        >
        <button
          type="submit"
          class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          LOGIN
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>