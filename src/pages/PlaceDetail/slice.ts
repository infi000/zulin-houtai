/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { createServiceAsyncThunk } from 'utils/@reduxjs/toolkit';

import { IPageState, IParamsId, IParamsPlaceId } from './types';
import { NAMESPACE } from './constants';
import services from './services';

export const initialState: IPageState = {
  refresh: 0,
  loading: false,
  storeInfo: {},
  unusedInfo: [],
  rewardInfo: [],
};

export const getDetail = createServiceAsyncThunk(
  `${NAMESPACE}/getDetail`,
  async (params: IParamsId) => services.getDetailService(params),
);

export const getUnusedInfo = createServiceAsyncThunk(
  `${NAMESPACE}/getUnusedInfo`,
  async (params: IParamsPlaceId) => services.getUnusedInfoService(params),
);

export const getRewardInfo = createServiceAsyncThunk(
  `${NAMESPACE}/getRewardInfo`,
  async (params: IParamsPlaceId) => services.getRewardInfoService(params),
);

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    refresh(state) {
      state.refresh += 1;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getDetail.fulfilled, (state, action) => {
      state.storeInfo = action.payload?.data || {};
    });
    builder.addCase(getUnusedInfo.fulfilled, (state, action) => {
      state.unusedInfo = action.payload?.data?.list || [];
    });
    builder.addCase(getRewardInfo.fulfilled, (state, action) => {
      state.rewardInfo = action.payload?.data || [];
    });
  },
});

export const { actions, reducer, name: sliceKey } = slice;
