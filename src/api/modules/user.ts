import proxy from '../index'

export default {
  // 登录
  login: (data: {
    account: string
    password: string
  }) => proxy.post('auth/login', data, {
    baseURL: '/proxy/',
  }),

  // 分页查询用户
  getUsers: (data: {
    searchStr: string
    page: number
    pageSize: number
  }) => proxy.get('/user', {
    params: data,
  }, {
    baseURL: '/proxy/',
  }),

  // 重置密码
  resetPassword: (data: {
    userId: number
  }) => proxy.post('/user/resetPassword', data, {
    baseURL: '/proxy/',
  }),

  // 获取用户角色
  getUserRoles: (data: {
    userId: number
  }) => proxy.post('/role/user', data, {
    baseURL: '/proxy/',
  }),

  // 获取权限
  permission: () => proxy.get('user/permission', {
    baseURL: '/mock/',
  }),

  // 修改用户基本信息
  updateUserBaseInfo: (data: {
    userId: number
    account: string
    nickname: string
  }) => proxy.post('/user/update', data, {
    baseURL: '/proxy/',
  }),
}
