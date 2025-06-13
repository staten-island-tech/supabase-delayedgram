<template>
    <div
      class="bg-[#fafafa] rounded-2xl shadow-md p-6 w-full max-w-sm text-center space-y-3 border border-[#7A7C95]/10">
      <div>
        <img :src="post.imageURL" alt="">
      </div>
      <div>
        <h4>{{ post.caption }}</h4>
      </div>
      <slot></slot>
    </div>
  </template>
  
  <script setup lang="ts">

defineProps<{
    post: {
      id: string
      imageURL: string
      caption: string
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