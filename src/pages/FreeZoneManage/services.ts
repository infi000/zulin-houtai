import { EExportModuleId } from 'utils/constants';
import { getRequest, postJsonRequest, postRequest } from 'utils/request';
import { ITableItem, TSearchParams, TCreateParams, TModifyParams } from './types';

// 获取列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  getRequest<TSearchParams & IPagination, IListResponse<ITableItem>>('/tsResource/zone/list', params);

// 新建
export const postCreateService = (params: TCreateParams) =>
  postJsonRequest<TCreateParams, IResponseData<string>>('/tsResource/zone/save', params);

// 编辑
export const postEditService = (params: TModifyParams) =>
  postJsonRequest<TModifyParams, IResponseData<string>>('/tsResource/zone/edit', params);

// 删除
export const getDelService = (params: { id: number }) =>
  postJsonRequest<{ id: number }, IResponseData<string>>('/tsResource/zone/delete', params);

// 状态
export const postStatusService = (params: { id: number; status: number }) =>
  postJsonRequest<{ id: number; status: number }, IResponseData<string>>('/tsResource/zone/review', params);

// 详情
export const getDataDetailService = (params: { id: number }) =>
  getRequest<{ id: number }, IResponseData<ITableItem>>('/tsResource/zone/getDetail', params);

// 获取所有场地
export const getWarehouseAllService = () => getRequest<any, any[]>('/tsResource/common/getWarehouseByNameAndCode');

// 导出
export const postExportService = (params: any) =>
  postJsonRequest<any, any>('/tsResource/common/submitExport', { condition: { ...params }, moduleId: EExportModuleId['闲置场地信息'] });

export default {
  getDataListService,
  postCreateService,
  postEditService,
  getDelService,
  getDataDetailService,
  getWarehouseAllService,
  postStatusService,
  postExportService,
};
