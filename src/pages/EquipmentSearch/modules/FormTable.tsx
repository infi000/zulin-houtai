import * as React from 'react';
import { Col, Form, Input, Row, Table, Button, Select, DatePicker, Tag, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { useSelector, useDispatch } from 'react-redux';
import { falsyParamsFilter } from 'utils/filters';
import { baseTableConf } from 'configs/base.conf';
import FilterFormWrapper from 'components/FilterFormWrapper';
import TableWrapper from 'components/TableWrapper';
import TableButton from 'components/TableButton';
import { selectAllDictMap } from 'store/selectors';
import { EDictMap, VIEW } from 'utils/constants';
import Auth from 'containers/AuthController';
import { disabledDate, objToArray } from 'utils/utils';
import useDebounce from 'hooks/useDebounce';
import styled from 'styled-components';
import tanhao from 'static/images/tanhao.png';
import moment from 'moment';
import { actions, getDataDetail, getDataList, } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { formatSearchParams } from '../adapter';
import { STATUS_MAP, USE_STATUS_MAP } from '../constants';

const TableDesc = styled.div`
  font-size: 16px;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #333333;
  img{
    width: 24px;
    height: 24px;
  }
`;

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
      title: '使用状态',
      dataIndex: 'useStatus',
      key: 'useStatus',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => <Tag className={USE_STATUS_MAP.get(text) === '激活' ? 'ant-tag-primary' : ''}>{USE_STATUS_MAP.get(text) || text || '-'}</Tag>,
    },
    {
      title: '闲置原因',
      dataIndex: 'idleReason',
      key: 'idleReason',
      width: 200,
      align: 'left',
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => STATUS_MAP.get(text) || text,
    },
    {
      title: '不通过原因',
      dataIndex: 'rejectReason',
      key: 'rejectReason',
      width: 200,
      align: 'left',
    },
    {
      title: '闲置年月',
      dataIndex: 'idleMonth',
      key: 'idleMonth',
      width: 100,
      align: 'left',
    },
    {
      title: '闲置天数',
      dataIndex: 'idleDays',
      key: 'idleDays',
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
      title: '成本中心',
      dataIndex: 'costCenter',
      key: 'costCenter',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => (dictMaps[EDictMap['成本中心']])?.[text] || text || '-',
    },
    {
      title: '成本中心名称',
      dataIndex: 'costCenterDescription',
      key: 'costCenterDescription',
      width: 100,
      align: 'left',
    },
    {
      title: '本部描述',
      dataIndex: 'partDescription',
      key: 'partDescription',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => (dictMaps[EDictMap['本部描述']])?.[text] || text || '-',

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
    // {
    //   title: '调拨联系人姓名',
    //   dataIndex: 'transferContactName',
    //   key: 'transferContactName',
    //   width: 120,
    //   align: 'left',
    // },
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
      width: 100,
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
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 100,
      render: (_value: unknown, row: ITableItem) => (
        <>
          <Auth authCode={null}>
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
              <Form.Item
                label='审核状态'
                name='status'
              >
                <Select>
                  {
                    Array.from(STATUS_MAP).map((item: any) => (
                      <Select.Option value={item[0]} key={item[0]}>{item[1]}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='transferContactNo' label='调拨联系人工号'>
                <Input allowClear placeholder='请输入调拨联系人工号' />
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
              <Form.Item
                label='成本中心'
                name='costCenter'
              >
                <Select
                  filterOption={
                    (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  showSearch
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
              <Form.Item name='idleMonth' label='闲置年月' initialValue={moment()}>
                <DatePicker
                  picker='month'
                  format='YYYY-MM'
                  placeholder='请选择'
                  allowClear={false}
                  disabledDate={(current: any) => disabledDate(current, '仅当月次月')}
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
        title='设备查询列表'
        isShowTitlePrefixIcon
        desc={<TableDesc><Space><img src={tanhao} alt='tanhao' /><span>每月26号会更新次月最新数据，以最新数据为准</span></Space></TableDesc>}
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
