<template>
  <!-- <div style="background-color: #f00; width: 800px;height: 800px;">
    <Editor ref="EditorRef" :uploadUrl="uploadUrl" :token="token" v-model="modelValue"></Editor>
  </div> -->

  <FormGrid v-model="formdata" :formfield="formfield" valuewidth="auto" :repeat="1"></FormGrid>


  <el-button type="primary" @click="showFormDataValue">显示</el-button>
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


const formdata = ref({
  username: '',
  marks: '',
});
const formfield = ref([
  {
    label: '用户名',
    key: 'username',
    type: 'input',
    placeholder: '请输入用户名'
  },
  {
    label: '备注',
    key: 'marks',
    type: 'rich-text',
  }
]);
const showFormDataValue=()=>{
  console.log(formdata.value);
  
}
</script>


<style scoped></style>
