import * as React from 'react';
import { Col, Form, Input, Row, Table, Button, Tooltip, Select, DatePicker } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { useSelector, useDispatch } from 'react-redux';
import { falsyParamsFilter } from 'utils/filters';
import { baseTableConf } from 'configs/base.conf';
import FilterFormWrapper from 'components/FilterFormWrapper';
import TableWrapper from 'components/TableWrapper';
import TableButton from 'components/TableButton';
import { CREATE, EDictMap, EDIT, EExportModuleId, VIEW, yesOrNo } from 'utils/constants';
import Auth from 'containers/AuthController';
import authMap from 'configs/auth.conf';
import { objToArray } from 'utils/utils';
import DistrictsComponent from 'components/DistrictsComponent';
import { empty } from 'components/TableEmpty';
import { selectAllDictMap } from 'store/selectors';
import { actions, getDataList, getDel, postStatus } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { statusYesOrNo } from '../constants';
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

  // 删除
  const handleDel = (data: ITableItem) => {
    const { id } = data;
    dispatch(getDel({ id }));
  };

  // 导入
  const handleImport = () => {
    const templateId = (dictMaps[EDictMap['业务模块导入模板']])?.tsr_place_info;
    dispatch(actions.updateImportModal({
      visible: true,
      data: {
        filesUrl: `/excel/module/template/download/${templateId}`,
        moduleId: `${EExportModuleId['场地信息']}`,
        templateId,
      },
    }));
  };

  // 生效失效
  const handleStatus = (data: ITableItem, status: number) => {
    const { id } = data;
    dispatch(postStatus({ id, status }));
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
      title: '场地编码',
      dataIndex: 'warehousePlaceCode',
      key: 'warehousePlaceCode',
      width: 100,
      align: 'left',
    },
    {
      title: '仓库编码',
      dataIndex: 'warehouseCode',
      key: 'warehouseCode',
      width: 100,
      align: 'left',
    },
    {
      title: '仓库名称',
      dataIndex: 'warehouseName',
      key: 'warehouseName',
      width: 100,
      align: 'left',
    },
    {
      title: '网点编码',
      dataIndex: 'warehouseSiteCode',
      key: 'warehouseSiteCode',
      width: 100,
      align: 'left',
    },
    {
      title: '网点名称',
      dataIndex: 'warehouseSiteName',
      key: 'warehouseSiteName',
      width: 100,
      align: 'left',
    },
    {
      title: '仓库属性',
      dataIndex: 'warehouseAttribute',
      key: 'warehouseAttribute',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => (dictMaps[EDictMap['仓库属性']])?.[text] || text || '-',
    },
    {
      title: '省/市/区',
      dataIndex: 'warehouseSSQ',
      key: 'warehouseSSQ',
      align: 'left',
      width: 150,
      render: (text: any, record: ITableItem) => {
        const { warehouseProvince, warehouseCity, warehouseCounty } = record;
        return `${warehouseProvince}/${warehouseCity}/${warehouseCounty}`;
      },
    },
    {
      title: '详细地址',
      dataIndex: 'warehouseDetailAddress',
      key: 'warehouseDetailAddress',
      width: 150,
      align: 'left',
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
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 130,
      render: (_value: unknown, row: ITableItem) => {
        const s = row.status === 1 ? 0 : 1;
        return (
          <>
            <Auth authCode={authMap.AUTH_PLACE_GETDETAIL}>
              <TableButton onClick={() => openModalWithOperate(VIEW, row)}>查看</TableButton>
            </Auth>
            <Auth authCode={authMap.AUTH_PLACE_EDIT}>
              <TableButton onClick={() => openModalWithOperate(EDIT, row)}>编辑</TableButton>
            </Auth>
            <Auth authCode={authMap.AUTH_PLACE_VALID}>
              <TableButton isWrapperConfirm onClick={() => handleStatus(row, s)}>{statusYesOrNo.get(s)}</TableButton>
            </Auth>
          </>
        );
      },
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
              <Form.Item name='warehousePlaceCode' label={<Tooltip title='场地编码'>场地编码</Tooltip>}>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='warehouseCode' label={<Tooltip title='仓库编码'>仓库编码</Tooltip>}>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='warehouseName' label={<Tooltip title='仓库名称'>仓库名称</Tooltip>}>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='warehouseAttribute' label={<Tooltip title='仓库属性'>仓库属性</Tooltip>}>
                <Select
                  filterOption={
                    (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear
                >
                  {
                    objToArray(dictMaps[EDictMap['仓库属性']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name='warehouseSSQ'
                label={<Tooltip title='省市区'>省市区</Tooltip>}
              >
                <DistrictsComponent
                  lastLevel='district'
                  mode='multi'
                  // internation
                  type='tree'
                  hasAll={false}
                  otherOptions={{ allowClear: true }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </FilterFormWrapper>
      <TableWrapper
        title='场地信息管理列表'
        isShowTitlePrefixIcon
        btns={(
          <>
            <Auth authCode={authMap.AUTH_PLACE_IMPORT}>
              <Button type='primary' onClick={handleImport}>导入</Button>
            </Auth>
            <Auth authCode={authMap.AUTH_PLACE_SAVE}>
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
