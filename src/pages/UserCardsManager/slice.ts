/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { baseTableConf } from 'configs/base.conf';
import { createServiceAsyncThunk } from 'utils/@reduxjs/toolkit';
import { EDIT, CREATE } from 'utils/constants';
import { IPageState, TSearchParams, TCreateParams, TModifyParams, ITableItem } from './types';
import { NAMESPACE } from './constants';
import services from './services';
import { message } from 'antd';

export const initialState: IPageState = {
  refresh: 0,
  loading: false,
  searchCondition: {mtype: '1'}, // 初始化检索条件
  tableData: [],
  pagination: {
    pageNum: 1,
    pageSize: baseTableConf.pageSize,
  },
  mainModal: {
    visible: false,
    type: CREATE,
  },
  importModal: {
    visible: false,
  },
};

export const getDataList = createServiceAsyncThunk(
  `${NAMESPACE}/getDataList`,
  async (params: TSearchParams & IPagination) => services.getDataListService(params),
);

export const postEdit = createServiceAsyncThunk(
  `${NAMESPACE}/postEdit`,
  async (params: TModifyParams) => services.postEditService(params),
);

export const postCreate = createServiceAsyncThunk(
  `${NAMESPACE}/postCreate`,
  async (params: TCreateParams) => services.postCreateService(params),
);

export const getDel = createServiceAsyncThunk(
  `${NAMESPACE}/getDel`,
  async (params: {tid: number}) => services.getDelService(params),
);

export const getDataDetail = createServiceAsyncThunk(
  `${NAMESPACE}/getDataDetail`,
  async (params: {uid: any, type: any}) => services.getDataDetailService({ uid: params.uid }),
);

export const postSetuserut = createServiceAsyncThunk(
  `${NAMESPACE}/postSetuserut`,
  async (params: { uid: any; ut: '1' | '2' }) => services.postSetuserutService(params),
);

export const postSetBg = createServiceAsyncThunk(
  `${NAMESPACE}/postSetBg`,
  async (params: { yearbg: any; tabg: any }) => services.postSetBgService(params),
);

export const postUserverify = createServiceAsyncThunk(
  `${NAMESPACE}/postUserverify`,
  async (params:any) => services.postUserverify(params),
);

export const postCheck = createServiceAsyncThunk(
  `${NAMESPACE}/postCheck`,
  async (params:any) => services.postCheckService(params),
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
    initData(state) {
      state.loading = true;
    },
    initDataFinish(state) {
      state.loading = false;
    },
    updateMainModalVisible(state, action: PayloadAction<boolean>) {
      state.mainModal.visible = action.payload;
    },
    updateMainModal(state, action: PayloadAction<IModalData<ITableItem>>) {
      state.mainModal = action.payload;
    },
    updateImportModal(state, action: PayloadAction<IPageState['importModal']>) {
      state.importModal = action.payload;
    },
  },
  // 异步的成功、失败处理，可以使用类似上面reducers的设置方式，但是由于是对字符串的捕获，会损失类型；
  extraReducers: builder => {
    builder.addCase(getDataList.fulfilled, (state, action) => {
      state.tableData = Array.isArray(action.payload?.data?.cards) ? action.payload?.data?.cards : [];
      state.pagination.total = action.payload?.data?.total || 0;
      state.pagination.pageNum = action?.meta?.arg?.pageNum || 1;
      state.pagination.pageSize = action?.meta?.arg?.pageSize || baseTableConf.pageSize;
    });
    builder.addCase(getDataDetail.fulfilled, (state, action) => {
      state.mainModal.data = action.payload?.data || {};
      state.mainModal.type = action.meta?.arg?.type || '';
      state.mainModal.visible = true;
    });
    builder.addCase(postCreate.fulfilled, state => {
      state.mainModal.visible = false;
      state.refresh += 1;
    });
    builder.addCase(postEdit.fulfilled, state => {
      state.mainModal.visible = false;
      state.refresh += 1;
    });
    builder.addCase(getDel.fulfilled, state => {
      message.success('下线成功');
      state.refresh += 1;
    });
    builder.addCase(postSetuserut.fulfilled, state => {
      message.success('设置成功');
      state.refresh += 1;
    });
    builder.addCase(postUserverify.fulfilled, state => {
      message.success('设置成功');
      state.mainModal.visible = false;
      state.refresh += 1;
    });
    builder.addCase(postSetBg.fulfilled, state => {
      message.success('设置成功');
      state.mainModal.visible = false;
      state.refresh += 1;
    });
    builder.addCase(postCheck.fulfilled, state => {
      message.success('核销成功');
      state.refresh += 1;
    });
  },
});

export const { actions, reducer, name: sliceKey } = slice;
