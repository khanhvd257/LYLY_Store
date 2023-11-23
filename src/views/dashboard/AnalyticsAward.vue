<script setup>
import triangleDark from '@images/misc/triangle-dark.png'
import triangleLight from '@images/misc/triangle-light.png'
import trophy from '@images/misc/trophy.png'
import { useTheme } from 'vuetify'
import { thongKeDoanhThuThang } from "@/api/statistic"

const { global } = useTheme()
const triangleBg = computed(() => global.name.value === 'light' ? triangleLight : triangleDark)
</script>

<script>
import { thongKeDoanhThuThang } from "@/api/statistic"

export default {
  data() {
    return {
      dataRevenue: {
        revenue: 0,
        month: 1,
      },
    }
  },
  created() {
    thongKeDoanhThuThang().then(res => {
      this.dataRevenue = res.data
    })
  },
}
</script>

<template>
  <VCard
    height="180"
    class="position-relative"
  >
    <VCardTitle>
      <h3 style="text-align: center">
        {{`Doanh thu tháng ${dataRevenue.month} này! 🎉`}}
      </h3>
    </VCardTitle>
    <VCardText>
      <h1 class="text-center mt-2 text-primary">
        {{ formatPrice(dataRevenue.revenue) }}
      </h1>
      <div style="display: flex; justify-content: center; margin-top: 1rem">
        <VBtn>Chi tiết doanh thu</VBtn>
      </div>
    </VCardText>

    <!-- Triangle Background -->
<!--    <VImg-->
<!--      :src="triangleBg"-->
<!--      class="triangle-bg flip-in-rtl"-->
<!--    />-->

<!--    &lt;!&ndash; Trophy &ndash;&gt;-->
<!--    <VImg-->
<!--      :src="trophy"-->
<!--      class="trophy"-->
<!--    />-->
  </VCard>
</template>

<style lang="scss">
@use "@layouts/styles/mixins" as layoutsMixins;

.v-card .triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.v-card .trophy {
  position: absolute;
  inline-size: 4.9375rem;
  inset-block-end: 2rem;
  inset-inline-end: 2rem;
}
</style>
