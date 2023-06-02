import { getRequest } from 'utils/request';

export const getLogListService = (params: any) => getRequest('/tsResource/common/queryLog', params);
