/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:22:52
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-04 23:43:21
 * @FilePath: /houtai/src/pages/ExperimentManager/adapter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ITableItem } from './types';

export const formatPostParams = (params: any) => {
  const {
    thumbinal,
    cardpic,
    ...rest
  } = params;

  let f_thumbinal;
  if (thumbinal?.file) {
    // f_thumbinal = thumbinal.fileList.map((item: any) => item.originFileObj);
    f_thumbinal = thumbinal.file;
  }
  let f_cardpic;
  if (cardpic?.file) {
    // f_thumbinal = thumbinal.fileList.map((item: any) => item.originFileObj);
    f_cardpic = cardpic.file;
  }


  return {
    ...rest,
    thumbinal: f_thumbinal,
    cardpic: f_cardpic,
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
