import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Select, Form, Input, InputNumber, DatePicker, Checkbox, Radio } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { isModify, isView, isCreate, objToArray, disabledBeforeToday } from 'utils/utils';
import { falsyParamsFilter } from 'utils/filters';
import { ModalTitle } from 'components/TitlePrefixIcon';
import OssUpload from 'components/OssUpload.tsx';
import { CREATE, EDictMap, EDIT, VIEW, yesOrNo } from 'utils/constants';
import moment from 'moment';
import { selectAllDictMap } from 'store/selectors';
import { actions, postCreate, postEdit } from '../slice';
import selectors from '../selectors';
import { ITableItem } from '../types';
import { formatPostParams } from '../adapter';
import { STATUS_MAP } from '../constants';

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
  const wareHouseAll = useSelector(selectors.wareHouseAll);
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
    if (data.idleEndTime) {
      const { idleEndTime } = data;
      (oData as any).idleEndTime = moment(idleEndTime);
    }
    if (data.idlePicture) {
      const { idlePicture } = data;
      (oData as any).idlePicture = idlePicture.split(',');
    }
    return {
      ...oData,
      // 添加需要格式化的初始值
    };
  }, [data, type]);

  const modalTitle = useMemo((): string => {
    switch (type) {
      case CREATE:
        return '闲置场地上报';
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

  const handlePlaceIdChange = (id: number) => {
    const { warehouseDetailAddress } = wareHouseAll.find(item => item.id === id) || {};
    form.setFieldValue('warehouseDetailAddress', warehouseDetailAddress);
  };

  return (
    <Modal
      forceRender
      destroyOnClose
      centered
      title={<ModalTitle title={modalTitle} />}
      visible={visible}
      confirmLoading={loading}
      onOk={useDebounceBefore(handleOk)}
      onCancel={handleCancel}
      width={900}
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item
          initialValue={memoData?.placeId || ''}
          label='场地维度编码(仓库名称/仓库编码)'
          name='placeId'
          rules={[{ required: true, message: '必填项' }]}
        >
          <Select
            onChange={handlePlaceIdChange}
            disabled={isView(type)}
            filterOption={
              (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
            showSearch
          >
            {
              wareHouseAll.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                  {`${item.warehousePlaceCode}(${item.warehouseName}/${item.warehouseCode})`}
                </Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          initialValue={memoData?.warehouseDetailAddress || ''}
          label='仓库地址'
          name='warehouseDetailAddress'
        >
          <Input
            placeholder='请输入'
            disabled
          />
        </Form.Item>
        {
          isView(type) && (
            <Form.Item
              initialValue={memoData?.warehouseType || ''}
              label='仓库类型'
              name='warehouseType'
            >
              <Select
                disabled
              >
                {
                  objToArray(dictMaps[EDictMap['仓库类型']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          )
        }
        {
          isView(type) && (
            <Form.Item
              initialValue={memoData?.warehouseBu || ''}
              label='所属BU'
              name='warehouseBu'
            >
              <Select
                disabled
              >
                {
                  objToArray(dictMaps[EDictMap['所属BU']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          )
        }
        {
          isView(type) && (
            <Form.Item
              initialValue={memoData?.warehouseRegion || ''}
              label='大区'
              name='warehouseRegion'
            >
              <Select
                disabled
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
          isView(type) && (
            <Form.Item
              initialValue={memoData?.warehouseBusinessArea || ''}
              label='业务区'
              name='warehouseBusinessArea'
            >
              <Select
                disabled
              >
                {
                  objToArray(dictMaps[EDictMap['业务区']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          )
        }
        {
          isView(type) && (
            <Form.Item
              initialValue={memoData?.warehouseRegionalCenter || ''}
              label='区域中心'
              name='warehouseRegionalCenter'
            >
              <Select
                disabled
              >
                {
                  objToArray(dictMaps[EDictMap['区域中心']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          )
        }
        {
          isView(type) && (
            <Form.Item
              initialValue={memoData?.warehouseCity || ''}
              label='城市'
              name='warehouseCity'
            >
              <Input
                placeholder='请输入'
                disabled
              />
            </Form.Item>
          )
        }

        <Form.Item
          initialValue={memoData?.idleZone || ''}
          label='闲置区位'
          name='idleZone'
        >
          <Input
            placeholder='请输入'
            disabled={isView(type)}
          />
        </Form.Item>
        <Form.Item
          initialValue={memoData?.idleArea || ''}
          label='闲置面积(㎡)'
          name='idleArea'
          rules={[{ required: true, message: '必填项' }]}
        >
          <InputNumber
            placeholder='请输入闲置面积'
            disabled={isView(type)}
            style={{ width: '100%' }}
            min={0.01}
            precision={2}
          />
        </Form.Item>
        <Form.Item
          initialValue={memoData?.idleEndTime || ''}
          label='闲置结束时间'
          name='idleEndTime'
        >
          <DatePicker
            disabledDate={disabledBeforeToday}
            placeholder='选择闲置结束时间'
            style={{ width: '100%' }}
            disabled={isView(type)}
            format='YYYY-MM-DD'
          />
        </Form.Item>
        <Form.Item
          initialValue={memoData?.sale || memoData?.sale === 0 ? memoData?.sale : 1}
          label='是否可售'
          name='sale'
          rules={[{ required: true, message: '必填项' }]}
        >
          <Radio.Group disabled={isView(type)}>
            {
              Array.from(yesOrNo).map((item: any) => <Radio value={item[0]} key={item[0]}>{item[1]}</Radio>)
            }
          </Radio.Group>
        </Form.Item>
        <Form.Item
          initialValue={memoData?.applicableGoods || ''}
          label='适用货物'
          name='applicableGoods'
          rules={[{ required: true, message: '必填项' }]}
        >
          <Input
            placeholder='请输入'
            disabled={isView(type)}
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
        {
          isView(type) && (
            <Form.Item
              initialValue={memoData?.status || memoData?.status === 0 ? STATUS_MAP.get((memoData?.status as any)) : ''}
              label='状态'
              name='status'
            >
              <Input
                placeholder='请输入'
                disabled
              />
            </Form.Item>
          )
        }
        <Form.Item
          label='闲置区照片'
          name='idlePicture'
          initialValue={memoData?.idlePicture || ''}
        >
          <OssUpload
            maxLen={10}
            disabled={isView(type)}
            accept='.jpg,.png,.jpeg,.bmp'
          />
        </Form.Item>
        <Form.Item
          label='闲置原因'
          name='idleReason'
          initialValue={memoData?.idleReason || ''}
        >
          <Input
            placeholder='请输入'
            disabled={isView(type)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default MainModal;
