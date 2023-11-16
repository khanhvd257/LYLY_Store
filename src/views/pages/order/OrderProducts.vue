<template>
  <div style="padding: 16px">
    <VRow align="center" class="mb-3">
      <VCol cols="12" sm="4">
        <VTextField density="compact" label="Mã đơn hàng" clearable
                    append-inner-icon="mdi-magnify"
                    v-model="searchForm.name"
                    @update:modelValue="getDataOrders"
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
      class="elevation-1"
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
        <VChip v-if="item.raw.status == 'Confirmed'" color="green">Đã xác nhận</VChip>
        <VChip v-if="item.raw.status == 'Cancel'" color="error">Hủy bỏ</VChip>
        <VChip v-if="item.raw.status == 'Pending'" color="primary">Chờ xác nhận</VChip>
        <VChip v-if="item.raw.status == 'Done'" color="success">Hoàn thành</VChip>
      </template>
      <template v-slot:item.action="{item}">
        <div v-if="item.raw.status == 'Pending'" style="display: flex; gap: 6px">
          <VBtn density="compact" color="success" icon="mdi-check" @click="handleConfirmOrder(item.raw)"/>
          <VBtn color="error" density="compact" icon="iconoir:cancel" @click="handleCancelOrder"/>
        </div>
      </template>
    </VDataTable>
  </div>
</template>
<script>
import { chapNhanDonHang, layDSorder } from "@/api/order"
import { VDataTable } from 'vuetify/labs/VDataTable'


import router from "@/router"

export default {
  name: 'OrderProduct',
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
          align: 'center',
          sortable: false,
          key: 'id',
          width: 100,
        },
        {
          title: 'Tên Khách Hàng', key: 'username', width: 180,
        },
        { title: 'Thời Gian Đặt hàng ', key: 'order_date', width: 150 },
        { title: 'Ghi Chú', key: 'note', width: 200 },
        { title: 'Địa Điểm Giao Hàng', key: 'delivery_address', width: 200 },
        { title: 'Trạng Thái Đơn Hàng', key: 'status', width: 100, align: 'center' },
        { title: 'Hành động', key: 'action', align: 'center', slot: 'action', width: 120 },
      ],
      // header: [
      //   {
      //     title: 'Tên sản phẩm',
      //     align: 'start',
      //     sortable: false,
      //     key: 'name',
      //     width: 200,
      //   },
      //   { title: 'Hình ảnh', key: 'image_url', slot: 'image', width: 120 },
      //   { title: 'Trạng thái hàng', key: 'status' },
      //   { title: 'Số lương', key: 'quantity' },
      //   { title: 'Thời gian tạo', key: 'created_at' },
      //   { title: 'Hành động', key: 'action', align: 'center', width: 120 },
      // ],
      searchForm: {},
    }
  },
  methods: {
    init() {
      this.getDataOrders()
    },
    handleConfirmOrder(val) {
      chapNhanDonHang(val.id).then(res => {

      })
    },
    handleCancelOrder() {

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
