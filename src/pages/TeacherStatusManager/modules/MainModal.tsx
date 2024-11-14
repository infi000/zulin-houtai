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
  const { data, type = EDIT, visible = false } = mainModal;
  const teaid = getQueryString('teaid');

  useEffect(() => {
    visible && form.resetFields();
  }, [form, visible]);

  const modalTitle = useMemo((): string => {
    return '修改状态';
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
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label='状态'
              name='status'
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
