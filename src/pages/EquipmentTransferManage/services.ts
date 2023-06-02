/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-05-24 11:08:49
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-05-29 18:42:22
 * @FilePath: /ot-resources/src/pages/EquipmentFreeManage/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getRequest, postJsonRequest, postRequest } from 'utils/request';
import { ITableItem, TSearchParams, TCreateParams, TModifyParams, IDeviceDetail, TReviewParams } from './types';

// 获取列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  getRequest<TSearchParams & IPagination, IListResponse<ITableItem>>(
    '/tsResource/device/transferRecord/list',
    params,
  );

// 新建
export const postCreateService = (params: TCreateParams) =>
  postJsonRequest<TCreateParams, IResponseData<string>>(
    '/tsResource/device/transferRecord/addDeviceTransferRecord',
    params,
  );

// 编辑
export const postEditService = (params: TModifyParams) =>
  postJsonRequest<TModifyParams, IResponseData<string>>(
    '/resources/device_idle_record/edit',
    params,
  );

// 删除
export const getDelService = (params: { id: number }) =>
  postJsonRequest<{ id: number }, IResponseData<string>>(
    '/resources/device_idle_record/delete',
    params,
  );

// 详情
export const getDataDetailService = (params: { id: number }) =>
  getRequest<{ id: number }, IResponseData<IDeviceDetail>>(
    '/tsResource/device/transferRecord/getDetail',
    params,
  );

// 导出
export const postExportService = (params: any) =>
  postJsonRequest<any, IResponseData<IDeviceDetail>>(
    '/tsResource/common/submitExport',
    params,
  );

// 审核
export const postReviewService = (params: TReviewParams) =>
  postJsonRequest<TReviewParams, IResponseData<any>>(
    '/tsResource/device/idleRecord/reviewIdleRecord',
    params,
  );

export default {
  getDataListService,
  postCreateService,
  postEditService,
  getDelService,
  getDataDetailService,
  postExportService,
  postReviewService,
};
