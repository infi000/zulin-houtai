import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Select, Form, Input, InputNumber, DatePicker, Checkbox, Radio, Col, Upload, Button, Table, Row, Space, Card, message } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { isModify, isView, isCreate, getCookie } from 'utils/utils';
import { falsyParamsFilter } from 'utils/filters';
import { ModalTitle } from 'components/TitlePrefixIcon';
import { CREATE, EDIT, VIEW, yesOrNo } from 'utils/constants';
import moment from 'moment';
import { selectAllDictMap } from 'store/selectors';
import { UploadOutlined } from '@ant-design/icons';
import ImageBox from 'components/ImageBox';
import { useState } from 'react';
import { actions, getOrderExport, getOrdermodify, postCreate, postEdit, postOrderrenew, postVerify } from '../slice';
import selectors from '../selectors';
import { IOrderDetail, ITableItem } from '../types';
import { formatPostParams, formatPostParams2 } from '../adapter';
import * as QS from 'qs';
import { O_STATUS_MAP } from '../constants';

const { useEffect, useMemo } = React;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

interface IProp {
  onCancel: () => void;
}

function MainModal(Prop: IProp) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const loading = useSelector(selectors.loading);
  const { onCancel } = Prop;

  const handleOk = async () => {
    const values = await form.validateFields();
    console.log(values);
    const { ostatus, timeRange } = values;
    const token = getCookie('token');
    const starttime = timeRange?.[0]?.format('YYYY-MM-DD');
    const endtime = timeRange?.[1]?.format('YYYY-MM-DD');
    const query = { ostatus, starttime, endtime, token };
    const src = `/index.php/AdminApi/Lease/orderexport?${QS.stringify(query)}`;
    // const src = `/index.php/AdminApi/Lease/orderexport?starttime=2025-01-01&endtime=2025-01-12&token=0aed59bbfdb66f35573af517731ab419
// `;
    window.open(src, '_blank');
  };

  return (
    <Modal
      forceRender
      destroyOnClose
      title='导出'
      visible
      confirmLoading={loading}
      onOk={useDebounceBefore(handleOk)}
      onCancel={onCancel}
      width={800}
    >
      <Form {...formItemLayout} form={form}>
        <Row gutter={24}>
          <Col span={24}><Form.Item
            label='状态'
            name='ostatus:'
          >
            <Select
              placeholder='请选择'
              allowClear
            >
              {
                // eslint-disable-next-line max-len
                Array.from(O_STATUS_MAP).map(([key, value]) => <Select.Option value={key} key={key}>{value}</Select.Option>)
              }
            </Select>
          </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label='导出时期范围'
              name='timeRange'
              rules={[{ required: true, message: '必填项' }]}
            >
              <DatePicker.RangePicker
                format='YYYY-MM-DD'
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default MainModal;
