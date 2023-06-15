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
  id: number; // id
  ecode: string; // 设备编码
  title: string; // 设备名称
  emodel: string; // 设备型号
  factoryno: string; // 出厂编号
  manufacturer: string; // 生产厂商
  etype: string; // 设备类型
  department: string; // 使用部门名称
  location: string; // 设备位置
  thumbinal: string; // 房间预览图
  des: string; // 说明
  price: number; // 单价，元/小时
  buytime: number; // 购置时间
  buyprice: number; // 购置价格
  remark: string; // 备注
  pics: string; // 设备大图
  eid: string; // 实验项目id
  ctime: number; // 房间创建时间
  status: number; // 状态，1正常，0下线，2报废审核中，3已报废，4维护中，5备用
}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id' |'remark' >>

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id' >
