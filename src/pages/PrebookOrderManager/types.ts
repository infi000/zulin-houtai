/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:30:40
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-04 22:24:28
 * @FilePath: /houtai/src/pages/PrebookOrderManager/types.ts
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
  orderid: string; // 订单号
  uid: number; // 预约用户id
  bid: number; // 预约id
  title: string; // 订单标题
  deposit: number; // 包含的押金金额
  total: number; // 总金额
  discount: number; // 会员优惠金额
  scorecount: number; // 积分抵扣金额
  totalpay: number; // 需要支付金额
  payuid: number; // 付款用户id
  poid: number; // 父订单id（续订）
  ostatus: number; // 0已下单未支付，1已支付未核销，2完成，3关闭
  ctime: number; // 订单创建时间
  uptime: number; // 更新时间
  status: number; // 状态，1正常
}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id' >>

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id' >
