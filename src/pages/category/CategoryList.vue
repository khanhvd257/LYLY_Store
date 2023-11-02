<template>
  <VCard style="padding: 16px" title="QUẢN LÝ DANH MỤC">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
      <div style="width: 300px">
        <VTextField  density="compact" label="Tên danh mục" clearable append-inner-icon="mdi-magnify"/>
      </div>
      <VBtn append-icon="mdi-add" color="primary" class="mb-2" @click="handleAddProduct">Thêm mới</VBtn>
    </div>
    <VDataTable
      :loading="loading"
      :headers="header"
      :items="categoryArr"
      item-value="name"
      class="elevation-1"
    >
      <template v-slot:item.image_url="{item}">
        <img class="img-product" :src="item.raw.image_url" height="60" width="60" alt="">
      </template>
      <template v-slot:item.created_at="{item}">
        <span>{{ formatDate(item.raw.created_at) }}</span>
      </template>
      <template v-slot:item.status="{item}">
        <VChip v-if="item.raw.status == 1" color="success">Đang bán</VChip>
        <VChip v-if="item.raw.status == 0" color="error">Tạm dừng</VChip>
      </template>
      <template v-slot:item.action="{item}">
        <div class="text-center">
          <v-menu
            open-on-hover
          >
            <template v-slot:activator="{ props }">
              <VBtn
                v-bind="props"
                icon="mdi-dots-vertical"
              />
            </template>

            <v-list width="100">
              <v-list-item
                v-for="(item, index) in actions"
                :key="index"
                @click="handleAction(item)"

              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    </VDataTable>
  </VCard>
</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { getAllProduct, getCategory } from "@/api/product"

import moment from 'moment'
import router from "@/router"

export default {
  name: "CategoryList",
  created() {
    this.init()
  },
  components: {
    VDataTable,
  },
  data() {
    return {
      header: [
        {
          title: 'Tên danh mục',
          align: 'start',
          sortable: false,
          key: 'name',
          width: 200,
        },
        { title: 'Hình ảnh', key: 'image_url', slot: 'image', width: 120 },
        { title: 'Mô tả ngắn', key: 'description' },
        { title: 'Thời gian tạo', key: 'created_at' },
        { title: 'Hành động', key: 'action', align: 'center', width: 120 },
      ],
      searchForm: {
        category_id: [],
        name: '',
      },
      categoryArr: [],
      loading: true,
      actions: [
        { title: 'Sửa' },
        { title: 'Xóa' },
      ],
    }
  },
  methods: {
    formatDate(value) {
      return moment(String(value)).format('hh:mm:ss - DD/MM/YYYY')
    },
    init() {
      this.getDataCategory()
    },
    getDataCategory() {
      getCategory().then(res => {
        this.loading = false
        this.categoryArr = res.data
      }).catch((error) => {
        console.error('Error fetching data from API 1:', error)
      })
    },
    handleAction(val) {
      if (val == 'edit') {

      }
    },
    handleAddProduct() {
      router.push('category/add')
    },
    handleEditProduct(productId) {
      router.push({
        path: 'products/customize',
        query: { id: productId },
      })
    },
    getDataProducts() {
      getAllProduct().then(res => {
        this.loading = false
        this.productData = res.data

      }).catch((error) => {
        console.error('Error fetching data from API 1:', error)
      })
    },
    handleChangeCate(val) {
      this.searchForm.category_id = val
    },

  },

}
</script>
<style scoped lang="scss">
.img-product {
  border-radius: 8px;
  object-fit: cover;
  margin: 6px 0px;
  padding: 2px;
}
</style>
