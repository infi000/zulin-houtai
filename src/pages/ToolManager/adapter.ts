import { ITableItem } from './types';

export const formatPostParams = (params: any) => {
  const {
    thumbinal,
    pics,
    buytime,
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
  let f_buytime;
  if (buytime) {
    f_buytime = (buytime as any).format('YYYY-MM-DD'); // 日期
  }
  return {
    ...rest,
    thumbinal: f_thumbinal,
    pics: f_pics,
    buytime: f_buytime,
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
