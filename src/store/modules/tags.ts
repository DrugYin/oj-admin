import { ElNotification } from 'element-plus'
import useApi from '@/api/modules/tags.ts'

const useTagsStore = defineStore(
  'tags',
  () => {
    // 标签列表
    const tagsForm = ref({
      data: [],
      total: 0,
    })
    const tagsList = ref([])
    // 题目标签数据
    const problemTagsForm = ref({})
    // 获取所有标签
    function getTagsList(data: {
      searchStr: string
      page: number
      pageSize: number
    }) {
      useApi.getTags(data).then((res) => {
        tagsForm.value.data = res.data.rows
        tagsForm.value.total = res.data.total
      })
    }
    function getAllTags() {
      useApi.getAllTags().then((res) => {
        tagsList.value = res.data
      })
    }
    // 删除标签
    function deleteTag(data: {
      id: number
    }) {
      useApi.deleteTag(data).then((res) => {
        if (res.code === 0) {
          ElNotification.success({
            title: '成功',
            message: `删除成功`,
            offset: 100,
          })
        }
      })
    }
    // 添加标签
    function createTag(data: {
      name: string
      color: string
    }) {
      useApi.createTag(data).then((res) => {
        if (res.code === 0) {
          ElNotification.success({
            title: '成功',
            message: `标签\"${data.name}\"创建成功`,
            offset: 100,
          })
        }
      })
    }
    // 更新标签
    function updateTag(data: {
      id: number
      name: string
      color: string
    }) {
      useApi.updateTag(data).then((res) => {
        if (res.code === 0) {
          ElNotification.success({
            title: '成功',
            message: `标签\"${data.name}\"更新成功`,
            offset: 100,
          })
        }
      })
    }
    // 更新题目标签
    function updateProblemTags(data: {
      problemId: number
      tagIds: any
    }) {
      useApi.updateProblemTags(data).then((res) => {
        if (res.code === 0) {
          ElNotification.success({
            title: '成功',
            message: `题目标签修改成功`,
            offset: 100,
          })
        }
      })
    }
    // 获取题目标签
    function getProblemTags(data: {
      problemIds: any
    }) {
      useApi.getProblemTags(data).then((res) => {
        problemTagsForm.value = res.data
      })
    }
    return {
      tagsForm,
      tagsList,
      problemTagsForm,
      getTagsList,
      getAllTags,
      deleteTag,
      createTag,
      updateTag,
      updateProblemTags,
      getProblemTags,
    }
  },
)

export default useTagsStore
