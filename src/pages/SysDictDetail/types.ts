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
  dictCode: number; // 字典编码
  dictSort: number; // 字典排序
  dictLabel: string; // 字典标签
  dictValue: string; // 字典键值
  dictType: string; // 字典类型
  cssClass: string; // 样式属性（其他样式扩展）
  listClass: string; // 表格回显样式
  isDefault: string; // 是否默认（Y是 N否）
  status: string; // 状态（1正常 0停用）
  createBy: string; // 创建者
  createTime: number; // 创建时间
  updateBy: string; // 更新者
  updateTime: number; // 更新时间
  remark: string; // 备注
  extendedField: string; // 扩展字段
}

//  查询项字段
export type TSearchParams = Partial<
  Omit<ITableItem, 'idictCoded' | 'createBy' | 'createTime' | 'updateBy' | 'updateTime' | 'remark'>
>;

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Partial<Omit<ITableItem, 'dictCode' | 'createBy' | 'createTime'>>;
