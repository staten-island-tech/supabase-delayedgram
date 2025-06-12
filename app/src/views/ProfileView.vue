<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-6">Profile View</h2>

    <!-- Profile Stats -->
    <div v-if="profile" class="mb-8 text-center space-y-2">
      <h3 class="text-xl font-semibold text-[#2D2F45]">{{ profile.username }}</h3>
      <p>Posts: {{ profile.posts }}</p>
      <p>Followers: {{ profile.followers }}</p>
      <p>Following: {{ profile.following }}</p>
    </div>

    <!-- Posts Section -->
    <div v-if="posts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div v-for="(post, index) in posts" :key="index" class="bg-white rounded-lg shadow p-4">
        <img :src="post.image_url" alt="Post image" class="rounded w-full mb-2" />
        <p class="text-gray-700">{{ post.caption }}</p>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">No posts yet.</div>

    <RouterLink to="/home" class="block text-center bg-gray-200 text-gray-700 font-semibold py-2 rounded-full hover:bg-gray-300 transition m-5">
      Back to Home
    </RouterLink>

    <p v-if="error" class="text-[#9B0B0C] mt-4 text-center">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../components/lib/supabaseclient'
import type { Posts } from '../components/AllInterfaces'

const profile = ref<any>(null)
const posts = ref<Posts [] | null>([])
const error = ref<string | null>(null)

onMounted(async () => {
  const { data: authdata } = await supabase.auth.getUser()
  const user = authdata?.user
  if (!user) {
    error.value = 'You must be logged in to view your profile.'
    return
  }

  const { data: userdata, error: userError } = await supabase
    .from('users')
    .select('username, posts, followers, following')
    .eq('id', user.id)
    .maybeSingle()

  if (userError || !userdata) {
    error.value = 'Failed to load profile.'
    console.error('Profile error:', userError)
    return
  }

  profile.value = userdata

  const { data: postdata, error: posterror } = await supabase
    .from('posts')
    .select('image_url, caption')
    .eq('user_id', user.id)
    .order('created_at'/* , { ascending: false } */)
  console.log(postdata)
  if (posterror) {
    error.value = 'Failed to load posts.'
    console.error('Post fetch error:', posterror)
    return
  }

  posts.value = postdata || []
})
</script>
