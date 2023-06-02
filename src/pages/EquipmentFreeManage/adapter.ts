/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-05-24 11:08:49
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-05-30 19:07:26
 * @FilePath: /ot-resources/src/pages/EquipmentFreeManage/adapter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ITableItem, TCreateParams } from './types';

export const formatPostParams = (params: TCreateParams) => {
  const {
    submitMonth, // 闲置月份
    ...rest
  } = params;

  let f_submitMonth;
  if (submitMonth) {
    f_submitMonth = (submitMonth as any).format('YYYY-MM'); // 闲置年月
  }

  return {
    ...rest,
    submitMonth: f_submitMonth, // 闲置年月
  };
};

export const formatSearchParams = (params: any) => {
  const {
    idleMonth, // 闲置年月
    submitTime, // 提交时间
    createTime, // 创建时间
    updateTime, // 更新时间
    ...rest
  } = params;

  let f_idleEndTime;
  let f_idleStartTime;
  if (idleMonth) {
    f_idleEndTime = ([...idleMonth][1] as any).format('YYYY-MM'); // 购置日期
    f_idleStartTime = ([...idleMonth][0] as any).format('YYYY-MM'); // 购置日期
  }
  let f_submitEndTime;
  let f_submitStartTime;
  if (submitTime) {
    f_submitEndTime = ([...submitTime][1] as any).format('YYYY-MM-DD'); // 提交时间
    f_submitStartTime = ([...submitTime][0] as any).format('YYYY-MM-DD'); // 提交时间
  }
  return {
    ...rest,
    idleEndTime: f_idleEndTime, // 购置日期
    idleStartTime: f_idleStartTime, // 购置日期
    submitEndTime: f_submitEndTime, // 提交时间
    submitStartTime: f_submitStartTime, // 提交时间
  };
};

export const formatImportParams = (params: any) => {
  console.log(params);
  const {
    importExtendDTO,
    ...rest
  } = params;
  const { submitMonth } = importExtendDTO;
  let f_submitMonth;
  if (submitMonth) {
    f_submitMonth = (submitMonth as any).format('YYYY-MM'); // 闲置年月
  }
  return {
    ...rest,
    submitMonth: f_submitMonth, // 闲置年月
  };
};
