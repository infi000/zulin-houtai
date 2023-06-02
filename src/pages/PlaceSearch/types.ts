export interface IPageState {
  refresh: number;
  loading: boolean;
  searchCondition?: ISearchCondition;
  storeData: ITableItem[];
  pagination: IPagination;
}

export interface ISearchCondition {
  minIdleAreaTotal?: string | number;
  minSaleAreaTotal?: string | number;
  saleArea?: string;
  unusedArea?: string;
  moreSearch?: number;
  order?: string;
  key?: string;
  warehouseRegionList?: string | number[];
  warehouseCityList?: string[];
  warehouseStatusList?: string | number[];
  warehouseTypeList?: string | number[];
  buildingFireLevelList?: string | number[];
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
  buildingAttribute: string; // 建筑物属性
  buildingFireLevel: string;// 消防等级
  buildingFireResistanceRating: string; // 耐火等级
  buildingPlatformConfigurations: string; // 月台配置
  idleAreaTotal: string; // 闲置总面积
  minBearing: string; // 最低承重
  operationIsLeasedPlace: number; // 是否租赁场地
  saleAreaTotal: string; // 可售总面积
  warehouseAddress: string; // 仓库地址
  warehouseArea: string; // 仓库面积
  warehouseAttr: string; // 仓库属性
  warehouseBu: string; // 所属BU
  warehouseCode: string; // 仓库编码
  warehouseName: string; // 仓库名称
  warehouseRegion: string; // 大区
  warehouseState: string; // 仓库状态
  warehouseType: string; // 仓库类型
}
