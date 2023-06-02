import { getRequest, postJsonRequest, postRequest } from 'utils/request';
import { ITableItem, TSearchParams, TCreateParams, TModifyParams } from './types';

// 获取列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  postJsonRequest<any, any>(
    '/tsResource/common/sys/dict/dictDataByPage',
    {
      "orderField": "id",
      "orderType": 1,
      ...params
    }
    // { ...params, orderField: 'id', orderType: 1, dictTye: 'biz_template_id' },
  );

// 新建
export const postCreateService = (params: TCreateParams) =>
  postJsonRequest<TCreateParams, IResponseData<string>>(
    '/tsResource/common/sys/dict/saveDictData',
    params,
  );

// 编辑
export const postEditService = (params: TModifyParams) =>
  postJsonRequest<TModifyParams, IResponseData<string>>(
    '/tsResource/common/sys/dict/saveDictData',
    params,
  );

// 删除
export const getDelService = (params: { id: number }) =>
  postJsonRequest<{ id: number }, IResponseData<string>>(
    '/tsResource/sys_dict_data/delete',
    params,
  );

// 详情
export const getDataDetailService = (params: { id: number }) =>
  getRequest<{ id: number }, IResponseData<ITableItem>>(
    '/tsResource/sys_dict_data/getDetail',
    params,
  );

// 初始化
export const getDataInitService = (params: { keyName: string }) =>
  getRequest<{ keyName: string }, any>(
    '/tsResource/common/sys/dict/initDictCache',
    params,
  );

export default {
  getDataListService,
  postCreateService,
  postEditService,
  getDelService,
  getDataDetailService,
  getDataInitService,
};
