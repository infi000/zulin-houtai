/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { createServiceAsyncThunk } from 'utils/@reduxjs/toolkit';
import { IPageState, ISearchCondition } from './types';
import { NAMESPACE } from './constants';
import services from './services';

export const initialState: IPageState = {
  dataSource: [],
};

export const getDataList = createServiceAsyncThunk(
  `${NAMESPACE}/getDataList`,
  async (params: ISearchCondition) => services.getDataListService(params),
);

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDataList.fulfilled, (state, action) => {
      state.dataSource = action?.payload?.data?.list || [];
    });
  },
});

export const { actions, reducer, name: sliceKey } = slice;
