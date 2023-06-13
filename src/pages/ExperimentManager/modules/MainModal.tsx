import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Select, Form, Input, InputNumber, DatePicker, Checkbox, Radio, Col, Upload, Button } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { isModify, isView, isCreate } from 'utils/utils';
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
      } else if (type === STATUS) {
        // dispatch(postStatus(falsyParamsFilter({
        //   ...values,
        //   epid: data?.id,
        // })));
      } else {
        dispatch(postEdit({
          ...values,
          id: data?.id,
        }));
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
        {
          type === STATUS ? (
            <Col span={24}>
              <Form.Item
                name='status'
                label='状态'
                initialValue={memoData?.status || ''}
                rules={[{ required: true, message: '必填' }]}
              >
                <Select allowClear>
                  {
                    Array.from(STATUS_MAP).map(([key, value]) => (
                      <Select.Option key={key} value={key}>{value}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
          ) : (
            <>
              <Col span={24}><Form.Item
                label='实验项目标题'
                name='title'
                initialValue={memoData?.title || ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input
                  placeholder='请输入'
                  disabled={isView(type)}
                />
              </Form.Item>
              </Col>
              <Col span={24}><Form.Item
                label='缩略图'
                name='thumbinal'
                initialValue={memoData?.thumbinal || ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <Upload action='' beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
              </Col>
              <Col span={24}><Form.Item
                label='项目描述'
                name='des'
                initialValue={memoData?.des || ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input.TextArea
                  placeholder='请输入项目描述'
                  disabled={isView(type)}
                />
              </Form.Item>
              </Col>
              <Col span={24}><Form.Item
                label='押金价格'
                name='deposit'
                initialValue={(memoData?.deposit || memoData?.deposit === 0) ? memoData?.deposit : ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <InputNumber
                  placeholder='请输入押金价格'
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              </Col>
              <Col span={24}><Form.Item
                label='项目大图'
                name='pics'
                initialValue={memoData?.pics || ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <Upload action='' beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
              </Col>
            </>
          )
        }
      </Form>
    </Modal>
  );
}

export default MainModal;
