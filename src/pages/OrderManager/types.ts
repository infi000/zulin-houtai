/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:26:54
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-06-02 19:35:54
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
  lastId?: any;
}

// column全量字段
export interface ITableItem {
  id: number | string; // 自增id
  orderid: string; // 订单号
  uid: string; // 预约用户id
  uname: string; // 预约用户名称
  title: string; // 订单标题
  desposit: string; // 包含的押金金额
  total: string; // 总金额
  discount: string; // 会员优惠金额
  scorecount: string; // 积分抵扣金额
  totalpay: string; // 需要支付金额
  ostatus: string; // :0已下单未支付， 1已支付未核销，2核销完成，3关闭
  status: string; // 状态，1正常
  ctime: string; // 订单创建时间
  uptime: string; // 更新时间
  starttime: string; // 更新时间
  endtime: string; // 更新时间
}

export interface IOrderDetail {
  id: number; // 订单id
  orderid: string; // 订单号
  uid: string; // 预约用户id
  uname: string; // 预约用户名称
  title: string; // 订单标题
  desposit: string; // 包含的押金金额
  total: string; // 总金额
  discount: string; // 会员优惠金额
  scorecount: string; // 积分抵扣金额
  totalpay: string; // 需要支付金额
  ostatus: string; // :0已下单未支付， 1已支付未核销，2核销完成，3关闭
  status: string; // 状态，1正常
  ctime: string; // 订单创建时间  
  uptime: string; // 更新时间
  prebook: IPrebookItem;

}
export interface IPrebookItem {
  id: string; // 预约id
  uid: string; // 预约创建人

  uname: string; // 预约创建人
  eid: string; // 实验项目id
  etitle: string; // 实验项目名称
  edesposit: string; // 实验押金
  epid: string; // 设备id
  eptitle: string; // 设备名称
  epprice: string; // 设备单价，元/小时
  starttime: string; // 预约开始时间
  endtime: string; // 预约截止时间
  duration: string; // 预约时长，分钟
  ctime: string; // 预约创建时间
  tools: IToolItem[];
}

export interface IToolItem {
  id: string; // 工具id
  title: string; // 工具名称
  thumbinal: string; // 工具缩略图
  des: string; // 工具说明
  price: string; // 工具价格
  tbid: string; // 工具箱id
  tbtitle: string; // 工具箱名称
}


//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id'>> & {
  phone?: string; // 手机号
};

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id'>;
