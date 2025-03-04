<template>
  <v-container class="mt-lg-5">
    <v-row class="justify-center">
      <v-col cols="12">
        <!-- Title: 器材借用 -->
        <h1 class="text-center">{{ $t('nav.resourceMenu.equipment') }}</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="">
    <v-row>
      <v-col cols="12">
        <v-toolbar v-show="isAdmin">
          <!-- 搜尋 -->
          <v-col cols="4">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
              density="compact"
            >
            </v-text-field>
          </v-col>
          <!-- 表格開關 checkbox -->
          <v-col cols="4">
            <v-checkbox
              v-model="showDataTable"
              hide-details
              label="Show Table"
              class="me-2"
            ></v-checkbox>
          </v-col>
          <!-- 新增器材 -->
          <v-col cols="4" md="4" class="d-flex justify-end align-center">
            <v-btn prepend-icon="mdi-plus" variant="elevated" @click="openDialog(null)">
              {{ $t('equipment.create') }}
            </v-btn>
          </v-col>
        </v-toolbar>

        <!-- 器材列表 -->
        <v-data-table
          v-show="showDataTable"
          :items="equipments"
          :headers="headers"
          :search="search"
        >
          <template #[`item.image`]="{ value }">
            <v-img :src="value" height="2.5rem"></v-img>
          </template>
          <template #[`item.status`]="{ value }">
            <v-chip :color="getStatusColor(value)">
              <template v-if="value === 0">{{ $t('equipment.available') }}</template>
              <template v-if="value === 1">{{ $t('equipment.reserved') }}</template>
              <template v-if="value === 2">{{ $t('equipment.inuse') }}</template>
            </v-chip>
          </template>
          <template #[`item.createdAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.updatedAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.category`]="{ value }">
            {{ $t('equipmentCategory.' + value) }}
          </template>
          <template #[`item.edit`]="{ item }">
            <v-btn icon="mdi-pencil" variant="text" @click="openDialog(item)"></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>

  <!-- 器材卡片 -->
  <v-container>
    <v-row>
      <v-col v-for="equipment of equipments" :key="equipment._id" cols="12" md="6" lg="3">
        <equipment-card-mobile
          v-bind="equipment"
          class="d-block d-md-none"
          @click="openDialog(equipment)"
        ></equipment-card-mobile>

        <equipment-card
          v-bind="equipment"
          class="d-none d-md-block"
          @click="openDialog(equipment)"
        ></equipment-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- 表單：新增、編輯物品 -->
  <v-dialog v-model="dialog.open" persistent>
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-container :fluid="formIsFluid">
        <v-row class="justify-center align-center">
          <v-col v-show="image.value.value !== ''" cols="10" md="6">
            <v-img :src="image.value.value" rounded="lg" :max-height="imgMaxHeight"></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="">
              <!-- 標題：編輯器材、新增器材 -->
              <v-card-title v-show="user.isLoggedIn">
                {{ $t(dialog.id ? 'equipment.edit' : 'equipment.create') }}
              </v-card-title>
              <v-divider v-show="user.isLoggedIn" color="white"></v-divider>

              <!-- 欄位 -->
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="8">
                    <!-- 品名 -->
                    <v-text-field
                      v-model="name.value.value"
                      :label="$t('equipment.name')"
                      :error-messages="name.errorMessage.value"
                    />
                  </v-col>
                  <v-col cols="6" md="4">
                    <!-- 分類 -->
                    <v-select
                      v-model="category.value.value"
                      :error-messages="category.errorMessage.value"
                      :items="categoryOptions"
                      :label="$t('equipment.category')"
                      item-title="title"
                      item-value="value"
                    />
                  </v-col>
                  <v-col cols="6">
                    <!-- 狀態 -->
                    <v-select
                      v-model="status.value.value"
                      :error-messages="status.errorMessage.value"
                      :items="statusOptions"
                      :label="$t('equipment.status')"
                      type="number"
                      item-title="title"
                      item-value="value"
                    />
                  </v-col>
                  <v-col cols="6">
                    <!-- 說明 -->
                    <v-textarea
                      v-model="description.value.value"
                      :label="$t('equipment.description')"
                      :error-messages="description.errorMessage.value"
                    />
                  </v-col>
                  <v-col v-show="user.isAdmin" cols="6" md="12">
                    <!-- 圖片上傳 -->
                    <vue-file-agent
                      ref="fileAgent"
                      v-model="fileRecords"
                      v-model:raw-model-value="rawFileRecords"
                      accept="image/*"
                      deletable
                      max-size="1MB"
                      :help-text="$t('fileAgent.helpText')"
                      :error-text="{
                        type: $t('fileAgent.errorType'),
                        size: $t('fileAgent.errorSize'),
                      }"
                    ></vue-file-agent>
                  </v-col>
                </v-row>
              </v-card-text>

              <!-- 動作按鈕 -->
              <v-card-actions class="justify-end">
                <v-btn variant="plain" color="primary" @click="closeDialog">
                  {{ $t('equipment.closeDialog') }}
                </v-btn>
                <v-btn
                  v-if="user.isLoggedIn"
                  type="submit"
                  :loading="isSubmitting"
                  variant="elevated"
                  color="primary"
                >
                  {{ $t('equipment.save') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'
import { reactive, computed, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useForm, useField } from 'vee-validate'
import { useUserStore } from '@/stores/user'
import * as yup from 'yup'
import EquipmentCard from '@/components/EquipmentCard.vue'
import EquipmentCardMobile from '@/components/EquipmentCardMobile.vue'

const { t } = useI18n()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const user = useUserStore()
const isAdmin = computed(() => user.isAdmin)
const showDataTable = ref()
const display = useDisplay()

const formIsFluid = computed(() => display.smAndDown.value)
const imgMaxHeight = computed(() => (display.smAndDown.value ? '25vh' : '80vh'))
const equipments = reactive([])
const search = ref('')
const headers = computed(() => {
  return [
    // { title: 'ID', key: '_id', sortable: true },
    { title: t('equipment.image'), key: 'image', sortable: false },
    { title: t('equipment.name'), key: 'name', sortable: true },
    // { title: t('equipment.description'), key: 'description', sortable: true },
    { title: t('equipment.category'), key: 'category', sortable: true },
    { title: t('equipment.status'), key: 'status', sortable: true },
    { title: t('equipment.createdAt'), key: 'createdAt', sortable: true },
    { title: t('equipment.updatedAt'), key: 'updatedAt', sortable: true },
    // 虛擬欄位，並非後端傳來的資料
    { title: t('equipment.edit'), key: 'edit', sortable: false },
  ]
})

const getEquipments = async () => {
  try {
    const { data } = await apiAuth.get('/equipment/all')
    equipments.push(...data.result)
  } catch (error) {
    console.log('equipment.vue getEquipments', error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'error',
        rounded: 'pill',
      },
    })
  }
}
getEquipments()

