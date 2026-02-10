import * as React from 'react';
import { Col, Form, Input, Row, Table, Button, Image, Select, DatePicker, Popconfirm, Modal, InputNumber } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { useSelector, useDispatch } from 'react-redux';
import { falsyParamsFilter } from 'utils/filters';
import { baseTableConf } from 'configs/base.conf';
import FilterFormWrapper from 'components/FilterFormWrapper';
import TableWrapper from 'components/TableWrapper';
import TableButton from 'components/TableButton';
import { selectAllDictMap } from 'store/selectors';
import { CREATE, EDictMap, EExportModuleId, EDIT, VIEW } from 'utils/constants';
import Auth from 'containers/AuthController';
import authMap from 'configs/auth.conf';
import { objToArray } from 'utils/utils';
import useDebounce from 'hooks/useDebounce';
import moment from 'moment';
import { actions, getDataDetail, getDataList, getDel, getOnline, getTa, getOrderExport, postRefund, getRechargeList } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { formatSearchParams } from '../adapter';
import { O_STATUS_MAP } from '../constants';

import { message } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { useEffect, useRef, useState, useMemo } = React;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

function FormTable() {
  const [form] = Form.useForm();
  const tableData = useSelector(selectors.tableData);
  const pagination = useSelector(selectors.pagination);
  const refresh = useSelector(selectors.refresh);
  const loading = useSelector(selectors.loading);
  const dictMaps = useSelector(selectAllDictMap);
  const dispatch = useDispatch();

  // 查询
  const handleSearch = (additionalParams: Dictionary<TAdditionalParams> = {}) => {
    const params = form.getFieldsValue();
    const formatParams = formatSearchParams({
      ...params,
      pageNum: 1, // 默认所有的检索也都重新从1开始检索
      pageSize: pagination.pageSize,
      ...additionalParams,
    });
    dispatch(getDataList(falsyParamsFilter(formatParams)));
  };

  // 重置
  const handleReset = () => {
    form.resetFields();
  };

  // 翻页
  const handleChangePage = (pageNum: number, pageSize: number) => {
    handleSearch({ pageNum, pageSize });
  };

  // 新建、编辑、查看
  const openModalWithOperate = useDebounce(async (type: OperateType, data?: ITableItem) => {
    if (type !== CREATE) {
      const { id } = data;
      await dispatch(getDataDetail({ oid: id, type }));
    } else {
      dispatch(actions.updateMainModal({
        visible: true,
        type,
      }));
    }
  });

  // 导入
  const handleImport = () => {
    const templateId = (dictMaps[EDictMap['业务模块导入模板']])?.字典名;
    dispatch(actions.updateImportModal({
      visible: true,
      data: {
        filesUrl: `/excel/module/template/download/${templateId}`,
        moduleId: '1',
        templateId,
      },
    }));
  };

  // 删除
  const handleDel = (data: ITableItem) => {
    const { id } = data;
    dispatch(getDel({ oid: id }));
  };
  // 上线
  const handleOnline = (data: ITableItem) => {
    const { id } = data;
    dispatch(getOnline({ oid: id }));
  };
  // ta
  const handleTa = (data: ITableItem) => {
    const { id } = data;
    dispatch(getTa({ oid: id }));
  };

  // 导出订单列表
  const handleExport = async () => {
    const params = form.getFieldsValue();
    const formatParams = formatSearchParams(params);
    Modal.confirm({
      title: '确认导出',
      content: '是否确认导出订单列表？',
      onOk: async () => {
        dispatch(getOrderExport(falsyParamsFilter<TSearchParams>(formatParams)));
      },
    });
  };

  // 退款
  const handleRefund = (data: ITableItem) => {
    const { id } = data;
    let refundAmount = '';
    Modal.confirm({
      title: '退款',
      content: (
        <div>
          <p>请输入退款金额：</p>
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            placeholder="请输入退款金额"
            onChange={(value) => { refundAmount = String(value); }}
          />
        </div>
      ),
      onOk: () => {
        if (!refundAmount || parseFloat(refundAmount) <= 0) {
          message.error('请输入有效的退款金额');
          return Promise.reject();
        }
        return dispatch(postRefund({ oid: String(id), amount: refundAmount, refund_type: 'original' }));
      },
    });
  };

  // 充值记录
  const handleRechargeRecords = (data: ITableItem) => {
    const { uid } = data;
    dispatch(actions.updateMainModal({
      visible: true,
      type: '充值记录',
      data: { uid },
    }));
    // 获取充值记录列表
    dispatch(getRechargeList({ uid, pageNum: 1, pageSize: 100 }));
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  /**
   * {
  id: number; // 自增id
  orderid: string; // 订单号
  uid: string; // 预约用户id
  uname: string; // 预约用户名称
  title: string; // 订单标题
  desposit: string; // 包含的押金金额
  total: string; // 总金额
  discount: string; // 会员优惠金额
  scorecount: string; // 积分抵扣金额
  totalpay: string; // 需要支付金额
  ostatus: string; // :0已下单未支付， 1已支付未核销，2核销完成，3关闭
  status: string; // 状态，1正常
  ctime: string; // 订单创建时间
  uptime: string; // 更新时间
}
   */
  const columns: ColumnsType = [
    {
      key: 'id ',
      title: '自增id',
      dataIndex: 'id',
      width: 100,
    },
    {
      key: 'orderid ',
      title: '订单号',
      dataIndex: 'orderid',
      width: 100,
    },
    {
      key: 'uid ',
      title: '预约用户id',
      dataIndex: 'uid',
      width: 100,
    },
    {
      key: 'uname ',
      title: '预约用户名称',
      dataIndex: 'uname',
      width: 100,
    },
    {
      key: 'uphone ',
      title: '预约电话',
      dataIndex: 'uphone',
      width: 100,
    },
    {
      key: 'remark ',
      title: '备注',
      dataIndex: 'remark',
      width: 100,
    },
    {
      key: 'title ',
      title: '订单标题',
      dataIndex: 'title',
      width: 100,
    },
    {
      key: 'desposit ', title: '包含的押金金额', dataIndex: 'desposit', width: 100,
    },
    {
      key: 'total ', title: '总金额', dataIndex: 'total', width: 100,
    },
    {
      key: 'discount ', title: '会员优惠金额', dataIndex: 'discount', width: 100,
    },
    {
      key: 'scorecount ', title: '积分抵扣金额', dataIndex: 'scorecount', width: 100,
    },
    {
      key: 'totalpay ', title: '需要支付金额', dataIndex: 'totalpay', width: 100,
    },
    {
      key: 'ostatus ',
      title: '状态',
      dataIndex: 'ostatus',
      width: 100,
      render: (text: any) => (text ? O_STATUS_MAP.get(text) || '-' : '-'),
    },
    {
      key: 'ctime ',
      title: '订单创建时间',
      dataIndex: 'ctime',
      width: 100,
      render: (text: any) => (text ? moment.unix(text).format('YYYY-MM-DD hh:mm:ss') : '-'),

    },
    {
      key: 'starttime ',
      title: '开始时间',
      dataIndex: 'starttime',
      width: 100,
      // render: (text: any) => (text ? moment.unix(text).format('YYYY-MM-DD hh:mm:ss') : '-'),
    },
    {
      key: 'endtime ',
      title: '结束时间',
      dataIndex: 'endtime',
      width: 100,
      // render: (text: any) => (text ? moment.unix(text).format('YYYY-MM-DD hh:mm:ss') : '-'),
    },
    {
      key: 'uptime ',
      title: '更新时间',
      dataIndex: 'uptime',
      width: 100,
      render: (text: any) => (text ? moment.unix(text).format('YYYY-MM-DD hh:mm:ss') : '-'),
    },

    {
      key: 'operate',
      title: '操作',
      width: 200,
      render: (_value: unknown, row: ITableItem) => (
        <>
          <Auth authCode={null}>
            <TableButton onClick={() => openModalWithOperate('核销', row)}>核销</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton onClick={() => openModalWithOperate('续订', row)}>续订</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton onClick={() => openModalWithOperate('继续支付', row)}>继续支付</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton onClick={() => openModalWithOperate(EDIT, row)}>编辑</TableButton>
          </Auth>
          <Auth authCode={null}>
            <Popconfirm
              title="是否铊币支付"
              onConfirm={() => handleTa(row)}
              okText="是"
              cancelText="否"
            >
              <TableButton>铊币支付</TableButton>
            </Popconfirm>
          </Auth>
          <Auth authCode={null}>
            <TableButton onClick={() => handleRefund(row)}>退款</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton onClick={() => handleRechargeRecords(row)}>充值记录</TableButton>
          </Auth>
          {/* <Auth authCode={null}>
            <TableButton isWrapperConfirm onClick={() => handleDel(row)}>下线</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton isWrapperConfirm onClick={() => handleOnline(row)}>上线</TableButton>
          </Auth> */}
        </>
      ),
    },
  ];

  return (
    <>
      <FilterFormWrapper
        onSearch={() => handleSearch()}
        onReset={() => handleReset()}
      >
        <Form {...formItemLayout} form={form}>
          <Row>
            <Col span={6}>
              <Form.Item name='companyid' label='总公司id'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='title' label='工具名称'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='thumbinal' label='预览图'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='des' label='工具使用说明'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='price' label='工具租赁价格，单位元'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='tbid' label='所属工具箱id'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='ctime' label='工具创建时间'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='phone' label='手机号'>
                <Input allowClear placeholder='请输入手机号' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </FilterFormWrapper>
      <TableWrapper
        title='列表'
        isShowTitlePrefixIcon
        btns={(
          <>
            <Auth authCode={null}>
              <Button type='primary' onClick={handleImport}>导入</Button>
            </Auth>
            <Auth authCode={null}>
              <Button type='primary' onClick={() => openModalWithOperate(CREATE)}>新建</Button>
            </Auth>
            <Auth authCode={null}>
              <Button type='primary' onClick={handleExport}>导出订单列表</Button>
            </Auth>
          </>
        )}
      >
        <Table
          bordered
          dataSource={tableData || []}
          columns={columns}
          rowKey='id'
          loading={loading}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            current: pagination.pageNum,
            total: pagination.total,
            pageSize: pagination.pageSize,
            pageSizeOptions: baseTableConf.pageSizeOptions,
            onChange: handleChangePage,
            showTotal: (total: number) => (`共${total}项`),
          }}
        />
      </TableWrapper>
    </>
  );
}

export default FormTable;
