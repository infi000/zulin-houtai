import {
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
// import longan from 'longan-sdk';

import { REQUEST_MATERIAL } from '../constants';

/**
 * @description: 创建异步的Thunk生成器，会根据actionName自动寻找对应的service触发；
 * @return: async thunk
 * 这里特殊处理了传参类型，如若异步方法需要传参，需通过泛型准确传递；
 * T 参数泛型；K 返回值泛型
 */

 declare interface IResponseData<T> {
  errno: number;
  errmsg: string;
  data: T;
  result: T;
  st?: number;
  logid?: string;
}
interface IParams {
  [key: string]: any;
}

function formatParams(typePrefix: string, params: Record<string, any> = {}) {
  let requestMeta = typePrefix;
  if (!params || isEmpty(params)) requestMeta;
  Object.keys(params).forEach(key => {
    if (params[key] instanceof FormData) {
      const tempArrayData = [...params[key].entries()];
      /* 处理formData */
      tempArrayData.forEach(([formKey, formValue]) => {
        if (formValue instanceof File) {
          /* 处理file */
          const { lastModified, name, size, type } = formValue;
          requestMeta += `${formKey}:${lastModified}${name}${size}${type}`;
        } else {
          requestMeta += `${formKey}:${JSON.stringify(formValue)}`;
        }
      });
    } else {
      requestMeta += ` ${key}:${JSON.stringify(params[key])}`;
    }
  });
  return requestMeta;
}

// eslint-disable-next-line max-len
export const createAsyncThunkCreator = (sliceKey: string, services: IParams) => function thunk<T = null, K = null, R = never>(actionName: string, service?: any) {
  const asyncService = service || services[`${actionName}Service`];

  if (asyncService) {
    return createAsyncThunk<IResponseData<R>, T, K>(
      `${sliceKey}/${actionName}`,
      async params => {
        const response = await asyncService(params);
        return response;
      },
    );
  }
  throw new Error(`Can not find ${actionName}Service`);
};

const fetchMethodMap = new Map();
const peddingWaitTime = 60 * 1000;
const repeatRequestTime = 1000;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line max-len
export function createServiceAsyncThunk<ThunkArg = null, Returned = null>(typePrefix: string, payloadCreator: (params: ThunkArg) => Promise<IResponseData<Returned>>) {
  return createAsyncThunk(
    typePrefix,
    async (params: ThunkArg, { rejectWithValue }) => {
      const fetchRequest = payloadCreator(params);
      const requestMeta = formatParams(typePrefix, params);
      const mapValue = fetchMethodMap.get(requestMeta);
      fetchMethodMap.set(
        requestMeta,
        {
          ...mapValue,
          requestMethod: REQUEST_MATERIAL.requestMethod,
          requestUrl: REQUEST_MATERIAL.requestUrl,
          fetchPromise: fetchRequest,
        },
      );
      const res:any = await fetchRequest;
      if (res.res !== 'succ') {
        return rejectWithValue(res);
      }

      return res;
    },
    {
      condition: (params) => {
        let flag = false;
        const requestMeta = formatParams(typePrefix, params);
        // 一开始是先走condition，所以这里先存下来

        // 1 fetchMethodMap里没有 标志位置位true
        if (!fetchMethodMap.has(requestMeta)) {
          flag = true;
          // 当fetchRequest异步请求一直没有结果
          const peddingTimerId = setTimeout(() => {
            const mapValue = fetchMethodMap.get(requestMeta);
            mapValue?.peddingTimerId && clearTimeout(mapValue.peddingTimerId);
            mapValue?.timerId && clearTimeout(mapValue.timerId);
            fetchMethodMap.delete(requestMeta);
          }, peddingWaitTime);

          fetchMethodMap.set(requestMeta, { ...(fetchMethodMap.get(requestMeta) || {}), peddingTimerId });
        } else {
          // 2 fetchMethodMap里有当前请求
          const mapValue = fetchMethodMap.get(requestMeta);
          // 3 当前请求是get 则删除map里当前请求，清空定时器（因为一开始我不知道请求时get还是post，所以都走了定时器），直接返回true，不走后面的逻辑了
          if (mapValue.requestMethod === 'GET') {
            mapValue?.timerId && clearTimeout(mapValue?.timerId);
            mapValue?.peddingTimerId && clearTimeout(mapValue.peddingTimerId);
            fetchMethodMap.delete(requestMeta);
            return true;
          }

          // 4 二次过来的post请求

          // 距上一次请求还不到一秒
          if (mapValue?.timerId) {
            // 清除定时器
            clearTimeout(mapValue.timerId);
            // 把存的定时器id置为null;
            // fetchMethodMap.set(requestMeta, { timerId: null });
            // TODO: 注释掉上报longan的代码，因为权限还没接longan，会导致触发reject的action
            // longan.dispatch({
            //   event_name: 'debounce_catch',
            //   event_desc: `接口重复提交【${mapValue.requestUrl}】`,
            //   event_type: 'selfDefine',
            // });
          }
        }

        // 计时
        // 这里计时有两个考虑点，（1）是当map里没有当前请求，此时我不知道当前请求时post还是get, 所以这里都要走定时器；（2）在一秒之内重复的post请求，定时器要重新计时
        const timerId = setTimeout(() => {
          // 一秒之后重新去map里拿下最新的值。为什么不在外层里直接写一次，而是要分别在else和这里写，是因为这个里面是一秒之后的操作，map里会存入fetchPromise，在外层的话会拿不到
          const mapValue = fetchMethodMap.get(requestMeta);
          // console.log('********一秒之后', mapValue);
          // 一秒之后进行一下操作，当promise有结果后，进行清空map和清除定时器
          mapValue?.fetchPromise?.finally(() => {
            // 清空timerId
            mapValue?.timerId && clearTimeout(mapValue?.timerId);
            mapValue?.peddingTimerId && clearTimeout(mapValue.peddingTimerId);
            // 除掉存储的这条数据
            fetchMethodMap.delete(requestMeta);
          });
        }, repeatRequestTime);
        fetchMethodMap.set(requestMeta, { ...(fetchMethodMap.get(requestMeta) || {}), timerId });

        return flag;
      },
    },
  );
}
