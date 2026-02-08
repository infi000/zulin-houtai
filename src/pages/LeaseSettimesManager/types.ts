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
  [key: string]: any
}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id' |'remark' >>

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id' >
