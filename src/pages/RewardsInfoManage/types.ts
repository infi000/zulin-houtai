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

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id' | 'remark' | 'createTime' | 'updateTime'>>;

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id' | 'createTime'>;
