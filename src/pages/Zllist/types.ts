/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:26:54
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-08-03 00:32:55
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
  id: string; // "9199",
  title: string; // "租赁产品001",
  sale: string; // "102",
  fpath: string; // "http://
  price: string; // "1.00",
  deposit: string; // "30.00",
  issale: string; // "-1",
  ispicket: string; // "0"
}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id'>> & {
  phone?: string; // 手机号
};

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id'>;
