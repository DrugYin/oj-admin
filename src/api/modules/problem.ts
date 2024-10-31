import proxy from '../index.ts'
import api from '../index2.ts'

export default {
  // 获取所有题目
  getProblems: (data: {
    searchStr: string
    page: number
    pageSize: number
  }) => proxy.get('/problem', {
    params: data,
  }, {
    baseURL: '/proxy/',
  }),
  // 设置题目是否公开
  setVisible: (data: {
    id: number
    visible: boolean
  }) => proxy.post('/problem/setVisible', data, {
    baseURL: '/proxy/',
  }),
  // 删除题目
  deleteProblem: (data: {
    id: number
  }) => proxy.post('/problem/delete', data, {
    baseURL: '/proxy/',
  }),
  // 获取题目详细信息
  getProblemDetail: (data: {
    problemId: number
  }) => api.get(`/problem/${data.problemId}`, {
    baseURL: '/api/',
  }),
  // 获取题目测试数据
  getProblemTest: (data: {
    problemId: number
  }) => api.get(`/problem/${data.problemId}/getTestData`, {
    baseURL: '/api/',
  }),
  // 创建题目
  createProblem: (data: {
    title: string
    author: string
    customId: string
    description: string
    inputDescription: string
    outputDescription: string
    testSample: string
    testData: string
    limitTime: number
    limitMemory: number
  }) => proxy.post('/problem/create', data, {
    baseURL: '/proxy/',
  }),
  // 更新题目
  updateProblem: (data: {
    id: number
    title: string
    author: string
    customId: string
    description: string
    inputDescription: string
    outputDescription: string
    testSample: string
    testData: string
    limitTime: number
    limitMemory: number
  }) => proxy.post('/problem/update', data, {
    baseURL: '/proxy/',
  }),
}
