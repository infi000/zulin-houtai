import { ITableItem } from './types';

export const formatPostParams = (params:ITableItem) => {
  const { ...rest } = params;
  return {
    ...rest,
  };
};
