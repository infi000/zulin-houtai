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
import { actions, postBuysearch, postInfoModify, postUserverify } from '../slice';
import selectors from '../selectors';
import { ITableItem } from '../types';
import { formatEditParams, formatPostParams } from '../adapter';
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

function EditModal() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const EditModalInfo = useSelector(selectors.EditModalInfo);
  const loading = useSelector(selectors.loading);
  const dictMaps = useSelector(selectAllDictMap);
  const { data, type = EDIT, visible = false } = EditModalInfo;
  const memoData = useMemo<any>(() => {
    if (visible) {

      const { birthday, nickname, realname, sex, school, mobile, } = data;
      return { birthday, nickname, realname, sex, school, mobile, };
    } else {
      return {};
    }
  }, [visible]);

  useEffect(() => {
    visible && form.resetFields();
  }, [form, visible]);


  const handleCancel = (): void => {
    dispatch(actions.updateEditModalInfo({ visible: false, data: {} }));
  };

  const handleOk = async (): Promise<void> => {
    const values = await form.validateFields();
    dispatch(postInfoModify(formatEditParams({ ...values, uid: data.id })));
  };

  return (
    <Modal
      forceRender
      destroyOnClose
      title='编辑信息'
      visible={visible}
      confirmLoading={loading}
      onOk={useDebounceBefore(handleOk)}
      onCancel={handleCancel}
      width={800}
    >
      <Form {...formItemLayout} form={form}>
        <Col span={24}>
          <Form.Item name='nickname' label='昵称' initialValue={memoData.nickname}>
            <Input />
          </Form.Item>
          <Form.Item name='realname' label='真实姓名' initialValue={memoData.realname}>
            <Input />
          </Form.Item>
          <Form.Item name='sex' label='性别' initialValue={memoData.sex}>
            <Select allowClear>
              {
                [{ label: '男', val: '1' }, { label: '女', val: '2' }].map((item) => (
                  <Select.Option key={item.val} value={item.val}>{item.label}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item name='birthday' label='生日' initialValue={memoData.birthday ? moment(memoData.birthday) : undefined}>
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name='mobile' label='手机' initialValue={memoData.mobile}>
            <Input />
          </Form.Item>
          <Form.Item name='school' label='学校' initialValue={memoData.school}>
            <Input />
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  );
}

export default EditModal;
