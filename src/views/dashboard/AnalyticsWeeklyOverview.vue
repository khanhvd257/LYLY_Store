<template>

  <div style="height: 300px">
    <Line v-if="isShow" :data="dataLine" :options="options"/>
  </div>
  <div style="margin-top: 6px;">
    <h5>Thống kê theo sản phẩm bán chạy nhất</h5>
    <VSelect v-model="ProductIDSelected" density="compact" :items="products"
             item-title="name" item-value="id" @update:modelValue="handleChangeProduct"
    />
  </div>
</template>
<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { thongKeSanPham } from "@/api/statistic"
import { getTop5ProductBestSell } from "@/api/product"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export default {
  components: {
    Line,
  },
  created() {
    getTop5ProductBestSell().then(res => {
      this.products = res.data
      this.ProductIDSelected = res.data[0].id
      this.getData()
    })
  },
  data() {
    return {
      isShow: false,
      products: [],
      ProductIDSelected: '',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            fontSize: '16px',
            text: "BIỂU ĐỒ SỐ LƯỢNG SẢN PHẨM BÁN TRONG NĂM 2023",
            color: '#01a9fd',
          },
        },
      },
      dataLine: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
          {
            label: '',
            backgroundColor: '#f87979',
            data: [],
          },
        ],
      },
    }
  },
  methods: {
    handleChangeProduct() {
      this.getData()
    },
    getData() {
      this.isShow = false
      thongKeSanPham({ product_id: this.ProductIDSelected }).then(res => {
        this.dataLine.datasets[0].data = Object.values(res.data.product_overview)
        this.dataLine.datasets[0].label = res.data.product_name
        this.isShow = true
      })
    },
  },
}
</script>
