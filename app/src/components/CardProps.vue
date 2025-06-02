<template>
    <div class="card">
        <h1 class="user">{{ card.user }}</h1>
        <h4 class="posts">{{ card.posts }}</h4>
        <h4 class="followers">{{ card.followers }}</h4>
        <h4 class="following">{{  card.following }}</h4>
    </div>
</template>

<script setup>
defineProps({
    card: Object,
})
</script>

<style scoped>

</style>