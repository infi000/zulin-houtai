import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Select, Form, Input, InputNumber, DatePicker, Checkbox, Radio, Col, Upload, Button } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { isModify, isView, isCreate, getQueryString } from 'utils/utils';
import { falsyParamsFilter } from 'utils/filters';
import { ModalTitle } from 'components/TitlePrefixIcon';
import { CREATE, EDIT, STATUS, VIEW, yesOrNo } from 'utils/constants';
import moment from 'moment';
import { selectAllDictMap } from 'store/selectors';
import { actions, postCreate, postEdit } from '../slice';
import selectors from '../selectors';
import { ITableItem } from '../types';
import { formatPostParams } from '../adapter';
import { UploadOutlined } from '@ant-design/icons';
import ImageBox from 'components/ImageBox';
import { STATUS_MAP } from '../constants';

const { useEffect, useMemo } = React;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

function MainModal() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const mainModal = useSelector(selectors.mainModal);
  const loading = useSelector(selectors.loading);
  const eid = useSelector(selectors.eid);
  const dictMaps = useSelector(selectAllDictMap);
  const { data, type = EDIT, visible = false } = mainModal as any;
  const teaid = getQueryString('teaid');

  useEffect(() => {
    visible && form.resetFields();
  }, [form, visible]);

  // eslint-disable-next-line max-len
  const memoData = useMemo<any>(() => {
    if (type === CREATE) {
      return {};
    }
    const oData = { ...data };
    if (data.starttime) {
      // 日期
      const { starttime } = data;
      (oData as any).starttime = moment.unix(Number(starttime));
    }
    if (data.endtime) {
      // 日期
      const { endtime } = data;
      (oData as any).endtime = moment.unix(Number(endtime));
    }
    return {
      ...oData,
      // 添加需要格式化的初始值
    };
  }, [data, type]);

  const modalTitle = useMemo((): string => {
    switch (type) {
      case CREATE:
        return '新建';
      case EDIT:
        return '编辑';
      case '核销':
        return '订单核销';
      case '续订':
        return '订单续订';
      default:
        return '查看';
    }
  }, [type]);

  const handleCancel = (): void => {
    dispatch(actions.updateMainModalVisible(false));
  };

  const handleOk = async (): Promise<void> => {
    if (type === VIEW) {
      handleCancel();
    } else {
      let values = await form.validateFields();
      values = formatPostParams(values);
      values.eid = eid;
      dispatch(postEdit(falsyParamsFilter({
        ...values,
      })));
    }
  };

  return (
    <Modal
      forceRender
      destroyOnClose
      title={<ModalTitle title={modalTitle} />}
      visible={visible}
      confirmLoading={loading}
      onOk={useDebounceBefore(handleOk)}
      onCancel={handleCancel}
      width={800}
    >
      <Form {...formItemLayout} form={form}>
        <>
          <Col span={24}><Form.Item
            label='老师id'
            name='teaid'
            initialValue={teaid || ''}
            rules={[{ required: true, message: '必填项' }]}
          >
            <Input
              placeholder='请输入'
              disabled={isView(type)}
            />
          </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label='开始时间'
              name='starttime'
              initialValue={memoData?.starttime || ''}
            >
              <DatePicker
                showTime
                format='YYYY-MM-DD HH:mm:ss'
                placeholder='请选择'
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label='结束时间'
              name='endtime'
              initialValue={memoData?.endtime || ''}
            >
              <DatePicker
                showTime
                format='YYYY-MM-DD HH:mm:ss'
                placeholder='请选择'
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label='小分类id'
              name='cid'
              initialValue={memoData?.cid || ''}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label='状态'
              name='status'
              initialValue={memoData?.status || ''}
            >
              <Select allowClear>
                {
                  Object.keys(STATUS_MAP).map(item => {
                    return <Select.Option key={item} value={item}>{STATUS_MAP[item]}</Select.Option>
                  })
                }
              </Select>
            </Form.Item>
          </Col>
        </>
      </Form>
    </Modal>
  );
}

export default MainModal;
