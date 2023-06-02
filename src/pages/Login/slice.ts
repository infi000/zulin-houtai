/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { IPageState } from './types';
import { NAMESPACE } from './constants';
import { checkSsnPromise, logoutPromise } from './sdkMethods';

export const initialState: IPageState = {
  userInfo: {
    userName: '',
    userPhone: '',
  },
};

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    checkSsnPass(state: any) {
      checkSsnPromise().then((result) => {
        switch (result.type) {
          case 'valid':
            state.userInfo = {
              userName: result.data.uname,
              userPhone: result.data.phone,
            };
            state.error = null;
            window.location.href = '/';
            break;
          case 'fail':
            state.error = result.data.errmsg;
            break;
          default:
            break;
        }
      });
    },
    logoutPass(state: any) {
      logoutPromise().then((result) => {
        switch (result.type) {
          case 'success':
            state.userInfo = {
              userName: '',
              userPhone: '',
            };
            state.error = null;
            // window.location.href = LOGIN_PAGE_URL + PLATFORM_QUERY_CONF;
            break;
          case 'fail':
            state.error = result.data.errmsg;
            break;
          default:
            state.error = result.data.errmsg;
            break;
        }
      });
    },
  },
  // 异步的成功、失败处理，可以使用类似上面reducers的设置方式，但是由于是对字符串的捕获，会损失类型；
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  extraReducers: () => {},
});

export const { actions, reducer, name: sliceKey } = slice;
