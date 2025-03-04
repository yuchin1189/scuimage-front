<template>
  <v-card link height="150" @click="$emit('click', _id)">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="text-h5"> {{ name }} </v-card-title>

        <v-card-subtitle>{{ $t('equipmentCategory.' + category) }}</v-card-subtitle>
        <v-chip class="ma-3 mb-0" :color="statusColor">{{ statusText }}</v-chip>
      </div>
      <v-avatar class="ma-3" rounded="lg" size="125">
        <v-img :src="image" cover></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  // eslint-disable-next-line vue/prop-name-casing
  _id: { type: String, default: '' },
  name: { type: String, default: '' },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  category: { type: String, default: '' },
  status: { type: Number, default: 0 },
})

defineEmits(['click'])

const statusMap = {
  0: 'available',
  1: 'reserved',
  2: 'inuse',
}

const statusColor = computed(() => {
  const colorMap = {
    0: 'green', // 可租借
    1: 'orange', // 預約中
    2: 'red', // 出借中
  }
  return colorMap[props.status] || 'gray'
})

const statusText = computed(() => {
  return t(`equipment.${statusMap[props.status] || 'unknownStatus'}`)
})
</script>
