<!--
 * @Author: 魏延 解天玉
 * @Date: 2020-06-30 14:53:35
 * @LastEditTime: 2020-07-16 17:26:27
 * @LastEditors: 李淳
 * @Description: In User Settings Edit
 * @FilePath: /cosmos/docs/specification/css.md
-->

# 样式管理规范

> 魏延 解天玉 @2020-07-01

- [一、全局样式方案](#一、全局样式方案)
- [二、页面/组件样式方案](#二、页面/组件样式方案)
- [三、动态换肤方案](#三、动态换肤方案)

## 一、全局样式方案

#### 1.整体布局样式控制

页面整体布局部分功能位于/src/pages/layout

```
├─ src
│  ...
│  ├─ pages
│  │  ├─ layout
│  │  │  ├─ index.tsx
│  │  │  ...
```

方案采用 antd layout 对页面级整体布局[文档](https://ant.design/components/layout-cn/);

```js
<Layout>
  <Sider>
    <Logo />
    <Menu theme="dark" />
  </Sider>
  <Layout>
    <Header />
    <Crumb />
    <Content />
  </Layout>
</Layout>
```

- Layout：布局容器，其下可嵌套 Header Sider Content Footer 或 Layout 本身，可以放在任何父容器中;
- Header：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中;
- Sider：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中;
- Crumb: 面包屑导航， 只带有基本样式；
- Content：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。

#### 2.全局样式控制，依赖 Antd 的样式

```
├─ src
│  ...
│  ├─ styles
│  │  ├─ index.less
│  │  ├─ cover.less
│  │  ├─ global.less
│  │  └─ variables.less
```

##### antd 全局变量修改

修改 variables.less 文件，该文件的作用主要是,将要更换的主题给写上去，把 antd 默认的主题给覆盖掉；

> 注意: 所修改的变量名必须使用 antd 所提供的全局变量，可修改变量名[这里](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)可以看到；

##### 自定义样式覆盖 antd 默认样式

可能我们会遇到 antd 所提供的变量修改无法满足我们的需求的场景，需要手动覆盖全局 antd 样式，我们需要自定义 cover.less 文件,该文件中可以引入 variables.less，使用我们在 variables.less 中定义的变量；

##### 全局样式调整

global.less 中的修改内容主要是针对非 antd 的样式部分，包括滚动条样式，字体，标签样式设置等内容；

## 二、页面/组件样式方案

### 方案选择

除全局样式统一维护在 src/styles/文件夹下直接用 less 维护，其他样式全部使用 styled-components

原因如下：
1. 样式可以理解为属于组件自身的特性，和jsx合并在一起，更加符合一个组件是一个单独个体的思想
2. 组件的逻辑、生命周期、样式、结构完全和其他组件解耦，对组件维护、复用很有帮助

### 使用说明

1. 普通使用

```javascript
import styled from 'styled-components';
const LogoWrapper = styled.div`
  font-size: 36px;
  color: #eee;
  text-align: center;
  padding: 10px;
`;
function Logo(props: IProps) {
  return (
    <LogoWrapper>
      { props.collapsed ? (
        <img
          src={LogoCollapsedImage}
          alt="logo"
          width={50}
        />
      ) : (
        <div>Cosmos</div>
      ) }
    </LogoWrapper>
  );
}
```

2. 覆盖单个antd组件样式

```javascript
import { Layout as AntdLayout } from 'antd';
import styled from 'styled-components';
const ILSLayout = styled(AntdLayout)`
  height: 100vh;
  .scroll-content {
    height: 100px;
    flex-grow: 1;
    flex-shrink: 0;
    overflow-y: scroll;
  }
`;
function Layout() {
  return <ILSLayout>
    <div className="scroll-content">...</div>
  </ILSLayout>
}
```

3. 通用组件样式

比如通用的列表页筛选器包裹器的样式，将styled-components作为一个组件输出 写在src/components文件夹下
```javascript
import styled from 'styled-components';

interface IProps {
  children: any;
}

const Wrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 16px;
  text-align: right;
  .ant-btn {
    margin-left: 16px;
  }
`;

function FunctionButtonsWrapper(props: IProps) {
  return (
    <Wrapper>
      { props.children }
    </Wrapper>
  );
}

export default FunctionButtonsWrapper;
```

4. 传参

```javascript
import styled, { keyframes } from 'styled-components';

const circleFadeDelay = keyframes`
  0%,
  39%,
  100% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }
`;

export interface IProps {
  rotate?: number;
  delay?: number;
}

const Circle = (props: IProps) => {
  const { rotate, delay } = props;
  const CirclePrimitive = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    ${rotate
      && `
      -webkit-transform: rotate(${rotate}deg);
      -ms-transform: rotate(${rotate}deg);
      transform: rotate(${rotate}deg);
    `} &:before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      background-color: #999;
      border-radius: 100%;
      animation: ${circleFadeDelay} 1.2s infinite ease-in-out both;
      ${delay
        && `
        -webkit-animation-delay: ${delay}s;
        animation-delay: ${delay}s;
      `};
    }
  `;
  return <CirclePrimitive />;
};

export default Circle;
```


### 反模式 -- bad case

写普通样式时、覆盖antd样式时、写通用组件样式时，仍采用import less文件的方式

```less
.layout {
  height: 100vh;
  .scroll-content {
    height: 100px;
    flex-grow: 1;
    flex-shrink: 0;
    overflow-y: scroll;
  }
}
```
```javascript
import { Layout as AntdLayout } from 'antd';
import 'index.less'
function Layout() {
  return <AntdLayout className="layout">
    <div className="scroll-content">...</div>
  </AntdLayout>
}
```

#### 1.Page-Content 样式控制

对于简短的页面，样式可直接放在page文件里；对于过长的文件、样式，建议单独提出一个styles.jsx或进行组件抽离
参考：src/pages/Layout

#### 2.Component 样式控制

将样式包裹器作为一个组件，写在src/components文件夹下
参考：src/components/FilterFormWrapper

#### 3.代码规范

- 避免无意义的组件名
避免类似Div, Span这类直接照搬标签元素名的无意义的组件命名
- 对于比较简单的组件，在一个文件中定义 styled-components 组件
对于比较简单的组件, 一般会在同一个文件中定义 styled-components 组件就行了。
下面是典型组件的文件结构:
```js
// 在顶部定义所有styled-components组件
const Header = styled.header``;
const Title = styled.div``;
const StepName = styled.div``;
const StepBars = styled.div``;

// 使用组件
export const Steps = props => {
  return <>...</>;
};
```
- 对于比较复杂的页面组件来说, 会让文件变得很臃肿, 扰乱组件的主体，建议抽取到单独的styled.tsx文件中
```js
import { Header, Title, StepName, StepBars, StepBar, FormContainer } from './styled';

export const Steps = props => {
  return <>...</>;
};
```

## 三、动态换肤方案

### 方案选择

目前主流的几种换肤方案：
1. css 样式覆盖方案
   利用 css 优先级的原理覆盖掉原有样式的实现，每定义一套皮肤就要定义对应的 sass 变量，以及定义一套覆盖原有样式的皮肤样式。如果有多套皮肤的话，覆盖的代码量就会 n 套。这样做的缺点是样式不易管理，查找样式复杂，开发效率低，拓展性差，维护成本高，多人协作沟通麻烦；
2. 生成多套 css 皮肤
   实现方案，通过编译工具与构建工具编译出多套皮肤 css，通过 js 动态的 link 对应的皮肤样式，缺点是打包体积较大，构建速度慢；
3. css 变量实现
   目前的主流浏览器大部分都支持，但是还是是存在较大的兼容性差的问题；
4. less 在线编译
   通过预设 less 变量，动态调用 less.modifyVars 方法，生成样式文件，实现样式替换，缺点是如果 less 文件特别大，会存在编译较慢的性能问题。

本项目中使用第四种 less 变量的方案，通过第三方插件[antd-theme-webpack-plugin](https://github.com/mzohaibqc/antd-theme-webpack-plugin)实现

### 使用说明

- 插件安装

```js
yarn add antd-theme-webpack-plugin / npm install antd-theme-webpack-plugin
```

- index.html 添加

```html
<body>
  <link
    rel="stylesheet/less"
    type="text/css"
    href="/color.less"
  /><!--这里link放在哪，style生成在哪里，注意样式被覆盖-->
  <script>
    window.less = {
      async: false,
      env: "production" //production  development
    };
  </script>
  <script src="https://cdn.bootcss.com/less.js/2.7.3/less.min.js"></script>
  <div id="app"></div>
</body>
```

> 注意点
>
> 1. 注意 link 标签放的位置，要放在 body 的第一行，否则样式会被覆盖;
> 2. 引入 less 文件，因为我们需要使用到 window.less 这个对象里的方法，版本控制在 less3.0 以下;

- src/style 文件夹下添加 less 文件

1. 添加 variables.less 文件（修改变量）,将要更换的主题颜色给写上去，把 antd 默认的主题颜色给覆盖掉；

```css
@import "~antd/lib/style/themes/default.less";
@primary-color: #6064f4;
@btn-primary-bg: #ccc849;
```

2. 页面中新增切换主题方法

```js
changeTheme(){
  window.less.modifyVars({
    '@primary-color': '#e64e14',
    '@btn-primary-bg': '#5d72cc',
  }.then(() => {console.log('success')})
   .catch(error => {console.log(error)});
...
<Button onClick={changeTheme}>更换主题</Button>
```

3. src/style 文件夹下添加 index.less 文件，并引入 variables.less，如果想要使用 variable.less 里的变量，在 index.less 的顶部引入 variabkes.less，在里面写：

```css
.primary-bg {
  background-color: @primary-color;
}
```

等@primary-color 改变的时候，类里的颜色也会发生改变。然后在全局需要的地方引用这个 index.less，然后去组件里加上这个类。

- 插件配置
  进入 webpack.base.babel.js

```js
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
const option = {
  antDir: path.join(__dirname, "../../node_modules/antd"),
  stylesDir: path.join(__dirname, "../../src/styles"), // 主题文件所在文件夹
  varFile: path.join(__dirname, "../../src/styles/variables.less"), // 自定义默认的主题色
  mainLessFile: path.join(__dirname, "../../src/styles/theme/cover.less"), // 项目中其他自定义的样式（如果不需要动态修改其他样式，该文件可以为空）
  outputFilePath: path.join(__dirname, "../../src/templates/color.less"), // 提取的less文件输出到什么地方
  themeVariables: ["@primary-color"], // 要改变的主题变量
  indexFileName: "../../src/templates/index.html", // index.html所在位置
  generateOnce: false // 是否只生成一次
};
...
plugins: [
  ...
  new AntDesignThemePlugin(option),
],
```
