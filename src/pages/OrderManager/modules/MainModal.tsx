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
import { actions, getOrdermodify, postCreate, postEdit, postOrderrenew, postVerify, getRechargeList } from '../slice';
import selectors from '../selectors';
import { IOrderDetail, ITableItem } from '../types';
import { formatPostParams, formatPostParams2 } from '../adapter';
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

function MainModal() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const mainModal = useSelector(selectors.mainModal);
  const loading = useSelector(selectors.loading);
  const dictMaps = useSelector(selectAllDictMap);
  const rechargeList = useSelector(selectors.rechargeList);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [qr, setQr] = useState(null);
  const { data, type = EDIT, visible = false } = mainModal;

  useEffect(() => {
    visible && form.resetFields();
  }, [form, visible]);

  useEffect(() => {
    if (type === '继续支付') {
      // 获取二维码
      const token = getCookie('token');
      const url = `/index.php/AdminApi/Lease/orderwxcode?oid=${data?.id}&token=${token}`;
      setQr(url);
    }
  }, [data?.id, type]);

  // eslint-disable-next-line max-len
  const memoData = useMemo<any>(() => {
    if (type === CREATE) {
      return {};
    }
    const oData = { ...data };
    if (data.starttime) {
      // 日期
      const { starttime } = data;
      (oData as any).starttime = moment.unix(Number(starttime));
    }
    if (data.endtime) {
      // 日期
      const { endtime } = data;
      (oData as any).endtime = moment.unix(Number(endtime));
    }
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
      case '充值记录':
        return '充值记录';
      default:
        return '查看';
    }
  }, [type]);

  const handleCancel = (): void => {
    setSelectedRowKeys([]);
    dispatch(actions.updateMainModalVisible(false));
  };

  const handleOk = async (): Promise<void> => {
    if (type === VIEW) {
      handleCancel();
    } else {
      let values = await form.validateFields();
    
      if (type === '核销') {
        const brokentoolids = selectedRowKeys.join(',');
        console.log('brokentoolids', brokentoolids);
        console.log('selectedRowKeys', selectedRowKeys);
        dispatch(postVerify(falsyParamsFilter({
          ...values,
          brokentoolids,
          oid: data?.id,
        })));
      } else if (type === '续订') {
        values = formatPostParams(values);
        // tools:json数据；例如：{"tools":[{"id":"1","price":"100.00","tbid":"1",}]}
        const tools = [...selectedRowKeys].map((item: any) => {
          const target = memoData?.prebook?.tools.find((tool: any) => tool.id === item) || {};
          const { id, price, tbid } = target;
          return { id, price, tbid };
        });
        dispatch(postOrderrenew(falsyParamsFilter({
          ...values,
          pid: data?.id,
          tools: JSON.stringify(tools),
        })));
      } else if (type === EDIT) {
        values = formatPostParams2(values);
        dispatch(getOrdermodify(falsyParamsFilter({
          ...values,
          oid: data?.id,
        })));
      }else { }
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
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys,
  };

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
        {
          type !== EDIT && (
            <Card title='工具箱信息' size='small'>
              <Table
                columns={columns}
                dataSource={memoData?.prebook?.tools || []}
                pagination={false}
                rowKey='id'
                rowSelection={{ ...rowSelection }}
              />
            </Card>
          )
        }

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
                    <Select.Option value='0'>未完成</Select.Option>
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
          {
            type === '充值记录' && (
              <Card title='充值记录' size='small'>
                <Table
                  columns={[
                    {
                      title: '充值时间',
                      dataIndex: 'ctime',
                      key: 'ctime',
                      render: (text: any) => (text ? moment.unix(text).format('YYYY-MM-DD HH:mm:ss') : '-'),
                    },
                    {
                      title: '充值金额',
                      dataIndex: 'amount',
                      key: 'amount',
                    },
                    {
                      title: '充值方式',
                      dataIndex: 'pay_type',
                      key: 'pay_type',
                    },
                    {
                      title: '状态',
                      dataIndex: 'status',
                      key: 'status',
                    },
                  ]}
                  dataSource={rechargeList || []}
                  pagination={false}
                  rowKey='id'
                />
              </Card>
            )
          }
          {
            type === EDIT && (
              <Row gutter={24}>
                <Col span={24}><Form.Item
                  label='付款金额'
                  name='totalpay'
                  initialValue={(memoData?.totalpay || memoData?.totalpay === 0) ? memoData?.totalpay : ''}
                >
                  <InputNumber
                    placeholder='请输入付款金额'
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                </Col>
                <Col span={24}><Form.Item
                  label='开始时间'
                  name='starttime'
                  initialValue={memoData?.starttime || ''}
                >
                  <DatePicker
                    format='YYYY-MM-DD hh:mm:ss'
                    placeholder='请选择'
                    style={{ width: '100%' }}
                    disabled={isView(type)}
                  />
                </Form.Item>
                </Col>
                <Col span={24}><Form.Item
                  label='结束时间'
                  name='endtime'
                  initialValue={memoData?.endtime || ''}
                >
                  <DatePicker
                    format='YYYY-MM-DD hh:mm:ss'
                    placeholder='请选择'
                    style={{ width: '100%' }}
                    disabled={isView(type)}
                  />
                </Form.Item>
                </Col>
                <Col span={24}><Form.Item
                  label='状态'
                  name='ostatus:'
                  initialValue={memoData?.ostatus || ''}
                >
                  <Select
                    placeholder='请选择'
                    disabled={isView(type)}
                  >
                    {
                      // eslint-disable-next-line max-len
                      Array.from(O_STATUS_MAP).map(([key, value]) => <Select.Option value={key} key={key}>{value}</Select.Option>)
                    }
                  </Select>
                </Form.Item>
                </Col>
              </Row>
            )
          }
        </Form>
      </Space>
    </Modal>
  );
}

export default MainModal;
