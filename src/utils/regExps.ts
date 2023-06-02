/*
 * @Author: 李淳
 * @Date: 2020-06-24 17:40:13
 * @LastEditors: 李淳
 * @LastEditTime: 2020-07-15 15:12:47
 * @Description: file content
 */
import { FETCH_REJECTED_SUFFIX, FETCH_FULFILLED_SUFFIX, FETCH_PENDING_SUFFIX } from 'utils/constants';

export const getPostStartReg = (namespace: string): RegExp => new RegExp(`${namespace}/post.*(${FETCH_PENDING_SUFFIX})$`);

// 获取某个slice下面的所有Fetch Action，多用于统一处理loading等情况；
export const getFetchStartReg = (namespace: string): RegExp => new RegExp(`${namespace}/.*(${FETCH_PENDING_SUFFIX})$`);

export const getFetchEndReg = (namespace: string): RegExp => new RegExp(`${namespace}/.*((${FETCH_REJECTED_SUFFIX})|(${FETCH_FULFILLED_SUFFIX}))$`);
