import * as React from 'react';
import { Col, Form, Input, Row, Table, Button, Select, Tooltip } from 'antd';
import styled from 'styled-components';
import { ColumnsType } from 'antd/lib/table/interface';
import { useSelector, useDispatch } from 'react-redux';
import { falsyParamsFilter } from 'utils/filters';
import { baseTableConf } from 'configs/base.conf';
import FilterFormWrapper from 'components/FilterFormWrapper';
import TableWrapper from 'components/TableWrapper';
import TableButton from 'components/TableButton';
import DistrictsComponent from 'components/DistrictsComponent';
import { CREATE, EDictMap, EDIT, VIEW } from 'utils/constants';
import Auth from 'containers/AuthController';
import { empty } from 'components/TableEmpty';
import authMap from 'configs/auth.conf';
import { selectAllDictMap } from 'store/selectors';
import { objToArray } from 'utils/utils';
import { actions, getDataList, getDel, getWarehouseAll, postStatus } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { rewardsTypeMap, statusYesOrNo } from '../constants';
import { formatSearchParams } from '../adapter';

const { useEffect } = React;

const FormWrap = styled(Form)`
  .firstItem {
    .ant-select-selector {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }
  .secondItem {
    .ant-select-selector {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
    .ant-input {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
  }
`;

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
  const wareHouseAll = useSelector(selectors.wareHouseAll);
  const dispatch = useDispatch();
  const rewardsType = Form.useWatch('rewardsType', form);

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

  // // 删除
  // const handleDel = (data: ITableItem) => {
  //   const { id } = data;
  //   dispatch(getDel({ id }));
  // };

  // 导入
  // const handleImport = () => {
  //   const templateId = (dictMaps[EDictMap['业务模块导入模板']])?.tsr_rewards_info;
  //   dispatch(actions.updateImportModal({
  //     visible: true,
  //     data: {
  //       filesUrl: `/excel/module/template/download/${templateId}`,
  //       moduleId: `${EExportModuleId['场地奖励信息']}`,
  //       templateId,
  //     },
  //   }));
  // };
  // 生效失效
  const handleStatus = (data: ITableItem, status: number) => {
    const { id } = data;
    dispatch(postStatus({ id, status }));
  };

  const handleRewardsType = (type: number) => {
    let res: any = '';
    if (rewardsTypeMap.get(type) === '城市') {
      res = [];
    }
    form.setFieldValue('rewardsValue', res);
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
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 100,
      align: 'left',
    },
    {
      title: '适用范围',
      dataIndex: 'rewardsType',
      key: 'rewardsType',
      width: 200,
      align: 'left',
      render: (text: any, record: ITableItem) => {
        const type = rewardsTypeMap.get(text) || text || '-';
        let val = record.rewardsValue || '-';
        if (type === '仓库') {
          const { warehousePlaceCode, warehouseName, warehouseCode } = (wareHouseAll.find(item => `${item.id}` === `${val}`)) || { warehousePlaceCode: '-', warehouseName: '-', warehouseCode: '-' };
          val = `${warehousePlaceCode}(${warehouseName}/${warehouseCode})`;
        }
        if (type === '大区') {
          val = (dictMaps[EDictMap['仓库所属大区']])?.[val] || val || '-';
        }
        return `${type}（${val}）`;
      },
    },
    {
      title: '奖励对象',
      dataIndex: 'rewardsPersonnel',
      key: 'rewardsPersonnel',
      width: 100,
      align: 'left',
    },
    {
      title: '奖励周期',
      dataIndex: 'rewardsCycle',
      key: 'rewardsCycle',
      width: 100,
      align: 'left',
    },
    {
      title: '有效期',
      dataIndex: 'rewardsPeriod',
      key: 'rewardsPeriod',
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'left',
      render: (text: any) => statusYesOrNo.get(text) || text,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 100,
      render: (_value: unknown, row: ITableItem) => {
        const s = row.status === 1 ? 0 : 1;
        return (
          <>
            <Auth authCode={authMap.AUTH_REWARDSINFO_GETDETAIL}>
              <TableButton onClick={() => openModalWithOperate(VIEW, row)}>查看</TableButton>
            </Auth>
            <Auth authCode={authMap.AUTH_REWARDSINFO_EDIT}>
              <TableButton onClick={() => openModalWithOperate(EDIT, row)}>编辑</TableButton>
            </Auth>
            <Auth authCode={authMap.AUTH_REWARDSINFO_VALID}>
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
        <FormWrap {...formItemLayout} form={form}>
          <Row gutter={[24, 0]}>
            <Col span={6}>
              <Form.Item name='title' label={<Tooltip title='标题'>标题</Tooltip>}>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={<Tooltip title='适用范围'>适用范围</Tooltip>}
              >
                <Input.Group compact>
                  <Form.Item
                    name='rewardsType'
                    style={{ width: '35%' }}
                  >
                    <Select
                      className='firstItem'
                      onChange={handleRewardsType}
                      allowClear
                    >
                      {
                        Array.from(rewardsTypeMap).map((item: any) => (
                          <Select.Option value={item[0]} key={item[0]}>{item[1]}</Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>

                  {
                    rewardsTypeMap.get(rewardsType) === '大区' && (
                      <Form.Item
                        className='secondItem'
                        name='rewardsValue'
                        style={{ width: '65%' }}
                      >
                        <Select
                          showSearch
                          filterOption={
                            (input: any, option: any) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                    )
                  }
                  {
                    rewardsTypeMap.get(rewardsType) === '城市' && (
                      <Form.Item
                        name='rewardsValue'
                        style={{ width: '65%' }}
                        className='secondItem'
                      >
                        <DistrictsComponent
                          lastLevel='city'
                          mode='single'
                          internation={false}
                          type='cascade'
                          hasAll={false}
                        />
                      </Form.Item>
                    )
                  }
                  {
                    rewardsTypeMap.get(rewardsType) === '仓库' && (
                      <Form.Item
                        className='secondItem'
                        name='rewardsValue'
                        style={{ width: '65%' }}
                      >
                        <Select
                          filterOption={
                            (input: any, option: any) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          allowClear
                          showSearch
                        >
                          {
                            wareHouseAll.map((item: any) => (
                              <Select.Option key={item.id} value={`${item.id}`}>
                                {`${item.warehousePlaceCode}(${item.warehouseName}/${item.warehouseCode})`}
                              </Select.Option>
                            ))
                          }
                        </Select>
                      </Form.Item>
                    )
                  }
                  {
                    !(['大区', '仓库', '城市'].includes(rewardsTypeMap.get(rewardsType))) && (
                      <Form.Item style={{ width: '65%' }} className='secondItem'>
                        <Input disabled />
                      </Form.Item>
                    )
                  }
                </Input.Group>
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
        </FormWrap>
      </FilterFormWrapper>
      <TableWrapper
        title='场地奖励机制列表'
        isShowTitlePrefixIcon
        btns={(
          <>
            {/* <Auth authCode={authMap.AUTH_REWARDSINFO_IMPORT}>
              <Button onClick={handleImport}>导入</Button>
            </Auth> */}
            <Auth authCode={authMap.AUTH_REWARDSINFO_SAVE}>
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
