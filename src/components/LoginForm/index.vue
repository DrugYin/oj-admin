<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import useUserStore from '@/store/modules/user'

defineOptions({
  name: 'LoginForm',
})

const props = defineProps<{
  account?: string
}>()

const emits = defineEmits<{
  onLogin: [account: string]
  onRegister: [account: string]
  onResetPassword: [account: string]
}>()

const userStore = useUserStore()

const title = import.meta.env.VITE_APP_TITLE
const loading = ref(false)

// 登录方式，default 账号密码登录，qrcode 扫码登录
const formRef = ref<FormInstance>()
const form = ref({
  account: props.account ?? localStorage.login_account ?? '',
  password: '',
  remember: !!localStorage.login_account,
})
const rules = ref<FormRules>({
  account: [
    { required: true, trigger: 'blur', message: '请输入用户名' },
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
})
function handleLogin() {
  formRef.value?.validate((valid) => {
    if (valid) {
      loading.value = true
      userStore.login(form.value).then(() => {
        if (form.value.remember) {
          localStorage.setItem('login_account', form.value.account)
        }
        else {
          localStorage.removeItem('login_account')
        }
        emits('onLogin', form.value.account)
      }).finally(() => {
        loading.value = false
      })
    }
  })
}
</script>

<template>
  <ElForm ref="formRef" :model="form" :rules="rules" class="min-h-500px w-full flex-col-stretch-center p-12">
    <div>
      <h3 class="mb-8 text-xl color-[var(--el-text-color-primary)] font-bold">
        欢迎使用 {{ title }} ! 👋🏻
      </h3>
      <div>
        <ElFormItem prop="account">
          <ElInput v-model="form.account" placeholder="用户名" type="text" tabindex="1">
            <template #prefix>
              <SvgIcon name="i-ri:user-3-fill" />
            </template>
          </ElInput>
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput v-model="form.password" type="password" placeholder="密码" tabindex="2" show-password @keyup.enter="handleLogin">
            <template #prefix>
              <SvgIcon name="i-ri:lock-2-fill" />
            </template>
          </ElInput>
        </ElFormItem>
      </div>
      <div class="mb-4 flex-center-between">
        <ElCheckbox v-model="form.remember">
          记住我
        </ElCheckbox>
        <ElLink type="primary" :underline="false" @click="emits('onResetPassword', form.account)">
          忘记密码了?
        </ElLink>
      </div>
      <ElButton :loading="loading" type="primary" size="large" style="width: 100%;" @click.prevent="handleLogin">
        登录
      </ElButton>
    </div>
  </ElForm>
</template>

<style scoped>
:deep(input[type="password"]::-ms-reveal) {
  display: none;
}

.el-form-item {
  margin-bottom: 24px;

  :deep(.el-input) {
    width: 100%;
    height: 48px;
    line-height: inherit;

    input {
      height: 48px;
    }

    .el-input__prefix,
    .el-input__suffix {
      display: flex;
      align-items: center;
    }

    .el-input__prefix {
      left: 10px;
    }

    .el-input__suffix {
      right: 10px;
    }
  }
}

:deep(.el-divider__text) {
  white-space: nowrap;
  background-color: var(--g-container-bg);
}
</style>
