import * as React from 'react';
import { Col, Form, Input, Row, Table, Button, message, Tooltip, Select, DatePicker, Tag, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { useSelector, useDispatch } from 'react-redux';
import { falsyParamsFilter } from 'utils/filters';
import { baseTableConf } from 'configs/base.conf';
import FilterFormWrapper from 'components/FilterFormWrapper';
import TableWrapper from 'components/TableWrapper';
import TableButton from 'components/TableButton';
import OperateLog from 'components/OperateLog';
import { selectAllDictMap } from 'store/selectors';
import { CREATE, EDictMap, EExportModuleId, EDIT, VIEW } from 'utils/constants';
import Auth from 'containers/AuthController';
import authMap from 'configs/auth.conf';
import { empty } from 'components/TableEmpty';
import { objToArray } from 'utils/utils';
import { actions, getDataList, getDel, postStatistic } from '../slice';
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
    const templateId = (dictMaps[EDictMap['业务模块导入模板']])?.tsr_device_info;
    dispatch(actions.updateImportModal({
      visible: true,
      data: {
        filesUrl: `/excel/module/template/download/${templateId}`,
        moduleId: `${EExportModuleId['设备信息']}`,
        templateId,
        title: '批量导入',
      },
    }));
  };

  // 批量更新
  const handleImportEdit = () => {
    const templateId = (dictMaps[EDictMap['业务模块导入模板']])?.tsr_device_info_update;
    dispatch(actions.updateImportModal({
      visible: true,
      data: {
        filesUrl: `/excel/module/template/download/${templateId}`,
        moduleId: `${EExportModuleId['设备信息']}`,
        templateId,
        title: '批量更新',
      },
    }));
  };

  // 删除
  const handleDel = (data: ITableItem) => {
    const { id } = data;
    dispatch(getDel({ id: id }));
  };

  // 统计
  const handleStatistic = () => {
    dispatch(postStatistic());
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const columns: ColumnsType = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'left',
    },
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
      title: '区部描述',
      dataIndex: 'sectionDescription',
      key: 'sectionDescription',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => (dictMaps[EDictMap['区部描述']])?.[text] || text || '-',
    },
    {
      title: '调拨联系人工号',
      dataIndex: 'transferContactNo',
      key: 'transferContactNo',
      width: 120,
      align: 'left',
    },
    {
      title: '调拨联系人姓名',
      dataIndex: 'transferContactName',
      key: 'transferContactName',
      width: 120,
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
      title: '设备状态（SAP）',
      dataIndex: 'deviceStatus',
      key: 'deviceStatus',
      width: 200,
      align: 'left',
      render: (t: string, record: ITableItem) => {
        const textArr = t?.split(';');
        if (t && textArr && Array.isArray(textArr)) {
          return textArr.map(item => <Tag>{(dictMaps[EDictMap['设备状态sap']])?.[item] || item || '-'}</Tag>);
        }
        return '-';
      },
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
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
      title: '负责人',
      dataIndex: 'principal',
      key: 'principal',
      width: 100,
      align: 'left',
    },
    {
      title: '职位',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      width: 120,
      align: 'left',
      render: (text: any, record: ITableItem) => (dictMaps[EDictMap['职位']])?.[text] || text || '-',
    },
    {
      title: '负责人名称',
      dataIndex: 'principalName',
      key: 'principalName',
      width: 100,
      align: 'left',
    },
    {
      title: '购置价值(元)',
      dataIndex: 'acquisitionValue',
      key: 'acquisitionValue',
      width: 100,
      align: 'right',
    },
    {
      title: '净值(元)',
      dataIndex: 'netValue',
      key: 'netValue',
      width: 100,
      align: 'right',
    },
    {
      title: '资产原值(元)',
      dataIndex: 'initialAssetValue',
      key: 'initialAssetValue',
      width: 100,
      align: 'right',
    },
    {
      title: '公司',
      dataIndex: 'company',
      key: 'company',
      width: 150,
      align: 'left',
      render: (text: any, record: ITableItem) => (dictMaps[EDictMap['公司']])?.[text] || text || '-',
    },
    {
      title: '公司描述',
      dataIndex: 'companyIntroduction',
      key: 'companyIntroduction',
      width: 100,
      align: 'left',
    },
    {
      title: '成本中心',
      dataIndex: 'costCenter',
      key: 'costCenter',
      width: 150,
      align: 'left',
      render: (text: any, record: ITableItem) => (dictMaps[EDictMap['成本中心']])?.[text] || text || '-',
    },
    {
      title: '成本中心描述',
      dataIndex: 'costCenterDescription',
      key: 'costCenterDescription',
      width: 100,
      align: 'left',
    },
    {
      title: '购置日期',
      dataIndex: 'acquisitionDate',
      key: 'acquisitionDate',
      width: 100,
      align: 'left',
    },
    {
      title: '构造类型',
      dataIndex: 'structuralType',
      key: 'structuralType',
      width: 100,
      align: 'left',
      // render: (text: any, record: ITableItem) => (dictMaps[EDictMap['构造类型']])?.[text] || text || '-',
    },
    {
      title: '构造类型描述',
      dataIndex: 'structuralTypeDescription',
      key: 'structuralTypeDescription',
      width: 100,
      align: 'left',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 120,
      fixed: 'right',
      render: (_value: unknown, row: ITableItem) => (
        <>
          <Auth authCode={authMap.AUTH_DEVICE_GETDETAIL}>
            <TableButton onClick={() => openModalWithOperate(VIEW, row)}>查看</TableButton>
          </Auth>
          <Auth authCode={authMap.AUTH_DEVICE_EDIT}>
            <TableButton onClick={() => openModalWithOperate(EDIT, row)}>编辑</TableButton>
          </Auth>
          <OperateLog logId={row.id} tableName='tsr_device_info' />
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
              <Form.Item name='tecIdentifyNo' label={<Tooltip title='技术标识号'>技术标识号</Tooltip>}>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='sectionDescription' label={<Tooltip title='区部描述'>区部描述</Tooltip>}>
                <Select
                  showSearch
                  filterOption={
                    (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
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
              <Form.Item name='transferContactNo' label={<Tooltip title='调拨联系人工号'>调拨联系人工号</Tooltip>}>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='transferContactName' label={<Tooltip title='调拨联系人姓名'>调拨联系人姓名</Tooltip>}>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='deviceStatusQuery' label={<Tooltip title='设备状态（SAP）'>设备状态（SAP）</Tooltip>}>
                <Select
                  showSearch
                  filterOption={
                    (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear
                  mode='multiple'
                >
                  {
                    objToArray(dictMaps[EDictMap['设备状态sap']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='deviceSpecification' label={<Tooltip title='设备说明'>设备说明</Tooltip>}>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='specificationsModels' label={<Tooltip title='规格型号'>规格型号</Tooltip>}>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='company' label={<Tooltip title='公司'>公司</Tooltip>}>
                <Select
                  showSearch
                  filterOption={
                    (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
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
              <Form.Item name='costCenter' label={<Tooltip title='成本中心'>成本中心</Tooltip>}>
                <Select
                  showSearch
                  filterOption={
                    (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear
                >
                  {
                    objToArray(dictMaps[EDictMap['成本中心']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='acquisitionDate' label={<Tooltip title='购置日期'>购置日期</Tooltip>}>
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
        title='设备信息管理列表'
        isShowTitlePrefixIcon
        btns={(
          <>
            <Auth authCode={authMap.AUTH_DEVICE_IMPORT}>
              <Button type='primary' onClick={handleImport}>批量导入</Button>
            </Auth>
            <Auth authCode={authMap.AUTH_DEVICE_IMPORT}>
              <Button type='primary' onClick={handleImportEdit}>批量更新</Button>
            </Auth>
            <Auth authCode={authMap.AUTH_DEVICE_SAVE}>
              <Button type='primary' onClick={() => openModalWithOperate(CREATE)}>新建</Button>
            </Auth>
            <Auth authCode={1000000000000}>
              <Popconfirm
                title='是否闲置设备信息已统计完成？'
                onConfirm={handleStatistic}
                okText="是"
                cancelText="否"
              >
                <Button type='primary'>统计</Button>
              </Popconfirm>
            </Auth>
          </>
        )}
      >
        <Table
          dataSource={tableData || []}
          columns={columns}
          rowKey='tecIdentifyNo'
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
