<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

defineOptions({
  name: 'PieEChart',
})
const props = withDefaults(
  defineProps<{
    data?: any
    title?: string
  }>(),
  {
    data: {},
    title: '提交数据',
  },
)

provide(THEME_KEY, 'light')

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])

const option = ref({
  title: {
    text: props.title,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['答案正确', '答案错误', '运行超时', '内存超限', '编译错误', '其他'],
  },
  color: ['#67c23a', '#f56c6c', '#fdd95b', '#e6a23c', '#808080bf', '#9932cc'],
  series: [
    {
      name: '提交数据',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
})
function initData() {
  option.value.series[0].data = []
  option.value.series[0].data.push({ value: props.data.accept, name: '答案正确' })
  option.value.series[0].data.push({ value: props.data.wrongAnswer, name: '答案错误' })
  option.value.series[0].data.push({ value: props.data.timeLimitExceeded, name: '运行超时' })
  option.value.series[0].data.push({ value: props.data.memoryLimitExceeded, name: '内存超限' })
  option.value.series[0].data.push({ value: props.data.compileError, name: '编译错误' })
  option.value.series[0].data.push({ value: props.data.otherError, name: '其他' })
}

onMounted(() => {
  setTimeout(() => {
    initData()
  }, 250)
})
</script>

<template>
  <VChart class="chart" :option="option" autoresize />
</template>

<style scoped>
.chart {
  height: 300px;
}
</style>
