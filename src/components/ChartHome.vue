<template>
  <VCard style="padding: 8px 16px">
    <Bar
      ref="chart"
      v-if="show"
      :options="chartOptions"
      :data="chartData"
    />
  </VCard>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { thongKeDoanhThuNam, thongKeThang } from "@/api/statistic"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'ChartHome',
  components: { Bar },
  mounted() {
    this.getData()
  },

  data() {
    return {
      chartData: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
          {
            label: 'Doanh thu',
            backgroundColor: '#5a96e8',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            color: '#01a9fd',
            text: "BIỂU ĐỒ DOANH THU 12 THÁNG TRONG NĂM 2023",
          },
        },
      },
      show: false,
    }
  },
  methods: {
    getData() {
      thongKeDoanhThuNam().then(res => {
        for (let i = 0; i < res.data.length; i++) {
          let month = res.data[i].month
          this.chartData.datasets[0].data[month - 1] = Number(res.data[i].total_amount)
        }
        this.show = true
      })
    },
  },
}
</script>
