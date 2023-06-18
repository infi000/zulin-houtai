/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:26:54
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-18 17:59:41
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
  title: string; // 寄卖名称
  thumbinal: string; // 寄卖商品预览图
  des: string; // 寄卖商品描述
  price: string; // 寄卖商品价格
  ispay: string; // 是否支付，1是，0否
  gstatus: string; // 寄卖商品状态，默认0待审核，1审核成功，2审核不通过,退款中，3审核不通过,退款成功，4审核不通过,退款失败，5已售出下线，6用户下线
  salestatus: string; // 寄卖商品销售状态，1上架，0下架
  gcid: string; // 寄卖商品所属分类id
  ctime: string; // 寄卖商品创建时间 
  vtime: string; // 寄卖商品上架时间
}
  
//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id'>>;

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id'>;
