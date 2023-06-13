/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:26:54
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-07 22:33:21
 * @FilePath: /houtai/src/pages/ToolManager/types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
  id: number; // 自增id
  companyid: string; // 总公司id
  title: string; // 工具名称
  thumbinal: string; // 预览图
  des: string; // 工具使用说明
  price: number; // 工具租赁价格，单位元
  tbid: number; // 所属工具箱id
  ctime: number; // 工具创建时间
  status: number; // 工具状态，1正常，0关闭，2报废
  tcode: string; // 设备编码
  tmodel: string; // 设备型号
  factoryno: string; // 出厂编号
  manufacturer: string; // 生产厂商
  ttype: string; // 设备类型
  department: string; // 使用部门名称
  location: string; // 设备位置
  buytime: string; // 购置时间
  buyprice: string; // 购置价格
  remark: string; // 备注
  pics: string; // 工具大图，文件域
}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id'>>;

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id'>;
