<template>
    <div class="flex flex-col items-center space-y-6 p-6">
      <h1 class="text-4xl font-bold text-center text-gray-800">Instabam</h1>
      <div class="w-full max-w-md">
        <input
          type="text"
          v-model="search"
          @keyup.enter="submitSearch"
          class="w-full px-6 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7A7C95] focus:border-transparent transition duration-200"
          pattern="[A-Za-z0-9._@]+"
          placeholder="Search for more posts, users, etc."
        />
      </div>
      <CardProps class="bg-[#e1e1e7]" v-for="user in users" :key="user.id" :card="user">
        <button class="mt-4 px-4 py-2 bg-[#7A7C95] text-white rounded-full shadow hover:bg-[#5e6075] transition duration-200">Click to view</button>
      </CardProps>
    </div>
</template>
  
<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { supabase } from '../supabaseclient'
  import type { User } from '../components/AllInterfaces'
  import CardProps from '../components/CardProps.vue'

  const users = ref<User[]>([])

  onMounted(async () => {
    const { data, error } = await supabase
    .from('users')
    .select('*')

    if (error) {
      console.error('Error fetching info:', error.message)
    } else {
      users.value = data
    }
  })

  const search = defineModel<string>()
  const searchInfo = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)

  const submitSearch = async () => {
    searchInfo.value = search.value ?? ''
    loading.value = true
    error.value = null
    users.value = []

    if (!searchInfo.value.trim()) return

    const { data, error: fetchError } = await supabase
      .from('users')
      .select('id, username')
      .ilike('username', `%${searchInfo.value}%`)  // case-insensitive LIKE

    if (fetchError) {
      error.value = fetchError.message
    } else {
      users.value = data as User[]
    }

    loading.value = false
}

</script>
<style scoped>
  form {
    font-family: "Cabin", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-variation-settings: "wdth" 100;
  }
  h1 {
    font-family: "Yeseva One", serif;
    font-weight: 400;
    font-style: normal;
  }
</style>
  