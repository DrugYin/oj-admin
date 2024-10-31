import api from '../index2.ts'
import proxy from '../index.ts'

export default {
  // 获取提交数据
  getSubmitsData: (data: {
    searchProblemValue: string
    searchUserValue: string
    page: number
    pageSize: number
  }) => api.get('/submission', {
    params: data,
  }, {
    baseURL: '/api/',
  }),
  // 通过用户id获取用户提交数据
  getSubmitsDataByUserId: (data: {
    searchUserId: number
    page: number
    pageSize: number
  }) => api.get('/submission/getSubmitsById', {
    params: data,
  }, {
    baseURL: '/api/',
  }),
  // 删除提交数据
  deleteSubmitsData: (data: {
    ids: any
  }) => proxy.post('/submission/delete', data, {
    baseURL: '/proxy/',
  }),
  // 获取每日提交数据
  getDailySubmitRecord: () => proxy.get('/submission/dailyRecord', {
    baseURL: '/proxy/',
  }),
  // 获取所有提交数据
  getAllSubmitsData: () => proxy.get('/submission/record', {
    baseURL: '/proxy/',
  }),
}
