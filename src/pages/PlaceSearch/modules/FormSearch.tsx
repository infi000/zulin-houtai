import * as React from 'react';
import { Form, Input, Row, Button, Radio, InputNumber, Select, Cascader } from 'antd';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { falsyParamsFilter } from 'utils/filters';
import { objToArray, objToNumArray } from 'utils/utils';
import DistrictsComponent from 'components/DistrictsComponent';
import AllCheckBox from 'components/AllCheckBox';
import { selectAllDictMap, selectAllDictType } from 'store/selectors';
import { EDictMap, yesOrNo } from 'utils/constants';

// import OperateLog from 'components/OperateLog';
// import Auth from 'containers/AuthController';

import { getDataList, actions } from '../slice';
import selectors from '../selectors';
import { ISearchCondition } from '../types';
import { SEARCH_ORDER } from '../constants';
import { formatSearchParams } from '../adapter';

const { Search } = Input;
const { SHOW_CHILD } = Cascader;
const { useEffect, useState } = React;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const Wrapper = styled.div`
  padding: 16px 16px 0;
  margin-bottom: 16px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 3px 7px 1px rgba(111,118,129,0.10); 
  z-index: 100;
  // .moreSearch {
 
  // }
  .ant-form .ant-form-item-label > label::after {
    content: ':';
  }
  .largeSearch {
    width: 400px;
  }
  .moreSearch {
    .moreSearch-con{
      max-height: 450px;
      overflow-y: scroll;
    }
    .ant-form-item-label {
      width: 110px;
      text-align: left;
    }
    .inputField {
      display: inline-block;
      margin-bottom: 0;
      .ant-form-item-control {
        left: 0;
      }
    }
    .inputUnit {
      line-height: 32px;
      margin-left: 8px;
    }
    .ant-radio-wrapper {
      align-items: center;
    }
  }
  .city {
    .ant-form-item-control {
      width: 1000px;
    }
  }
`;

const MorButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

