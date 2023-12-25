/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-12-21 00:23:06
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-23 00:20:25
 * @FilePath: /houtaiv2/src/pages/Smjcjl/modules/ExportModal.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Col, DatePicker, InputNumber } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { ModalTitle } from 'components/TitlePrefixIcon';
import { getCookie, getQueryString } from 'utils/utils';
import moment from 'moment';
import { postCheck } from '../slice';

const { RangePicker } = DatePicker;
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

function CheckModal(props: IProps) {
  const { onClose, data } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleCheck = async () => {
    // cid：卡片id；接口Card/usercards中的id
    // uid：用户id
    // 非必需参数：
    // checknum：核销次数，默认不传时为1
    const { uid, id } = data;
    const { checknum } = await form.validateFields();
    const params = {
      cid: id,
      uid,
      checknum,
    };
    await dispatch(postCheck(params));
    onClose();
  };
  return (
    <Modal
      forceRender
      destroyOnClose
      title={<ModalTitle title='核销' />}
      visible
      onOk={useDebounceBefore(handleCheck)}
      onCancel={onClose}
      width={400}
    >
      <Form {...formItemLayout} form={form}>
        <Col span={24}><Form.Item
          name='checknum'
          label='次数'
          rules={[{ required: true, message: '必填' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        </Col>

      </Form>
    </Modal>
  );
}

export default CheckModal;
