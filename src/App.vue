<template>
  <v-app>
    <router-view :key="$route.fullPath" />
  </v-app>
</template>

<script setup>
// 載入 app 時清空瀏覽器 console
console.clear
</script>
