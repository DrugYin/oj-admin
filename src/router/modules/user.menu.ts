import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/user_menu',
  component: Layout,
  redirect: '/user_menu',
  name: 'user_menu',
  meta: {
    title: '用户管理',
    icon: 'i-heroicons-solid:menu-alt-3',
  },
  children: [
    {
      path: 'users',
      name: 'users',
      component: () => import('@/views/user_menu/users/index.vue'),
      meta: {
        title: '用户管理',
      },
    },
    {
      path: 'roles',
      name: 'roles',
      component: () => import('@/views/user_menu/roles/index.vue'),
      meta: {
        title: '角色管理',
      },
    },
  ],
}

export default routes
