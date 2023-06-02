export interface IPageState {
  refresh: number;
  loading: boolean;
  searchCondition?: TSearchParams;
  tableData: ITableItem[];
  pagination: IPagination;
  mainModal: IModalData<ITableItem>;
  importModal: TImportModal;
}

// column全量字段
export interface ITableItem {
  id: number; // 主键ID
  tecIdentifyNo: string; // 技术标识号
  deviceNo: string; // 设备编码
  partDescription: string; // 本部描述
  sectionDescription: string; // 区部描述
  transferContactNo: string; // 调拨联系人工号
  transferContactName: string; // 调拨联系人姓名
  planningStaffGroup: string; // 计划人员组
  assetNo: string; // 资产编码
  deviceStatus: string; // 设备状态
  systemStatus: string; // 系统状态
  deviceSpecification: string; // 设备说明
  deviceSource: string; // 设备来源
  deviceType: string; // 设备类型
  assetCategory: string; // 资产大类
  assetMiddleCategory: string; // 资产中类
  assetSubcategory: string; // 资产小类
  assetSubcategoryDescription: string; // 资产小类描述
  brand: string; // 品牌
  specificationsModels: string; // 规格型号
  serialNumber: string; // 系列号
  plateNumber: string; // 车牌号
  assetGroupName: string; // 资产组名称
  useType: string; // 使用类型
  principal: string; // 负责人
  jobTitle: string; // 职位
  principalName: string; // 负责人名称
  acquisitionValue: number; // 购置价值(元)
  netValue: number; // 净值(元)
  initialAssetValue: number; // 资产原值(元)
  company: string; // 公司
  companyIntroduction: string; // 公司描述
  functionPosition: string; // 功能位置
  functionPositionDescription: string; // 功能位置描述
  costCenter: string; // 成本中心
  costCenterDescription: string; // 成本中心描述
  costCenterAddress: string; // 成本中心地址
  supplier: string; // 供应商
  supplierDescription: string; // 供应商描述
  maintenanceStartDate: number; // 维保开始日期
  location: string; // 位置
  maintenanceEndDate: number; // 维保结束日期
  remark: string; // 备注
  retirementDate: number; // 报废日期
  retirementType: string; // 报废类型
  acquisitionDate: number; // 购置日期
  startDate: number; // 开始日期
  lessor: string; // 出租方
  outgoingReceiver: string; // 外投接收方
  outgoingDate: number; // 外投日期
  rent: number; // 租金
  deviceUser: string; // 使用人
  outgoingDeadlineDate: number; // 外投截止日期
  exerciseDate: number; // 行权日期
  idleCause: string; // 闲置原因
  deliveryMode: string; // 投放方式
  customerName: string; // 客户名称
  customerCode: string; // 客户代码
  purchaseOrder: string; // 采购订单
  receiptCertificate: string; // 收货凭证
  structuralType: string; // 构造类型
  structuralTypeDescription: string; // 构造类型描述
  handlingWay: string; // 处置方式
  handlingDate: number; // 处置日期
  handlingIncome: number; // 处置收入金额
  handlingExpenditure: number; // 处置支出金额
  acquiringCompany: string; // 收购公司或接收方
  oaFlowNo: string; // OA处置流程编号
  projectCode: string; // 项目代码
  projectName: string; // 项目名称
  storePlace: string; // 在库存放地点
  expectedYears: number; // 预计年限
  useStatus: string; // 使用状态
  createTime: number; // 创建时间
  updateTime: number; // 更新时间
  createUserId: string; // 创建人id
  updateUserId: string; // 更新人id
  createUserName: string; // 创建人名称
  updateUserName: string; // 更新人名称
}

//  查询项字段
export type TSearchParams = Partial<
  Omit<
    ITableItem,
    | 'deviceNo'
    | 'partDescription'
    | 'planningStaffGroup'
    | 'assetNo'
    | 'systemStatus'
    | 'deviceSource'
    | 'assetSubcategoryDescription'
    | 'brand'
    | 'serialNumber'
    | 'plateNumber'
    | 'assetGroupName'
    | 'useType'
    | 'principal'
    | 'jobTitle'
    | 'principalName'
    | 'acquisitionValue'
    | 'netValue'
    | 'initialAssetValue'
    | 'companyIntroduction'
    | 'functionPosition'
    | 'functionPositionDescription'
    | 'costCenterDescription'
    | 'supplier'
    | 'supplierDescription'
    | 'maintenanceStartDate'
    | 'location'
    | 'maintenanceEndDate'
    | 'remark'
    | 'retirementDate'
    | 'retirementType'
    | 'startDate'
    | 'lessor'
    | 'outgoingReceiver'
    | 'outgoingDate'
    | 'rent'
    | 'deviceUser'
    | 'outgoingDeadlineDate'
    | 'exerciseDate'
    | 'idleCause'
    | 'deliveryMode'
    | 'customerName'
    | 'customerCode'
    | 'purchaseOrder'
    | 'receiptCertificate'
    | 'structuralType'
    | 'structuralTypeDescription'
    | 'handlingWay'
    | 'handlingDate'
    | 'handlingIncome'
    | 'handlingExpenditure'
    | 'acquiringCompany'
    | 'oaFlowNo'
    | 'projectCode'
    | 'projectName'
    | 'storePlace'
    | 'expectedYears'
    | 'createTime'
    | 'updateTime'
  > &{
    deviceStatusQuery: string; // 设备状态查询专用字段,逗号分割
  }
>;

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id' | 'createTime'>;
