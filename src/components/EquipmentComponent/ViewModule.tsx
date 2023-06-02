/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-05-24 16:45:30
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-05-31 16:02:22
 * @FilePath: /ot-resources/src/pages/EquipmentFreeManage/modules/CreateModule.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Col, Space, Descriptions, Tabs, Table, Row, Divider } from 'antd';
import { EDictMap, EQUIPMENT_USE_STATUS_MAP } from 'utils/constants';
import moment from 'moment';
import { selectAllDictMap } from 'store/selectors';
import { ColumnsType } from 'antd/lib/table';
import styled from 'styled-components';

const WrapTable = styled.div`
  .table-color-1{
    background: #F6F9FF;
  }
`;
const WrapBlock = styled.div`
  .block-title{
    font-size: 16px;
    font-weight: normal;
    line-height: 24px;
    letter-spacing: 0em;
    color: #333333;
    margin-bottom: 16px;
      .tianshu{
        font-size: 14px;
        font-weight: normal;
        line-height: 24px;
        letter-spacing: 0em;
        color: #306BE9;
        }
      }
`;
const { useEffect, useMemo } = React;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

interface IProps {
  mainModal: IModalData<any>
  modules: Array<'设备基础信息' | '公司信息' | '闲置信息' | '记录'>
}
function ViewModule(props: IProps) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const dictMaps = useSelector(selectAllDictMap);
  const { data, visible = false } = props?.mainModal || {};
  // eslint-disable-next-line max-len
  const memoData = useMemo<any | Record<string, any>>(() => {
    const oData = { ...data };
    return {
      ...oData,
      // 添加需要格式化的初始值
    };
  }, [data]);
  useEffect(() => {
    visible && form.resetFields();
  }, [form, visible]);

  const columns: ColumnsType = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'left',
    },
    {
      title: '技术标识号',
      dataIndex: 'tecIdentifyNo',
      key: 'tecIdentifyNo',
      width: 100,
      align: 'left',
    },
    {
      title: '设备编码',
      dataIndex: 'deviceNo',
      key: 'deviceNo',
      width: 100,
      align: 'left',
    },
    {
      title: '设备说明',
      dataIndex: 'deviceSpecification',
      key: 'deviceSpecification',
      width: 100,
      align: 'left',
    },
    {
      title: '使用状态',
      dataIndex: 'useStatus',
      key: 'useStatus',
      width: 100,
      align: 'left',
      render: (text: any) => EQUIPMENT_USE_STATUS_MAP.get(text) || text,
    },
    {
      title: '闲置原因',
      dataIndex: 'idleReason',
      key: 'idleReason',
      width: 200,
      align: 'left',
    },
    {
      title: '闲置年月',
      dataIndex: 'idleMonth',
      key: 'idleMonth',
      width: 100,
      align: 'left',
    },
    {
      title: '闲置天数',
      dataIndex: 'idleDays',
      key: 'idleDays',
      width: 100,
      align: 'left',
    },
    {
      title: '净值',
      dataIndex: 'netValue',
      key: 'netValue',
      width: 100,
      align: 'left',
    },
    {
      title: '成本中心',
      dataIndex: 'costCenter',
      key: 'costCenter',
      width: 100,
      align: 'left',
      render: (text: any) => (dictMaps[EDictMap['成本中心']])?.[text] || text || '-',
    },
    {
      title: '成本中心名称',
      dataIndex: 'costCenterDescription',
      key: 'costCenterDescription',
      width: 100,
      align: 'left',
    },

    {
      title: '本部描述',
      dataIndex: 'partDescription',
      key: 'partDescription',
      width: 100,
      align: 'left',
      render: (text: any) => (dictMaps[EDictMap['本部描述']])?.[text] || text || '-',

    },
    {
      title: '区部描述',
      dataIndex: 'sectionDescription',
      key: 'sectionDescription',
      width: 100,
      align: 'left',
      render: (text: any) => (dictMaps[EDictMap['区部描述']])?.[text] || text || '-',
    },
    {
      title: '调拨联系人工号',
      dataIndex: 'transferContactNo',
      key: 'transferContactNo',
      width: 120,
      align: 'left',
    },
    {
      title: '负责人',
      dataIndex: 'principal',
      key: 'principal',
      width: 100,
      align: 'left',
    },
    {
      title: '职位',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      width: 100,
      align: 'left',
      render: (text: any) => (dictMaps[EDictMap['职位']])?.[text] || text || '-',
    },
    {
      title: '负责人名称',
      dataIndex: 'principalName',
      key: 'principalName',
      width: 100,
      align: 'left',
    },
  ];

  const columns2: ColumnsType = [
    {
      title: '技术标识号',
      dataIndex: 'tecIdentifyNo',
      key: 'tecIdentifyNo',
      width: 100,
      align: 'left',
    },
    {
      title: '设备编码',
      dataIndex: 'deviceNo',
      key: 'deviceNo',
      width: 100,
      align: 'left',
    },
    {
      title: '设备说明',
      dataIndex: 'deviceSpecification',
      key: 'deviceSpecification',
      width: 100,
      align: 'left',
    },
    {
      title: '规格型号',
      dataIndex: 'specificationsModels',
      key: 'specificationsModels',
      width: 100,
      align: 'left',
    },
    {
      title: '使用状态',
      dataIndex: 'useStatus',
      key: 'useStatus',
      width: 100,
      align: 'left',
      render: (text: any) => EQUIPMENT_USE_STATUS_MAP.get(text) || text,
    },
    {
      title: '调出成本中心',
      dataIndex: 'outCostCenter',
      key: 'outCostCenter',
      width: 110,
      align: 'left',
      render: (text: any) => (dictMaps[EDictMap['成本中心']])?.[text] || text || '-',
    },
    {
      title: '调出成本中心名称',
      dataIndex: 'outCostCenterDescription',
      key: 'outCostCenterDescription',
      width: 110,
      align: 'left',
    },
    {
      title: '调出月份',
      dataIndex: 'dispatchOutMonth',
      key: 'dispatchOutMonth',
      width: 100,
      align: 'left',
    },
    {
      title: '调入成本中心',
      dataIndex: 'inCostCenter',
      key: 'inCostCenter',
      width: 110,
      align: 'left',
      render: (text: any) => (dictMaps[EDictMap['成本中心']])?.[text] || text || '-',
    },
    {
      title: '调入成本中心名称',
      dataIndex: 'inCostCenterDescription',
      key: 'inCostCenterDescription',
      width: 110,
      align: 'left',
    },
    {
      title: '净值',
      dataIndex: 'netValue',
      key: 'netValue',
      width: 100,
      align: 'left',
    }
  ];
  return (
    <>
      <Space direction='vertical'>
        {
          props?.modules?.includes('设备基础信息') && (
            <>
              <WrapBlock>
                <div className='block-title'>设备基础信息</div>
                <Form {...formItemLayout} form={form}>
                  <Row>
                    <Col span={8}>
                      <Form.Item label='技术标识号'>
                        <Input disabled value={memoData.tecIdentifyNo || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='设备编码'>
                        <Input disabled value={memoData.deviceNo || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='品牌'>
                        <Input disabled value={memoData.brand || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='规格型号'>
                        <Input disabled value={memoData.specificationsModels || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='构造类型'>
                        <Input disabled value={memoData.structuralType || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='构造类型描述'>
                        <Input disabled value={memoData.structuralTypeDescription || '-'} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </WrapBlock>
              <Divider />
            </>
          )
        }
        {
          props?.modules?.includes('公司信息') && (
            <>
              <WrapBlock>
                <div className='block-title'>公司信息</div>
                <Form {...formItemLayout} form={form}>
                  <Row>
                    <Col span={8}>
                      <Form.Item label='公司'>
                        <Input disabled value={dictMaps[EDictMap['公司']]?.[memoData?.company] || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='公司描述'>
                        <Input disabled value={memoData.companyIntroduction || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='购置日期'>
                        <Input disabled value={moment(memoData?.acquisitionDate)?.format('YYYY-MM-DD') || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='购置价值(元)'>
                        <Input disabled value={memoData.acquisitionValue || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='资产原值(元)'>
                        <Input disabled value={memoData.initialAssetValue || '-'} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </WrapBlock>
              <Divider />
            </>
          )
        }
        {
          props?.modules?.includes('闲置信息') && (
            <>
              <WrapBlock>
                <div className='block-title'>闲置信息</div>
                <Form {...formItemLayout} form={form}>
                  <Row>
                    <Col span={8}>
                      <Form.Item label='闲置月份'>
                        <Input disabled value={memoData.idleMonth || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='闲置原因'>
                        <Input disabled value={memoData.idleReason || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='净值'>
                        <Input disabled value={memoData.netValue} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='成本中心'>
                        <Input disabled value={dictMaps[EDictMap['成本中心']]?.[memoData?.costCenter] || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='成本中心名称'>
                        <Input disabled value={memoData.costCenterDescription || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='本部描述'>
                        <Input disabled value={dictMaps[EDictMap['本部描述']]?.[memoData?.partDescription] || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='区部描述'>
                        <Input disabled value={dictMaps[EDictMap['区部描述']]?.[memoData?.sectionDescription] || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='调拨联系人工号'>
                        <Input disabled value={memoData.transferContactNo || '-'} />
                      </Form.Item>
                    </Col>
                    {/* <Col span={8}>
                      <Form.Item label='调拨联系人姓名'>
                        <Input disabled value={memoData.transferContactName || '-'} />
                      </Form.Item>
                    </Col> */}
                    <Col span={8}>
                      <Form.Item label='负责人'>
                        <Input disabled value={memoData.principal || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='职位'>
                        <Input disabled value={dictMaps[EDictMap['职位']]?.[memoData?.sectionDescription] || '-'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label='负责人名称'>
                        <Input disabled value={memoData.principalName || '-'} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </WrapBlock>
            </>
          )
        }
        {
          props?.modules?.includes('记录') && (
            <WrapBlock>
              <div className='block-title'><span className='tianshu'>累计闲置{memoData.idleDaysSum || '-'}天</span></div>
              <WrapTable>
                <Tabs
                  defaultActiveKey='1'
                  items={[
                    {
                      label: `闲置记录`,
                      key: '1',
                      children: <Table
                        bordered
                        dataSource={(memoData?.deviceIdleRecordRespList || [] as any)}
                        columns={columns}
                        rowKey='id'
                        pagination={false}
                        rowClassName={(record: any) => {
                          if (record.idleMonth && (record.idleMonth === memoData?.idleMonth)) return 'table-color-1';
                        }}
                      // scroll={{ x: 2000 }}
                      />,
                    },
                    {
                      label: `调拨记录`,
                      key: '2',
                      children: <Table
                        bordered
                        dataSource={(memoData?.deviceTransferRecordRespList || [] as any)}
                        columns={columns2}
                        rowKey='id'
                        pagination={false}
                        rowClassName={(record: any) => {
                          if ( record.dispatchOutMonth && (record.dispatchOutMonth === memoData?.dispatchOutMonth)) return 'table-color-1';
                        }}
                      // scroll={{ x: 2000 }}
                      />,
                    },
                  ]}
                />
              </WrapTable>
            </WrapBlock>
          )
        }
        <div style={{ height: '80px' }} />
      </Space>
    </>
  );
}

export default ViewModule;
