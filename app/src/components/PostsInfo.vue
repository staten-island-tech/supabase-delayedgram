<template>
    <div class="bg-[#fafafa] min-h-screen py-8 px-4">
      <div class="max-w-2xl mx-auto space-y-6">
        <PostsProps
          v-for="post in posts"
          :key="post.id"
          :post="post"
          class="bg-white rounded-2xl shadow-md p-4"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import PostsProps from './PostsProps.vue';
  import { supabase } from './lib/supabaseclient';
  import { onMounted, ref } from 'vue';
  import type post from '../components/AllInterfaces';
  
  const posts = ref<post[]>([]);
  
  async function takeposts() {
    const { data, error } = await supabase.from("posts").select("*");
    if (error) {
      console.error('Error fetching info:', error.message);
    } else {
      posts.value = data;
      console.log(data);
      console.log('loading into home');
    }
  }
  
  onMounted(takeposts);
  console.log(posts)
  </script>
  
  <style scoped>
  </style>
  