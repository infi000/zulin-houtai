/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-06 22:49:51
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-29 23:37:20
 * @FilePath: /houtai/src/pages/EquipmentManager/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getRequest, postJsonRequest, postRequest, postFormDataRequest } from 'utils/request';
import { formatPage } from 'utils/utils';
import { ITableItem, TSearchParams, TCreateParams, TModifyParams } from './types';

// 获取列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  getRequest<TSearchParams & IPagination, IListResponse<ITableItem>>(
    '/Lease/equipments',
    formatPage(params),
  );

// 新建
export const postCreateService = (params: TCreateParams) =>
  postFormDataRequest<TCreateParams, IResponseData<string>>(
    '/Lease/equipmentadd',
    params,
  );

// 编辑
export const postEditService = (params: TModifyParams) =>
  postFormDataRequest<TModifyParams, IResponseData<string>>(
    '/Lease/equipmentmodify',
    params,
  );

//   1.4 设备状态修改equipmentstatus
// Lease/equipmentstatus
// 必需参数：
// epid:设备id
// status: 1正常，0下线，2报废审核中，3已报废，4维护中，5备用
// 返回
// {
//     "res": "succ",
//     "data": ""
// }
// 设备状态修改equipmentstatus
export const postStatusService = (params: { epid: number, status:any }) =>
  postRequest<{ epid: number, status:any }, IResponseData<string>>(
    '/Lease/equipmentstatus',
    params,
  );

// 删除
export const getDelService = (params: { id: number }) =>
  postJsonRequest<{ id: number }, IResponseData<string>>(
    '/ms_zl_equipment/ms_zl_equipment/delete',
    params,
  );

// 详情
export const getDataDetailService = (params: { epid: number }) =>
  getRequest<{ epid: number }, IResponseData<ITableItem>>(
    '/Lease/equipmentdetail',
    params,
  );

export default {
  getDataListService,
  postCreateService,
  postEditService,
  getDelService,
  getDataDetailService,
  postStatusService
};
