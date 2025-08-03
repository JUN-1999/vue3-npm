<template>

  <FilePreview ref="FilePreviewRef"></FilePreview>
  <div>
    FormGrid
    <FormGrid ref="FormGridRef" v-model="formData" :formfield="formfield"></FormGrid>
  </div>


  <button @click="showBtn">查看文件</button>
</template>


<script setup lang="ts">
// 本地开发
import FilePreview from "../packages/FilePreview/index";
import FormGrid from "../packages/FormGrid/index";

// 打包之后测试
// import { FilePreview, FormGrid } from "../dist/components.es.js";

// 测试发布的包
// import { FilePreview, FormGrid } from "@jun1999/components";

import { ref } from "vue";
const FilePreviewRef = ref(null);
const showBtn = () => {
  if (FilePreviewRef.value && typeof (FilePreviewRef.value as any).show === 'function') {
    (FilePreviewRef.value as any).show(fileType.value['xlsx'])
  }
}

const formData = ref({
  name: ''
})
const formfield = ref([
  {
    key: 'name',
    type: 'input',
    label: '姓名'
  }
])

/*
[
  "https://jljy2021.oss-cn-hangzhou.aliyuncs.com/wxb3999eccac7b923b/20240520/eaba41dea7ef4bf36b80d0cc376e4616.mp4",
  "https://jljy2021.oss-cn-hangzhou.aliyuncs.com/wxb3999eccac7b923b/20240511/3b15f99314261f7a4ec719024b8b238c.mp3",
  "",
]
*/
const fileType = ref({
  img: 'https://jljy2021.oss-cn-hangzhou.aliyuncs.com/wxb3999eccac7b923b2024/05/11/b0b07202405111553135596.jpg',
  xlsx: 'https://handingweixiu.oss-cn-shanghai.aliyuncs.com/ruoyi/28a4216a-401f-43b1-aa9d-7ab7029cac6e.xlsx'
});
</script>


<style scoped></style>
