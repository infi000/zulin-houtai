/*
 * @Author: 李淳
 * @Date: 2020-06-21 21:27:00
 * @LastEditors: 李淳
 * @LastEditTime: 2020-06-21 21:27:31
 * @Description: file content
 */
import {
  useInjectReducer as useReducer,
  useInjectSaga as useSaga,
} from 'redux-injectors';
import {
  IInjectReducerParams,
  IInjectSagaParams,
  RootStateKeyType,
} from 'types/injector-typings';

/* Wrap redux-injectors with stricter types */

export function useInjectReducer<Key extends RootStateKeyType>(
  params: IInjectReducerParams<Key>,
): void {
  return useReducer(params);
}

export function useInjectSaga(params: IInjectSagaParams): void {
  return useSaga(params);
}
