import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Input, InputNumber, DatePicker, Col, Button, Descriptions, message, Row, Card, Select } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { EDIT, REVIEW } from 'utils/constants';
import moment from 'moment';
import { selectAllDictMap } from 'store/selectors';
import { useState } from 'react';
import Table, { ColumnsType } from 'antd/lib/table';
import { actions, getExperimentsList, postCreate } from '../slice';
import selectors from '../selectors';
import { ITableItem } from '../types';
import { formatPostParams, formatSearchDetailParams } from '../adapter';
import { getEquipmentbooktimes } from '../services';
import { falsyParamsFilter } from 'utils/filters';

const { useEffect, useMemo } = React;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};

function MainModal() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const mainModal = useSelector(selectors.mainModal);
  const loading = useSelector(selectors.loading);
  const experimentsList = useSelector(selectors.experimentsList);
  const userList = useSelector(selectors.userList);
  const toolsList = useSelector(selectors.toolsList);
  const [bookTimesInfo, setBookTimesInfo] = useState<{
    prebooks: {
      epid: string;
      eptitle: string;
      starttime: string;
      endtime: string;
    }[],
    setting: string,
    unuse: {
      unusedate: string;
      unusetimes: string;
      untype: string;
      epid: string;
    }
  }>(null);
  const { data, type = EDIT, visible = false } = mainModal;

  useEffect(() => {

    if (visible) {
      dispatch(getExperimentsList({ epid: data?.id }));
      form.resetFields();
      form2.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);


  const handleCancel = (): void => {
    dispatch(actions.updateMainModalVisible(false));
  };

  const handleChangeTools = (opt:any) => {
    const f_tools = toolsList.filter(item => opt.includes(item.id))?.map(item => {
      const { id, price, tbid } = item;
      return { id, price, tbid };
    });
    const total = f_tools?.reduce((res:any, cur:any) => {
      const { price } = cur;
      // eslint-disable-next-line no-param-reassign
      res += Number(price);

      return res;
    }, 0);
    console.log('total', total);
    form2.setFieldValue('total', total);
  };

  const handleSearch = () => {
    const params = form.getFieldsValue();
    const formatParams = formatSearchDetailParams({
      ...params,
      epid: data?.id,
    });
    getEquipmentbooktimes(formatParams).then(res => {
      console.log(res);
      if (res.res !== 'succ') {
        message.warning(res?.errdata);
        return;
      }
      const target: any = res?.data;
      setBookTimesInfo(target);
    }).catch(err => {
      message.warning(err.message);
    });
  };
  const handleOk = async (): Promise<void> => {
    const values = await form2.validateFields();
    const f_tools = toolsList.filter(item => values.tools.includes(item.id))?.map(item => {
      const { id, price, tbid } = item;
      return { id, price, tbid };
    });
    const eptotalprice = f_tools?.reduce((res:any, cur:any) => {
      const { price } = cur;
      // eslint-disable-next-line no-param-reassign
      res += Number(price);

      return res;
    }, 0);
    console.log(falsyParamsFilter(formatPostParams({ ...values, tools: JSON.stringify(f_tools), eptotalprice })))
    // return ;
    dispatch(postCreate(falsyParamsFilter(formatPostParams({ ...values, tools: JSON.stringify(f_tools), eptotalprice }))));
  };
  const columns: ColumnsType = [
    {
      title: '设备id',
      dataIndex: 'epid',
      key: 'epid',
      align: 'left',
    },
    {
      title: '设备名称',
      dataIndex: 'eptitle',
      key: 'eptitle',
      align: 'left',
    },
    {
      title: '开始时间',
      dataIndex: 'starttime',
      key: 'starttime',
      align: 'left',
      render: (text: any) => (text ? moment.unix(text).format('YYYY-MM-DD hh:mm:ss') : '-'),
    },
    {
      title: '结束时间',
      dataIndex: 'endtime',
      key: 'endtime',
      align: 'left',
      render: (text: any) => (text ? moment.unix(text).format('YYYY-MM-DD hh:mm:ss') : '-'),
    },
  ];


  return (
    <Modal
      forceRender
      destroyOnClose
      title='新建'
      visible={visible}
      confirmLoading={loading}
      onOk={useDebounceBefore(handleOk)}
      okText='提交数据'
      onCancel={handleCancel}
      width={800}
    >
      <Card title='预约信息'>
        <Form {...formItemLayout} form={form}>
          <Row>
            <Col span={20}>
              <Form.Item name='prebookdate' label='查询日期'>
                <DatePicker
                  format='YYYY-MM-DD'
                  placeholder='请选择'
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button onClick={handleSearch} type='primary'>查询</Button>
            </Col>
          </Row>

        </Form>
        <Descriptions>
          <Descriptions.Item label='可用时间'>{bookTimesInfo?.setting || '-'}</Descriptions.Item>
          <Descriptions.Item label='不可用日期'>{bookTimesInfo?.unuse?.unusedate || '-'}</Descriptions.Item>
          <Descriptions.Item label='不可用时间段'>{bookTimesInfo?.unuse?.unusetimes || '-'}</Descriptions.Item>
        </Descriptions>
        <Table
          bordered
          title={() => <div>预约列表</div>}
          dataSource={bookTimesInfo?.prebooks || []}
          columns={columns}
          rowKey='epid'
          loading={loading}
          size='small'
          scroll={{ y: 400 }}
          pagination={false}
        />
      </Card>
      <div style={{ height: '20px' }} />
      <Card title='创建订单'>


        <Form {...formItemLayout} form={form2} title='创建'>
          <Col span={24}>
            <Form.Item
              label='用户'
              name='uid'
              rules={[{ required: true, message: '必填项' }]}
            >
              <Select
                showSearch
                allowClear
                filterOption={
                  (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {userList.map(item => {
                  const { id, realname, phone } = item;
                  return <Select.Option value={id}>{`${realname}/${phone}`}</Select.Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label='预约人手机号'
              name='uphone'
              rules={[{ required: true, message: '必填项' }]}
            >
              <InputNumber width="100%" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label='订单标题'
              name='title'
              rules={[{ required: true, message: '必填项' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label='设备id'
              name='epid'
              rules={[{ required: true, message: '必填项' }]}
              initialValue={data?.id || ''}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label='实验项目'
              name='eid'
              rules={[{ required: true, message: '必填项' }]}
            >
              <Select
                showSearch
                allowClear
                filterOption={
                  (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {experimentsList.map(item => {
                  const { id, title, des, deposit } = item;
                  return <Select.Option value={item.id}>{`id:${id}/名称:【${title}】`}</Select.Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label='预约开始时间'
              name='starttime'
              rules={[{ required: true, message: '必填项' }]}
            >
              <DatePicker
                format='YYYY-MM-DD HH:mm:ss'
                placeholder='请选择'
                style={{ width: '100%' }}
                showTime
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label='预约截止时间'
              name='endtime'
              rules={[{ required: true, message: '必填项' }]}
            >
              <DatePicker
                format='YYYY-MM-DD HH:mm:ss'
                placeholder='请选择'
                style={{ width: '100%' }}
                showTime
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label='工具'
              name='tools'
              rules={[{ required: true, message: '必填项' }]}
            >
              <Select
                showSearch
                allowClear
                onChange={handleChangeTools}
                mode='multiple'
                filterOption={
                  (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {toolsList.map(item => {
                  const { id, price, tbid, title } = item;
                  return <Select.Option value={id}>{`名称:【${title}】/id:【${id}】`}</Select.Option>;
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label='自定义金额'
              name='total'
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label='备注信息'
              name='remark'
            >
              <Input />
            </Form.Item>
          </Col>
        </Form>
      </Card>
    </Modal>
  );
}

export default MainModal;
