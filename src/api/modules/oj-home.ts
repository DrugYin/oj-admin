import proxy from '../index.ts'
import api from '../index2.ts'

export default {
  // 获取轮播图数据
  getCarouselList: () => api.get('/carousel', {
    baseURL: '/api/',
  }),
  // 通过id删除轮播图
  deleteCarouselById: (data: {
    id: number
  }) => proxy.post('/carousel/delete', data, {
    baseURL: '/proxy/',
  }),
  // 更新轮播图
  updateCarousel: (data: {
    id: number
    title: string
    image: File
  }) => proxy.post('/carousel/update', data, {
    baseURL: '/proxy/',
  }),
  // 添加轮播图
  uploadCarousel: (data: {
    title: string
    image: File
  }) => proxy.post('/carousel/upload', data, {
    baseURL: '/proxy/',
  }),
  // 获取公告
  getNotices: (data: {
    page: number
    pageSize: number
  }) => api.get('/notice', {
    params: data,
  }, {
    baseURL: '/api/',
  }),
  // 删除公告
  deleteNotice: (data: {
    id: number
  }) => proxy.post('/notice/delete', data, {
    baseURL: '/proxy/',
  }),
  // 新增公告
  createNotice: (data: {
    title: string
    content: string
  }) => proxy.post('/notice/create', data, {
    baseURL: '/proxy/',
  }),
  // 修改公告
  updateNotice: (data: {
    id: number
    title: string
    content: string
  }) => proxy.post('notice/update', data, {
    baseURL: '/proxy/',
  }),
}
