/* eslint-disable prefer-template */
/**
 * 常用工具函数（ES6语法）
 * cookie
 * url params
 * date
 * time
 * 身份证校验
 * 国际化配置文件转map格式
 * more……
 * 此文件中的函数需注明作者
 */
import moment from 'moment';
import { InjectedIntl } from 'react-intl';

import { getCachingKeys } from 'react-router-cache-route';
import { actions as globalActions } from 'store/globalSlice';
/**
 * [设置cookie]
 * @param {[string]} cookie key
 * @param {[string]} cookie value
 * @author lichun
 */
export function setCookie(name: string, value: string): void {
  const now = new Date();
  now.setTime(now.getTime() + (1000 * 60 * 60 * 24 * 30));
  // tslint:disable-next-line: no-console
  // console.log('在设置cookie时新增了SameSite=Lax;在某些情况下可能有限制，关注');
  const str = `${name}=${value};expires=${now.toUTCString()};path=/;SameSite=Lax;`;
  document.cookie = str;
}

/**
 * [得到cookie]
 * @param {[string]} cookie key
 * @returns {[string]} value
 * @author lichun
 */
export function getCookie(name: string) {
  let start;
  let end;

  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(`${name}=`);

    if (start !== -1) {
      start = start + name.length + 1;
      end = document.cookie.indexOf(';', start);
      if (end === -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }
  return '';
}

/**
 * 从url中获取参数值
 * @param {string} 参数名
 * @return {string} 参数值
 * @author lichun 正则自己写的，不保证所有情况下都正确 ^-^ 凑合着用
 */
export function getQueryString(name: string): string {
  // 处理decodeURIComponent 因为%而崩溃的问题
  try {
    const reg = new RegExp(`([?&])${name}=([^&]*?)(#|&|$)`, 'i');
    const r = window.location.href.match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return '';
  } catch (err) {
    console.log('decodeURIComponent error:', err);
    return '';
  }
}

/**
 * object转url参数
 * @param {object}
 * @return {string}
 * @author yangyang
 */
export function setUrlQuerys(params: Record<string, string>) {
  const queryString = Object.keys(params).map((item: string) => `${encodeURIComponent(item)}=${encodeURIComponent(JSON.stringify(params[item]))}`).join('&');
  return queryString;
}

/**
 * 时间戳转换
 * @param {String} date eg: 1234567890
 * @return {String} 2017-07-27 10:10:10
 * @author zhangning
 */
export function secondToDatetime(timestap: number) {
  const date = new Date(timestap * 1000);
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
  const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
  const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

/**
 * 时间戳转换
 * @param {String} date eg: moment对象
 * @return {String} 1234567890
 * @author zhangning
 */
export function momentToSecond(moment: Date) {
  return Number(moment.valueOf() / 1000).toFixed(0);
}

/**
 * 判断页面类型：创建、修改、详情
 * @param flag OperateType
 */
export function isView(flag: OperateType) {
  return flag === 'view';
}
export function isModify(flag: OperateType) {
  return flag === 'edit';
}
export function isCreate(flag: OperateType) {
  return flag === 'create';
}

/**
 * 表格行枚举映射
 * @param messageMap messages定义的枚举
 * @param propKey 对应的key
 */
export const transToRowRender = (intl: InjectedIntl, messageMap: Record<string, unknown>, propKey: number | string) => {
  let result = '';
  Object.keys(messageMap).forEach((key: string) => {
    if (Number(key) === propKey) {
      // eslint-disable-next-line
      result = intl.formatMessage((messageMap as any)[key]);
    }
  });
  return result;
};

/**
 * 国际化配置文件转map格式
 * 用法参考Demo文件夹
 * @param message
 */
export const i8nMessageToMap = (message: {
  [key: string]: TMsg;
}): Map<TMsg['defaultMessage'], TMsg> =>
  new Map(
    Object.values(message).reduce((res, item, index) => {
      res[index] = [item.defaultMessage, item];
      return res;
    }, []),
  );

/**
 * 表格行枚举映射
 * 针对基础枚举字段
 * @param messageMap messages定义的枚举
 * @param propKey 对应的key
 * @param voidTxt 空值自定义
 */
// eslint-disable-next-line
export const transEnumToRowRender = (messageMap: any[], propKey: React.Key, voidTxt?: string) => {
  let result = '';
  if (Array.isArray(messageMap)) {
    // eslint-disable-next-line
    messageMap.forEach((item: any) => {
      if (String(item.data_code) === String(propKey)) {
        result = item?.custom_value;
      }
    });
  }
  return result || voidTxt;
};

/**
 * InputNumber 小数有效位数格式化
 * @param value Input的输入
 * @example <InputNumber step={0.001} formatter={limitDecimals} parser={limitDecimals} />
 */
export const limitDecimals = (value: string | number): string => {
  // eslint-disable-next-line
  const reg = /^(\-)*(\d+)\.(\d\d\d).*$/;
  if (typeof value === 'string') {
    return !Number.isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : '';
  }
  if (typeof value === 'number') {
    return !Number.isNaN(value) ? String(value).replace(reg, '$1$2.$3') : '';
  }
  return '';
};

export function handleJumpByTab(newPath: string, dispatch: any) {
  const cachingKeys = getCachingKeys();
  if (!cachingKeys.includes(newPath)) {
    dispatch(globalActions.updateCachingKeys([...cachingKeys, newPath]));
  }
  dispatch(globalActions.updateActiveCacheKey(newPath));
}

export const limitInputLengthRule = (length: number, msg: string) => ({
  validator: (_: any, value: string) => (
    String(value).length <= length
      ? Promise.resolve()
      // eslint-disable-next-line max-len
      : Promise.reject(new Error(msg))),
});

// 处理映射关系
export const objToArray = (obj: any) => {
  if (!obj) {
    return [];
  }
  return Object.entries(obj).map(([value, label]) => ({
    value,
    label,
  }));
};

export const objToNumArray = (obj: any) => {
  if (!obj) {
    return [];
  }
  return Object.entries(obj).map(([value, label]) => ({
    value: Number(value),
    label,
  }));
};

/** @desc DatePicker组件用，所选日期必须不得小于当前时间
 * <DatePicker
            disabledDate={disabledBeforeToday}
            placeholder='选择闲置结束时间'
            style={{ width: '100%' }}
            disabled={isView(type)}
            format='YYYY-MM-DD'
  />
 */
export const disabledBeforeToday = (current: any) => current && current < moment().subtract(1, 'days').endOf('day');

/**
 *
 * @desc DatePicker组件用，返回tur时不可选
 */
export const disabledDate = (current: any, type:'仅当月次月') => {
  // 0指当月月底，1指上月月底，-1指下月月底，以此类推 moment().endOf('month').subtract(0, 'month').endOf('month').format('YYYYMMDD')
  if (!current) {
    return false;
  }
  if (type === '仅当月次月') {
    // 小于于上月月底 || 大于于次月月底
    return current < moment().endOf('month').subtract(1, 'month').endOf('month')
    || current > moment().endOf('month').subtract(-1, 'month').endOf('month');
  }
  return true;
};

export const formatPage = (params: any) => {
  const _params = { ...params };
  try {
    if (_params.pageSize) {
      _params.count = _params.pageSize;
    }
    if (_params.pageNum) {
      _params.offset = (_params.pageNum - 1)*_params.count;
    }
  } catch (error) {
    console.log(error);
  }

  return { ..._params };
};
