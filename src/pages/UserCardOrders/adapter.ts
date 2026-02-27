/*
 * @Author: Claude
 * @Description: UserCardOrders参数格式化
 */
import { ITableItem } from './types';

export const formatSearchParams = (params: any) => {
  const {
    odate,
    ...rest
  } = params;

  let f_odate;
  if (odate) {
    f_odate = (odate as any).format('YYYY-MM-DD'); // 日期格式化为 yyyy-MM-dd
  }

  return {
    ...rest,
    odate: f_odate,
  };
};
