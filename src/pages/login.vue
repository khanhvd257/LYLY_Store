<script setup>
import { useTheme } from 'vuetify'
import logo from '@images/logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'


const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)

</script>
<script>
import { login } from "@/api"
import router from "@/router"

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        message: '',
        remember: false,
      },
      error: false,
    }
  },
  mounted() {
    if (localStorage.getItem('access_token')) {
      router.push("/dashboard")
    }
  },
  methods: {
    handleSubmit() {
      debugger
      login(this.loginForm).then(res => {
        const role = res.data.role
        if (role == 0) {
          this.message = 'Không có quyền truy cập trang quản trị'
          this.error = true
        } else {
          localStorage.setItem('access_token', res.data.token)

          this.error = false
          router.push("/dashboard")
        }
      }).catch(err => {
        this.message = 'Sai thông tin tài khoản hoặc mật khẩu'
        this.error = true
      })
    },
  },
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo"/>
          </div>
        </template>
        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          LYLY Store
        </VCardTitle>
      </VCardItem>

      <!--      <VCardText class="pt-2">-->
      <!--        <h5 class="text-h5 font-weight-semibold mb-1">-->
      <!--          Chào mừng bạn đến với trang quản trị của LYLY Store! 👋🏻-->
      <!--        </h5>-->
      <!--        <p class="mb-0">-->
      <!--          Vui lòng đăng nhập trước khi bắt đầu-->
      <!--        </p>-->
      <!--      </VCardText>-->

      <VCardText>
        <VForm>
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="loginForm.username"
                label="Tên đăng nhập"
                type="text"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="loginForm.password"
                label="Mật khẩu"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <VAlert style="margin-top: 6px" color="error" v-if="error" :text="message"/>
              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="loginForm.remember"
                  label="Ghi nhớ đăng nhập"
                />

                <a
                  class="ms-2 mb-1"
                  href="javascript:void(0)"
                >
                  Quên mật khẩu?
                </a>
              </div>

              <!-- login button -->
              <VBtn
                block
                @click="handleSubmit"
              >
                Đăng nhập
              </VBtn>
            </VCol>

            <!-- create account -->
            <!--            <VCol-->
            <!--              cols="12"-->
            <!--              class="text-center text-base"-->
            <!--            >-->
            <!--              <span>New on our platform?</span>-->
            <!--              <RouterLink-->
            <!--                class="text-primary ms-2"-->
            <!--                to="/register"-->
            <!--              >-->
            <!--                Create an account-->
            <!--              </RouterLink>-->
            <!--            </VCol>-->

            <!--            <VCol-->
            <!--              cols="12"-->
            <!--              class="d-flex align-center"-->
            <!--            >-->
            <!--              <VDivider />-->
            <!--              <span class="mx-4">or</span>-->
            <!--              <VDivider />-->
            <!--            </VCol>-->

            <!-- auth providers -->
            <!--            <VCol-->
            <!--              cols="12"-->
            <!--              class="text-center"-->
            <!--            >-->
            <!--              <AuthProvider />-->
            <!--            </VCol>-->
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "@core/scss/pages/page-auth.scss";
</style>
