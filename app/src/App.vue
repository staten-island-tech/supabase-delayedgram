<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.unpleasant-gradient {
  background: linear-gradient(95deg, rgb(34, 216, 36), rgb(252, 51, 242), rgb(160, 82, 6));
}
</style>
