/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-03-15 10:11:49
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-04-14 17:30:07
 * @FilePath: /ot-resources/src/store/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DICT_IDS } from 'utils/constants';
import { getRequest } from 'utils/request';
// import { ISystemItem } from './types';

// service，要求以Service为结尾进行命名
export const getLoginUserInfoService = () => getRequest('/tsResource/common/getUserInfo');
// export const getLoginUserInfoService = () => getRequest('http://easy-mock.sftcwl.com/mock/5f1a8bf410c3f359faddc7df/test/tsResource/common/getUserInfo');

// 获取字典，键值对，没有顺序，废弃！用这个代替getDictTypesService
export const getDictMapsService = () =>{
  const str = DICT_IDS.join(';');
  return getRequest<string, any>(
    `/tsResource/common/sys/dict/getDictMaps/${str};`,
  );
};

// 获取字典 数组
export const getDictTypesService = () =>{
  const str = DICT_IDS.join(';');
  return getRequest<string, any>(
    `/tsResource/common/sys/dict/getDictTypes/${str};`,
  );
};

// export const getAllSystemListService = () => getRequest<{is_user: string}, ISystemItem[]>('/userweb/common/systemlist', { is_user: '2' });
// export const getAuthSystemListService = () => getRequest<{is_user: string}, ISystemItem[]>('/userweb/common/systemlist', { is_user: '1' });

export default {
  getLoginUserInfoService,
  getDictMapsService,
  getDictTypesService,
  // getAllSystemListService,
  // getAuthSystemListService,
};
