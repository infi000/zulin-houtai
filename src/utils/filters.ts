/*
 * @Author: 李淳
 * @Date: 2020-07-08 14:53:01
 * @LastEditors: 董方旭
 * @LastEditTime: 2021-03-16 20:05:37
 * @Description: file content
 */

/**
 * 过滤掉Object中的值为falsy的key
 * false、空字符串、null、undefined、等等均会被过滤
 * @param params Object
 */
export function falsyParamsFilter<T extends Record<string, any>>(params: T) {
  if (params) {
    const newParams = {} as T;
    // false、空字符串、null、undefined、等等均会被过滤
    Object.keys(params).filter(key => !!params[key] || params[key] === 0).forEach((key: keyof T) => {
      newParams[key] = params[key];
    });
    return newParams;
  }
  return params;
}

/**
 * 把Object中的值为null、undefined替换成空字符串
 * @param params Object
 */
export function falsyParamsReplace<T extends Record<string, any>>(params: T) {
  if (params) {
    let newParams = {} as any;
    if (Array.isArray(params)) {
      newParams = [];
    }
    // null、undefined 会被过滤成空字符串
    Object.keys(params).forEach((key: keyof T) => {
      if (params[key] === null || params[key] === undefined) {
        newParams[key] = '';
      } else if (typeof params[key] === 'object') {
        newParams[key] = falsyParamsReplace(params[key]);
      } else {
        newParams[key] = params[key];
      }
    });
    return newParams;
  }
  return params;
}
