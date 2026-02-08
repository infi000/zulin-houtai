/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:26:54
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-25 23:23:04
 * @FilePath: /houtai/src/pages/ToolManager/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getRequest, postRequest, postFormDataRequest } from 'utils/request';
import { formatPage } from 'utils/utils';
import { ITableItem, TSearchParams, TCreateParams, TModifyParams } from './types';

// 获取列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  getRequest<TSearchParams & IPagination, IListResponse<ITableItem>>(
    '/Card/searchimport',
    formatPage(params),
  );
  
// 设置setyearprice
export const postUserverify = (params:any) =>
  postFormDataRequest<any, IResponseData<string>>('/User/userverify', params);
  
// 设置setbg
export const postSetBgService = (params: { yearbg: any; tabg: any  }) =>
  postFormDataRequest< { yearbg: any; tabg: any  }, IResponseData<string>>('/User/setbg', params);


// 新建
export const postCreateService = (params: TCreateParams) =>
  postFormDataRequest<TCreateParams, IResponseData<string>>(
    '/Lease/tooladd',
    params,
  );

// 编辑
export const postEditService = (params: TModifyParams) =>
  postFormDataRequest<TModifyParams, IResponseData<string>>(
    '/Lease/toolmodify',
    params,
  );

// 删除
export const getDelService = (params: { tid: number }) =>
  postRequest<{ tid: number }, IResponseData<string>>('/Lease/toolscrapped', params);
// uid:用户id
// ut: 1不可验票，2可验票

export const postSetuserutService = (params: { uid: any; ut: '1' | '2' }) =>
  getRequest<{ uid: any; ut: '1' | '2' }, IResponseData<string>>('/User/setuserut', params);


// 详情
export const getDataDetailService = (params: { uid: any }) =>
  getRequest<{ uid: any }, IResponseData<ITableItem>>(
    '/User/agreementdetail',
    params,
  );


// 核销
export const postCheckService = (params: any) =>
  postRequest<any, IResponseData<ITableItem>>(
    '/Card/checkimport',
    params,
  );

export default {
  getDataListService,
  postCreateService,
  postEditService,
  getDelService,
  getDataDetailService,
  postSetuserutService,
  postSetBgService,
  postUserverify,
  postCheckService
};
