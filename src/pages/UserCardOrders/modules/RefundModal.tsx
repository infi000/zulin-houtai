/*
 * @Author: Claude
 * @Description: UserCardOrders 订单退款模态框
 */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Col, InputNumber, Input } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { ModalTitle } from 'components/TitlePrefixIcon';
import { postRefund } from '../slice';

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

interface IProps {
  onClose: any;
  data: any;
}

function RefundModal(props: IProps) {
  const { onClose, data } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleRefund = async () => {
    const { id } = data;
    const { money, usercardleft } = await form.validateFields();
    const params = {
      oid: id,
      money,
      ...(usercardleft ? { usercardleft: JSON.parse(usercardleft) } : {}),
    };
    await dispatch(postRefund(params));
    onClose();
  };

  return (
    <Modal
      forceRender
      destroyOnClose
      title={<ModalTitle title="订单退款" />}
      visible
      onOk={useDebounceBefore(handleRefund)}
      onCancel={onClose}
      width={400}
    >
      <Form {...formItemLayout} form={form}>
        <Col span={24}>
          <Form.Item
            name="money"
            label="退款金额(元)"
            rules={[{ required: true, message: '必填' }]}
          >
            <InputNumber min={0} step={0.01} precision={2} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="usercardleft"
            label="设置的次数(JSON)"
          >
            <Input.TextArea placeholder="非必需，格式为JSON数据" rows={4} />
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  );
}

export default RefundModal;
