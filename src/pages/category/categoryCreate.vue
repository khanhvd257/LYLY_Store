<template>
  <VCard title="THÊM MỚI DANH MỤC">
    <div class="edit-text">
      <VForm fast-fail>
        <VRow>
          <VCol cols="2">
            <VFileInput
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Thêm ảnh danh mục"
              prepend-icon="mdi-camera"
              variant="underlined"
              label="Ảnh danh mục"
              @update:modelValue="handleUploadFile"
            ></VFileInput>
            <img v-if="formCategory.image_url" class="product-image" :src="formCategory.image_url" alt="">
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" sm="6">
            <VTextField
              label="Tên danh mục"
              id="product-name"
              type="text"
              v-model="formCategory.name"
              placeholder="Tên danh mục"
              persistent-placeholder
            />
          </VCol>
          <VCol cols="12" sm="6">
            <VTextField
              label="Mô tả ngắn danh mục"
              type="text"
              v-model="formCategory.description"
              placeholder="Mô tả danh mục"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VForm>
      <VRow>
        <VCol>
          <v-switch
            class="mt-0 ms-2"
            color="primary"
            density="compact"
            hide-details
            true-value="1"
            false-value="0"
            v-model="formCategory.status"
            label="Kích hoạt danh mục"
          ></v-switch>
        </VCol>
      </VRow>
      <VRow class="mb-2">
        <VCol>
          <VBtn :loading="loading" @click="handleSaveCategory">
            Lưu danh mục phẩm
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
import { createCategory } from "@/api/category"

export default {
  name: "categoryCreate",
  components: {
    editor,
  },
  data() {
    return {
      formCategory: {
        name: '',
        description: '',
        image_url: null,
        status: 1,
      },
      loading: false,
      fileImage: null,
      initEditor,
      categoryArr: [],
    }
  },

  methods: {

    handleSaveCategory() {
      let load = this.$loading.show()
      createCategory(this.formCategory).then(res => {
        this.$moshaToast('Thêm danh mục thành công',
          {
            type: 'success',
            transition: 'slide',
          })
        router.push('/category')
        load.hide()
      }).catch(
        e => {
          load.hide()
        },
      )
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
          this.formCategory.image_url = res.url
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
