<script setup lang="ts">
// 本地开发
// import FileView from "../packages/file-view/index";

// 打包之后测试
import { FileView } from "../dist/file-view.es.js";

// 测试发布的包
// import { FileView } from "@jun1999/file-view";

import { ref } from "vue";

const closeBtn = () => {
  console.log("FileView close按钮回调");
};

const fileList = ref([
  "https://jljy2021.oss-cn-hangzhou.aliyuncs.com/wxb3999eccac7b923b/20240520/eaba41dea7ef4bf36b80d0cc376e4616.mp4",
  "https://jljy2021.oss-cn-hangzhou.aliyuncs.com/wxb3999eccac7b923b/20240511/3b15f99314261f7a4ec719024b8b238c.mp3",
  "https://jljy2021.oss-cn-hangzhou.aliyuncs.com/wxb3999eccac7b923b2024/05/11/b0b07202405111553135596.jpg",
]);
</script>

<template>
  <FileView :close_btn="true" :url="fileList[2]" @close="closeBtn"></FileView>
  <button @click="showBtn">查看文件</button>
</template>

<style scoped></style>
