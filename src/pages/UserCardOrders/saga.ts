/*
 * @Author: Claude
 * @Description: UserCardOrders Redux-Saga副作用处理
 */
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
import { getFetchStartReg } from 'utils/regExps';
import { FETCH_PENDING_SUFFIX, FETCH_FULFILLED_SUFFIX, FETCH_REJECTED_SUFFIX } from 'utils/constants';
import { actions, sliceKey } from './slice';

/**
 * loading的统一处理
 * @param action
 */
export function* fetchLoadingNoodles(action: IRedux.Action) {
  // 开始loading
  yield put(actions.setLoading(true));
  // 等待结果
  yield take([
    action.type.replace(FETCH_PENDING_SUFFIX, FETCH_FULFILLED_SUFFIX),
    action.type.replace(FETCH_PENDING_SUFFIX, FETCH_REJECTED_SUFFIX)
  ]);
  // 结束loading
  yield put(actions.setLoading(false));
}

export function* watcher(type: Pattern<any>, process: (action: IRedux.Action) => any) {
  yield takeLatest(type, process);
}

export default function* pageRootSaga() {
  yield all([
    call(() => watcher(
      (action: IRedux.Action) => !isEmpty(
        action.type.match(getFetchStartReg(sliceKey)),
      ),
    )),
    fetchLoadingNoodles,
  ]);
}
