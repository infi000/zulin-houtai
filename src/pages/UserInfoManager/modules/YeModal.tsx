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
import { actions, postBuysearch, postUserverify } from '../slice';
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

function YeModal() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const YeModalInfo = useSelector(selectors.YeModalInfo);
  const loading = useSelector(selectors.loading);
  const dictMaps = useSelector(selectAllDictMap);
  const { data, type = EDIT, visible = false } = YeModalInfo;

  useEffect(() => {
    visible && form.resetFields();
  }, [form, visible]);


  const handleCancel = (): void => {
    dispatch(actions.updateYeModalInfo({ visible: false, data: {} }));
  };

  const handleOk = async (): Promise<void> => {
    if (type === VIEW) {
      handleCancel();
    } else {
      const values = await form.validateFields();
      dispatch(postBuysearch(formatPostParams({ ...values, uid: data.id })));
    }
  };

  return (
    <Modal
      forceRender
      destroyOnClose
      title='修改余额'
      visible={visible}
      confirmLoading={loading}
      onOk={useDebounceBefore(handleOk)}
      onCancel={handleCancel}
      width={800}
    >
      <Form {...formItemLayout} form={form}>
        <Col span={24}>
          <Form.Item name='ta' label='余额'>
            <InputNumber />
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  );
}

export default YeModal;
