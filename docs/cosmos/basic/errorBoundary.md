<!--
 * @Author: 张驰阳、张宁
 * @Date: 2020-07-14 13:55:10
 * @LastEditors: 李淳
 * @LastEditTime: 2020-07-15 15:46:49
 * @Description: file content
-->

# 错误处理

> 张驰阳 @2020-07-07

日常开发中，前端并不重视错误捕获、处理、记录，这使得我们的开发与运行监控缺少一个环节。

## [错误边界](https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/error-boundaries.html)（Error Boundaries）

部分 UI 的 JavaScript 错误不应该导致整个应用崩溃，为了解决这个问题，React 16 引入了一个新的概念 —— 错误边界。

错误边界是一种 React 组件，这种组件**可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI**，而不是渲染那些崩溃了的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。

*注意：错误边界**无法**捕获以下场景中产生的错误：*

- 事件处理（[了解更多](https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/error-boundaries.html#how-about-event-handlers)）
- 异步代码（例如 `setTimeout` 或 `requestAnimationFrame` 回调函数）
- 服务端渲染
- 它自身抛出来的错误（并非它的子组件）

## COSMOS中的错误边界

在`src/components/ErrorBoundary`中，暴露出了两个错误边界的Hoc：**ErrorBoundaryArea**和**ErrorBoundary**

#### 1. ErrorBoundary

**ErrorBoundary的使用位置应放在业务模块级的最顶层**，这样可以有效防止某一个页面崩溃不影响菜单中其他模块页面的展示。拿cosmos来说，放置位置在`src/pages/`路径下的各个模块文件的index.tsx中。

使用示例：

```javascript
// src/pages/ErrorAndLonganDemo/index.tsx

import React from 'react';
import ErrorBoundary from 'components/ErrorBoundary';
import LonganPage from './modules/LonganPage';

import './index.less';

const ErrorBoundaryDemo = () => (
  <ErrorBoundary>
    <LonganPage />
  </ErrorBoundary>
);

export default ErrorBoundaryDemo;

```

#### 2.ErrorBoundaryArea

**ErrorBoundaryArea的使用位置应放在页面中某一个小模块组件内**。有些场景，我们希望页面内某个小的功能点崩溃不影响当前页面其他业务的正常显示和使用，可以使用ErrorBoundaryArea包裹小功能模块。

使用示例：

```javascript
import * as React from 'react';
import { ErrorBoundaryArea } from 'components/ErrorBoundary';
const ErrorDemo = () => {

  return (
    <div>
      <div>
        <h1>正常显示的区域</h1>
        <ErrorBoundaryArea>
          <ErrorArea info={info} />
        </ErrorBoundaryArea>
      </div>
    </div>
  );
};

export default ErrorDemo;

```

#### 3.使用注意事项

ErrorBoundary是一个hoc，**他捕获的错误是来自于被他包裹的子组件。他无法捕获其自身的错误和所在的组件的错误**。

以下情况是错误的使用位置：

```javascript
/**
下面是一个错误使用的例子，ErrorPage组件自身就会报错，所以ErrorBoundaryArea用在这里是无法捕获此组件的错误的
**/
// ErrorPage.tsx
import React from 'react';
import { ErrorBoundaryArea } from 'components/ErrorBoundary';
const { useState, useEffect } = React;

interface IProps {
  info: any;
}
const ErrorPage = (props: IProps) => {
  const [name, setName] = useState(['jack', 'tom', 'blue']);
  useEffect(() => {
    if (props.info) setName(props.info);
  }, [props.info]);
  return (
    <ErrorBoundaryArea>
      <div>
        <h1>此组件自身就会报错</h1>
        <div>
          {name.map(item => <p key={item}> 姓名:{item}</p>)}
        </div>
      </div>
    </ErrorBoundaryArea>
  );
};
export default ErrorPage;

/*****************************************************************************************/
/**
正确的使用方法：
**/
// ErrorPage.tsx
import React from 'react';
import { ErrorBoundaryArea } from 'components/ErrorBoundary';
const { useState, useEffect } = React;

interface IProps {
  info: any;
}
const ErrorPage = (props: IProps) => {
  const [name, setName] = useState(['jack', 'tom', 'blue']);
  useEffect(() => {
    if (props.info) setName(props.info);
  }, [props.info]);
  return (
    <div>
      <h1>此组件自身就会报错</h1>
      <div>
        {name.map(item => <p key={item}> 姓名:{item}</p>)}
      </div>
    </div>
  );
};
export default ErrorPage;

// ErrorPageFather.tsx
import React from 'react';
import { ErrorBoundaryArea } from 'components/ErrorBoundary';
import ErrorPage from './ErrorPage.tsx';

interface IProps {
  info: any;
}
const ErrorPage = (props: IProps) => {
  return (
    <div>
      <h1>页面其他内容正常显示</h1>
      <ErrorBoundaryArea>
        <ErrorPage />
      </ErrorBoundaryArea>
    </div>
  );
};
export default ErrorPage;


```

#### 4. 其他

- 更多相关demo请参考`src/pags/ErrorAndLonganDemo`
- 关于错误边界的更多信息参考：https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/error-boundaries.html
