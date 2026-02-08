import * as React from 'react';
import { Col, Form, Input, Row, Table, Button, Image, Select, DatePicker, Modal, message, Tag, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { useSelector, useDispatch } from 'react-redux';
import { falsyParamsFilter } from 'utils/filters';
import { baseTableConf } from 'configs/base.conf';
import FilterFormWrapper from 'components/FilterFormWrapper';
import TableWrapper from 'components/TableWrapper';
import TableButton from 'components/TableButton';
import { selectAllDictMap } from 'store/selectors';
import { useHistory } from 'react-router-dom';

import { CREATE, EDictMap, EExportModuleId, EDIT, VIEW } from 'utils/constants';
import Auth from 'containers/AuthController';
import authMap from 'configs/auth.conf';
import { getQueryString, objToArray } from 'utils/utils';
import useDebounce from 'hooks/useDebounce';
import moment from 'moment';
import styled from 'styled-components';
import { actions, getDataDetail, getDataList, getDel, getOnline, getOrderCancel, getOrdertaPay } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { formatSearchParams } from '../adapter';
import { O_STATUS_MAP } from '../constants';
import { getQrService } from '../services';
import ExportModal from './ExportModal';


const Wrap = styled.div`
  .redLine {
    background: #ff000029;
  }
`
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
  const lastId = useSelector(selectors.lastId);
  const loading = useSelector(selectors.loading);
  const dictMaps = useSelector(selectAllDictMap);
  const [isQrInfo, setIsQrInfo] = useState<any>({});
  const dispatch = useDispatch();
  const UUID = getQueryString('uid');
  const history: any = useHistory();
  const [exportModal, setExportModal] = useState({ show: false, data: null });

  // 查询
  const handleSearch = (additionalParams: Dictionary<TAdditionalParams> = {}) => {
    const params = form.getFieldsValue();
    const formatParams = formatSearchParams({
      ...params,
      pageNum: 1, // 默认所有的检索也都重新从1开始检索
      pageSize: pagination.pageSize,
      ...additionalParams,
    });
    dispatch(getDataList(falsyParamsFilter(formatParams)));
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
    if (type !== CREATE) {
      const { id } = data;
      await dispatch(getDataDetail({ oid: id, type }));
    } else {
      dispatch(actions.updateMainModal({
        visible: true,
        type,
      }));
    }
  });

  // 导出
  const handleExport = () => {
    setExportModal({ show: true, data: {} });
  };

  // 删除
  const handleDel = (data: ITableItem) => {
    const { id } = data;
    dispatch(getDel({ oid: id }));
  };
  // 上线
  const handleOnline = (data: ITableItem) => {
    const { id } = data;
    dispatch(getOnline({ oid: id }));
  };
  // qe
  const handleQr = useDebounce((data: ITableItem) => {
    const { id } = data;
    getQrService({ oid: id }).then((r: any) => {
      console.log('r', r)
      const d = r?.data;
      if (r?.res === 'succ' && d && d?.codeurl) {
        console.log({ open: true, ...d })
        setIsQrInfo({ open: true, ...d })
      } else {
        message.error(r.errdata)
      }
    }).catch(d => {
      console.log(d)
    })
  });
  // 余额支付
  const handleYEZF = useDebounce((data: ITableItem) => {
    console.log(data)
    const { id } = data;
    dispatch(getOrdertaPay({ oid: id }));
  });
  // 余额支付
  const handleTCS = useDebounce((data: ITableItem) => {
    console.log(data)
    const { id } = data;
    dispatch(getOrderCancel({ oid: id }));
  });

  useEffect(() => {
    const timer = setInterval(() => {
      // dispatch(actions.refresh())
    }, 1000 * 30);

    return () => {
      console.log('清除了')
      clearInterval(timer);
    };
  }, [])



  useEffect(() => {
    handleSearch();
    console.log(refresh)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  /**
   * {
  id: number; // 自增id
  orderid: string; // 订单号
  uid: string; // 预约用户id
  uname: string; // 预约用户名称
  title: string; // 订单标题
  desposit: string; // 包含的押金金额
  total: string; // 总金额
  discount: string; // 会员优惠金额
  scorecount: string; // 积分抵扣金额
  totalpay: string; // 需要支付金额
  ostatus: string; // :0已下单未支付， 1已支付未核销，2核销完成，3关闭
  status: string; // 状态，1正常
  ctime: string; // 订单创建时间
  uptime: string; // 更新时间
}
   */
  const columns: ColumnsType = [
    {
      key: 'id ',
      title: '自增id',
      dataIndex: 'id',
      width: 100,
    },
    {
      key: 'orderid ',
      title: '订单号',
      dataIndex: 'orderid',
      width: 100,
    },
    {
      key: 'uid ',
      title: '预约用户id',
      dataIndex: 'uid',
      width: 100,
    },
    {
      key: 'uname ',
      title: '预约用户名称',
      dataIndex: 'uname',
      width: 100,
    },
    {
      key: 'uphone ',
      title: '预约电话',
      dataIndex: 'uphone',
      width: 100,
    },
    {
      key: 'remark ',
      title: '备注',
      dataIndex: 'remark',
      width: 100,
    },
    {
      key: 'title ',
      title: '订单标题',
      dataIndex: 'title',
      width: 100,
    },
    {
      key: 'desposit ', title: '包含的押金金额', dataIndex: 'desposit', width: 100,
    },
    {
      key: 'categoryprice ', title: '小分类金额', dataIndex: 'categoryprice', width: 100,
    },
    {
      key: 'total ', title: '总金额', dataIndex: 'total', width: 100,
    },
    {
      key: 'discount ', title: '会员优惠金额', dataIndex: 'discount', width: 100,
    },
    {
      key: 'scorecount ', title: '积分抵扣金额', dataIndex: 'scorecount', width: 100,
    },
    {
      key: 'totalpay ', title: '需要支付金额', dataIndex: 'totalpay', width: 100,
    },
    {
      key: 'peoplename ', title: '青少年名称', dataIndex: 'peoplename', width: 100,
    },
    {
      key: 'tasktitle ', title: '任务名称', dataIndex: 'tasktitle', width: 100,
    },
    {
      key: 'membername ', title: '队友名称', dataIndex: 'membername', width: 100,
    },
    {
      key: 'message ', title: '新增加备注信息', dataIndex: 'message', width: 150,
    },
    {
      key: 'tools',
      title: '项目',
      dataIndex: 'tools',
      width: 300,
      render: (text: any) => {
        if (text && text.length > 0) {
          return <>{text.map(item => <Tag key={item.id}>{item.title}/{item.price}</Tag>)}</>
        } else {
          return '-'
        }
      },
    },
    {
      key: 'goods',
      title: '工具',
      dataIndex: 'goods',
      width: 300,
      render: (text: any) => {
        if (text && text.length > 0) {
          return <>{text.map(item => <Tag key={item.id}>{item.title}/{item.price}</Tag>)}</>
        } else {
          return '-'
        }
      },
    },
    {
      key: 'cardid',
      title: '优惠卡id',
      dataIndex: 'cardid',
      width: 100,
    },
    {
      key: 'cardduration',
      title: '消耗工时数',
      dataIndex: 'cardduration',
      width: 100,
    },
    {
      key: 'cardmoney',
      title: '优惠金额',
      dataIndex: 'cardmoney',
      width: 100,
    },
    {
      key: 'ostatus ',
      title: '状态',
      dataIndex: 'ostatus',
      width: 100,
      render: (text: any) => (text ? O_STATUS_MAP.get(text) || '-' : '-'),
    },
    {
      key: 'ctime ',
      title: '订单创建时间',
      dataIndex: 'ctime',
      width: 100,
      render: (text: any) => (text ? moment.unix(text).format('YYYY-MM-DD hh:mm:ss') : '-'),

    },
    {
      key: 'starttime ',
      title: '开始时间',
      dataIndex: 'starttime',
      width: 100,
      // render: (text: any) => (text ? moment.unix(text).format('YYYY-MM-DD hh:mm:ss') : '-'),
    },
    {
      key: 'endtime ',
      title: '结束时间',
      dataIndex: 'endtime',
      width: 100,
      // render: (text: any) => (text ? moment.unix(text).format('YYYY-MM-DD hh:mm:ss') : '-'),
    },
    {
      key: 'uptime ',
      title: '更新时间',
      dataIndex: 'uptime',
      width: 100,
      render: (text: any) => (text ? moment.unix(text).format('YYYY-MM-DD hh:mm:ss') : '-'),
    },

    {
      key: 'operate',
      title: '操作',
      width: 200,
      render: (_value: unknown, row: ITableItem) => (
        <>
          <Auth authCode={O_STATUS_MAP.get(row?.ostatus) === '已下单未支付' ? null : 111}>
            <Popconfirm
              title="确定未支付订单退优惠卡次数?"
              onConfirm={() => {
                handleTCS(row)
              }}
              okText="确定"
              cancelText="取消"
            >
              <TableButton>未支付订单退优惠卡次数</TableButton>
            </Popconfirm>
          </Auth>
          <Auth authCode={null}>
            <TableButton onClick={() => openModalWithOperate('核销', row)}>核销</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton onClick={() => openModalWithOperate('续订', row)}>续订</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton onClick={() => openModalWithOperate('继续支付', row)}>继续支付</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton onClick={() => openModalWithOperate(EDIT, row)}>编辑</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton onClick={() => handleQr(row)}>二维码</TableButton>
          </Auth>
          <Auth authCode={null}>
            <Popconfirm
              title="确定余额支付?"
              onConfirm={() => {
                handleYEZF(row)
              }}
              okText="确定"
              cancelText="取消"
            >
              <TableButton>余额支付</TableButton>
            </Popconfirm>
          </Auth>
          {/* <Auth authCode={null}>
            <TableButton isWrapperConfirm onClick={() => handleDel(row)}>下线</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton isWrapperConfirm onClick={() => handleOnline(row)}>上线</TableButton>
          </Auth> */}
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
              <Form.Item name='uid' label='用户id' initialValue={UUID}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='odate' label='订单日期'>
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item name='ecid' label='订单分类'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='ostatus' label='订单状态'>
                <Select allowClear>
                  {
                    Array.from(O_STATUS_MAP).map(([key, value]) => (
                      <Select.Option key={key} value={key}>{value}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>

          </Row>
        </Form>
      </FilterFormWrapper>
      <Wrap>
        <TableWrapper
          title='列表'
          isShowTitlePrefixIcon
          btns={(
            <>
              <Auth authCode={null}>
                <Button type='primary' onClick={handleExport}>导出</Button>
              </Auth>
              <Auth authCode={null}>
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
            rowClassName={(record: any) => (Number(record.id) > Number(lastId) ? 'redLine' : '')}
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
      </Wrap>
      <Modal title={`${isQrInfo.title}：${isQrInfo.totalpay}`} open={isQrInfo.open} onCancel={() => { setIsQrInfo({}) }} destroyOnClose >
        <Image
          width={200}
          height={200}
          src={isQrInfo.codeurl}
          fallback='data:image/png;base64,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'
        />
      </Modal>
      {exportModal.show && <ExportModal onCancel={() => setExportModal({ show: false, data: null })} />}
    </>
  );
}

export default FormTable;
