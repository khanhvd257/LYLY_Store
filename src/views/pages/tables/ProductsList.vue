<template>
  <div style="padding: 16px">
    <VRow align="center" class="mb-3">
      <VCol cols="12" sm="4">
        <VTextField density="compact" label="Tên sản phẩm" clearable
                    append-inner-icon="mdi-magnify"
                    v-model="searchForm.name"
                    @update:modelValue="getDataProducts"
        />
      </VCol>
      <VCol cols="12" sm="4">
        <v-autocomplete
          :items="categoryArr"
          v-model="searchForm.category_id"
          density="compact"
          color="blue-grey-lighten-2"
          item-title="name"
          label="Danh mục sản phẩm"
          item-value="id"
          @update:modelValue="getDataProducts"
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
      </VCol>
      <VCol sm="3" cols="6">
        <VSelect label="Trạng thái sản phẩm" density="compact" :items="statusProduct"
                 item-title="title" item-value="value" v-model="searchForm.status"
                 @update:modelValue="getDataProducts"
        />
      </VCol>
      <VCol sm="1" cols="6">
        <VBtn append-icon="mdi-add" color="primary" class="mb-2" @click="handleAddProduct">Thêm</VBtn>
      </VCol>
    </VRow>
    <VDataTable
      loading="primary"
      :headers="header"
      :items="productData"
      fixed-header="true"
      items-per-page-text="Số sản phẩm hiện thị"
      item-value="name"
      hover
      loading-text="đang loadnpm i vue-loading-overlay"
      class="elevation-1"
      @click:row="handleClickRow"
    >
      <template v-slot:item.image_url="{item}">
        <div class="product-img">
          <img :src="item.raw.image_url" alt="">
        </div>
      </template>
      <template v-slot:item.created_at="{item}">
        <span>{{ formatDate(item.raw.created_at) }}</span>
      </template>
      <template v-slot:item.status="{item}">
        <VChip v-if="item.raw.status == 1" color="success">Đang bán</VChip>
        <VChip v-if="item.raw.status == 0" color="error">Ngừng bán</VChip>
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
        category_id: '',
        name: '',
        status: '',
      },
      statusProduct: [
        {
          title: 'Tất cả',
          value: '',
        },
        {
          title: 'Đang bán',
          value: 1,
        },
        {
          title: 'Dừng bán',
          value: 0,
        },
      ],
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
      let load = this.$loading.show()
      getAllProduct(this.searchForm).then(res => {
        this.productData = res.data
        load.hide()
      }).catch((error) => {
        console.error('Error fetching data from API 1:', error)
        load.hide()
      })

    },
    handleChangeCate(val) {
      this.searchForm.category_id = val
    },
    handleClickRow(e, val) {
      router.push(`/productDetail/${val.item.raw.id}`)

    },
  },


}
</script>
<style scoped lang="scss">
.product-img {
  width: 60px;
  height: 60px;
  margin: 6px 10px;

  img {
    object-fit: cover;
    width: 100%;
    border-radius: 8px;
    height: 100%;

  }
}
</style>
