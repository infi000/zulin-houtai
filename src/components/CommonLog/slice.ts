/*
 * @Author:liqingqing
 * @Date: 2021-10-29 17:32:42
 * @LastEditTime: 2021-10-29 17:48:58
 * @LastEditors: liqingqing
 * @Description: In User Settings Edit
 * @FilePath: /janus/src/components/OmsdataLogModal/slice.ts
 */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { createServiceAsyncThunk } from 'utils/@reduxjs/toolkit';

import { IPageState, IRequestParams, ILogItem } from './types';
import { NAMESPACE, PAGESIZE } from './constants';
import services from './services';

export const initialState: IPageState = {
  loading: false,
  logList: [],
  hasMore: false,
  limit: PAGESIZE,
};

export const getLogList = createServiceAsyncThunk(
  `${NAMESPACE}/getLogList`,
  async (params: IRequestParams) => services.getLogListService(params),
);

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    updateLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    updateLogList: (state, action: PayloadAction<ILogItem[]>) => {
      state.logList = action.payload || [];
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getLogList.fulfilled, (state, action) => {
      state.loading = false;
      const list: ILogItem[] = action.payload.data?.list || [];
      // 拼数据
      state.logList = [...state.logList, ...list];
      state.hasMore = list.length >= state.limit;
    });
    builder.addCase(getLogList.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { actions, reducer, name: sliceKey } = slice;
