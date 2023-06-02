/*
 * @Author: 李淳
 * @Date: 2020-06-23 20:43:02
 * @LastEditors: 李淳
 * @LastEditTime: 2020-06-29 21:07:55
 * @Description: Menu 类型定义
 */
import { MenuProps } from 'antd/lib/menu';

export interface IMenuDataItem {
  key: string;
  icon?: any;
  text?: string;
  auth?: Auth.Code;
  visibilityChild?: Visibility;
  children?: IMenuDataItem[];

  subModule?: string;
  route?: string;
  componentName?: string;
}

export interface ISofaMenuProps extends Omit<MenuProps, 'onClick'> {
  authList: Auth.Code[];
  menuData: IMenuDataItem[];
  path: string;
  collapsed?: boolean;
  routePrefix?: string; // 前缀
  onClick: (pathname: string, data: any) => any;
  lang: string;
  search?: boolean;
}
