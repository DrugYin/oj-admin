<script setup lang="ts">
import useSubmitsStore from '@/store/modules/submits.ts'
import useUserStore from '@/store/modules/user.ts'

const userStore = useUserStore()
const submitStore = useSubmitsStore()
const welcomeMessage = ref('')
function setMessage() {
  const timeNow = new Date()
  const hour = timeNow.getHours()
  if (hour >= 0 && hour <= 12) {
    welcomeMessage.value = `上午好!${userStore.account}`
  }
  else {
    welcomeMessage.value = `下午好！${userStore.account}`
  }
}

setMessage()
submitStore.getDailySubmitRecord()
submitStore.getAllSubmitsRecord()
</script>

<template>
  <div>
    <page-header title="主页" :content="welcomeMessage" />
    <page-main>
      <PirEChart :data="submitStore.allSubmitsRecord" title="总提交记录" />
      <PirEChart :data="submitStore.dailySubmitRecord" title="每日提交记录" />
    </page-main>
  </div>
</template>

<style scoped>
</style>
