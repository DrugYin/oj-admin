<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue'
import useTagsStore from '@/store/modules/tags.ts'

const tagsStore = useTagsStore()

const pageForm = ref({
  searchStr: '',
  page: 1,
  pageSize: 10,
})

const tagForm = ref({
  id: undefined,
  name: '',
  color: '',
})

function clearTagForm() {
  tagForm.value = {
    id: undefined,
    name: '',
    color: '',
  }
}

const isEdit = ref(false)

const tagDrawerVisible = ref(false)

function closeTagDrawer() {
  tagDrawerVisible.value = false
  clearTagForm()
}

function createTag() {
  clearTagForm()
  tagDrawerVisible.value = true
  isEdit.value = false
}

function editTag(row) {
  isEdit.value = true
  tagDrawerVisible.value = true
  tagForm.value.id = row.id
  tagForm.value.name = row.name
  tagForm.value.color = row.color
}

function deleteTag(id) {
  tagsStore.deleteTag({ id })
  setTimeout(() => {
    tagsStore.getTagsList(pageForm.value)
  }, 500)
}

function handleTagForm() {
  if (isEdit.value) {
    tagsStore.updateTag(tagForm.value)
  }
  else {
    tagsStore.createTag(tagForm.value)
  }
  closeTagDrawer()
  setTimeout(() => {
    tagsStore.getTagsList(pageForm.value)
  }, 500)
}

tagsStore.getTagsList(pageForm.value)
</script>

<template>
  <div>
    <page-header title="题目标签管理" />
    <page-main>
      <el-card>
        <template #header>
          <el-form inline>
            <el-form-item>
              <el-input
                v-model="pageForm.searchStr"
                placeholder="输入标签名搜索"
                clearabl
                @keyup.enter="tagsStore.getTagsList(pageForm)"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="tagsStore.getTagsList(pageForm)">
                搜索
              </el-button>
            </el-form-item>
          </el-form>
        </template>
        <template #default>
          <el-table :data="tagsStore.tagsForm.data">
            <el-table-column label="标签名" prop="name" />
            <el-table-column label="标签颜色">
              <template #default="scope">
                <el-tag :color="scope.row.color" size="large" style="color: #0f0f0f">
                  {{ scope.row.name }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button round :icon="Edit" @click="editTag(scope.row)">
                  编辑
                </el-button>
                <el-popconfirm
                  title="确定删除该标签吗"
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  @confirm="deleteTag(scope.row.id)"
                >
                  <template #reference>
                    <el-button round type="info" :icon="Delete">
                      删除
                    </el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template #footer>
          <el-form inline>
            <el-form-item>
              <el-pagination
                v-model:current-page="pageForm.page"
                v-model:page-size="pageForm.pageSize"
                v-model:total="tagsStore.tagsForm.total"
                layout="prev, pager, next"
                style="margin: 8px auto"
                @change="tagsStore.getTagsList(pageForm)"
              />
            </el-form-item>
            <el-form-item>
              <el-button round @click="createTag">
                添加标签
              </el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-card>
      <el-drawer
        v-model="tagDrawerVisible"
        size="30%"
        @close="closeTagDrawer"
      >
        <template #header>
          <h2>
            {{ isEdit ? '修改标签' : '添加标签' }}
          </h2>
        </template>
        <template #default>
          <el-form label-width="100px">
            <el-form-item label="标签名:">
              <el-input v-model="tagForm.name" style="width: 300px" />
            </el-form-item>
            <el-form-item label="颜色">
              <el-color-picker v-model="tagForm.color" show-alpha size="large" />
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <el-button round type="info" @click="closeTagDrawer">
            取消
          </el-button>
          <el-button round type="primary" @click="handleTagForm">
            提交
          </el-button>
        </template>
      </el-drawer>
    </page-main>
  </div>
</template>

<style scoped>

</style>
