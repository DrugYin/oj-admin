import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/problem_menu',
  component: Layout,
  redirect: '/problem_menu',
  name: 'problem_menu',
  meta: {
    title: '题目管理',
    icon: 'i-heroicons-solid:menu-alt-3',
  },
  children: [
    {
      path: 'problems',
      name: 'problems',
      meta: {
        title: '题目管理',
      },
      children: [
        {
          path: '',
          component: () => import('@/views/problem_menu/problems/index.vue'),
          meta: {
            title: '题目列表',
            menu: false,
            breadcrumb: false,
          },
        },
        {
          path: 'new',
          name: 'newProblem',
          component: () => import('@/views/problem_menu/problems/new.vue'),
          meta: {
            title: '新建题目',
            menu: false,
            activeMenu: '/problems_menu/problems',
          },
        },
        {
          path: ':id',
          name: 'editProblem',
          component: () => import('@/views/problem_menu/problems/edit.vue'),
          meta: {
            title: '编辑题目',
            menu: false,
            activeMenu: '/problems_menu/problems',
          },
        },
      ],
    },
    {
      path: 'tags',
      name: 'tags',
      component: () => import('@/views/problem_menu/tags/index.vue'),
      meta: {
        title: '题目标签管理',
      },
    },
  ],
}

export default routes
