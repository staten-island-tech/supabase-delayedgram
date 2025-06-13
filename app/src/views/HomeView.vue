<template>
  <div class="bg-[#fafafa]">
    <RouterLink to="/post">
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Create Post
      </button>
    </RouterLink>
    <RouterLink :to="`/profile/${userid}`" v-if="userid">
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Profile</button>
    </RouterLink>
    <HomePage />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { supabase } from '../components/lib/supabaseclient'
import HomePage from '../components/HomePage.vue'
import { ref } from 'vue'

const userid = ref<string | null>(null)

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error fetching user:', error.message)
    return
  }
  userid.value = data.user.id
  console.log(userid.value)
})
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
<style></style>
