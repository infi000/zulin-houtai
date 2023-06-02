/*
 * @Author: your name
 * @Date: 2021-01-27 14:37:40
 * @LastEditTime: 2021-01-27 15:50:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /janus/src/components/DistrictsComponent/slice.ts
 */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { createServiceAsyncThunk } from 'utils/@reduxjs/toolkit';
import { IPageState } from './types';
import { NAMESPACE } from './constants';
import services from './services';

export const initialState: IPageState = {
  districtsData: [],
  queryParam: '',
};

export const getDistrictsData = createServiceAsyncThunk(
  `${NAMESPACE}/getDistrictsData`,
  async (params: any) => services.getDistrictsDataService(params),
);

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    updateDistrictsData(state, action: PayloadAction<any[]>) {
      state.districtsData = action.payload;
    },
    updateQueryParam(state, action: PayloadAction<string | number>) {
      state.queryParam = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
