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
          label='订单号'
          name='orderid'
          initialValue={memoData?.orderid || ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <Input
            placeholder='请输入'
            disabled={isView(type)}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='预约用户id'
          name='uid'
          initialValue={(memoData?.uid || memoData?.uid === 0) ? memoData?.uid : ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            placeholder='请输入预约用户id'
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='预约id'
          name='bid'
          initialValue={(memoData?.bid || memoData?.bid === 0) ? memoData?.bid : ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            placeholder='请输入预约id'
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='订单标题'
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
          label='包含的押金金额'
          name='deposit'
          initialValue={(memoData?.deposit || memoData?.deposit === 0) ? memoData?.deposit : ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            placeholder='请输入包含的押金金额'
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='总金额'
          name='total'
          initialValue={(memoData?.total || memoData?.total === 0) ? memoData?.total : ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            placeholder='请输入总金额'
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='会员优惠金额'
          name='discount'
          initialValue={(memoData?.discount || memoData?.discount === 0) ? memoData?.discount : ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            placeholder='请输入会员优惠金额'
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='积分抵扣金额'
          name='scorecount'
          initialValue={(memoData?.scorecount || memoData?.scorecount === 0) ? memoData?.scorecount : ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            placeholder='请输入积分抵扣金额'
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='需要支付金额'
          name='totalpay'
          initialValue={(memoData?.totalpay || memoData?.totalpay === 0) ? memoData?.totalpay : ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            placeholder='请输入需要支付金额'
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='付款用户id'
          name='payuid'
          initialValue={(memoData?.payuid || memoData?.payuid === 0) ? memoData?.payuid : ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            placeholder='请输入付款用户id'
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='父订单id（续订）'
          name='poid'
          initialValue={(memoData?.poid || memoData?.poid === 0) ? memoData?.poid : ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            placeholder='请输入父订单id（续订）'
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='0已下单未支付，1已支付未核销，2完成，3关闭'
          name='ostatus'
          initialValue={memoData?.ostatus || ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <Radio.Group disabled={isView(type)}>
            {
              Array.from(yesOrNo).map((item: any) => <Radio value={item[0]} key={item[0]}>{item[1]}</Radio>)
            }
          </Radio.Group>
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='订单创建时间'
          name='ctime'
          initialValue={(memoData?.ctime || memoData?.ctime === 0) ? memoData?.ctime : ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            placeholder='请输入订单创建时间'
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='更新时间'
          name='uptime'
          initialValue={(memoData?.uptime || memoData?.uptime === 0) ? memoData?.uptime : ''}
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            placeholder='请输入更新时间'
            disabled={isView(type)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        </Col>
        <Col span={6}><Form.Item
          label='状态，1正常'
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
