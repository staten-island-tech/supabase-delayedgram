<template>
  <div class="p-6 space-y-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg">
    <h2 class="text-2xl font-bold text-center text-[#2D2F45]">Create a New Post</h2>

    <!-- Hidden file input -->
    <input
      type="file"
      id="fileInput"
      @change="handleFileChange"
      accept="image/*"
      class="hidden"
    />

    <div v-if="file || text" class="mt-4">
      <h3 class="font-medium">Preview:</h3>
      <img v-if="previewUrl" :src="previewUrl" alt="Preview" class="w-full max-w-xs rounded" />
      <p class="mt-2 whitespace-pre-wrap">{{ text }}</p>
    </div>

    <!-- Styled label as button -->
    <label
      for="fileInput"
      class="inline-block bg-[#7A7C95] text-white text-sm font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-[#6b6d89] transition"
    >
      Choose File
    </label>

    <textarea
      v-model="text"
      rows="3"
      placeholder="Write something..."
      class="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#7A7C95] focus:outline-none"
    ></textarea>

    <p v-if="error" class="text-[#9B0B0C] text-center">{{ error }}</p>

    <button
      @click="createPost"
      class="w-full bg-[#7A7C95] text-white font-semibold py-2 rounded-full hover:bg-[#6b6d89] transition"
    >
      Upload Post
    </button>

    <RouterLink
      to="/home"
      class="block text-center bg-gray-200 text-gray-700 font-semibold py-2 rounded-full hover:bg-gray-300 transition"
    >
      Back to Home
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../supabaseclient'

const file = ref<File | null>(null)
const text = ref('')
const imageUrl = ref('')
const previewUrl = ref<string | null>(null)
const error = ref('')

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    file.value = target.files[0]
    previewUrl.value = URL.createObjectURL(file.value)
  }
}

const createPost = async () => {
  error.value = ''

  const user = (await supabase.auth.getUser()).data.user
  if (!user) {
    error.value = 'You must be signed in to post.'
    return
  }

  if (!file.value || !text.value.trim()) {
    error.value = 'Image and text are required.'
    return
  }

  const fileExt = file.value.name.split('.').pop()
  const fileName = `${user.id}_${Date.now()}.${fileExt}`

  const filePath = `images/${fileName}`

  const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file.value)

  if (uploadError) {
    error.value = `Upload failed: ${uploadError.message}`
    return
  }

  const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(filePath)
  const publicUrl = publicUrlData.publicUrl

  const { error: insertError } = await supabase.from('posts').insert({
    user_id: user.id,
    image_url: publicUrl,
    caption: text.value,
  })

  if (insertError) {
    error.value = `Database error: ${insertError.message}`
    return
  }

  imageUrl.value = publicUrl
  text.value = ''
  file.value = null
}
</script>

<style scoped>
textarea {
  resize: vertical;
}
</style>
