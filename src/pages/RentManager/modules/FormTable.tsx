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
import { CARD_TYPE_MAP, STATUS_MAP } from '../constants';

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
  const openModalWithOperate = useDebounce(async (type: OperateType, data?: ITableItem) => {
    dispatch(actions.updateMainModal({
      visible: true,
      type,
      data,
    }));
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
    dispatch(getDel({ cid: id }));
  };
  // 上线
  const handleOnline = (data: ITableItem) => {
    const { id } = data;
    dispatch(getOnline({ cid: id }));
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const columns: ColumnsType = [
    {
      title: '订单号',
      dataIndex: 'orderid',
      key: 'orderid',
      width: 100,
      align: 'left',
      fixed: 'left',
    },
    {
      title: '产品名称',
      dataIndex: 'title',
      key: 'title',
      width: 100,
      align: 'left',
    },
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
      width: 100,
      align: 'left',
    },
    {
      title: 'verify_time',
      dataIndex: 'verify_time',
      key: 'verify_time',
      align: 'left',
    },
    {
      title: '租金',
      dataIndex: 'deposit',
      key: 'deposit',
      align: 'left',
    },
    {
      title: '押金',
      dataIndex: 'pricetotal',
      key: 'pricetotal',
      align: 'left',
    },
    {
      title: '产品图片',
      dataIndex: 'fpath',
      key: 'fpath',
      width: 100,
      align: 'left',
      render: (text: string) => <Image width={50} height={50} src={text} />,
    },
    {
      title: '承租人',
      dataIndex: 'uname',
      key: 'uname',
      width: 100,
      align: 'left',
    },
    {
      title: 'create_time',
      dataIndex: 'create_time',
      key: 'create_time',
      width: 100,
      align: 'left',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'left',
      render: (text: string) => STATUS_MAP.get(text),
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 200,
      render: (_value: unknown, row: ITableItem) => (
        <>
          <Auth authCode={null}>
            <TableButton onClick={() => openModalWithOperate(EDIT, row)}>核销</TableButton>
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
              <Form.Item name='uid' label='用户id'>
                <Input placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='phone' label='用户手机'>
                <Input placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='gid' label='商品id'>
                <Input placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='title' label='商品标题'>
                <Input placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='orderid' label='订单号'>
                <Input placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='status' label='状态'>
                <Select allowClear placeholder='请选择'>
                  {
                    Array.from(STATUS_MAP).map(([key, value]) => (
                      <Select.Option key={key} value={key}>{value}</Select.Option>
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
            {/* <Auth authCode={null}>
              <Button type='primary' onClick={handleImport}>导入</Button>
            </Auth>
            <Auth authCode={null}>
              <Button type='primary' onClick={() => openModalWithOperate(CREATE)}>新建</Button>
            </Auth> */}
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