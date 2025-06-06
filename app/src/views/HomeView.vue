<template>
  <div class="bg-[#fafafa]">
    <HomePage />
    <RouterLink to="/post">
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Create Post
      </button>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { supabase } from '../supabaseclient'
import HomePage from '../components/HomePage.vue'

// onMounted(async () => {
//   const { data, error } = await supabase.from('users').select('*').limit(1)
//   if (error) {
//     console.error('Connection test failed:', error.message)
//   } else if (!data || data.length === 0){
//     console.warn('No data returned')
//   }
//   else {
//     console.log('Supabase connected. Data:', data)
//   }
// })
</script>
