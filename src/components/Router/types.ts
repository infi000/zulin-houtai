/*
 * @Author: 董方旭
 * @Date: 2021-03-19 13:36:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-25 14:44:30
 * @Description: Route ts
 */
export interface IMenuDataItem {
  path?: string;
  key?: string;
  icon?: any;
  name?: string;
  text?: string;
  auth?: Auth.Code;
  exist?: boolean;
  hidden?: boolean;
  isDetail?: boolean;
  children?: IMenuDataItem[];
  route?: string;
  componentName?: string;
}

export interface IMenuItem {
  path: string;
  componentName: string;
  isDetail: boolean;
}
