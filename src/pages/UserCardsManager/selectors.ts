import selectorsFactory from 'utils/selectorsFactory';
import { createSelector } from '@reduxjs/toolkit';

import { NAMESPACE } from './constants';
import { initialState } from './slice';
import { IPageState } from './types';

// 自动生成一级数据的selector，使用selectors.name调用，如需要更进一步的计算再自行添加selector
const selectors = selectorsFactory<IPageState>(NAMESPACE, initialState);

// 例如，需要单独Select modal的data，或者更进一步的计算某些数据
export const selectModalData = createSelector(
  selectors.mainModal,
  mainModal => mainModal.data,
);

export default selectors;
