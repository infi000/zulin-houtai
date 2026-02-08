/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-06 22:49:51
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-08 00:00:21
 * @FilePath: /houtai/src/pages/EquipmentManager/constants.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// namespace 使用大驼峰，理论上与文件夹命名一致
export const NAMESPACE = 'LeaseSettimesManager';
// 1正常，0下线，2报废审核中，3已报废，4维护中，5备用
export const STATUS_MAP = new Map<any, any>([
  ['0', '下线'],
  ['1', '正常'],
  ['2', '报废审核中'],
  ['3', '已报废'],
  ['4', '维护中'],
  ['5', '备用'],
]);

export default {
  NAMESPACE,
};
