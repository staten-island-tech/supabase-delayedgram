<template>
    <div class="bg-white rounded-2xl shadow-md p-6 w-full max-w-sm text-center space-y-3 border border-[#7A7C95]/10">
      <h1 class="text-xl font-semibold text-[#7A7C95]">{{ card.username }}</h1>
      <div class="flex justify-around text-[#7A7C95]">
        <div>
          <h4 class="text-sm font-medium">Posts</h4>
          <p class="text-lg font-bold">{{ card.posts }}</p>
        </div>
        <div>
          <h4 class="text-sm font-medium">Followers</h4>
          <p class="text-lg font-bold">{{ card.followers }}</p>
        </div>
        <div>
          <h4 class="text-sm font-medium">Following</h4>
          <p class="text-lg font-bold">{{ card.following }}</p>
        </div>
      </div>
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    card: Object,
  })
  </script>
  
  <style scoped>
  h1 {
    font-family: "Yeseva One", serif;
    font-weight: 400;
    font-style: normal;
  }
  
  h4, p {
    font-family: "Cabin", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-variation-settings: "wdth" 100;
  }
  </style>
  