import { rewardsTypeMap } from './constants';
import { ITableItem } from './types';

export const formatPostParams = (params:ITableItem) => {
  const { textPart, rewardsValue, rewardsPeriod, ...rest } = params;
  let f_textPart;
  let f_rewardsPeriod;
  let f_rewardsValue = rewardsValue;
  if (textPart && Array.isArray(textPart) && textPart.length > 0) {
    f_textPart = textPart.join(',');
  }
  if (rewardsTypeMap.get(params.rewardsType) === '城市') {
    f_rewardsValue = (rewardsValue as any).join(',');
  }
  if (rewardsPeriod) {
    f_rewardsPeriod = (rewardsPeriod as any).format('YYYY-MM-DD');
  }
  return {
    ...rest,
    textPart: f_textPart,
    rewardsValue: f_rewardsValue,
    rewardsPeriod: f_rewardsPeriod,
  };
};

export const formatSearchParams = (params: any) => {
  const { rewardsValue, ...rest } = params; // warehouseDetailAddress不提交后端
  let f_rewardsValue = rewardsValue;
  if (rewardsTypeMap.get(params.rewardsType) === '城市') {
    f_rewardsValue = ((rewardsValue || []) as any).join(',');
  }
  return {
    ...rest,
    rewardsValue: f_rewardsValue,
  };
};
