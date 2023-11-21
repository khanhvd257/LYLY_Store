<script>
import { thongKeThang } from "@/api/statistic"

export default {
  created() {
    this.getData()
  },
  computed: {
    month() {
      const d = new Date()
      return d.getMonth() + 1
    },
  },
  data() {
    return {
      statistics: [
        {
          id: 'new_customers_last_month',
          title: 'Số lượng khách mới',
          icon: 'raphael:people',
          link: '/khach-hang',
          color: 'success',
        },
        {
          id: 'total_products_sold',
          title: 'Sản phẩm bán ra',
          icon: 'gridicons:product-external',
          link: '/products',
          color: 'primary',
        },
        {
          id: 'total_orders',
          title: 'Số đơn đặt hàng',
          link: '/order',
          icon: 'lets-icons:order',
          color: 'warning',
        },
        {
          id: 'total_ratings',
          link: '/danhgiasp',
          title: 'Số lượt đánh giá',
          icon: 'carbon:review',
          color: 'info',
        },
      ],
      statisticNum: {},
    }
  },
  methods: {
    getData() {
      thongKeThang().then(res => {
        this.statisticNum = res.data
      })
    },
  },
}
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle class="font-weight-black">Tổng quan bán hàng trong tháng qua</VCardTitle>
    </VCardItem>
    <VCardText>
<!--      <h3 class="font-weight-medium mb-12">-->
<!--        <span>Số liệu thống kê trong tháng {{ month }} này 😎</span>-->
<!--        <span class="font-weight-regular"> trong tháng này</span>-->
<!--      </h3>-->

      <VRow justify-sm="space-between">
        <VCard
          class="hover-card"
          style="padding: 10px 16px; font-size: 16px"
          v-for="(item,index) in statistics"
          :key="index"
          cols="6"
          sm="3"
        >
          <router-link :to="item.link" class="d-flex align-center">
            <div class="me-3">
              <VAvatar
                :color="item.color"
                rounded
                size="42"
                class="elevation-1"
              >
                <VIcon
                  size="24"
                  :icon="item.icon"
                />
              </VAvatar>
            </div>

            <div class="d-flex flex-column">
              <span class="text-caption">
                {{ item.title }}
              </span>
              <span v-if="item.id == 'new_customers_last_month'" class="text-h6"
              >{{ statisticNum.new_customers_last_month }}</span>
              <span v-if="item.id == 'total_products_sold'" class="text-h6">{{
                  statisticNum.total_products_sold
                }}</span>
              <span v-if="item.id == 'total_orders'" class="text-h6">{{ statisticNum.total_orders }}</span>
              <span v-if="item.id == 'total_ratings'" class="text-h6">{{ statisticNum.total_ratings }}</span>
            </div>
          </router-link>
        </VCard>
      </VRow>
    </VCardText>
  </VCard>
</template>
