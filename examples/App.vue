<template>
  <div style="background-color: #f00; width: 800px;height: 800px;">
    <Editor ref="EditorRef" :uploadUrl="uploadUrl" :token="token" v-model="modelValue"></Editor>
  </div>
  
</template>


<script setup lang="ts">
// 本地开发
import FilePreview from "../packages/FilePreview/index";
import FormGrid from "../packages/FormGrid/index";
import Editor from "../packages/Editor/index";

// 打包之后测试
// import { FilePreview, FormGrid } from "../dist/components.es.js";

// 测试发布的包
// import { FilePreview, FormGrid } from "@jun1999/components";

import { ref } from "vue";
const uploadUrl = ref('');
const token = ref('');
const modelValue = ref('');

</script>


<style scoped></style>
