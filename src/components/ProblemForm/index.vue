<script setup lang="ts">
import { MdEditor } from 'md-editor-v3'
import useProblemStore from '@/store/modules/problem.ts'

defineOptions({
  name: 'ProblemForm',
})

const props = withDefaults(
  defineProps<{
    problemId?: number
    isEdit: boolean
  }>(),
  {
    problemId: -1,
    isEdit: false,
  },
)

const router = useRouter()

const problemStore = useProblemStore()

function getProblemDetail() {
  if (props.isEdit) {
    problemStore.getProblemDetail({ problemId: props.problemId })
  }
  else {
    problemStore.problemDetailForm = {}
    problemStore.problemTestSampleForm = {
      data: [],
      json: '',
    }
    problemStore.problemTestForm = {
      data: [],
      json: '',
    }
  }
}

function addTestSample() {
  problemStore.problemTestSampleForm.data.push({
    id: problemStore.problemTestSampleForm.data.length + 1,
    input: '',
    output: '',
  })
  dataToJson()
}

function addTestData() {
  problemStore.problemTestForm.data.push({
    id: problemStore.problemTestForm.data.length + 1,
    input: '',
    output: '',
  })
  dataToJson()
}

function jsonToData() {
  problemStore.problemTestSampleForm.data = JSON.parse(problemStore.problemTestSampleForm.json)
  problemStore.problemTestForm.data = JSON.parse(problemStore.problemTestForm.json)
}

function dataToJson() {
  problemStore.problemTestSampleForm.json = JSON.stringify(problemStore.problemTestSampleForm.data, null, 2)
  problemStore.problemTestForm.json = JSON.stringify(problemStore.problemTestForm.data, null, 2)
}

function submitForm() {
  if (props.isEdit) {
    problemStore.updateProblem()
  }
  else {
    problemStore.createProblem()
  }
}

onMounted(() => {
  getProblemDetail()
})
</script>

<template>
  <div>
    <el-card>
      <template #header>
        <el-form inline>
          <el-form-item>
            <h2>
              {{ isEdit ? '编辑题目' : '新建题目' }}
            </h2>
          </el-form-item>
          <el-form-item>
            <el-button @click="router.push('/problem_menu/problems')">
              返回
            </el-button>
          </el-form-item>
        </el-form>
      </template>
      <el-form>
        <el-form-item label="标题" label-width="100px">
          <el-input v-model="problemStore.problemDetailForm.title" />
        </el-form-item>
        <el-form-item label="作者" label-width="100px">
          <el-input v-model="problemStore.problemDetailForm.author" />
        </el-form-item>
        <el-form-item label="题目编号" label-width="100px">
          <el-input v-model="problemStore.problemDetailForm.customId" />
        </el-form-item>
        <el-form-item label="时间限制" label-width="100px">
          <el-input v-model="problemStore.problemDetailForm.limitTime">
            <template #append>
              ms
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="内存限制" label-width="100px">
          <el-input v-model="problemStore.problemDetailForm.limitMemory">
            <template #append>
              MB
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="题目描述" label-width="100px">
          <MdEditor v-model="problemStore.problemDetailForm.description" style="height: 400px" />
        </el-form-item>
        <el-form-item label="输入描述" label-width="100px">
          <MdEditor v-model="problemStore.problemDetailForm.inputDescripiton" style="height: 400px" />
        </el-form-item>
        <el-form-item label="输出描述" label-width="100px">
          <MdEditor v-model="problemStore.problemDetailForm.outputDescription" style="height: 400px" />
        </el-form-item>
        <el-form-item label="测试样例" label-width="100px">
          <div style="display: flex; justify-content: space-between; height: 100%;">
            <div style="flex: 1; margin-right: 20px;">
              <el-table :data="problemStore.problemTestSampleForm.data" style="height: 100%;">
                <el-table-column label="编号" prop="id" width="100" />
                <el-table-column label="输入" prop="input" width="250">
                  <template #default="scope">
                    <el-input v-model="scope.row.input" type="textarea" autosize @input="dataToJson" />
                  </template>
                </el-table-column>
                <el-table-column label="输出" prop="output" width="250">
                  <template #default="scope">
                    <el-input v-model="scope.row.output" type="textarea" autosize @input="dataToJson" />
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                  <template #default="scope">
                    <el-button
                      type="danger"
                      size="small"
                      @click="() => {
                        problemStore.problemTestSampleForm.data.splice(scope.$index, 1)
                        dataToJson()
                      }"
                    >
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button type="primary" size="small" @click="addTestSample">
                新增测试样例
              </el-button>
            </div>
            <div style="flex: 1; max-width: 50%; height: 100%;">
              <span>JSON格式：</span>
              <el-input
                v-model="problemStore.problemTestSampleForm.json"
                type="textarea" style="height: 100%; width: 100%"
                :autosize="{ maxRows: 2.3 * problemStore.problemTestSampleForm.data.length }"
                @input="jsonToData"
              />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="题目测试点" label-width="100px" style="margin-top: 5%">
          <div style="display: flex; justify-content: space-between; height: 100%; margin-top: 10px;">
            <div style="flex: 1; margin-right: 20px;">
              <el-table :data="problemStore.problemTestForm.data" style="height: 100%;">
                <el-table-column label="编号" prop="id" width="100" />
                <el-table-column label="输入" prop="input" width="250">
                  <template #default="scope">
                    <el-input v-model="scope.row.input" type="textarea" autosize @input="dataToJson" />
                  </template>
                </el-table-column>
                <el-table-column label="输出" prop="output" width="250">
                  <template #default="scope">
                    <el-input v-model="scope.row.output" type="textarea" autosize @input="dataToJson" />
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                  <template #default="scope">
                    <el-button
                      type="danger"
                      size="small"
                      @click="() => {
                        problemStore.problemTestForm.data.splice(scope.$index, 1)
                        dataToJson()
                      }"
                    >
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button type="primary" size="small" @click="addTestData">
                新增测试样例
              </el-button>
            </div>
            <div style="flex: 1; height: 100%;">
              <span>JSON格式：</span>
              <el-input
                v-model="problemStore.problemTestForm.json"
                type="textarea" style="height: 100%;width: 100%"
                :autosize="{ maxRows: 2.3 * problemStore.problemTestForm.data.length }"
                @input="jsonToData"
              />
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="success" @click="submitForm">
          保存
        </el-button>
        <el-button @click="router.push('/problem_menu/problems')">
          取消
        </el-button>
      </template>
    </el-card>
  </div>
</template>

<style scoped>

</style>
