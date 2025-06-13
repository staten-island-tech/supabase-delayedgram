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
    <div v-if="posts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center items-center">
      <PostsInfo class="items-center text-center"></PostsInfo>
    </div>
    <div v-else class="text-center text-gray-500">No posts yet.</div>

    <RouterLink
      to="/home"
      class="block text-center bg-gray-200 text-gray-700 font-semibold py-2 rounded-full hover:bg-gray-300 transition m-5"
    >
      Back to Home
    </RouterLink>

    <p v-if="error" class="text-[#9B0B0C] mt-4 text-center">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../components/lib/supabaseclient'
import type { post } from '../components/AllInterfaces'
import { useRoute } from 'vue-router'
import PostsInfo from '@/components/PostsInfo.vue'

const route = useRoute()
const profile = ref<any>(null)
const posts = ref<post[]>([])
const error = ref<string | null>(null)

onMounted(async () => {
  const profileId = route.params.id as string

  const { data: userdata, error: userError } = await supabase
    .from('users')
    .select('username, posts, followers, following')
    .eq('id', profileId)
    .maybeSingle()

  if (userError || !userdata) {
    error.value = 'Failed to load profile.'
    return
  }

  profile.value = userdata

  const { data: postdata, error: posterror } = await supabase
    .from('posts')
    .select('image_url, caption, created_at')
    .eq('user_id', profileId)
    .order('created_at', { ascending: false })
  console.log(postdata)
  if (posterror) {
    error.value = 'Failed to load posts.'
    return
  }

  posts.value = postdata ?? []
})
</script>
