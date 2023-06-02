export interface IPageState {
  refresh: number;
  loading: boolean;
  storeInfo: ITableItem | undefined;
  unusedInfo: ITableItem[] | undefined;
  rewardInfo: IRewardInfo[] | undefined;
}

export interface ICustomerData {
  id?: string | number;
  customerName?: string;
  customerCode?: string;
  customerMainId?: string;
  customerMainName?: string;
  customerMainPhone?: string;
  monthCardNo?: string | string[];
  status?: string | number | boolean;
  remark?: string;
}

export interface ITableItem {
  id?: string | number;
  address?: string;
  storeName?: string;
  storeCode?: string;
  href?: string;
  customerMainPhone?: string;
  monthCardNo?: string | string[];
  status?: string | number | boolean;
  type?: string;
  monthCardNoList?: string[];
  initStatus?: number;
  [key: string]: any;
}
// 奖励信息
export interface IRewardInfo {
  id: number; // 主键id
  title: string; // 标题
  rewardsType: number; // 适用范围类型 1大区 2城市 3仓库
  rewardsValue: string; // 适用范围类型值
  rewardsPersonnel: string; // 奖励对象
  rewardsCycle: string; // 奖励周期
  status: number; // 状态 0 生效 1 失效
  rewardsPeriod: number; // 有效期
  remark: string; // 备注
  textPart: string; // 正文
  createTime: number; // 创建时间
  updateTime: number; // 更新时间
  createUserId: string; // 创建人id
  updateUserId: string; // 更新人id
  createUserName: string; // 创建人名称
  updateUserName: string; // 更新人名称
}

export interface IParamsId {
  id?: string | number;
}

export interface IParamsPlaceId {
  placeId?: string | number;
}

export enum EYesOrNO {
  '否' = 0,
  '是' = 1,
}

export enum EIsLeasedPlace {
  '不租赁' = 0,
  '租赁' = 1,
}

export enum EIsSale {
  '不可售' = 0,
  '可售' = 1,
}
