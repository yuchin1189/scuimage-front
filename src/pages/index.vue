<template>
  <v-container fluid class="welcome-img fill-height h-100">
    <v-row>
      <v-col class="d-flex justify-center align-center mb-lg-10">
        <v-btn variant="tonal" size="large" class="bg-brown text-white">Start</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup></script>

<style scoped>
.welcome-img {
  background: center / cover url('../assets/scuimage_banner.jpg'); /* 替換成你的背景圖片網址 */
}
</style>

<route lang="json">
{
  "meta": {
    "login": false,
    "admin": false,
    "title": "nav.home"
  }
}
</route>
