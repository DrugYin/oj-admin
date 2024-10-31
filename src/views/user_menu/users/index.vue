<script setup lang="ts">
import { ElNotification } from 'element-plus'
import useUserStore from '@/store/modules/user.ts'
import useRoleStore from '@/store/modules/role.ts'

const userStore = useUserStore()
const roleStore = useRoleStore()

const pageForm = ref({
  searchStr: '',
  page: 1,
  pageSize: 10,
})

const roleDialogVisible = ref(false)
const roleSelectValue = ref({
  userId: undefined,
  roleIds: [],
})

const userInfoDialogVisible = ref(false)
const userInfoForm = ref({
  userId: undefined,
  nickname: '',
  account: '',
})

function openInfoDialog(row) {
  userInfoDialogVisible.value = true
  userInfoForm.value = {
    userId: row.id,
    nickname: row.nickname,
    account: row.account,
  }
}
function closeInfoDialog() {
  userInfoDialogVisible.value = false
  userInfoForm.value = {
    userId: undefined,
    nickname: '',
    avatar: '',
  }
}
function updateUserInfo() {
  if (userInfoForm.value.nickname === '') {
    ElNotification.error({
      title: '提示',
      message: '请输入昵称',
      type: 'error',
      duration: 2000,
      offset: 100,
    })
    return
  }
  userStore.updateUserBaseInfo(userInfoForm.value).then(() => {
    closeInfoDialog()
    userStore.getUsers(pageForm.value)
  })
}

function openRoleDialog(row) {
  roleDialogVisible.value = true
  userStore.getUserRole({ userId: row.id }).then(() => {
    for (const item of userStore.userRoleList) {
      roleSelectValue.value.roleIds.push(item.id)
    }
  })
  roleSelectValue.value.userId = row.id
  roleStore.getAllRole()
}
function closeRoleDialog() {
  roleDialogVisible.value = false
  roleSelectValue.value = {
    userId: undefined,
    roleIds: [],
  }
}
function updateUserRole() {
  roleStore.updateUserRole(roleSelectValue.value).then(() => {
    closeRoleDialog()
  })
}

userStore.getUsers(pageForm.value)
</script>

<template>
  <div>
    <page-header title="用户管理" />
    <page-main>
      <el-card>
        <template #header>
          <el-form inline>
            <el-form-item>
              <el-input v-model="pageForm.searchStr" placeholder="输入账号/用户名搜索" @keyup.enter="userStore.getUsers(pageForm)" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="userStore.getUsers(pageForm)">
                搜索
              </el-button>
            </el-form-item>
          </el-form>
        </template>
        <template #default>
          <el-table :data="userStore.usersForm.data" class="center" style="width: 90%">
            <el-table-column label="账号" prop="account">
              <template #default="scope">
                <div class="user-colum">
                  <el-avatar :src="scope.row.avatar" size="small" />{{ scope.row.account }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="用户名" prop="nickname" width="150">
              <template #default="scope">
                <div class="user-colum">
                  {{ scope.row.nickname }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime" width="200">
              <template #default="scope">
                <div class="user-colum">
                  {{ scope.row.createTime[0] }}-{{ scope.row.createTime[1] }}-{{ scope.row.createTime[2] }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
              <template #default="scope">
                <el-button text @click="openInfoDialog(scope.row)">
                  编辑
                </el-button>
                <el-button text @click="openRoleDialog(scope.row)">
                  角色管理
                </el-button>
                <el-popconfirm
                  title="确定重置该用户的密码吗？"
                  @confirm="userStore.resetPassword({ userId: scope.row.id })"
                >
                  <template #reference>
                    <el-button text>
                      重置密码
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
            v-model:total="userStore.usersForm.total"
            layout="prev, pager, next"
            style="margin: 8px auto"
            @change="userStore.getRoles(pageForm)"
          />
        </template>
      </el-card>
      <!-- 修改用户角色对话框 -->
      <el-dialog
        v-model="roleDialogVisible"
        title="角色管理"
        width="30%"
        @close="closeRoleDialog"
      >
        <el-card>
          <template #default>
            <el-form>
              <el-form-item label="选择角色" label-width="70">
                <el-select
                  v-model="roleSelectValue.roleIds"
                  multiple
                  multiple-limit="4"
                  placeholder="请选择角色"
                >
                  <el-option
                    v-for="item in roleStore.roleList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
          <template #footer>
            <el-button type="info" @click="closeRoleDialog">
              取消
            </el-button>
            <el-button type="success" @click="updateUserRole">
              保存
            </el-button>
          </template>
        </el-card>
      </el-dialog>
      <!-- 修改用户信息对话框 -->
      <el-dialog
        v-model="userInfoDialogVisible"
        title="修改用户信息"
        width="30%"
        @close="closeInfoDialog"
      >
        <el-card>
          <template #default>
            <el-form>
              <el-form-item label="账号" label-width="70">
                <el-input v-model="userInfoForm.account" disabled />
              </el-form-item>
              <el-form-item label="用户名" label-width="70">
                <el-input v-model="userInfoForm.nickname" />
              </el-form-item>
            </el-form>
          </template>
          <template #footer>
            <el-button type="info" @click="closeInfoDialog">
              取消
            </el-button>
            <el-button type="success" @click="updateUserInfo">
              保存
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
  align-items: center;
}
.user-colum {
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 16px
}
</style>
