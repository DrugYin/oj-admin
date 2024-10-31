<route lang="yaml">
name: notice
meta:
  title: 公告管理
  enable: false
</route>

<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue'
import useNoticeStore from '@/store/modules/notice.ts'

const noticeStore = useNoticeStore()

const pageQueryForm = ref({
  page: 1,
  pageSize: 10,
  total: 0,
})

noticeStore.getNotices(pageQueryForm.value)

const noticeDetailVisible = ref(false)

const noticeDetailForm = ref({
  id: undefined,
  title: '',
  content: '',
})

function showNoticeDetail(row) {
  noticeDetailVisible.value = true
  noticeDetailForm.value.title = row.title
  noticeDetailForm.value.content = row.content
}

const noticeDrawerVisible = ref(false)

const isEdit = ref(false)

function editNotice(row) {
  noticeDrawerVisible.value = true
  isEdit.value = true
  noticeDetailForm.value.id = row.id
  noticeDetailForm.value.title = row.title
  noticeDetailForm.value.content = row.content
}

function addNotice() {
  noticeDrawerVisible.value = true
  isEdit.value = false
  noticeDetailForm.value.id = undefined
  noticeDetailForm.value.title = ''
  noticeDetailForm.value.content = ''
}

function closeNoticeDrawer() {
  noticeDrawerVisible.value = false
  noticeDetailVisible.value = false
  noticeDetailForm.value = {
    id: undefined,
    title: '',
    content: '',
  }
}

function handleNoticeForm() {
  if (isEdit.value) {
    noticeStore.updateNotice(noticeDetailForm.value).then(() => {
      closeNoticeDrawer()
      setTimeout(noticeStore.getNotices(pageQueryForm.value), 500)
    })
  }
  else {
    noticeStore.createNotice(noticeDetailForm.value).then(() => {
      closeNoticeDrawer()
      setTimeout(noticeStore.getNotices(pageQueryForm.value), 500)
    })
  }
}
</script>

<template>
  <div>
    <page-header title="首页公告管理" />
    <page-main>
      <div class="center">
        <el-card style="width: 100%">
          <template #header>
            <div>
              <h3>
                公告
              </h3>
            </div>
          </template>
          <template #default>
            <el-table :data="noticeStore.noticeForm.notices" class="center">
              <el-table-column prop="title" label="标题" width="300">
                <template #default="scope">
                  <div @click="showNoticeDetail(scope.row)">
                    {{ scope.row.title }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="发布时间" prop="gmtCreate" width="200" align="center">
                <template #default="scope">
                  <div @click="showNoticeDetail(scope.row)">
                    {{ scope.row.gmtCreate }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="250" align="center">
                <template #default="scope">
                  <div>
                    <el-button round :icon="Edit" @click="editNotice(scope.row)">
                      编辑
                    </el-button>
                    <el-popconfirm
                      title="真的要删除吗"
                      confirm-button-text="确定"
                      cancel-button-text="不了"
                      @confirm="noticeStore.deleteNotice({ id: scope.row.id, pageForm: pageQueryForm })"
                    >
                      <template #reference>
                        <el-button round :icon="Delete" type="info">
                          删除
                        </el-button>
                      </template>
                    </el-popconfirm>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <template #footer>
            <div class="center">
              <el-pagination
                v-model:current-page="pageQueryForm.page"
                v-model:page-size="pageQueryForm.pageSize"
                v-model:total="pageQueryForm.total"
                layout="prev, pager, next"
                @change="noticeStore.getNotices(pageQueryForm)"
              />
              <el-button style="margin-left: 30%" @click="addNotice">
                添加公告
              </el-button>
            </div>
          </template>
        </el-card>
      </div>
      <el-dialog
        v-model="noticeDetailVisible"
        :title="noticeDetailForm.title"
        draggable
      >
        <div class="notice-content">
          {{ noticeDetailForm.content }}
        </div>
      </el-dialog>
      <el-drawer
        v-model="noticeDrawerVisible"
        size="30%"
        @close="closeNoticeDrawer"
      >
        <template #header>
          <h2>
            {{ isEdit ? '编辑公告' : '新增公告' }}
          </h2>
        </template>
        <template #default>
          <el-form label-width="100px">
            <el-form-item label="标题">
              <el-input v-model="noticeDetailForm.title" style="width: 300px" />
            </el-form-item>
            <el-form-item label="内容">
              <el-input
                v-model="noticeDetailForm.content"
                style="width: 300px"
                type="textarea"
                autosize
              />
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div>
            <el-button type="info" @click="closeNoticeDrawer">
              取消
            </el-button>
            <el-button type="success" @click="handleNoticeForm">
              提交
            </el-button>
          </div>
        </template>
      </el-drawer>
    </page-main>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}

.notice-content {
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 20px;
  white-space: pre-wrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
