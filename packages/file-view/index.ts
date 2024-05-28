import fileView from './src/index.vue' // 如果这里报红， 加一个env.d.ts，再去 tsconfig.json 里面这样配置："include": ["packages/**/*.ts", "packages/**/*.d.ts", "packages/**/*.tsx", "packages/**/*.vue", "./*.d.ts"],


// 为组件添加 install 方法，用于按需引入
// 如果想通过CDN方式引入，需要编写install函数
fileView.install = function (Vue: any) {
    // 注册组件
    Vue.component('FileView', fileView)
}
export default fileView
