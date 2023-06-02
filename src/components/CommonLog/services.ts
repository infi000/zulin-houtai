import { getRequest } from 'utils/request';

import { IRequestParams, ILogItem } from './types';

export const getLogListService = (params: IRequestParams) =>
  getRequest<IRequestParams, IListResponse<ILogItem>>('/commlog/buslog', params);

export default {
  getLogListService,
};
