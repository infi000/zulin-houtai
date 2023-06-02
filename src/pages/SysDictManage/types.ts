export interface IPageState {
  refresh: number;
  loading: boolean;
  searchCondition?: TSearchParams;
  tableData: ITableItem[];
  pagination: IPagination;
  mainModal: IModalData<ITableItem>;
}

// column全量字段
export interface ITableItem {
  dictId: number; // 主键ID
  dictName: string; // 字典名称
  dictType: string; // 字典类型
  status: string; // 状态（1正常 0停用）
  createBy: string; // 创建者
  createTime: number; // 创建时间
  updateBy: string; // 更新者
  updateTime: number; // 修改时间
  remark: string; // 备注
  merchantId: string; // 商户ID
}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id' | 'createBy' | 'createTime' | 'updateBy' | 'updateTime' | 'remark'>>;

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id' | 'createBy' | 'createTime'>;
