<template>
  <div ref="ImgBoxRef" id="img-box" class="img-box">
    <div
      :style="{
        transform: `translate(${img_x}px,${img_y}px) `,
      }"
      class="img-item"
    >
      <img
        :style="{
          transform: `scale(${img_scale}) rotate(${img_rotate}deg)`,
        }"
        ref="ImgRef"
        :src="url"
        id="img"
        draggable="false"
      />
      <div v-show="scale_change_show" class="scale-num">
        {{ parseInt(img_scale * 100 + "").toFixed(0) }}%
      </div>
    </div>
    <div class="img-tool">
      <img @click="changeScale(-0.5)" src="../../icon/lessen.svg" alt="" />
      <img @click="changeScale(0.5)" src="../../icon/magnify.svg" alt="" />
      <img
        @click="changeRotate(-90)"
        class="left-rotate"
        src="../../icon/rotate.svg"
        alt=""
      />
      <img
        @click="changeRotate(90)"
        class=""
        src="../../icon/rotate.svg"
        alt=""
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

defineProps<{
  url: string;
}>();

// == 图片操作逻辑
// 图片和图片盒子的dom对象
const ImgBoxRef = ref<HTMLDivElement>();
const ImgRef = ref<HTMLImageElement>();
let timer: number = 0;
const scale_change_show = ref(false);
// 图片缩放
const img_scale = ref(1);
// 图片旋转
const img_rotate = ref(0);
// 图片位移
const img_x = ref(0);
const img_y = ref(0);
// 按钮改变缩放
const changeScale = (num: number) => {
  // 防抖
  scale_change_show.value = true;
  if (timer) {
    clearTimeout(timer);
    timer = 0;
  }
  timer = setTimeout(() => {
    scale_change_show.value = false;
  }, 800);
  // 限制最小缩放
  const minScale = 0.3;
  if (img_scale.value > minScale || num > 0) {
    img_scale.value += num;
    img_scale.value = Math.max(img_scale.value, minScale);
  }
};
// 按钮改变旋转
const changeRotate = (num: number) => {
  img_rotate.value += num;
};
// 鼠标滚动缩放
const mouseWheel = () => {
  if (ImgBoxRef && ImgBoxRef.value) {
    // 缩放效果(wheel--鼠标滚轮事件)
    ImgBoxRef.value.addEventListener("wheel", (e: any) => {
      // 大于0:滚轮向上滚动  小于0:滚轮向下滚动
      changeScale(e.wheelDelta > 0 ? 0.1 : -0.1);
    });
  }
};
// 图片拖拽功能
const imgMove = () => {
  if (ImgRef.value) {
    // 拖拽效果
    ImgRef.value.onmousedown = function (e: any) {
      let start_img_x = img_x.value;
      let start_img_y = img_y.value;
      // 获取鼠标按下时的值
      let startX = e.clientX;
      let startY = e.clientY;

      // 给盒子添加鼠标移动事件，获取移动后视口的值
      if (ImgBoxRef.value) {
        ImgBoxRef.value.onmousemove = function (event: any) {
          // 获取鼠标移动时的值，并更新图片绝对定位的值
          img_x.value = event.clientX - startX + start_img_x;
          img_y.value = event.clientY - startY + start_img_y;
        };
      }
    };

    // 鼠标抬起，清除移动事件
    document.addEventListener("mouseup", () => {
      if (ImgBoxRef.value) {
        ImgBoxRef.value.onmousemove = null; // 清除move事件
      }
    });
  }
};
onMounted(() => {
  mouseWheel();
  imgMove();
});

const initImg = () => {
  // 初始化参数
  img_scale.value = 1;
  img_rotate.value = 0;
  img_x.value = 0;
  img_y.value = 0;
};
defineExpose({
  initImg,
});
</script>
<style lang="scss" scoped>
.img-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .img-item {
    width: 70%;
    height: 70%;
  }
}
.scale-num {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 7px;
  background-color: rgba($color: #000000, $alpha: 0.3);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.img-tool {
  position: fixed;
  box-sizing: content-box;
  width: 200px;
  height: 50px;
  padding: 0 20px;
  border-radius: 50px;
  bottom: 5vh;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba($color: #fff, $alpha: 0.4);
  img {
    width: 24px;
    height: 24px;
  }
  .left-rotate {
    transform: rotateY(-180deg);
  }
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: scale(1);
  transform-origin: center;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
