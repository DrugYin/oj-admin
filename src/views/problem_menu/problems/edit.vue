<script setup lang="ts">
import ProblemForm from '@/components/ProblemForm/index.vue'

const route = useRoute()

const problemId = ref(route.params.id)
</script>

<template>
  <div>
    <page-main>
      <ProblemForm :problem-id="problemId" is-edit />
    </page-main>
  </div>
</template>

<style scoped>

</style>
