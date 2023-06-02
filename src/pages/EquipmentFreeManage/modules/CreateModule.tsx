/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-05-24 16:45:30
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-05-30 19:14:08
 * @FilePath: /ot-resources/src/pages/EquipmentFreeManage/modules/CreateModule.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Select, Form, Input, InputNumber, DatePicker, Col, Radio, Button, Space } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { isModify, isView, isCreate, objToArray, disabledDate } from 'utils/utils';
import { falsyParamsFilter } from 'utils/filters';
import { ModalTitle } from 'components/TitlePrefixIcon';
import { CREATE, EDIT, EDictMap, VIEW, yesOrNo } from 'utils/constants';
import moment from 'moment';
import { selectAllDictMap } from 'store/selectors';
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

function CreateModule() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const mainModal = useSelector(selectors.mainModal);
  const loading = useSelector(selectors.loading);
  const dictMaps = useSelector(selectAllDictMap);
  const { data, type = EDIT, visible = false } = mainModal;

  useEffect(() => {
    visible && form.resetFields();
  }, [form, visible]);

  const handleCancel = (): void => {
    dispatch(actions.updateMainModal({
      visible: false,
      type: CREATE,
    }));
  };

  const handleOk = async (): Promise<void> => {
    if (type === VIEW) {
      handleCancel();
    } else {
      let values = await form.validateFields();
      values = formatPostParams(values);
      dispatch(postCreate(falsyParamsFilter(values)));
    }
  };

  return (
    <Form {...formItemLayout} form={form}>
      <Col span={24}>
        <Form.Item
          label='技术标识号'
          name='tecIdentifyNo'
          rules={[{ required: true, message: '必填项' }]}
        >
          <Input
            placeholder='请输入'
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label='闲置月份'
          name='submitMonth'
          rules={[{ required: true, message: '必填项' }]}
          initialValue={moment()}
        >
          <DatePicker
            picker='month'
            format='YYYY-MM'
            placeholder='请选择'
            disabledDate={(current: any) => disabledDate(current, '仅当月次月')}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label='闲置原因'
          name='idleReason'
        >
          <Input.TextArea
            maxLength={100}
            placeholder='请输入'
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Space style={{ float: 'right' }}>
            <Button onClick={handleCancel}>
              取消
            </Button>
            <Button type="primary" onClick={useDebounceBefore(handleOk)}>
              确认
            </Button>
          </Space>
        </Form.Item>
      </Col>
    </Form>
  );
}

export default CreateModule;
