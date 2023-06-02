import { getRequest } from 'utils/request';
import { ISearchCondition, IItem } from './types';

// service，要求以Service为结尾进行命名
export const getDataListService = (params: ISearchCondition) => getRequest<ISearchCondition, IListResponse<IItem>>('/omsdata/rule/rulesug', params);

export default {
  getDataListService,
};
