import { ElMessage } from 'element-plus'
import useApi from '@/api/modules/oj-home.ts'

const useCarouselStore = defineStore(
  'carousel',
  () => {
    // 轮播图数据
    const carouselList = ref([])
    // 获取轮播图数据
    async function getCarousel() {
      const res = await useApi.getCarouselList()
      carouselList.value = []
      res.data.rows.forEach((item) => {
        carouselList.value.push(item)
      })
    }
    // 删除轮播图
    async function deleteCarouselById(data: {
      id: number
    }) {
      await useApi.deleteCarouselById(data)
      await getCarousel()
      ElMessage.success('删除成功')
    }
    // 新增轮播图
    async function uploadCarousel(data: {
      title: string
      image: File
    }) {
      await useApi.uploadCarousel(data)
    }
    // 更新轮播图
    async function updateCarousel(data: {
      id: number
      title: string
      image: File
    }) {
      await useApi.updateCarousel(data)
    }
    // url转file
    async function urlToFile(
      url: string,
    ) {
      // 将url转成file对象
      const responseFile = await fetch(url, { mode: 'no-cors' })
      const blob = await responseFile.blob()
      // 从url中获取文件名
      const fileName = url.substring(url.lastIndexOf('/') + 1)
      // 将 Blob 转换为 File 对象
      return new File([blob], fileName, { type: blob.type })
    }
    return {
      carouselList,
      deleteCarouselById,
      getCarousel,
      uploadCarousel,
      updateCarousel,
      urlToFile,
    }
  },
)

export default useCarouselStore
