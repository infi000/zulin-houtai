/*
 * @Author:any; //  张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:22:52
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-02 22:50:31
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
  id: number; // 自增id
  cardname: any; //  卡片名称
  cardtype: any; // 卡片类型，1年卡，2季卡，3月卡，4次卡
  cardduration: any; // 有效期
  carddurationtype: any; // 有效期类型，天day、周week、月month、年year
  cardcount: any; // 次卡次数（次卡类型有效）
  thumbinal: any; // 卡缩略图文件域（小图）
  cardpic: any; // 卡说明图片,文件域（大图）
  price: any; // 卡价格
  usedaytype: any; // 使用日类型，1周二至周日；2周二至周五
  remark: any; // 卡片说明
}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id'>>;

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id'>;
