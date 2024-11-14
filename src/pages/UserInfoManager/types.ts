/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:26:54
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-08-01 17:28:20
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
  YeModalInfo: IModalData<any>;
  EditModalInfo: IModalData<any>;
  importModal: TImportModal;
}

// column全量字段
export interface ITableItem {
  id: string; // "9199",
  nickname: string; // "厚瑜",
  wxnickname: string; // "微信用户",
  wxavatarurl: string; // "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
  mobile: string; // "13302386825",
  birthday: string; // "1987-10-02",
  mtype: string; // "1",
  levelscore: string; // "0",
  face: string; // "http://127.0.0.1/msshop/Uploads/Picture/2023-07-23/64bcb2b7489b8.jpg",
  zipaiphoto: string; // "http://127.0.0.1/msshop/Uploads/Picture/2023-07-23/64bcb2c95573d.jpg"
  [key: string]: any;
}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id'>>;

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id'>;
