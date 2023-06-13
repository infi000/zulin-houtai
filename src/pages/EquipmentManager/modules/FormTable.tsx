/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-06 22:49:51
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-09 00:53:20
 * @FilePath: /houtai/src/pages/EquipmentManager/modules/FormTable.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as React from 'react';
import { Col, Form, Input, Row, Table, Button, Image, Select, DatePicker } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { useSelector, useDispatch } from 'react-redux';
import { falsyParamsFilter } from 'utils/filters';
import { baseTableConf } from 'configs/base.conf';
import FilterFormWrapper from 'components/FilterFormWrapper';
import TableWrapper from 'components/TableWrapper';
import TableButton from 'components/TableButton';
import { selectAllDictMap } from 'store/selectors';
import { CREATE, EDictMap, EExportModuleId, EDIT, VIEW, STATUS } from 'utils/constants';
import Auth from 'containers/AuthController';
import authMap from 'configs/auth.conf';
import { objToArray } from 'utils/utils';
import { actions, getDataDetail, getDataList, getDel } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { formatSearchParams } from '../adapter';
import { STATUS_MAP } from '../constants';
import moment from 'moment';
import useDebounce from 'hooks/useDebounce';

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
    if (type !== CREATE) {
      const { id } = data;
      await dispatch(getDataDetail({ epid: id, type }));
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
        moduleId: `${EExportModuleId['模板id']}`,
        templateId,
      },
    }));
  };

  // 删除
  const handleDel = (data: ITableItem) => {
    const { id } = data;
    dispatch(getDel({ id }));
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
      fixed: 'left',
    },
    // {
    //   title: '设备编码',
    //   dataIndex: 'ecode',
    //   key: 'ecode',
    //   width: 100,
    //   align: 'left',
    // },
    {
      title: '设备名称',
      dataIndex: 'title',
      key: 'title',
      width: 100,
      align: 'left',
    },
    // {
    //   title: '设备型号',
    //   dataIndex: 'emodel',
    //   key: 'emodel',
    //   width: 100,
    //   align: 'left',
    // },
    // {
    //   title: '出厂编号',
    //   dataIndex: 'factoryno',
    //   key: 'factoryno',
    //   width: 100,
    //   align: 'left',
    // },
    // {
    //   title: '生产厂商',
    //   dataIndex: 'manufacturer',
    //   key: 'manufacturer',
    //   width: 100,
    //   align: 'left',
    // },
    // {
    //   title: '设备类型',
    //   dataIndex: 'etype',
    //   key: 'etype',
    //   width: 100,
    //   align: 'left',
    // },
    // {
    //   title: '使用部门名称',
    //   dataIndex: 'department',
    //   key: 'department',
    //   width: 100,
    //   align: 'left',
    // },
    // {
    //   title: '设备位置',
    //   dataIndex: 'location',
    //   key: 'location',
    //   width: 100,
    //   align: 'left',
    // },
    {
      title: '房间预览图',
      dataIndex: 'thumbinal',
      key: 'thumbinal',
      align: 'left',
      render: (text:string) => <Image width={50} height={50} src={text} />,
    },
    {
      title: '设备大图',
      dataIndex: 'pics',
      key: 'pics',
      align: 'left',
      render: (text:any) => text?.map((item:any) => <Image width={50} height={50} src={item.pic} />),
    },
    // {
    //   title: '说明',
    //   dataIndex: 'des',
    //   key: 'des',
    //   width: 100,
    //   align: 'left',
    // },
    // {
    //   title: '单价，元/小时',
    //   dataIndex: 'price',
    //   key: 'price',
    //   width: 100,
    //   align: 'left',
    // },
    // {
    //   title: '购置时间',
    //   dataIndex: 'buytime',
    //   key: 'buytime',
    //   width: 100,
    //   align: 'left',
    // },
    // {
    //   title: '购置价格',
    //   dataIndex: 'buyprice',
    //   key: 'buyprice',
    //   width: 100,
    //   align: 'left',
    // },
    // {
    //   title: '备注',
    //   dataIndex: 'remark',
    //   key: 'remark',
    //   width: 100,
    //   align: 'left',
    // },
    {
      title: '房间创建时间',
      dataIndex: 'ctime',
      key: 'ctime',
      width: 200,
      align: 'left',
      render: (text: any) => (text ? moment.unix(text).format('YYYY-MM-DD hh:mm:ss') : '-'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'left',
      render: (text: any) => (STATUS_MAP.get(`${text}`) || '-'),
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 100,
      render: (_value: unknown, row: ITableItem) => (
        <>
          <Auth authCode={null}>
            <TableButton onClick={() => openModalWithOperate(STATUS, row)}>修改状态</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton onClick={() => openModalWithOperate(VIEW, row)}>查看</TableButton>
          </Auth>
          <Auth authCode={null}>
            <TableButton onClick={() => openModalWithOperate(EDIT, row)}>编辑</TableButton>
          </Auth>
          {/* <Auth authCode={null}>
            <TableButton isWrapperConfirm onClick={() => handleDel(row)}>删除</TableButton>
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
              <Form.Item name='ecode' label='设备编码'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='title' label='设备名称'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='emodel' label='设备型号'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='factoryno' label='出厂编号'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='manufacturer' label='生产厂商'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='department' label='使用部门名称'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='location' label='设备位置'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='thumbinal' label='房间预览图'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='des' label='说明'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='price' label='单价，元/小时'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='buytime' label='购置时间'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='buyprice' label='购置价格'>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='ctime' label='房间创建时间'>
                <Input allowClear placeholder='请输入' />
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
            {/* <Auth authCode={null}>
              <Button type='primary' onClick={handleImport}>导入</Button>
            </Auth> */}
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
