/*
 * @Author: 董方旭
 * @Date: 2021-02-06 11:58:19
 * @LastEditors: liqingqing
 * @LastEditTime: 2021-09-02 17:33:53
 * @Description: 防抖hooks
 */
import React from 'react';
import debounce from 'lodash/debounce';

const { useRef, useCallback, useEffect } = React;

// useDebounceAfter 操作后置
const useDebounce = (fn: any, delay?: number, dep: any[] = []) => {
  const { current } = useRef({ fn, timer: null });
  useEffect(() => {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, dep);
};

// 操作前置
export const useDebounceBefore = (fn: any, delay?: number) => {
  // const time = delay || 2000;
  const time = delay || 0;
  return debounce(fn, time, { leading: true, trailing: false });
};

export default useDebounce;
