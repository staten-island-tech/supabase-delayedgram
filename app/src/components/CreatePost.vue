<template>
  <div class="p-6 space-y-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg">
    <h2 class="text-2xl font-bold text-center text-[#2D2F45]">Create a New Post</h2>

    <input type="file" id="fileInput" @change="handleFileChange" accept="image/*" class="hidden" />

    <div v-if="file || text" class="mt-4">
      <h3 class="font-medium">Preview:</h3>
      <img v-if="previewUrl" :src="previewUrl" alt="Preview" class="w-full max-w-xs rounded" />
      <p class="mt-2 whitespace-pre-wrap">{{ text }}</p>
    </div>

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
import { supabase } from '../components/lib/supabaseclient'

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

  const { data: authData, error: authError } = await supabase.auth.getUser()
  const user = authData?.user
  if (!user) {
    console.error('Auth error:', authError)
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
    console.error('Upload error:', uploadError)
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
    console.error('Insert post error:', insertError)
    error.value = `Database error: ${insertError.message}`
    return
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('posts')
    .eq('id', user.id)
    .single()

  if (userError || !userData) {
    console.error('User fetch error:', userError)
    console.error('User data:', userData)
    error.value = `Failed to fetch current post count: ${userError?.message}`
    return
  }

  imageUrl.value = publicUrl
  text.value = ''
  file.value = null
  previewUrl.value = null

  showNotification('Post created successfully!')
}

function showNotification(message: string, duration = 3000) {
  let container = document.getElementById('notification-container')
  if (!container) {
    container = document.createElement('div')
    container.id = 'notification-container'
    container.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50'
    document.body.appendChild(container)
  }

  const notification = document.createElement('div')
  notification.className = `
    bg-[#C0BFBF] text-white px-4 py-2 rounded shadow-md mb-2
    opacity-90 transition-opacity duration-300 ease-in-out
  `.trim()
  notification.textContent = message

  container.appendChild(notification)

  setTimeout(() => {
    notification.classList.add('opacity-0')
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, duration)
}
</script>

<style scoped>
textarea {
  resize: vertical;
}
</style>
