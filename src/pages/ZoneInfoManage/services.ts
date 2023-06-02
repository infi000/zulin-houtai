import { getRequest, postJsonRequest, postRequest } from 'utils/request';
import { ITableItem, TSearchParams, TCreateParams, TModifyParams } from './types';

// 获取列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  getRequest<TSearchParams & IPagination, IListResponse<ITableItem>>(
    '/tsResource/place/list',
    params,
  );

// 新建
export const postCreateService = (params: TCreateParams) =>
  postJsonRequest<TCreateParams, IResponseData<string>>(
    '/tsResource/place/save',
    params,
  );

// 编辑
export const postEditService = (params: TModifyParams) =>
  postJsonRequest<TModifyParams, IResponseData<string>>(
    '/tsResource/place/edit',
    params,
  );

// 删除
export const getDelService = (params: { id: number }) =>
  postJsonRequest<{ id: number }, IResponseData<string>>(
    '/tsResource/place/delete',
    params,
  );

// 状态
export const postStatusService = (params: { id: number, status: number }) =>
  postJsonRequest<{ id: number, status: number }, IResponseData<string>>(
    '/tsResource/place/valid',
    params,
  );

// 详情
export const getDataDetailService = (params: { id: number }) =>
  getRequest<{ id: number }, IResponseData<ITableItem>>(
    '/tsResource/place/getDetail',
    params,
  );

export default {
  getDataListService,
  postCreateService,
  postEditService,
  getDelService,
  getDataDetailService,
  postStatusService,
};
