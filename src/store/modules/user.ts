import { ElNotification } from 'element-plus'
import useSettingsStore from './settings'
import useRouteStore from './route'
import useMenuStore from './menu'
import router from '@/router'
import apiUser from '@/api/modules/user'

const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const settingsStore = useSettingsStore()
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()

    const account = ref(localStorage.account ?? '')
    const token = ref(localStorage.token ?? '')
    const avatar = ref(localStorage.avatar ?? '')
    const permissions = ref<string[]>([])
    const isLogin = computed(() => {
      if (token.value) {
        return true
      }
      return false
    })
    const usersForm = ref({
      data: [],
      total: 0,
    })
    const userRoleList = ref([])

    // 登录
    async function login(data: {
      account: string
      password: string
    }) {
      const res = await apiUser.login(data)
      localStorage.setItem('account', res.data.account)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('avatar', res.data.avatar)
      account.value = res.data.account
      token.value = res.data.token
      avatar.value = res.data.avatar
    }
    // 登出
    async function logout(redirect = router.currentRoute.value.fullPath) {
      localStorage.removeItem('account')
      localStorage.removeItem('token')
      localStorage.removeItem('avatar')
      account.value = ''
      token.value = ''
      avatar.value = ''
      permissions.value = []
      routeStore.removeRoutes()
      menuStore.setActived(0)
      router.push({
        name: 'login',
        query: {
          ...(redirect !== settingsStore.settings.home.fullPath && router.currentRoute.value.name !== 'login' && { redirect }),
        },
      })
    }
    // 获取权限
    async function getPermissions() {
      const res = await apiUser.permission()
      permissions.value = res.data.permissions
    }
    // 分页查询用户
    async function getUsers(data: {
      searchStr: string
      page: number
      pageSize: number
    }) {
      const res = await apiUser.getUsers(data)
      usersForm.value.data = res.data.rows
      usersForm.value.total = res.data.total
    }
    // 重置密码
    async function resetPassword(data: {
      userId: number
    }) {
      const res = await apiUser.resetPassword(data)
      if (res.code === 0) {
        ElNotification.success({
          title: '成功',
          message: '重置密码成功, 重置密码为12345678, 请尽快提醒用户修改',
          offset: 100,
        })
      }
    }
    // 获取用户角色
    async function getUserRole(data: {
      userId: number
    }) {
      const res = await apiUser.getUserRoles(data)
      userRoleList.value = res.data
    }
    // 修改用户基本信息
    async function updateUserBaseInfo(data: {
      userId: number
      account: string
      nickname: string
    }) {
      const res = await apiUser.updateUserBaseInfo(data)
      if (res.code === 0) {
        ElNotification.success({
          title: '成功',
          message: `用户信息修改成功`,
          offset: 100,
        })
      }
    }

    return {
      account,
      token,
      avatar,
      permissions,
      isLogin,
      usersForm,
      userRoleList,
      login,
      logout,
      getPermissions,
      getUsers,
      resetPassword,
      getUserRole,
      updateUserBaseInfo,
    }
  },
)

export default useUserStore
