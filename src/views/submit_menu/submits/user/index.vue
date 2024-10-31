<script setup lang="ts">
const route = useRoute()

const userId = ref(route.params.userId)
</script>

<template>
  <div>
    <page-header title="用户提交记录管理" />
    <page-main>
      <SubmitsTable :user-id="userId" :show-user="false" />
    </page-main>
  </div>
</template>

<style scoped>

</style>
