/*
 * @Author: 李淳
 * @Date: 2020-06-22 19:33:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-20 13:37:55
 * @Description: global store类型定义
 */

import { EDictMap } from "utils/constants";

export interface ILayout {
  collapsed: boolean;
}

export interface IUserInfo {
  sfucode?: string;
}

export interface IPrivilege {
  privilege_id: string;
  name: string;
}

export interface ICity {
  city_id?: string;
  city_name?: string;
}

export interface IUserData {
  userInfo: IUserInfo;
  // 功能权限
  functionAuth: number[];
  // 数据权限树
  // dataAuth: {
  //   brand_tree: {[key: string]: any};
  //   supplier_tree: {[key: string]: any};
  // };
  // 功能权限组
  // roleList: any[];
  // privilegeList: IPrivilege[];
  // customerList: any[];
  // authCityList: ICity[];
}

export interface IConfigMapItem {
  code_value: string | number;
  name_value: string;
}

export interface ISystemItem {
  id: number;
  sys_code: string;
  sys_name: string;
  sys_type: 1 | 2;
  access_type: 1 | 2;
  sub_sys?: {
    id: number;
    sys_code: string;
    sys_name: string;
  }[];
}

export interface IStore {
  init: boolean;
  loading: boolean;
  loadingMap: Record<string, boolean>;
  error: Error;
  // customerId: string;
  userData: IUserData;
  layout: ILayout;
  crumbsMap: Record<string, string>;
  // 1表示不隐藏敏感信息，0表示隐藏
  desensitizeFlag: string;
  desensitizeFlagMap: { [key: string]: '0' | '1' };
  cachingKeys: string[];
  activeCacheKey: string;
  allConfigMap: Record<string, IConfigMapItem[]>;
  allSystemList: ISystemItem[];
  authSystemList: ISystemItem[];
  allDictMap: Partial<Record<EDictMap, Array<{dictLabel:string; dictValue:string; status:'1' | '0'; remark: string}>>>;
}
