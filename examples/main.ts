import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 本地开发

// 打包之后测试
import "../dist/style.css";

// 测试发布的包
// import '@jun1999/file-view/dist/style.css';

createApp(App).mount('#app');
