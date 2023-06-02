import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Cascader } from 'antd';
import { CascaderProps, FieldNamesType } from 'antd/lib/cascader';
import { useSelector } from 'react-redux';
import { selectAllSystemList, selectAuthSystemList } from 'store/selectors';
import globalMessages from 'utils/messages';
import { IItem } from './types';

interface IProps extends InjectedIntlProps, Partial<CascaderProps> {
  isAll: number; // 2: 是全部
}

function SysCascade(props: IProps) {
  const { intl, isAll = 1 } = props;
  // const [dataSource, setDataSource] = React.useState([]);
  const authSystemList = useSelector(selectAuthSystemList);
  const allSystemList = useSelector(selectAllSystemList);

  const systemList = isAll === 1 ? authSystemList : allSystemList;

  const turnArray = (arr: IItem[]): FieldNamesType[] => arr.reduce((curArr: any[], current: IItem, index: number) => {
    const arrData = [...curArr];
    arrData[index] = {
      value: current?.sys_code || '',
      label: `${current?.sys_code ? `【${current?.sys_code}】` : ''}${current?.sys_name || ''}`,
    };
    if (current?.sub_sys?.length) {
      arrData[index].children = turnArray(current.sub_sys);
    }
    return arrData;
  }, []);

  const dataSource = React.useMemo(() => {
    let res: any[] = [];
    if (systemList?.length) {
      res = turnArray(systemList);
    }
    return res;
  }, [systemList]);

  return (
    <Cascader
      showSearch={{
        filter: (inputValue, path) =>
          path.some(item => (item.label as string).toLowerCase().includes(inputValue.toLowerCase())),
      }}
      allowClear
      placeholder={intl.formatMessage(globalMessages.selectPlaceholder)}
      options={dataSource}
      expandTrigger='hover'
      {...props}
    />
  );
}

export default injectIntl(SysCascade);
