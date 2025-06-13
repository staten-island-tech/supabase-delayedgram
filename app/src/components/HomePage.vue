<template>
  <div class="flex flex-col items-center space-y-6 p-6">
    <h1 class="text-4xl font-bold text-center text-gray-800">Instabam</h1>

    <div class="flex justify-center space-x-4">
      <RouterLink to="/post">
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Post
        </button>
      </RouterLink>
      <RouterLink :to="`/profile/${userid}`" v-if="userid">
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Profile</button>
      </RouterLink>
    </div>

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

    <CardProps class="bg-[#fafafa]" v-for="user in users" :key="user.id" :user="user">
      <RouterLink :to="`/profile/${user.id}`">
        <button
          class="mt-4 px-4 py-2 bg-[#7A7C95] text-white rounded-full shadow hover:bg-[#5e6075] transition duration-200"
        >
          Click to view
        </button>
      </RouterLink>
    </CardProps>

    <button @click="handleSignOut" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
      Sign Out
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../components/lib/supabaseclient'
import type { User } from '../components/AllInterfaces'
import CardProps from '../components/CardProps.vue'
import { useRouter } from 'vue-router'

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

const router = useRouter()

const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Sign out error:', error.message)
  } else {
    router.push('/') // redirect to login page
  }
}

onMounted(async () => {
  const { data, error } = await supabase.from('users').select('*')

  if (error) {
    console.error('Error fetching info:', error.message)
  } else {
    users.value = data
    console.log(data)
    console.log('loading into home')
  }
})

const users = ref<User[]>([])
const search = defineModel<string>()
const searchInfo = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const submitSearch = async () => {
  searchInfo.value = search.value ?? ''
  loading.value = true
  error.value = null
  users.value = []
  searchInfo.value = search.value ?? ''
  if (!searchInfo.value.trim()) {
    const { data, error: fetchError } = await supabase
      .from('users')
      .select('id, username, posts, followers, following')
    if (fetchError) {
      error.value = fetchError.message
    } else {
      users.value = data as User[]
    }
    loading.value = false
    return
  }
  loading.value = true
  error.value = null
  users.value = []

  if (!searchInfo.value.trim()) return

  const { data, error: fetchError } = await supabase
    .from('users')
    .select('id, username, posts, followers, following')
    .ilike('username', `%${searchInfo.value}%`) // case-insensitive LIKE

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
  font-family: 'Cabin', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: 'wdth' 100;
}
h1 {
  font-family: 'Yeseva One', serif;
  font-weight: 400;
  font-style: normal;
}

/* const users = async () => {
  const { data, error } = await supabase.from('users').select('*').limit(1)
  if (error) {
    console.error('Connection test failed:', error.message)
  } else if (!data || data.length === 0) console.warn('No data returned')
  else {
    console.log('Supabase connected. Data:', data)
  }
} */
</style>
