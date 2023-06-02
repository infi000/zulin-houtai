import { getRequest, postJsonRequest, postRequest } from 'utils/request';
import { ITableItem, TSearchParams, TCreateParams, TModifyParams } from './types';

// 获取列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  getRequest<TSearchParams & IPagination, IListResponse<ITableItem>>(
    '/tsResource/device/idle/list',
    {...params, useStatus: '1'},
  );

// 新建
export const postCreateService = (params: TCreateParams) =>
  postJsonRequest<TCreateParams, IResponseData<string>>(
    '/tsResource/device/save',
    params,
  );

// 编辑
export const postEditService = (params: TModifyParams) =>
  postJsonRequest<TModifyParams, IResponseData<string>>(
    '/tsResource/device/edit',
    params,
  );

// 统计
export const postStatisticService = () =>
  postJsonRequest<any, IResponseData<string>>(
    '/tsResource/device/statistic');

// 删除
export const getDelService = (params: { id: number }) =>
  postJsonRequest<{ id: number }, IResponseData<string>>(
    '/tsResource/device/delete',
    params,
  );

// 详情
export const getDataDetailService = (params: { id: number }) =>
  getRequest<{ id: number }, IResponseData<ITableItem>>(
    '/tsResource/device/getDetail',
    params,
  );

export default {
  getDataListService,
  postCreateService,
  postEditService,
  getDelService,
  getDataDetailService,
  postStatisticService,
};
