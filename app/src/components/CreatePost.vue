<template>
  <div class="p-4 max-w-md mx-auto bg-white shadow rounded-lg space-y-4">
    <h2 class="text-xl font-semibold text-gray-800">Upload an Image</h2>

    <input type="file" @change="handleFileChange" accept="image/*" />

    <button
      @click="uploadImage"
      :disabled="!selectedFile || uploading"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {{ uploading ? 'Uploading...' : 'Upload Image' }}
    </button>

    <div v-if="imageUrl" class="mt-4">
      <p class="text-sm text-gray-600">Uploaded Image:</p>
      <img :src="imageUrl" alt="Uploaded" class="mt-2 rounded shadow max-w-full h-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../supabaseclient'

const selectedFile = ref<File | null>(null)
const imageUrl = ref<string | null>(null)
const uploading = ref(false)

const handleFileChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files && files.length > 0) {
    selectedFile.value = files[0]
  }
}

const uploadImage = async () => {
  if (!selectedFile.value) return

  uploading.value = true

  const file = selectedFile.value
  const filePath = `uploads/${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from('images') // Make sure this matches your bucket name
    .upload(filePath, file)

  if (error) {
    alert('Upload failed: ' + error.message)
    console.error('Upload error:', error)
    uploading.value = false
    return
  }

  const { data } = supabase.storage.from('post-images').getPublicUrl(filePath)

  imageUrl.value = data.publicUrl
  uploading.value = false
}
</script>

<style scoped></style>
