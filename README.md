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
import '@jun1999/components/dist/style.css'
```

## 组件列表

- 图片查看器
- 视频播放器
- 音频播放器

## 示例

```vue
<template>
  <img-viewer :src="imageUrl" />
  <video-player :src="videoUrl" />
  <audio-player :src="audioUrl" />
</template>

<script setup>
import { ref } from 'vue'
import { ImgViewer, VideoPlayer, AudioPlayer } from '@jun1999/components'

const imageUrl = ref('https://example.com/image.jpg')
const videoUrl = ref('https://example.com/video.mp4')
const audioUrl = ref('https://example.com/audio.mp3')
</script>
```
