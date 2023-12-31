/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:26:54
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-08-10 23:38:13
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
  id: string; //  '174';
  orderid: string; //  '8072058065293825598';
  uid: string; //  '9184';
  nickname: string; //  '微信用户';
  phone: string; //  '';
  mtype: string; //  '1';
  vstatus: string; //  '1'; // 0默认待审核；1审核通过；2审核不通过
  title: string; //  '实验项目 修改测试1';
  ostatus: string; //  '1'; // 0已下单未支付， 1已支付未核销，2核销完成，3关闭，4已退款，5退款失败
  uphone: string; //  '18643525246';
  starttime: string; //  '2023-08-08 11:00:00';
  endtime: string; //  '2023-08-08 12:00:00';
  createtime: string; //  '2023-08-07 23:03:00';
}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id'>>;

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id'>;
