/* eslint-disable max-len */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Modal, Select, Form, Input, InputNumber, DatePicker, Checkbox, Radio, Card, Row, Col } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { isModify, isView, isCreate, objToArray } from 'utils/utils';
import { falsyParamsFilter } from 'utils/filters';
import { ModalTitle } from 'components/TitlePrefixIcon';
import OssUpload from 'components/OssUpload.tsx';
import { CREATE, EDictMap, EDIT, VIEW, yesOrNo } from 'utils/constants';
import DistrictsComponent from 'components/DistrictsComponent';
import DynamicTags from 'components/DynamicTags';
import moment from 'moment';
import { selectAllDictMap } from 'store/selectors';
import { actions, postCreate, postEdit } from '../slice';
import selectors from '../selectors';
import { ITableItem } from '../types';
import { formatPostParams } from '../adapter';

const CardStyle = { marginBottom: '20px' };

const { useEffect, useMemo } = React;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 9 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const formItemTagsLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
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
  const memoData = useMemo<ITableItem & Record<string, unknown> | Record<string, unknown>>(() => {
    if (type === CREATE) {
      // y+ 5位随机数
      const randomCode = `Y${Math.floor((Math.random() + 0.1) * 90000) + 10000}`;
      return { warehousePlaceCode: randomCode };
    }
    const oData = { ...data };
    if (data.contactStartDate) {
      const { contactStartDate } = data;
      (oData as any).contactStartDate = moment(contactStartDate);
    }
    if (data.contactEndDate) {
      const { contactEndDate } = data;
      (oData as any).contactEndDate = moment(contactEndDate);
    }
    if (data.contactRentalStartDate) {
      const { contactRentalStartDate } = data;
      (oData as any).contactRentalStartDate = moment(contactRentalStartDate);
    }
    if (data.assistWarehousePicture) {
      const { assistWarehousePicture } = data;
      (oData as any).assistWarehousePicture = assistWarehousePicture.split(',');
    }
    if (data.assistParkPicture) {
      const { assistParkPicture } = data;
      (oData as any).assistParkPicture = assistParkPicture.split(',');
    }
    return {
      ...oData,
      // {},
      warehouseSSQ: [data.warehouseProvince, data.warehouseCity, data.warehouseCounty],
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
      values = falsyParamsFilter(formatPostParams(values));
      if (type === CREATE) {
        dispatch(postCreate(values));
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
      centered
      maskClosable={false}
      title={<ModalTitle title={modalTitle} />}
      visible={visible}
      confirmLoading={loading}
      onOk={useDebounceBefore(handleOk)}
      onCancel={handleCancel}
      width={1200}
    >
      <Form {...formItemLayout} form={form}>
        <Card style={CardStyle} title='仓库信息' size='small'>
          <Row>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.warehousePlaceCode || ''}
                label='场地编码'
                name='warehousePlaceCode'
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input
                  placeholder={isView(type) ? '' : '请输入场地的唯一编码'}
                  disabled={isView(type) || isModify(type)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.warehousePlaceIdentify || ''}
                label='场地标识'
                name='warehousePlaceIdentify'
              >
                <Input
                  placeholder={isView(type) ? '' : '请输入场地标识'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
            <Col span={12} />
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.warehouseCode || ''}
                label='仓库编码'
                name='warehouseCode'
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input
                  placeholder={isView(type) ? '' : '请输入该场地关联的仓库编码'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.warehouseName || ''}
                label='仓库名称'
                name='warehouseName'
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input
                  placeholder={isView(type) ? '' : '请输入关联仓库的名称'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.warehouseSiteCode || ''}
                label='网点编码'
                name='warehouseSiteCode'
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input
                  placeholder={isView(type) ? '' : '请输入对应仓库挂靠的网点编码'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.warehouseSiteName || ''}
                label='网点名称'
                name='warehouseSiteName'
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input
                  placeholder={isView(type) ? '' : '请输入挂靠网点的中文名称'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.warehouseType || ''}
                label='仓库类型'
                name='warehouseType'
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
                    objToArray(dictMaps[EDictMap['仓库类型']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.warehouseAttribute || ''}
                label='仓库属性'
                name='warehouseAttribute'
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
                    objToArray(dictMaps[EDictMap['仓库属性']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.warehouseRegion || ''}
                label='大区'
                name='warehouseRegion'
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
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.warehouseBusinessArea || ''}
                label='业务区'
                name='warehouseBusinessArea'
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
                    objToArray(dictMaps[EDictMap['业务区']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.warehouseRegionalCenter || ''}
                label='区域中心'
                name='warehouseRegionalCenter'
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
                    objToArray(dictMaps[EDictMap['区域中心']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.warehouseActualCenter || ''}
                label='实际区域归属'
                name='warehouseActualCenter'
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
                    objToArray(dictMaps[EDictMap['区域中心']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.warehouseBu || ''}
                label='所属BU'
                name='warehouseBu'
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
                    objToArray(dictMaps[EDictMap['所属BU']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            {/* <Col span={12} /> */}
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.warehouseSSQ || []}
                name='warehouseSSQ'
                label='省市区'
                rules={[{ required: true, message: '必填' }]}
              >
                <DistrictsComponent
                  otherOptions={{ disabled: isView(type) }}
                  lastLevel='district'
                  mode='single'
                  internation={false}
                  type='cascade'
                  hasAll={false}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.warehouseDetailAddress || ''}
                label='详细地址'
                name='warehouseDetailAddress'
                rules={[{ required: true, message: '必填项' }]}
              >
                <Input
                  placeholder={isView(type) ? '' : '请输入该场地的详细地址'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card style={CardStyle} title='仓库简介' size='small'>
          <Form.Item
            initialValue={memoData?.warehouseBrief || ''}
            label=''
            name='warehouseBrief'
            {...formItemTagsLayout}
          >
            <Input.TextArea
              placeholder={isView(type) ? '' : '编写仓库简介，例如：XX仓库，位于XXX，距离最近中转仓XX公里，优势在于服务XX行业。'}
              disabled={isView(type)}
            />
          </Form.Item>
        </Card>
        <Card style={CardStyle} title='仓库标签' size='small'>
          <Form.Item
            initialValue={memoData?.warehouseLinks ? memoData?.warehouseLinks?.split(',') : []}
            label=''
            name='warehouseLinks'
            {...formItemTagsLayout}
          >
            <DynamicTags disabled={isView(type)} />
          </Form.Item>
        </Card>
        <Card style={CardStyle} title='运营信息' size='small'>
          <Row>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.operationType || ''}
                label='经营类型'
                name='operationType'
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
                    objToArray(dictMaps[EDictMap['经营类型']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.operationIsLeasedPlace || memoData?.operationIsLeasedPlace === 0 ? memoData?.operationIsLeasedPlace : 1}
                label='是否租赁场地'
                name='operationIsLeasedPlace'
              >
                <Radio.Group disabled={isView(type)}>
                  {
                    Array.from(yesOrNo).map((item: any) => <Radio value={item[0]} key={item[0]}>{item[1]}</Radio>)
                  }
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.operationIsInnerStaff || memoData?.operationIsInnerStaff === 0 ? memoData?.operationIsInnerStaff : 1}
                label='是否内部员工'
                name='operationIsInnerStaff'
              >
                <Radio.Group disabled={isView(type)}>
                  {
                    Array.from(yesOrNo).map((item: any) => <Radio value={item[0]} key={item[0]}>{item[1]}</Radio>)
                  }
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.operationClassificationIndustry || ''}
                label='行业分类'
                name='operationClassificationIndustry'
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
                    objToArray(dictMaps[EDictMap['行业分类']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.operationDayAvgOrderQuantity || ''}
                label='日均订单量'
                name='operationDayAvgOrderQuantity'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入该场地的平均订单数量'}
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                  precision={0}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.operationPeakOrderQuantity || ''}
                label='峰值订单量'
                name='operationPeakOrderQuantity'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入该场地的高峰订单数量'}
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                  precision={0}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.operationExpansionAbility || ''}
                label='扩充能力(㎡)'
                name='operationExpansionAbility'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入该场地可扩充的面积大小'}
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                  precision={3}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card style={CardStyle} title='区位信息' size='small'>
          <Row>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.zoneFinanceType || ''}
                label='融通方式'
                name='zoneFinanceType'
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
                    objToArray(dictMaps[EDictMap['融通方式']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.zoneFinancePlaceCode || ''}
                label='融通场地代码'
                name='zoneFinancePlaceCode'
              >
                <Input
                  placeholder={isView(type) ? '' : '输入与本场地融通的场地代码'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.zoneFinanceTransit || ''}
                label='融通中转场'
                name='zoneFinanceTransit'
              >
                <Input
                  placeholder={isView(type) ? '' : '输入与本场地融通的中转场代码'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.zoneTransitFunction || ''}
                label='中转场功能'
                name='zoneTransitFunction'
              >
                <Input
                  placeholder={isView(type) ? '' : '请输入该中转场具备哪些功能'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.zoneTransitCode || ''}
                label='发运中转场代码'
                name='zoneTransitCode'
              >
                <Input
                  placeholder={isView(type) ? '' : '请输入该场地的发运中转场代码'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.zoneSameTransit || memoData?.zoneSameTransit === 0 ? memoData?.zoneSameTransit : 0}
                label='与中转场同场'
                name='zoneSameTransit'
              >
                <Radio.Group disabled={isView(type)}>
                  {
                    Array.from(yesOrNo).map((item: any) => <Radio value={item[0]} key={item[0]}>{item[1]}</Radio>)
                  }
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.zoneTransitDistance || ''}
                label='最近中转场导航距离(KM)'
                name='zoneTransitDistance'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入最近中转场导航距离(KM)'}
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                  precision={3}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.zoneLargeWarehouseSame || memoData?.zoneLargeWarehouseSame === 0 ? memoData?.zoneLargeWarehouseSame : 0}
                label='与大件仓同场'
                name='zoneLargeWarehouseSame'
              >
                <Radio.Group disabled={isView(type)}>
                  {
                    Array.from(yesOrNo).map((item: any) => <Radio value={item[0]} key={item[0]}>{item[1]}</Radio>)
                  }
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card style={CardStyle} title='建筑信息' size='small'>
          <Row>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.buildingAttribute || ''}
                label='建筑物属性'
                name='buildingAttribute'
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
                    objToArray(dictMaps[EDictMap['建筑物属性']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.buildingType || ''}
                label='建筑类型'
                name='buildingType'
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
                    objToArray(dictMaps[EDictMap['建筑类型']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.buildingStructure || ''}
                label='建筑结构'
                name='buildingStructure'
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
                    objToArray(dictMaps[EDictMap['建筑结构']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.buildingStorey || ''}
                label='建筑层数'
                name='buildingStorey'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入建筑层数'}
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                  precision={0}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.buildingCurrentFloor || ''}
                label='所在楼层'
                name='buildingCurrentFloor'
              >
                <Input
                  placeholder={isView(type) ? '' : '请输入所在楼层'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.buildingFirstFloorHeight || ''}
                label='首层层高'
                name='buildingFirstFloorHeight'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入首层净高'}
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                  precision={3}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.buildingLowLoadBearing || ''}
                label='最低承重(t/㎡)'
                name='buildingLowLoadBearing'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入最低承重(t/㎡)'}
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                  precision={3}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.buildingFreightElevatorQuantity || ''}
                label='货梯数量'
                name='buildingFreightElevatorQuantity'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入货梯总数'}
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                  precision={0}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.buildingDownstairClearance || ''}
                label='楼下净空'
                name='buildingDownstairClearance'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入净空面积'}
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                  precision={3}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.buildingPlatformConfigurations || ''}
                label='月台配置'
                name='buildingPlatformConfigurations'
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
                    objToArray(dictMaps[EDictMap['月台配置']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.buildingLiftPlatformQuantity || ''}
                label='升降平台(个)'
                name='buildingLiftPlatformQuantity'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入升降平台个数'}
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                  precision={0}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.buildingBackCarSpace || ''}
                label='回车空间(m)'
                name='buildingBackCarSpace'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入回车空间(米)'}
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                  precision={3}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.buildingAvailablePower || ''}
                label='可供电量(KW/KVA)'
                name='buildingAvailablePower'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入可供电量(KW/KVA)'} disabled={isView(type)}
                  style={{ width: '100%' }}
                  precision={3}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.buildingFloorTexture || ''}
                label='地面材质'
                name='buildingFloorTexture'
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
                    objToArray(dictMaps[EDictMap['地面材质']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.buildingFireLevel || ''}
                label='消防等级'
                name='buildingFireLevel'
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
                    objToArray(dictMaps[EDictMap['消防等级']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.buildingFireResistanceRating || ''}
                label='耐火等级'
                name='buildingFireResistanceRating'
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
                    objToArray(dictMaps[EDictMap['耐火等级']] || {}).map((item: any) => (
                      <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card style={CardStyle} title='合同信息' size='small'>
          <Row>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.contactStartDate || ''}
                label='合同开始日期'
                name='contactStartDate'
              >
                <DatePicker
                  placeholder={isView(type) ? '' : '选择合同开始日期'}
                  style={{ width: '100%' }}
                  disabled={isView(type)}
                  format='YYYY-MM-DD'
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.contactEndDate || ''}
                label='合同终止日期'
                name='contactEndDate'
              >
                <DatePicker
                  placeholder={isView(type) ? '' : '选择合同终止日期'}
                  style={{ width: '100%' }}
                  disabled={isView(type)}
                  format='YYYY-MM-DD'
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.contactRentalStartDate || ''}
                label='计租起始日期'
                name='contactRentalStartDate'
              >
                <DatePicker
                  placeholder={isView(type) ? '' : '选择计租起始日期'}
                  style={{ width: '100%' }}
                  disabled={isView(type)}
                  format='YYYY-MM-DD'
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.contactLessor || ''}
                label='出租方'
                name='contactLessor'
              >
                <Input
                  placeholder={isView(type) ? '' : '请输入出租该场地的主体名称'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card style={CardStyle} title='面积信息' size='small'>
          <Row>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.areaWarehouseArea || ''}
                label='仓库面积(㎡)'
                name='areaWarehouseArea'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入该场地的面积大小'}
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                  precision={2}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.areaContractArea || ''}
                label='合同面积(㎡)'
                name='areaContractArea'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入该场地的合同面积'}
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                  precision={2}
                />
              </Form.Item>
            </Col>
            <Col span={12} />
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.areaBuildingArea || ''}
                label='建筑面积(㎡)'
                name='areaBuildingArea'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入该场地的建筑面积'}
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                  precision={2}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.areaSharedArea || ''}
                label='公摊面积(㎡)'
                name='areaSharedArea'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入该场地的公摊大小'}
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                  precision={2}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.areaSharedRate || ''}
                label='公摊率'
                name='areaSharedRate'
              >
                <InputNumber
                  placeholder={isView(type) ? '' : '请输入该场地的公摊率'}
                  disabled={isView(type)}
                  style={{ width: '100%' }}
                  min={0}
                  max={100}
                  precision={2}
                  addonAfter='%'
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card style={CardStyle} title='辅助信息' size='small'>
          <Row>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.assistBuildingResponsibility || ''}
                label='建筑责任主体'
                name='assistBuildingResponsibility'
              >
                <Input
                  placeholder={isView(type) ? '' : '请输入该场地的承建单位名称'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
            <Col span={18} />
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.assistCustomerRepresentative || ''}
                label='代表客户'
                name='assistCustomerRepresentative'
              >
                <Input
                  placeholder={isView(type) ? '' : '请输入该场地主要运营的客户'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.assistWarehouseContract || ''}
                label='仓库联系人'
                name='assistWarehouseContract'
              >
                <Input
                  placeholder={isView(type) ? '' : '请输入该场地的接口人名字'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.assistContractPhone || ''}
                label='联系电话'
                name='assistContractPhone'
              >
                <Input
                  placeholder={isView(type) ? '' : '请输入该联系人的联系方式'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                initialValue={memoData?.assistUpDownTransit || memoData?.assistUpDownTransit === 0 ? memoData?.assistUpDownTransit : 0}
                label='是否上仓下中转场'
                name='assistUpDownTransit'
              >
                <Radio.Group disabled={isView(type)}>
                  {
                    Array.from(yesOrNo).map((item: any) => <Radio value={item[0]} key={item[0]}>{item[1]}</Radio>)
                  }
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                initialValue={memoData?.assistRemark || ''}
                label='备注'
                name='assistRemark'
                labelCol={{ xs: { span: 24 }, sm: { span: 2 } }}
                wrapperCol={{ xs: { span: 24 }, sm: { span: 14 } }}
              >
                <Input.TextArea
                  placeholder={isView(type) ? '' : '请输入场地的简介信息'}
                  disabled={isView(type)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                initialValue={memoData?.assistParkPicture || ''}
                label='园区照片'
                name='assistParkPicture'
                labelCol={{ xs: { span: 24 }, sm: { span: 2 } }}
                wrapperCol={{ xs: { span: 24 }, sm: { span: 14 } }}
              >
                <OssUpload maxLen={10} disabled={isView(type)} accept='.jpg,.png,.jpeg,.bmp' />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                initialValue={memoData?.assistWarehousePicture || ''}
                label='仓库照片'
                name='assistWarehousePicture'
                labelCol={{ xs: { span: 24 }, sm: { span: 2 } }}
                wrapperCol={{ xs: { span: 24 }, sm: { span: 14 } }}
                extra={<span style={{ padding: '5px 0', display: 'inline-block' }}>上传仓库图片可包含但不限于雨棚、月台、收货区、存储区、作业区等区域</span>}
              >
                <OssUpload maxLen={10} disabled={isView(type)} accept='.jpg,.png,.jpeg,.bmp' />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Modal>
  );
}

export default MainModal;
