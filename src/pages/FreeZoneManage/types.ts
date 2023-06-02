export interface IPageState {
  refresh: number;
  loading: boolean;
  searchCondition?: TSearchParams;
  tableData: ITableItem[];
  pagination: IPagination;
  mainModal: IModalData<ITableItem>;
  importModal: TImportModal;
  wareHouseAll: any[];
}

// column全量字段
export interface ITableItem {
  id: number; // 主键
  placeId: number; // 仓库ID
  idleZone: string; // 闲置区位
  idleArea: number; // 闲置面积
  idleEndTime: number; // 闲置结束时间
  sale: number; // 是否可售 0 不可售 1 可售
  applicableGoods: string; // 适用货物
  warehouseDetailAddress: string; // 适用货物
  status: number; // 状态 0待审核、1已审核、2审核不通过、3已下架
  remark: string; // 备注
  idlePicture: string; // 闲置区照片
  createTime: number; // 创建时间
  updateTime: number; // 更新时间
  createUserId: string; // 创建人id
  updateUserId: string; // 更新人id
  createUserName: string; // 创建人名称
  updateUserName: string; // 更新人名称
  [key: string]: any
}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id' | 'remark' | 'createTime' | 'updateTime'>>;

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id' | 'createTime'>;
