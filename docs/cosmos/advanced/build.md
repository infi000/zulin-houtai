<!--
 * @Author: your name
 * @Date: 2020-06-30 14:36:38
 * @LastEditTime: 2020-07-15 22:11:46
 * @LastEditors: 李淳
 * @Description: In User Settings Edit
 * @FilePath: /cosmos/docs/cosmos/build.md
-->

# cosmos-builder-webpack


> 尚万郑 @2020-06-30

 集成打包工具：可以理解为我们提供一套“最佳实践”，可以导出配置自己去修改。这样我们可以将精力都放在找“最佳实践”上。

## 特性

*  **可扩展**，导出了默认的webpack配置，支持使用外部webpackConfig打包。
*  **开箱即用**，提供了默认方案，“0配置”打包。
*  **最佳实践**，精研前端打包方案，提供通用的打包“最佳实践”。
*  **面向未来**，在满足需求的同时，我们也不会停止对新技术的探索。

## 快速上手


```bash
# 创建目录
$ mkdir myapp && cd myapp

# 安装依赖
$ yarn add cosmos-builder-webpack

# 启动开发
$ npx cosmos-builder-webpack server

# 生成prod
$ npx cosmos-builder-webpack build
```

## 使用简介
### case1：我想要加一些配置
#### 1. 引入默认配置：
```javascript
const cosmosCliService = require('cosmos-builder-webpack');
const {  
  // webpack配置  对象 里面有dev 和 build 2个属性 分别对应 server和build命令运行时的默认配置
  buildConf, 
  // dev-server的默认配置 暂时支持 修改port 和 proxy
  serverConf,
  // 用它来merge webpack配置
  merge 
} = cosmosCliService;
// 自己的webpack配置
const conf = {
  // webpack配置
}
// 导出结果 cosmos-builder-webpack 将使用merge结果打包
module.exports = merge(buildConf.dev, conf);
```
一些注意事项：
* `merge` 得到的结果还是webpack配置，它是能直接被当作`webpack-cli`的config来用的
* `merge` $\color{#FF3030}{目前没有}$任何的判断冲突的策略，需要使用者自己保证config没有冲突。


#### 2. 修改打包命令
   
```bash

# server命令
$ cosmos-builder-webpack server -bc <新的webpack配置> -sc <新的dev-server配置>
# cosmos-builder-webpack server -bc xxx/webpack.dev.js -sc xxx/dev.server.conf.js
# 生成prod
$ cosmos-builder-webpack build -bc <webpack配置> 
# cosmos-builder-webpack server -bc xxx/webpack.prod.js
```

### 环境变量
#### NODE_ENV

不传默认build命令为`production`，server为`development`

```bash
$ NODE_ENV=development cosmos-builder-webpack build
```
#### SHOW_SPEED_MEASURE

分析 Webpack 编译时间，支持 `CONSOLE` 和 `JSON` 两种格式，默认是 `JSON`。

```bash
$ SHOW_SPEED_MEASURE=CONSOLE cosmos-builder-webpack build
```

### 各种方案

#### 1. TS的处理
  我们采用了`babel-loader`去处理TS，它的做法是直接移除了TS语法，带来了更快的编译速度，但是无法进行类型检查，需要使用者自己依靠编辑器的类型检查或者使用第三方插件例如[fork-ts-checker-webpack-plugin](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin)
#### 2. polyfill
  按照面向未来的原则，我们拥抱了最新的babel-polyfill方案，使用`core-js@3.x`版本并对所有入口做按需引入，所有使用者理论上不用关心polyfill的问题（polyfill的目标： chrome: 49, firefox: 64, safari: 5, edge: 13, ios: 10, ie: 11 ）。
#### 3. 分包策略
  对满足以下条件的包，进行拆分：
  * 第三方（node_modules下）
  * `size > 100kb` 这个应该是原包尺寸，所以打出来也会有小于100kb的包
  * 最多支持`10`个拆分包，意思是比如所有入口加起来有12个第三方依赖且满足上述2个条件，那我只会取前`10`个最大的打成包，原因是浏览器最大的请求并发数为10（ie8）
### 4. gzip
  我们对超过`10kb`的包会生成gzip文件，以空间换时间
  