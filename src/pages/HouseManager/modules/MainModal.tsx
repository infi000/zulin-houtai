import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Select, Form, Input, InputNumber, DatePicker, Checkbox, Radio, Col } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { isModify, isView, isCreate } from 'utils/utils';
import { falsyParamsFilter } from 'utils/filters';
import { ModalTitle } from 'components/TitlePrefixIcon';
import { CREATE, EDIT, VIEW, yesOrNo } from 'utils/constants';
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
        dispatch(postEdit({
          ...values,
          id: data?.id,
        }));
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
        <Col span={6}><Form.Item
          label='自增id'
          name='id'
          initialValue={(memoData?.id || memoData?.id === 0) ? memoData?.id : ''}
        >
          <InputNumber
            placeholder='请输入自增id'
            disabled={!isCreate(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='房间标题'
          name='title'
          initialValue={memoData?.title || ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <Input
            placeholder='请输入'
            disabled={isView(type)}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='房间预览图'
          name='thumbinal'
          initialValue={memoData?.thumbinal || ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <Input
            placeholder='请输入'
            disabled={isView(type)}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='房间说明'
          name='des'
          initialValue={memoData?.des || ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <Input.TextArea
            placeholder='请输入房间说明'
            disabled={isView(type)}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='房间单价，元/小时'
          name='price'
          initialValue={(memoData?.price || memoData?.price === 0) ? memoData?.price : ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            placeholder='请输入房间单价，元/小时'
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='房间创建时间'
          name='ctime'
          initialValue={(memoData?.ctime || memoData?.ctime === 0) ? memoData?.ctime : ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            placeholder='请输入房间创建时间'
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='状态，1正常，0下线'
          name='status'
          initialValue={memoData?.status || ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <Radio.Group disabled={isView(type)}>
            {
              Array.from(yesOrNo).map((item: any) => <Radio value={item[0]} key={item[0]}>{item[1]}</Radio>)
            }
          </Radio.Group>
        </Form.Item>
        </Col>
      </Form>
    </Modal>
  );
}

export default MainModal;
