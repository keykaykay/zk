<script lang="ts" setup>
const router = useRouter()
</script>
<template>
  <div>dashboard</div>
  <div class="i-ic:round-space-dashboard text-2xl"></div>
  <a-button @click="router.push('/')">logout</a-button>
</template>
<route lang="yaml">
meta:
  title: dashboard
  order: 1
  icon: ic:round-space-dashboard
</route>
