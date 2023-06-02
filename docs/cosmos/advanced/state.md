<!--
 * @Author: 李淳
 * @Date: 2020-06-28 15:09:55
 * @LastEditors: 李淳
 * @LastEditTime: 2020-07-15 15:53:30
 * @Description: 状态管理方案
-->

# 状态管理方案

> 李淳 @2020-06-28

## 技术选型

Redux & Mobx => Redux;
但是由于使用Redux样板代码过多，因此最终选用的是redux-toolkit，redux-toolkit只是对redux以及部分中间件进行进一步封装，并不是中间件也不是新的解决方案；

## 为什么要做状态管理

对于中后台系统，由于页面的隔离度较高，页面也相对比较简单，很多同学会觉得我们真的需要状态管理么？从复杂度、能力支持上来说，多数时候我们可能是不需要的，但是对于一个多人协作型系统来讲，更一致化的去管理页面状态是非常重要的，从这个角度来说状态管理规范是我们所必须的，需要强规范来标准化我们的页面状态数据读取。我们需要破除数据放在哪的分歧；

Redux本身非常简单，核心代码只有二十几行，它是一个规则多过状态管理工具，它规约我们怎样管理、维护我们UI相关的状态，redux-toolkit更是集成了immer来提升我们对复杂数据结构的控制。

## 状态管理具体方案

本框架采用的全量状态管理方案，也就是所有的页面状态都维护至store

### 公共状态

公共状态指整个应用所共用的，一般有以下数据：

1. 全局状态标识：loading, Error, 初始化等状态；

2. 公共Layout状态；

3. 登录用户信息：基础信息，权限信息等；

4. 路由数据；

5. 通用基础数据；

### 页面状态

页面状态的维护，本质是维护良好的数据取用方式，一致化开发，提高协作开发的可预测性，因此实质上的原则是与UI相关的数据状态都应尽可能有限选择使用redux store存储，比如说：

1. Form表单数据；

2. Table表格数据；

3. Modal的显示与否等；

### 数据取用

取数据使用的是**reselect**，数据的所有复合、计算也是在这一层进行，这使得我们能够在store中存储最原子、最简洁的数据，且reselect会进行数据缓存，如若关联数据没有变化不会再行计算。

redux-toolkit也集成了reselect，鸡贼的直接导出了reselect的createSelector；

```javascript
// selectors.ts

import selectorsFactory from 'utils/selectorsFactory';
import { createSelector } from '@reduxjs/toolkit';

import { NAMESPACE } from './constants';
import { initialState } from './slice';
import { IPageState } from './types';

// 自动生成一级数据的selector，使用selectors.name调用，如需要更进一步的计算再自行添加selector
const selectors = selectorsFactory<IPageState>(NAMESPACE, initialState);

// 例如，需要单独Select modal的data，或者更进一步的计算某些数据
export const selectModalData = createSelector(
  selectors.mainModal,
  mainModal => mainModal.data,
);

export default selectors;
```

```javascript
// Modal.tsx
import { useDispatch, useSelector } from 'react-redux';
import selectors from '../selectors';

function MainModal(props: InjectedIntlProps) {
  const { intl } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const modalData = useSelector(selectors.mainModal);
```

从示例代码中可以看到，为了减少样板代码，我们开发了selectorsFactory方法，用以自动生成一级selector，可以通过selectors.tableData实现数据的取用，其实这也表示，我们期待更扁平的Store结构设计，并不提倡嵌套层次过多；

### 异步管理

本质是通过发送action，触发thunk的函数执行，等待异步请求Promise执行完成后，再自动触发完成的action来进行异步数据的近一步读取、处理；

```javascript
// services.ts
export const getDataListService = (params: IRole & IPagination) => getRequest<IRole & IPagination, IListResponse<IRole>>('/user/management/getrolelist', params);

// slice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getDataList = createAsyncThunk(
  `${NAMESPACE}/getDataList`,
  async (params: IRole & IPagination) => services.getDataListService(params),
);

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    ...
  },
  // 异步的成功、失败处理，可以使用类似上面reducers的设置方式，但是由于是对字符串的捕获，会损失类型；
  extraReducers: (builder) => {
    builder.addCase(getDataList.fulfilled, (state, action) => {
      state.tableData = action.payload?.data?.list || [];
      state.pagination.total = action.payload?.data?.total || 0;
    });
    builder.addCase(getDataList.rejected, (state) => {
      // do sth
    });
  },
});
```

### 复杂流程控制

上一个topic简单讲解了对异步请求的触发，实际上使用的是redux-thunk中间件完成的异步请求、数据同步，这基本能够满足我们90%的场景，但是有时一个动作会触发一系列的流程，裹挟着异步、同步、竟态等更细粒度、更长链条的控制，此时使用redux-thunk会略显吃力，且流程型的代码反而不成链条，散落在各个thunk中，是非常不友好且难维护的，针对这类case，我们引入了redux-saga，希望大家在多步流程、复杂控制时能够想到此工具，当然，如果你不使用也并不影响什么。

```javascript
// index.tsx
import saga from './saga';
import { sliceKey, reducer, actions } from './slice';

const { useEffect } = React;

function Page() {
  useInjectReducer({ key: sliceKey, reducer });
  // saga注入，如果不需要，不注入即可
  useInjectSaga({ key: sliceKey, saga });

  // 初始化页面基础数据，比如一些下拉框枚举值等；
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.initData());
  }, []);

  return (
    <ErrorBoundary>
      <FormTable />
      <MainModal />
    </ErrorBoundary>
  );
}
```

```javascript
// saga.ts
// 同时触发两个获取数据的action，都执行完毕后发送finish的信号，这样只需要检测finish信号即可做一些依赖初始数据的操作
function* initGlobalData() {
  try {
    yield all([
      putResolve((getLoginUserCustomerList()) as any),
      putResolve((getLoginUserInfo()) as any),
    ]);

    // 当待初始化的数据均加载完毕后
    yield put(initGlobalDataFinish());
  } catch (error) {
    yield put(operateError(error));
  }
}
```

需要注意的是，对于saga直接操作异步请求会更灵活，但是为了使我们的请求都通过action的模式触发，以控制一些全局的队列、异步响应等，在saga中不提倡直接触发异步请求，而是通过put、putResolve等操作来触发action进而触发异步请求；
