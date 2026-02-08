import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Select, Form, Input, InputNumber, DatePicker, Checkbox, Radio, Col, Upload, Button, TimePicker } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { isModify, isView, isCreate } from 'utils/utils';
import { falsyParamsFilter } from 'utils/filters';
import { ModalTitle } from 'components/TitlePrefixIcon';
import { CREATE, EDIT, STATUS, VIEW, yesOrNo } from 'utils/constants';
import moment from 'moment';
import { selectAllDictMap } from 'store/selectors';
import { UploadOutlined } from '@ant-design/icons';
import { actions, postCreate, postEdit, postStatus } from '../slice';
import selectors from '../selectors';
import { ITableItem } from '../types';
import { formatPostParams } from '../adapter';
import { STATUS_MAP } from '../constants';
import ImageBox from 'components/ImageBox';

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
  const dictMaps = useSelector(selectAllDictMap);
  const { data, type = EDIT, visible = false } = mainModal;

  useEffect(() => {
    visible && form.resetFields();
  }, [form, visible]);

  // eslint-disable-next-line max-len
  const memoData = useMemo<ITableItem | Record<string, unknown>>(() => {
    if (type === CREATE) {
      return {};
    }
    const oData = { ...data };
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
      case STATUS:
        return '修改状态';
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
      if (type === CREATE) {
        dispatch(postCreate(falsyParamsFilter(values)));
      } else {
        dispatch(postEdit(falsyParamsFilter({
          ...values,
          id: data?.id,
        })));
      }
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
          <Col span={24}>
            <Form.Item
              label='小分类id'
              name='ecid'
              initialValue={memoData?.ecid || ''}
              rules={[{ required: true, message: '必填项' }]}
            >
              <Input
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label='开始时间'
              name='starttime'
              initialValue={memoData?.starttime || ''}
              rules={[{ required: true, message: '必填项' }]}
            >
              <Input placeholder='开始时间例如：12:00' disabled={isView(type)} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label='结束时间'
              name='endtime'
              initialValue={memoData?.endtime || ''}
              rules={[{ required: true, message: '必填项' }]}
            >
              <Input placeholder='结束时间例如：12:00' disabled={isView(type)} />
            </Form.Item>
          </Col>

          <Col span={24}><Form.Item
            label='工时数'
            name='duration'
            initialValue={(memoData?.duration || memoData?.duration === 0) ? memoData?.duration : ''}
            rules={[{ required: true, message: '必填项' }]}
          >
            <InputNumber
              disabled={isView(type)}
              style={{ width: '100%' }}
            />
          </Form.Item>
          </Col>

        </>
      </Form>
    </Modal>
  );
}

export default MainModal;
