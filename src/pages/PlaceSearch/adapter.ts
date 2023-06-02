import { falsyParamsFilter } from 'utils/filters';
import { ITableItem } from './types';

export const formatSearchParams = (params: any) => {
  const {
    minIdleAreaTotal, minSaleAreaTotal, saleArea, unusedArea, moreSearch, order, ...rest
  } = params;
  const [orderField, orderType] = order?.split('_') || [];
  return {
    ...rest,
    minIdleAreaTotal: minIdleAreaTotal === 'input' ? unusedArea : minIdleAreaTotal,
    minSaleAreaTotal: minSaleAreaTotal === 'input' ? saleArea : minSaleAreaTotal,
    orderField: orderField || '',
    orderType: orderType || '',
  };
};
