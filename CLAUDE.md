# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 提供在此代码库中工作的指导。

## 项目概述

这是一个 React + TypeScript 前端应用，用于医药面客系统（运营端）。项目使用 Cosmos 框架（cosmos-builder-webpack），这是一个用于大型中后台管理系统的内部集成框架。

## 技术栈

- **语言**: TypeScript 3.8.3
- **框架**: React 16.8+ + Ant Design 4.0+
- **构建**: Webpack 4&5，通过 cosmos-builder-webpack
- **状态管理**: Redux Toolkit + Redux Saga + redux-injectors
- **路由**: react-router-dom + cosmos-router
- **样式**: Less + styled-components
- **国际化**: react-intl

## 常用命令

```bash
# 启动开发服务器
npm start

# 生产环境构建
npm run build

# 生成新页面/组件代码（使用 plop 模板）
npm run newPage
# 或
plop

# Git 提交（使用规范化的提交信息）
npm run cm

# 提取国际化字符串
npm run extract-intl

# 检查暂存文件（预提交时自动运行）
npm run lint:staged
```

## 项目架构

### 目录结构

```
src/
├── components/      # 可复用的 UI 组件
├── configs/         # 配置文件（路由、代理、权限等）
├── containers/      # 容器组件
├── hooks/           # 自定义 React Hooks
├── pages/           # 页面组件（每个页面是一个功能模块）
├── static/          # 静态资源（图片、图标等）
├── store/           # Redux store 配置
├── styles/          # 全局样式（Less）
├── translations/    # 国际化消息文件
├── types/           # TypeScript 类型定义
└── utils/           # 工具函数
```

### 页面结构模式

`src/pages/` 中的每个页面都遵循一致的模式：
- `index.tsx` - 主页面组件
- `slice.ts` - Redux slice（状态和 reducers）
- `saga.ts` - Redux saga（异步副作用）
- `services.ts` - API 服务调用
- `types.ts` - 页面特定的 TypeScript 类型
- `selectors.ts` - 记忆化选择器
- `adapter.ts` - 数据规范化/转换
- `modules/` - 页面特定的子组件

示例页面：OrderManager、UserInfoManager、EquipmentManager 等

### 状态管理

应用使用 Redux Toolkit 和 redux-injectors 进行代码分割：
- Reducers 和 sagas 在页面加载时延迟注入
- Store 配置：`src/store/configureStore.ts`
- 全局状态：`src/store/globalSlice.ts`
- 每个页面使用 `useInjectReducer` 和 `useInjectSaga` 注入自己的 reducer/saga

### 路由配置

路由配置位于 `src/configs/dev.router.conf.tsx`：
- 菜单结构和页面组件映射
- 每个路由映射到 `src/pages/` 中的一个页面组件

### 样式

- 全局样式位于 `src/styles/`
- 通过 Less 变量自定义 Ant Design 主题
- 组件特定样式使用 CSS modules 或 styled-components

### 国际化

- 消息文件位于 `src/translations/`
- 运行 `npm run extract-intl` 提取新字符串
- 消息根据选择的语言动态加载

## 配置文件

- `src/configs/dev.proxy.conf.js` - 开发环境 API 代理配置
- `src/configs/auth.conf.ts` - 权限/认证配置
- `tsconfig.json` - TypeScript 配置（包含路径别名）
- `.cosmosrc.js` - Cosmos 框架配置
- `.cz-config.js` - Commitizen 规范化提交配置

## 开发注意事项

1. **代码生成**：使用 `npm run newPage` 生成遵循既定模式的新页面/组件
2. **API 代理**：在 `src/configs/dev.proxy.conf.js` 中配置 API 端点
3. **Git 提交**：使用 `npm run cm` 进行规范化提交（在 .cz-config.js 中配置）
4. **热更新**：开发服务器支持热模块替换
5. **Node 版本**：使用 Node 12.12.0（由 Volta 管理）
