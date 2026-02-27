/*
 * @Author: Claude
 * @Description: UserCardOrders Redux选择器
 */
import selectorsFactory from 'utils/selectorsFactory';
import { NAMESPACE } from './constants';
import { initialState } from './slice';
import { IPageState } from './types';

// 自动生成一级数据的selector，使用selectors.name调用
const selectors = selectorsFactory<IPageState>(NAMESPACE, initialState);

export default selectors;
