<script setup lang="ts">
import { onMounted } from 'vue'
import { supabase } from '../supabaseclient'

onMounted(async () => {
  const { data, error } = await supabase.from('login_info').select('*').limit(1)
  if (error) {
    console.error('Connection test failed:', error.message)
  } else if (!data || data.length === 0) console.warn('No data returned')
  else {
    console.log('Supabase connected. Data:', data)
  }
})
</script>

<template>
  <main>
    <h1>Instabamies</h1>
  </main>
</template>
