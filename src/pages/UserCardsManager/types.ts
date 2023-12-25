/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:26:54
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-22 23:14:28
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
  id: string; //  '54';
  uid: string; //  '10234';
  phone: string; //  '13809777774';
  cardid: string; //  '0';
  orderid: string; //  '';
  cardtype: string; //  '4';
  cardstarttime: string; //  '1669392000';
  cardexpired: string; //  '1709049600';
  codeurl: string; //  'http: string; // //127.0.0.1/beyondplayshop/Uploads/CardCode/54.png';
  leftcount: string; //  '25';
  totalcount: string; //  '30';
  totalprice: string; //  '0.00';
  price: string; //  '0.00';
  usedaytype: string; //  '1';
  cardfrom: string; //  '1';
  remark: string; //  '11月份大促，送5次';
  ctime: string; //  '1703235493';
  status: string; //  '1';

  [key: string]: any;
}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id'>>;

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id'>;
