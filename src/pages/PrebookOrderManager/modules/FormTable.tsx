import * as React from 'react';
import { Col, Form, Input, Row, Table, Button, message, Select, DatePicker } from 'antd';
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
import { actions, getDataList, getDel } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { formatSearchParams } from '../adapter';

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
    dispatch(getDataList(falsyParamsFilter<TSearchParams & IPagination>(formatParams)));
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
  const openModalWithOperate = (type: OperateType, data?: ITableItem) => {
    dispatch(actions.updateMainModal({
      visible: true,
      type,
      data,
    }));
  };

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
    dispatch(getDel({ id: id }));
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const columns: ColumnsType = [
    {
      title: '自增id',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'left',
      fixed: 'left',
    },
    {
      title: '订单号',
      dataIndex: 'orderid',
      key: 'orderid',
      width: 100,
      align: 'left',
    },
    {
      title: '预约用户id',
      dataIndex: 'uid',
      key: 'uid',
      width: 100,
      align: 'left',
    },
    {
      title: '预约id',
      dataIndex: 'bid',
      key: 'bid',
      width: 100,
      align: 'left',
    },
    {
      title: '订单标题',
      dataIndex: 'title',
      key: 'title',
      width: 100,
      align: 'left',
    },
    {
      title: '包含的押金金额',
      dataIndex: 'deposit',
      key: 'deposit',
      width: 100,
      align: 'left',
    },
    {
      title: '总金额',
      dataIndex: 'total',
      key: 'total',
      width: 100,
      align: 'left',
    },
    {
      title: '会员优惠金额',
      dataIndex: 'discount',
      key: 'discount',
      width: 100,
      align: 'left',
    },
    {
      title: '积分抵扣金额',
      dataIndex: 'scorecount',
      key: 'scorecount',
      width: 100,
      align: 'left',
    },
    {
      title: '需要支付金额',
      dataIndex: 'totalpay',
      key: 'totalpay',
      width: 100,
      align: 'left',
    },
    {
      title: '付款用户id',
      dataIndex: 'payuid',
      key: 'payuid',
      width: 100,
      align: 'left',
    },
    {
      title: '父订单id',
      dataIndex: 'poid',
      key: 'poid',
      width: 100,
      align: 'left',
    },
    {
      title: '0已下单未支付，1已支付未核销，2完成，3关闭',
      dataIndex: 'ostatus',
      key: 'ostatus',
      width: 100,
      align: 'left',
    },
    {
      title: '订单创建时间',
      dataIndex: 'ctime',
      key: 'ctime',
      width: 100,
      align: 'left',
    },
    {
      title: '更新时间',
      dataIndex: 'uptime',
      key: 'uptime',
      width: 100,
      align: 'left',
    },
    {
      title: '状态，1正常',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'left',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 100,
      render: (_value: unknown, row: ITableItem) => (
        <>
          <Auth authCode={null}>
            <TableButton onClick={() => openModalWithOperate(VIEW, row)}>查看</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton onClick={() => openModalWithOperate(EDIT, row)}>编辑</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton isWrapperConfirm onClick={() => handleDel(row)}>删除</TableButton>
          </Auth>
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
              <Form.Item name='orderid' label='订单号'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='uid' label='预约用户id'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='bid' label='预约id'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='title' label='订单标题'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='deposit' label='包含的押金金额'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='total' label='总金额'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='discount' label='会员优惠金额'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='scorecount' label='积分抵扣金额'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='totalpay' label='需要支付金额'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='payuid' label='付款用户id'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='poid' label='父订单id'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='ctime' label='订单创建时间'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='uptime' label='更新时间'>
                <Input allowClear placeholder='请输入' />
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