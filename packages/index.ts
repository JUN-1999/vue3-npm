//package/index.js
import FilePreview from "./FilePreview/index"; // 引入封装好的组件
import FormGrid from "./FormGrid/index"; // 引入封装好的组件
import { mediaType } from "./utils/tools"; // 导出可用的方法
const coms = [FilePreview, FormGrid]; // 将来如果有其它组件,都可以写到这个数组里
// 用于按需导入
export { FilePreview, FormGrid };

// 定义 install 方法
const install = function (Vue: any) {
  if ((install as any).installed) return;
  (install as any).installed = true;
  // 遍历并注册全局组件
  coms.map((component) => {
    Vue.component(component.name, component);
  });
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具备一个 install 方法
  install,
  mediaType,
};
