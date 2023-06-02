<!--
 * @Author: zhangning
 * @Date: 2020-06-29 20:10:10
 * @LastEditors: 李淳
 * @LastEditTime: 2020-07-15 16:02:09
 * @Description: 代码的快速生成
-->

# 代码生成工具

> 张宁 @2020-06-29

代码生成包含两方面的内容
cosmos使用了两种代码生成工具，一种是基于本地代码模板的plop方案，一种是基于云端代码模板的sofa方案。

| ITME     | Tool         | Command                  | Remark         |
| -----------| --------------| --------------| --------------|
| 项目初始化   | sofa          | sofa cosmos [projectNam] | |
| 页面初始化   | sofa          | sofa create module | 云端模板，选择丰富 |
| 页面初始化   | 本地plop工具    | npm run generate | 本地模板，灵活易编辑 |
| 组件初始化   | sofa          | sofa create component | 云端模板，选择丰富 |
| 组件初始化   | 本地plop工具    | npm run generate | 本地模板，灵活易编辑 |

## plob

 -执行 npm run generate，根据交互选择项，生成代码

#### plob component
 - name
 - memo
 - wantMessages
 - wantStyledComponent

#### plob container
 - name
 - memo
 - wantIndependentReducer
 - wantMessages

#### plob page
 - name
 - memo
 - wantActionsAndReducer
 - wantService
 - wantSaga
 - wantMessages
 - wantLoadable

### sofa
 - 执行 npm run new-page，选择物料库模板或本地页面模板，生成克隆的代码
 - 执行 npm run new-component，选择物料库组件模板，生成克隆的代码

### sofa安装、升级说明
- 全局安装 sudo npm install --unsafe-perm -g sofa-scripts
- 说明1:安装过程中使用默认数据库秘钥即可
- 说明2:如使用时遇到权限问题，可执行 sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share} 修改权限
- 版本升级 sudo npm update -g sofa-scripts

### 项目脚手架初始化（sofa>1.1.9）
- 在命令行执行 sofa cosmos [projectName]，实现 克隆和替换统一框架的项目代码；

- 执行成功后，数据库自动新增记录，作为自我管理的依据，数据行记录如下：
| 字段                    | 含义                          |
| -------------          | ------------------------------|
| id   | 记录唯一ID                   |
| name   | 项目名称                   |
| templateId   | 脚手架的固定ID                          |
| operator  | 创建者，username或email                         |
| config | 更多上报信息：{ version: 0.0.2 }，创建项目时基于的版本 |
| createdAt  | 创建时间 |

### sofa命令说明
| 指令                    | 功能                           |
| -------------          | ------------------------------|
| sofa version   | 查看本地全局sofa的版本号，查看远程最新sofa版本                    |
| sofa ls   | 查看物料库模板信息                             |
| sofa update  | 更新物料库的模板信息                         |
| sofa publish | 发布公共模板，需要有独立的仓库 |
| sofa create module/component  | 选择模板，生成克隆的代码 |

### cosmos自我管理
 - 在cosmos目录下，执行 sofa update，会创建新tag，并更新数据库记录

### 从0开始使用sofa搭建项目
- 若安装了sofa可忽略此步骤：执行sudo npm install --unsafe-perm -g sofa-scripts
- 执行sofa cosmos [projectName]，实现项目初始化落地
- 创建空的可用的page、container、component，执行 npm run generate
- 创建远程物料文件或本地现有的文件, 执行 npm run new-page: 创建页面，npm run new-component:创建组件
