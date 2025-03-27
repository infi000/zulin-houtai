/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-05 00:17:34
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-07-05 00:49:43
 * @FilePath: /houtai/src/pages/SettingMainManager/adapter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ITableItem } from './types';

export const formatPostParams = (params: any) => {
  const {
    yearbg,
    tabg,
    ...rest
  } = params;

  let f_yearbg;
  if (yearbg?.file) {
    f_yearbg = yearbg.file;
  }
  let f_tabg;
  if (tabg?.file) {
    f_tabg = tabg.file;
  }

  return {
    ...rest,
    yearbg: f_yearbg,
    tabg: f_tabg,

  };
};

export const formatSearchParams = (params: any) => {
  const {
    checkdate,
    ...rest
  } = params;

  let f_checkdate;
  if (checkdate) {
    f_checkdate = (checkdate as any).format('YYYY-MM-DD'); // 日期
  }

  return {
    checkdate: f_checkdate,
    ...rest,
  };
};
