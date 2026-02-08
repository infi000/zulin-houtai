/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:22:52
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-04 23:45:54
 * @FilePath: /houtai/src/pages/ExperimentManager/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getRequest, postJsonRequest, postFormDataRequest, postRequest } from 'utils/request';
import { formatPage } from 'utils/utils';
import { ITableItem, TSearchParams, TCreateParams, TModifyParams } from './types';

// 获取列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  getRequest<TSearchParams & IPagination, IListResponse<ITableItem>>('/Card/cards', formatPage(params));

// 新建
export const postCreateService = (params: TCreateParams) =>
  postFormDataRequest<TCreateParams, IResponseData<string>>('/Card/add', params);

// 编辑
export const postEditService = (params: TModifyParams) =>
  postFormDataRequest<TModifyParams, IResponseData<string>>('/Card/modify', params);

export const postStatusService = (params: { cid: number; status: any }) =>
  postRequest<{ cid: number; status: any }, IResponseData<string>>('/Card/equipmentstatus', params);
// 删除
export const getDelService = (params: { cid: number }) =>
  getRequest<{ cid: number }, IResponseData<string>>('/Card/offline', params);
// 上线
export const getOnlineService = (params: { cid: number }) =>
  getRequest<{ cid: number }, IResponseData<string>>('/Card/online', params);

// 详情
export const getDataDetailService = (params: { cid: number }) =>
  getRequest<{ cid: number }, IResponseData<ITableItem>>('/Card/detail', params);

export default {
  getDataListService,
  postCreateService,
  postEditService,
  getDelService,
  getDataDetailService,
  getOnlineService,
  postStatusService
};
