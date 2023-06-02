/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-05-24 11:08:49
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-05-30 11:55:59
 * @FilePath: /ot-resources/src/pages/EquipmentFreeManage/constants.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { EQUIPMENT_USE_STATUS_MAP } from 'utils/constants';

// namespace 使用大驼峰，理论上与文件夹命名一致
export const NAMESPACE = 'EquipmentFreeManage';

export default {
  NAMESPACE,
};
export const STATUS_MAP = new Map([[0, '未审核'], [1, '审核通过'], [2, '审核不通过']]);
export const USE_STATUS_MAP = EQUIPMENT_USE_STATUS_MAP;
