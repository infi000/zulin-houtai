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
import { actions, postCreate, postEdit } from '../slice';
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
  const dictMaps = useSelector(selectAllDictMap);
  const { data, type = EDIT, visible = false } = mainModal;

  useEffect(() => {
    visible && form.resetFields();
  }, [form, visible]);

  // eslint-disable-next-line max-len
  const memoData = useMemo<ITableItem | Record<string, unknown>>(() => {
    if (type === CREATE) {
      return {};
    }
    const oData = { ...data };
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
      case STATUS:
        return '修改状态';
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
      } else if (type === STATUS) {
        // dispatch(postStatus(falsyParamsFilter({
        //   ...values,
        //   epid: data?.id,
        // })));
      } else {
        dispatch(postEdit(falsyParamsFilter({
          ...values,
          cid: data?.id,
        })));
      }
    }
  };
  // 	cardname:卡片名称
  // cardtype:卡片类型，1年卡，2季卡，3月卡，4次卡
  // cardduration:有效期
  // carddurationtype：有效期类型，天day、周week、月month、年year 
  // cardcount:次卡次数（次卡类型有效） 
  // thumbinal:卡缩略图文件域（小图）
  // cardpic:卡说明图片,文件域（大图）
  // price：卡价格
  // usedaytype:使用日类型，1周二至周日；2周二至周五
  // remark：卡片说明

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
        <Col span={24}><Form.Item
          label='卡片名称'
          name='cardname'
          initialValue={memoData?.cardname || ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <Input
            placeholder='请输入'
            disabled={isView(type)}
          />
        </Form.Item>
        </Col>
        <Col span={24}><Form.Item
          label='卡片类型'
          name='cardtype'
          initialValue={memoData?.cardtype || ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <Select allowClear  disabled={isView(type)}>
            {
              Array.from(CARD_TYPE_MAP).map(([key, value]) => (
                <Select.Option key={key} value={key}>{value}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        </Col>
        <Col span={24}><Form.Item
          label='有效期'
          name='cardduration'
          initialValue={memoData?.cardduration || ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={24}><Form.Item
          label='有效期类型'
          name='carddurationtype'
          initialValue={memoData?.carddurationtype || ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <Select allowClear disabled={isView(type)}>
            {
              Array.from(CARD_DURATION_TYPE_MAP).map(([key, value]) => (
                <Select.Option key={key} value={key}>{value}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        </Col>
        <Col span={24}><Form.Item
          label='次卡次数（次卡类型有效）'
          name='cardcount'
          initialValue={memoData?.cardcount || ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={24}><Form.Item
          label='卡缩略图（小图）'
          name='thumbinal'
          rules={[{ required: !isModify(type), message: '必填项' }]}
        >
          <Upload action='' beforeUpload={() => false} listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        </Col>
        <Col span={24}><Form.Item
          label='卡说明图片（大图）'
          name='cardpic'
          rules={[{ required: !isModify(type), message: '必填项' }]}
        >
          <Upload action='' beforeUpload={() => false} listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        </Col>

        <Col span={24}><Form.Item
          label='卡价格'
          name='price'
          initialValue={(memoData?.price || memoData?.price === 0) ? memoData?.price : ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            placeholder='请输入押金价格'
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={24}><Form.Item
          label='有效期类型'
          name='usedaytype'
          initialValue={memoData?.usedaytype || ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <Select allowClear disabled={isView(type)}>
            {
              Array.from(USE_DAY_TYPE_MAP).map(([key, value]) => (
                <Select.Option key={key} value={key}>{value}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        </Col>
        <Col span={24}><Form.Item
          label='卡片说明'
          name='remark'
          initialValue={memoData?.remark || ''}
          rules={[{ required: true, message: '必填项' }]}
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
