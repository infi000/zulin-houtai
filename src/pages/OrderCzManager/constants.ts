/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:26:54
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-15 00:03:50
 * @FilePath: /houtai/src/pages/ToolManager/constants.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// namespace 使用大驼峰，理论上与文件夹命名一致
export const NAMESPACE = 'OrderCzManager';

export default {
  NAMESPACE,
};


// 0已下单未支付， 1已支付未核销，2核销完成，3关闭
export const O_STATUS_MAP = new Map<any, any>([
 ['0', '已下单未支付'],
  ['1', '已支付未核销'],
  ['2', '核销完成'],
  ['3', '关闭'],
]);


export const O_TYPE_MAP = new Map<any, any>([
  ['1', '会员购买'],
  ['2', '充值'],
]);
