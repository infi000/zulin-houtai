/*
 * @Author: 李淳
 * @Date: 2020-06-05 15:02:35
 * @LastEditTime: 2020-07-08 15:08:21
 * @LastEditors: 李淳
 * @Description: Selector 工厂
 */
import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from 'types/injector-typings';

/**
 * 根据fields字段，自动生成Selector
 * @param namespace store的一级分支名称
 * @param initialState 初始值
 * @template T initialState类型
 * @return state的一级selectors；
 */
type AinitialState<T> = {
  [P in keyof T]?: (state: T) => T[P]
}
function autoInitSelectors<T>(namespace: string, initialState: T): AinitialState<T> {
  try {
    const selectorsObj: AinitialState<T> = {};
    const namespaceSelector = (state: IRootState): T => state[namespace];

    const fields = Object.keys(initialState);

    (fields as Array<keyof T>).forEach((field: (keyof T)) => {
      selectorsObj[field] = createSelector(
        namespaceSelector,
        (subState: T) => subState[field],
      );
    });
    return selectorsObj;
  } catch (error) {
    // eslint-disable-next-line
    console.log('Select Error:', error);
    return {};
  }
}

export default autoInitSelectors;
