import * as React from 'react';
import { Col, Form, Input, Row, Table, Button, Tooltip, Select, DatePicker } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { useSelector, useDispatch } from 'react-redux';
import { falsyParamsFilter } from 'utils/filters';
import { baseTableConf } from 'configs/base.conf';
import FilterFormWrapper from 'components/FilterFormWrapper';
import TableWrapper from 'components/TableWrapper';
import TableButton from 'components/TableButton';
import { CREATE, EDIT, VIEW } from 'utils/constants';
import Auth from 'containers/AuthController';
import { empty } from 'components/TableEmpty';
import authMap from 'configs/auth.conf';
import { actions, getDataList, getDel } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { statusYesOrNo } from '../constants';
import { getQueryString } from 'utils/utils';
import { useDidRecover } from 'react-router-cache-route';

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
  const dispatch = useDispatch();
  const dictType = getQueryString('dictType');

  // 查询
  const handleSearch = (additionalParams: Dictionary<TAdditionalParams> = {}) => {
    const params = form.getFieldsValue();
    dispatch(getDataList(falsyParamsFilter<TSearchParams & IPagination>({
      ...params,
      pageNum: 1, // 默认所有的检索也都重新从1开始检索
      pageSize: pagination.pageSize,
      ...additionalParams,
    })));
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
    const f_data:any = data || { dictType };
    dispatch(actions.updateMainModal({
      visible: true,
      type,
      data: f_data,
    }));
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
  useDidRecover(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const columns: ColumnsType = [
    {
      title: '编码',
      dataIndex: 'dictCode',
      key: 'dictCode',
      width: 100,
      align: 'left',
    },
    {
      title: '字典标签',
      dataIndex: 'dictLabel',
      key: 'dictLabel',
      width: 100,
      align: 'left',
    },
    {
      title: '字典键值',
      dataIndex: 'dictValue',
      key: 'dictValue',
      width: 100,
      align: 'left',
    },
    {
      title: '字典类型',
      dataIndex: 'dictType',
      key: 'dictType',
      width: 100,
      align: 'left',
    },
    {
      title: '字典排序',
      dataIndex: 'dictSort',
      key: 'dictSort',
      width: 100,
      align: 'right',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => statusYesOrNo.get(text) || text,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
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
            <TableButton onClick={() => openModalWithOperate(EDIT, row)}>编辑</TableButton>
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
          <Row gutter={[24, 0]}>
            <Col span={6}>
              <Form.Item name='dictType' label={<Tooltip title='字典类型'>字典类型</Tooltip>} initialValue={dictType || ''}>
                <Input allowClear placeholder='请输入' disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='dictLabel' label={<Tooltip title='字典标签'>字典标签</Tooltip>}>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='status' label={<Tooltip title='状态'>状态</Tooltip>}>
                <Select allowClear>
                  {
                    Array.from(statusYesOrNo).map((item: any) => (
                      <Select.Option value={item[0]} key={item[0]}>{item[1]}</Select.Option>
                    ))
                  }
                </Select>
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
              <Button type='primary' onClick={() => openModalWithOperate(CREATE)}>新建</Button>
            </Auth>
          </>
        )}
      >
        <Table
          dataSource={tableData || []}
          columns={columns}
          rowKey='id'
          loading={loading}
          locale={empty}
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
