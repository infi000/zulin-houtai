import {
  call,
  takeLatest,
  all,
  put,
  take,
  Pattern,
} from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';

import { actions as globalActions } from 'store/globalSlice';
// eslint-disable-next-line
import { getFetchStartReg } from 'utils/regExps';
import { FETCH_PENDING_SUFFIX, FETCH_FULFILLED_SUFFIX, FETCH_REJECTED_SUFFIX } from 'utils/constants';
// eslint-disable-next-line
import { actions, sliceKey } from './slice';

/**
 * loading的统一处理，如果需要更细粒度的控制，可以关闭此处理
 * @param action
 */
export function* fetchLoadingNoodles(action: IRedux.Action) {
  // 开始loading
  yield put(actions.setLoading(true));
  // 等待结果
  yield take([
    action.type.replace(FETCH_PENDING_SUFFIX, FETCH_FULFILLED_SUFFIX),
    action.type.replace(FETCH_PENDING_SUFFIX, FETCH_REJECTED_SUFFIX),
  ]);
  // 结束loading
  yield put(actions.setLoading(false));
}

/**
 * 这是一个提交数据的saga使用示例，可以按照顺序进行多个action的排列发送；
 */
export function* submitDataSuccess() {
  try {
    yield put(actions.refresh());
    yield put(actions.setLoading(false));
  } catch (error) {
    yield put(globalActions.operateError(error));
  }
}

export function* watcher(type: Pattern<any>, process: (action: IRedux.Action) => any) {
  yield takeLatest(type, process);
}

export default function* pageRootSaga() {
  yield all([
    call(() => watcher(
      // 捕获了当前namespace全部的异步请求，如果有异步请求不需要触发loading，可直接配置例外
      (action: IRedux.Action) => !isEmpty(
        action.type.match(getFetchStartReg(sliceKey)),
      ),
      fetchLoadingNoodles,
    )),
  ]);
}
