<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ equipment.name }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" md="6">
        <v-img :src="equipment.image"></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <p>{{ $t('equipment.categor' + equipment.category) }}</p>
        <p>{{ equipment.price }}</p>
        <p>{{ equipment.description }}</p>
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field
            v-model.number="quantity.value.value"
            type="number"
            :error-messages="quantity.errorMessage.value"
          ></v-text-field>
          <v-btn type="submit" prepend-icon="mdi-cart" :loading="isSubmitting">{{
            $t('product.addCart')
          }}</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAxios } from '@/composables/axios'
import { useRoute, useRouter } from 'vue-router'
// import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'

const { api, apiAuth } = useAxios()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const user = useUserStore()
const createSnackbar = useSnackbar()

const equipment = ref({
  _id: '',
  name: '',
  statue: 0,
  description: '',
  image: '',
  category: 'lens',
})

const getEquipments = async () => {
  try {
    const { data } = await api.get('/equipment/' + route.params.id)
    equipment.value = data.result
    document.title = equipment.value.name + '溪城'
  } catch (error) {
    console.log('[id].vue getEquipment', error)
    router.push('/')
  }
}
getEquipments()
</script>
