import * as React from 'react';
import { Form, Table, Button, Modal, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import moment from 'moment';

import { getLogListService } from './service';

const { useState, useEffect } = React;

interface IProps {
  columns?: any[];
  logId?: string | number,
  tableName: string;
  title?: string;
  sysCode?: string;
  setShow: (isShow:boolean)=>any;
  isShow: boolean;
}

const TableContainer = styled.div`
  .ant-table-tbody {
    background: #fff;
  }
`;
const LogContent = (props: IProps) => {
  const { columns, logId, tableName, title, sysCode, setShow, isShow } = props;
  const [form] = Form.useForm();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (): Promise<void> => {
    const values = await form.validateFields();

    if (values) {
      const { dateRange } = values;
      let s_dateRange;
      let e_dateRange;
      if (Array.isArray(dateRange) && dateRange[0]) {
        s_dateRange = (dateRange[0] as any).startOf('day').format('YYYY-MM-DD HH:mm:ss');
      }
      if (Array.isArray(dateRange) && dateRange[1]) {
        e_dateRange = (dateRange[1] as any).endOf('day').format('YYYY-MM-DD HH:mm:ss');
      }
      const requestParams = {
        sysCode: sysCode || 'bms',
        tableName,
        id: logId,
        updateTmStart: s_dateRange,
        updateTmEnd: e_dateRange,
      };
      setLoading(true);
      getLogListService(requestParams)
        .then((res: Record<string, any>) => {
          if (res.duplicateFetch) return;
          setLogs(res?.data || []);
          setLoading(false);
        }).catch(() => {
          setLogs([]);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    handleSubmit();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logId]);

  const logColumns = [{
    title: '操作描述',
    dataIndex: 'eventTypeName',
    key: 'eventTypeName',
    width: 80,
  }, {
    title: '详细描述',
    dataIndex: 'changeDesc',
    key: 'changeDesc',
    width: 200,
  }, {
    title: '操作人',
    dataIndex: 'updateUserName',
    key: 'updateUserName',
    width: 80,

  }, {
    title: '操作时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 100,
  }].filter(Boolean);
  const resendOkAndCancel = () => {
    setShow(false);
    setLogs([]);
  };

  const dateFormat = 'YYYY-MM-DD';

  return (
    <>
      <Modal
        title={title || '查看日志'}
        visible={isShow}
        width={1000}
        onOk={resendOkAndCancel}
        onCancel={resendOkAndCancel}
        destroyOnClose
        centered
        okText='确定'
        cancelText='取消'
      >
        <Form
          layout='inline'
          form={form}
          style={{ marginBottom: '20px' }}
        >
          <Form.Item
            name='dateRange'
          >
            <DatePicker.RangePicker
              allowClear
              format={dateFormat}
              style={{ width: 500 }}
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' onClick={handleSubmit}><SearchOutlined />查询</Button>
          </Form.Item>
        </Form>

        <TableContainer>
          <Table
            loading={loading}
            bordered
            size='small'
            columns={columns || logColumns}
            dataSource={logs}
            rowKey='id'
            pagination={false}
            scroll={{ y: 500, x: '100%' }}
          />
        </TableContainer>
      </Modal>
    </>
  );
};

export default LogContent;
