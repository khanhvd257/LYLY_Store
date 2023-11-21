<template>
  <div style="padding: 16px;">
    <VRow align="center" class="mb-3">
      <VCol cols="12" sm="4">
        <VTextField density="compact" label="Tên sản phẩm" clearable
                    append-inner-icon="mdi-magnify"
                    v-model="searchForm.name"
                    @click:appendInner="getDataProducts"
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
        <VBtn color="primary" class="mb-2" @click="handleAddProduct">Thêm</VBtn>
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
      <template v-slot:item.name="{item}">
        <div class="clamp-text">
          {{ item.raw.name }}
        </div>
      </template>
      <template v-slot:item.image_url="{item}">
        <div class="product-img">
          <img :src="item.raw.image_url" alt="">
        </div>
      </template>
      <template v-slot:item.created_at="{item}">
        <span>{{ formatDate(item.raw.created_at) }}</span>
      </template>
      <template v-slot:item.status="{item}">
        <VChip variant="text" v-if="item.raw.status == 1" color="success">Đang bán</VChip>
        <VChip variant="text" v-if="item.raw.status == 0" color="error">Ngừng bán</VChip>
      </template>
      <template v-slot:item.stock="{item}">
        <VChip variant="elevated" v-if="item.raw.quantity <= 50 && item.raw.quantity >0" color="warning">Gần hết hàng</VChip>
        <VChip variant="elevated" v-if="item.raw.quantity >50" color="success">Còn nhiều hàng</VChip>
        <VChip variant="elevated" v-if="item.raw.quantity == 0" color="error">Hết hàng</VChip>
      </template>
      <template v-slot:item.action="{item}">
        <div class="text-center">
          <v-menu
          >
            <template v-slot:activator="{ props }">
              <VBtn
                v-bind="props"
                icon="mdi-dots-vertical"
              />
            </template>

            <v-list width="100">
              <v-list-item
                v-for="(_item, index) in actions"
                :key="index"
                @click="handleAction(_item.id, item.raw.id)"

              >
                <v-list-item-title>{{ _item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    </VDataTable>
  </div>
</template>
<script>
import { deleteProduct, getAllProduct, getCategory } from "@/api/product"
import { VDataTable } from 'vuetify/labs/VDataTable'

import router from "@/router"
import moment from 'moment'
import { debounce as _debounce } from 'lodash/debounce'

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
          slot: 'name',
          sortable: false,
          key: 'name',
          width: 300,
        },
        { title: 'Hình ảnh', key: 'image_url', slot: 'image', width: 120 },
        { title: 'Số lương', key: 'quantity' },
        { title: 'Trạng thái hàng', key: 'status' },
        { title: 'Tình trạng hàng', slot: 'stock', key: 'stock' },
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
        { id: 'edit', title: 'Sửa' },
        { id: 'delete', title: 'Xóa' },
      ],
    }
  },
  methods: {
    formatDate(value) {
      return moment(String(value)).format('HH:mm:ss - DD/MM/YYYY')
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
    handleAction(handle, id) {
      console.log(id)
      if (handle == 'edit') {
        this.$router.push({
          name: 'edit-product',
          query: { id: id },
        })
      }
      if (handle == 'delete') {
        deleteProduct(id).then(res => {
          this.$moshaToast(res.message,
            {
              type: 'success',
              transition: 'slide',
              timeout: 3000,
            })
          this.getDataProducts()
        }).catch(err => {
          this.$moshaToast(err.response.data.message,
            {
              type: 'warning',
              transition: 'slide',
              timeout: 3000,
            })
        })
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
  block-size: 60px;
  inline-size: 60px;
  margin-block: 6px;
  margin-inline: 10px;

  img {
    border-radius: 8px;
    block-size: 100%;
    inline-size: 100%;
    object-fit: cover;
  }
}
</style>
