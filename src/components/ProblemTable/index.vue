<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue'
import useProblemStore from '@/store/modules/problem.ts'
import useTagsStore from '@/store/modules/tags.ts'

defineOptions({
  name: 'ProblemTable',
})

function open(url: string) {
  window.open(url, '_blank')
}

const router = useRouter()

const problemStore = useProblemStore()

const tagStore = useTagsStore()

const pageForm = ref({
  searchStr: '',
  page: 1,
  pageSize: 10,
})

const editTagsDrawerVisible = ref(false)

const chooseTagsValue = ref({
  problemId: undefined,
  tagIds: [],
})

function editProblemTags(row) {
  tagStore.getAllTags()
  editTagsDrawerVisible.value = true
  chooseTagsValue.value = {
    problemId: row.id,
    tagIds: [],
  }
  for (const item of tagStore.problemTagsForm[row.id]) {
    chooseTagsValue.value.tagIds.push(item.id)
  }
}

function updateProblemTags() {
  tagStore.updateProblemTags({
    problemId: chooseTagsValue.value.problemId,
    tagIds: chooseTagsValue.value.tagIds,
  })
  editTagsDrawerVisible.value = false
  setTimeout(() => {
    problemStore.getProblems(pageForm.value)
  }, 500)
}

function changeVisible(row) {
  problemStore.setVisible({
    id: row.id,
    visible: row.visible,
  })
  setTimeout(() => {
    problemStore.getProblems(pageForm.value)
  }, 500)
}

function deleteProblem(row) {
  problemStore.deleteProblem(row)
  setTimeout(() => {
    problemStore.getProblems(pageForm.value)
  }, 500)
}

problemStore.getProblems(pageForm.value)
</script>

<template>
  <div>
    <el-card>
      <template #header>
        <el-form inline class="demo-form-inline">
          <el-form-item>
            <el-input
              v-model="pageForm.searchStr"
              placeholder="输入题目名称/题目编号搜索"
              clearable
              @keyup.enter="problemStore.getProblems(pageForm)"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="problemStore.getProblems(pageForm)">
              搜索
            </el-button>
            <el-button type="primary" @click="router.push('/problem_menu/problems/new')">
              新建题目
            </el-button>
          </el-form-item>
        </el-form>
      </template>
      <template #default>
        <el-table :data="problemStore.problemForm.data" style="width: 90%" class="center">
          <el-table-column label="题目编号" width="100">
            <template #default="scope">
              <div @click="open(`http://localhost:8001/problemset/detail/${scope.row.id}`)">
                {{ scope.row.customId }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="题目标题" width="150">
            <template #default="scope">
              <div @click="open(`http://localhost:8001/problemset/detail/${scope.row.id}`)">
                {{ scope.row.title }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="标签">
            <template #default="scope">
              <div>
                <el-button text type="info" size="small" @click="editProblemTags(scope.row)">
                  编辑
                </el-button>
                <el-tag
                  v-for="item in tagStore.problemTagsForm[scope.row.id]"
                  :color="item.color"
                  style="color: #0f0f0f"
                >
                  {{ item.name }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="通过/提交" width="120">
            <template #default="scope">
              {{ `${scope.row.acceptCount}/${scope.row.submitCount}` }}
            </template>
          </el-table-column>
          <el-table-column label="通过率" prop="acceptPercent" width="120">
            <template #default="scope">
              <div v-if="scope.row.submitCount === 0">
                0.00%
              </div>
              <div v-else-if="scope.row.acceptCount === 0">
                0.00%
              </div>
              <div v-else>
                {{ `${(scope.row.acceptCount / scope.row.submitCount * 100).toFixed(2)}%` }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="是否公开" width="100">
            <template #default="scope">
              <el-switch v-model="scope.row.visible" @change="changeVisible(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template #default="scope">
              <el-button :icon="Edit" round size="small" @click="router.push({ name: 'editProblem', params: { id: scope.row.id } })">
                编辑
              </el-button>
              <el-popconfirm
                title="确定删除吗？"
                confirm-button-text="确定"
                cancel-button-text="取消"
                @confirm="deleteProblem(scope.row)"
              >
                <template #reference>
                  <el-button :icon="Delete" round type="info" size="small">
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template #footer>
        <el-pagination
          v-model:current-page="pageForm.page"
          v-model:page-size="pageForm.pageSize"
          v-model:total="problemStore.problemForm.total"
          layout="prev, pager, next"
          style="margin: 8px auto"
          @change="problemStore.getProblems(pageForm)"
        />
      </template>
    </el-card>
    <el-drawer v-model="editTagsDrawerVisible">
      <template #header>
        <h2>
          题目标签
        </h2>
      </template>
      <el-form>
        <el-form-item label="选择标签">
          <el-select
            v-model="chooseTagsValue.tagIds"
            multiple
            multiple-limit="4"
            placeholder="请选择标签"
            style="width: 300px"
          >
            <el-option
              v-for="item in tagStore.tagsList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
              <div>
                <el-tag :color="item.color" style="color: #0f0f0f">
                  {{ item.name }}
                </el-tag>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="updateProblemTags">
            保存
          </el-button>
          <el-button @click="editTagsDrawerVisible = false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<style scoped>
.center {
  margin: 0 auto;
  text-align: center;
  display: flex;
  justify-content: center;
}
</style>
