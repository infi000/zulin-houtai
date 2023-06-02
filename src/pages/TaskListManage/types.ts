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
  callbackUrl: string; //	回调url	string
  cosId: string; //	cosId	integer(int64)
  extendParam: string; //	扩展参数	object
  extendSelectOptions: string; //	扩展可选项	object
  id: string; // integer(int64)
  inputUrl: string; //	任务输入文件	string
  outputUrl: string; //	任务输出文件	string
  remark: string; //	备注	string
  status: string; //	状态（0暂存 1启用）	integer(int32)
  taskEndTime: string; //	任务结束时间	integer(int32)
  taskName: string; //	任务名称	string
  taskResult: string; //	任务结果	string
  taskResultStatus: string; //	任务结果状态	integer(int32)
  taskStartTime: string; //	任务开始时间	integer(int32)
  taskTemplateId: string; //	任务模板id	integer(int64)
  taskType: string; //	任务类型	integer(int32)
  treatStatus: string; //	处理状态
}

//  查询项字段
export type TSearchParams = any;

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id' | 'createTime'>;
