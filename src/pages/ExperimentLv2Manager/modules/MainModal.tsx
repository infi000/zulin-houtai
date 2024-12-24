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
  const eid = useSelector(selectors.eid);
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
      values.eid = eid;
      if (type === CREATE) {
        dispatch(postCreate(falsyParamsFilter(values)));
      } else if (type === STATUS) {
        // dispatch(postStatus(falsyParamsFilter({
        //   ...values,
        //   epid: data?.id,
        // })));
      } else {
        dispatch(postEdit(falsyParamsFilter({
          ...values,
          cid: data?.id,
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
          <Col span={24}><Form.Item
            label='标题'
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
            label='时长（小时）'
            name='duration'
            initialValue={memoData?.duration || ''}
            rules={[{ required: true, message: '必填项' }]}
          >
            <Input
              placeholder='请输入'
              disabled={isView(type)}
            />
          </Form.Item>
          </Col>
          <Col span={24}><Form.Item
            label='推送电话'
            name='phones'
            initialValue={memoData?.phones || ''}
            rules={[{ required: true, message: '必填项' }]}
            extra='多号码时，用空格隔开'
          >
            <Input
              placeholder='请输入'
              disabled={isView(type)}
            />
          </Form.Item>
          </Col>
          <Col span={24}><Form.Item
            label='金额(元)'
            name='price'
            initialValue={memoData?.price || ''}
            rules={[{ required: true, message: '必填项' }]}
          >
            <InputNumber
              placeholder='请输入'
              disabled={isView(type)}
            />
          </Form.Item>
          </Col>
          <Col span={24}><Form.Item
            label='缩略图'
            name='thumbinal'
            rules={[{ required: !isModify(type), message: '必填项' }]}
          >
            <Upload action='' beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          </Col>
          <Col span={24}><Form.Item
            label='实验室老师'
            name='remark'
            initialValue={memoData?.remark || ''}
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
              label='类型'
              name='ctype'
              initialValue={memoData?.ctype || '1'}
            >
              <Select disabled={isView(type)}>
                <Select.Option value='1'>普通非系列</Select.Option>
                <Select.Option value='2'>系列</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}><Form.Item
            label='描述'
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
        </>
      </Form>
    </Modal>
  );
}

export default MainModal;
