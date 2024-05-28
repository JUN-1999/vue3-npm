<template>
  <Teleport to="body">
    <div v-show="visible" class="mask">
      <img-view ref="imgViewRef" :url="url" v-if="type == 'image'"></img-view>
      <video v-if="type == 'video'" id="video" controls :src="url"></video>
      <audio v-if="type == 'audio'" id="audio" controls :src="url"></audio>
      <div class="close" @click="close">
        <img src="../../icon/close.svg" alt="" />
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { mediaType } from "../../utils/tools";
import { ref, watch, defineOptions } from "vue";

import ImgView from "../components/ImgView.vue";
// 一定要先给name赋值，这样后面的局部install和全局install方法才能读到同一个name
defineOptions({
  name: "FileView",
});

// == 文件显示、关闭逻辑
const porps = defineProps<{
  url: string;
  show: boolean;
}>();
const emits = defineEmits(["close"]);
const visible = ref(false);
const type = ref("image");
const imgViewRef = ref();

// 监听地址
watch(
  () => porps.url,
  (val: string) => {
    if (val) {
      type.value = mediaType(val);
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
// 监听是否显示
watch(
  () => porps.show,
  (val: boolean) => {
    visible.value = val;
    // 去初始化图片的缩放和旋转
    type.value == "image" && imgViewRef.value && imgViewRef.value.initImg();
  },
  {
    immediate: true,
  }
);
const close = () => {
  // 关闭音频和视频的后台播放
  closeVideo();
  closeAudio();

  emits("close");
};
const closeVideo = () => {
  let videoDom = document.getElementById("video") as HTMLVideoElement;
  videoDom && videoDom.pause();
};
const closeAudio = () => {
  let audioDom = document.getElementById("audio") as HTMLAudioElement;
  audioDom && audioDom.pause();
};
</script>
<style lang="scss" scoped>
.mask {
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.5);
  user-select: none;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: center;

  video {
    width: 88vw;
    height: 80vh;
    object-fit: contain;
    background-color: #000;
  }

  .close {
    position: absolute;
    top: 40px;
    right: 40px;
    background-color: #606266;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      width: 60%;
      height: 60%;
    }
  }
}
</style>
