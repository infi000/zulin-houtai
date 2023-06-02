/*
 * @Author: 李淳
 * @Date: 2020-06-21 12:23:57
 * @LastEditors: 董方旭
 * @LastEditTime: 2021-01-28 14:21:53
 * @Description: redux store
 */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import initSaga from './initSaga';
import asyncSaga from './asyncSaga';

import { createReducer } from './reducers';

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const [thunk, immutableStateInvariant] = getDefaultMiddleware();
  // [thunk, immutableStateInvariant, serializableStateInvariant]

  const store = configureStore({
    reducer: createReducer(),
    middleware: [thunk, immutableStateInvariant, ...middlewares].filter(i => !!i),
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production',
    enhancers,
  });

  (store as any).runSaga = sagaMiddleware.run;
  // Saga registry
  (store as any).injectedSagas = {
    // 注入基础数据初始化saga
    initSaga: { task: (store as any).runSaga(initSaga) },
    // 注入异步通用控制saga
    asyncSaga: { task: (store as any).runSaga(asyncSaga) },
  };

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if ((module as any).hot) {
    (module as any).hot.accept('./reducers', () => {
      forceReducerReload(store);
    });
  }

  return store;
}
