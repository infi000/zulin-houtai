/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:25:14
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-07 22:17:35
 * @FilePath: /houtai/src/pages/ToolboxManager/types.ts
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
  title: string; // 工具箱标题
  thumbinal: string; // 工具箱缩略图
  des: string; // 工具箱说明
  ctime: number; // 工具箱创建时间
  status: number; // 状态，1正常，0关闭
  pics: string; // 大图
  duration: number; // 大图
  eid: string; // 实验项目id

}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id' >>

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id' >