function FormSearch() {
  const [form] = Form.useForm();
  const pagination = useSelector(selectors.pagination);
  const refresh = useSelector(selectors.refresh);
  const dictMaps = useSelector(selectAllDictType);
  // const loading = useSelector(selectors.loading);

  const dispatch = useDispatch();
  const moreSearch = Form.useWatch('moreSearch', form);

  const handlePackUp = () => {
    // 重置 moreSearch
    form.setFieldsValue({ moreSearch: undefined });
  };

  const handleSearch = (additionalParams: Dictionary<TAdditionalParams> = {}) => {
    const params = form.getFieldsValue();
    console.log(params);
    dispatch(actions.updateSearchCondition(params));
    const formatParams = formatSearchParams({
      ...params,
      pageNum: 1, // 默认所有的检索也都重新从1开始检索
      pageSize: pagination.pageSize,
      ...additionalParams,
    });
    dispatch(actions.setLoading(true));
    dispatch(getDataList(falsyParamsFilter<ISearchCondition & IPagination>(formatParams)));
    // 当多条件查询完成之后能够自动将条件收起；
    if (params?.moreSearch === 1) {
      handlePackUp();
    }
  };

  const onSearch = () => {
    handleSearch();
  };

  useEffect(() => {
    handleSearch();
  }, [refresh]);

  const handleReset = () => {
    form.resetFields();
    form.setFieldsValue({
      moreSearch: 1,
    });
    handleSearch();
  };

  return (
    <Wrapper>
      <Form form={form}>
        <Row>
          <Form.Item label='' name='key'>
            <Search
              allowClear
              className='largeSearch'
              placeholder='请输入仓库相关信息（名称/类型等）'
              prefix={<SearchOutlined />}
              enterButton='搜索'
              onSearch={onSearch}
            />
          </Form.Item>
          <Form.Item label='' name='order' initialValue='idleAreaTotal_1'>
            <Select style={{ width: '224px', marginLeft: '24px' }}>
              {
                SEARCH_ORDER.map((item: any) => (
                  <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item label='' name='moreSearch'>
            <Radio.Group>
              <Radio value={1} style={{ marginLeft: '24px' }}>多条件筛选</Radio>
            </Radio.Group>
          </Form.Item>
        </Row>
        {
          moreSearch ? (
            <div className='moreSearch'>
              <div className='moreSearch-con'>
                <Row>
                  <Form.Item
                    colon
                    label='所属大区'
                    name='warehouseRegionList'
                  >
                    <AllCheckBox
                      options={dictMaps[EDictMap['仓库所属大区']] || []}
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item
                    colon
                    label='区域中心'
                    name='warehouseRegionalCenterList'
                  >
                    <AllCheckBox
                      options={dictMaps[EDictMap['区域中心']] || []}
                    />
                  </Form.Item>
                </Row>
                <Row className='city'>
                  <Form.Item
                    label='所属城市'
                    name='warehouseCityList'
                  >
                    <DistrictsComponent
                      lastLevel='city'
                      mode='multi'
                      type='tree'
                      hasAll={false}
                      otherOptions={{
                        allowClear: true,
                        treeCheckable: true,
                        style: { width: '70%' },
                      }}
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item
                    label='仓库状态'
                    name='warehouseStatusList'
                  >
                    <AllCheckBox
                      options={dictMaps[EDictMap['仓库状态']] || []}
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item
                    label='仓库类型'
                    name='warehouseTypeList'
                  >
                    <AllCheckBox
                      options={dictMaps[EDictMap['仓库类型']] || []}
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item
                    label='消防等级'
                    name='buildingFireLevelList'
                  >
                    <AllCheckBox
                      options={dictMaps[EDictMap['消防等级']] || []}
                    />
                  </Form.Item>
                </Row>
                {/* <Row>
                <Form.Item
                  label='闲置面积'
                  name='minIdleAreaTotal'
                >
                  <Radio.Group>
                    <Radio value=''>不限</Radio>
                    {
                      (dictMaps[EDictMap['最小面积']] || []).map((item) => (
                        <Radio value={item.value}>{item.label}</Radio>
                      ))
                    }
                    <Radio value='input'>
                      <Form.Item
                        label=''
                        name='unusedArea'
                        className='inputField'
                      >
                        <InputNumber />
                      </Form.Item>
                      <span className='inputUnit'>㎡</span>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Row> */}
                <Row>
                  <Form.Item
                    label='可售面积'
                    name='minSaleAreaTotal'
                  >
                    <Radio.Group>
                      <Radio value=''>不限</Radio>
                      {
                        (dictMaps[EDictMap['最小面积']] || []).map((item) => (
                          <Radio value={item.value}>{item.label}</Radio>
                        ))
                      }
                      <Radio value='input'>
                        <Form.Item
                          label=''
                          name='saleArea'
                          className='inputField'
                        >
                          <InputNumber />
                        </Form.Item>
                        <span className='inputUnit'>㎡</span>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item
                    label='是否上仓下中转场'
                    name='assistUpDownTransit'
                  >
                    <Radio.Group>
                      <Radio value=''>不限</Radio>
                      {
                        Array.from(yesOrNo).map((item: any) => <Radio value={item[0]} key={item[0]}>{item[1]}</Radio>)
                      }
                    </Radio.Group>
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item
                    label='月台配置'
                    name='buildingPlatformConfigurationsList'
                  >
                    <AllCheckBox
                      options={dictMaps[EDictMap['月台配置']] || []}
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item
                    label='升降平台(个)'
                    name='buildingLiftPlatformQuantity'
                  >
                    <InputNumber
                      placeholder='请输入升降平台个数'
                      style={{ width: '100%' }}
                      precision={0}
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item
                    label='建筑类型'
                    name='buildingTypes'
                  >
                    <AllCheckBox
                      options={dictMaps[EDictMap['建筑类型']] || []}
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item
                    label='建筑结构'
                    name='buildingStructures'
                  >
                    <AllCheckBox
                      options={dictMaps[EDictMap['建筑结构']] || []}
                    />
                  </Form.Item>
                </Row>
              </div>
              <MorButtonsWrapper>
                <Button style={{ marginRight: '8px' }} onClick={handleReset}>重置</Button>
                <Button onClick={handlePackUp}>收起</Button>
              </MorButtonsWrapper>
            </div>
          ) : null
        }
      </Form>
    </Wrapper>
  );
}

export default FormSearch;
