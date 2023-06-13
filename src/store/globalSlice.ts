/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createServiceAsyncThunk } from 'utils/@reduxjs/toolkit';
import { longanUpdateConfig } from 'longan-sdk';
import { getCookie } from 'utils/utils';

import { IStore } from './types';
import services from './services';
import { gotoPass } from 'configs/pass.conf';
import { Modal, notification } from 'antd';

export const NAMESPACE = 'GLOBAL';

const path = window.location.pathname + window.location.search;

export const initialState: IStore = {
  init: false, // 数据初始化状态
  loading: false, // 总loading状态
  loadingMap: {}, // 更细致的loading状态
  error: null,
  userData: {
    userInfo: {},
    functionAuth: [],
  },
  layout: {
    collapsed: false,
  },
  crumbsMap: {},
  // 0 是脱敏、1 是不脱敏
  desensitizeFlag: getCookie('desensitization_flag') || '0',
  desensitizeFlagMap: {},
  // 当前缓存的tab页面key
  cachingKeys: [path === '/' ? '/homePage' : path],
  activeCacheKey: path === '/' ? '/homePage' : path,
  allConfigMap: {},
  allSystemList: [],
  authSystemList: [],
  allDictMap: {},
};

// TODO: loading的处理
export const getLoginUserInfo = createServiceAsyncThunk(
  `${NAMESPACE}/getLoginUserInfo`,
  async () => services.getLoginUserInfoService(),
);
export const getDictMaps = createServiceAsyncThunk(
  `${NAMESPACE}/getDictMaps`,
  async () => services.getDictMapsService(),
);
export const getDictTypes = createServiceAsyncThunk(
  `${NAMESPACE}/getDictTypes`,
  async () => services.getDictTypesService(),
);

// export const getAllSystemList = createServiceAsyncThunk(
//   `${NAMESPACE}/getAllSystemList`,
//   async () => services.getAllSystemListService(),
// );

// export const getAuthSystemList = createServiceAsyncThunk(
//   `${NAMESPACE}/getAuthSystemList`,
//   async () => services.getAuthSystemListService(),
// );

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    operateError(state, action: PayloadAction<Error>) {
      state.error = action.payload;
    },
    updateLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateLayoutCollapsed(state, action: PayloadAction<boolean>) {
      state.layout.collapsed = action.payload;
    },
    initGlobalData(state) {
      state.loading = true;
      // state.desensitizeFlagMap = initDesensitizeFlag();
      state.cachingKeys = [path === '/' ? '/homePage' : path];
      state.activeCacheKey = path === '/' ? '/homePage' : path;
      // to saga
    },
    initGlobalDataFinish(state) {
      state.loading = false;
      state.init = true;
    },
    addCrumbNameMap(state, { payload }: PayloadAction<Record<string, string>>) {
      state.crumbsMap = { ...state.crumbsMap, ...payload };
    },
    updateCachingKeys(state, action: PayloadAction<string[]>) {
      state.cachingKeys = action.payload;
    },
    updateActiveCacheKey(state, action: PayloadAction<string>) {
      state.activeCacheKey = action.payload;
    },
  },
  // 异步的成功、失败处理，以及对于非此slice的action的处理
  extraReducers: {
    [getLoginUserInfo.fulfilled.type]: (state, action) => {
      const data = action.payload?.data;
      const { privilegeCodeList, sfuCode = '' } = data || {};
      if (!privilegeCodeList
        || !Array.isArray(privilegeCodeList)
        || (Array.isArray(privilegeCodeList) && privilegeCodeList.length <= 1)) {
        // 用户没权限
        // notification.error({ message: '您没有权限', onClose: () => { gotoPass('login'); }, duration: 0.5 });
        Modal.warning({
          className: 'no-auth-modal',
          centered: true,
          closable: false,
          keyboard: false,
          title: '登录失败，您还未授权！',
          okText: '点击退出',
          onOk: () => { gotoPass('login'); },
        });
        return;
      }
      state.userData = {
        functionAuth: Array.isArray(privilegeCodeList) ? privilegeCodeList : [],
        userInfo: { sfucode: sfuCode },
      };
      longanUpdateConfig({
        loginUser: sfuCode || '',
      });
    },
    [getDictTypes.fulfilled.type]: (state, action) => {
      state.allDictMap = action.payload?.result || {};
    },
    // [getAllSystemList.fulfilled.type]: (state, action) => {
    //   state.allSystemList = action.payload?.data || [];
    // },
    // [getAuthSystemList.fulfilled.type]: (state, action) => {
    //   state.authSystemList = action.payload?.data || [];
    // },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
