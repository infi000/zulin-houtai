/*
 * @Author: your name
 * @Date: 2021-03-19 11:21:08
 * @LastEditTime: 2021-03-19 17:32:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /janus/src/components/CarrierSelect/types.ts
 */

export interface IItem {
  carrier_id: number; // 必须 承运商id
  carrier_name: string; // 必须 承运商名称
  carrier_code: string; // 必须 承运商编码
}
