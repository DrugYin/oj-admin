import Message from 'vue-m-message'
import { ElNotification } from 'element-plus'
import useApi from '@/api/modules/problem.ts'
import useTagsStore from '@/store/modules/tags.ts'

const useProblemStore = defineStore(
  'problem',
  () => {
    const router = useRouter()
    const tagStore = useTagsStore()
    // 题目数据
    const problemForm = ref({
      data: [],
      total: 0,
    })
    // 题目id列表
    const problemIds = ref([])
    // 题目详细数据
    const problemDetailForm = ref({})
    // 题目测试样例数据
    const problemTestForm = ref({
      json: '',
      data: [],
    })
    const problemTestSampleForm = ref({
      json: '',
      data: [],
    })
    // 获取所有题目
    function getProblems(data: {
      searchStr: string
      page: number
      pageSize: number
    }) {
      useApi.getProblems(data).then((res) => {
        problemForm.value.data = res.data.rows
        problemForm.value.total = res.data.total
        problemIds.value = []
        res.data.rows.forEach((item: any) => {
          problemIds.value.push(item.id)
        })
        tagStore.getProblemTags({ problemIds: problemIds.value })
      })
    }
    // 设置题目是否公开
    function setVisible(data: {
      id: number
      visible: boolean
    }) {
      useApi.setVisible(data).then((res) => {
        if (res.code === 0) {
          Message.success('修改成功')
        }
      })
    }
    // 删除题目
    function deleteProblem(data: {
      id: number
    }) {
      useApi.deleteProblem(data).then((res) => {
        if (res.code === 0) {
          Message.success('删除成功')
        }
      })
    }
    // 获取题目详细信息
    function getProblemDetail(data: {
      problemId: number
    }) {
      useApi.getProblemDetail(data).then((res) => {
        const JsonArr = JSON.parse(res.data.testSample)
        problemTestSampleForm.value.data = JsonArr
        problemTestSampleForm.value.json = JSON.stringify(JsonArr, null, 2)
        problemDetailForm.value = res.data
      })
      useApi.getProblemTest(data).then((res) => {
        const JsonArr = JSON.parse(res.data)
        problemTestForm.value.data = JsonArr
        problemTestForm.value.json = JSON.stringify(JsonArr, null, 2)
      })
    }
    // 创建题目
    function createProblem() {
      useApi.createProblem({
        title: problemDetailForm.value.title,
        author: problemDetailForm.value.author,
        customId: problemDetailForm.value.customId,
        description: problemDetailForm.value.description,
        inputDescription: problemDetailForm.value.inputDescription,
        outputDescription: problemDetailForm.value.outputDescription,
        testSample: problemTestSampleForm.value.json,
        testData: problemTestForm.value.json,
        limitTime: problemDetailForm.value.limitTime,
        limitMemory: problemDetailForm.value.limitMemory,
      }).then((res) => {
        if (res.code === 0) {
          ElNotification.success({
            title: '完成',
            message: `题目\"${problemDetailForm.value.title}\"创建成功`,
            offset: 100,
          })
          router.push('/problem_menu/problems')
        }
        else {
          ElNotification.error({
            title: '失败',
            message: res.message,
            offset: 100,
          })
        }
      })
    }
    // 更新题目
    function updateProblem() {
      useApi.updateProblem({
        id: problemDetailForm.value.id,
        title: problemDetailForm.value.title,
        author: problemDetailForm.value.author,
        customId: problemDetailForm.value.customId,
        description: problemDetailForm.value.description,
        inputDescription: problemDetailForm.value.inputDescription,
        outputDescription: problemDetailForm.value.outputDescription,
        testSample: problemTestSampleForm.value.json,
        testData: problemTestForm.value.json,
        limitTime: problemDetailForm.value.limitTime,
        limitMemory: problemDetailForm.value.limitMemory,
      }).then((res) => {
        if (res.code === 0) {
          ElNotification.success({
            title: '完成',
            message: `题目\"${problemDetailForm.value.title}\"修改成功`,
            offset: 100,
          })
          router.push('/problem_menu/problems')
        }
        else {
          ElNotification.error({
            title: '失败',
            message: res.message,
            offset: 100,
          })
        }
      })
    }
    return {
      problemForm,
      problemIds,
      problemDetailForm,
      problemTestForm,
      problemTestSampleForm,
      getProblems,
      setVisible,
      deleteProblem,
      getProblemDetail,
      createProblem,
      updateProblem,
    }
  },
)

export default useProblemStore
