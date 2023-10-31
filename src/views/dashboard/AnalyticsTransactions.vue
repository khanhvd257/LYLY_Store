<script setup>
const statistics = [
  {
    title: 'Sản phẩm bán ra',
    stats: '1.223',
    icon: 'mdi-trending-up',
    color: 'primary',
  },
  {
    title: 'Số lượng khách mới',
    stats: '129',
    icon: 'mdi-account-outline',
    color: 'success',
  },
  {
    title: 'Số đơn đặt hàng',
    stats: '883',
    icon: 'mdi-cellphone-link',
    color: 'warning',
  },
  {
    title: 'Số lượt đánh giá',
    stats: '100',
    icon: 'mdi-currency-usd',
    color: 'info',
  },
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Tổng quan bán hàng</VCardTitle>

      <template #append>
        <div class="me-n3">
          <MoreBtn />
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <h6 class="text-sm font-weight-medium mb-12">
        <span>Số lượng sản phẩm bán ra  😎</span>
        <span class="font-weight-regular"> trong tháng này</span>
      </h6>

      <VRow>
        <VCol
          v-for="item in statistics"
          :key="item.title"
          cols="6"
          sm="3"
        >
          <div class="d-flex align-center">
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
              <span class="text-h6">{{ item.stats }}</span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
