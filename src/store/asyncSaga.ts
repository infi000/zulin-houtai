/*
 * @Author: 李淳
 * @Date: 2020-06-24 15:37:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-26 19:31:57
 * @Description: 面向fetch请求切面，对请求成功失败的附加处理；
 */
import { notification } from 'antd';
import isEmpty from 'lodash/isEmpty';

import {
  take,
  fork,
  put,
} from 'redux-saga/effects';

import {
  FETCH_FULFILLED_SUFFIX,
  FETCH_REJECTED_SUFFIX,
  POST_ACTION_PREFIX,
  USER_NOT_LOGIN_ERRNO,
} from 'utils/constants';
import { gotoPass } from 'configs/pass.conf';
import { isString } from 'lodash';
import { actions } from './globalSlice';

function* fetchSuccessSaga(action: IRedux.Action): Generator {
  const result = action?.payload;

  if (result && result.errno === 0) { // 【成功】
    if (action.type.indexOf(POST_ACTION_PREFIX) > -1) { // 预设只有post接口在正确时显示信息
      notification.success({
        message: '操作成功',
      });
    }
  } else {
    notification.error({
      message: '网络错误，请稍候再试',
    });
    yield put(actions.operateError(new Error(JSON.stringify(action))));
  }
}

function* fetchFailSaga(action: IRedux.Action): Generator {
  const result = action?.payload;
  if (result && result.errno) {
    if (result.errno === USER_NOT_LOGIN_ERRNO) { // 未登录，跳转登录
      gotoPass('login');
      return;
    }
    notification.error({ // 不同于请求成功，所有的请求都会暴露失败消息
      message: result.errmsg ? `${result.errmsg}${isString(result?.data) ? `:${result.data}` : ''}` : '操作失败，请稍候再试',
    });
    yield put(actions.operateError(new Error(JSON.stringify(action))));
    return;
  }
  notification.error({
    message: '网络错误，请稍候再试',
  });
  yield put(actions.operateError(new Error(JSON.stringify(action))));
}

// The watcher: watch actions and coordinate worker tasks
function* watchFetchResult() {
  while (true) {
    const reg = new RegExp(`${FETCH_FULFILLED_SUFFIX}|${FETCH_REJECTED_SUFFIX}`);
    const action = yield take(
      (data: IRedux.Action) => !isEmpty(data.type.match(reg)),
    );
    if (action.type.indexOf(FETCH_REJECTED_SUFFIX) > -1) {
      yield fork(fetchFailSaga, action);
    } else {
      yield fork(fetchSuccessSaga, action);
    }
  }
}

export default watchFetchResult;
