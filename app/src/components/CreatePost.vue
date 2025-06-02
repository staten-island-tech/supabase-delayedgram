<template>
  <div class="p-4 space-y-4 max-w-md mx-auto">
    <h2 class="text-xl font-bold">Create a New Post</h2>

    <input type="file" @change="handleFileChange" accept="image/*" class="block w-full" />

    <textarea
      v-model="text"
      rows="3"
      placeholder="Write something..."
      class="w-full p-2 border rounded"
    ></textarea>

    <button @click="createPost" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Upload Post
    </button>

    <div v-if="file || text" class="mt-4">
      <h3 class="font-medium">Preview:</h3>
      <img v-if="previewUrl" :src="previewUrl" alt="Preview" class="w-full max-w-xs rounded" />
      <p class="mt-2 whitespace-pre-wrap">{{ text }}</p>
    </div>

    <p v-if="error" class="text-red-500">{{ error }}</p>
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
