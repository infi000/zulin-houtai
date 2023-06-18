/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:26:54
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-18 18:48:33
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

// column全量字
export interface ITableItem {
  id: string ; // 自增id
  orderid: string; // 订单id
  uid: string; // 用户id
  uname: string; // 用户名
  gbid: string; // 寄卖商品id
  jgtitle: string; // 寄卖商品名称
  total: string; // 订单总价
  discount: string; // 订单折扣
  scorecount: string; // 订单积分抵扣
  totalpay: string; // 订单实付
  ostatus: string; // 订单状态，0待支付，1已支付，2已发货，3已完成，4已取消，5已退款
  ctime: string; // 订单创建时间

}

export interface IDetail extends ITableItem {

  uphone: string; // 用户手机号
  ownuid: string; // 寄卖商品所属用户id
  ownuname: string; // 寄卖商品所属用户名
  ownuphone: string; // 寄卖商品所属用户手机号
  remark: string; // 订单备注
}
//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id'>>;

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id'>;
