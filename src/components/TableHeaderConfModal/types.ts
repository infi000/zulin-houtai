/*
 * @Author: your name
 * @Date: 2021-01-28 10:39:55
 * @LastEditTime: 2021-01-28 10:55:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /janus/src/components/TableHeaderConfModal/types.ts
 */
export interface IFieldItem {
  sort_id: number;
  default_sort_id: number;
  field_status: number; // 是否勾选
  system_field: string; // 字段
  column_name: string; // 中文名
}
