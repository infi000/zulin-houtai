/* eslint-disable prefer-destructuring */
import { falsyParamsFilter } from 'utils/filters';
import { TBeforeCreateParams } from './types';

export const formatPostParams = (params: TBeforeCreateParams) => {
  const {
    warehouseSSQ,
    contactStartDate,
    contactEndDate,
    contactRentalStartDate,
    assistParkPicture,
    assistWarehousePicture,
    warehouseLinks,
    ...rest
  } = params;
  const [warehouseProvince, warehouseCity, warehouseCounty] = warehouseSSQ;
  let f_contactStartDate;
  let f_contactEndDate;
  let f_contactRentalStartDate;
  let f_assistParkPicture;
  let f_assistWarehousePicture;
  if (contactStartDate) {
    f_contactStartDate = (contactStartDate as any).format('YYYY-MM-DD');
  }
  if (contactEndDate) {
    f_contactEndDate = (contactEndDate as any).format('YYYY-MM-DD');
  }
  if (contactRentalStartDate) {
    f_contactRentalStartDate = (contactRentalStartDate as any).format('YYYY-MM-DD');
  }
  if (assistWarehousePicture && Array.isArray(assistWarehousePicture) && assistWarehousePicture.length > 0) {
    f_assistWarehousePicture = assistWarehousePicture.join(',');
  }
  if (assistParkPicture && Array.isArray(assistParkPicture) && assistParkPicture.length > 0) {
    f_assistParkPicture = assistParkPicture.join(',');
  }
  return {
    ...rest,
    warehouseProvince,
    warehouseCity,
    warehouseCounty,
    contactStartDate: f_contactStartDate,
    contactEndDate: f_contactEndDate,
    contactRentalStartDate: f_contactRentalStartDate,
    assistParkPicture: f_assistParkPicture,
    assistWarehousePicture: f_assistWarehousePicture,
    warehouseLinks: warehouseLinks?.length ? warehouseLinks.join(',') : '',
  };
};

export const formatSearchParams = (params: any) => {
  const res = { ...params };
  if (params.warehouseSSQ) {
    const [warehouseProvince, warehouseCity, warehouseCounty] = params.warehouseSSQ.split('/');
    res.warehouseProvince = warehouseProvince;
    res.warehouseCity = warehouseCity;
    res.warehouseCounty = warehouseCounty;
    delete res.warehouseSSQ;
  }
  return res;
};
