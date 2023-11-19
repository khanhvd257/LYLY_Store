import { requireAuth } from "@/plugins/auth"
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard', beforeEnter: requireAuth },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      beforeEnter: requireAuth,
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'order',
          component: () => import('../pages/order.vue'),
        },
        {
          path: 'doanh-thu',
          component: () => import('../pages/doanhThu.vue'),
        },
        {
          path: 'khach-hang',
          component: () => import('../pages/quanLyKhachHang.vue'),
        },
        {
          path: 'danhgiasp',
          component: () => import('../pages/quanlydanhgiasp.vue'),
        },
        {
          path: 'category',
          component: () => import('../pages/category/CategoryList.vue'),
        },
        {
          path: 'category/add',
          component: () => import('../pages/category/categoryCreate.vue'),
        },

        {
          path: 'products',
          component: () => import('../pages/products.vue'),
        },
        {
          path: 'khachHang',
          component: () => import('../pages/quanLyKhachHang.vue'),
        },
        {
          path: 'productDetail/:id',
          props:true,
          component: () => import('../pages/product/productDetail.vue'),
        },
        {
          path: 'products/customize',
          component: () => import('../pages/productCreate.vue'),
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
        {
          path: 'add',
          component: () => import('../pages/productCreate.vue'),
        },
        {
          path: 'order-products',
          component : () => import('../pages/order.vue')
        },
      ],
    },
    {
      path: '/login',
      component: () => import('../pages/login.vue'),
    },
    {
      path: '/register',
      component: () => import('../pages/register.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../pages/[...all].vue'),
    },
  ],
})

export default router
