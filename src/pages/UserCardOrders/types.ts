/*
 * @Author: Claude
 * @Description: UserCardOrders类型定义
 */
export interface IPageState {
  refresh: number;
  loading: boolean;
  searchCondition?: TSearchParams;
  tableData: ITableItem[];
  pagination: IPagination;
  refundModal: IModalData<ITableItem>;
  wxidModal: {
    visible: boolean;
    wxid?: string;
    loading?: boolean;
  };
  exportLoading?: boolean;
}

// column全量字段
export interface ITableItem {
  id: string; // 订单id
  orderid: string; // 订单号
  uid: string; // 用户id
  uname: string; // 用户名
  phone: string; // 手机号
  total: string; // 总金额
  remark: string; // 备注
  ostatus: string; // 订单状态 0=已下单未支付, 1=已支付未核销, 2=核销完成, 3=关闭, 4=已退款
  cardtype: string; // 卡片类型 1=年卡, 2=季卡 等
  cardname: string; // 卡片名称
  ctime: string; // 创建时间（时间戳）

  [key: string]: any;
}

// 查询参数字段
export type TSearchParams = Partial<Omit<ITableItem, 'id'>>;
