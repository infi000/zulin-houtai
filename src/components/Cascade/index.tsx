import * as React from 'react';
import { Select, Col, Row } from 'antd';
import { SelectProps } from 'antd/lib/select';
import isEmpty from 'lodash/isEmpty';
import { InjectedIntl } from 'react-intl';

import messages from 'utils/messages';

export interface ICascadeValue {
  [key: string]: number | '';
}

export type ICascadeConfig = {
  [key in keyof ICascadeValue]: {
    allOption?: boolean; // 是否包含名为"全部"的Option
    selectOptions?: SelectProps<string|number>; // 默认是false
    disable?: boolean;
  };
};

export interface ICascadeData {
  [key: string]: any;
}

export interface IProps {
  riderType?: number;
  display?: 'default' | 'inline' | undefined;
  cascadeFields: string[];
  cascadeData: ICascadeData;
  cascadeLength: number;
  value?: ICascadeValue;
  onChange?: (value: ICascadeValue) => null;
  config: ICascadeConfig;
  intl: InjectedIntl;
}

interface IICascadeData {
  [key: number]: ICascadeData;
}

const { useState, useEffect } = React;
const { Option } = Select;

function Cascade(props: IProps): JSX.Element {
  const {
    display, riderType, cascadeFields, config, value, onChange, intl, cascadeLength, cascadeData,
  } = props;

  const initLevelMap: IICascadeData = {};
  const initValue: ICascadeValue = {};

  Array.from({ length: cascadeLength }).forEach((item: undefined, index: number) => {
    initLevelMap[index] = {};
    initValue[cascadeFields[index]] = '';
  });
  initLevelMap[0] = cascadeData;

  const [levelMap, setLevelMap] = useState(initLevelMap);
  const [newValue, setNewValue] = useState<ICascadeValue>(value || initValue);

  const resetLevelOptions = (id: any, field: keyof ICascadeValue, prevLevelMap = levelMap): IICascadeData => {
    const standardLevel = cascadeFields.indexOf(`${field}`);
    const customFields = Object.keys(config);
    const customLevel = customFields.indexOf(`${field}`);

    if (initLevelMap[standardLevel + 1]) {
      const nextLevel = standardLevel + 1;
      const nextLevelParent = prevLevelMap[standardLevel][id];
      if (nextLevelParent) {
        const nextLevelAuthMap = nextLevelParent[`${cascadeFields[nextLevel]}_list`];
        if (cascadeFields[standardLevel + 1] !== customFields[customLevel + 1]) { // 这里处理跳级级联，如果之后有跳多级的case 还需要重新review
          let nextnextLevelAuthMap = {};
          Object.values(nextLevelAuthMap).forEach((item: any) => {
            nextnextLevelAuthMap = {
              ...nextnextLevelAuthMap,
              ...item[`${cascadeFields[nextLevel + 1]}_list`],
            };
          });
          return {
            ...prevLevelMap,
            [nextLevel + 1]: nextnextLevelAuthMap,
          };
        }
        return {
          ...prevLevelMap,
          [nextLevel]: nextLevelAuthMap,
        };
      }
    }
    return levelMap;
  };

  useEffect(() => {
    if (!isEmpty(cascadeData)) {
      let temp: { [key: number]: ICascadeData } = {
        ...levelMap,
        0: cascadeData,
      };
      if (value) {
        // 允许进行跳级级联
        const fields = Object.keys(config);
        for (let i = 0; fields.length > i + 1; i += 1) {
          temp = resetLevelOptions(value[fields[i]], fields[i], temp);
        }
        setLevelMap(temp);
        setNewValue(value);
      } else {
        setLevelMap(temp);
      }
    }
  }, [cascadeData]);

  const handleSelect = (id: any, level: number, levelName: keyof ICascadeValue): void => {
    const field = levelName;
    const nextValue = {
      ...newValue,
      [field]: id,
    };
    // 重置级联后select值
    for (let i = 1; Object.keys(config).length > level + i; i += 1) {
      nextValue[Object.keys(config)[level + i]] = '';
    }

    setNewValue(nextValue);
    if (onChange) {
      onChange(nextValue);
    }

    setLevelMap(resetLevelOptions(id, levelName));
  };

  const isLevelDisable = (checkLevelName: keyof ICascadeValue): boolean => {
    const list = Object.keys(config);
    const findIndex = list.findIndex((levelName: keyof ICascadeValue) => levelName === checkLevelName);
    if (findIndex < 0) return true;
    const findList = list.slice(0, findIndex);
    let result = false;
    findList.forEach((levelName: keyof ICascadeValue) => {
      if (!newValue[levelName]) {
        result = true;
      }
    });
    return result;
  };

  const generateSelect = (levelName: keyof ICascadeValue, index: number): JSX.Element => (
    <Select
      placeholder={intl.formatMessage(messages.selectPlaceholder)}
      onChange={(id): void => handleSelect(id, index, levelName)}
      value={newValue[levelName]}
      {...config[levelName].selectOptions}
      disabled={(config[levelName].selectOptions && config[levelName].selectOptions.disabled) || config[levelName].disable || isLevelDisable(levelName)}
    >
      {
        config[levelName].allOption && (
          <Option key="" value="">全部</Option>
        )
      }
      { Object.values(levelMap[cascadeFields.indexOf(`${levelName}`)]).map((item: ICascadeData) => (
        levelName === 'supplier' && riderType && riderType === 300 // 过滤虚拟供应商
          ? item.type === 2 && (
            <Option key={item[`${levelName}_id`]} value={item[`${levelName}_id`]} title={item[`${levelName}_name`]}>
              {item[`${levelName}_name`]}
            </Option>
          )
          : item.type !== 2 && (
            <Option key={item[`${levelName}_id`]} value={item[`${levelName}_id`]} title={item[`${levelName}_name`]}>
              {item[`${levelName}_name`]}
            </Option>
          )
      ))}
    </Select>
  );

  const configLength = Object.keys(config).length;

  return (
    !display || display === 'default'
      ? (
        <Row>
          { Object.keys(config).map((levelName: keyof ICascadeValue, index) => (
            <Col span={24 / configLength}>
              <Row>
                <Col span={8}>
                  <label htmlFor="supplier">{intl.formatMessage((messages as any)[levelName])}</label>
                </Col>
                <Col span={16}>
                  { generateSelect(levelName, index) }
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      )
      : (
        <>
          { Object.keys(config).map((levelName: keyof ICascadeValue, index) => (
            <Row gutter={index === Object.keys(config).length - 1 ? [16, 0] : [16, 24]}>
              <Col span={24}>
                <Row>
                  <Col span={6}>
                    <label htmlFor="supplier">{intl.formatMessage((messages as any)[levelName])}</label>
                  </Col>
                  <Col span={14}>
                    { generateSelect(levelName, index) }
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
        </>
      )
  );
}

export default Cascade;
