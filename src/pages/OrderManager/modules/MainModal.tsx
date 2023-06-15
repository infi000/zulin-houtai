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
import { actions, postCreate, postEdit, postOrderrenew, postVerify } from '../slice';
import selectors from '../selectors';
import { IOrderDetail, ITableItem } from '../types';
import { formatPostParams } from '../adapter';
import { useState } from 'react';

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

function MainModal() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const mainModal = useSelector(selectors.mainModal);
  const loading = useSelector(selectors.loading);
  const dictMaps = useSelector(selectAllDictMap);
  const [qr, setQr] = useState(null);
  const { data, type = EDIT, visible = false } = mainModal;

  useEffect(() => {
    visible && form.resetFields();
  }, [form, visible]);

  useEffect(() => {
    if (type === '继续支付') {
      //获取二维码
      const token = getCookie('token');
      const url = `/index.php/AdminApi/Lease/orderwxcode?oid=${data?.id}}&token=${token}`;
      setQr(url);
    }
  }, [type]);

  // eslint-disable-next-line max-len
  const memoData = useMemo<any>(() => {
    if (type === CREATE) {
      return {};
    }
    const oData = { ...data };

    return {
      ...oData,
      // 添加需要格式化的初始值
    };
  }, [data, type]);
  const modalTitle = useMemo((): string => {
    switch (type) {
      case CREATE:
        return '新建';
      case EDIT:
        return '编辑';
      case '核销':
        return '订单核销';
      case '续订':
        return '订单续订';
      default:
        return '查看';
    }
  }, [type]);

  const handleCancel = (): void => {
    dispatch(actions.updateMainModalVisible(false));
  };

  const handleOk = async (): Promise<void> => {
    if (type === VIEW) {
      handleCancel();
    } else {
      let values = await form.validateFields();
      values = formatPostParams(values);
      if (type === '核销') {
        dispatch(postVerify(falsyParamsFilter({
          ...values,
          oid: data?.id,
        })));
      } else if (type === '续订') {
        dispatch(postOrderrenew(falsyParamsFilter({
          ...values,
          pid: data?.id,
        })));
      } else { }
    }
  };

  const columns = [
    {
      title: '工具名称', dataIndex: 'title', key: 'title',
    },
    {
      title: '工具箱名称', dataIndex: 'tbtitle', key: 'tbtitle',
    },
    {
      title: '工具价格', dataIndex: 'price', key: 'price',
    },
  ];
  console.log('memoData', memoData);
  return (
    <Modal
      forceRender
      destroyOnClose
      title={<ModalTitle title={modalTitle} />}
      visible={visible}
      confirmLoading={loading}
      onOk={useDebounceBefore(handleOk)}
      onCancel={handleCancel}
      width={800}
    >
      <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
        <Card title='工具箱信息' size='small'>
          <Table
            columns={columns}
            dataSource={memoData?.prebook?.tools || []}
            pagination={false}
          />
        </Card>
        <Form {...formItemLayout} form={form}>
          {
            type === '核销' && (
              <Row gutter={24}>
                <Col span={24}><Form.Item
                  label='是否完成'
                  name='iscomplete'
                  rules={[{ required: true, message: '必填项' }]}
                >
                  <Select
                    placeholder='请选择'
                    disabled={isView(type)}
                  >
                    <Select.Option value='1'>完成</Select.Option>
                    <Select.Option value='2'>未完成</Select.Option>
                  </Select>
                </Form.Item>
                </Col>
              </Row>
            )
          }
          {
            type === '续订' && (
              <Row gutter={24}>
                <Col span={24}><Form.Item
                  label='续订时间'
                  name='endtime'
                  rules={[{ required: true, message: '必填项' }]}
                >
                  <DatePicker
                    format='YYYY-MM-DD HH:mm'
                    placeholder='请选择'
                    showTime
                    style={{ width: '100%' }}
                    disabled={isView(type)}
                  />
                </Form.Item>
                </Col>
              </Row>
            )
          }
          {
            type === '继续支付' && (
              <img src={qr} width={300} height={300} alt='图片二维码' />
            )
          }
        </Form>
      </Space>
    </Modal>
  );
}

export default MainModal;
