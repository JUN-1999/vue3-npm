<!--  -->
<template>
  <div>
    <!-- word\excel\pdf 文件查看 -->
    <el-dialog class="FilePreviewDialog" v-model="dialogVisible" title="文件查看"
      style="min-width: 800px;width: 95vw; height: 90vh" append-to-body @close="close">
      <div id="preview"></div>
      <template #footer>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">下载</el-button>
      </template>
    </el-dialog>

    <!-- 图片查看 -->
    <el-image-viewer v-if="imagePreview" @close="imagePreview = false" z-index="99999999" :url-list="iamgeList"
      :teleported="true" :hide-on-click-modal="true" />
  </div>
</template>
<script setup>
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

import { ElMessage, ElImageViewer, ElDialog, ElButton } from "element-plus";
import { nextTick, ref } from "vue";

// word文件预览
import jsPreviewDocx from "@js-preview/docx";
import "@js-preview/docx/lib/index.css";
// excel文件预览
import jsPreviewExcel from "@js-preview/excel";
import "@js-preview/excel/lib/index.css";
// pdf文件预览
import jsPreviewPdf from "@js-preview/pdf";
// image 文件预览

const dialogVisible = ref(false);
const imagePreview = ref(false);
const iamgeList = ref([]);
let myPreviewer = null;
const show = (filesrc) => {
  const FileType = getFileType(filesrc);
  const FileArr = ["pdf", "word", "excel", "image"];

  if (FileArr.includes(FileType)) {
    // 在可处理文件格式内
    console.log(FileType);

    if (FileType == "excel") {
      dialogVisible.value = true;
      nextTick(() => {
        myPreviewer = jsPreviewExcel.init(document.getElementById("preview"));
        myPreviewer
          .preview(filesrc)
          .then((res) => {
            console.log("预览完成");
          })
          .catch((e) => {
            console.log("预览失败", e);
          });
      });
    }
    if (FileType == "word") {
      dialogVisible.value = true;

      nextTick(() => {
        //初始化时指明要挂载的父元素Dom节点
        myPreviewer = jsPreviewDocx.init(document.getElementById("preview"));

        //传递要预览的文件地址即可
        myPreviewer
          .preview(filesrc)
          .then((res) => {
            console.log("预览完成");
          })
          .catch((e) => {
            console.log("预览失败", e);
          });
      });
    }
    if (FileType == "pdf") {
      dialogVisible.value = true;
      nextTick(() => {
        myPreviewer = jsPreviewPdf.init(document.getElementById("preview"), {
          onError: (e) => {
            console.log("发生错误", e);
          },
          onRendered: () => {
            console.log("渲染完成");
          },
        });
        myPreviewer.preview(filesrc);
      });
    }
    if (FileType == "image") {
      imagePreview.value = true;
      iamgeList.value = [filesrc];
    }
  } else {
    ElMessage({
      message: "不支持该文件展示",
      type: "warning",
    });
  }
};
const close = () => {
  try {
    dialogVisible.value = false;
    myPreviewer.destroy();
  } catch (error) {
    dialogVisible.value = false;
  }
};

const save = () => {
  myPreviewer.save();
};
// 根据文件路径获取文件格式
function getFileType(filePath) {
  // 提取文件名并解析扩展名
  const fileName = filePath.split(/[\\/]/).pop(); // 处理所有路径分隔符
  const match = fileName.match(/\.([^.]+)$/);
  if (!match) return "";
  const ext = match[1].toLowerCase();

  // 统一格式映射表
  const typeMap = {
    xls: "excel",
    xlsx: "excel",
    doc: "word",
    docx: "word",
    pdf: "pdf",
    jpg: "image",
    jpeg: "image",
    png: "image",
    gif: "image",
    bmp: "image",
    webp: "image",
    ico: "image",
    tiff: "image",
    svg: "image",
  };

  // 返回映射结果或原始扩展名
  return typeMap[ext] || ext;
}
defineExpose({
  show,
});
</script>
<style lang="scss" scoped>
#preview {
  width: 100%;
  // height: 100%;
  height: 77vh;
  //   width: 100vw;
  //   position: fixed;
  //   z-index: 9999999;
}
</style>
<style>
/* .el-dialog 样式并且有设置 样式 FilePreviewDialog 才生效  */
.FilePreviewDialog {
  margin-top: 0 !important;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
