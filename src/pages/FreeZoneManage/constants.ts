// namespace 使用大驼峰，理论上与文件夹命名一致
export const NAMESPACE = 'FreeZoneManage';

export enum EStatus {
  '待审核' = 0,
  '已审核' = 1,
  '审核不通过' = 2,
  '已下架' = 3,
}
// 状态  0待审核、1已审核、2审核不通过、3已下架
export const STATUS_MAP = new Map([
  [EStatus['待审核'], '待审核'],
  [EStatus['已审核'], '已审核'],
  [EStatus['审核不通过'], '审核不通过'],
  [EStatus['已下架'], '已下架'],
]);

export default {
  NAMESPACE,
};
