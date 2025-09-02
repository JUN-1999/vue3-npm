<template>
  <div>
    <div>
      <div>表单组件 FormGrid</div>
      <FormGrid
        v-model="formdata"
        :formfield="formfield"
        labelwidth="120px"
        valuewidth="220px"
      ></FormGrid>
      <FormGrid
        style="margin-top: 30px"
        v-model="formdata"
        :formfield="formfield2"
        labelwidth="120px"
        valuewidth="auto"
        :repeat="1"
      ></FormGrid>
      <el-button type="primary" @click="showFormDataValue">
        得到表单的值
      </el-button>
      <div class="br"></div>
    </div>
    <div>
      <div>文件查看组件</div>
      <el-button @click="FilePreviewShow(IMGURL)">查看图片</el-button>
      <el-button @click="FilePreviewShow(XLSXURL)">查看xlsx</el-button>
      <FilePreview ref="FilePreviewRef"> </FilePreview>
      <div class="br"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElButton } from "element-plus";
import "element-plus/dist/index.css";
import FilePreview from "../packages/FilePreview/index";
import FormGrid from "../packages/FormGrid/index";

// FormGrid 配置
const formdata = ref({
  username: "",
  hobby: 1,
  marks: "",
});
const formfield = ref([
  {
    label: "用户名",
    key: "username",
    type: "input",
    placeholder: "请输入用户名",
  },
  {
    label: "爱好",
    key: "hobby",
    type: "select",
    options: [
      { label: "选项一", value: 1 },
      { label: "选项二", value: 2 },
    ],
  },
]);
const formfield2 = ref([
  {
    label: "备注",
    key: "marks",
    type: "rich-text",
  },
]);
const showFormDataValue = () => {
  console.log(formdata.value);
};

// FilePreview 配置

const IMGURL =
  "https://jljy2021.oss-cn-hangzhou.aliyuncs.com/wxb3999eccac7b923b2024/05/11/b0b07202405111553135596.jpg";
const XLSXURL =
  "https://handingweixiu.oss-cn-shanghai.aliyuncs.com/ruoyi/28a4216a-401f-43b1-aa9d-7ab7029cac6e.xlsx";
const FilePreviewRef = ref(null);
const FilePreviewShow = (url) => {
  if (FilePreviewRef.value && typeof FilePreviewRef.value.show === "function") {
    FilePreviewRef.value.show(url);
  }
};
</script>

<style scoped></style>
