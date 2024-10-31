import proxy from '../index.ts'
import api from '../index2.ts'

export default {
  // 获取语言列表
  getLanguageList: () => api.get('/languages', {
    baseURL: '/api/',
  }),
  // 添加语言
  createLanguage: (data: {
    label: string
    value: number
    enable: boolean
  }) => proxy.post('languages/create', data, {
    baseURL: '/proxy/',
  }),
  // 更新语言
  updateLanguage: (data: {
    id: number
    label: string
    value: number
    enable: boolean
  }) => proxy.post('languages/update', data, {
    baseURL: '/proxy/',
  }),
  // 删除语言
  deleteLanguage: (data: {
    id: number
  }) => proxy.post('languages/delete', data, {
    baseURL: '/proxy/',
  }),
}
