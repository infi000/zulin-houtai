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
import { UploadOutlined } from '@ant-design/icons';
import { actions, postCreate, postEdit, postStatus } from '../slice';
import selectors from '../selectors';
import { ITableItem } from '../types';
import { formatPostParams } from '../adapter';
import { STATUS_MAP } from '../constants';
import ImageBox from 'components/ImageBox';

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
    if (data.buytime) {
      // 日期
      const { buytime } = data;
      (oData as any).buytime = moment.unix(Number(buytime));
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
        dispatch(postStatus(falsyParamsFilter({
          ...values,
          epid: data?.id,
        })));
      } else {
        dispatch(postEdit(falsyParamsFilter({
          ...values,
          epid: data?.id,
        })));
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
          type === STATUS ? (
            <Col span={24}>
              <Form.Item
                name='status'
                label='状态'
                initialValue={memoData?.status || ''}
                rules={[{ required: true, message: '必填' }]}
              >
                <Select allowClear>
                  {
                    Array.from(STATUS_MAP).map(([key, value]) => (
                      <Select.Option key={key} value={key}>{value}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
          ) : (
            <>
              <Col span={24}><Form.Item
                label='设备编码'
                name='ecode'
                initialValue={memoData?.ecode || ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input
                  placeholder='请输入'
                  disabled={isView(type)}
                />
              </Form.Item>
              </Col>
              <Col span={24}><Form.Item
                label='设备名称'
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
              <Col span={24}><Form.Item
                label='设备型号'
                name='emodel'
                initialValue={memoData?.emodel || ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input
                  placeholder='请输入'
                  disabled={isView(type)}
                />
              </Form.Item>
              </Col>
              <Col span={24}><Form.Item
                label='出厂编号'
                name='factoryno'
                initialValue={memoData?.factoryno || ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input
                  placeholder='请输入'
                  disabled={isView(type)}
                />
              </Form.Item>
              </Col>
              <Col span={24}><Form.Item
                label='生产厂商'
                name='manufacturer'
                initialValue={memoData?.manufacturer || ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input
                  placeholder='请输入'
                  disabled={isView(type)}
                />
              </Form.Item>
              </Col>
              <Col span={24}><Form.Item
                label='设备类型'
                name='etype'
                initialValue={memoData?.etype || ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input
                  placeholder='请输入'
                  disabled={isView(type)}
                />
              </Form.Item>
              </Col>
              <Col span={24}><Form.Item
                label='使用部门名称'
                name='department'
                initialValue={memoData?.department || ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input
                  placeholder='请输入'
                  disabled={isView(type)}
                />
              </Form.Item>
              </Col>
              <Col span={24}><Form.Item
                label='设备位置'
                name='location'
                initialValue={memoData?.location || ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input
                  placeholder='请输入'
                  disabled={isView(type)}
                />
              </Form.Item>
              </Col>
              <Col span={24}><Form.Item
                label='房间预览图'
                name='thumbinal'
                rules={[{ required: !isModify(type), message: '必填项' }]}
              >
                <Upload action='' beforeUpload={() => false} listType="picture">
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label='设备大图'
                  required={!isModify(type)}
                >
                  <Form.Item
                    name='pics'
                    rules={[{ required: !isModify(type), message: '必填项' }]}
                  >
                    <Upload action='' beforeUpload={() => false} listType="picture">
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item>
                  <ImageBox
                    data={(memoData?.pics || '') as any}
                    delParams={{ params: { epid: memoData.id }, api: 'Lease/equipmentdelpic' }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}><Form.Item
                label='说明'
                name='des'
                initialValue={memoData?.des || ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input.TextArea
                  placeholder='请输入说明'
                  disabled={isView(type)}
                />
              </Form.Item>
              </Col>
              <Col span={24}><Form.Item
                label='单价，元/小时'
                name='price'
                initialValue={(memoData?.price || memoData?.price === 0) ? memoData?.price : ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <InputNumber
                  placeholder='请输入单价，元/小时'
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              </Col>
              <Col span={24}><Form.Item
                label='购置时间'
                name='buytime'
                initialValue={(memoData?.buytime || memoData?.buytime === 0) ? memoData?.buytime : ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <DatePicker
                  format='YYYY-MM-DD'
                  placeholder='请选择'
                  style={{ width: '100%' }}
                  disabled={isView(type)}
                />
              </Form.Item>
              </Col>
              <Col span={24}><Form.Item
                label='购置价格'
                name='buyprice'
                initialValue={(memoData?.buyprice || memoData?.buyprice === 0) ? memoData?.buyprice : ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <InputNumber
                  placeholder='请输入购置价格'
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              </Col>
              <Col span={24}><Form.Item
                label='备注'
                name='remark'
                initialValue={memoData?.remark || ''}
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input.TextArea
                  placeholder='请输入备注'
                  disabled={isView(type)}
                />
              </Form.Item>
              </Col>
            </>
          )
        }
      </Form>
    </Modal>
  );
}

export default MainModal;
