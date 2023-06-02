import { postJsonRequest, postJsonQueryRequest, getRequest } from 'utils/request';
import { ITableItem, ISearchCondition } from './types';

// 获取项目列表
export const getDataListService = (params: ISearchCondition & IPagination) =>
  postJsonRequest<ISearchCondition & IPagination, IListResponse<ITableItem>>(
    '/tsResource/place/search',
    params,
  );

export default {
  getDataListService,
};
