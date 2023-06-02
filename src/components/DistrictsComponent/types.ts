/*
 * @Author:liqingqing
 * @Date: 2021-01-27 14:46:37
 * @LastEditTime: 2021-02-03 18:55:23
 * @LastEditors: 董方旭
 * @Description: In User Settings Edit
 * @FilePath: /janus/src/components/DistrictsComponent/types.ts
 */
export interface IPageState {
  districtsData: any[];
  queryParam: string | number;
}

export interface IListItem {
  value: string;
  label: string;
  children: IListItem;
}

export type TLastLevel = 'nation' | 'province' | 'city' | 'district';
