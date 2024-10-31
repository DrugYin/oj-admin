import { ElNotification } from 'element-plus'
import useApi from '@/api/modules/languages.ts'

const useLanguageStore = defineStore(
  'language',
  () => {
    // 语言列表
    const languageList = ref([])
    // 获取语言列表
    function getLanguageList() {
      useApi.getLanguageList().then((res) => {
        languageList.value = res.data.languages
      })
    }
    // 添加语言
    function createLanguage(data: {
      label: string
      value: number
      enable: boolean
    }) {
      useApi.createLanguage(data).then((res) => {
        if (res.code === 0) {
          ElNotification.success({
            title: '成功',
            message: `\"${data.label}\"添加成功`,
            offset: 100,
          })
        }
      })
      setTimeout(() => {
        getLanguageList()
      }, 500)
    }
    // 更新语言
    function updateLanguage(data: {
      id: number
      label: string
      value: number
      enable: boolean
    }) {
      useApi.updateLanguage(data).then((res) => {
        if (res.code === 0) {
          ElNotification.success({
            title: '成功',
            message: `\"${data.label}\"更新成功`,
            offset: 100,
          })
        }
      })
      setTimeout(() => {
        getLanguageList()
      }, 500)
    }
    // 删除语言
    function deleteLanguage(data: {
      id: number
    }) {
      useApi.deleteLanguage(data).then((res) => {
        if (res.code === 0) {
          ElNotification.success({
            title: '成功',
            message: `删除成功`,
            offset: 100,
          })
        }
      })
      setTimeout(() => {
        getLanguageList()
      }, 500)
    }
    return {
      languageList,
      getLanguageList,
      createLanguage,
      updateLanguage,
      deleteLanguage,
    }
  },
)

export default useLanguageStore
