import { getRequest, postJsonRequest, postRequest } from 'utils/request';
import { ITableItem, TSearchParams, TCreateParams, TModifyParams } from './types';

// 获取列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  postJsonRequest<any, any>(
    '/tsResource/common/sys/dict/dictTypeByPage',
    { ...params, orderField: 'id', orderType: 1 },
  );

// 新建
export const postCreateService = (params: TCreateParams) =>
  postJsonRequest<TCreateParams, IResponseData<string>>('/tsResource/common/sys/dict/saveDictType', params);

// 编辑
export const postEditService = (params: TModifyParams) =>
  postJsonRequest<TModifyParams, IResponseData<string>>('/tsResource/common/sys/dict/saveDictType', params);

// 删除
export const getDelService = (params: { id: number }) =>
  postJsonRequest<{ id: number }, IResponseData<string>>('/tsResource/sys_dict_type/delete', params);

// 详情
export const getDataDetailService = (params: { id: number }) =>
  getRequest<{ id: number }, IResponseData<ITableItem>>('/tsResource/sys_dict_type/getDetail', params);

export default {
  getDataListService,
  postCreateService,
  postEditService,
  getDelService,
  getDataDetailService,
};
