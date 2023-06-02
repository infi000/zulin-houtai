import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Select, Form, Input, InputNumber, DatePicker, Checkbox, Radio, Col, Row } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { isModify, isView, isCreate, objToArray, disabledBeforeToday } from 'utils/utils';
import { falsyParamsFilter } from 'utils/filters';
import { ModalTitle } from 'components/TitlePrefixIcon';
import { CREATE, EDictMap, EDIT, VIEW, yesOrNo } from 'utils/constants';

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
    if (data.maintenanceStartDate) {
      // 维保开始日期
      const { maintenanceStartDate } = data;
      (oData as any).maintenanceStartDate = moment(maintenanceStartDate);
    }
    if (data.maintenanceEndDate) {
      // 维保结束日期
      const { maintenanceEndDate } = data;
      (oData as any).maintenanceEndDate = moment(maintenanceEndDate);
    }
    if (data.retirementDate) {
      // 报废日期
      const { retirementDate } = data;
      (oData as any).retirementDate = moment(retirementDate);
    }
    if (data.acquisitionDate) {
      // 购置日期
      const { acquisitionDate } = data;
      (oData as any).acquisitionDate = moment(acquisitionDate);
    }
    if (data.startDate) {
      // 开始日期
      const { startDate } = data;
      (oData as any).startDate = moment(startDate);
    }
    if (data.outgoingDate) {
      // 外投日期
      const { outgoingDate } = data;
      (oData as any).outgoingDate = moment(outgoingDate);
    }
    if (data.outgoingDeadlineDate) {
      // 外投截止日期
      const { outgoingDeadlineDate } = data;
      (oData as any).outgoingDeadlineDate = moment(outgoingDeadlineDate);
    }
    if (data.exerciseDate) {
      // 行权日期
      const { exerciseDate } = data;
      (oData as any).exerciseDate = moment(exerciseDate);
    }
    if (data.handlingDate) {
      // 处置日期
      const { handlingDate } = data;
      (oData as any).handlingDate = moment(handlingDate);
    }
    if (data.deviceStatus) {
      // 设备状态
      const { deviceStatus } = data;
      (oData as any).deviceStatus = deviceStatus.split(';');
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
      console.log('values', values);
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
      maskClosable={false}
      title={<ModalTitle title={modalTitle} />}
      visible={visible}
      confirmLoading={loading}
      onOk={useDebounceBefore(handleOk)}
      onCancel={handleCancel}
      width={1200}
    >
      <Form {...formItemLayout} form={form}>
        <Row>
          <Col span={8}>
            <Form.Item
              label='技术标识号'
              name='tecIdentifyNo'
              initialValue={memoData?.tecIdentifyNo || ''}
              rules={[{ required: true, message: '必填项' }]}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type) || isModify(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='设备编码'
              name='deviceNo'
              initialValue={memoData?.deviceNo || ''}
              rules={[{ required: true, message: '必填项' }]}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type) || isModify(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='本部描述'
              name='partDescription'
              initialValue={memoData?.partDescription || ''}
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
                  objToArray(dictMaps[EDictMap['本部描述']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='区部描述'
              name='sectionDescription'
              initialValue={memoData?.sectionDescription || ''}
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
                  objToArray(dictMaps[EDictMap['区部描述']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='调拨联系人工号'
              name='transferContactNo'
              initialValue={memoData?.transferContactNo || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='调拨联系人姓名'
              name='transferContactName'
              initialValue={memoData?.transferContactName || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='计划人员组'
              name='planningStaffGroup'
              initialValue={memoData?.planningStaffGroup || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='资产编码'
              name='assetNo'
              initialValue={memoData?.assetNo || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='使用状态'
              name='useStatus'
              initialValue={memoData?.useStatus || ''}
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
                  objToArray(dictMaps[EDictMap['设备使用状态']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='设备状态（SAP）'
              name='deviceStatus'
              initialValue={memoData?.deviceStatus || []}
            >
              <Select
                disabled={isView(type)}
                showSearch
                filterOption={
                  (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                allowClear
                mode='multiple'
              >
                {
                  objToArray(dictMaps[EDictMap['设备状态sap']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='系统状态'
              name='systemStatus'
              initialValue={memoData?.systemStatus || ''}
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
                  objToArray(dictMaps[EDictMap['系统状态']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='设备说明'
              name='deviceSpecification'
              initialValue={memoData?.deviceSpecification || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='设备来源'
              name='deviceSource'
              initialValue={memoData?.deviceSource || ''}
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
                  objToArray(dictMaps[EDictMap['设备来源']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='设备类型'
              name='deviceType'
              initialValue={memoData?.deviceType || ''}
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
                  objToArray(dictMaps[EDictMap['设备类型']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='资产大类'
              name='assetCategory'
              initialValue={memoData?.assetCategory || ''}
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
                  objToArray(dictMaps[EDictMap['资产大类']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='资产中类'
              name='assetMiddleCategory'
              initialValue={memoData?.assetMiddleCategory || ''}
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
                  objToArray(dictMaps[EDictMap['资产中类']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='资产小类'
              name='assetSubcategory'
              initialValue={memoData?.assetSubcategory || ''}
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
                  objToArray(dictMaps[EDictMap['资产小类']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='资产小类描述'
              name='assetSubcategoryDescription'
              initialValue={memoData?.assetSubcategoryDescription || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='品牌'
              name='brand'
              initialValue={memoData?.brand || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='规格型号'
              name='specificationsModels'
              initialValue={memoData?.specificationsModels || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='系列号'
              name='serialNumber'
              initialValue={memoData?.serialNumber || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='车牌号'
              name='plateNumber'
              initialValue={memoData?.plateNumber || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='资产组名称'
              name='assetGroupName'
              initialValue={memoData?.assetGroupName || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='使用类型'
              name='useType'
              initialValue={memoData?.useType || ''}
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
                  objToArray(dictMaps[EDictMap['使用类型']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='负责人'
              name='principal'
              initialValue={memoData?.principal || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='职位'
              name='jobTitle'
              initialValue={memoData?.jobTitle || ''}
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
                  objToArray(dictMaps[EDictMap['职位']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='负责人名称'
              name='principalName'
              initialValue={memoData?.principalName || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='购置价值(元)'
              name='acquisitionValue'
              initialValue={(memoData?.acquisitionValue || memoData?.acquisitionValue === 0) ? memoData?.acquisitionValue : ''}
            >
              <InputNumber
                placeholder='请输入购置价值(元)'
                disabled={isView(type)}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='净值(元)'
              name='netValue'
              initialValue={(memoData?.netValue || memoData?.netValue === 0) ? memoData?.netValue : ''}
            >
              <InputNumber
                placeholder='请输入净值(元)'
                disabled={isView(type)}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='资产原值(元)'
              name='initialAssetValue'
              initialValue={(memoData?.initialAssetValue || memoData?.initialAssetValue === 0) ? memoData?.initialAssetValue : ''}
            >
              <InputNumber
                placeholder='请输入资产原值(元)'
                disabled={isView(type)}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='公司'
              name='company'
              initialValue={memoData?.company || ''}
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
                  objToArray(dictMaps[EDictMap['公司']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='公司描述'
              name='companyIntroduction'
              initialValue={memoData?.companyIntroduction || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='功能位置'
              name='functionPosition'
              initialValue={memoData?.functionPosition || ''}
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
                  objToArray(dictMaps[EDictMap['功能位置']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='功能位置描述'
              name='functionPositionDescription'
              initialValue={memoData?.functionPositionDescription || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='成本中心'
              name='costCenter'
              initialValue={memoData?.costCenter || ''}
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
                  objToArray(dictMaps[EDictMap['成本中心']] || {}).map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='成本中心描述'
              name='costCenterDescription'
              initialValue={memoData?.costCenterDescription || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='成本中心地址'
              name='costCenterAddress'
              initialValue={memoData?.costCenterAddress || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='供应商'
              name='supplier'
              initialValue={memoData?.supplier || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='供应商描述'
              name='supplierDescription'
              initialValue={memoData?.supplierDescription || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='维保开始日期'
              name='maintenanceStartDate'
              initialValue={memoData?.maintenanceStartDate || ''}
            >
              <DatePicker
                format='YYYY-MM-DD'
                placeholder={isView(type) ? '' : '选择维保开始日期'}
                style={{ width: '100%' }}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='位置'
              name='location'
              initialValue={memoData?.location || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='维保结束日期'
              name='maintenanceEndDate'
              initialValue={memoData?.maintenanceEndDate || ''}
            >
              <DatePicker
                format='YYYY-MM-DD'
                placeholder={isView(type) ? '' : '选择维保结束日期'}
                style={{ width: '100%' }}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='备注'
              name='remark'
              initialValue={memoData?.remark || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='报废日期'
              name='retirementDate'
              initialValue={memoData?.retirementDate || ''}
            >
              <DatePicker
                format='YYYY-MM-DD'
                placeholder={isView(type) ? '' : '选择报废日期'}
                style={{ width: '100%' }}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='报废类型'
              name='retirementType'
              initialValue={memoData?.retirementType || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='购置日期'
              name='acquisitionDate'
              initialValue={memoData?.acquisitionDate || ''}
            >
              <DatePicker
                disabledDate={disabledBeforeToday}
                format='YYYY-MM-DD'
                placeholder={isView(type) ? '' : '选择购置日期'}
                style={{ width: '100%' }}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='开始日期'
              name='startDate'
              initialValue={memoData?.startDate || ''}
            >
              <DatePicker
                format='YYYY-MM-DD'
                placeholder={isView(type) ? '' : '选择开始日期'}
                style={{ width: '100%' }}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='出租方'
              name='lessor'
              initialValue={memoData?.lessor || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='外投接收方'
              name='outgoingReceiver'
              initialValue={memoData?.outgoingReceiver || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='外投日期'
              name='outgoingDate'
              initialValue={memoData?.outgoingDate || ''}
            >
              <DatePicker
                format='YYYY-MM-DD'
                placeholder={isView(type) ? '' : '选择外投日期'}
                style={{ width: '100%' }}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='租金'
              name='rent'
              initialValue={(memoData?.rent || memoData?.rent === 0) ? memoData?.rent : ''}
            >
              <InputNumber
                placeholder='请输入租金'
                disabled={isView(type)}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='使用人'
              name='deviceUser'
              initialValue={memoData?.deviceUser || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='外投截止日期'
              name='outgoingDeadlineDate'
              initialValue={memoData?.outgoingDeadlineDate || ''}
            >
              <DatePicker
                format='YYYY-MM-DD'
                placeholder={isView(type) ? '' : '选择外投截止日期'}
                style={{ width: '100%' }}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='行权日期'
              name='exerciseDate'
              initialValue={memoData?.exerciseDate || ''}
            >
              <DatePicker
                format='YYYY-MM-DD'
                placeholder={isView(type) ? '' : '选择行权日期'}
                style={{ width: '100%' }}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='闲置原因'
              name='idleCause'
              initialValue={memoData?.idleCause || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='投放方式'
              name='deliveryMode'
              initialValue={memoData?.deliveryMode || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='客户名称'
              name='customerName'
              initialValue={memoData?.customerName || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='客户代码'
              name='customerCode'
              initialValue={memoData?.customerCode || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='采购订单'
              name='purchaseOrder'
              initialValue={memoData?.purchaseOrder || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='收货凭证'
              name='receiptCertificate'
              initialValue={memoData?.receiptCertificate || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='构造类型'
              name='structuralType'
              initialValue={memoData?.structuralType || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='构造类型描述'
              name='structuralTypeDescription'
              initialValue={memoData?.structuralTypeDescription || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='处置方式'
              name='handlingWay'
              initialValue={memoData?.handlingWay || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='处置日期'
              name='handlingDate'
              initialValue={memoData?.handlingDate || ''}
            >
              <DatePicker
                format='YYYY-MM-DD'
                placeholder={isView(type) ? '' : '选择处置日期'}
                style={{ width: '100%' }}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='处置收入金额'
              name='handlingIncome'
              initialValue={(memoData?.handlingIncome || memoData?.handlingIncome === 0) ? memoData?.handlingIncome : ''}
            >
              <InputNumber
                placeholder='请输入处置收入金额'
                disabled={isView(type)}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='处置支出金额'
              name='handlingExpenditure'
              initialValue={(memoData?.handlingExpenditure || memoData?.handlingExpenditure === 0) ? memoData?.handlingExpenditure : ''}
            >
              <InputNumber
                placeholder='请输入处置支出金额'
                disabled={isView(type)}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='收购公司或接收方'
              name='acquiringCompany'
              initialValue={memoData?.acquiringCompany || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='OA处置流程编号'
              name='oaFlowNo'
              initialValue={memoData?.oaFlowNo || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='项目代码'
              name='projectCode'
              initialValue={memoData?.projectCode || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='项目名称'
              name='projectName'
              initialValue={memoData?.projectName || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='在库存放地点'
              name='storePlace'
              initialValue={memoData?.storePlace || ''}
            >
              <Input
                placeholder={isView(type) ? '' : '请输入'}
                disabled={isView(type)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='预计年限'
              name='expectedYears'
              initialValue={(memoData?.expectedYears || memoData?.expectedYears === 0) ? memoData?.expectedYears : ''}
            >
              <InputNumber
                placeholder='请输入预计年限'
                disabled={isView(type)}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default MainModal;
