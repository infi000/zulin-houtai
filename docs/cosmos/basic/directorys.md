<!--
 * @Author: 李淳
 * @Date: 2020-06-30 14:50:34
 * @LastEditTime: 2020-08-03 17:01:29
 * @LastEditors: 李淳
 * @Description: In User Settings Edit
 * @FilePath: /cosmos/docs/cosmos/directorys.md
-->

# Cosmos目录结构

> 李淳 @2020-06-30

如下为使用sofa生成的代码结构。

```javascript
    |-- .eslintignore
    |-- .eslintrc.js                // eslint配置文件
    |-- .npmrc                      // npm内源配置，部分npm包发布为内部包
    |-- CONTRIBUTING.md
    |-- LICENSE.md
    |-- README.md
    |-- build.sh                    // Jenkins build标准文件
    |-- package-lock.json
    |-- package.json
    |-- sofa.config.js              // 框架使用sofa作为辅助工具套件，此为配置文件
    |-- sofa.template.config.js     // sofa模板配置文件
    |-- tsconfig.json
    |-- yarn.lock
    |-- .vscode                     // 项目开发推荐使用VScode，并推荐了
    |   |-- extensions.json
    |   |-- settings.json
    |-- docs                        // 项目及框架文档
    |-- internals
    |   |-- generators              // 代码生成工具
    |   |-- scripts
    |   |   |-- analyze.js
    |   |   |-- clean.js
    |   |   |-- deploy.js
    |   |   |-- extract-intl.js
    |   |   |-- generate-templates-for-linting.js
    |   |   |-- npmcheckversion.js
    |   |   |-- helpers
    |   |       |-- checkmark.js
    |   |       |-- get-npm-config.js
    |   |       |-- progress.js
    |   |       |-- xmark.js
    |   |-- webpack                 // cosmos已经封装了一套DX，但是也开放了webpack配置入口
    |       |-- webpack.dev.babel.js
    |       |-- webpack.prod.babel.js
    |-- src
        |-- index.tsx               // 入口
        |-- AppRouter.tsx           // 核心路由模块
        |-- i18n.js                 // 国际化
        |-- configs                 // 核心配置
        |   |-- auth.conf.js        // 权限配置
        |   |-- base.conf.d.ts
        |   |-- base.conf.js        // 项目基础信息配置，包括国际化、分页等配置
        |   |-- dev.deploy.conf.js  // 远程部署配置
        |   |-- dev.proxy.conf.js   // 开发接口代理配置
        |   |-- dev.server.conf.js  // 开发Server配置
        |   |-- longan.conf.js      // 埋点及上报配置
        |   |-- router.conf.tsx       // 路由及菜单配置
        |   |-- pass.conf.js        // 登录页面配置
        |-- components              // 公共组件
        |   |-- Button
        |-- containers              // 公共带数据组件
        |   |-- AuthController
        |   |   |-- checkAuth.tsx
        |   |   |-- index.tsx
        |-- pages                   // 页面
        |   |-- AuthGroupManage
        |   |   |-- constants.ts
        |   |   |-- index.tsx
        |   |   |-- messages.ts
        |   |   |-- saga.ts
        |   |   |-- selectors.ts
        |   |   |-- services.ts
        |   |   |-- slice.ts
        |   |   |-- sofa.template.config.js
        |   |   |-- types.ts
        |   |   |-- modules
        |   |       |-- AuthGroupFormTable.tsx
        |   |       |-- AuthGroupModal.tsx
        |-- static                  // 静态文件
        |   |-- images
        |       |-- favicon.ico
        |       |-- homepage.png
        |-- store                   // 全局状态
        |   |-- asyncSaga.ts        // 全局异步控制
        |   |-- configureStore.ts
        |   |-- globalSlice.ts      // 全局状态管理
        |   |-- initSaga.ts         // 初始化数据控制
        |   |-- reducers.ts
        |   |-- selectors.ts
        |   |-- services.ts
        |   |-- types.ts
        |-- styles                  // 全局样式管理
        |   |-- global.less
        |   |-- theme
        |       |-- cover.less
        |       |-- index.less
        |-- templates               // html模板
        |   |-- index.html
        |-- translations            // 国际化翻译文档
        |   |-- en-US.json
        |   |-- zh-CN.json
        |-- types                   // 全局类型定义
        |   |-- global.d.ts
        |   |-- index.ts
        |   |-- modules.d.ts
        |-- utils                   // 公共方法、国际化数据、常量定义等
            |-- checkStore.js
            |-- constants.ts
            |-- filters.ts
            |-- history.js
            |-- loadSofaMap.tsx
            |-- loadable.js
            |-- messages.ts
            |-- redux-injectors.ts
            |-- regExps.ts
            |-- renders.tsx
            |-- request.ts
            |-- selectorsFactory.ts
            |-- utils.ts
            |-- validators.ts
            |-- @reduxjs
            |   |-- toolkit.tsx
            |-- types
                |-- injector-typings.ts
```
