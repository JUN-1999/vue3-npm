import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 本地开发

// 打包之后测试
// import "../dist/style.css";  

// 测试发布的包样式
// import '@jun1999/components/dist/style.css';

createApp(App).use(ElementPlus).mount("#app");
