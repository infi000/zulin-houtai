import * as React from 'react';
import { Col, Form, Input, Table, Button, message, Select, DatePicker, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { useSelector, useDispatch } from 'react-redux';
import { falsyParamsFilter } from 'utils/filters';
import { baseTableConf } from 'configs/base.conf';
import FilterFormWrapper from 'components/FilterFormWrapper';
import TableWrapper from 'components/TableWrapper';
import TableButton from 'components/TableButton';
import OperateLog from 'components/OperateLog';
import { selectAllDictMap, selectAllDictType } from 'store/selectors';
import { CREATE, EDictMap, EExportModuleId, EDIT, VIEW } from 'utils/constants';
import Auth from 'containers/AuthController';
import authMap from 'configs/auth.conf';
import { objToArray } from 'utils/utils';
import cosInstance from 'utils/cosUtils';
import moment from 'moment';
import { actions, getDataList, getDel } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
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
  const dictType = useSelector(selectAllDictType);
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
  // 翻页
  const handleChangePage = (pageNum: number, pageSize: number) => {
    handleSearch({ pageNum, pageSize });
  };

  const handleDownload = async (filekey: string) => {
    const src = await cosInstance.downloadFile(filekey);
    window.open(src, '_blank');
  };

  // 新建、编辑、查看
  const openModalWithOperate = (data?: ITableItem) => {
    dispatch(actions.updateMainModal({
      visible: true,
      data,
    }));
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const columns: ColumnsType = [
    // {
    //   title: '导入/导出任务ID',
    //   dataIndex: 'id',
    //   key: 'id',
    //   width: 100,
    //   align: 'left',
    // },
    // {
    //   title: '任务模板',
    //   dataIndex: 'taskTemplateId',
    //   key: 'taskTemplateId',
    //   width: 130,
    //   align: 'left',
    //   render: (text: any, record: ITableItem) => {
    //     const bizArr = dictType[EDictMap['业务模块导入模板']];
    //     const target = (bizArr.find(item => item.label === `${text}`))?.remark || '-';
    //     return target;
    //   }
    // },
    {
      title: '导入文件名',
      dataIndex: 'taskTemplateId',
      key: 'taskTemplateId',
      width: 130,
      align: 'left',
      render: (text: any, record: ITableItem) => {
        const bizArr = dictType[EDictMap['业务模块导入模板']];
        const target = (bizArr.find(item => item.label === `${text}`))?.remark || record.taskName || '-';
        return target;
      }
    },
    {
      title: '导入/导出',
      dataIndex: 'taskType',
      key: 'taskType',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => (dictMaps[EDictMap['任务类型']])?.[text] || text || '-',
    },
    {
      title: '处理状态',
      dataIndex: 'treatStatus',
      key: 'treatStatus',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => {
        const res = (dictMaps[EDictMap['处理状态']])?.[text] || text || '-';
        if (res === '处理完成') {
          return <Tag color='success'>{res}</Tag>;
        }
        if (res === '验证失败') {
          return <Tag color='error'>{res}</Tag>;
        }
      },
    },
    {
      title: '任务结果状态',
      dataIndex: 'taskResultStatus',
      key: 'taskResultStatus',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => (dictMaps[EDictMap['任务结果状态']])?.[text] || text || '-',
    },
    {
      title: '任务结果',
      dataIndex: 'taskResult',
      key: 'taskResult',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => {
        const { treatStatus } = record;
        if (text) {
          return text;
        }
        if ((dictMaps[EDictMap['处理状态']])?.[treatStatus] === '处理完成') {
          return <TableButton onClick={() => openModalWithOperate(record)}>查看结果</TableButton>;
        }
        return '-';
      },
    },
    {
      title: '任务开始时间',
      dataIndex: 'taskStartTime',
      key: 'taskStartTime',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => (text ? moment.unix(text).format('YYYY-MM-DD') : '-'),
    },
    {
      title: '任务结束时间',
      dataIndex: 'taskEndTime',
      key: 'taskEndTime',
      width: 100,
      align: 'left',
      render: (text: any, record: ITableItem) => (text ? moment.unix(text).format('YYYY-MM-DD') : '-'),
    },

    // // {
    //   title: '回调url',
    //   dataIndex: 'callbackUrl',
    //   key: 'callbackUrl',
    //   width: 100,
    //   align: 'left',
    // },
    // {
    //   title: 'cosId',
    //   dataIndex: 'cosId',
    //   key: 'cosId',
    //   width: 100,
    //   align: 'left',
    // },

    // {
    //   title: '任务输入文件',
    //   dataIndex: 'inputUrl',
    //   key: 'inputUrl',
    //   width: 100,
    //   align: 'left',
    // },
    // {
    //   title: '任务输出文件',
    //   dataIndex: 'outputUrl',
    //   key: 'outputUrl',
    //   width: 100,
    //   align: 'left',
    // },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 200,
      fixed: 'right',
      render: (_value: unknown, row: ITableItem) => (
        <>
          <Auth authCode={null}>
            {row.inputUrl && <TableButton onClick={() => handleDownload(row.inputUrl)}>下载原文件</TableButton>}
          </Auth>
          <Auth authCode={null}>
            {row.outputUrl && <TableButton onClick={() => handleDownload(row.outputUrl)}>下载明细</TableButton>}
          </Auth>
        </>
      ),
    },
  ];

  return (
    <>
      {/* <FilterFormWrapper
        onSearch={() => handleSearch()}
        onReset={() => handleReset()}
      /> */}
      <TableWrapper
        title='数据导入导出列表'
        isShowTitlePrefixIcon
        btns={(
          <>
            <Button type='primary' onClick={() => handleSearch()}>刷新</Button>
          </>
        )}
      >
        <Table
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
