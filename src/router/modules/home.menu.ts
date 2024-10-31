import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/home_menu',
  component: Layout,
  redirect: '/home_menu',
  name: 'home_menu',
  meta: {
    title: 'OJ首页管理',
    icon: 'i-heroicons-solid:menu-alt-3',
  },
  children: [
    {
      path: 'notice',
      name: 'notice',
      component: () => import('@/views/home_menu/notice/index.vue'),
      meta: {
        title: '公告管理',
      },
    },
    {
      path: 'carousel',
      name: 'carousel',
      component: () => import('@/views/home_menu/carousel/index.vue'),
      meta: {
        title: '首页轮播图管理',
      },
    },
  ],
}

export default routes
