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
  warehousePlaceCode: string; // 场地编码
  warehouseCode: string; // 仓库编码
  warehouseName: string; // 仓库名称
  warehouseSiteCode: string; // 网点编码
  warehouseSiteName: string; // 网点名称
  warehouseType: string; // 仓库类型
  warehouseAttribute: string; // 仓库属性
  warehouseRegion: string; // 大区
  warehouseBusinessArea: string; // 业务区
  warehouseRegionalCenter: string; // 区域中心
  warehouseBu: string; // 所属BU
  warehouseProvince: string; // 省份
  warehouseCity: string; // 城市
  warehouseCounty: string; // 区县
  warehouseDetailAddress: string; // 详细地址
  operationType: string; // 经营类型
  operationIsLeasedPlace: number; // 是否租赁场地 0 不租赁 1 租赁
  operationIsInnerStaff: number; // 是否内部员工0 否 1 是
  operationClassificationIndustry: string; // 行业分类
  operationDayAvgOrderQuantity: number; // 日均订单量
  operationPeakOrderQuantity: number; // 峰值订单量
  operationExpansionAbility: number; // 扩充能力(平方米)
  zoneFinanceType: string; // 融通方式
  zoneFinancePlaceCode: string; // 融通场地代码
  zoneFinanceTransit: string; // 融通中转场
  zoneTransitFunction: string; // 中转场功能
  zoneTransitCode: string; // 发运中转场代码
  zoneSameTransit: number; // 与中转场同场 0 否 1 是
  zoneTransitDistance: number; // 最近中转场导航距离(KM)
  zoneLargeWarehouseSame: number; // 与大件仓同场 0 否 1 是
  buildingAttribute: string; // 建筑物属性
  buildingType: string; // 建筑类型
  buildingStructure: number; // 建筑结构
  buildingStorey: number; // 建筑层数
  buildingCurrentFloor: number; // 所在楼层
  buildingFirstFloorHeight: number; // 首层层高
  buildingLowLoadBearing: number; // 最低承重(t/平方米)
  buildingFreightElevatorQuantity: number; // 货梯数量
  buildingDownstairClearance: string; // 楼下净空
  buildingPlatformConfigurations: string; // 月台配置
  buildingLiftPlatformQuantity: number; // 升降平台数量
  buildingBackCarSpace: number; // 回车空间(米)
  buildingAvailablePower: number; // 可供电量(KW/KVA)
  buildingFloorTexture: string; // 地面材质
  buildingFireLevel: string; // 消防等级
  buildingFireResistanceRating: string; // 耐火等级
  contactStartDate: number; // 合同开始日期
  contactEndDate: number; // 合同终止日期
  contactRentalStartDate: number; // 计租起始日期
  contactLessor: string; // 出租方
  areaWarehouseArea: number; // 仓库面积(平方米)
  areaContractArea: number; // 合同面积(平方米)
  areaBuildingArea: number; // 建筑面积(平方米)
  areaSharedArea: number; // 公摊面积(平方米)
  areaSharedRate: number; // 公摊率
  assistBuildingResponsibility: string; // 建筑责任主体
  assistCustomerRepresentative: string; // 客户代表
  assistWarehouseContract: string; // 仓库联系人
  assistContractPhone: string; // 联系电话
  assistUpDownTransit: number; // 是否上仓下中转场 0 否 1 是
  assistRemark: string; // 备注
  assistParkPicture: string; // 园区照片
  assistWarehousePicture: string; // 仓库照片
  createTime: number; // 创建时间
  updateTime: number; // 更新时间
  createUserId: string; // 创建人id
  updateUserId: string; // 更新人id
  createUserName: string; // 创建人名称
  updateUserName: string; // 更新人名称
  status: number; // 状态 0 生效 1失效
  warehouseLinks: any; // 标签
}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id' | 'createTime' | 'updateTime'>>;

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 新建字段,提交数据格式化之前
export type TBeforeCreateParams = Omit<TCreateParams, 'warehouseProvince' | 'warehouseCity' | 'warehouseCounty'> & {warehouseSSQ: [string, string, string]};

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id' | 'createTime'>;
