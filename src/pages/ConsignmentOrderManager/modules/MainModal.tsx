import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Select, Form, Input, InputNumber, DatePicker, Checkbox, Radio, Col, Upload, Button } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { isModify, isView, isCreate } from 'utils/utils';
import { falsyParamsFilter } from 'utils/filters';
import { ModalTitle } from 'components/TitlePrefixIcon';
import { CREATE, EDIT, VIEW, yesOrNo } from 'utils/constants';
import moment from 'moment';
import { selectAllDictMap } from 'store/selectors';
import { actions, postCreate, postEdit } from '../slice';
import selectors from '../selectors';
import { IDetail } from '../types';
import { formatPostParams } from '../adapter';
import { UploadOutlined } from '@ant-design/icons';
import ImageBox from 'components/ImageBox';
import { O_STATUS_MAP } from '../constants';

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
  const memoData = useMemo<IDetail | Record<string, unknown>>(() => {
    if (type === CREATE) {
      return {};
    }
    const oData = { ...data };
    if (data.ctime) {
      // 日期
      const { ctime } = data;
      (oData as any).ctime = moment.unix(Number(ctime)).format('YYYY-MM-DD HH:mm:ss');
    }
    if (data.ostatus) {
      // 日期
      const { ostatus } = data;
      (oData as any).ostatus = O_STATUS_MAP.get(ostatus);
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
          tid: data?.id,
        })));
      }
    }
  };
  console.log('memoData', memoData);
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
        <Col span={24}><Form.Item label='订单id' name='id' initialValue={memoData?.id || ''}><Input disabled={isView(type)} /></Form.Item></Col>
        <Col span={24}><Form.Item label='用户id' name='uid' initialValue={memoData?.uid}><Input disabled={isView(type)} /></Form.Item></Col>
        <Col span={24}><Form.Item label='用户名' name='uname' initialValue={memoData?.uname}><Input disabled={isView(type)} /></Form.Item></Col>
        <Col span={24}><Form.Item label='寄卖商品id' name='gbid' initialValue={memoData?.gbid}><Input disabled={isView(type)} /></Form.Item></Col>
        <Col span={24}><Form.Item label='寄卖商品名称' name='jgtitle' initialValue={memoData?.jgtitle}><Input disabled={isView(type)} /></Form.Item></Col>
        <Col span={24}><Form.Item label='订单总价' name='total' initialValue={memoData?.total}><Input disabled={isView(type)} /></Form.Item></Col>
        <Col span={24}><Form.Item label='订单折扣' name='discount' initialValue={memoData?.discount}><Input disabled={isView(type)} /></Form.Item></Col>
        <Col span={24}><Form.Item label='订单积分抵扣' name='scorecount' initialValue={memoData?.scorecount}><Input disabled={isView(type)} /></Form.Item></Col>
        <Col span={24}><Form.Item label='订单实付' name='totalpay' initialValue={memoData?.totalpay}><Input disabled={isView(type)} /></Form.Item></Col>
        <Col span={24}><Form.Item label='订单状态' name='ostatus' initialValue={memoData?.ostatus}><Input disabled={isView(type)} /></Form.Item></Col>
        <Col span={24}><Form.Item label='订单创建时间' name='ctime' initialValue={memoData?.ctime}><Input disabled={isView(type)} /></Form.Item></Col>
        <Col span={24}><Form.Item label='用户手机号' name='uphone' initialValue={memoData?.uphone}><Input disabled={isView(type)} /></Form.Item></Col>
        <Col span={24}><Form.Item label='寄卖商品所属用户id' name='ownuid' initialValue={memoData?.ownuid}><Input disabled={isView(type)} /></Form.Item></Col>
        <Col span={24}><Form.Item label='寄卖商品所属用户名' name='ownuname' initialValue={memoData?.ownuname}><Input disabled={isView(type)} /></Form.Item>
        </Col>
        <Col span={24}><Form.Item label='寄卖商品所属用户手机号' name='ownuphone' initialValue={memoData?.ownuphone}><Input disabled={isView(type)} /></Form.Item>
        </Col>
        <Col span={24}><Form.Item label='订单备注' name='remark' initialValue={memoData?.remark}><Input disabled={isView(type)} /></Form.Item></Col>
      </Form>
    </Modal>
  );
}

export default MainModal;
