/*
 * @Author: 李淳
 * @Date: 2020-06-08 10:40:43
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-07-05 00:26:28
 * @Description: file content
 */
// 基本类型
declare type Dictionary<T> = {
  [key: string]: T;
};

// 可见性
declare type Visibility = 'hidden' | 'show';

// 功能权限控制相关
declare namespace Auth {
  export type Code = number;
}

// Redux 状态控制相关
declare namespace IRedux {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Store {
    [key: string]: any;
  }

  // redux action
  type Action = {
    type: string;
    payload?: any;
    // loading 状态触发的Action
    loadingAction?: (loading: boolean) => Action;
    // 重复触发节流控制
    throttle?: number;
    // 异步Action调用的服务端服务
    service?: any;
    // 异步Action调用参数
    params?: any;
    // 异步Action调用成功后的Action
    success?: Action | ActionCreator | any;
  };
  // redux action creator
  type ActionCreator = (params?: any, callback?: any) => Action;
}
declare type TAdditionalParams = string | number | IPagination;
// 后端返回数据
declare interface IResponseData<T> {
  errno: number;
  errmsg: string;
  data: T;
  result: T;
  st?: number;
  logid?: string;
}

// 列表类数据
declare interface IListResponse<T> {
  list: T[];
  total?: number;
  pageNum?: number;
  pageSize?: number;
}
declare interface IDataResponse<T> {
  data: T[];
  total?: number;
}

declare interface IPagination {
  pageNum: number;
  total?: number;
  pageSize?: number;
  showTotal?: boolean;
  onChange?: (page: number) => void;
}

// 用户操作类型
declare type OperateType = 'create' | 'edit' | 'view' | 'review' | 'status' | '核销' | '续订' | '继续支付' | '设置年会员' | '设置背景';

declare interface IModalData<T> {
  visible: boolean;
  type?: OperateType;
  // 将弹窗渲染数据放置于data中，一般讲是提交到后端的数据
  data?: T;
  [key: string]: any;
}

declare type TImportModal = IModalData<{
  filesUrl: string; // 导入模板地址
  moduleId: string; // 导入模块Id
  templateId: string; // 导入模板Id
  title?:string; // 导入弹窗名称
}>

// 状态类型
declare enum IsEffect {
  on = '1',
  off = '2',
}

// i8n msg
declare type TMsg = {
  id: string;
  description?: string;
  defaultMessage?: string;
};

declare interface IOrderListConf<T, K> {
  field_list: T[];
  exception_conf_list: K[];
}
declare enum Status {
  valid = 1,
  invalid = 2,
}

declare interface IConfListParams {
  attribute1?: string;
  attribute2?: string;
  configuration_status?: Status;
  custom_value?: string;
  data_code?: string;
  remark?: string;
  sequence?: number;
  system_field?: string;
}

declare module 'ztree'
