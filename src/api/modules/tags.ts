import api from '../index2.ts'
import proxy from '../index.ts'

export default {
  // 获取所有标签
  getTags: (data: {
    searchStr: string
    page: number
    pageSize: number
  }) => api.get('/tags', {
    params: data,
  }, {
    baseURL: '/api/',
  }),
  getAllTags: () => proxy.get('/tags', {
    baseURL: '/proxy/',
  }),
  // 删除标签
  deleteTag: (data: {
    id: number
  }) => proxy.post('/tags/delete', data, {
    baseURL: '/proxy/',
  }),
  // 添加标签
  createTag: (data: {
    name: string
    color: string
  }) => proxy.post('tags/create', data, {
    baseURL: '/proxy/',
  }),
  // 更新标签
  updateTag: (data: {
    id: number
    name: string
    color: string
  }) => proxy.post('tags/update', data, {
    baseURL: '/proxy/',
  }),
  // 获取题目标签
  getProblemTags: (data: {
    problemIds: any
  }) => api.post('tags/problemTags', data, {
    baseURL: '/api/',
  }),
  // 更新题目标签数据
  updateProblemTags: (data: {
    problemId: number
    tagIds: any
  }) => proxy.post('tags/problemTags/update', data, {
    baseURL: '/proxy/',
  }),
}
