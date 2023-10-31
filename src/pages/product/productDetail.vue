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

    <VRow class="content">
      <VCol cols="12" sm="6" class="content-left">
        <div class="product-img">
          <img
            :src="productDetail.image_url"
          />
        </div>
      </VCol>
      <VCol cols="12" sm="6">
        <VCard class="content-right">
          <strong>
            Mô tả sản phẩm
          </strong>
          <div style="margin-left: 10px" v-if="productDetail.description" v-html="productDetail.description"/>
          <div v-else>Không có mô tả</div>
        </VCard>
      </VCol>
    </VRow>


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
  created() {
    getDetailProduct(this.id).then(res => {
      this.productDetail = res.data
    })
  },
  methods: {
    //
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
    max-width: 600px;
    padding: 6px 16px;
  }
}

.product-img {
  border-radius: 12px;
  max-width: 600px;
  max-height: 700px;
  margin: 0 10px;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
}
</style>
