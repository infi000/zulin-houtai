/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-12-21 00:23:06
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-21 00:40:48
 * @FilePath: /houtaiv2/src/pages/Smjcjl/modules/ExportModal.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Col, DatePicker } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { ModalTitle } from 'components/TitlePrefixIcon';
import { getCookie } from 'utils/utils';
import moment from 'moment';

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
}

function MainModal(props: IProps) {
  const { onClose } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleExport = async () => {
    const token = getCookie('token');
    const { time } = await form.validateFields();
    const starttime = moment([...time][0]).format('YYYY-MM-DD');
    const endtime = moment([...time][1]).format('YYYY-MM-DD');
    // console.log(`/index.php/AdminApi/Card/checkexport?token=${token}&starttime=${starttime}&endtime=${endtime}`);
    window.open(`/index.php/AdminApi/Card/checkexport?token=${token}&starttime=${starttime}&endtime=${endtime}`, '_blank');
  };
  return (
    <Modal
      forceRender
      destroyOnClose
      title={<ModalTitle title='导出' />}
      visible
      onOk={useDebounceBefore(handleExport)}
      onCancel={onClose}
      width={400}
    >
      <Form {...formItemLayout} form={form}>
        <Col span={24}><Form.Item
          name='time'
          label='选择时间'
          rules={[{ required: true, message: '必填' }]}
        >
          <RangePicker />
        </Form.Item>
        </Col>

      </Form>
    </Modal>
  );
}

export default MainModal;
