/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:26:54
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-08-07 00:22:33
 * @FilePath: /houtai/src/pages/ToolManager/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getRequest, postRequest, postFormDataRequest } from 'utils/request';
import { formatPage } from 'utils/utils';
import { ITableItem, TSearchParams, TCreateParams, TModifyParams } from './types';

// 获取列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  getRequest<TSearchParams & IPagination, IListResponse<ITableItem>>(
    '/Check/checkbaselist',
    formatPage(params),
  );

// 设置setyearprice
export const postSetYearService = (params: { price: number }) =>
  postFormDataRequest<{ price: number }, IResponseData<string>>('/User/setyearprice', params);

// 设置setbg
export const postSetBgService = (params: { yearbg: any; tabg: any  }) =>
  postFormDataRequest< { yearbg: any; tabg: any  }, IResponseData<string>>('/User/setbg', params);


// 新建
export const postCreateService = (params: TCreateParams) =>
  postFormDataRequest<TCreateParams, IResponseData<string>>(
    '/Teacher/addtea',
    params,
  );

// 编辑
export const postEditService = (params: TModifyParams) =>
  postFormDataRequest<TModifyParams, IResponseData<string>>(
    '/Teacher/modifytea',
    params,
  );

// 删除
export const getDelService = (params: { tid: number }) =>
  postRequest<{ teaid: number }, IResponseData<string>>('/Teacher/deletetea', params);
// 上线
export const getOnlineService = (params: { tid: number }) =>
  postRequest<{ tid: number }, IResponseData<string>>('/Lease/toolonline', params);


// 详情
export const getDataDetailService = (params: { tid: number }) =>
  getRequest<{ tid: number }, IResponseData<ITableItem>>(
    '/Lease/tooldetail',
    params,
  );

export default {
  getDataListService,
  postCreateService,
  postEditService,
  getDelService,
  getDataDetailService,
  getOnlineService,
  postSetBgService,
  postSetYearService,
};
