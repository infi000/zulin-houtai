/*
 * @Author: Claude
 * @Description: UserCardOrders常量和状态Map
 */
// namespace 使用大驼峰，理论上与文件夹命名一致
export const NAMESPACE = 'UserCardOrders';

// 订单状态 0=已下单未支付, 1=已支付未核销, 2=核销完成, 3=关闭
export const O_STATUS_MAP = new Map<any, any>([
  ['0', '已下单未支付'],
  ['1', '已支付未核销'],
  ['2', '核销完成'],
  ['3', '关闭'],
]);

// 卡片类型 根据实际API返回数据调整
export const CARD_TYPE_MAP = new Map<any, any>([
  ['1', '年卡'],
  ['2', '季卡'],
  ['3', '月卡'],
  ['4', '其他'],
]);

export default {
  NAMESPACE,
};
