/*
 * @Author: Claude
 * @Description: UserCardOrders 列表表格和搜索表单
 */
import * as React from 'react';
import { Col, Form, Input, Row, Table, Button, DatePicker, Space } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table/interface';
import { useSelector, useDispatch } from 'react-redux';
import { falsyParamsFilter } from 'utils/filters';
import { baseTableConf } from 'configs/base.conf';
import FilterFormWrapper from 'components/FilterFormWrapper';
import TableWrapper from 'components/TableWrapper';
import useDebounce from 'hooks/useDebounce';
import moment from 'moment';
import { actions, getDataList, getWxid } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { formatSearchParams } from '../adapter';
import { O_STATUS_MAP, CARD_TYPE_MAP } from '../constants';
import RefundModal from './RefundModal';
import WxidModal from './WxidModal';
import { getCookie } from 'utils/utils';

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
  const refundModal = useSelector(selectors.refundModal);
  const wxidModal = useSelector(selectors.wxidModal);
  const dispatch = useDispatch();

  // 查询
  const handleSearch = React.useCallback((additionalParams: Dictionary<TAdditionalParams> = {}) => {
    const params = form.getFieldsValue();
    const formatParams = formatSearchParams({
      ...params,
      pageNum: 1, // 默认所有的检索也都重新从1开始检索
      pageSize: pagination.pageSize,
      ...additionalParams,
    });
    dispatch(getDataList(falsyParamsFilter<TSearchParams & IPagination>(formatParams)));
  });

  // 重置
  const handleReset = () => {
    form.resetFields();
  };

  // 翻页
  const handleChangePage = (pageNum: number, pageSize: number) => {
    handleSearch({ pageNum, pageSize });
  };

  // 打开退款模态框
  const openRefundModal = useDebounce((data: ITableItem) => {
    dispatch(actions.updateRefundModal({
      visible: true,
      data,
    }));
  });

  // 关闭退款模态框
  const handleRefundModalClose = () => {
    dispatch(actions.updateRefundModal({ visible: false }));
  };

  // 获取微信订单号
  const openWxidModal = useDebounce((oid: string) => {
    dispatch(getWxid({ oid }));
  });

  // 关闭微信订单号模态框
  const handleWxidModalClose = () => {
    dispatch(actions.updateWxidModal({ visible: false, wxid: undefined, loading: false }));
  };

  // 导出当页
  const handleExport = useDebounce(() => {
    const params = form.getFieldsValue();
    const formatParams = formatSearchParams({
      ...params,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
    });
    const token = getCookie('token');
    const { odate, uid, phone } = formatParams;

    let queryString = `token=${token}`;
    if (odate) queryString += `&odate=${odate}`;
    if (uid) queryString += `&uid=${uid}`;
    if (phone) queryString += `&phone=${phone}`;
    queryString += `&pageNum=${pagination.pageNum}&pageSize=${pagination.pageSize}`;

    window.open(`/index.php/AdminApi/Card/exportusercardorders?${queryString}`, '_blank');
  });

  // 初始化加载数据
  useEffect(() => {
    handleSearch();
  }, [refresh]);

  // 表格列配置
  const columns: ColumnsType<ITableItem> = [
    {
      title: '订单ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '订单号',
      dataIndex: 'orderid',
      key: 'orderid',
      width: 100,
    },
    {
      title: '用户UID',
      dataIndex: 'uid',
      key: 'uid',
      width: 100,
    },
    {
      title: '用户名',
      dataIndex: 'uname',
      key: 'uname',
      width: 120,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
    },
    {
      title: '总金额',
      dataIndex: 'total',
      key: 'total',
      width: 100,
      render: (text: string) => `¥${text}`,
    },
    {
      title: '备注',
      dataIndex: 'cardremak',
      key: 'cardremak',
      width: 150,
      render: (text: string) => text || '-',
    },
    {
      title: '订单状态',
      dataIndex: 'ostatus',
      key: 'ostatus',
      width: 120,
      render: (text: string) => O_STATUS_MAP.get(text) || text,
    },
    {
      title: '卡片类型',
      dataIndex: 'cardtype',
      key: 'cardtype',
      width: 100,
      render: (text: string) => CARD_TYPE_MAP.get(text) || text,
    },
    {
      title: '卡片名称',
      dataIndex: 'cardname',
      key: 'cardname',
      width: 150,
    },
    {
      title: '创建时间',
      dataIndex: 'ctime',
      key: 'ctime',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record: ITableItem) => (
        <Space size="small">
          <Button type="link" size="small" onClick={() => openWxidModal(record.id)}>
            微信订单号
          </Button>
          <Button type="link" size="small" onClick={() => openRefundModal(record)}>
            退款
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <FilterFormWrapper
        onSearch={() => handleSearch()}
        onReset={() => handleReset()}
      >
        <Form
          {...formItemLayout}
          form={form}
        >
          <Row>
            <Col span={6}>
              <Form.Item label="查询日期" name="odate" className="fullwidth-input">
                <DatePicker placeholder="请选择日期" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="用户UID" name="uid" className="fullwidth-input">
                <Input placeholder="请输入用户UID" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="手机号" name="phone" className="fullwidth-input">
                <Input placeholder="请输入手机号" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </FilterFormWrapper>

      <TableWrapper
        title='列表'
        btns={(
          <>
           <Button type='primary' onClick={handleExport}>导出</Button>
          </>
        )}
      >
        <Table
          columns={columns}
          dataSource={tableData}
          loading={loading}
          rowKey="id"
          pagination={{
            ...pagination,
            onChange: handleChangePage,
            showSizeChanger: true,
            showTotal: total => `共 ${total} 条`,
          }}
          scroll={{ x: 1500 }}
        />
      </TableWrapper>

      {refundModal.visible && (
        <RefundModal data={refundModal.data} onClose={handleRefundModalClose} />
      )}

      <WxidModal
        visible={wxidModal.visible}
        wxid={wxidModal.wxid}
        loading={wxidModal.loading}
        onClose={handleWxidModalClose}
      />
    </>
  );
}

export default FormTable;
