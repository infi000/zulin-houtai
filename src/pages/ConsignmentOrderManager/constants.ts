/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:26:54
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-18 19:01:23
 * @FilePath: /houtai/src/pages/ToolManager/constants.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// namespace 使用大驼峰，理论上与文件夹命名一致
export const NAMESPACE = 'ConsignmentOrderManager';

// 是否支付，1是，0否
export const IS_PAY_MAP = new Map([['0', '否'], ['1', '是']]);
// 寄卖商品状态，默认0待审核，1审核成功，2审核不通过,退款中，3审核不通过,退款成功，4审核不通过,退款失败，5已售出下线，6用户下线'
export const G_STATUS_MAP = new Map([
  ['0', '待审核'],
  ['1', '审核成功'],
  ['2', '审核不通过,退款中'],
  ['3', '审核不通过,退款成功'],
  ['4', '审核不通过,退款失败'],
  ['5', '已售出下线'],
  ['6', '用户下线'],
]);

//:0已下单未支付， 1已支付未发货，2已发货，3已完成，4已取消
export const O_STATUS_MAP = new Map([
  ['0', '已下单未支付'],
  ['1', '已支付未发货'],
  ['2', '已发货'],
  ['3', '已完成'],
  ['4', '已取消'],
]);

// 寄卖商品销售状态，1上架，0下架
export const SALE_STATUS_MAP = new Map([['0', '下架'], ['1', '上架']]);
export default {
  NAMESPACE,
};
