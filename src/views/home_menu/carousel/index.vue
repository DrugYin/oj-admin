<route lang="yaml">
name: notice
meta:
  title: 轮播图管理
  enable: false
</route>

<script setup lang="ts">
import { Delete, Edit, Plus } from '@element-plus/icons-vue'
import Message from 'vue-m-message'
import { ElMessage } from 'element-plus'
import useCarouselStore from '@/store/modules/carousel.ts'

const carouselStore = useCarouselStore()

const carouselForm = ref({
  id: undefined,
  title: '',
  file: undefined,
  image: undefined,
})

function closeDialog() {
  // eslint-disable-next-line ts/no-use-before-define
  showDialog.value = false
  carouselForm.value = {
    id: undefined,
    title: '',
    file: undefined,
    image: undefined,
  }
}

function imageChange(file) {
  if (file.raw.type !== 'image/jpeg' && file.raw.type !== 'image/png' && file.raw.type !== 'image/jpg') {
    ElMessage.error('仅支持 jpg/jpeg/png 格式的图片')
    return
  }
  if (file.raw.size / 1024 / 1024 > 10) {
    ElMessage.error('图片大小不能超过 10MB')
    return false
  }
  carouselForm.value.file = URL.createObjectURL(file.raw)
  carouselForm.value.image = file.raw
}

function handleSubmit() {
  const param = new FormData()
  param.append('title', carouselForm.value.title)
  param.append('image', carouselForm.value.image)
  // eslint-disable-next-line ts/no-use-before-define
  if (isEdit.value) {
    param.append('id', carouselForm.value.id)
    carouselStore.updateCarousel(param)
  }
  else {
    carouselStore.uploadCarousel(param)
  }
  Message.success('操作成功')
  closeDialog()
  setTimeout(() => {
    carouselStore.getCarousel()
  }, 1000)
}

function editButton(row) {
  // eslint-disable-next-line ts/no-use-before-define
  showDialog.value = true
  // eslint-disable-next-line ts/no-use-before-define
  isEdit.value = true
  carouselForm.value.title = row.title
  carouselForm.value.file = row.file
  carouselForm.value.id = row.id
  carouselStore.urlToFile(row.file).then((file) => {
    carouselForm.value.image = file
  })
}

const showDialog = ref(false)

const isEdit = ref(false)

carouselStore.getCarousel()
</script>

<template>
  <div>
    <PageHeader title="首页轮播图管理" />
    <PageMain>
      <div class="center">
        <el-carousel motion-blur trigger="click" style="width: 90%">
          <el-carousel-item v-for="(item, index) in carouselStore.carouselList" :key="index">
            <img :src="item.file" alt="item.title" style="width: 100%">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="center">
        <el-table :data="carouselStore.carouselList" style="width: 90%">
          <el-table-column prop="title" label="标题" width="180" />
          <el-table-column prop="file" label="图片">
            <template #default="scope">
              <image-preview :src="scope.row.file" height="100px" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template #default="scope">
              <div class="center">
                <el-button
                  round
                  :icon="Edit"
                  @click="editButton(scope.row)"
                >
                  编辑
                </el-button>
                <el-popconfirm
                  title="真的要删除吗?"
                  confirm-button-text="确定"
                  cancel-button-text="不了"
                  @confirm="carouselStore.deleteCarouselById({ id: scope.row.id })"
                >
                  <template #reference>
                    <el-button round type="info" :icon="Delete">
                      删除
                    </el-button>
                  </template>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="right">
        <el-button
          width="600"
          @click="() => {
            showDialog = true
            isEdit = false
          }"
        >
          添加轮播图
        </el-button>
      </div>
      <el-dialog
        v-model="showDialog"
        :title="isEdit ? '修改轮播图' : '添加轮播图'"
        draggable
        @close="closeDialog"
      >
        <el-form :model="carouselForm">
          <el-form-item label="标题">
            <el-input v-model="carouselForm.title" style="width: 300px" />
          </el-form-item>
          <el-form-item label="图片" class="upload">
            <image-preview v-if="carouselForm.file" :src="carouselForm.file" width="300" />
            <el-upload
              class="el-upload"
              :show-file-list="false"
              action="#"
              :auto-upload="false"
              :on-change="imageChange"
              drag
            >
              <el-icon class="icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <div class="right">
            <el-button type="success" @click="handleSubmit">
              完成
            </el-button>
            <el-button type="info" @click="closeDialog">
              取消
            </el-button>
          </div>
        </el-form>
      </el-dialog>
    </PageMain>
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
.right {
  margin: 10px;
  width: 90%;
  text-align: right;
  display: flex;
  justify-content: flex-end;
}
.upload .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-left: 20px;
  transition: var(--el-transition-duration-fast);
}
.upload .el-upload:hover {
  border-color: var(--el-color-primary);
}
.upload .icon{
  font-size: 28px;
  color: #8c939d;
  width: 325px;
  height: 135px;
  text-align: center;
}
</style>
