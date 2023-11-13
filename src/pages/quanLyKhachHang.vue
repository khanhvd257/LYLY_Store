<template>
<VCard style="padding: 16px;" title="QUẢN LÝ KHÁCH HÀNG">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <div style="width: 300px;">
        <VTextField  density="compact" label="Tên khách hàng" clearable append-inner-icon="mdi-magnify"/>
      </div>
   
    </div>
    <VDataTable 
      :headers="header"
      :items="khachHangArr"
   >
   <template v-slot:item.avatar="{item}">
        <img class="img-product" :src="item.raw.avatar" height="60" width="60" alt="">
      </template>
      
    </VDataTable>
</VCard>
</template>

<script>
import { getCustomer } from '@/api/product';
import { VDataTable } from 'vuetify/labs/VDataTable';

export default {

    name: "KhachHang",
    components: {
    VDataTable,
  },
  created(){
    this.getDataKHang()
  },
    data() {
        return {
          header: [
        {
          title: 'Tên khách hàng',
          align: 'start',
          sortable: false,
          key: 'name',
          width: 200,
        },
        { title: 'Ảnh đại diện', key: 'avatar', slot: 'avatar', width: 200 },
        { title: 'Số điện thoại', key: 'phone' },
        { title: 'Email', key: 'email' },
        { title: 'Địa chỉ', key: 'address', align: 'center', width: 120 },
      ],
      searchForm: {
        category_id: [],
        name: '',
      },
      khachHangArr: [],
        };
    },

    
    components: { VDataTable },
    methods:{
      getDataKHang(){
        getCustomer().then(res=>
        {
          this.khachHangArr = res.data
        }
        )
      }
    }
}

</script>
