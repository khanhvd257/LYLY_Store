<template>
  <div style="padding: 16px">
    <VRow align="center" class="mb-3">
      <VCol cols="12" sm="4">
        <VTextField density="compact" label="Mã đơn hàng" clearable
                    append-inner-icon="mdi-magnify"
                    v-model="searchForm.order_id"
                    @click:appendInner="getDataOrders"
        />
      </VCol>
      <VCol cols="12" sm="4">
        <VSelect label="Trạng thái đơn hàng" density="compact" :items="statusOrder"
                 item-title="title" item-value="value" v-model="searchForm.status"
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
      <template v-slot:item.order_details[0].product.image_url="{item}">
        <div>
          <VImg cover :key="i" class="product-img" v-for="(val,i) in item.value.order_details" :src="val.product.image_url" :alt="val"/>
        </div>
      </template>
      <template v-slot:item.order_details[0].quantity="{item}">
        <div class="product-num" :key="i" v-for="(val,i) in item.value.order_details" >
          <span> {{ val.quantity }}</span>
        </div>
      </template>
      <template v-slot:item.order_details[0].product.name="{item}">
        <div :key="i" v-for="(val,i) in item.value.order_details" class="product-name clamp-text">
          <span> - {{

            val.product.name
            }}</span>
        </div>

      </template>
      <template v-slot:item.total_price="{item}">
        <span>{{ formatPrice(item.raw.total_price) }}</span>
      </template>
      <template v-slot:item.created_at="{item}">
        <span>{{ formatDate(item.raw.created_at) }}</span>
      </template>
      <template v-slot:item.status="{item}">
        <VChip v-if="item.raw.status == 'Confirmed'" color="primary">Đã xác nhận</VChip>
        <VChip v-if="item.raw.status == 'Cancel'" color="error">Hủy bỏ</VChip>
        <VChip v-if="item.raw.status == 'Pending'" color="warning">Chờ xác nhận</VChip>
        <VChip v-if="item.raw.status == 'Done'" color="success">Hoàn thành</VChip>
      </template>
      <template v-slot:item.action="{item}">
        <div v-if="item.raw.status == 'Pending'" style="display: flex; gap: 6px">
          <VBtn density="compact" color="success" icon="mdi-check" @click="handleConfirmOrder(item.raw)"/>
          <VBtn color="error" density="compact" icon="iconoir:cancel" @click="handleCancelOrder(item.raw)"/>
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
        { title: 'Hành động', key: 'action', align: 'center', slot: 'action', width: 120, fixed: true },
        {
          title: 'Mã Đơn Hàng',
          align: 'center',
          key: 'id',
          width: 100,
        },
        {
          title: 'Tên Khách Hàng', key: 'username', width: 180,
        },
        {
          title: 'Tổng đơn hàng', key: 'total_price',slot: 'total_price' ,width: 180,
        },
        {
          title: 'Hình ảnh',
          key: 'order_details[0].product.image_url',
          align: 'center',
          slot: 'order_details[0].product.image_url',
          width: 120,
        },
        {
          title: 'Tên sản phẩm',
          key: 'order_details[0].product.name',
          slot: 'order_details[0].product.name',
          width: 200,
        },
        {
          title: 'Số lượng',
          key: 'order_details[0].quantity',
          slot: 'order_details[0].quantity',
          width: 100,
          align: 'center',
        },
        { title: 'Thời Gian Đặt hàng ', align: 'center', key: 'order_date', width: 150 },
        { title: 'Ghi Chú', key: 'note', width: 200 },
        { title: 'Địa Điểm Giao Hàng', key: 'delivery_address', width: 300 },
        { title: 'Trạng Thái Đơn Hàng', key: 'status', width: 100, align: 'center' },
      ],
      // header: [
      //   {
      //     title: 'Tên sản phẩm',
      //     align: 'start',
      //     sortable: false,
      //     key: 'name',
      //     width: 200,
      //   },
      //   { title: 'Hình ảnh', key: 'iimage_urlmage_url', slot: 'image', width: 120 },
      //   { title: 'Trạng thái hàng', key: 'status' },
      //   { title: 'Số lương', key: 'quantity' },
      //   { title: 'Thời gian tạo', key: 'created_at' },
      //   { title: 'Hành động', key: 'action', align: 'center', width: 120 },
      // ],
      searchForm: {
        status: 'Pending',
        order_id: '',
      },
      statusOrder: [
        {
          title: 'Tất cả',
          value: '',
        },
        {
          title: 'Chờ xác nhận',
          value: 'Pending',
        },
        {
          title: 'Đã xác nhận',
          value: 'Confirmed',
        },
        {
          title: 'Hoàn thành',
          value: 'Done',
        },
        {
          title: 'Hủy bỏ',
          value: 'Cancel',
        },
      ],
    }
  },
  methods: {
    init() {
      this.getDataOrders()
    },
    handleConfirmOrder(val) {
      chapNhanDonHang(val.id).then(res => {
        this.$moshaToast('Chấp nhận đơn hàng thành công',
          {
            type: 'success',
            transition: 'slide',
            timeout: 2000,
          })
        this.getDataOrders()
      }).catch(err => {
        this.$moshaToast(err.response.data.message,
          {
            type: 'warning',
            transition: 'slide',
            timeout: 2000,
          })
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
      layDSorder(this.searchForm).then(res => {
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
.product-name{
  width: 100%;
  margin-top: .6rem;
}
.product-num{
  line-height: 60px;
}
.product-img {
  width: 60px;
  height: 60px;
  margin: 6px 10px;
  border-radius: 6px;

  img {
    object-fit: cover;
    width: 100%;
    border-radius: 8px;
    height: 100%;

  }
}
</style>
