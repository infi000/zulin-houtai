/*
 * @Author: your name
 * @Date: 2021-01-27 13:54:13
 * @LastEditTime: 2021-01-27 16:53:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /janus/src/components/DistrictsComponent/services.ts
 */
import { getRequest } from 'utils/request';

export const getDistrictsDataService = (params: object) => getRequest<object, IResponseData<any[]>>('/base/common/districtlist', params);

export default {
  getDistrictsDataService,
};
