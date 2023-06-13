/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:25:14
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-09 00:48:41
 * @FilePath: /houtai/src/pages/ToolboxManager/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getRequest, postJsonRequest, postFormDataRequest, postRequest } from 'utils/request';
import { ITableItem, TSearchParams, TCreateParams, TModifyParams } from './types';

// 获取列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  getRequest<TSearchParams & IPagination, IListResponse<ITableItem>>(
    '/Lease/toolboxs',
    params,
  );

// 新建
export const postCreateService = (params: TCreateParams) =>
  postFormDataRequest<TCreateParams, IResponseData<string>>(
    '/Lease/toolboxadd',
    params,
  );

// 编辑
export const postEditService = (params: TModifyParams) =>
  postFormDataRequest<TModifyParams, IResponseData<string>>(
    '/Lease/toolboxmodify',
    params,
  );

// 删除
export const getDelService = (params: { tbid: number }) =>
  postRequest<{ tbid: number }, IResponseData<string>>(
    '/Lease/toolboxoffline',
    params,
  );
// 上线
export const getOnlineService = (params: { tbid: number }) =>
  postRequest<{ tbid: number }, IResponseData<string>>('/Lease/toolboxonline', params);

// 详情
export const getDataDetailService = (params: { tbid: number }) =>
  getRequest<{ tbid: number }, IResponseData<ITableItem>>(
    '/Lease/toolboxdetail',
    params,
  );

export default {
  getDataListService,
  postCreateService,
  postEditService,
  getDelService,
  getDataDetailService,
  getOnlineService,
};
