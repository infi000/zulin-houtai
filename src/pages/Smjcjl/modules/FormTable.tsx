import * as React from 'react';
import { Form, Table, Image, Select, DatePicker, Tag, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { useSelector, useDispatch } from 'react-redux';
import { falsyParamsFilter } from 'utils/filters';
import { baseTableConf } from 'configs/base.conf';
import TableWrapper from 'components/TableWrapper';
import { selectAllDictMap } from 'store/selectors';
import { EDictMap, VIEW } from 'utils/constants';
import useDebounce from 'hooks/useDebounce';
import { getDiffTime } from 'utils/utils';
import Auth from 'containers/AuthController';
import { actions, getDataDetail, getDataList, getDel, getOnline } from '../slice';
import selectors from '../selectors';
import { ITableItem, TSearchParams } from '../types';
import { formatSearchParams } from '../adapter';
import { CHECK_MAP, MTYPE, card_type } from '../constants';
import ExportModal from './ExportModal';
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
  const [exportModal, setExportModal] = useState(false);
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
      title: 'cardcode',
      dataIndex: 'cardcode',
      key: 'cardcode',
      align: 'left',
      width: 100,
    },
    {
      title: '卡类型',
      dataIndex: 'cardtype',
      key: 'cardtype',
      align: 'left',
      width: 100,
      // 1年卡，2季卡，3月卡，4次卡
      render: (text: string, record: ITableItem) => {
        const txt = card_type.get(`${text}`) || '-'
        return txt;
      }
    },
    {
      title: '卡名称',
      dataIndex: 'cardname',
      key: 'cardname',
      align: 'left',
      width: 100,
    },
    {
      title: '过期时间',
      dataIndex: 'cardexpired',
      key: 'cardexpired',
      align: 'left',
      width: 100,
    },
    {
      title: '检票时间',
      dataIndex: 'checktime',
      key: 'checktime',
      align: 'left',
      width: 100,
    },
    {
      title: '剩余次数',
      dataIndex: 'leftcount',
      key: 'leftcount',
      align: 'left',
      width: 100,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'left',
      width: 100,
    },
    {
      title: 'uid',
      dataIndex: 'uid',
      key: 'uid',
      align: 'left',
      width: 100,
    },
    {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
      align: 'left',
      width: 100,
    }
  ];

  return (
    <>
      <TableWrapper
        title='列表'
        isShowTitlePrefixIcon
        btns={(
          <>
            <Auth authCode={null}>
              <Button type='primary' onClick={() => setExportModal(true)}>导出</Button>
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
      { exportModal && <ExportModal onClose={() => setExportModal(false)} />}
    </>
  );
}

export default FormTable;
