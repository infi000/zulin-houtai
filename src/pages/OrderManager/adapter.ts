/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-14 22:43:51
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-07-10 00:19:18
 * @FilePath: /houtai/src/pages/OrderManager/adapter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ITableItem } from './types';

export const formatPostParams = (params: any) => {
  const {
    endtime,
    ...rest
  } = params;

  let f_endtime;
  if (endtime) {
    f_endtime = (endtime as any).format('YYYY-MM-DD HH:mm'); // 日期
  }
  return {
    ...rest,
    endtime: f_endtime,
  };
};

export const formatPostParams2 = (params: any) => {
  const {
    endtime,
    starttime,
    ...rest
  } = params;

  let f_endtime;
  if (endtime) {
    f_endtime = (endtime as any).format('YYYY-MM-DD HH:mm:ss'); // 日期
  }
  let f_starttime;
  if (starttime) {
    f_starttime = (starttime as any).format('YYYY-MM-DD HH:mm:ss'); // 日期
  }
  return {
    ...rest,
    endtime: f_endtime,
    starttime: f_starttime,
  };
};

export const formatSearchParams = (params: any) => {
  const {
    ...rest
  } = params;

  

  return {
    ...rest,
  };
};
