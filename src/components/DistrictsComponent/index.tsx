/* eslint-disable max-len */
import * as React from 'react';
import { Cascader, TreeSelect } from 'antd';
import { getRequest } from 'utils/request';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import globalMessages from 'utils/messages';

import { NAMESPACE } from './constants';
import selectors from './selectors';
import { actions, reducer } from './slice';
import { TLastLevel } from './types';
import nationalDistricts from './nationalDistricts'

const levelArray: Array<string> = ['district', 'city', 'province', 'nation'];

type TComType = 'cascade' | 'tree';
type TSelectMode = 'single' | 'multi';

interface IOtherOptions<T> {
  [key: string]: T;
}

interface IDataItem {
  value: string | number;
  label: string | number;
  children?: Array<IDataItem>;
  key?: string | number;
}

type IPayload = any;

interface IProps extends InjectedIntlProps{
  lastLevel: TLastLevel; // 显示的最后一级
  type: TComType; // 组件类型，级联、树状
  mode?: TSelectMode; // 单选多选
  initialValue?: string[] | undefined | string; // TODO 后期传参可以不用传这个字段了 初始值
  otherOptions?: IOtherOptions<any>; // 组件其他内部的属性
  internation?: boolean; // 是否有国际城市
  hasAll?: boolean; // 是否包含全部
  onChange?: (payload: IPayload) => any; // 选择后的回调
  value?: string[] | undefined | string;
}

const componentNameMap = {
  cascade: {
    comp: Cascader,
    innerProp: 'options',
  },
  tree: {
    comp: TreeSelect,
    innerProp: 'treeData',
  },
};

const { useState, useEffect } = React;

export const DistrictComponent = (props: IProps) => {
  useInjectReducer({ key: NAMESPACE, reducer });

  const districtsData = useSelector(selectors.districtsData);
  const queryParam = useSelector(selectors.queryParam);

  const dispatch = useDispatch();

  const { intl, type, initialValue, otherOptions, lastLevel } = props;
  const [options, setOptions] = useState([]);
  const [value, setValue]: [any, (value: any) => void] = useState([]);
  const ComponentName = componentNameMap[type].comp;
  const innerProps = {
    [componentNameMap[type].innerProp]: options,
    ...otherOptions || {},
  };
  const getFormatData = (data: any, hasAll: boolean, currentLevel: string, firstCall?: boolean, parentValue?: string | number) => {
    const result: Array<IDataItem> = [];
    if (hasAll && firstCall) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      result.push({ label: intl.formatMessage(globalMessages.all), value: intl.formatMessage(globalMessages.all), children: [] });
    }
    const currentLevelIndex = levelArray.indexOf(currentLevel);
    const preLevelIndex = currentLevelIndex ? currentLevelIndex - 1 : 0;
    (data || []).forEach((item: any) => {
      const itemValue = (props.type === 'tree' && props.mode === 'multi') ? `${parentValue ? `${parentValue}/` : ''}${item.label}` : item.label;
      const dataItem: IDataItem = {
        value: itemValue,
        label: item.label,
        key: (props.type === 'tree' && props.mode === 'multi') ? `${parentValue ? `${parentValue}/` : ''}${item.label}` : item.value,
      };
      if (currentLevelIndex > 0 && props.lastLevel !== currentLevel) {
        dataItem.children = getFormatData(item.children, hasAll, levelArray[preLevelIndex], false, dataItem.value);
      }
      result.push(dataItem);
    });
    return result;
  };

  useEffect(() => {
    setValue(initialValue);
  }, [JSON.stringify(props.initialValue)]);

  useEffect(() => {
    const result = getFormatData(districtsData, props.hasAll, props.internation ? 'nation' : 'province', true);
    setOptions(result);
  }, [lastLevel]);

  useEffect(() => {
    if (districtsData && Array.isArray(districtsData) && districtsData.length && queryParam === (props.internation ? 2 : 1)) {
      const result = getFormatData(districtsData, props.hasAll, props.internation ? 'nation' : 'province', true);
      setOptions(result);
    } else {
      const data = nationalDistricts;
      let convertData = [] as any;
      if (props.internation) {
        convertData = Array.isArray(data) && data.map((item: any) => ({
          label: item.label,
          value: item.value,
          children: item.children,
        }));
      } else {
        data.forEach((item: any) => {
          convertData = item.children || [];
        });
      }
      const result = getFormatData(convertData, props.hasAll, props.internation ? 'nation' : 'province', true);
      setOptions(result);
      dispatch(actions.updateDistrictsData(convertData));
      dispatch(actions.updateQueryParam(props.internation ? 2 : 1));
    }
  }, []);

  const handleChangeValue = (val: IPayload) => {
    setValue(val);
    if (props.onChange) {
      props.onChange(val);
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ComponentName
      {
        ...innerProps
      }
      value = {props.value || value}
      onChange = {(val: IPayload) => handleChangeValue(val)}
    />
  );
};

export default injectIntl(DistrictComponent);
