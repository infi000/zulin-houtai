/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-14 22:43:51
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-05-26 22:20:11
 * @FilePath: /houtai/src/pages/OrderManager/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE，
 */
import { getRequest, postRequest, postFormDataRequest } from 'utils/request';
import { formatPage } from 'utils/utils';
import { ITableItem, TSearchParams, TCreateParams, TModifyParams } from './types';
// 获取列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  getRequest<TSearchParams & IPagination, IListResponse<ITableItem>>(
    '/Lease/orders',
    formatPage(params),
  );

// 新建
export const postCreateService = (params: TCreateParams) =>
  postFormDataRequest<TCreateParams, IResponseData<string>>(
    '/Lease/tooladd',
    params,
  );

// 编辑
export const postEditService = (params: TModifyParams) =>
  postFormDataRequest<TModifyParams, IResponseData<string>>(
    '/Lease/toolmodify',
    params,
  );

// 删除
export const getDelService = (params: { oid: number }) =>
  postRequest<{ oid: number }, IResponseData<string>>('/Lease/toolscrapped', params);
// 上线
export const getOnlineService = (params: { oid: number }) =>
  postRequest<{ oid: number }, IResponseData<string>>('/Lease/toolonline', params);

const mock = 'http://easy-mock.sftcwl.com/mock/647f4ca88988f273dfbd7b8e/zl'
// 详情
export const getDataDetailService = (params: { oid: any }) =>
  getRequest<{ oid: any }, IResponseData<ITableItem>>(
    '/Lease/orderdetail',
    params,
  );
// 详情
export const getQrService = (params: { oid: any }) =>
  getRequest<{ oid: any }, IResponseData<ITableItem>>(
    '/Lease/orderwxcode',
    params,
  );

// 核销
// oid:订单id
// iscomplete:是否完成实验，1完成，0未完成

export const postVerifyService = (params: { oid: string, iscomplete: string}) =>
  postFormDataRequest<{ oid: string, iscomplete: string}, IResponseData<string>>(
    '/Lease/orderverification',
    params,
  );

// 续订
/*
pid:被续订的订单id
endtime:预约截止时间，例如：2023-06-20 11:00
*/
export const postOrderrenewService = (params: { pid: string, endtime: string}) =>
  postFormDataRequest<{ pid: string, endtime: string}, IResponseData<string>>(
    '/Lease/orderrenew',
    params,
  );
// 续订
/*
必需参数：
oid:订单id
返回
收款二维码图片

*/
export const getOrderwxcodeService = (params: { oid: string}) =>
  postFormDataRequest<{ oid: string}, IResponseData<string>>(
    '/Lease/orderwxcode',
    params,
  );
export const getOrdermodifyService = (params: any) =>
  postFormDataRequest<any, IResponseData<string>>(
    '/Lease/ordermodify',
    params,
  );

export const getOrdertaPayService = (params: { oid: any }) =>
  getRequest<{ oid: any }, IResponseData<ITableItem>>(
    '/Lease/ordertapay',
    params,
  );

export const getOrderExportService = (params:any) =>
  getRequest<any, IResponseData<ITableItem>>(
    '/Lease/orderexport',
    params,
  );

export default {
  getDataListService,
  postCreateService,
  postEditService,
  getDelService,
  getDataDetailService,
  getOnlineService,
  postVerifyService,
  postOrderrenewService,
  getOrderwxcodeService,
  getOrdermodifyService,
  getOrdertaPayService,
  getOrderExportService,
};
