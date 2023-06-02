import { falsyParamsFilter } from 'utils/filters';
import { ITableItem } from './types';

export const formatPostParams = (params:ITableItem) => {
  const { idleEndTime, idlePicture, warehouseDetailAddress, ...rest } = params; // warehouseDetailAddress不提交后端
  let f_idleEndTime;
  let f_idlePicture;
  if (idleEndTime) {
    f_idleEndTime = (idleEndTime as any).format('YYYY-MM-DD');
  }
  if (idlePicture && Array.isArray(idlePicture) && idlePicture.length > 0) {
    f_idlePicture = idlePicture.join(',');
  }
  return {
    ...rest,
    idleEndTime: f_idleEndTime,
    idlePicture: f_idlePicture,
  };
};

export const formatSearchParams = (params: any) => {
  const { idleEndTime, warehouseType, ...rest } = params; // warehouseDetailAddress不提交后端
  let f_idleEndTime;
  let f_warehouseType;
  if (idleEndTime) {
    f_idleEndTime = (idleEndTime as any).format('YYYY-MM-DD');
  }
  if (warehouseType && warehouseType.length > 0) {
    f_warehouseType = warehouseType.join(',');
  }
  return {
    ...rest,
    idleEndTime: f_idleEndTime,
    warehouseType: f_warehouseType,
  };
};
