import * as React from 'react';
import { Form, Table, Image, Select, DatePicker, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { useSelector, useDispatch } from 'react-redux';
import { falsyParamsFilter } from 'utils/filters';
import { baseTableConf } from 'configs/base.conf';
import TableWrapper from 'components/TableWrapper';
import { selectAllDictMap } from 'store/selectors';
import { EDictMap, VIEW } from 'utils/constants';
import useDebounce from 'hooks/useDebounce';
import { getDiffTime } from 'utils/utils';
import moment from 'moment';
import { actions, getDataDetail, getDataList, getDel, getOnline } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { formatSearchParams } from '../adapter';
import { CHECK_MAP, MTYPE } from '../constants';

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
      title: '微信用户',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'left',
      width: 100,
    },
    {
      title: '手机',
      dataIndex: 'mobile',
      key: 'mobile',
      align: 'left',
      width: 100,
      render: (text: string, opt: any) => {
        const str = text || opt.uphone || '-';
        return <><span>{str}</span></>;
      },
    },
    {
      title: '开始时间',
      dataIndex: 'starttime',
      key: 'starttime',
      align: 'left',
      width: 100,
      render: (text: string) => {
        const c5 = getDiffTime(text, new Date());
        const style = c5 ? { color: 'red', fontWeight: 'bold' } : {};
        return <><span style={style}>{text}</span></>;
      },
    },
    {
      title: '结束时间',
      dataIndex: 'endtime',
      key: 'endtime',
      align: 'left',
      width: 100,
    },
    {
      title: '临期',
      dataIndex: 'lq',
      align: 'left',
      width: 100,
      render: (text: string, opt: any) => {
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        const endTime = moment(opt.endtime).format('YYYY-MM-DD HH:mm:ss');
        // const now = moment('2023-11-09 15:55:00').format('YYYY-MM-DD HH:mm:ss');
        const diff = moment(now).diff(moment(endTime), 'seconds');
        let str = <span />;
        if (diff >= 0) {
          str = <Tag color="default">过期</Tag>;
        } else if (diff > -600) {
          str = <Tag color="red">十分钟内</Tag>;
        }
        return str;
      },
    },
    {
      title: '类型',
      dataIndex: 'mtype',
      key: 'mtype',
      align: 'left',
      width: 100,
      render: (text: string) => <span>{MTYPE.get(text) || '-'}</span>,
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
