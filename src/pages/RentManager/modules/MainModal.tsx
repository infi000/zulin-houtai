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
import { actions, postCreate, postEdit, postOrderverification } from '../slice';
import selectors from '../selectors';
import { ITableItem } from '../types';
import { formatPostParams } from '../adapter';
import { UploadOutlined } from '@ant-design/icons';
import ImageBox from 'components/ImageBox';
import { CARD_DURATION_TYPE_MAP, CARD_TYPE_MAP, USE_DAY_TYPE_MAP } from '../constants';

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

  const handleCancel = (): void => {
    dispatch(actions.updateMainModalVisible(false));
  };

  const handleOk = async (): Promise<void> => {
    if (type === VIEW) {
      handleCancel();
    } else {
      let values = await form.validateFields();
      const { id } = data;
      console.log(data);
      values = formatPostParams({ oid: id, ...values });
      dispatch(postOrderverification(falsyParamsFilter(values)));
    }
  };
  return (
    <Modal
      forceRender
      destroyOnClose
      title='核销'
      visible={visible}
      confirmLoading={loading}
      onOk={useDebounceBefore(handleOk)}
      onCancel={handleCancel}
      width={800}
    >
      <Form {...formItemLayout} form={form}>
        <Col span={24}><Form.Item
          label='损失金额'
          name='brokenmoney'
        >
          <InputNumber
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={24}><Form.Item
          label='退款金额'
          name='backmoney'
        >
          <InputNumber
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>

        <Col span={24}><Form.Item
          label='说明'
          name='remark'
        >
          <Input.TextArea
            placeholder='请输入'
            disabled={isView(type)}
          />
        </Form.Item>
        </Col>
      </Form>
    </Modal>
  );
}

export default MainModal;
