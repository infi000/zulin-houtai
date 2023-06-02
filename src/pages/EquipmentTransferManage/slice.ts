/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { baseTableConf } from 'configs/base.conf';
import { createServiceAsyncThunk } from 'utils/@reduxjs/toolkit';
import { EDIT, CREATE } from 'utils/constants';
import { IPageState, TSearchParams, TCreateParams, TModifyParams, ITableItem, TReviewParams } from './types';
import { NAMESPACE } from './constants';
import services from './services';
import { message } from 'antd';

export const initialState: IPageState = {
  refresh: 0,
  loading: false,
  searchCondition: {}, // 初始化检索条件
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
  async (params: {id: number}) => services.getDelService(params),
);

export const getDataDetail = createServiceAsyncThunk(
  `${NAMESPACE}/getDataDetail`,
  async (params: {id: number}) => services.getDataDetailService(params),
);
export const postExport = createServiceAsyncThunk(
  `${NAMESPACE}/postExport`,
  async (params: any) => services.postExportService(params),
);
export const postReview = createServiceAsyncThunk(
  `${NAMESPACE}/postReview`,
  async (params: TReviewParams) => services.postReviewService(params),
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
    updateMainModal(state, action: PayloadAction<IModalData<any>>) {
      state.mainModal = action.payload;
    },
    updateImportModal(state, action: PayloadAction<IPageState['importModal']>) {
      state.importModal = action.payload;
    },
  },
  // 异步的成功、失败处理，可以使用类似上面reducers的设置方式，但是由于是对字符串的捕获，会损失类型；
  extraReducers: builder => {
    builder.addCase(getDataList.fulfilled, (state, action) => {
      state.tableData = action.payload?.data?.list || [];
      state.pagination.total = action.payload?.data?.total || 0;
      state.pagination.pageNum = action.payload?.data?.pageNum || 1;
      state.pagination.pageSize = action.payload?.data?.pageSize || baseTableConf.pageSize;
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
      state.refresh += 1;
    });
    builder.addCase(getDataDetail.fulfilled, (state, action) => {
      state.mainModal.data = action.payload?.data;
    });
    builder.addCase(postExport.fulfilled, () => {
      message.warn('导出时间过长，请到【系统管理-数据导入导出】页面查看结果！');
    });
    builder.addCase(postReview.fulfilled, state => {
      message.success('执行成功');
      state.mainModal.visible = false;
      state.refresh += 1;
    });
  },
});

export const { actions, reducer, name: sliceKey } = slice;
