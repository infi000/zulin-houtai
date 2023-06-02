<!--
 * @Author: 李淳
 * @Date: 2020-07-14 18:17:50
 * @LastEditors: 李淳
 * @LastEditTime: 2020-07-20 17:22:44
 * @Description: file content
-->

# Cosmos

Cosmos是一个面向企业级中后台开发的集成框架，它将前端团队当前及以往的优秀成果整理沉淀下来，提供了一套完整的开发解决方案，旨在提升团队开发体验、加快开发速度、提高代码可维护性、促进团队技术的融合和提升。

它囊括了开发脚手架、构建工具包、部署工具包、开发最佳实践、开发交互规范等等，全方位的引导大家更高效的写出优质、可维护的代码；当然，不可避免的它在一定程度上带来了开发上的限制和约束，但企业级框架会更focus到全局最优和更低的协作维护成本。

同时它针对当前的高频业务场景进行了实践优化，并意图提供高效的可视化开发辅助工具，助力大家低成本的完成高相似度需求的开发；

希望所有的同学都能够积极的投入到框架的优化和迭代中。

## 为什么叫Cosmos?

cosmos [ˈkɒzmɒs] 是宇宙、和谐、秩序的意思，也是高斯奥特曼的名字。此项目起源于科技供应链的GS（高斯）集成框架项目，由于项目规划与横向的统一框架的诉求一致，因此沿用了高斯奥特曼的另一个名字，cosmos，同时，这个单词表意为“和谐”、“秩序”，也与统一框架的整体建设目标相吻合，即以此为依托建立前端开发的大秩序。

## Cosmos全貌

如下图为cosmos的全貌，囊括了大部分开发中涉及的各类选型和方案，其中标红的部分为我们发布的npm包。

![avatar](../images/cosmos.png)

### 基础选型

| Package                    | Version                           |
| -------------          | ------------------------------|
| react   | V16.8+                             |
| typescript   | V3.8.3                               |
| antd   | V4.0+                                 |
| node.js  | V10.16+ |
| npm  | V6.9+ |

自研npm包

| ITME     | Package         | Address                  | Author                  |
| -----------| --------------| --------------|--------------|
| 路由控制   | cosmos-router       | http://10.188.40.249/-/web/detail/cosmos-router|  李晨   |
| 工具方法集   | cosmos-utils       | http://10.188.40.249/-/web/detail/cosmos-utils|  王承乾、任亚楠   |
| 地图   | sofa-map           | http://gitlab.sftcwl.com/fe/sofa-map|   杨扬        |
| 打印   | easy-print       | http://10.188.40.249/-/web/detail/easy-print |   董方旭        |

### 数据状态管理

为降低协作成本，严格维护数据状态，cosmos推荐全局使用状态管理，选型为 **redux-toolkit**，详细方案见文档：
[状态管理方案](/advanced/state.md)

### 脚手架及辅助开发工具

脚手架工具依托于自研的**sofa**工具，实现项目的初始化；同时也为开发过程中也提供了方便的快速代码工具：

| ITME     | Tool         | Command                  | Remark         |
| -----------| --------------| --------------| --------------|
| 项目初始化   | sofa          | sofa cosmos [projectNam] | |
| 页面初始化   | sofa          | sofa create module | 云端模板，选择丰富 |
| 页面初始化   | 本地plop工具    | npm run generate | 本地模板，灵活易编辑 |
| 组件初始化   | sofa          | sofa create component | 云端模板，选择丰富 |
| 组件初始化   | 本地plop工具    | npm run generate | 本地模板，灵活易编辑 |

详细方案见文档：
[快速代码辅助工具](/advanced/generate.md)

### 构建工具

自研**cosmos-builder-webpack**工具，以webpack为核心，聚焦于工程化流程中的本地开发、编译、构建、部署等方面的最佳实践，实现了0配置使用，也开放了手动配置渠道，详细方案见文档：
[cosmos-builder-webpack](/advanced/build.md)

### 开发规范&方案

cosmos针对开发中的静态代码规范、标准交互、样式管理、Git分支、Git提交记录等都进行了详尽的管理，开发之前务必详细阅读以下文档。此外cosmos还针对Typescript使用、国际化等给出了具体的实施方案，这些规范和方案不仅适用于cosmos，也具备普适性。

| Index                   | Docs                          | Author  |
| -------------          | ------------------------------|--------|
| 1  | [静态代码规范](/developSpecification/eslint.md)       |任亚楠|
| 2  | [标准交互规范](/interactionSpecification/loading.md)   |尚万郑、宋书鹏|
| 3  | [样式管理规范](/stylesAndAssets/css.md)       |魏延、解天玉|
| 4  | [GIT分支管理规范](/developSpecification/git-branch.md) |李淳|
| 5  | [GIT提交记录规范](/developSpecification/git-commit.md) |王承乾|
| 6  | [TypeScript类型管理方案] |赵骐|
| 7  | [系统国际化方案] |韩秀敏|

### Cosmos框架升级及自管理

[cosmos-builder-webpack](/advanced/build.md)
