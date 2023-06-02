/*
 * @Author: your name
 * @Date: 2021-02-23 11:56:48
 * @LastEditTime: 2021-03-10 12:05:38
 * @LastEditors: 董方旭
 * @Description: In User Settings Edit
 * @FilePath: /janus/src/components/RuleSug/index.tsx
 */
import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Select } from 'antd';

import { getRequest } from 'utils/request';
import globalMessages from 'utils/messages';
import useDebounce from 'hooks/useDebounce';

import { IItem } from './types';

const { Option } = Select;

interface IProps extends InjectedIntlProps {
  value?: string;
  // eslint-disable-next-line
  onChange?: (params: string) => any;
  companyId?: string;
  ruleId?: string;
  isShowAllOption?: boolean;
  isShowCodeAndName?: boolean;
  disabled?: boolean;
  ruleType: 1|2|3|4;
}

function RuleSug(props: IProps) {
  const { intl, value, companyId, ruleId, isShowAllOption = false, isShowCodeAndName = true, disabled = false, ruleType } = props;
  const [dataSource, setDataSource] = React.useState([]);

  // 为已有初值作准备
  React.useEffect(() => {
    getRequest('/omsdata/rule/rulesug', {
      rule_id: ruleId || '',
      sug_rule: '',
      company_id: '',
      rule_type: ruleType,
    // eslint-disable-next-line
    }).then((res: any) => {
      if (res.errno === 0 || res.errno === '0') {
        const list: IItem[] = Array.isArray(res?.data?.list) ? res.data.list : [];
        setDataSource(list);
      }
    });
  }, []);

  const handleSearch = (val: string) => {
    getRequest('/omsdata/rule/rulesug', {
      sug_rule: val,
      company_id: companyId || '',
      rule_type: ruleType,
    // eslint-disable-next-line
    }).then((res: any) => {
      if (res.errno === 0 || res.errno === '0') {
        const list: IItem[] = Array.isArray(res?.data?.list) ? res.data.list : [];
        setDataSource(list);
      }
    });
  };

  const handleChange = (val: string) => {
    if (props.onChange) {
      props.onChange(val);
    }
  };

  return (
    <Select
      showSearch
      allowClear
      value={value}
      placeholder={intl.formatMessage(globalMessages.selectPlaceholder)}
      defaultActiveFirstOption={false}
      filterOption={false}
      onSearch={useDebounce(handleSearch, 500, [companyId, ruleType])}
      onChange={handleChange}
      notFoundContent={null}
      disabled={disabled}
    >
      {
        isShowAllOption ? (
          <Option key='warsehouse_all' value='all'>
            {intl.formatMessage(globalMessages.all)}
          </Option>
        ) : null
      }
      {dataSource.map((item: IItem) => (
        <Option key={item.rule_id} value={item.rule_id}>
          { isShowCodeAndName ? `【${item.rule_code}】${item.rule_name}` : item.rule_name }
        </Option>
      ))}
    </Select>
  );
}

export default injectIntl(RuleSug);
