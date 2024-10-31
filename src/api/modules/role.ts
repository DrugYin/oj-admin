import proxy from '../index.ts'

export default {
  // 获取角色数据
  getRoles: (data: {
    searchStr: string
    page: number
    pageSize: number
  }) => proxy.get('/role', {
    params: data,
  }, {
    baseURL: '/proxy/',
  }),
  getAllRole: () => proxy.get('/role/all', {
    baseURL: '/proxy/',
  }),
  // 更新状态
  updateStatus: (data: {
    id: number
    status: boolean
  }) => proxy.post('/role/changeStatus', data, {
    baseURL: '/proxy/',
  }),
  // 删除角色
  deleteRole: (data: {
    id: number
  }) => proxy.post('/role/delete', data, {
    baseURL: '/proxy/',
  }),
  // 添加角色
  createRole: (data: {
    name: string
    code: string
  }) => proxy.post('/role/create', data, {
    baseURL: '/proxy/',
  }),
  // 更新角色
  updateRole: (data: {
    id: number
    name: string
    code: string
  }) => proxy.post('/role/update', data, {
    baseURL: '/proxy/',
  }),
  // 更新用户角色
  updateUserRole: (data: {
    userId: number
    roleIds: any
  }) => proxy.post('/role/user/update', data, {
    baseURL: '/proxy/',
  }),
}
