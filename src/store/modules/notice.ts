import { ElMessage } from 'element-plus'
import useApi from '@/api/modules/oj-home.ts'

const useNoticeStore = defineStore(
  'notice',
  () => {
    // 公告数据
    const noticeForm = ref({
      total: 0,
      notices: [],
    })
    // 获取公告
    async function getNotices(data: {
      page: number
      pageSize: number
    }) {
      await useApi.getNotices(data).then((res) => {
        noticeForm.value.notices = res.data.rows
        noticeForm.value.total = res.data.total
      })
    }
    // 删除公告
    async function deleteNotice(data: {
      id: number
      pageForm: any
    }) {
      await useApi.deleteNotice({ id: data.id })
      ElMessage.success('删除成功')
      setTimeout(() => {
        getNotices(data.pageForm)
      }, 500)
    }
    // 新增公告
    async function createNotice(data: {
      title: string
      content: string
    }) {
      await useApi.createNotice(data)
    }
    // 修改公告
    async function updateNotice(data: {
      id: number
      title: string
      content: string
    }) {
      await useApi.updateNotice(data)
    }
    return {
      noticeForm,
      getNotices,
      deleteNotice,
      createNotice,
      updateNotice,
    }
  },
)

export default useNoticeStore
