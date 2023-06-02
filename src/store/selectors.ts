/* eslint-disable no-restricted-syntax */
/*
 * @Author: lf
 * @Date: 2021-01-10 21:25:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-21 17:13:02
 * @Description: The global state selectors
 */
import { createSelector } from 'reselect';
import { EDictMap } from 'utils/constants';
import { IConfigMapItem, IStore, IUserInfo } from './types';
import { initialState } from './globalSlice';

const selectGlobal = (state: IRedux.Store) => state.global || initialState;

const selectRouter = (state: IRedux.Store) => state.router;

const selectLanguage = (state: IRedux.Store) => state.language;

const selectCurrentLanguage = createSelector(
  selectLanguage,
  languageState => languageState.locale,
);

const selectError = createSelector(
  selectGlobal,
  globalState => globalState.error,
);

const selectLoginUserInfo = createSelector(
  selectGlobal,
  (globalState: IStore): IUserInfo => globalState.userData.userInfo,
);

// 登录用户具有的功能权限码集合
const selectLoginUserFunctionAuth = createSelector(
  selectGlobal,
  globalState => globalState.userData.functionAuth,
);

const selectLayout = createSelector(
  selectGlobal,
  (globalState: IStore) => globalState.layout,
);

const selectLocation = createSelector(
  selectRouter,
  routerState => routerState.location,
);

const selectLoading = createSelector(
  selectGlobal,
  (globalState: IStore) => globalState.loading,
);

const makeSelectLoading = (key: string) =>
  createSelector(
    selectGlobal,
    (globalState: IStore) => globalState.loadingMap[key],
  );

const selectCrumbsMap = createSelector(
  selectGlobal,
  (globalState: IStore) => globalState.crumbsMap,
);

const selectDesensitizeFlag = createSelector(
  selectGlobal,
  globalState => globalState.desensitizeFlag,
);

const selectDesensitizeFlagMap = createSelector(
  selectGlobal,
  globalState => globalState.desensitizeFlagMap,
);

const selectCachingKeys = createSelector(
  selectGlobal,
  (globalState: IStore) => globalState.cachingKeys,
);

const selectActiveCacheKey = createSelector(
  selectGlobal,
  (globalState: IStore) => globalState.activeCacheKey,
);

const selectAllConfigMap = createSelector(
  selectGlobal,
  (globalState: IStore) => {
    const { allConfigMap = {} } = globalState;
    const adaptAllConfigMap = JSON.parse(JSON.stringify(allConfigMap));
    // 后端约定
    const needNumVal = new Set(['tag_category', 'customer_belong']);
    Object.keys(adaptAllConfigMap).forEach((key: string) => {
      if (needNumVal.has(key)) {
        const newItem = adaptAllConfigMap[key]?.map?.((item: IConfigMapItem) => ({
          ...item,
          code_value: Number(item.code_value),
        }));
        adaptAllConfigMap[key] = newItem || [];
      }
    });
    return adaptAllConfigMap;
  },
);

const selectAllSystemList = createSelector(
  selectGlobal,
  (globalState: IStore) => globalState.allSystemList,
);

const selectAuthSystemList = createSelector(
  selectGlobal,
  (globalState: IStore) => globalState.authSystemList,
);

// 字典 返回键值对
const selectAllDictMap = createSelector(
  selectGlobal,
  (globalState: IStore) => {
    const res:Partial<Record<EDictMap, Record<string, string>>> = {};
    for (const key in globalState.allDictMap) {
      if (Object.prototype.hasOwnProperty.call(globalState.allDictMap, key)) {
        const element = (globalState.allDictMap)[(key as EDictMap)];
        const innerRes:Record<string, string> = {};
        element.forEach(el => {
          if (el.status === '1') {
            innerRes[el.dictValue] = el.dictLabel;
          }
        });
        res[(key as EDictMap)] = innerRes;
      }
    }
    return res;
  },
);

// 字典 返回{label:string, value:string}[]
const selectAllDictType = createSelector(
  selectGlobal,
  (globalState: IStore) => {
    const res:Partial<Record<EDictMap, Array<{label:string; value:string; remark: string}>>> = {};
    for (const key in globalState.allDictMap) {
      if (Object.prototype.hasOwnProperty.call(globalState.allDictMap, key)) {
        const element = (globalState.allDictMap)[(key as EDictMap)];
        const innerRes = element.filter(item => item.status === '1').map(item =>
          ({
            label: item.dictLabel, value: item.dictValue, remark: item.remark,
          }));
        res[(key as EDictMap)] = innerRes;
      }
    }
    return res;
  },
);

export {
  selectGlobal,
  selectCurrentLanguage,
  selectLoading,
  makeSelectLoading,
  selectError,
  selectLocation,
  selectLayout,
  selectLoginUserFunctionAuth,
  selectLoginUserInfo,
  selectCrumbsMap,
  selectDesensitizeFlag,
  selectDesensitizeFlagMap,
  selectCachingKeys,
  selectActiveCacheKey,
  selectAllConfigMap,
  selectAllSystemList,
  selectAuthSystemList,
  selectAllDictMap,
  selectAllDictType,
};
