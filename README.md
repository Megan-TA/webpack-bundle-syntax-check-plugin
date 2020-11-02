# webpack-bundle-syntax-check-plugin

一个简单的检测 bundle 是否兼容到指定 ES 版本的 webpack 插件

## 背景

当我们在使用 babel 等编译工具时，为了加快编译速度，往往都会排除掉 node_modules，这样会跳过 node_modules 文件夹，加快编译速度。
但这样做的话，意味着我们完全信任第三方模块（一定转义成通用的 ES2015 版本），完全信任的结果有时候会比较糟糕，有一些知名的第三方依赖并未输出 ES2015 版本，
这样会导致有些机型不能识别 ES2016 及更高版本语法而报错，这个插件目的是在编译的过程中检测所有输出的 bundle，看 bundle 是否符合指定 ES 规范。
这样根据报错信息在 babel 配置忽略跳过对应规则的文件。

## 安装

```bash
npm install webpack-bundle-syntax-check-plugin --save-dev
```

## 使用

```javascript
const { BundleSyntaxCheckerPlugin } = require("webpack-bundle-syntax-check-plugin");

module.exports = {
    plugins: [
        new BundleSyntaxCheckerPlugin({esVersion: 5}
    ]
}
```

## 说明

当检测到 bundle 有不符合对应 ES 规范时，会抛出对应错误和错误的行数，同时在根目录下将出错的源文件 bundle 输出到一个名为`error-souce.js`的文件。
根据抛出错误信息提示的错误行数找到具体错误位置排查即可
