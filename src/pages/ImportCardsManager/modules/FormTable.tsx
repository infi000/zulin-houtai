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
import { CREATE, EDictMap, EExportModuleId, REVIEW, VIEW, card_type } from 'utils/constants';
import Auth from 'containers/AuthController';
import authMap from 'configs/auth.conf';
import { getCookie, getQueryString, objToArray } from 'utils/utils';
import useDebounce from 'hooks/useDebounce';
import moment from 'moment';
import { actions, getDataDetail, getDataList, getDel, getOnline, postSetuserut } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { formatSearchParams } from '../adapter';
import { M_TYPE_MAP } from '../constants';
import CheckModal from './CheckModal';

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
  const [checkModal, setCheckModal] = useState({ show: false, data: {} });
  const UUID = getQueryString('uid');

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
        data,
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

  // 导出
  const handleExport = () => {
    const token = getCookie('token');

    window.open(`/index.php/AdminApi/Card/curcardexport?token=${token}`, '_blank');
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
      title: 'uid',
      dataIndex: 'uid',
      key: 'uid',
      align: 'left',
      width: 100,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      align: 'left',
      width: 100,
    },
    {
      title: 'cardid',
      dataIndex: 'cardid',
      key: 'cardid',
      align: 'left',
      width: 100,
    },
    {
      title: '卡类型',
      dataIndex: 'cardtype',
      key: 'cardtype',
      align: 'left',
      width: 100,
      render: (text: string, record: ITableItem) => {
        const txt = card_type.get(`${text}`) || '-';
        return txt;
      },
    },
    {
      title: '开始时间',
      dataIndex: 'carddate',
      key: 'carddate',
      align: 'left',
      width: 100,
      // render: (text: string, record: ITableItem) => {
      //   const t = text == '-1' ? text : moment.unix(Number(text)).format('YYYY-MM-DD');
      //   return t;
      // },
    },
    {
      title: '卡期限',
      dataIndex: 'expired',
      key: 'expired',
      align: 'left',
      width: 100,
      // render: (text: string, record: ITableItem) => {
      //   const t = text == '-1' ? text : moment.unix(Number(text)).format('YYYY-MM-DD');
      //   return t;
      // },
    },
    // {
    //   title: '二维码',
    //   dataIndex: 'codeurl',
    //   key: 'codeurl',
    //   align: 'left',
    //   width: 100,
    //   render: (text: string) => <Image width={50} height={50} src={text} />,
    // },
    {
      title: '剩余次数', dataIndex: 'leftcount', key: 'leftcount', align: 'left', width: 100,
    },
    {
      title: '总次数', dataIndex: 'totalcount', key: 'totalcount', align: 'left', width: 100,
    },
    {
      title: '总价', dataIndex: 'totalprice', key: 'totalprice', align: 'left', width: 100,
    },
    {
      title: '备注', dataIndex: 'remark', key: 'remark', align: 'left', width: 100,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 200,
      render: (_value: unknown, row: ITableItem) => (
        <>
          <Auth authCode={null}>
            <Button type='primary' onClick={() => setCheckModal({ show: true, data: row })}>核销</Button>

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
              <Form.Item name='uid' label='用户uid' initialValue={UUID}>
                <Input placeholder='请输入' allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='phone' label='用户手机号'>
                <Input placeholder='请输入' allowClear />
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
      {checkModal.show
        && (
          <CheckModal
            data={checkModal.data}
            onClose={() => setCheckModal({ show: false, data: {} })}
          />
        )}

    </>
  );
}

export default FormTable;
