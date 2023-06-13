import { ITableItem } from './types';

export const formatPostParams = (params: any) => {
  const {
    thumbinal,
    pics,
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
  return {
    ...rest,
    thumbinal: f_thumbinal,
    pics: f_pics,
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
