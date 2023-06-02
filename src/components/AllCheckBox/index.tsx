import { Checkbox, Divider } from 'antd';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { useState } from 'react';

const CheckboxGroup = Checkbox.Group;

interface IProps extends InjectedIntlProps {
  value?: any[];
  onChange?: (params: any[]) => void;
  options?: any[];
}
function App(props: IProps) {
  const { value, onChange, options } = props;
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(value);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  const onGroupChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    if (onChange) {
      onChange(list);
    }
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const list = e.target.checked ? options.map(item => (item.value)) : [];
    setCheckedList(list);
    if (onChange) {
      onChange(list);
    }
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <>
      <Checkbox style={{ marginRight: '8px' }} indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        全选
      </Checkbox>
      <CheckboxGroup options={options} value={checkedList} onChange={onGroupChange} />
    </>
  );
}

export default injectIntl(App);
