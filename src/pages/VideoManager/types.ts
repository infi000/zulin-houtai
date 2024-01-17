/*
 * @Author:any; //  张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:22:52
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-01-15 23:32:33
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
  'id': string; // '1',
  'cid': string; // '1',
  'eid': string; // '12',
  'title': string; // '测试视频标题',
  'thumbinal': string; // 'http://127.0.0.1/lifestyleshop/Uploads/Lease/2024-01-14/65a3844b3cfad.jpg',
  'des': string; // '视频描述信息文本视频描述信息文本视频描述信息文本视频描述信息文本',
  'etitle': string; // '生命发现',
  'ctitle': string; // '水生生态缸制作',
  'sort': string; // '0',
  'ctime': string; // '1705215051'

}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id'>>;

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>;

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id'>;
