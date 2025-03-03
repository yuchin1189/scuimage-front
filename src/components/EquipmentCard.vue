<template>
  <v-card link @click="$emit('click', _id)">
    <v-img :src="image" height="200" cover></v-img>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-subtitle>
      {{ $t('equipmentCategory.' + category) }}
    </v-card-subtitle>
    <v-card-subtitle>{{ statusText }}</v-card-subtitle>
    <!-- <v-chip>...</v-chip> -->
    <v-card-text>{{ description }}</v-card-text>
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

const statusText = computed(() => {
  return t(`equipment.${statusMap[props.status] || 'unknownStatus'}`)
})
</script>
