# uni-app-vue3-tailwind-hbuilder-template

- [uni-app-vue3-tailwind-hbuilder-template](#uni-app-vue3-tailwind-hbuilder-template)
  - [从 0 到 1 的搭建过程](#从-0-到-1-的搭建过程)
    - [新建一个`uni-app`项目](#新建一个uni-app项目)
    - [添加 `tailwind.config.js`](#添加-tailwindconfigjs)
    - [在 `App.vue` 中引入 `tailwindcss`](#在-appvue-中引入-tailwindcss)
  - [HbuilderX 智能提示工具](#hbuilderx-智能提示工具)
  - [Related projects](#related-projects)
    - [插件核心](#插件核心)
    - [CLI 工具](#cli-工具)
    - [模板 template](#模板-template)
    - [预设 tailwindcss preset](#预设-tailwindcss-preset)
  - [Bugs & Issues](#bugs--issues)

这是一个使用 `hbuilderx` + `uni-app` + `vue3` + `tailwind` 构建的小程序模板。可以直接在 `hbuilderx` 中导入运行。

## 从 0 到 1 的搭建过程

### 新建一个`uni-app`项目

在这个项目里，添加 `.gitignore`,`package.json`,`vite.config.js` 文件

`.gitignore` 中，把 `node_modules`,`unpackage`,`.hbuilderx` 这一类不像被添加到 `git` 的添加进去。
```txt
unpackage
node_modules
.hbuilderx
```

然后我们 `npm init -y` 在项目根目录创建一个 `package.json`，并安装依赖：

```json
{
  "devDependencies": {
    "autoprefixer": "^10.4.8",
    "postcss": "^8.4.14",
    "postcss-rem-to-responsive-pixel": "^5.1.3",
    "tailwindcss": "^3.1.7",
    "weapp-tailwindcss-webpack-plugin": "^1.6.10"
  }
}

```

然后添加 `vite.config.js` 文件，注册 `weapp-tailwindcss-webpack-plugin`:

```js
import path from "path";
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import vwt from "weapp-tailwindcss-webpack-plugin/vite";
import postcssWeappTailwindcssRename from "weapp-tailwindcss-webpack-plugin/postcss";
// 注意： 打包成 h5 和 app 都不需要开启插件配置
const isH5 = process.env.UNI_PLATFORM === "h5";
const isApp = process.env.UNI_PLATFORM === "app";
const WeappTailwindcssDisabled = isH5 || isApp;
// vite 插件配置
const vitePlugins = [uni()];

const resolve = (p) => {
  return path.resolve(__dirname, p);
};

const postcssPlugins = [
  require("autoprefixer")(),
  require("tailwindcss")({
    config: resolve("./tailwind.config.js"),
  }),
];
if (!WeappTailwindcssDisabled) {
  vitePlugins.push(vwt());
  postcssPlugins.push(postcssWeappTailwindcssRename({}));
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: vitePlugins,
  // 假如 postcss.config.js 不起作用，请使用内联 postcss Latset
  css: {
    postcss: {
      plugins: postcssPlugins,
    },
  },
});
```


### 添加 `tailwind.config.js`

```js
const path = require("path");
const resolve = (p) => {
  return path.resolve(__dirname, p);
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./**/*.vue"].map(resolve),
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
```

这里特别注意，在声明所有路径时，必须声明为绝对路径!!!

因为 `hbuilderx` 有这样一个读取配置的策略：如果目标目录是相对路径，就会读取 `'\HBuilderX\plugins\uniapp-cli\'` 目录下的文件，这直接导致配置找不到，导致项目无法启动。


### 在 `App.vue` 中引入 `tailwindcss`

```html
<style lang="scss">
/*每个页面公共css */
@import "tailwindcss/base";
@import "tailwindcss/utilities";
</style>
```

现在，你就可以在 `hbuilderx` 中愉快的使用 `tailwindcss` 了！

## HbuilderX 智能提示工具

DCloud-HBuilderX团队提供了对应的插件，可以去 

https://ext.dcloud.net.cn/plugin?id=8560 进行下载，即可产生智能提示。

## Related projects

### 插件核心

[weapp-tailwindcss-webpack-plugin](https://github.com/sonofmagic/weapp-tailwindcss-webpack-plugin) 提供转义功能，欢迎 `fork`/`star`

### CLI 工具

[weapp-ide-cli](https://github.com/sonofmagic/utils/tree/main/packages/weapp-ide-cli): 一个微信开发者工具命令行，快速方便的直接启动 ide 进行登录，开发，预览，上传代码等等功能。

### 模板 template

[uni-app-vite-vue3-tailwind-vscode-template](https://github.com/sonofmagic/uni-app-vite-vue3-tailwind-vscode-template)

[uni-app-vue3-tailwind-vscode-template](https://github.com/sonofmagic/uni-app-vue3-tailwind-vscode-template)

[uni-app-vue2-tailwind-vscode-template](https://github.com/sonofmagic/uni-app-vue2-tailwind-vscode-template)

[weapp-native-mina-tailwindcss-template](https://github.com/sonofmagic/weapp-native-mina-tailwindcss-template)

### 预设 tailwindcss preset

[tailwindcss-miniprogram-preset](https://github.com/sonofmagic/tailwindcss-miniprogram-preset)

## Bugs & Issues

目前这个插件正在快速的开发中，如果遇到 `Bug` 或者想提出 `Issue`

[欢迎提交到此处](https://github.com/sonofmagic/weapp-tailwindcss-webpack-plugin/issues)