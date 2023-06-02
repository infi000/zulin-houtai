/*
 * @Author: liqingqing
 * @Date: 2021-03-19 11:21:08
 * @LastEditTime: 2021-03-19 18:51:26
 * @LastEditors: Please set LastEditors
 * @Description: 承运商
 * @FilePath: /janus/src/components/CarrierSelect/index.tsx
 */
import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Select } from 'antd';

import { getRequest } from 'utils/request';
import globalMessages from 'utils/messages';
import { falsyParamsFilter } from 'utils/filters';

import { IItem } from './types';

const { Option } = Select;

interface IProps extends InjectedIntlProps {
  value?: string | number;
  onChange?: (params: string) => void;
  companyId?: number;
  mode?: 'multiple' | 'tags';
  isCodeName?: boolean;
  disabled?: boolean;
}

const { useState } = React;

function CarrierSelect(props: IProps) {
  const { intl, value, companyId = 0, disabled = false, isCodeName = false } = props;

  const [dataSource, setDataSource] = useState([]);

  React.useEffect(() => {
    getRequest('/base/order/getcarrier', falsyParamsFilter({
      company_id: companyId,
    })).then((res: IResponseData<IListResponse<IItem>>) => {
      if (res.errno === 0) {
        const list: IItem[] = Array.isArray(res?.data?.list) ? res.data.list : [];
        setDataSource(list);
      }
    });
  }, [companyId]);

  const handleChange = (val: string) => {
    props.onChange(val);
  };

  return (
    <Select
      showSearch
      allowClear
      value={value}
      placeholder={intl.formatMessage(globalMessages.selectPlaceholder)}
      defaultActiveFirstOption={false}
      filterOption={false}
      onChange={handleChange}
      notFoundContent={null}
      disabled={disabled}
      mode = {props?.mode || undefined}
      optionFilterProp="children"
    >
      {
        dataSource.map((item: IItem) => (
          <Option value={item.carrier_code} key={item.carrier_id}>
            { isCodeName ? `【${item.carrier_code}】${item.carrier_name}` : item.carrier_name }
          </Option>
        ))
      }
    </Select>
  );
}

export default injectIntl(CarrierSelect);
