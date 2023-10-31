<script setup>
const salesByCountries = [
  {
    abbr: 'US',
    amount: '10.000.000 VNĐ',
    country: 'Hà Nội',
    change: '+25.8%',
    sales: '9',
    color: 'success',
  },
  {
    abbr: 'UK',
    amount: '10.000.000 VNĐ',
    country: 'Hà Nội',
    change: '-6.2%',
    sales: '19',
    color: 'error',
  },
  {
    abbr: 'IN',
    amount: '10.000.000 VNĐ',
    country: 'Hà Nội',
    change: '+12.4%',
    sales: '12',
    color: 'warning',
  },
  {
    abbr: 'JA',
    amount: '10.000.000 VNĐ',
    country: 'Hồ Chí Minh',
    change: '-11.9%',
    sales: '13',
    color: 'secondary',
  },
  {
    abbr: 'KO',
    amount: '10.000.000 VNĐ',
    country: 'Đà Nẵng',
    change: '+16.2%',
    sales: '33',
    color: 'error',
  },
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Top 5 người mua hàng nhiều nhất</VCardTitle>

      <template #append>
        <div class="me-n3">
          <MoreBtn />
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="data in salesByCountries"
          :key="data.country"
        >
          <template #prepend>
            <VAvatar
              size="40"
              variant="tonal"
              :color="data.color"
              class="me-3"
            >
              {{ data.abbr }}
            </VAvatar>
          </template>

          <VListItemTitle class="mb-1">
            <span class="text-sm font-weight-medium">{{ data.amount }}</span>
            <VIcon
              size="22"
              :color="data.change.charAt(0) === '+' ? 'success' : 'error'"
              class="mx-1"
            >
              {{ data.change.charAt(0) === '+' ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
            </VIcon>
            <span :class="`text-xs ${data.change.charAt(0) === '+' ? 'text-success' : 'text-error'}`">
              {{ data.change.slice(1) }}
            </span>
          </VListItemTitle>

          <VListItemSubtitle class="text-xs">
            {{ data.country }}
          </VListItemSubtitle>

          <template #append>
            <div>
              <h4 class="font-weight-medium">
                {{ data.sales }}
              </h4>
              <span class="text-xs text-medium-emphasis">Sản phẩm</span>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

  <style lang="scss" scoped>
  .card-list {
    --v-card-list-gap: 1.5rem;
  }
  </style>
