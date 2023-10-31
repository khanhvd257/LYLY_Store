<template>
  <div style="padding: 16px">
    <div style="display: flex; justify-content: space-between; margin-bottom: 16px">
      <div  style="display: flex; gap:10px">
        <VTextField style="width: 300px" density="compact" label="Tên sản phẩm" clearable
                    append-inner-icon="mdi-magnify"
        />
        <v-autocomplete
          :items="categoryArr"
          v-model="searchForm.category_id"
          density="compact"
          style="width: 300px"
          color="blue-grey-lighten-2"
          item-title="name"
          label="Danh mục sản phẩm"
          item-value="id"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :prepend-avatar="item?.raw?.image_url"
              :title="item?.raw?.name"
              :subtitle="item?.raw?.description"
            ></v-list-item>
          </template>
        </v-autocomplete>
      </div>
      <VBtn color="primary" class="mb-2" @click="handleAddProduct">Thêm mới</VBtn>
    </div>
    <VDataTable
      :loading="loading"
      :headers="header"
      :items="productData"
      item-value="name"
      class="elevation-1"
      show-select
      @click:row="handleClickRow"
    >
      <template v-slot:item.image_url="{item}">
        <img class="img-product" :src="item.raw.image_url" height="60" width="60" alt="">
      </template>
      <template v-slot:item.created_at="{item}">
        <span>{{ formatDate(item.raw.created_at) }}</span>
      </template>
      <template v-slot:item.status="{item}">
        <VChip v-if="item.raw.status == 1" color="success">Đang bán</VChip>
        <VChip v-if="item.raw.status == 0" color="error">Ngưng bán</VChip>
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
  </div>
</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { getAllProduct, getCategory } from "@/api/product"

import moment from 'moment'
import router from "@/router"

export default {
  created() {
    this.init()
  },
  components: {
    VDataTable,
  },
  data() {
    return {
      productData: [],
      header: [
        {
          title: 'Tên sản phẩm',
          align: 'start',
          sortable: false,
          key: 'name',
          width: 200,
        },
        { title: 'Hình ảnh', key: 'image_url', slot: 'image', width: 120 },
        { title: 'Trạng thái hàng', key: 'status' },
        { title: 'Số lương', key: 'quantity' },
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
      this.getDataProducts()
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
      router.push('products/customize')
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
    handleClickRow(e, val){
      router.push(`/productDetail/${val.item.raw.id}`)
    }
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
