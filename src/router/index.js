import { createRouter, createWebHistory } from 'vue-router'
import { requireAuth } from "@/plugins/auth"

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
          path: 'doanh-thu',
          component: () => import('../pages/doanhThu.vue'),
        },
        {
          path: 'category',
          component: () => import('../pages/category/CategoryList.vue'),
        },
        {
          path: 'products',
          component: () => import('../pages/products.vue'),
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
