/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:26:54
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-18 19:02:13
 * @FilePath: /houtai/src/pages/ToolManager/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getRequest, postRequest, postFormDataRequest } from 'utils/request';
import { ITableItem, TSearchParams, TCreateParams, TModifyParams } from './types';

// 获取列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  getRequest<TSearchParams & IPagination, IListResponse<ITableItem>>('/Consignment/orders', params);

// 新建
export const postCreateService = (params: TCreateParams) =>
  postFormDataRequest<TCreateParams, IResponseData<string>>('/Lease/tooladd', params);

// 编辑
export const postEditService = (params: TModifyParams) =>
  postFormDataRequest<TModifyParams, IResponseData<string>>('/Lease/toolmodify', params);

// 删除
export const getDelService = (params: { tid: number }) =>
  postRequest<{ tid: number }, IResponseData<string>>('/Lease/toolscrapped', params);
// 上线
export const getOnlineService = (params: { tid: number }) =>
  postRequest<{ tid: number }, IResponseData<string>>('/Lease/toolonline', params);

// 详情
export const getDataDetailService = (params: { oid: number }) =>
  getRequest<{ oid: number }, IResponseData<ITableItem>>('/Consignment/orderdetail', params);
  // 2.3 购买寄卖商品订单完成ordercomplete

export const getOrderCompleteService = (params: { oid: number | string }) =>
  postRequest<{ oid: number | string }, IResponseData<string>>('/Consignment/ordercomplete', params);
// 1.2 商品审核不通过goodsunpass
// Consignment/goodsunpass
// 必需参数：
// jgid:寄卖商品id
// 返回
// {
//     "res": "succ",
//     "data": ""
// }
export const getGoodsunpassService = (params: { jgid: number|string }) =>
  postRequest<{ jgid: number|string }, IResponseData<string>>('/Consignment/goodsunpass', params);

export default {
  getDataListService,
  postCreateService,
  postEditService,
  getDelService,
  getDataDetailService,
  getOnlineService,
  getGoodsunpassService,
  getOrderCompleteService,
};
