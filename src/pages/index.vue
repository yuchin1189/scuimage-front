<template>
  <v-container fluid class="fill-height h-100 pa-0" min-height="100vh">
    <v-row class="welcome-img h-100">
      <v-col class="d-flex justify-center align-center">
        <v-btn
          rounded="pill"
          size="large"
          class=""
          append-icon="mdi-chevron-right"
          color="secondary"
          to="/equipment"
        >
          {{ $t('nav.resourceMenu.equipment') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" md="" class="d-flex justify-lg-space-between align-center"> </v-col>
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
