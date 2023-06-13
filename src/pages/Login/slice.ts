/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-02 23:19:57
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-13 23:16:52
 * @FilePath: /houtai/src/pages/Login/slice.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { createServiceAsyncThunk } from 'utils/@reduxjs/toolkit';
import { setCookie } from 'utils/utils';
import { IPageState } from './types';
import { NAMESPACE } from './constants';
// import { checkSsnPromise, logoutPromise } from './sdkMethods';
import services from './services';

export const initialState: IPageState = {
  userInfo: {
    userName: '',
    userPhone: '',
  },
};
export const postLogin = createServiceAsyncThunk(
  `${NAMESPACE}/postLogin`,
  async (params:any) => services.postLoginService(params),
);

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    checkSsnPass(state: any) {
      // checkSsnPromise().then(result => {
      //   switch (result.type) {
      //     case 'valid':
      //       state.userInfo = {
      //         userName: result.data.uname,
      //         userPhone: result.data.phone,
      //       };
      //       state.error = null;
      //       window.location.href = '/';
      //       break;
      //     case 'fail':
      //       state.error = result.data.errmsg;
      //       break;
      //     default:
      //       break;
      //   }
      // });
    },
    logoutPass(state: any) {
      // logoutPromise().then(result => {
      //   switch (result.type) {
      //     case 'success':
      //       state.userInfo = {
      //         userName: '',
      //         userPhone: '',
      //       };
      //       state.error = null;
      //       // window.location.href = LOGIN_PAGE_URL + PLATFORM_QUERY_CONF;
      //       break;
      //     case 'fail':
      //       state.error = result.data.errmsg;
      //       break;
      //     default:
      //       state.error = result.data.errmsg;
      //       break;
      //   }
      // });
    },
  },
  // 异步的成功、失败处理，可以使用类似上面reducers的设置方式，但是由于是对字符串的捕获，会损失类型；
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  extraReducers: builder => {
    builder.addCase(postLogin.fulfilled, (state, action) => {
      const token = action.payload?.data?.token;
      if (token) {
        setCookie('token', token);
        window.location.href = '/uiResources/homePage';
      }
    });
  },
});

export const { actions, reducer, name: sliceKey } = slice;
