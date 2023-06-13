/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:20:06
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-04 22:23:40
 * @FilePath: /houtai/src/pages/HouseManager/types.ts
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
  title: string; // 房间标题
  thumbinal: string; // 房间预览图
  des: string; // 房间说明
  price: number; // 房间单价，元/小时
  ctime: number; // 房间创建时间
  status: number; // 状态，1正常，0下线
}

//  查询项字段
export type TSearchParams = Partial<Omit<ITableItem, 'id'>>

// 新建字段
export type TCreateParams = Omit<ITableItem, ''>

// 编辑字段
export type TModifyParams = Omit<ITableItem, 'id' >
