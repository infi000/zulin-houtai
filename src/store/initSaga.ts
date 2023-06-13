/*
 * @Author: 李淳
 * @Date: 2020-06-22 11:16:00
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-07 01:02:05
 * @Description: 控制全局数据获取；全局数据获取完毕后会发出finish信号；
 */
import { takeLatest, putResolve, call, put, all, Pattern } from 'redux-saga/effects';
import { conf } from 'configs/pass.conf';
import { actions, getDictMaps, getDictTypes, getLoginUserInfo } from './globalSlice';

const { initGlobalDataFinish, operateError } = actions;

// TODO: 需要关注的是，在saga中均未直接发送异步请求，而是通过触发action来完成，无疑这样会损失一些控制的灵活性，但整体来讲异步控制会更统一，代码的一致性会更好，更有利于面向切面完成一些处理；
function* initGlobalData(): Generator {
  try {
    const { pathname } = window?.location || {};
    if (pathname !== conf.uri.login && pathname !== conf.uri.logout) {
      yield all([
        // putResolve(getLoginUserInfo() as any),
        // putResolve(getDictMaps() as any),
        // putResolve(getDictTypes() as any),
      ]);
    }

    // 当待初始化的数据均加载完毕后
    yield put(initGlobalDataFinish());
  } catch (error) {
    yield put(operateError(error));
  }
}

export function* watcher(type: Pattern<any>, process: (action: IRedux.Action) => any): Generator {
  yield takeLatest(type, process);
}

export default function* watchInit(): Generator {
  yield all([call(() => watcher(actions.initGlobalData, initGlobalData))]);
}
