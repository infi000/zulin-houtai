export interface IPageState {
  refresh: number;
  loading: boolean;
  searchCondition?: TSearchParams;
  tableData: ITableItem[];
  pagination: IPagination;
  mainModal: IModalData<any>;
  importModal: TImportModal;
}

// column全量字段
export interface ITableItem {
  id: number; // 主键ID
  tecIdentifyNo: string; // 技术标识号
  deviceNo: string; // 设备编码
  deviceSpecification: string; // 设备说明
  status: number; // 审核状态  0 未审核 1审核通过 2审核不通过
  rejectReason: number; // 审核不通过原因
  useStatus: number; // 使用状态 1闲置 2激活 3下架
  idleReason: string; // 闲置原因
  dispatchMonth: string; // 调拨年月
  dispatchOutMonth: string; // 调出月份
  inCostCenter: string; // 调人成本中心
  inCostCenterDescription: string; // 调入成本中心描述
  outCostCenter: string; // 调出成本中心
  outCostCenterDescription: string; // 调出成本中心描述
  netValue: number; // 净值
  partDescription: string; // 本部描述
  sectionDescription: string; // 区部描述
  transferContactNo: string; // 调拨联系人工号
  transferContactName: string; // 调拨联系人姓名
  principal: string; // 负责人
  jobTitle: string; // 职位
  specificationsModels: string; // 规格型号
  principalName: string; // 负责人名称
  submitTime: number; // 提交时间
  createTime: number; // 创建时间
  updateTime: number; // 更新时间
  createUserId: string; // 创建人id
  updateUserId: string; // 更新人id
  createUserName: string; // 创建人名称
  updateUserName: string; // 更新人名称
}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id' | 'createTime' | 'updateTime'>>;

// 新建字段
export type TCreateParams = {
  tecIdentifyNo: string; // 技术标识号
  submitMonth: string; // 闲置月份
  idleReason: string; // 闲置原因
};

// 审核接口
export type TReviewParams = {
  ids?: number[];
  status: number;
  query?: TSearchParams;
  rejectReason?: string; // 原因
}

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id' | 'createTime'>;

// deviceDetail interface 
export interface IDeviceDetail {
  id: number;
  tecIdentifyNo: string;
  deviceNo: string; // 设备编码
  deviceSpecification: string; // 设备说明
  status: number; // 审核状态  0 未审核 1审核通过 2审核不通过
  rejectReason: number; // 审核不通过原因
  useStatus: number; // 使用状态 1闲置 2激活 3下架
  idleReason: string; // 闲置原因
  idleMonth: string; // 闲置年月
  idleDays: number; // 闲置天数
  netValue: number; // 净值
  costCenter: string; // 成本中心
  costCenterDescription: string; // 成本中心描述
  partDescription: string; // 本部描述
  sectionDescription: string; // 区部描述
  transferContactNo: string; // 调拨联系人工号
  transferContactName: string; // 调拨联系人姓名
  principal: string; // 负责人
  jobTitle: string; // 职位
  principalName: string; // 负责人名称
  submitTime: string; // 提交时间
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
  createUserId: string; // 创建人id
  updateUserId: string; // 更新人id
  createUserName: string; // 创建人名称
  updateUserName: string; // 更新人名称
  company: string; // 公司
  companyIntroduction: string; // 公司简介
  acquisitionDate: string; // 购置日期
  acquisitionValue: number; // 购置价值
  initialAssetValue: number; // 初始资产价值
  brand: number; // 品牌
  specificationsModels: string; // 规格型号
  structuralType: string; // 构造类型
  structuralTypeDescription: string; // 构造类型描述
  deviceIdleRecordRespList: IDeviceIdleRecordRespList[]; // 闲置记录
  idleDaysSum: number; // 闲置天数总和
  deviceTransferRecordRespList: IDeviceTransferRecordRespList[]; // 调拨记录
}

// 闲置记录
export interface IDeviceIdleRecordRespList {
  id: number;
  tecIdentifyNo: string;
  deviceNo: string; // 设备编码
  deviceSpecification: string; // 设备说明
  status: number; // 审核状态  0 未审核 1审核通过 2审核不通过
  rejectReason: number; // 审核不通过原因
  useStatus: number; // 使用状态 1闲置 2激活 3下架
  idleReason: string; // 闲置原因
  idleMonth: string; // 闲置年月
  idleDays: number; // 闲置天数
  netValue: number; // 净值
  costCenter: string; // 成本中心
  costCenterDescription: string; // 成本中心描述
  partDescription: string; // 本部描述
  sectionDescription: string; // 区部描述
  transferContactNo: string; // 调拨联系人工号
  transferContactName: string; // 调拨联系人姓名
  principal: string; // 负责人
  jobTitle: string; // 职位
  principalName: string; // 负责人名称
  submitTime: string; // 提交时间
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
  createUserId: string; // 创建人id
  updateUserId: string; // 更新人id
  createUserName: string; // 创建人名称
  updateUserName: string; // 更新人名称
}
// 调拨记录
export interface IDeviceTransferRecordRespList {
  id: number;
  tecIdentifyNo: string;
  deviceNo: string; // 设备编码

  deviceSpecification: string; // 设备说明
  specificationsModels: string; // 规格型号
  useStatus: number; // 使用状态 1闲置 2激活 3下架
  dispatchOutMonth: string; // 调出年月
  netValue: number; // 净值
  outCostCenter: string; // 调出成本中心
  outCostCenterDescription: string; // 调出成本中心描述
  inCostCenter: string; // 调入成本中心
  inCostCenterDescription: string; // 调入成本中心描述
  submitTime: string; // 提交时间
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
  createUserId: string; // 创建人id
  updateUserId: string; // 更新人id
  createUserName: string; // 创建人名称
  updateUserName: string; // 更新人名称
}
// deviceDetail interface end
