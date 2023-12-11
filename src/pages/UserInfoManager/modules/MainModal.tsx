import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Select, Form, Input, InputNumber, DatePicker, Checkbox, Radio, Col, Upload, Button, Image, Descriptions } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { isModify, isView, isCreate } from 'utils/utils';
import { falsyParamsFilter } from 'utils/filters';
import { ModalTitle } from 'components/TitlePrefixIcon';
import { CREATE, EDIT, REVIEW, VIEW, yesOrNo } from 'utils/constants';
import moment from 'moment';
import { selectAllDictMap } from 'store/selectors';
import { UploadOutlined } from '@ant-design/icons';
import ImageBox from 'components/ImageBox';
import { actions, postUserverify } from '../slice';
import selectors from '../selectors';
import { ITableItem } from '../types';
import { formatPostParams } from '../adapter';
import { postSetBgService, postSetYearService } from '../services';
import { M_TYPE_MAP, VERIFY_MAP } from '../constants';

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
  const memoData = useMemo<ITableItem | Record<string, unknown>>(() => ({}), []);
  const modalTitle = useMemo((): string => {
    switch (type) {
      case REVIEW:
        return '审核';
      case '设置背景':
        return '设置背景';
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
      const values = await form.validateFields();
      if (type === REVIEW) {
        dispatch(postUserverify(formatPostParams({ ...values, uid: data.id })));
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
          type === REVIEW && (
            <>
              <Col span={24}><Form.Item name='verify' label='审核'>
                <Select allowClear>
                  {
                    Array.from(VERIFY_MAP).map(([key, value]) => (
                      <Select.Option key={key} value={key}>{value}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='verifycontent' label='审核不通过原因'>
                  <Input />
                </Form.Item>
              </Col>
            </>
          )
        }
      </Form>
      {
        type === VIEW && (
          <Descriptions title='用户信息'>
            <Descriptions.Item label='UID'>{data.uid}</Descriptions.Item>
            <Descriptions.Item label='是否同意协议'>{data.isagreement}</Descriptions.Item>
            <Descriptions.Item label='审核状态'>{VERIFY_MAP.get(data.verify)}</Descriptions.Item>
            <Descriptions.Item label='审核不通过原因'>{data.verifycontent}</Descriptions.Item>
            <Descriptions.Item label='注册号'>{data.register.regnum}</Descriptions.Item>
            <Descriptions.Item label='公司名称'>{data.register.company}</Descriptions.Item>
            <Descriptions.Item label='公司地址'>{data.register.companyaddress}</Descriptions.Item>
            <Descriptions.Item label='真实姓名'>{data.register.username}</Descriptions.Item>
            <Descriptions.Item label='身份证号'>{data.register.usercard}</Descriptions.Item>
            <Descriptions.Item label='手机号'>{data.register.userphone}</Descriptions.Item>
            <Descriptions.Item label='监护人姓名'>{data.register.userguardianname}</Descriptions.Item>
            <Descriptions.Item label='监护人手机号'>{data.register.userguardianphone}</Descriptions.Item>
            <Descriptions.Item label='监护人联系地址'>{data.register.userguardianaddress}</Descriptions.Item>
            <Descriptions.Item label='公司签约时间'>{data.register.companysigntime}</Descriptions.Item>
            <Descriptions.Item label='用户签约时间'>{data.register.usersigntime}</Descriptions.Item>
            <Descriptions.Item label='公司签约盖章'><Image width={50} height={50} src={data.register.companyseal} /></Descriptions.Item>
            <Descriptions.Item label='用户签约盖章'><Image width={50} height={50} src={data.register.usersign} /></Descriptions.Item>
            <Descriptions.Item label='监护人签约盖章'><Image width={50} height={50} src={data.register.userguardiansign} /></Descriptions.Item>
            <Descriptions.Item label='签约图片'><Image width={50} height={50} src={data.register.signpic} /></Descriptions.Item>
            <Descriptions.Item label='签约pdf'><a href={data.register.signpdf} target='_blank' rel='noreferrer'>查看</a></Descriptions.Item>

            <Descriptions.Item label='公司名称'>{data.safe.company}</Descriptions.Item>
            <Descriptions.Item label='父亲'>{data.safe.userparent1des}</Descriptions.Item>
            <Descriptions.Item label='家长名称1'>{data.safe.userparent1name}</Descriptions.Item>
            <Descriptions.Item label='家长联系电话1'>{data.safe.userparent1phone}</Descriptions.Item>
            <Descriptions.Item label='家长联系地址1'>{data.safe.userparent1address}</Descriptions.Item>
            <Descriptions.Item label='额外信息1'>{data.safe.userparent1remark}</Descriptions.Item>
            <Descriptions.Item label='母亲'>{data.safe.userparent2des}</Descriptions.Item>
            <Descriptions.Item label='家长名称2'>{data.safe.userparent2name}</Descriptions.Item>
            <Descriptions.Item label='家长联系电话2'>{data.safe.userparent2phone}</Descriptions.Item>
            <Descriptions.Item label='家长联系地址2'>{data.safe.userparent2address}</Descriptions.Item>
            <Descriptions.Item label='额外信息2'>{data.safe.userparent2remark}</Descriptions.Item>
            <Descriptions.Item label='用户签约时间'>{data.safe.usersigntime}</Descriptions.Item>
            <Descriptions.Item label='用户签约盖章'><Image width={50} height={50} src={data.register.usersign} /></Descriptions.Item>
            <Descriptions.Item label='监护人签约盖章'><Image width={50} height={50} src={data.register.userguardiansign} /></Descriptions.Item>
            <Descriptions.Item label='签约图片'><Image width={50} height={50} src={data.register.signpic} /></Descriptions.Item>
            <Descriptions.Item label='签约pdf'><a href={data.register.signpdf} target='_blank' rel='noreferrer'>查看</a></Descriptions.Item>

          </Descriptions>
        )
      }

    </Modal>
  );
}

export default MainModal;
