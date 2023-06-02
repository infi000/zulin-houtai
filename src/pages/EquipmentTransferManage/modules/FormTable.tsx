import * as React from 'react';
import { Col, Form, Input, Row, Table, Button, message, Select, DatePicker, Space, Dropdown, Menu, Tag } from 'antd';
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
import { actions, getDataDetail, getDataList, getDel, postExport } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { formatSearchParams } from '../adapter';
import { STATUS_MAP, USE_STATUS_MAP } from '../constants';
import { select } from 'redux-saga/effects';
import moment from 'moment';

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
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[], row: ITableItem[]) => {
    const ids = row.map(item => item.id);
    setSelectedRowKeys(ids);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
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
  const openModalWithOperate = useDebounce((type: OperateType, data?: ITableItem) => {
    dispatch(actions.updateMainModal({
      visible: true,
      type,
    }));
    if (type === VIEW) {
      dispatch(getDataDetail({ id: data?.id }));
    }
  });

  // 导入
  const handleImport = () => {
    const templateId = (dictMaps[EDictMap['业务模块导入模板']])?.tsr_device_dispatch_record;
    dispatch(actions.updateImportModal({
      visible: true,
      data: {
        filesUrl: `/excel/module/template/download/${templateId}`,
        moduleId: `${EExportModuleId['调拨设备记录']}`,
        templateId,
      },
    }));
  };

  // 导出
  const handleExport = (type: '批量' | '结果', ids?: number[]) => {
    if (type === '批量') {
      if (!ids || ids.length === 0) {
        message.warn('当前无选中任何数据，请勾选后再导出！');
        return;
      }
      dispatch(postExport({ condition: JSON.stringify({ ids: ids.join(',') }), moduleId: EExportModuleId['调拨设备记录'] }));

    }
    if (type === '结果') {
      const params = form.getFieldsValue();
      const formatParams = falsyParamsFilter(formatSearchParams({
        ...params,
      }));
      dispatch(postExport({ condition: JSON.stringify(formatParams), moduleId: EExportModuleId['调拨设备记录'] }));
    }
  };

  // 审核
  const handleReview = (type: '批量' | '结果', ids?: number[]) => {
    if (type === '批量') {
      if (!ids || ids.length === 0) {
        message.warn('当前无选中任何数据，请勾选未审核的数据后再审核！');
        return;
      }
      dispatch(actions.updateMainModal({
        visible: true,
        type: 'review',
        data: { ids },
      }));
    }
    if (type === '结果') {
      const params = form.getFieldsValue();
      const formatParams = falsyParamsFilter(formatSearchParams({
        ...params,
      }));
      dispatch(actions.updateMainModal({
        visible: true,
        type: 'review',
        data: { query: formatParams },
      }));
    }
  };

  // 删除
  const handleDel = (data: ITableItem) => {
    const { id } = data;
    dispatch(getDel({ id }));
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const columns: ColumnsType = [
    {
      title: '技术标识号',
      dataIndex: 'tecIdentifyNo',
      key: 'tecIdentifyNo',
      width: 100,
      align: 'left',
    },
    {
      title: '设备编码',
      dataIndex: 'deviceNo',
      key: 'deviceNo',
      width: 100,
      align: 'left',
    },
    {
      title: '设备说明',
      dataIndex: 'deviceSpecification',
      key: 'deviceSpecification',
      width: 100,
      align: 'left',
    },
    {
      title: '规格型号',
      dataIndex: 'specificationsModels',
      key: 'specificationsModels',
      width: 100,
      align: 'left',
    },
    {
      title: '使用状态',
      dataIndex: 'useStatus',
      key: 'useStatus',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => <Tag className={USE_STATUS_MAP.get(text) === '激活' ? 'ant-tag-primary' : ''}>{USE_STATUS_MAP.get(text) || text || '-'}</Tag>,
    },
    {
      title: '调出成本中心',
      dataIndex: 'outCostCenter',
      key: 'outCostCenter',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => (dictMaps[EDictMap['成本中心']])?.[text] || text || '-',
    },
    {
      title: '调出成本中心名称',
      dataIndex: 'outCostCenterDescription',
      key: 'outCostCenterDescription',
      width: 100,
      align: 'left',
    },
    {
      title: '调出月份',
      dataIndex: 'dispatchOutMonth',
      key: 'dispatchOutMonth',
      width: 100,
      align: 'left',
    },
    {
      title: '调入成本中心',
      dataIndex: 'inCostCenter',
      key: 'inCostCenter',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => (dictMaps[EDictMap['成本中心']])?.[text] || text || '-',
    },
    {
      title: '调入成本中心名称',
      dataIndex: 'inCostCenterDescription',
      key: 'inCostCenterDescription',
      width: 100,
      align: 'left',
    },
    {
      title: '净值',
      dataIndex: 'netValue',
      key: 'netValue',
      width: 100,
      align: 'left',
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
      width: 100,
      align: 'left',
      render: (text: any) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 100,
      render: (_value: unknown, row: ITableItem) => (
        <>
          <Auth authCode={authMap.AUTH_DEVICE_DISPATCH_DETAIL}>
            <TableButton onClick={() => openModalWithOperate(VIEW, row)}>查看</TableButton>
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
              <Form.Item name='tecIdentifyNo' label='技术标识号'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='区部描述'
                name='sectionDescription'
              >
                <Select
                  filterOption={
                    (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  showSearch
                  allowClear
                >
                  {
                    objToArray(dictMaps[EDictMap['区部描述']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='deviceSpecification' label='设备说明'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='公司'
                name='company'
              >
                <Select
                  filterOption={
                    (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  showSearch
                  allowClear
                >
                  {
                    objToArray(dictMaps[EDictMap['公司']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              {/* todo  日历中文 */}
              <Form.Item name='dispatchMonth' label='调拨年月'>
                <RangePicker
                  allowClear
                  format='YYYY-MM'
                  picker='month'
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='submitTime' label='提交时间'>
                <RangePicker
                  allowClear
                  format='YYYY-MM-DD'
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </FilterFormWrapper>
      <TableWrapper
        title='设备调拨管理列表'
        isShowTitlePrefixIcon
        btns={(
          <>
            <Auth authCode={authMap.AUTH_DEVICE_DISPATCH_IN}>
              <Button onClick={handleImport}>批量导入</Button>
            </Auth>
            <Auth authCode={authMap.AUTH_DEVICE_DISPATCH_OUT}>
              <Dropdown
                trigger={['click']}
                overlay={(
                  <Menu>
                    <Menu.Item onClick={() => handleExport('结果')}>查询结果导出</Menu.Item>
                    <Menu.Item onClick={() => handleExport('批量', selectedRowKeys)}>勾选导出</Menu.Item>
                  </Menu>
                )}
              >
                <Button>批量导出</Button>
              </Dropdown>
            </Auth>
            <Auth authCode={authMap.AUTH_DEVICE_DISPATCH_SAVE}>
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
          rowSelection={rowSelection}
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