const getStatusColor = (status) => {
  if (status === 0) {
    return 'green'
  } else if (status === 1) {
    return 'orange'
  } else {
    return 'red'
  }
}

const schema = yup.object({
  name: yup.string().required(t('api.equipmentNameRequired')),
  description: yup.string().required(t('api.equipmentDescriptionRequired')),
  category: yup
    .string()
    .required(t('api.equipmentCategoryRequired'))
    .oneOf(
      ['filmCamera', 'digitalCamera', 'lens', 'tripod', 'book', 'accessories'],
      t('api.equipmentCategoryInvalid'),
    ),
  status: yup.number().required(t('api.equipmentStatusRequired')),
})

const fileAgent = ref(null)
const fileRecords = ref([])
const rawFileRecords = ref([])

const dialog = ref({
  open: false,
  id: '',
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    description: '',
    category: '',
    status: 0,
    image: '',
  },
})

const openDialog = (item) => {
  if (item) {
    dialog.value.id = item._id
    name.value.value = item.name
    description.value.value = item.description
    category.value.value = item.category
    status.value.value = item.status
    image.value.value = item.image
  }
  dialog.value.open = true
}

const closeDialog = () => {
  resetForm()
  dialog.value.id = ''
  dialog.value.open = false
  fileAgent.value.deleteFileRecord()
}

const name = useField('name')
const description = useField('description')
const image = useField('image')

const category = useField('category')
// 如果沒有做 t('多語言翻譯') 的話，可以不用 computed
const categoryOptions = computed(() => [
  { title: t('equipmentCategory.filmCamera'), value: 'filmCamera' },
  { title: t('equipmentCategory.digitalCamera'), value: 'digitalCamera' },
  { title: t('equipmentCategory.lens'), value: 'lens' },
  { title: t('equipmentCategory.tripod'), value: 'tripod' },
  { title: t('equipmentCategory.book'), value: 'book' },
  { title: t('equipmentCategory.accessories'), value: 'accessories' },
])

const status = useField('status')
const statusOptions = computed(() => [
  { title: t('equipment.available'), value: 0 },
  { title: t('equipment.reserved'), value: 1 },
  { title: t('equipment.inuse'), value: 2 },
])

const submit = handleSubmit(async (values) => {
  // 自己製作一個 File Agent 的錯誤處理
  if (fileRecords.value[0]?.error) return
  if (dialog.value.id.length === 0 && fileRecords.value.length === 0) {
    createSnackbar({
      text: t('api.equipmentImageRequired'),
      snackbarProps: {
        color: 'error',
        rounded: 'pill',
      },
    })
    return
  }

  // 真正送出表單資料的部分
  try {
    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('description', values.description)
    fd.append('category', values.category)
    fd.append('status', values.status)
    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }

    // 有 ID 送出就是修改資訊，無 ID 送出就是新增器材
    if (dialog.value.id.length > 0) {
      await apiAuth.patch('/equipment/' + dialog.value.id, fd)
    } else {
      await apiAuth.post('/equipment', fd)
    }

    equipments.splice(0, equipments.length)
    getEquipments()
    createSnackbar({
      text: t(dialog.value.id.length > 0 ? 'equipment.editSuccess' : 'equipment.createSuccess'),
      snackbarProps: {
        color: 'success',
        rounded: 'pill',
      },
    })
    closeDialog()
  } catch (error) {
    console.log('equipment.vue handleSubmit', error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'error',
        rounded: 'pill',
      },
    })
  }
})
</script>

<route lang="json">
{
  "meta": {
    "login": false,
    "admin": false,
    "title": "nav.resourceMenu.equipment"
  }
}
</route>
