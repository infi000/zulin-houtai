import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectAllSystemList } from 'store/selectors';

import { ISystemItem } from 'store/types';

const useSystem = () => {
  const allSystemList = useSelector(selectAllSystemList);
  return useCallback((sys_code: string) =>
    allSystemList.find(item => item.sys_code === sys_code) || {} as ISystemItem, [allSystemList]);
};

export default useSystem;
