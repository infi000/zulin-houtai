/*
 * @Author: 李淳
 * @Date: 2020-06-21 21:09:03
 * @LastEditors: 李淳
 * @LastEditTime: 2020-07-08 14:58:09
 * @Description: file content
 */
import { Saga } from 'redux-saga';
import { SagaInjectionModes } from 'redux-injectors';
import { Reducer, AnyAction } from '@reduxjs/toolkit';

export interface IRootState {
  // TODO: 这里类型是否应该强约束？
  [key: string]: any;
}

type RequiredRootState = Required<IRootState>;

// export type RootStateKeyType = keyof RootState;
export type RootStateKeyType = string;

export type InjectedReducersType = {
  [P in RootStateKeyType]?: Reducer<RequiredRootState[P], AnyAction>;
};
export interface IInjectReducerParams<Key extends RootStateKeyType> {
  key: Key;
  reducer: Reducer<RequiredRootState[Key], AnyAction>;
}

export interface IInjectSagaParams {
  key: RootStateKeyType | string;
  saga: Saga;
  mode?: SagaInjectionModes;
}
