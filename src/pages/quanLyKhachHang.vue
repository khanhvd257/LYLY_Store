<template>
  <VCard style="padding: 16px;" title="QUẢN LÝ KHÁCH HÀNG">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <div style="width: 300px;">
        <VTextField density="compact" label="Tên khách hàng" clearable append-inner-icon="mdi-magnify"/>
      </div>

    </div>
    <VDataTable
      :headers="header"
      :items="khachHangArr"
    >
      <template v-slot:item.avatar="{item}">
        <div class="product-img">
          <img v-if="item.raw.avatar" :src="item.raw.avatar" height="60" width="60" alt="">
          <img v-else src="https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg">
        </div>
      </template>
      <template v-slot:item.created_at="{item}">
        <span>{{ formatDateTime(item.raw.created_at) }}</span>
      </template>
      <template v-slot:item.status="{item}">
        <VChip v-if="item.raw.status == 1" color="success">Đang hoạt động</VChip>
        <VChip v-if="item.raw.status == 0" color="error">Bị khóa</VChip>
      </template>
    </VDataTable>
  </VCard>
</template>

<script>
import { getCustomer } from '@/api/product'
import { VDataTable } from 'vuetify/labs/VDataTable'

export default {

  name: "KhachHang",
  components: {
    VDataTable,
  },
  created() {
    this.getDataKHang()
  },
  data() {
    return {
      header: [
        { title: 'Tên đăng nhập', key: 'username', width: 150 },
        {
          title: 'Tên khách hàng',
          align: 'start',
          sortable: false,
          key: 'name',
          width: 200,
        },
        {
          title: 'Ảnh đại diện', sortable: false,
          key: 'avatar', slot: 'avatar', width: 100,
        },
        { title: 'Trạng thái', key: 'status', align: 'center' },
        { title: 'Thời gian tạo', key: 'created_at' },
        { title: 'Số điện thoại', key: 'phone' },
        { title: 'Email', key: 'email' },
        { title: 'Địa chỉ', key: 'address', align: 'center', width: 120 },
      ],
      searchForm: {
        category_id: [],
        name: '',
      },
      khachHangArr: [],
    }
  },

  methods: {
    getDataKHang() {
      getCustomer().then(res => {
          this.khachHangArr = res.data
        },
      )
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

