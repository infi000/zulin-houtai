/*
 * @Author: Claude
 * @Description: UserCardOrders API服务调用
 */
import { getRequest, postRequest } from 'utils/request';
import { formatPage } from 'utils/utils';
import { ITableItem, TSearchParams } from './types';

// 获取购买记录列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  getRequest<TSearchParams & IPagination, IListResponse<ITableItem>>(
    '/Card/usercardorders',
    formatPage(params),
  );

// 订单退款
export const postRefundService = (params: { oid: string; money: number; usercardleft?: any }) =>
  postRequest<{ oid: string; money: number; usercardleft?: any }, IResponseData<string>>(
    '/Card/usercardorderrefund',
    params,
  );

// 获取微信订单号
export const getWxidService = (params: { oid: string }) =>
  getRequest<{ oid: string }, IResponseData<{ wxid: string }>>(
    '/Card/getwxid',
    params,
  );

// 导出订单
export const getExportService = (params: TSearchParams & IPagination) =>
  getRequest<TSearchParams & IPagination, any>(
    '/Card/exportusercardorders',
    formatPage(params),
  );

export default {
  getDataListService,
  postRefundService,
  getWxidService,
  getExportService,
};
