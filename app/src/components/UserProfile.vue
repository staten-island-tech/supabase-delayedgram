<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-xl shadow space-y-6 text-center">
    <h1 class="text-2xl font-bold text-[#2D2F45]">@{{ username }}</h1>

    <div class="flex justify-around text-[#1B1F52] font-semibold">
      <div>
        <p class="text-lg">{{ postCount }}</p>
        <p class="text-sm text-gray-500">Posts</p>
      </div>
      <div>
        <p class="text-lg">{{ followerCount }}</p>
        <p class="text-sm text-gray-500">followers</p>
      </div>
      <div>
        <p class="text-lg">{{ followingCount }}</p>
        <p class="text-sm text-gray-500">following</p>
      </div>
    </div>

    <button
      v-if="!isCurrentUser"
      @click="togglefollow"
      class="px-4 py-2 bg-[#7A7C95] text-white rounded-full hover:bg-[#5e6075] transition"
    >
      {{ isfollowing ? 'Unfollow' : 'follow' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../components/lib/supabaseclient'

const route = useRoute()
const profileuserid = route.params.id as string

const username = ref('')
const postCount = ref(0)
const followerCount = ref(0)
const followingCount = ref(0)
const isfollowing = ref(false)
const isCurrentUser = ref(false)

onMounted(async () => {
  const { data: authdata } = await supabase.auth.getUser()
  const currentuserid = authdata.user?.id ?? ''
  isCurrentUser.value = currentuserid === profileuserid

  const { data: userdata } = await supabase
    .from('users')
    .select('username')
    .eq('id', profileuserid)
    .single()
  username.value = userdata?.username || 'Unknown'

  const { count: posttotal } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', profileuserid)
  postCount.value = posttotal || 0

  const { count: followertotal } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('following_id', profileuserid)
  followerCount.value = followertotal || 0

  const { count: followingtotal } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('follower_id', profileuserid)
  followingCount.value = followingtotal || 0

  if (!isCurrentUser.value) {
    const { count } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('follower_id', currentuserid)
      .eq('following_id', profileuserid)
    isfollowing.value = (count ?? 0) > 0
  }
})

const togglefollow = async () => {
  const { data: authdata } = await supabase.auth.getUser()
  const currentuserid = authdata.user?.id
  if (!currentuserid) return

  if (isfollowing.value) {
    await supabase
      .from('follows')
      .delete()
      .eq('follower_id', currentuserid)
      .eq('following_id', profileuserid)
    followerCount.value -= 1
  } else {
    await supabase
      .from('follows')
      .insert({ follower_id: currentuserid, following_id: profileuserid })
    followerCount.value += 1
  }

  isfollowing.value = !isfollowing.value
}
</script>

<style scoped>
button {
  font-family: 'Cabin', sans-serif;
}
</style>
