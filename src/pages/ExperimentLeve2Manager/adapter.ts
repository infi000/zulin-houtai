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
    thumbinal,
    pics,
    conpics,
    ...rest
  } = params;

  let f_thumbinal;
  if (thumbinal?.file) {
    // f_thumbinal = thumbinal.fileList.map((item: any) => item.originFileObj);
    f_thumbinal = thumbinal.file;
  }
  let f_pics;
  if (pics?.fileList && pics.fileList.length > 0) {
    f_pics = pics.fileList.map((item: any) => item.originFileObj);
  }
  let f_conpics;
  if (conpics?.fileList && conpics.fileList.length > 0) {
    f_conpics = conpics.fileList.map((item: any) => item.originFileObj);
  }

  return {
    ...rest,
    thumbinal: f_thumbinal,
    pics: f_pics,
    conpics: f_conpics,
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
