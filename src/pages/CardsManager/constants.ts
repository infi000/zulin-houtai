/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-12-02 22:41:25
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-18 23:37:58
 * @FilePath: /houtaiv2/src/pages/CardsManager/constants.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// namespace 使用大驼峰，理论上与文件夹命名一致
export const NAMESPACE = 'CardsManager';

export default {
  NAMESPACE,
};

// 1年卡，2季卡，3月卡，4次卡
export const CARD_TYPE_MAP = new Map<any, any>([
  ['1', '年卡'],
  ['2', '季卡'],
  ['3', '月卡'],
  ['4', '次卡'],
  ['5', '积分卡'],
]);

// 天day、周week、月month、年year
export const CARD_DURATION_TYPE_MAP = new Map<any, any>([
  ['minhour', '小时'],
  ['day', '天'],
  ['week', '周'],
  ['month', '月'],
  ['year', '年'],
]);

// ，1周二至周日；2周二至周五
export const USE_DAY_TYPE_MAP = new Map<any, any>([
  ['1', '周二至周日'],
  ['2', '周二至周五'],
]);