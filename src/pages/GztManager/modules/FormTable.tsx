import * as React from 'react';
import { Form, Table, Image, Select, DatePicker } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { useSelector, useDispatch } from 'react-redux';
import { falsyParamsFilter } from 'utils/filters';
import { baseTableConf } from 'configs/base.conf';
import TableWrapper from 'components/TableWrapper';
import { selectAllDictMap } from 'store/selectors';
import { EDictMap, VIEW } from 'utils/constants';
import moment from 'moment';
import { actions, getDataDetail, getDataList, getDel, getExperimentsList, getGoodsList, getOnline, getToolsListService, getUserListService } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { formatSearchParams } from '../adapter';
import useDebounce from 'hooks/useDebounce';
import TableButton from 'components/TableButton';

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
    dispatch(actions.updateMainModal({
      visible: true,
      type,
      data
    }));
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
    dispatch(getDel({ tid: id }));
  };
  // 上线
  const handleOnline = (data: ITableItem) => {
    const { id } = data;
    dispatch(getOnline({ tid: id }));
  };

  useEffect(() => {
    handleSearch();
    dispatch(getUserListService());
    dispatch(getToolsListService());
    dispatch(getGoodsList());
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
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      align: 'left',
      width: 100,
    },
    {
      title: '描述',
      dataIndex: 'des',
      key: 'des',
      width: 100,
      align: 'left',
    },
    {
      title: '封面',
      dataIndex: 'thumbinal',
      key: 'thumbinal',
      width: 100,
      align: 'left',
      render: (text: string) => <Image width={50} height={50} src={text} />,

    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'ctime',
      key: 'ctime',
      width: 100,
      render: (text: any) => (text ? moment.unix(text).format('YYYY-MM-DD hh:mm:ss') : '-'),
    },
    {
      title: '可用',
      dataIndex: 'usestatus',
      key: 'usestatus',
      width: 100,
      render: (text: string) => (text === '0' ? '可用' : '不可用'),
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 200,
      render: (_value: unknown, row: ITableItem) => (
        <>
          <TableButton onClick={() => openModalWithOperate(VIEW, row)}>创建订单</TableButton>

        </>
      ),
    },
  ];

  return (
    <>
      <TableWrapper
        title='列表'
        isShowTitlePrefixIcon
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