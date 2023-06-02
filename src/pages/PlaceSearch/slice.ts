/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { baseTableConf } from 'configs/base.conf';
import { createServiceAsyncThunk } from 'utils/@reduxjs/toolkit';
import { EDIT } from 'utils/constants';

import { IPageState, ISearchCondition, ITableItem } from './types';
import { NAMESPACE } from './constants';
import services from './services';

const initDictMaps = {
  warehouse_region: {}, // 所属大区
  warehouse_city: {}, // 所属城市
  warehouse_status: {}, // 仓库状态
  warehouse_type: {}, // 仓库类型
  building_fire_Level: {}, // 消防等级
  area_class: {}, // 面积
};

export const initialState: IPageState = {
  refresh: 0,
  loading: false,
  storeData: [],
  searchCondition: {},
  pagination: {
    pageNum: 1,
    pageSize: 100,
  },
};

export const getDataList = createServiceAsyncThunk(
  `${NAMESPACE}/getDataList`,
  async (params: ISearchCondition & IPagination) => services.getDataListService(params),
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
    updateSearchCondition(state, action: PayloadAction<ISearchCondition>) {
      state.searchCondition = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getDataList.fulfilled, (state, action) => {
      state.storeData = action.payload?.data?.list || [];
      state.pagination.total = action.payload?.data?.total || 0;
      state.pagination.pageNum = action.payload?.data?.pageNum || 1;
      state.pagination.pageSize = action.payload?.data?.pageSize || 100;
      state.loading = true;
    });
  },
});

export const { actions, reducer, name: sliceKey } = slice;
