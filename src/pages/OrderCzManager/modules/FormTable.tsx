import * as React from 'react';
import { Col, Form, Input, Row, Table, Button, Image, Select, DatePicker, Modal, message, Tag } from 'antd';
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
import { actions, getDataDetail, getDataList, getDel, getOnline, getBuyExport } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { formatSearchParams } from '../adapter';
import { O_STATUS_MAP, O_TYPE_MAP } from '../constants';
import { getQrService } from '../services';


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
  console.log('history', history)
  console.log('lastId', lastId)
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
    dispatch(getDel({ oid: id }));
  };
  // 上线
  const handleOnline = (data: ITableItem) => {
    const { id } = data;
    dispatch(getOnline({ oid: id }));
  };
  // 导出
  const handleExport = () => {
    const params = form.getFieldsValue();
    const formatParams = formatSearchParams(params);
    dispatch(getBuyExport(formatParams));
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

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(actions.refresh())
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
      key: 'uname',
      title: '用户',
      dataIndex: 'uname',
      width: 100,
    },
    {
      title: '总金额（total） ',
      key: 'total',
      dataIndex: 'total',
      width: 100,
    },
    {
      title: '需要支付金额（totalpay） ',
      key: 'totalpay',
      dataIndex: 'totalpay',
      width: 100,
    },
    {
      key: 'otype',
      title: '类型',
      dataIndex: 'otype',
      width: 100,
      render: (text: any) => (text ? O_TYPE_MAP.get(text) || '-' : '-'),
    },
    {
      key: 'buytime',
      title: '订单创建时间',
      dataIndex: 'buytime',
      width: 100,
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
              <Form.Item name='otype' label='类型'>
                <Select allowClear>
                  {
                    Array.from(O_TYPE_MAP).map(([key, value]) => (
                      <Select.Option key={key} value={key}>{value}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='phone' label='手机号'>
                <Input allowClear placeholder='请输入手机号' />
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
      </Wrap>
    </>
  );
}

export default FormTable;
