/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:22:52
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-07-04 21:44:57
 * @FilePath: /houtai/src/pages/ExperimentManager/adapter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ITableItem } from './types';

export const formatPostParams = (params: any) => {
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
    starttime: f_starttime,
    endtime: f_endtime,
  };
};

export const formatSearchParams = (params: any) => {

  const {
    startdate,
    enddate,
    ...rest
  } = params;

  let f_endtime;
  if (enddate) {
    f_endtime = (enddate as any).format('YYYY-MM-DD'); // 日期
  }
  let f_starttime;
  if (startdate) {
    f_starttime = (startdate as any).format('YYYY-MM-DD'); // 日期
  }
  return {
    ...rest,
    enddate: f_endtime,
    startdate: f_starttime,
  };
};
