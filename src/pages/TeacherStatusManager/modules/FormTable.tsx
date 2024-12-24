import * as React from 'react';
import { Col, Form, Input, Row, Table, Button, Image, Select, DatePicker } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { useSelector, useDispatch } from 'react-redux';
import { falsyParamsFilter } from 'utils/filters';
import { baseTableConf } from 'configs/base.conf';
import FilterFormWrapper from 'components/FilterFormWrapper';
import TableWrapper from 'components/TableWrapper';
import TableButton from 'components/TableButton';
import { selectAllDictMap } from 'store/selectors';
import { CREATE, EDictMap, EExportModuleId, EDIT, VIEW, STATUS } from 'utils/constants';
import Auth from 'containers/AuthController';
import authMap from 'configs/auth.conf';
import { objToArray } from 'utils/utils';
import { actions, getDataDetail, getDataList, getDel, getOnline } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { formatSearchParams } from '../adapter';
import moment from 'moment';
import useDebounce from 'hooks/useDebounce';
import { getQueryString } from 'utils/utils';
import { STATUS_MAP } from '../constants';

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
  const teaid = getQueryString('teaid');

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
  const openModalWithOperate = useDebounce(async (type: OperateType, data?: ITableItem) => {
    dispatch(actions.updateMainModal({
      visible: true,
      type,
      data,
    }));
  });

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const columns: ColumnsType = [
    {
      title: '开始时间',
      dataIndex: 'starttimestr',
      key: 'starttimestr',
      width: 100,
      fixed: 'left',
    },
    {
      title: '结束时间',
      dataIndex: 'endtimestr',
      key: 'endtimestr',
      width: 100,
      align: 'left',
    },
    {
      title: '小分类id',
      dataIndex: 'cid',
      key: 'cid',
      width: 100,
      align: 'left',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'left',
      render: (str) => {
        //0空闲，1预约，2休假
        const res = STATUS_MAP[`${str}`] || str || '-';
        return res;
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (_,row) => {
        return <>
          <TableButton onClick={() => openModalWithOperate('edit',row)}>修改</TableButton>
        </>
      }
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
              <Form.Item name='teaid' label='老师id' initialValue={teaid}>
                <Input allowClear placeholder='请输入' disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='开始时间'
                name='startdate'
              >
                <DatePicker
                  format='YYYY-MM-DD'
                  placeholder='请选择'
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='结束时间'
                name='enddate'
              >
                <DatePicker
                  format='YYYY-MM-DD'
                  placeholder='请选择'
                  style={{ width: '100%' }}
                />
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
            {/* <Auth authCode={null}>
              <Button type='primary' onClick={handleImport}>导入</Button>
            </Auth> */}
            <Auth authCode={null}>
              <Button type='primary' onClick={() => openModalWithOperate(CREATE)}>新增状态</Button>
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
