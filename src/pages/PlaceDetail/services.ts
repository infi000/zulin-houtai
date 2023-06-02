import { getRequest } from 'utils/request';
import { ITableItem, IParamsId, IRewardInfo, IParamsPlaceId } from './types';
import { EStatus } from '../FreeZoneManage/constants';

// 获取详情
export const getDetailService = (params: IParamsId) =>
  getRequest<IParamsId, ITableItem>(
    '/tsResource/place/getDetail',
    params,
  );

// 获取闲置信息
export const getUnusedInfoService = (params: any) =>
  getRequest<IParamsPlaceId, IListResponse<ITableItem>>(
    '/tsResource/zone/list',
    { ...params, status: EStatus['已审核'], pageNum: 1, pageSize: 1000 },
  );

// 奖励
export const getRewardInfoService = (params: IParamsPlaceId) =>
  getRequest<IParamsPlaceId, IRewardInfo[]>(
    '/tsResource/common/getTsResourcesRewardsInfoByPlaceId',
    params,
  );

export default {
  getDetailService,
  getUnusedInfoService,
  getRewardInfoService,
};
