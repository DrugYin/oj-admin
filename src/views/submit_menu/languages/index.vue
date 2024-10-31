<script setup lang="ts">
import useLanguageStore from '@/store/modules/language.ts'

const languageStore = useLanguageStore()

languageStore.getLanguageList()

const languageForm = ref({
  id: undefined,
  label: '',
  value: undefined,
  enable: undefined,
})

function clearLanguageForm() {
  languageForm.value = {
    id: undefined,
    label: '',
    value: undefined,
    enable: undefined,
  }
}

function updateLanguage() {
  languageStore.updateLanguage(languageForm.value)
}

function deleteLanguage() {
  languageStore.deleteLanguage({ id: languageForm.value.id })
  clearLanguageForm()
}

function createLanguage() {
  languageStore.createLanguage(languageForm.value)
}
</script>

<template>
  <div>
    <page-header title="提交语言管理" />
    <page-main>
      <el-card>
        <el-form :model="languageForm" label-width="100px" inline>
          <template #default>
            <el-select
              v-model="languageForm"
              size="large"
              clearable
            >
              <el-option
                v-for="item in languageStore.languageList"
                :key="item.id"
                :label="item.label"
                :value="item"
              />
            </el-select>
            <div style="margin-top: 20px">
              <el-form-item label="语言名称">
                <el-input v-model="languageForm.label" />
              </el-form-item>
              <el-form-item label="语言值">
                <el-input v-model="languageForm.value" />
              </el-form-item>
              <el-form-item label="是否启用">
                <el-switch v-model="languageForm.enable" />
              </el-form-item>
            </div>
            <el-form-item label="操作">
              <el-button round type="success" @click="updateLanguage">
                保存
              </el-button>
              <el-button round type="primary" @click="createLanguage">
                新增
              </el-button>
              <el-button round type="info" @click="deleteLanguage">
                删除
              </el-button>
            </el-form-item>
          </template>
        </el-form>
      </el-card>
    </page-main>
  </div>
</template>

<style scoped>

</style>
