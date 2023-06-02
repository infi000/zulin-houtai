import selectorsFactory from 'utils/selectorsFactory';

import { NAMESPACE } from './constants';
import { initialState } from './slice';
import { IPageState } from './types';

// 自动生成一级数据的selector，使用selectors.name调用，如需要更进一步的计算再自行添加selector
const selectors = selectorsFactory<IPageState>(NAMESPACE, initialState);

export default selectors;
