/*
 * @Author: Claude
 * @Description: UserCardOrders Redux状态管理
 */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { baseTableConf } from 'configs/base.conf';
import { createServiceAsyncThunk } from 'utils/@reduxjs/toolkit';
import { message } from 'antd';
import { IPageState, TSearchParams, ITableItem } from './types';
import { NAMESPACE } from './constants';
import services from './services';

export const initialState: IPageState = {
  refresh: 0,
  loading: false,
  searchCondition: {},
  tableData: [],
  pagination: {
    pageNum: 1,
    pageSize: baseTableConf.pageSize,
  },
  refundModal: {
    visible: false,
  },
  wxidModal: {
    visible: false,
    wxid: undefined,
    loading: false,
  },
};

export const getDataList = createServiceAsyncThunk(
  `${NAMESPACE}/getDataList`,
  async (params: TSearchParams & IPagination) => services.getDataListService(params),
);

export const postRefund = createServiceAsyncThunk(
  `${NAMESPACE}/postRefund`,
  async (params: { oid: string; money: number; usercardleft?: any }) => services.postRefundService(params),
);

export const getWxid = createServiceAsyncThunk(
  `${NAMESPACE}/getWxid`,
  async (params: { oid: string }) => services.getWxidService(params),
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
    updateRefundModal(state, action: PayloadAction<IPageState['refundModal']>) {
      state.refundModal = action.payload;
    },
    updateWxidModal(state, action: PayloadAction<IPageState['wxidModal']>) {
      state.wxidModal = action.payload;
    },
  },
  // 异步的成功、失败处理
  extraReducers: builder => {
    builder.addCase(getDataList.fulfilled, (state, action) => {
      state.tableData = Array.isArray(action.payload?.data?.orders) ? action.payload?.data?.orders : [];
      state.pagination.total = action.payload?.data?.total || 0;
      state.pagination.pageNum = action?.meta?.arg?.pageNum || 1;
      state.pagination.pageSize = action?.meta?.arg?.pageSize || baseTableConf.pageSize;
    });
    builder.addCase(postRefund.fulfilled, state => {
      message.success('退款成功');
      state.refresh += 1;
    });
    builder.addCase(getWxid.pending, state => {
      state.wxidModal.loading = true;
    });
    builder.addCase(getWxid.fulfilled, (state, action) => {
      state.wxidModal.loading = false;
      state.wxidModal.visible = true;
      state.wxidModal.wxid = action.payload?.data?.wxid || '';
    });
    builder.addCase(getWxid.rejected, state => {
      state.wxidModal.loading = false;
      message.error('获取微信订单号失败');
    });
  },
});

export const { actions, reducer, name: sliceKey } = slice;
