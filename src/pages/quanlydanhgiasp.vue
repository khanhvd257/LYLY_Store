<template>
  <VCard style="padding: 16px;" title="QUẢN LÝ ĐÁNH GIÁ SẢN PHẨM">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">

    </div>
    <VDataTable
      :headers="header"
      :items="danhgiaspArr"
    >
      <template v-slot:item.product.name="{item}">
        <div class="clamp-text">
          {{ item.raw.product.name }}
        </div>
      </template>
      <template v-slot:item.product.image_url="{item}">
        <img class="img-product" :src="item.raw.product.image_url" height="60" width="60" alt="">
      </template>

    </VDataTable>
  </VCard>
</template>

<script>
import { layDSDanhGia } from '@/api/rating'
import { VDataTable } from 'vuetify/labs/VDataTable'

export default {

  name: "danhgiasp",
  components: {
    VDataTable,
  },
  created() {
    this.getDataDanhgiasp()
  },
  data() {
    return {
      header: [
        {
          title: 'Tên khách hàng',
          align: 'start',
          sortable: false,
          key: 'username',
          width: 200,
        },
        {
          title: 'Tên sản phẩm',
          align: 'start',
          sortable: false,
          key: 'product.name',
          slot: 'name',
          width: 200,
        },
        { title: 'Ảnh sản phẩm', key: 'product.image_url', slot: 'image', width: 200 },

        { title: 'Đánh giá', key: 'comment', align: 'center', width: 200 },
        { title: 'Số sao đánh giá', key: 'rating', align: 'center', width: 200 },
      ],
      searchForm: {
        category_id: [],
        name: '',
      },
      danhgiaspArr: [],
    }
  },
  methods: {
    getDataDanhgiasp() {
      layDSDanhGia().then(res => {
          console.log(res)
          this.danhgiaspArr = res.data
        },
      )
    },
  },
}

</script>
