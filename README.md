# Vue3 多媒体查看组件包

这个包提供了 Vue3 版本的多媒体查看组件，可以用于查看图片、视频和音频文件。

## 依赖说明

本组件包依赖于 [Element Plus](https://element-plus.org/) UI 库，请确保在使用前已安装。

## 安装说明

1. 安装本组件包
```bash
npm install @jun1999/components
```

2. 安装 Element Plus
```bash
npm install element-plus
```

## 使用说明

1. 在你的 Vue3 项目中导入并注册 Element Plus
```javascript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

2. 导入并使用本组件包的组件
```javascript
import { YourComponent } from '@jun1999/components'
import '@jun1999/components/dist/style.css';
```

## 组件列表

- FilePreview：文件预览组件
- FormGrid：表单网格组件

## 示例

```vue
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
// import FilePreview from "../packages/FilePreview/index";
// import FormGrid from "../packages/FormGrid/index";

// 打包之后测试
// import { FilePreview, FormGrid } from "../dist/components.es.js";

// 测试发布的包
import { FilePreview, FormGrid } from "@jun1999/components";

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

const fileType = ref({
  img: 'https://jljy2021.oss-cn-hangzhou.aliyuncs.com/wxb3999eccac7b923b2024/05/11/b0b07202405111553135596.jpg',
  xlsx: 'https://handingweixiu.oss-cn-shanghai.aliyuncs.com/ruoyi/28a4216a-401f-43b1-aa9d-7ab7029cac6e.xlsx'
});
</script>


<style scoped></style>

```
