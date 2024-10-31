<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue'
import useRoleStore from '@/store/modules/role.ts'

const roleStore = useRoleStore()

const isEdit = ref(false)

const showRoleDialog = ref(false)

const roleForm = ref({
  id: undefined,
  name: '',
  code: '',
})

function addRole() {
  showRoleDialog.value = true
  isEdit.value = false
  roleForm.value = {
    name: '',
    code: '',
  }
}

function editRole(row) {
  showRoleDialog.value = true
  isEdit.value = true
  roleForm.value = {
    id: row.id,
    name: row.name,
    code: row.code,
  }
}

function closeRoleDialog() {
  showRoleDialog.value = false
  roleForm.value = {
    name: '',
    code: '',
  }
}

function changeStatus(row) {
  roleStore.updateRoleStatus({
    id: row.id,
    status: row.status,
  })
}

function handleRoleForm() {
  if (isEdit.value) {
    roleStore.updateRole(roleForm.value)
  }
  else {
    roleStore.createRole(roleForm.value)
  }
  closeRoleDialog()
}

roleStore.getRoles()
</script>

<template>
  <div>
    <page-header title="角色管理" />
    <page-main>
      <el-card>
        <template #header>
          <el-form inline>
            <el-form-item>
              <el-input
                v-model="roleStore.pageForm.searchStr"
                placeholder="输入角色名称搜索"
                clearable
                @keyup.enter="roleStore.getRoles()"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="roleStore.getRoles()">
                搜索
              </el-button>
            </el-form-item>
          </el-form>
        </template>
        <template #default>
          <div>
            <el-button type="primary" @click="addRole">
              添加角色
            </el-button>
          </div>
          <el-table :data="roleStore.roleForm.data" style="width: 90%" class="center">
            <el-table-column label="角色名称" prop="name" />
            <el-table-column label="角色代码" prop="code" />
            <el-table-column label="是否启用">
              <template #default="scope">
                <el-switch v-model="scope.row.status" @change="changeStatus(scope.row)" />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
              <template #default="scope">
                <el-button :icon="Edit" round @click="editRole(scope.row)">
                  编辑
                </el-button>
                <el-popconfirm
                  title="确定删除吗？"
                  @confirm="roleStore.deleteRole(scope.row.id)"
                >
                  <template #reference>
                    <el-button :icon="Delete" round type="info">
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
            v-model:current-page="roleStore.pageForm.page"
            v-model:page-size="roleStore.pageForm.pageSize"
            v-model:total="roleStore.roleForm.total"
            layout="prev, pager, next"
            style="margin: 8px auto"
            @change="roleStore.getRoles()"
          />
        </template>
      </el-card>
      <el-dialog
        v-model="showRoleDialog"
        width="450"
        @close="closeRoleDialog"
      >
        <el-card>
          <template #header>
            <h3>
              {{ isEdit ? '编辑角色' : '添加角色' }}
            </h3>
          </template>
          <template #default>
            <el-form label-width="100px">
              <el-form-item label="角色名称">
                <el-input v-model="roleForm.name" />
              </el-form-item>
              <el-form-item label="角色代码">
                <el-input v-model="roleForm.code" />
              </el-form-item>
            </el-form>
          </template>
          <template #footer>
            <el-button type="primary" @click="handleRoleForm">
              保存
            </el-button>
            <el-button @click="closeRoleDialog">
              取消
            </el-button>
          </template>
        </el-card>
      </el-dialog>
    </page-main>
  </div>
</template>

<style scoped>
.center {
  margin: 0 auto;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
}
</style>
