<template>
  <div
    class="bg-[#fafafa] rounded-2xl shadow-md p-6 w-full max-w-sm text-center space-y-3 border border-[#7A7C95]/10"
  >
    <h1 class="text-xl font-semibold text-[#7A7C95]">{{ user.username }}</h1>
    <div class="flex justify-around text-[#7A7C95]">
      <div>
        <h4 class="text-sm font-medium">Posts</h4>
        <p class="text-lg font-bold">{{ user.posts }}</p>
      </div>
      <div>
        <h4 class="text-sm font-medium">Followers</h4>
        <p class="text-lg font-bold">{{ user.followers }}</p>
      </div>
      <div>
        <h4 class="text-sm font-medium">Following</h4>
        <p class="text-lg font-bold">{{ user.following }}</p>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  user: {
    id: string
    username: string
    posts: number
    followers: number
    following: number
  }
}>()
</script>

<style scoped>
h1 {
  font-family: 'Yeseva One', serif;
  font-weight: 400;
  font-style: normal;
}

h4,
p {
  font-family: 'Cabin', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: 'wdth' 100;
}
</style>
