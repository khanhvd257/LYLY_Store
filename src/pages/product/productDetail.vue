<template>
  <VCard style="max-width: 100%; min-height: 800px" prepend-icon="majesticons:checkbox-list-detail"
         :title=productDetail.name
  >
    <div class="item">
      Trạng thái sản phẩm
      <VChip
        class="ma-2"
        v-if="productDetail.status == 1"
        color="primary"
        text-color="white"
      >
        Đang bán
      </VChip>
      <VChip
        class="ma-2"
        v-else
        color="error"
        text-color="white"
      >
        Ngừng bán
      </VChip>
    </div>
    <div class="item">
      <span>Số lượng kho: </span>
      <strong>{{ productDetail.quantity }}</strong>
    </div>
    <div class="item">
      <span>Giá kinh doanh: </span>
      <strong>{{ formatPrice(productDetail.price) }} / 1 sản phẩm</strong>
    </div>
    <div class="item">
      <span>Thời gian tạo: </span>
      <span>{{ formatDateTime(productDetail.created_at) }}</span>
    </div>

    <div class="content">
      <VCard class="content-left">
        <img
          width="500"
          height="500"
          :src="productDetail.image_url"
          class="product-img"
        />
      </VCard>
      <VCard class="content-right">
        <strong>
          Mô tả sản phẩm
        </strong>
        <div style="margin-left: 10px" v-html="productDetail.description"/>
      </VCard>
    </div>


  </VCard>
</template>

<script>
import { getDetailProduct } from "@/api/product"

export default {
  name: "productDetail",
  props: ['id'],
  data() {
    return {
      productDetail: {
        name: "",
        image_url: "",
        description: "",
      },
    }
  },
  mounted() {
    getDetailProduct(this.id).then(res => {
      console.log(res)
      this.productDetail = res.data
    })
  },
  methods: {
    formatCurrency(price) {
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      })
      return formatter.format(price)
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  margin-left: 16px;
  margin-bottom: 10px;
  padding: 0px 6px;

  p:first-child {
    color: #f5f5f5;
  }
}

.content {
  display: flex;
  justify-content: space-around;

  .content-left {
    width: 500px;
  }

  .content-right {
    width: 600px;
    padding: 6px 16px;
  }
}

.product-img {
  object-fit: cover;
  border-radius: 12px;
  padding: 8px 16px;
  margin: 0 10px;
}
</style>
