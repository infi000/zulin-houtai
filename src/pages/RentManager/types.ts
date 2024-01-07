/*
 * @Author:any; //  张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:22:52
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-01-07 00:00:00
 * @FilePath: /houtai/src/pages/ExperimentManager/types.ts
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
  offset: string; // 偏移量
  count: string; // 需要的资源数量
  uid: string; // 用户id
  phone: string; // 用户手机号
  gid: string; // 商品id
  title: string; // 商品标题
  oid: string; // 订单id
  orderid: string; // 订单号
  status: string; // 0未付款，1已付款，8已退款
  id: string; // '8734';
  uname: string; // '微信用户';
  pricetotal: string; // '50.00';
  create_time: string; // '2024-01-06 19:51:51';
  num: string; // '1';
  deposit: string; // '0.00';
  fpath: string; // 'http://127.0.0.1/lifestyleshop/Uploads/Picture/2024-01-06/6599379b6108f.jpg';
  verify_time: string; // '';
}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id'>>;

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id'>;
