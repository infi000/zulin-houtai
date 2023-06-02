import { getRequest, postJsonRequest, postRequest } from 'utils/request';
import { ITableItem, TSearchParams, TCreateParams, TModifyParams } from './types';

// 获取列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  getRequest<TSearchParams & IPagination, IListResponse<ITableItem>>(
    '/tsResource/rewardsInfo/list',
    params,
  );

// 新建
export const postCreateService = (params: TCreateParams) =>
  postJsonRequest<TCreateParams, IResponseData<string>>(
    '/tsResource/rewardsInfo/save',
    params,
  );

// 编辑
export const postEditService = (params: TModifyParams) =>
  postJsonRequest<TModifyParams, IResponseData<string>>(
    '/tsResource/rewardsInfo/edit',
    params,
  );

// 删除
export const getDelService = (params: { id: number }) =>
  postJsonRequest<{ id: number }, IResponseData<string>>(
    '/tsResource/rewardsInfo/delete',
    params,
  );

// 详情
export const getDataDetailService = (params: { id: number }) =>
  getRequest<{ id: number }, IResponseData<ITableItem>>(
    '/tsResource/rewardsInfo/getDetail',
    params,
  );

// 状态
export const postStatusService = (params: { id: number, status: number }) =>
  postJsonRequest<{ id: number, status: number }, IResponseData<string>>(
    '/tsResource/rewardsInfo/valid',
    params,
  );

// 提交导入信息
export const postImportService = (params: { key: string, templateId: string }) =>
  postJsonRequest<{ key: string, templateId: string }, IResponseData<string>>(
    '/tsResource/common/submitImport',
    params,
  );

// 获取所有场地
export const getWarehouseAllService = () => getRequest<any, any[]>('/tsResource/common/getWarehouseByNameAndCode');

export default {
  getDataListService,
  postCreateService,
  postEditService,
  getDelService,
  getDataDetailService,
  postStatusService,
  getWarehouseAllService,
};
