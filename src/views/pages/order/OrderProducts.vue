<template>
  <div style="padding: 16px">
    <VRow align="center" class="mb-3">
      <VCol cols="12" sm="4">
        <VTextField density="compact" label="Mã đơn hàng" clearable
                    append-inner-icon="mdi-magnify"
                    v-model="searchForm.name"
                    @update:modelValue="getDataProducts"
        />
      </VCol>
    </VRow>
    <VDataTable
      loading="primary"
      :headers="header"
      :items="orderData"
      fixed-header="true"
      items-per-page-text="Số sản phẩm hiện thị"
      item-value="name"
      hover
      loading-text="đang loadnpm i vue-loading-overlay"
      class="elevatnpion-1"
      @click:row="handleClickRow"
    >
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
<!--    <template>-->
<!--      <div>-->
<!--        &lt;!&ndash; Nút Sửa &ndash;&gt;-->
<!--        <button @click="editItem">Sửa</button>-->

<!--        &lt;!&ndash; Nút Xóa &ndash;&gt;-->
<!--        <button @click="deleteItem">Xóa</button>-->
<!--      </div>-->
<!--    </template>-->
  </div>
</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { layDSorder } from "@/api/order"

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
      orderData: [],
      header: [
        {
          title: 'Mã Đơn Hàng',
          align: 'start',
          sortable: false,
          key: 'id',
          width: 200,
        },
        { title: 'Tên Khách Hàng', key: 'username' },
        { title: 'Thời Gian Đặt hàng ', key: 'order_date' },
        { title: 'Ghi Chú', key: 'note' },
        { title: 'Địa Điểm Giao Hàng', key: 'delivery_address' },
        {title: 'Trạng Thái Đơn Hàng', key:'status'},
        { title: 'Hành động', key: 'action', align: 'center', width: 120 },
      ],
      searchForm: {
        category_id: '',
        name: '',
        status: 1,
      },
    }
  },
  methods: {
    formatDate(value) {
      return moment(String(value)).format('hh:mm:ss - DD/MM/YYYY')
    },
    init() {
      this.getDataOrders()
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
    getDataOrders() {
      let load = this.$loading.show()
      layDSorder().then(res => {
        this.orderData = res.data
        load.hide()
      }).catch((error) => {
        console.error('Error fetching data from API 1:', error)
        load.hide()
      })

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
