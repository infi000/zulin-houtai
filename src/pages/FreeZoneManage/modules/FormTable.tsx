/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-04-11 14:41:09
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-05-29 10:39:16
 * @FilePath: /ot-resources/src/pages/FreeZoneManage/modules/FormTable.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as React from 'react';
import { Col, Form, Input, Row, Table, Button, Tooltip, Select, DatePicker, InputNumber } from 'antd';
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
import { empty } from 'components/TableEmpty';
import { selectAllDictMap } from 'store/selectors';
import { objToArray } from 'utils/utils';
import moment from 'moment';
import { actions, getDataList, getDel, getWarehouseAll, postExport, postStatus } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { EStatus, STATUS_MAP } from '../constants';
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

  // 导出
  const handleExport = () => {
    const params = form.getFieldsValue();
    const formatParams = formatSearchParams({
      ...params,
    });
    dispatch(postExport(falsyParamsFilter<TSearchParams>(formatParams)));
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
    const templateId = (dictMaps[EDictMap['业务模块导入模板']])?.tsr_idle_zone;
    dispatch(actions.updateImportModal({
      visible: true,
      data: {
        filesUrl: `/excel/module/template/download/${templateId}`,
        moduleId: `${EExportModuleId['闲置场地信息']}`,
        templateId,
      },
    }));
  };

  // 审批
  const handleStatus = (data: ITableItem, status: number) => {
    const { id } = data;
    dispatch(postStatus({ id, status }));
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    dispatch(getWarehouseAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType = [
    {
      title: '场地维度编码',
      dataIndex: 'warehousePlaceCode',
      key: 'warehousePlaceCode',
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
      title: '仓库编码',
      dataIndex: 'warehouseCode',
      key: 'warehouseCode',
      width: 100,
      align: 'left',
    },
    {
      title: '仓库类型',
      dataIndex: 'warehouseType',
      key: 'warehouseType',
      width: 100,
      align: 'left',
      render: (text: any) => (dictMaps[EDictMap['仓库类型']])?.[text] || text || '-',
    },
    {
      title: '闲置区位',
      dataIndex: 'idleZone',
      key: 'idleZone',
      width: 100,
      align: 'left',
    },
    {
      title: '闲置面积(㎡)',
      dataIndex: 'idleArea',
      key: 'idleArea',
      width: 100,
      align: 'right',
    },
    {
      title: '闲置结束时间',
      dataIndex: 'idleEndTime',
      key: 'idleEndTime',
      width: 100,
      align: 'left',
    },
    {
      title: '是否可售',
      dataIndex: 'sale',
      key: 'sale',
      width: 100,
      align: 'left',
      render: (text: any) => yesOrNo.get(text) || text,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'left',
      render: (text: any) => STATUS_MAP.get(text) || text,
    },
    {
      title: '适用货物',
      dataIndex: 'applicableGoods',
      key: 'applicableGoods',
      width: 100,
      align: 'left',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 100,
      align: 'left',
    },
    {
      title: '所属BU',
      dataIndex: 'warehouseBu',
      key: 'warehouseBu',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => (dictMaps[EDictMap['所属BU']])?.[text] || text || '-',
    },
    {
      title: '大区',
      dataIndex: 'warehouseRegion',
      key: 'warehouseRegion',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => (dictMaps[EDictMap['仓库所属大区']])?.[text] || text || '-',
    },
    {
      title: '业务区',
      dataIndex: 'warehouseBusinessArea',
      key: 'warehouseBusinessArea',
      width: 100,
      align: 'left',
      render: (text: any) => (dictMaps[EDictMap['业务区']])?.[text] || text || '-',
    },
    {
      title: '区域中心',
      dataIndex: 'warehouseRegionalCenter',
      key: 'warehouseRegionalCenter',
      width: 100,
      align: 'left',
      render: (text: any) => (dictMaps[EDictMap['区域中心']])?.[text] || text || '-',
    },
    {
      title: '省/市/区',
      dataIndex: 'warehouseSSQ',
      key: 'warehouseSSQ',
      width: 200,
      align: 'left',
      render: (text: any, record: ITableItem) => {
        const { warehouseProvince, warehouseCity, warehouseCounty } = record;
        return `${warehouseProvince}/${warehouseCity}/${warehouseCounty}`;
      },
    },
    {
      title: '上报人',
      dataIndex: 'updateUserName',
      key: 'updateUserName',
      width: 100,
      align: 'left',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 150,
      align: 'left',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 180,
      fixed: 'right',
      render: (_value: unknown, row: ITableItem) => {
        const { status } = row;
        return (
          <>
            <Auth authCode={authMap.AUTH_ZONE_GETDETAIL}>
              <TableButton onClick={() => openModalWithOperate(VIEW, row)}>查看</TableButton>
            </Auth>
            {STATUS_MAP.get(status) === '待审核' && (
              <>
                <Auth authCode={authMap.AUTH_ZONE_REVIEW}>
                  <TableButton isWrapperConfirm onClick={() => handleStatus(row, EStatus['已审核'])}>审核通过</TableButton>
                </Auth>
                <Auth authCode={authMap.AUTH_ZONE_REVIEW}>
                  <TableButton isWrapperConfirm onClick={() => handleStatus(row, EStatus['审核不通过'])}>审核不通过</TableButton>
                </Auth>
              </>
            )}
            {STATUS_MAP.get(status) === '已审核' && (
              <Auth authCode={authMap.AUTH_ZONE_REVIEW}>
                <TableButton isWrapperConfirm onClick={() => handleStatus(row, EStatus['已下架'])}>下架</TableButton>
              </Auth>
            )}
            {STATUS_MAP.get(status) === '审核不通过' && (
              <Auth authCode={authMap.AUTH_ZONE_EDIT}>
                <TableButton onClick={() => openModalWithOperate(EDIT, row)}>编辑</TableButton>
              </Auth>
            )}
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
              <Form.Item label={<Tooltip title='仓库类型'>仓库类型</Tooltip>} name='warehouseType'>
                <Select
                  showSearch
                  filterOption={
                    (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear
                  mode='multiple'
                >
                  {
                    objToArray(dictMaps[EDictMap['仓库类型']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={<Tooltip title='闲置面积≥'>闲置面积≥</Tooltip>} name='idleArea'>
                <InputNumber
                  placeholder='请输入闲置面积(㎡)'
                  style={{ width: '100%' }}
                  min={0}
                  precision={2}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='idleEndTime' label={<Tooltip title='闲置结束时间≤'>闲置结束时间≤</Tooltip>}>
                <DatePicker
                  placeholder='选择闲置结束时间'
                  style={{ width: '100%' }}
                  format='YYYY-MM-DD'
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='status' label={<Tooltip title='状态'>状态</Tooltip>}>
                <Select allowClear>
                  {
                    Array.from(STATUS_MAP).map((item: any) => (
                      <Select.Option value={item[0]} key={item[0]}>{item[1]}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={<Tooltip title='所属BU'>所属BU</Tooltip>} name='warehouseBu'>
                <Select
                  showSearch
                  filterOption={
                    (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear
                >
                  {
                    objToArray(dictMaps[EDictMap['所属BU']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={<Tooltip title='大区'>大区</Tooltip>} name='warehouseRegion'>
                <Select
                  showSearch
                  filterOption={
                    (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear
                >
                  {
                    objToArray(dictMaps[EDictMap['仓库所属大区']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={<Tooltip title='业务区'>业务区</Tooltip>} name='warehouseBusinessArea'>
                <Select
                  showSearch
                  filterOption={
                    (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear
                >
                  {
                    objToArray(dictMaps[EDictMap['业务区']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={<Tooltip title='区域中心'>区域中心</Tooltip>} name='warehouseRegionalCenter'>
                <Select
                  showSearch
                  filterOption={
                    (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear
                >
                  {
                    objToArray(dictMaps[EDictMap['区域中心']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='sale' label={<Tooltip title='是否可售'>是否可售</Tooltip>}>
                <Select allowClear>
                  {
                    Array.from(yesOrNo).map((item: any) => (
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
        title='闲置场地上报列表'
        isShowTitlePrefixIcon
        btns={(
          <>
            <Auth authCode={authMap.AUTH_ZONE_IMPORT}>
              <Button type='primary' onClick={handleImport}>批量上报</Button>
            </Auth>
            <Auth authCode={authMap.AUTH_ZONE_SAVE}>
              <Button type='primary' onClick={() => openModalWithOperate(CREATE)}>闲置场地上报</Button>
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
