<!--
 * @Author: 李淳
 * @Date: 2020-07-01 14:50:50
 * @LastEditors: 李淳
 * @LastEditTime: 2020-07-20 13:54:13
 * @Description: file content
-->

# 项目名称

本项目采用了cosmos集成框架开发，cosmos一个集大体量、稳定、易拆易合等特点于一身的统一中后台集成框架，将前端团队以往以及当前的积累沉淀下来，提升团队开发体验、加快团队开发速度、促进团队技术的统一与融合。

> 可运行 npm run docs命令，查看更细粒度的项目文档。

> 可运行 npm run docs:cosmos命令，查看Cosmos框架文档。

## 项目介绍

--

## 开发工具

首选VSCode;

## 语言选型

TypeScript 3.8.3

## 基础框架选型

React 16.8+
Antd 4.0+
Webpack 4&5

## 环境及账号维护

| 环境名称         | 访问地址         |  账号       |  密码        |备注        |
| ----------- | --------------------|------------|---------|--------|
| UAT环境 | http://uat.sftcwl.com| test | 1q2w3e4r|    |
| Online | http://online.sftcwl.com| test | 1q2w3e4r|  管理员  |
| Online | http://online.sftcwl.com| test2 | 1q2w3e4r|  普通用户  |

## Cosmos具备功能

1. 配套脚手架，快速初始化项目、快速生成代码；
2. 配套开发模版，Map、Form、Chart等；
3. 成套国际化方案，messages管理方案、提取工具等；
4. 便捷开发工具，loading、防连击、数据转换等；
5. 路由管理方案；
6. 合理的文件结构；
7. 统一的状态数据管理；
8. 优越的编译打包方案，分包加载、合理优化等；
9. 合理的样式管理方案；
10. 搭载辅助开发，热更新、mock代理、prod部署等，加快开发进程；
11. 成熟的开发规范和开发约定，eslint、commit提交、git分支、文档化；

## 常用命令

| 指令                    | 功能                           |
| -------------          | ------------------------------|
| npm run install   | 安装依赖                             |
| npm run start   | 启动项目                               |
| npm run build   | 打包                                  |
| npm run deploy xx | 部署到机器xx，新增机器需在/src/configs/dev.deploy.conf中添加机器及对应文件地址 |
| npm run generate  | 快速生成component、container、translation 文件 |
| npm run cm  | 进行git commit |

## Mock方法

1. 内网搭建Easy Mock，服务地址是 http://easy-mock.sftcwl.com；
2. 创建账号并登陆，创建项目后进入项目创建接口；
3. 复制项目base url，在src/configs/dev.proxy.config.js文件中使用常量命名添加base url代理地址，e.g. const mockServer = 'http://easy-mock.sftcwl.com/mock/5ebc25690e1f322cd339b684'；
4. module.exports模块导出中新增接口-代理环境映射匹配规则，e.g.'/user': mockServer；
5. npm run start启动项目即可使用app.use()顺序执行匹配规则；

## 文档管理

### docsify使用

| 指令                    | 功能                                  |
| -------------          | -------------------------------------|
| npm i docsify-cli -g   | 安装依赖                               |
| docsify serve docs     | 启动docs,实时预览                       |
| docsify serve docs -p port | 启动docs指定端口 `localhost:port `  |

### 文档维护说明

- 新增维护记录，在`/docs/project/changeLog`中添加维护记录文件，命名`logMMDD`，在`/docs/project/changeLog/logMMDD`文件中简述此次维护内容，需要时附上对应docsify文档说明文件目录进行快速跳转定位；
- 新增项目说明，在`/docs/project/xxx`中添加新增说明文件，详细描述对应功能和使用；
- 新增说明和维护记录均需在`_sidebar.md`中增加对应目录；
