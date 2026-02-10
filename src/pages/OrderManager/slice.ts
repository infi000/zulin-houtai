/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { baseTableConf } from 'configs/base.conf';
import { createServiceAsyncThunk } from 'utils/@reduxjs/toolkit';
import { EDIT, CREATE } from 'utils/constants';
import { IPageState, TSearchParams, TCreateParams, TModifyParams, ITableItem } from './types';
import { NAMESPACE } from './constants';
import services from './services';
import { message } from 'antd';

import moment from 'moment';

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
  rechargeList: [], // 充值记录列表
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
  async (params: {oid: number}) => services.getDelService(params),
);

export const getDataDetail = createServiceAsyncThunk(
  `${NAMESPACE}/getDataDetail`,
  async (params: {oid: number, type: any}) => services.getDataDetailService({ oid: params.oid }),
);

export const getOnline = createServiceAsyncThunk(
  `${NAMESPACE}/getOnline`,
  async (params: {oid: number}) => services.getOnlineService(params),
);
export const getTa = createServiceAsyncThunk(
  `${NAMESPACE}/getTa`,
  async (params: {oid: number}) => services.getTaService(params),
);

export const postOrderrenew = createServiceAsyncThunk(
  `${NAMESPACE}/postOrderrenew`,
  async (params: { pid: string, endtime: string}) => services.postOrderrenewService(params),
);

export const postVerify = createServiceAsyncThunk(
  `${NAMESPACE}/postVerify`,
  async (params: { oid: string, iscomplete: string}) => services.postVerifyService(params),
);
export const getOrdermodify = createServiceAsyncThunk(
  `${NAMESPACE}/getOrdermodify`,
  async (params: any) => services.getOrdermodifyService(params),
);

// 导出订单列表
export const getOrderExport = createServiceAsyncThunk(
  `${NAMESPACE}/getOrderExport`,
  async (params: TSearchParams) => services.getOrderExportService(params),
);

// 退款
export const postRefund = createServiceAsyncThunk(
  `${NAMESPACE}/postRefund`,
  async (params: { oid: string; amount: string; refund_type: string }) => services.postRefundService(params),
);

// 充值记录
export const getRechargeList = createServiceAsyncThunk(
  `${NAMESPACE}/getRechargeList`,
  async (params: { uid: string } & IPagination) => services.getRechargeListService(params),
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
      state.tableData = action.payload?.data?.orders || [];
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
    builder.addCase(getOnline.fulfilled, state => {
      message.success('上线成功');
      state.refresh += 1;
    });
    builder.addCase(getTa.fulfilled, state => {
      message.success('支付成功');
      state.refresh += 1;
    });
    builder.addCase(postVerify.fulfilled, state => {
      message.success('执行成功');
      state.mainModal.visible = false;
      state.refresh += 1;
    });
    builder.addCase(postOrderrenew.fulfilled, state => {
      message.success('执行成功');
      state.mainModal.visible = false;
      state.refresh += 1;
    });
    builder.addCase(getOrdermodify.fulfilled, state => {
      message.success('修改成功');
      state.mainModal.visible = false;
      state.refresh += 1;
    });
    builder.addCase(getOrderExport.fulfilled, (state, action) => {
      const data = action.payload?.data;
      if (Array.isArray(data)) {
        // 导出数据为 Excel
        const exportData = data.map((item: any) => ({
          '订单号': item.orderid || '',
          '预约用户id': item.uid || '',
          '预约用户名称': item.uname || '',
          '预约电话': item.uphone || '',
          '订单标题': item.title || '',
          '包含的押金金额': item.desposit || '0',
          '总金额': item.total || '0',
          '会员优惠金额': item.discount || '0',
          '积分抵扣金额': item.scorecount || '0',
          '需要支付金额': item.totalpay || '0',
          '订单状态': O_STATUS_MAP.get(item.ostatus) || '',
          '订单创建时间': item.ctime ? moment.unix(item.ctime).format('YYYY-MM-DD HH:mm:ss') : '',
          '开始时间': item.starttime || '',
          '结束时间': item.endtime || '',
          '更新时间': item.uptime ? moment.unix(item.uptime).format('YYYY-MM-DD HH:mm:ss') : '',
        }));
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, '订单列表');
        XLSX.writeFile(workbook, `订单列表_${Date.now()}.xlsx`);
        message.success('导出成功');
      }
    });
    builder.addCase(postRefund.fulfilled, state => {
      message.success('退款成功');
      state.mainModal.visible = false;
      state.refresh += 1;
    });
    builder.addCase(getRechargeList.fulfilled, (state, action) => {
      // 充值记录数据处理
      const data = action.payload?.data;
      if (Array.isArray(data?.list)) {
        state.rechargeList = data.list;
      } else if (Array.isArray(data)) {
        state.rechargeList = data;
      }
    });
  },
});

export const { actions, reducer, name: sliceKey } = slice;
