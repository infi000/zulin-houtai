/*
 * @Author: 董方旭
 * @Date: 2021-02-26 11:58:19
 * @LastEditors: 董方旭
 * @LastEditTime: 2021-02-26 12:00:58
 * @Description: 节流hooks
 */
import React from 'react';

const { useRef, useCallback, useEffect } = React;

export default function useThrottle(fn: any, delay = 500, dep: any[] = []) {
  const { current } = useRef({ fn, timer: null });

  useEffect(() => {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn.call(this, ...args);
    }
  }, dep);
}
