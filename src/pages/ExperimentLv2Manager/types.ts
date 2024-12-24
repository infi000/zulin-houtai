/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:22:52
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-07-04 21:38:49
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
  eid: any;
}

// column全量字段
export interface ITableItem {
  id: number; // 自增id
  eid: number;
  title: string; // 实验项目标题
  des: string; // 项目描述
  phones: any; // 项目描述
  price: any; // 项目描述
  remark: any; // 项目创建时间
  thumbinal: any; // 项目创建时间
  ctype: any; //
}

//  查询项字段
export type TSearchParams = any

// 新建字段
export type TCreateParams = any

// 编辑字段
export type TModifyParams = any
