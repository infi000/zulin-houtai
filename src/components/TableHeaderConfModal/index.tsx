import * as React from 'react';
import { Modal, Button, Checkbox, Row, Col } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { sortBy } from 'lodash';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import styled from 'styled-components';

import globMessages from 'utils/messages';

import DragTable from './dragTable';
import { IFieldItem } from './types';
import messages from './messages';

function arrSort(arr: IFieldItem[], key: keyof IFieldItem) {
  return sortBy(arr, (item: IFieldItem) => item[key]);
}

const Wrapper = styled.div`
  padding-bottom: 12px;
  line-height: 18px;
  font-size: 14px;
`;
const WeightWrapper = styled.div`
  padding: 12px 0;
  line-height: 18px;
  font-size: 14px;
  font-weight: 500;
`;

const { useState, useEffect } = React;

interface IProps extends InjectedIntlProps {
  visible: boolean; // 弹窗显隐
  list: IFieldItem[]; // 候选字段
  handleCancel: () => void; // 关闭弹窗
  handleConfirm: (params: IFieldItem[]) => void; // 确定
  handleReset?: () => void; // 重置
}

function TableHeaderConfModal(props: IProps) {
  const { intl, visible = false, list = [], handleCancel, handleConfirm } = props;

  const [checkboxList, setCheckboxList] = useState<IFieldItem[]>([]);

  const [tableList, setTableList] = useState<IFieldItem[]>([]);

  useEffect(() => {
    setCheckboxList(sortBy(list, (item: IFieldItem) => item.default_sort_id));
    // 过滤出生效的表头列，再按sort_id排序，再初始化sort_id
    setTableList(arrSort(list.filter((item: IFieldItem) => item.field_status === 1), 'sort_id').map((item, index: number) => ({ ...item, sort_id: index + 1 })));
  }, [JSON.stringify(list)]);

  const handleReset = () => {
    // 把候选字段 和 表格数据渲染成 从父组件传进来的状态
    // 判断父组件有没有给传这个函数，没有给传的话组件内自己做重置
    if (props.handleReset) {
      props.handleReset();
      return;
    }
    setCheckboxList(list);
    setTableList(arrSort(list.filter((item: IFieldItem) => item.field_status === 1), 'sort_id').map((item, index: number) => ({ ...item, sort_id: index + 1 })));
  };

  const handleBtnConfirm = () => {
    const params = tableList.map((item: IFieldItem, index: number) => ({ ...item, sort_id: index + 1 }));
    handleConfirm(params);
  };

  const hanldeCheckboxChange = (val: IFieldItem, index: number, e: CheckboxChangeEvent) => {
    // 把对应的item的field_status置为e.target.checked的值，然后setState
    const currentItem = { ...val, field_status: e.target.checked ? 1 : 2 };
    const data = JSON.parse(JSON.stringify(checkboxList));
    data[index] = currentItem;
    setCheckboxList(data);

    // 勾选的话 就塞到表格里 不选的话就从表格里滤掉
    const newTableList = e.target.checked ? [...tableList, currentItem] : tableList.filter(item => item.system_field !== val.system_field);
    setTableList(newTableList);
  };

  // 拖拽或者移除表格的回调
  const handleDrag = (val: IFieldItem[], key?: string) => {
    setTableList(val);
    if (key) {
      const data = JSON.parse(JSON.stringify(checkboxList));
      const newList = data.map((item: IFieldItem) => {
        if (item.system_field === key) {
          return {
            ...item,
            field_status: 2,
          };
        }
        return item;
      });
      setCheckboxList(newList);
    }
  };

  return (
    <Modal
      title={intl.formatMessage(messages.tableConf)}
      visible={visible}
      onOk={handleBtnConfirm}
      onCancel={handleCancel}
      width={1000}
      centered
      footer={[
        <Button key='reset' onClick={handleReset}>
          {intl.formatMessage(globMessages.reset)}
        </Button>,
        <Button key='confirm' type='primary' onClick={handleBtnConfirm}>
          {intl.formatMessage(globMessages.save)}
        </Button>,
      ]}
    >
      <Row gutter={12}>
        <Col span={12}>
          <Wrapper>{intl.formatMessage(messages.candidateField)}</Wrapper>
          <WeightWrapper>{intl.formatMessage(messages.basicField)}</WeightWrapper>
          <Row gutter={[12, 12]} style={{ height: '500px', overflow: 'auto' }}>
            {
              checkboxList.map((item: IFieldItem, index: number) => (
                <Col span={8} key={item.system_field}>
                  <Checkbox
                    value={item.system_field}
                    // disabled={item.is_require}
                    checked={item.field_status === 1}
                    onChange={(e: CheckboxChangeEvent) => hanldeCheckboxChange(item, index, e)}
                  >
                    {item.column_name}
                  </Checkbox>
                </Col>
              ))
            }
          </Row>
        </Col>
        <Col span={12}>
          <Wrapper>{intl.formatMessage(messages.selectedField)}</Wrapper>
          <DragTable
            tableData={tableList}
            handleDrag={handleDrag}
          />
        </Col>
      </Row>
    </Modal>
  );
}

export default injectIntl(TableHeaderConfModal);
