import React from 'react';

const { useRef, useEffect } = React;
/**
 * @description: 用于检测组件是否是第一次挂载 第一次挂载将会直接返回 其余用法和useEffect无异
 * @param {*} effect Imperative function that can return a cleanup function
 * @param {*} deps If present, effect will only activate if the values in the list change.
 * @return {*}
 */
export default function useEffectMounted(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
): void {
  const isMounted = useRef(0);
  useEffect(() => {
    // 判断是否为首次进入
    if (isMounted.current === 0) {
      isMounted.current += 1;
      return;
    }
    effect();
  }, deps);
}
