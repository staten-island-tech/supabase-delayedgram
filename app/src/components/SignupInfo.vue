<template>
  <div
    class="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-800 to-gray-400"
  >
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-6">SIGN UP</h1>
      <form @submit.prevent="handleSignUp" class="space-y-4">
        <input v-model="email"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          type="email"
          placeholder="EMAIL"
        >
        <input v-model="username"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          type="text"
          pattern="[A-Za-z0-9._]+"
          placeholder="USERNAME"
        >
        <input v-model="password"
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
          <RouterLink
            to="/"
            class="text-center text-blue-800 hover:text-blue-900 hover:underline transition duration-200"
          >
            Have an account? Log in!
          </RouterLink>
        </nav>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '../supabaseclient';
// import { signIn } from '../userslist'

const username = ref('');
const email = ref('');
const password = ref('');

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const handleSignUp = async () => {                   // YES I KNOW THIS IS BAD CODE MR WHALEN
  try {
    // 1. Check if user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('login_info')
      .select('*')
      .eq('email', email.value)
      .eq('username', username.value)
      .maybeSingle();

    if (fetchError) {
      console.log("fetch error:", fetchError)
      throw fetchError;}

    if (existingUser) {
      alert("This account already exists. Please log in.");
      return;
    }

    // 2. Insert new user
    const { error: insertError } = await supabase
      .from('login_info')
      .insert([
        {
          username: username.value,
          email: email.value,
          password: password.value,
        },
      ]);

    if (insertError) {
      console.log("insertError:", insertError)
      throw insertError
    };

    alert('Sign-up successful!');
    router.push('/home');

    // Clear inputs
    username.value = '';
    email.value = '';
    password.value = '';
  } catch (err: any) {
    // Handle all errors here
    alert(`Sign-up failed: ${err.message}`);
    console.error('Error during sign-up:', err);
  }
}
</script>
