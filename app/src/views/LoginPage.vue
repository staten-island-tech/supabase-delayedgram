<template>
  <div>
    <LoginInfo />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { supabase } from '../components/lib/supabaseclient'
import LoginInfo from '../components/LoginInfo.vue'

onMounted(async () => {
  const { data, error } = await supabase.from('users').select('*').limit(1)
  if (error) {
    console.error('Connection test failed:', error.message)
  } else if (!data || data.length === 0){
    console.warn('No data returned')
  }
  else {
    console.log('Supabase connected. Data:', data)
  }
})
</script>

<style scoped></style>
