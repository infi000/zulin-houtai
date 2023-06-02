import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Modal, Select, Form, Input, DatePicker } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { isView, objToArray, disabledBeforeToday } from 'utils/utils';
import { falsyParamsFilter } from 'utils/filters';
import { ModalTitle } from 'components/TitlePrefixIcon';
import OssUpload from 'components/OssUpload.tsx';
import { CREATE, EDictMap, EDIT, VIEW } from 'utils/constants';

import moment from 'moment';
import { selectAllDictMap } from 'store/selectors';
import DistrictsComponent from 'components/DistrictsComponent';
import { actions, postCreate, postEdit } from '../slice';
import selectors from '../selectors';
import { ITableItem } from '../types';
import { formatPostParams } from '../adapter';
import { rewardsTypeMap } from '../constants';

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

const FormWrap = styled(Form)`
  .firstItem {
    .ant-select-selector {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }
  .secondItem {
    .ant-select-selector {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
    .ant-input {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
  }
`;

function MainModal() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const mainModal = useSelector(selectors.mainModal);
  const loading = useSelector(selectors.loading);
  const wareHouseAll = useSelector(selectors.wareHouseAll);
  const dictMaps = useSelector(selectAllDictMap);
  const rewardsType = Form.useWatch('rewardsType', form);
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
    if (data.rewardsPeriod) {
      const { rewardsPeriod } = data;
      (oData as any).rewardsPeriod = moment(rewardsPeriod);
    }
    if (data.textPart) {
      const { textPart } = data;
      (oData as any).textPart = textPart.split(',');
    }
    if (rewardsTypeMap.get(data.rewardsType) === '城市') {
      const { rewardsValue } = data;
      (oData as any).rewardsValue = rewardsValue.split(',');
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
        dispatch(postEdit({
          ...values,
          id: data?.id,
        }));
      }
    }
  };
  const handleRewardsType = (val: number) => {
    let res:any = '';
    if (rewardsTypeMap.get(val) === '城市') {
      res = [];
    }
    form.setFieldValue('rewardsValue', res);
  };

  return (
    <Modal
      forceRender
      centered
      destroyOnClose
      title={<ModalTitle title={modalTitle} />}
      visible={visible}
      confirmLoading={loading}
      onOk={useDebounceBefore(handleOk)}
      onCancel={handleCancel}
      width={800}
    >
      <FormWrap {...formItemLayout} form={form}>
        <Form.Item
          initialValue={memoData?.title || ''}
          label='标题'
          name='title'
          rules={[{ required: true, message: '必填项' }]}
        >
          <Input
            placeholder='请输入'
            disabled={isView(type)}
          />
        </Form.Item>
        <Form.Item
          label='适用范围'
          style={{ marginBottom: 0 }}
        >
          <Input.Group compact>
            <Form.Item
              className='firstItem'
              initialValue={memoData?.rewardsType || ''}
              name='rewardsType'
              rules={[{ required: true, message: '必填项' }]}
              style={{ width: '150px' }}
            >
              <Select
                onChange={handleRewardsType}
                allowClear
                disabled={isView(type)}
              >
                {
                  Array.from(rewardsTypeMap).map((item: any) => (
                    <Select.Option value={item[0]} key={item[0]}>{item[1]}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>

            {
              rewardsTypeMap.get(rewardsType) === '大区' && (
                <Form.Item
                  className='secondItem'
                  initialValue={memoData?.rewardsValue || ''}
                  name='rewardsValue'
                  rules={[{ required: true, message: '必填项' }]}
                  style={{ width: '289px' }}
                >
                  <Select
                    disabled={isView(type)}
                    showSearch
                    filterOption={
                      (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    allowClear
                  >
                    {
                      objToArray(dictMaps[EDictMap['仓库所属大区']] || {}).map((item: any) => (
                        <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              )
            }
            {
              rewardsTypeMap.get(rewardsType) === '城市' && (
                <Form.Item
                  className='secondItem'
                  initialValue={memoData?.rewardsValue || []}
                  name='rewardsValue'
                  rules={[{ required: true, message: '必填项' }]}
                  style={{ width: '289px' }}
                >
                  <DistrictsComponent
                    lastLevel='city'
                    mode='single'
                    internation={false}
                    type='cascade'
                    hasAll={false}
                    otherOptions={{ disabled: isView(type) }}
                  />
                </Form.Item>
              )
            }
            {
              rewardsTypeMap.get(rewardsType) === '仓库' && (
                <Form.Item
                  className='secondItem'
                  initialValue={memoData?.rewardsValue || ''}
                  name='rewardsValue'
                  rules={[{ required: true, message: '必填项' }]}
                  style={{ width: '289px' }}
                >
                  <Select
                    disabled={isView(type)}
                    filterOption={
                      (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    allowClear
                    showSearch
                  >
                    {
                      wareHouseAll.map((item: any) => (
                        <Select.Option key={item.id} value={`${item.id}`}>
                          {`${item.warehousePlaceCode}(${item.warehouseName}/${item.warehouseCode})`}
                        </Select.Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              )
            }
            {
              !(['大区', '仓库', '城市'].includes(rewardsTypeMap.get(rewardsType))) && (
                <Form.Item
                  className='secondItem'
                  rules={[{ required: true, message: '必填项' }]}
                  style={{ width: '289px' }}
                ><Input disabled />
                </Form.Item>
              )
            }
          </Input.Group>
        </Form.Item>
        <Form.Item
          initialValue={memoData?.rewardsPersonnel || ''}
          label='奖励对象'
          name='rewardsPersonnel'
          rules={[{ required: true, message: '必填项' }]}
        >
          <Input
            placeholder='请输入'
            disabled={isView(type)}
          />
        </Form.Item>
        <Form.Item
          initialValue={memoData?.rewardsCycle || ''}
          label='奖励周期'
          name='rewardsCycle'
          rules={[{ required: true, message: '必填项' }]}
        >
          <Input
            placeholder='请输入'
            disabled={isView(type)}
          />
        </Form.Item>
        <Form.Item
          initialValue={memoData?.rewardsPeriod || ''}
          label='有效期'
          name='rewardsPeriod'
          rules={[{ required: true, message: '必填项' }]}
        >
          <DatePicker
            disabledDate={disabledBeforeToday}
            disabled={isView(type)}
            style={{ width: '100%' }}
            format='YYYY-MM-DD'
          />
        </Form.Item>
        <Form.Item
          initialValue={memoData?.remark || ''}
          label='备注'
          name='remark'
        >
          <Input
            placeholder='请输入'
            disabled={isView(type)}
          />
        </Form.Item>
        <Form.Item
          initialValue={memoData?.textPart || ''}
          label='正文'
          name='textPart'
          rules={[{ required: true, message: '必填项' }]}
        >
          <OssUpload maxLen={1} disabled={isView(type)} accept='.jpg,.png,.jpeg,.bmp,.pdf' />
        </Form.Item>
      </FormWrap>
    </Modal>
  );
}

export default MainModal;
