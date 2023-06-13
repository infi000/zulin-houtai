/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:22:52
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-07 22:08:59
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
  title: string; // 实验项目标题
  thumbinal: string; // 缩略图
  des: string; // 项目描述
  deposit: number; // 押金价格
  ctime: number; // 项目创建时间
  status: number; // 实验项目状态，1正常，0关闭
  pics: string; // 设备大图
}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id' >>

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id' >
