<script setup lang="ts">
import { Check, Close, Delete } from '@element-plus/icons-vue'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import Message from 'vue-m-message'
import useLanguageStore from '@/store/modules/language.ts'
import useSubmitsStore from '@/store/modules/submits.ts'

defineOptions({
  name: 'SubmitsTable',
})

const props = withDefaults(
  defineProps<{
    showUser?: boolean
    userId?: number
  }>(),
  {
    showUser: true,
    userId: -1,
  },
)

const router = useRouter()

const submitsStore = useSubmitsStore()

const pageForm = ref({
  searchProblemValue: '',
  searchUserValue: '',
  searchUserId: props.userId,
  page: 1,
  pageSize: 15,
})

function getSubmitsList() {
  if (props.userId !== -1) {
    submitsStore.getSubmitsDataById(pageForm.value)
  }
  else {
    submitsStore.getSubmitsList(pageForm.value)
  }
}

getSubmitsList()

const languageStore = useLanguageStore()

languageStore.getLanguageList()

const submitDetailForm = reactive({
  code: '',
  userId: undefined,
  acNum: 0,
  caseNum: 0,
})

const showCode = ref(false)

function showCodeDetail(code, userId, acNum, caseNum) {
  showCode.value = true
  submitDetailForm.code = `\`\`\`\n${code}\n\`\`\``
  submitDetailForm.acNum = acNum
  submitDetailForm.caseNum = caseNum
  submitDetailForm.userId = userId
}

const chooseList = ref([])

function handleSelect(selection) {
  chooseList.value = selection.map(item => item.id)
}

function handleDelete() {
  if (chooseList.value.length === 0) {
    Message.warning('请选择要删除的提交')
    return
  }
  submitsStore.deleteSubmitsData({ ids: chooseList.value })
  setTimeout(() => {
    getSubmitsList()
    chooseList.value = []
  }, 500)
}

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <el-card>
      <template #header>
        <el-form inline>
          <el-form-item>
            <el-input
              v-model="pageForm.searchProblemValue"
              placeholder="输入题目标题/编号搜索"
              clearable
              @keyup.enter="getSubmitsList"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="pageForm.searchUserValue"
              placeholder="输入提交用户搜索"
              clearable
              @keyup.enter="getSubmitsList"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="getSubmitsList">
              搜索
            </el-button>
          </el-form-item>
        </el-form>
      </template>
      <el-table
        :data="submitsStore.submitsForm.data"
        :default-sort="{ prop: 'submitTime', order: 'descending' }"
        @selection-change="handleSelect"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="题目">
          <template #default="scope">
            <div @click="open(`http://localhost:8001/problemset/detail/${scope.row.problemId}`)">
              {{ `${scope.row.customId}:${scope.row.problemTitle}` }}
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="props.showUser" label="提交用户">
          <template #default="scope">
            <div @click="router.push({ name: 'userSubmits', params: { userId: scope.row.userId } })">
              {{ scope.row.username }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="submitTime" label="提交时间" width="180" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="scope">
            <div @click="showCodeDetail(scope.row.code, scope.row.userId, scope.row.acNumber, scope.row.caseNumber)">
              <div v-if="scope.row.status === 100">
                <el-tag type="success">
                  {{ '答案正确' }}
                </el-tag>
              </div>
              <div v-else-if="scope.row.status === -1">
                <el-tag type="info">
                  {{ '编译错误' }}
                </el-tag>
              </div>
              <div v-else-if="scope.row.status === 101">
                <el-tag type="danger">
                  {{ '答案错误' }}
                </el-tag>
              </div>
              <div v-else-if="scope.row.status === 102">
                <el-tag type="warning">
                  {{ '运行超时' }}
                </el-tag>
              </div>
              <div v-else-if="scope.row.status === 0">
                <el-tag type="primary">
                  {{ '等待评测' }}
                </el-tag>
              </div>
              <div v-else>
                <el-tag type="danger">
                  {{ '其他错误' }}
                </el-tag>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column name="提交代码" width="120">
          <template #default="scope">
            <div style="font-weight: bold" @click="showCodeDetail(scope.row.code, scope.row.userId, scope.row.acNumber, scope.row.caseNumber)">
              {{ languageStore.languageList.find(item => item.value === scope.row.languageId).label }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="runTime" label="运行时间" width="120">
          <template #default="scope">
            {{ scope.row.runTime }} ms
          </template>
        </el-table-column>
        <el-table-column prop="runMemory" label="运行内存" width="120">
          <template #default="scope">
            {{ (scope.row.runMemory / 1024).toFixed(2) }} MB
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageForm.page"
        v-model:page-size="pageForm.pageSize"
        v-model:total="submitsStore.submitsForm.total"
        layout="prev, pager, next"
        style="margin: 8px auto"
        @change="getSubmitsList"
      />
      <el-popconfirm
        title="确定删除所选记录吗？"
        confirm-button-text="删除"
        cancel-button-text="取消"
        @confirm="handleDelete"
      >
        <template #reference>
          <el-button
            v-if="chooseList.length > 0"
            round
            type="danger"
            :icon="Delete"
          >
            删除所选记录
          </el-button>
        </template>
      </el-popconfirm>
      <el-dialog v-model="showCode" title="代码详细" width="700px">
        <div style="margin-top: 10px; margin-left: 20px; background-color: rgba(242,242,242,0.71); padding: 10px; width: 625px">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px">
            <span style="font-weight: bold; font-size: 14px; color: #666; margin-right: 10px">测试点信息:</span>
            <span style="font-weight: bold; font-size: 14px; color: #666; margin-right: 10px"> {{ `${submitDetailForm.acNum} / ${submitDetailForm.caseNum}` }} </span>
          </div>
          <div style="display: flex; flex-wrap: wrap;">
            <el-button
              v-for="index in submitDetailForm.caseNum"
              :key="index"
              :type="index <= submitDetailForm.acNum ? 'success' : 'danger'"
              circle
            >
              <el-icon v-if="index <= submitDetailForm.acNum" color="white">
                <Check />
              </el-icon>
              <el-icon v-else color="white">
                <Close />
              </el-icon>
            </el-button>
          </div>
        </div>
        <div>
          <MdPreview v-model="submitDetailForm.code" theme="light" preview-theme="github" />
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<style scoped>

</style>
