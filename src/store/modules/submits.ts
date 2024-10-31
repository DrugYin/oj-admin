import { ElNotification } from 'element-plus'
import useApi from '@/api/modules/submits.ts'

const useSubmitsStore = defineStore(
  'submits',
  () => {
    // 提交数据
    const submitsForm = ref({
      data: [],
      total: 0,
    })
    // 每日提交数据
    const dailySubmitRecord = ref({})
    // 所有提交数据
    const allSubmitsRecord = ref({})
    // 获取提交数据
    async function getSubmitsList(data: {
      searchProblemValue: string
      searchUserValue: string
      page: number
      pageSize: number
    }) {
      useApi.getSubmitsData(data).then((res) => {
        submitsForm.value.data = res.data.rows
        submitsForm.value.total = res.data.total
      })
    }
    // 通过用户id获取用户提交数据
    async function getSubmitsDataById(data: {
      searchUserId: number
      page: number
      pageSize: number
    }) {
      useApi.getSubmitsDataByUserId(data).then((res) => {
        submitsForm.value.data = res.data.rows
        submitsForm.value.total = res.data.total
      })
    }
    // 删除提交数据
    async function deleteSubmitsData(data: {
      ids: any
    }) {
      useApi.deleteSubmitsData(data).then((res) => {
        if (res.code === 0) {
          ElNotification.success({
            title: '成功',
            message: `删除成功`,
            offset: 100,
          })
        }
      })
    }
    // 获取每日提交数据
    async function getDailySubmitRecord() {
      useApi.getDailySubmitRecord().then((res) => {
        dailySubmitRecord.value = res.data
      })
    }
    // 获取所有提交数据
    async function getAllSubmitsRecord() {
      useApi.getAllSubmitsData().then((res) => {
        allSubmitsRecord.value = res.data
      })
    }
    return {
      submitsForm,
      dailySubmitRecord,
      allSubmitsRecord,
      getSubmitsList,
      deleteSubmitsData,
      getSubmitsDataById,
      getAllSubmitsRecord,
      getDailySubmitRecord,
    }
  },
)

export default useSubmitsStore
