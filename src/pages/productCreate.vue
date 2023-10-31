<template>
  <VCard title="THÊM MỚI SẢN PHẨM">
    <div class="edit-text">
      <VForm fast-fail>
        <VRow>
          <VCol cols="2">
            <VFileInput
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Thêm ảnh sản phẩm"
              prepend-icon="mdi-camera"
              variant="underlined"
              label="Ảnh sản phẩm"
              @update:modelValue="handleUploadFile"
            ></VFileInput>
            <img v-if="formProduct.image_url" class="product-image" :src="formProduct.image_url" alt="">

          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" sm="6" class="form-item">
            <v-autocomplete
              :items="categoryArr"
              v-model="formProduct.category_id"
              color="blue-grey-lighten-2"
              item-title="name"
              label="Danh mục"
              item-value="id"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :prepend-avatar="item?.raw?.image_url"
                  :title="item?.raw?.name"
                  :subtitle="item?.raw?.description"
                ></v-list-item>
              </template>
            </v-autocomplete>
          </VCol>
          <VCol cols="12" sm="6">
            <VTextField
              label="Tên sản phẩm"
              id="product-name"
              type="text"
              v-model="formProduct.name"
              placeholder="Tên sản phẩm"
              persistent-placeholder
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" sm="6" class="form-item">
            <VTextField
              id="quantity"
              label="Số lượng"
              type="number"
              aria-valuemin="1"
              placeholder="Sô lượng"
              v-model="formProduct.quantity"
              persistent-placeholder
            />
          </VCol>
          <VCol cols="12" sm="6">
            <VTextField
              id="price"
              label="Giá sản phẩm"
              type="number"
              aria-valuemin="1"
              placeholder="Giá sản phẩm"
              v-model="formProduct.price"
              persistent-placeholder
            />
          </VCol>
        </VRow>


      </VForm>
      <VRow>
        <VCol cols="12">
          <label style="margin-left: 4px; margin-bottom: 16px" for="product-description">Mô tả sản phẩm</label>
          <editor
            id="product-description"
            ref="editor"
            v-model="formProduct.description"
            :init="{ ...initEditor, height: '500px' }"
            openXss
          ></editor>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <v-switch
            class="mt-0 ms-2"
            color="primary"
            density="compact"
            hide-details
            v-model="formProduct.status"
            label="Kích hoạt sản phẩm"
          ></v-switch>
        </VCol>
      </VRow>
      <VRow class="mb-2">
        <VCol>
          <VBtn :loading="loading" @click="handleSaveProduct">
            Lưu sản phẩm
          </VBtn>
        </VCol>
      </VRow>
    </div>
  </VCard>
</template>

<script>
import { initEditor } from "@/components/editor/config"
import editor from "@tinymce/tinymce-vue"
import { uploadFile } from "@/api"
import { createProduct, getCategory } from "@/api/product"
import router from "@/router"

export default {
  name: "productCreate",
  components: {
    editor,
  },
  data() {
    return {
      formProduct: {
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        image_url: null,
        status: false,
        category_id: '',
      },
      loading: false,
      fileImage: null,
      initEditor,
      categoryArr: [],
    }
  },
  created() {
    this.getDataCategory()
  },
  methods: {
    handleBack() {
      router.back()
    },
    handleSaveProduct() {
      let load = this.$loading.show()
      createProduct(this.formProduct).then(res => {
        this.$moshaToast('Thêm sản phẩm thành công',
          {
            type: 'success',
            transition: 'slide',
          })
        router.push('/products')
        load.hide()
      }).catch(
        e => {
          load.hide()

        },
      )
    },
    getDataCategory() {
      getCategory().then(res => {
        this.loading = false
        this.categoryArr = res.data
      }).catch((error) => {
        console.error('Error fetching data from API 1:', error)
      })
    },
    handleUploadFile(val) {
      console.log(val.length)
      if (val.length > 0) {
        this.$moshaToast('Upload ảnh thành công',
          {
            type: 'success',
            transition: 'slide',
            hideProgressBar: 'true',
            timeout: 2000,

          })
        const form = {
          'image': val[0],
        }
        uploadFile(form).then(res => {
          this.formProduct.image_url = res.url
        }).catch(e => {
          console.log(e)
        })
      }
    },
  },
}
</script>

<style scoped>
.edit-text {
  padding: 10px 16px;
}

.form-item {
  width: 50%;
}

.product-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin: 16px 40px;
  border-radius: 12px;
}
</style>
