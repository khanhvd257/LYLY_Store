<script setup>
import upgradeBannerDark from '@images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@images/pro/upgrade-banner-light.png'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import { useTheme } from 'vuetify'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

const vuetifyTheme = useTheme()

const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="mdi-menu" />
        </IconBtn>


        <VSpacer />

        <IconBtn class="me-2">
          <VIcon icon="mdi-bell-outline" />
        </IconBtn>

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink
        :item="{
          title: 'Trang chủ',
          icon: 'mdi-home-outline',
          to: '/dashboard',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Quản lý tài khoản',
          icon: 'mdi-account-cog-outline',
          to: '/account-settings',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Quản lý sản phẩm',
          icon: 'fluent-mdl2:product-variant',
          to: '/products',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Quản lý danh mục',
          icon: 'carbon:category',
          to: '/category',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Quản lý doanh thu',
          icon: 'game-icons:cash',
          to: '/doanh-thu',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Quản lý khách hàng',
          icon: 'game-icons:cash',
          to: '/khach-hang',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Quản lý đánh giá sản phẩm',
          icon: 'game-icons:cash',
          to: '/danhgiasp',
        }"
      />
    </template>


    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
