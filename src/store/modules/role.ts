import { ElNotification } from 'element-plus'
import useApi from '@/api/modules/role.ts'

const useRoleStore = defineStore(
  'role',
  () => {
    // 分页查询表
    const pageForm = ref({
      searchStr: '',
      page: 1,
      pageSize: 10,
    })
    // 角色信息表
    const roleForm = ref({
      data: [],
      total: 0,
    })
    const roleList = ref([])
    // 获取角色数据
    async function getRoles() {
      useApi.getRoles(pageForm.value).then((res) => {
        roleForm.value.data = res.data.rows
        roleForm.value.total = res.data.total
      })
    }
    async function getAllRole() {
      const res = await useApi.getAllRole()
      roleList.value = res.data
    }
    // 更新角色状态
    async function updateRoleStatus(data: {
      id: number
      status: boolean
    }) {
      useApi.updateStatus(data).then((res) => {
        if (res.code === 0) {
          ElNotification.success({
            title: '成功',
            message: data.status ? '启用成功' : '禁用成功',
            offset: 100,
          })
        }
        setTimeout(() => {
          getRoles()
        }, 500)
      })
    }
    // 删除角色
    async function deleteRole(id: number) {
      useApi.deleteRole({ id }).then((res) => {
        if (res.code === 0) {
          ElNotification.success({
            title: '成功',
            message: '删除成功',
            offset: 100,
          })
        }
        setTimeout(() => {
          getRoles()
        })
      })
    }
    // 创建角色
    async function createRole(data: {
      name: string
      code: string
    }) {
      useApi.createRole(data).then((res) => {
        if (res.code === 0) {
          ElNotification.success({
            title: '成功',
            message: `角色${data.name}创建成功`,
            offset: 100,
          })
        }
        setTimeout(() => {
          getRoles()
        }, 500)
      })
    }
    // 更新角色
    async function updateRole(data: {
      id: number
      name: string
      code: string
    }) {
      useApi.updateRole(data).then((res) => {
        if (res.code === 0) {
          ElNotification.success({
            title: '成功',
            message: `角色${data.name}更新成功`,
            offset: 100,
          })
        }
        setTimeout(() => {
          getRoles()
        }, 500)
      })
    }
    // 更新用户角色
    async function updateUserRole(data: {
      userId: number
      roleIds: any
    }) {
      useApi.updateUserRole(data).then((res) => {
        if (res.code === 0) {
          ElNotification.success({
            title: '成功',
            message: '更新用户角色成功',
            offset: 100,
          })
        }
      })
    }
    return {
      pageForm,
      roleForm,
      roleList,
      getRoles,
      getAllRole,
      updateRoleStatus,
      deleteRole,
      createRole,
      updateRole,
      updateUserRole,
    }
  },
)

export default useRoleStore
