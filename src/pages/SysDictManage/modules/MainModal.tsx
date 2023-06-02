import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Select, Form, Input, InputNumber, DatePicker, Checkbox, Radio } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { isModify, isView, isCreate } from 'utils/utils';
import { falsyParamsFilter } from 'utils/filters';
import { ModalTitle } from 'components/TitlePrefixIcon';
import { CREATE, EDIT, VIEW, yesOrNo } from 'utils/constants';

import { actions, postCreate, postEdit } from '../slice';
import selectors from '../selectors';
import { ITableItem } from '../types';
import { formatPostParams } from '../adapter';

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
  const { data, type = EDIT, visible = false } = mainModal;

  useEffect(() => {
    visible && form.resetFields();
  }, [form, visible]);

  // eslint-disable-next-line max-len
  const memoData = useMemo<ITableItem | Record<string, unknown>>(() => {
    if (type === CREATE) {
      return {};
    }
    return {
      ...data,
      // 添加需要格式化的初始值
    };
  }, [data, type]);

  const modalTitle = useMemo((): string => {
    switch (type) {
      case CREATE:
        return '新建';
      case EDIT:
        return '编辑';
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
        dispatch(postEdit({
          ...values,
          dictId: data?.dictId,
        }));
      }
    }
  };

  return (
    <Modal
      forceRender
      destroyOnClose
      centered
      title={<ModalTitle title={modalTitle} />}
      visible={visible}
      confirmLoading={loading}
      onOk={useDebounceBefore(handleOk)}
      onCancel={handleCancel}
      width={800}
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item
          label='字典名称'
          name='dictName'
          initialValue={memoData?.dictName || ''}
        >
          <Input
            placeholder='请输入'
            disabled={isView(type) || isModify(type)}
          />
        </Form.Item>
        <Form.Item
          label='字典类型'
          name='dictType'
          initialValue={memoData?.dictType || ''}
        >
          <Input
            placeholder='请输入'
            disabled={isView(type) || isModify(type)}
          />
        </Form.Item>
        <Form.Item
          label='生效状态'
          name='status'
          initialValue={memoData?.status || '1'}
        >
          <Radio.Group disabled={isView(type)}>
            {
              Array.from(yesOrNo).map((item: any) => <Radio value={`${item[0]}`} key={item[0]}>{item[1]}</Radio>)
            }
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label='备注'
          name='remark'
          initialValue={memoData?.remark || ''}
        >
          <Input.TextArea
            placeholder='请输入备注'
            disabled={isView(type)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default MainModal;
