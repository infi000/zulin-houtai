/*
 * @Author: 李淳
 * @Date: 2020-06-21 12:23:57
 * @LastEditors: 李淳
 * @LastEditTime: 2020-07-08 14:58:34
 * @Description: file content
 */
/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from '@reduxjs/toolkit';
import { InjectedReducersType } from 'types/injector-typings';

import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import { reducer } from './globalSlice';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  const rootReducer = combineReducers({
    global: reducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
