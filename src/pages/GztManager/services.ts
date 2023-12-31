/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:26:54
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-08-05 23:33:58
 * @FilePath: /houtai/src/pages/ToolManager/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getRequest, postRequest, postFormDataRequest } from 'utils/request';
import { formatPage } from 'utils/utils';
import { ITableItem, TSearchParams, TCreateParams, TModifyParams } from './types';

// 获取列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  getRequest<TSearchParams & IPagination, IListResponse<ITableItem>>(
    '/Lease/equipmentsusestatus',
    formatPage(params),
  );
  
// 设置setyearprice
export const postUserverify = (params:any) =>
  postFormDataRequest<any, IResponseData<string>>('User/userverify', params);
  
// 设置setbg
export const postSetBgService = (params: { yearbg: any; tabg: any  }) =>
  postFormDataRequest< { yearbg: any; tabg: any  }, IResponseData<string>>('/User/setbg', params);


// 新建
export const postCreateService = (params: TCreateParams) =>
  postFormDataRequest<TCreateParams, IResponseData<string>>(
    '/Lease/orderadd',
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
// 上线
export const getOnlineService = (params: { tid: number }) =>
  postRequest<{ tid: number }, IResponseData<string>>('/Lease/toolonline', params);


// 详情
export const getDataDetailService = (params: { uid: any }) =>
  getRequest<{ uid: any }, IResponseData<ITableItem>>(
    '/Lease/equipmentbooktimes',
    params,
  );


//1.15 指定房间下主设备可预约信息equipmentbooktimesex 「

export const getEquipmentbooktimes = (params: { epid: any, prebookdate: any  }) =>
  getRequest< { epid: any, prebookdate: any  }, IResponseData<ITableItem>>(
    '/Lease/equipmentbooktimes',
    params,
  );

//1.14 实验主设备配置的实验项目列表experimentsbyepid
export const getExperimentsList = (params: { epid: any  }) =>
  getRequest< any, IResponseData<ITableItem>>(
    '/Lease/experimentsbyepid',
    params
  );
export const getUserListService = () =>
  getRequest< any, IResponseData<ITableItem>>(
    '/User/searchbase',
  );
export const getToolsListService = () =>
  getRequest< any, IResponseData<ITableItem>>(
    '/Lease/tools',
  );

export default {
  getDataListService,
  postCreateService,
  postEditService,
  getDelService,
  getDataDetailService,
  getOnlineService,
  postSetBgService,
  postUserverify,
  getEquipmentbooktimes,
  getExperimentsList,
  getUserListService,
  getToolsListService,
};
