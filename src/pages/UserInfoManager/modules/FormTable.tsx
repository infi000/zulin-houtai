import * as React from 'react';
import { Col, Form, Input, Row, Table, Button, Image, Select, DatePicker, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { useSelector, useDispatch } from 'react-redux';
import { falsyParamsFilter } from 'utils/filters';
import { baseTableConf } from 'configs/base.conf';
import FilterFormWrapper from 'components/FilterFormWrapper';
import TableWrapper from 'components/TableWrapper';
import TableButton from 'components/TableButton';
import { selectAllDictMap } from 'store/selectors';
import { CREATE, EDictMap, EExportModuleId, REVIEW, VIEW } from 'utils/constants';
import Auth from 'containers/AuthController';
import { useHistory } from 'react-router-dom';

import authMap from 'configs/auth.conf';
import { objToArray } from 'utils/utils';
import { actions, getDataDetail, getDataList, getDel, getOnline, postSetuserut, getUserExport } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { formatSearchParams } from '../adapter';
import useDebounce from 'hooks/useDebounce';
import { M_TYPE_MAP } from '../constants';
import usePageJump from 'hooks/usePageJump';

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
  const pageJump = usePageJump();
  const history = useHistory();
  const searchCondition = useSelector(selectors.searchCondition);
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
    if (type === VIEW) {
      const { id } = data;
      await dispatch(getDataDetail({ uid: id, type }));
    } else {
      dispatch(actions.updateMainModal({
        visible: true,
        type,
        data
      }));
    }

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
  // handleCheckCard
  const handleCheckCard = (row: any) => {
    const { id } = row;
    const newPath = `/uiResources/userInfoManager/userCardsManager/:${id}?uid=${id}`;
    pageJump(newPath);
  };

  // 删除
  const handleDel = (data: ITableItem) => {
    const { id } = data;
    dispatch(getDel({ tid: id }));
  };
  // 上线
  const handleSetuserut = useDebounce((data: ITableItem, ut: '1' | '2') => {
    const { id } = data;
    dispatch(postSetuserut({ uid: id, ut }));
  });
  // 编辑余额
  const handleEditYe = useDebounce((data: ITableItem) => {
    const { id } = data;
    dispatch(actions.updateYeModalInfo({ visible: true, data }));
  });
  // 编辑余额
  const handleEditInfo = useDebounce((data: ITableItem) => {
    const { id } = data;
    dispatch(actions.updateEditModalInfo({ visible: true, data }));
  });
  // 编辑余额
  const handleCheckOrder = useDebounce((data: ITableItem) => {
    const { id } = data;
    const newPath = `/uiResources/order/orderManager?uid=${id}`;
    window.open(newPath, '_blank')
    // pageJump({
    //   pathname: newPath,
    //   state: {
    //     uid: id
    //   }
    // });
    // history.push(newPath)
  });
  // 导出
  const handleExport = () => {
    const params = form.getFieldsValue();
    const formatParams = formatSearchParams(params);
    dispatch(getUserExport(formatParams));
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const columns: ColumnsType = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'left',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'left',
      width: 100,
    },
    {
      title: '手机',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 100,
      align: 'left',
    },
    {
      title: '头像',
      dataIndex: 'face',
      key: 'face',
      width: 100,
      align: 'left',
      render: (text: string) => <Image width={50} height={50} src={text} />,

    },
    {
      title: '注册合同',
      dataIndex: 'regimg',
      key: 'regimg',
      width: 100,
      align: 'left',
      render: (text: string) => text ?  <Image width={50} height={50} src={text} /> : '-',

    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 100,
      align: 'left',
    },
    {
      title: '余额总数',
      dataIndex: 'ta',
      key: 'ta',
      width: 100,
      align: 'left',
    },
    {
      title: '登记积分',
      dataIndex: 'levelscore',
      key: 'levelscore',
      width: 100,
      align: 'left',
    },
    {
      title: '次数总数',
      dataIndex: 'leftcount',
      key: 'leftcount',
      width: 100,
      align: 'left',
    },
    {
      title: '注册日期',
      dataIndex: 'regtime',
      key: 'regtime',
      width: 100,
      align: 'left',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 200,
      render: (_value: unknown, row: ITableItem) => (
        <>
          <Auth authCode={null}>
            <TableButton onClick={() => handleEditYe(row)}>修改余额</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton onClick={() => handleEditInfo(row)}>编辑信息</TableButton>
          </Auth>
          {/* <Auth authCode={null}>
            <TableButton onClick={() => handleCheckCard(row)}>查看会员卡</TableButton>
          </Auth> */}
          <Auth authCode={null}>
            <TableButton onClick={() => handleCheckOrder(row)}>查看订单</TableButton>
          </Auth>
          {/* <Auth authCode={null}>
            <TableButton onClick={() => openModalWithOperate(VIEW, row)}>查看</TableButton>
          </Auth> */}
          <Auth authCode={null}>
            <TableButton onClick={() => openModalWithOperate(REVIEW, row)}>审核</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton onClick={() => handleSetuserut(row, '1')}> 设为不可验票</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton onClick={() => handleSetuserut(row, '2')}> 设为可验票</TableButton>
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
        <Form {...formItemLayout} form={form} initialValues={searchCondition}>
          <Row>
            <Col span={6}>
              <Form.Item name='mtype' label='会员类型'>
                <Select allowClear>
                  {
                    Array.from(M_TYPE_MAP).map(([key, value]) => (
                      <Select.Option key={key} value={key}>{value}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='phone' label='手机'>
                <Input />
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
              <Button type='primary' onClick={handleExport}>导出</Button>
            </Auth>
            <Auth authCode={null}>
              <Button type='primary' onClick={() => openModalWithOperate('设置年会员')}>设置年会员价格</Button>
            </Auth>
            <Auth authCode={null}>
              <Button type='primary' onClick={() => openModalWithOperate('设置背景')}>设置背景</Button>
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
