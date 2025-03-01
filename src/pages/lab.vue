<template>
  <v-container class="h-100 mt-lg-5" min-height="100vh">
    <v-row class="justify-center">
      <v-col cols="12">
        <!-- Title: 暗房預約 -->
        <h1 class="text-center">{{ $t('nav.resourceMenu.lab') }}</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row style="background: lightblue">
      <v-col cols="12" md="6" class="h-50">
        <v-card
          class="h-100 mx-auto justify-center align-center"
          color="surface-variant"
          image="https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg"
        >
          <template #actions>
            <v-btn append-icon="mdi-chevron-right" color="red-lighten-2" variant="elevated">
              {{ $t('bookNow') }}
            </v-btn>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">table</v-col>
    </v-row>
  </v-container>
</template>

<route lang="json">
{
  "meta": {
    "login": false,
    "admin": false,
    "title": "nav.resourceMenu.lab"
  }
}
</route>
