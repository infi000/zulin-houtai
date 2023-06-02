
![](https://user-gold-cdn.xitu.io/2019/6/20/16b7402f07024463?w=588&h=200&f=png&s=4953)
<!-- @import "[TOC]" {cmd="toc" dept_codehFrom=1 dept_codehTo=6 orderedList=false} -->

<!-- code_chunk_output -->
# Git提交规范

> 王承乾 @2020-07-01

- [一、用什么规范？](#一-用什么规范)
- [二、快速开始](#二-快速开始)
  - [1. 全局安装commitizen & cz-conventional-changelog](#1-全局安装commitizen-cz-conventional-changelog)
  - [2. 如何提交代码](#2-如何提交代码)
    - [使用方法](#使用方法)
    - [模块介绍](#模块介绍)
  - [3. 提交示例](#3-提交示例)
    - [完整的commit message示例](#完整的commit-message示例)
    - [相应的git log](#相应的git-log)
- [三、扩展功能](#三-扩展功能)
  - [1. 为commit message添加格式校验](#1-为commit-message添加格式校验)
    - [项目内安装commitlint & husky](#项目内安装commitlint-husky)
    - [相关配置](#相关配置)
  - [2. 自定义提交规范](#2-自定义提交规范)
    - [全局安装cz-customizable](#全局安装cz-customizable)
    - [创建配置文件](#创建配置文件)
- [四、在智慧经营中心FE落地情况](#四-在智慧经营中心fe落地情况)
    - [1. 自定义规范](#1-自定义规范)
    - [2. 项目中的配置](#2-项目中的配置)
- [五、扩展阅读](#五-扩展阅读)

<!-- /code_chunk_output -->

> git是现在市面上最流行的版本控制工具，书写良好的commit message能大大提高代码维护的效率。但是在日常开发中由于缺少对于commit message的约束，导致填写内容随意、质量参差不齐，可读性低亦难以维护。在项目中引入commit message规范已是迫在眉睫。

## 一、用什么规范？

现在市面上比较流行的方案是**约定式提交规范（Conventional Commits）**，它受到了**Angular提交准则**的启发，并在很大程度上以其为依据。**约定式提交规范**是一种基于提交消息的轻量级约定。 它提供了一组用于创建清晰的提交历史的简单规则；这使得编写基于规范的自动化工具变得更容易。这个约定与**SemVer**相吻合，在提交信息中描述新特性、bug修复和破坏性变更。它的**commit message**格式如下:

```
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```
确定好规范之后，接下来我们可以直接开撸。

## 二、快速开始

### 1. 全局安装commitizen & cz-conventional-changelog
要想使用上面提到的规范，我们首先要放弃固有的`git commit`提交方式，寻找一种更优雅、拓展性更强的提交策略。于是我们找到了**commitizen**，它是一个撰写合格**commit message**的工具，可以取代我们常用的`git commit`，并提供了各种功能扩展的可能。

为了让**commit message**支持上文提到的**约定式提交规范（Conventional Commits）**，我们额外需要引入[cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog)适配器。它不仅提供了相应规范，还可以为我们生成**changelog**。

安装方式如下：
```
npm install -g commitizen cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

额外说明：上面两个包**可以但不推荐**在项目下进行安装，因为会产生各项目重复安装的成本。由于安装在global环境下，我们需要创建并添加`~/.czrc`相关配置文件，为**commitizen**指定Adapter。

安装完成后我们验收一下上面的成果，通过命令行输入`git cz`，一个交互式的**commit message**撰写界面映入眼帘，并且**cz-cli**、**cz-conventional-changelog**均已成功加载，cool~

![](https://i.ibb.co/3RJRjyB/WX20200106-121106.png)


### 2. 如何提交代码

#### 使用方法

- 命令行提交

执行`git cz`进入interactive模式，根据提示依次填写
```
1.Select the type of change that you're committing 选择改动类型 (<type>)

2.What is the scope of this change (e.g. component or file name)? 填写改动范围 (<scope>)

3.Write a short, imperative tense description of the change: 写一个精简的描述 (<subject>)

4.Provide a longer description of the change: (press enter to skip) 对于改动写一段长描述 (<body>)

5.Are there any breaking changes? (y/n) 是破坏性修改吗？默认n (<footer>)

6.Does this change affect any openreve issues? (y/n) 改动修复了哪个问题？默认n (<footer>)
```

生成的commit message格式如下：
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
任何`git commit`指令的`option`都能用在 `git cz`指令上, 例如`git cz -a`

- vscode插件提交

通过在vscode编辑器中安装Visual Studio Code Commitizen Support插件完成提交。

安装完毕后执行cmd + shift + p 打开命令框，输入commitizen命令后即可进入commitizen的交互界面。

![](https://i.ibb.co/VwyHrWq/WX20200106-165246.png)


#### 模块介绍

针对团队目前使用的情况，我们讨论后拟定了`commit message`每一部分的填写规则。

**type**

用于指定commit的类型，约定了feat、fix两个**主要type**，以及docs、style、build、refactor、revert五个**特殊type**，其余type暂不使用。
```
# 主要type
feat:     增加新功能
fix:      修复bug

# 特殊type
docs:     只改动了文档相关的内容
style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
build:    构造工具的或者外部依赖的改动，例如webpack，npm
refactor: 代码重构时使用
revert:   执行git revert打印的message

# 暂不使用type
test:     添加测试或者修改现有测试
perf:     提高性能的改动
ci:       与CI（持续集成服务）有关的改动
chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动
```
当一次改动包括`主要type`与`特殊type`时，统一采用`主要type`。

**scope**

用于描述改动的范围，可以按项目的模块进行拆分。

**body**

用于填写详细描述，内容涵盖**改动之前的情况**及**修改动机**，对于小的修改不作要求，但是重大需求、更新等必须添加body来作说明。

**break changes**

用于指明是否产生了破坏性修改，涉及break changes的改动必须指明该项，类似版本升级、接口参数减少、接口删除、迁移等。

**affect issues**

用于指明是否影响了某个问题。例如我们使用jira时，我们在**commit message**中可以填写其影响的`JIRA_ID`，若要开启该功能需要先打通**jira**与**gitlab**。参考文档：https://docs.gitlab.com/ee/user/project/integrations/jira.html

填写方式如下：
```
re #JIRA_ID
fix #JIRA_ID
```

### 3. 提交示例
#### 完整的commit message示例
![](https://i.ibb.co/w0WHWzN/WX20200106-161731.png)
#### 相应的git log
![](https://i.ibb.co/qxmFR6y/WX20200106-161759.png)

## 三、扩展功能
 
### 1. 为commit message添加格式校验

我们可以在提交之前对**commit message**进行格式校验，主要涉及必填项是否填写、内容是否合法等。

#### 项目内安装commitlint & husky
**commitlint**负责用于对**commit message**进行格式校验，**husky**负责提供更易用的**git hook**。

```
npm i -D husky @commitlint/config-conventional @commitlint/cli
```

**commitlint**只能做格式规范，无法判断内容是否有意义。因此对于内容质量的把控只能靠我们自己。

#### 相关配置

创建`commitlint.config.js`
```
# In the same path as package.json

echo 'module.exports = {extends: ["@commitlint/config-conventional"]};' > ./commitlint.config.js
```
引入`husky`
```
# package.json

...,
"husky": {
    "hooks": {
      "commit-msg": "commitlint -e $GIT_PARAMS"
    }
}
```

**husky**会在指定的**git hook**触发时调用相应的命令。

**commitlint**校验失败后会**停止本次提交**并**展示错误信息**，我们可以按照提示重新进行代码提交。

![](https://i.ibb.co/KXNqxWg/WX20200106-150733.png)

### 2. 自定义提交规范

如果觉得**约定式提交规范（Conventional Commits）** 使用繁琐或无法满足需求，可以采用**cz-customizable**来自定义规范。

#### 全局安装cz-customizable
```
npm install -g cz-customizable
```
#### 创建配置文件
在项目的根目录下添加`.cz-config.js`文件并按照规则进行[配置](https://github.com/leonardoanalista/cz-customizable/blob/master/cz-config-EXAMPLE.js)。

创建好之后，我们在**package.json**中为**commitizen**启用自定义配置。
```
# package.json
"config": {
   "commitizen": {
     "path": "cz-customizable"
   }
}
```
## 四、在智慧经营中心FE落地情况

#### 1. 自定义规范

我们基于**约定式提交规范（Conventional Commits）** 自定义了一套提交规范。

- 仅保留了`feat fix refactor style chore revert perf`7种日常开发需要的**commit type**，并约定了`feat fix`为**主要type**，其余为**特殊type**，当一次提交包括**主要type**与**特殊type**时，类型选择**主要type**即可。

- 对于**scope**，我们在**oms项目**中依据**文件目录**对其进行划分，并且指定了**特定的scope值**，**不允许**提交的过程中**自定义scope**，如果随着项目扩展产生了新的目录结构，在`.cz-config.js`文件中添加新的**scope**即可。依据目录划分需要我们的目录结构经过了严格约束，其思路与按模块划分大同小异。

- 我们仅**保留了**规范中的**Header**部分，去掉了Body和Footer部分。这大大简化了我们提交的撰写成本，并保留了核心内容。

- 我们还对**commitizen**的interactive界面添加了中文描述，这样能更好的服务不了解这套规范使用方式的开发者。


#### 2. 项目中的配置

项目中`.cz-config.js`文件配置示例：

```
module.exports = {
  types: [
      { value: 'feat', name: 'feat: 新功能' },
    { value: 'fix', name: 'fix: 修复 BUG' },
    {
      value: 'refactor',
      name: 'refactor: 重构代码，理论上不影响现有功能 (不是修复 bug 或是添加新功能)',
    },
    {
      value: 'style',
      name: 'style: 修改代码格式，不影响代码逻辑 (空格、代码格式化、缺少分号等)',
    },
    {
      value: 'chore',
      name: 'chore: 构建过程或辅助工具和库 (如文档生成) 的更改',
    },
    { value: 'test', name: 'test: 增加或修改测试用例' },
    { value: 'docs', name: 'docs: 修改文档' },
    {
      value: 'perf',
      name: 'perf: 提升性能',
    },
    { value: 'revert', name: 'revert: 回滚到某一个版本 (带上版本号)' },
  ],
  scopes: [
    'pages',
    'containers',
    'components',
    'dependencies',
    'types',
    'utils',
    'layouts',
    'config',
    'static',
    'docs',
  ],
  allowBreakingChanges: ['feat', 'fix'],
  messages: {
    type: '选择要提交的更改类型:',
    scope: '选择更改影响的范围:',
    customScope: '选择更改影响的范围:',
    subject: '写一个简短、命令时态的语句来描述更改:\n',
    body: '详细描述更改原因 (可选，按回车跳过). 使用 "|" 来换行:\n',
    breaking: '列出 BREAKING CHANGES (可选):\n',
    footer: '列出这次更改关闭的 ISSUES (可选). 如: #31, #34:\n',
    confirmCommit: '确定提交上面的更改?',
  },
  footerPrefix: 'close',
};

```



## 五、扩展阅读

[conventional commits](https://www.conventionalcommits.org/) `必读` 介绍约定式提交标准。

[Angular规范](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md) `必读` 介绍Angular规范每个部分该写什么、该怎么写。

[@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional) `必读` 介绍commitlint的校验规则config-conventional，以及一些常见passes/fails情况。
