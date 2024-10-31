import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/submit_menu',
  component: Layout,
  redirect: '/submit_menu',
  name: 'submit_menu',
  meta: {
    title: '提交管理',
    icon: 'i-heroicons-solid:menu-alt-3',
  },
  children: [
    {
      path: 'submits',
      name: 'submits',
      meta: {
        title: '提交记录管理',
      },
      children: [
        {
          path: '',
          component: () => import('@/views/submit_menu/submits/index.vue'),
          meta: {
            title: '提交记录',
            menu: false,
            breadcrumb: false,
          },
        },
        {
          path: ':userId',
          name: 'userSubmits',
          component: () => import('@/views/submit_menu/submits/user/index.vue'),
          meta: {
            title: '用户提交记录',
            menu: false,
            activeMenu: '/submit_menu/submits',
          },
        },
      ],
    },
    {
      path: 'languages',
      name: 'languages',
      component: () => import('@/views/submit_menu/languages/index.vue'),
      meta: {
        title: '提交语言管理',
      },
    },
  ],
}

export default routes
