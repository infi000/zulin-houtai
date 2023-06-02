import * as React from 'react';
import { Form, Table, Descriptions, Breadcrumb, Carousel, Image, Divider, Tabs, BackTop, Tooltip } from 'antd';
import styled from 'styled-components';
import Slider from 'react-slick';
import { IdcardOutlined, PhoneOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import cosInstance from 'utils/cosUtils';
import { baseTableConf } from 'configs/base.conf';
import { falsyParamsFilter } from 'utils/filters';
import { selectAllDictMap } from 'store/selectors';
import { EDictMap, yesOrNo } from 'utils/constants';
import { empty } from 'components/TableEmpty';
import TitlePrefixIcon from 'components/TitlePrefixIcon';
import noPicture from 'static/images/no_picture@2x.png';
import icSupport from 'static/images/ic_support@2x.png';
import icPhone from 'static/images/ic_phone@2x.png';

// import OperateLog from 'components/OperateLog';
// import Auth from 'containers/AuthController';
import Star from './Star';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import selectors from '../selectors';
import { EYesOrNO, EIsLeasedPlace, EIsSale } from '../types';

const { useEffect, useLayoutEffect, useState, useMemo, useRef } = React;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // background: #fff;
  // border-radius: 4px;
  // padding: 16px 16px;
  // box-shadow: 0px 3px 7px 1px rgba(111,118,129,0.10); 
  height: 100vh;
  overflow: scroll;
  .backTop {
    width: 40px;
    height: 40px;
    background: black;
    border: 1px solid #dddddd;
    border-radius: 4px;
    color: black;
  }
  .ant-breadcrumb {
    margin-bottom: 16px;
    line-height: 20px;
  }
`;

const Wrapper = styled.div`
  padding: 16px 16px 0;
  margin-bottom: 16px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 3px 7px 1px rgba(111,118,129,0.10); 
`;

const StoreBrief = styled.div`
  display: flex;
  height: 450px;
  margin-bottom: 20px;
  .storeImg {
    position: relative;
    height: 450px;
    width: 756px;
    margin-right: 24px;
    border-radius: 4px;
    background: #f0f3f6;
    .slider-for {
      img {
        height: 450px;
        width: 756px;
        object-fit: cover;
        border-radius: 4px;
      }
    }
    .slider-nav {
      width: 756px;
      height: 90px;
      padding: 0 90px;
      position: absolute;
      top: 360px
      border-radius: 0 0 4px 4px;
      background-color: rgba(0,0,0,0.6);
      .slick-list {
        padding: 10px 50px !important;
      }
      .slick-slide {
        display: flex;
        justify-content: center;
      }
      .slick-arrow {
        height: 90px;
        width: 130px;
      }
      .slick-current {
        img {
          border: 4px solid #ffffff;
        }
      }
      img {
        height: 70px;
        width: 70px;
        border-radius: 4px;
      }
    }
    
    .noImgWarp {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 18px;
      line-height: 22px;
      color: #cfd2d8;
      .noImg {
        border-radius: 4px;
        height: 114px;
        width: 100px;
        margin-top:155px;
        text-align: center;
        margin-bottom: 4px;
      }
    }
    .name {
      position: absolute;
      top: 0;
      padding: 0 5px;
      background: #1378d8;
      color: white;
    }
    .ant-carousel .slick-prev,
    .ant-carousel .slick-next,
    .ant-carousel .slick-prev:hover,
    .ant-carousel .slick-next:hover {
      font-size: 30px;
      color: currentColor;
      z-index: 100;
    }
    .ant-carousel .slick-prev {
      left: 0;
    }
    .ant-carousel .slick-next {
      right: 10px;
    }
    .ant-carousel .slick-dots li.slick-active button {
      background: black;
    }
    .ant-carousel .slick-dots li button {
      background: grey;
    }
  }
  .storeInfo {
    flex: 1;
    .storeIntro {
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin: 8px 0 16px 0;
      color: #323233;
    }
    .storeName {
      font-size: 16px;
      line-height: 24px;
      font-weight: 500;
      margin-bottom: 8px;
      color: #323233;
    }
    .storeDesc {
      height: 100px;
      overflow-y: scroll
      margin-bottom: 16px;
      .desc {
        font-weight: 400;
        line-height: 20px;
        color: #666666;
      }
       &::-webkit-scrollbar {
               background-color:transparent;
              width: 0px;
              display: none;
         }
    }
    .storeArea {
      display: flex;
      .area {
        flex: 1
        line-height: 20px;
        margin-bottom: 8px;
      }
      .areaNum {
        color: #306be9;
        font-size: 30px;
        font-weight: 700;
        line-height: 38px;
        font-family: DDinBold;
        // padding: 0 20px;
      }
    }
    .storeSign {
      // margin: 30px 0;
      height: 24px;
      overflow: hidden;
      .sign {
        display: inline-block;
        color: #3355ff;
        line-height: 20px;
        margin-right: 8px;
        padding: 1px 8px;
        border: 1px solid #3355ff;
      }
    }
    .storeRow {
      margin-bottom: 8px;
      line-height: 20px;
      color: #666666;
      font-weight: 400;
      .filedIcon {
        width: 16px
        height: 16px;
        margin: 0 16px 2px 0;
      }
      .storeFiled {
        padding: 0 10px 0 0;
        margin-right: 10px;
      }
    }
  }
`;

const RewardWarp = styled.div`
  display: flex;
  height: 64px;
  .rewardName {
    display: flex;
    color: #527ae9;;
    text-decoration: underline;
    margin-left: 10px;
    align-items: center;
    cursor: pointer;
  }
`;

const StoreInfoWarp = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  padding: 16px 16px;
  box-shadow: 0px 3px 7px 1px rgba(111,118,129,0.10); 
  // min-height: 100%;
  // overflow: hidden;

  .ant-tabs {
    height: 100%;
  }
  .ant-tabs-tab {
    font-size: 16px;
    font-weight: 400;
    color: #666666;
    line-height: 26px;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #333333;
    font-weight: 500;
  }
  .ant-tabs-content-holder {
    // overflow-y: scroll;
  }
  .title {
    display: inline-block;
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    line-height: 24px;
    margin-bottom: 16px;
  }
`;

function StoreDetail() {
  const [form] = Form.useForm();
  // const storeDeail = useSelector(selectors.storeDeail);
  const storeInfo = useSelector(selectors.storeInfo);
  const unusedInfo = useSelector(selectors.unusedInfo);
  const rewardInfo = useSelector(selectors.rewardInfo);
  const refresh = useSelector(selectors.refresh);
  const [imgVisible, setImgVisible] = useState(false);
  const dictMaps = useSelector(selectAllDictMap);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const forRef = useRef<any>(null);
  const navRef = useRef<any>(null);
  useEffect(() => {
    if (forRef?.current) {
      setNav1(forRef.current);
    }
  });

  useEffect(() => {
    if (navRef?.current) {
      setNav2(navRef.current);
    }
  });
  // const storeInfo: any = {};

  const picture = React.useMemo(() => {
    let res: any[] = [];
    let parkPicture: any[] = [];
    let warehousePicture: any[] = [];
    if (storeInfo?.parkPictureList || storeInfo?.warehousePictureList) {
      parkPicture = (storeInfo?.parkPictureList || []).map((item: string) => ({
        name: '园区图片',
        src: item,
      }));
      warehousePicture = (storeInfo?.warehousePictureList || []).map((item: string) => ({
        name: '仓库图片',
        src: item,
      }));
    }
    res = parkPicture.concat(warehousePicture);
    return res;
  }, [storeInfo?.parkPictureList, storeInfo?.warehousePictureList]);

  function formatNum2(str: any) {
    if (/^-?\d+(\.\d+)?$/.test(str)) {
      let num: any = parseFloat(str);
      num = num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1');
      return num;
    }
    return str;
  }

  const dispatch = useDispatch();

  const columns = [
    {
      title: '闲置区位',
      dataIndex: 'idleZone',
      key: 'idleZone',
    },
    {
      title: '闲置面积（㎡）',
      dataIndex: 'idleArea',
      key: 'idleArea',
    },
    {
      title: '闲置结束时间',
      dataIndex: 'idleEndTime',
      key: 'idleEndTime',
      render: (text: number) => formatNum2(text) || '-',
    },
    {
      title: '是否可售',
      dataIndex: 'sale',
      key: 'sale',
      render: (text: number) => EIsSale[text] || '-',
    },
    {
      title: '适合货物',
      dataIndex: 'applicableGoods',
      key: 'applicableGoods',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  const downloadDetail = async (key: string) => {
    const url = await cosInstance.downloadFile(key);
    console.log(url);
    window.open(url, '_blank');
  };

  console.log(nav1, nav2);

  return (
    <ContentWrapper>
      <Breadcrumb>
        <Breadcrumb.Item href='/uiResources/resourceSearch/placeSearch'>
          场地查询
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          详情
        </Breadcrumb.Item>
      </Breadcrumb>
      <Wrapper>
        <StoreBrief>
          {/* <div className='storeImg'>
            {
              picture && picture?.length ? (
                <Carousel
                  arrows
                  prevArrow={<LeftOutlined />}
                  nextArrow={<RightOutlined />}
                >
                  {
                    (picture || []).map((item: any) => (
                      <>
                        <Image
                          preview={{ visible: false }}
                          src={item.src}
                          width={756}
                          height={450}
                          onClick={() => setImgVisible(true)}
                        />
                        <div className='name'>{item.name}</div>
                      </>
                    ))
                  }
                </Carousel>
              ) : (
                <div className='noImgWarp'>
                  <img
                    className='noImg'
                    src={noPicture}
                    alt='no img'
                  />
                  <div>暂无图片</div>
                </div>
              )
            }
            <div style={{ display: 'none' }}>
              <Image.PreviewGroup preview={{ visible: imgVisible, onVisibleChange: vis => setImgVisible(vis) }}>
                {
                  (picture || []).map((item: any) => (
                    <Image
                      src={item.src}
                      alt='store img'
                    />
                  ))
                }
              </Image.PreviewGroup>
            </div>
          </div> */}
          <div className='storeImg'>
            {
              picture && picture?.length ? (
                <>
                  <Slider
                    className='slider-for'
                    ref={forRef}
                    slidesToShow={1}
                    slidesToScroll={1}
                    arrows={false}
                    fade
                    asNavFor={nav2}
                  >
                    {
                      (picture || []).map((item: any) => (
                        <>
                          <img
                            // preview={{ visible: false }}
                            src={item.src}
                            width={756}
                            height={350}
                            // onClick={() => setImgVisible(true)}
                            alt='pic'
                          />
                          <div className='name'>{item.name}</div>
                        </>
                      ))
                    }
                  </Slider>
                  <Slider
                    className='slider-nav'
                    ref={navRef}
                    slidesToShow={picture.length < 6 ? picture.length : 6}
                    slidesToScroll={1}
                    asNavFor={nav1}
                    centerMode
                    focusOnSelect
                    swipeToSlide
                    arrows
                  >
                    {
                      (picture || []).map((item: any) => (
                        <>
                          <img
                            // preview={{ visible: false }}
                            src={item.src}
                            width={70}
                            height={70}
                            // onClick={() => setImgVisible(true)}
                            alt='pic'
                          />
                        </>
                      ))
                    }
                  </Slider>
                </>
              ) : (
                <div className='noImgWarp'>
                  <img
                    className='noImg'
                    src={noPicture}
                    alt='no img'
                  />
                  <div>暂无图片</div>
                </div>
              )
            }
          </div>
          <div className='storeInfo'>
            <div className='storeIntro'>仓库简介</div>
            <div className='storeName'>{storeInfo.warehouseName} - {storeInfo.warehouseCode}</div>
            <div className='storeDesc'>
              <div className='desc'>{storeInfo.warehouseBrief}</div>
            </div>
            {
              storeInfo?.warehouseLinks ? (
                <Tooltip placement='topLeft' title={storeInfo.warehouseLinks}>
                  <div className='storeSign'>
                    {
                      (storeInfo?.warehouseLinks?.split(',') || []).map((item: string) => (<div className='sign'>{item}</div>))
                    }
                  </div>
                </Tooltip>
              ) : (<div className='storeSign' />)
            }
            <Divider />
            <div className='storeArea'>
              <div className='area'>仓库面积（㎡）</div>
              <div className='area'>闲置总面积（㎡）</div>
              <div className='area'>可售总面积（㎡）</div>
            </div>
            <div className='storeArea'>
              <div className='area areaNum'>{formatNum2(storeInfo.areaWarehouseArea) || '-'}</div>
              <div className='area areaNum'>{formatNum2(storeInfo.idleAreaTotal) || '-'}</div>
              <div className='area areaNum'>{formatNum2(storeInfo.saleAreaTotal) || '-'}</div>
            </div>
            <Divider />
            <div className='storeRow'>
              <img className='filedIcon' src={icSupport} alt='icSupport' />
              <span className='storeFiled'>运营支持：杨子安（工号：01399247）</span>
            </div>
            <div className='storeRow'>
              <img className='filedIcon' src={icPhone} alt='icPhone' />
              <span className='storeFiled'>联系电话：132 4761 0928</span>
            </div>
          </div>
        </StoreBrief>
      </Wrapper>

      <StoreInfoWarp>
        <Tabs defaultActiveKey='1'>
          <Tabs.TabPane tab='仓库信息' key='1'>
            <TitlePrefixIcon />
            <div className='title'>仓库信息</div>
            <Descriptions title='' bordered size='small' column={2} labelStyle={{ width: '200px' }} contentStyle={{ width: '300px' }} style={{ marginBottom: '20px' }}>
              <Descriptions.Item label='仓库名称'>{ storeInfo.warehouseName }</Descriptions.Item>
              <Descriptions.Item label='仓库编码'>{ storeInfo.warehouseCode }</Descriptions.Item>
              <Descriptions.Item label='网点编码'>{ storeInfo.warehouseSiteCode }</Descriptions.Item>
              <Descriptions.Item label='场地维度编码'>{ storeInfo.warehousePlaceCode }</Descriptions.Item>
              <Descriptions.Item label='仓库类型'>{ storeInfo.warehouseType }</Descriptions.Item>
              <Descriptions.Item label='场地标识'>{ storeInfo.warehousePlaceIdentify }</Descriptions.Item>
              <Descriptions.Item label='所属BU'>{(dictMaps[EDictMap['所属BU']])?.[storeInfo.warehouseBu] || storeInfo.warehouseBu || '-'}</Descriptions.Item>
              <Descriptions.Item label='大区'>{(dictMaps[EDictMap['仓库所属大区']])?.[storeInfo.warehouseRegion] || storeInfo.warehouseRegion || '-'}</Descriptions.Item>
              <Descriptions.Item label='业务区'>{(dictMaps[EDictMap['业务区']])?.[storeInfo.warehouseBusinessArea] || storeInfo.warehouseBusinessArea || '-'}</Descriptions.Item>
              <Descriptions.Item label='区域中心'>{(dictMaps[EDictMap['区域中心']])?.[storeInfo.warehouseRegionalCenter] || storeInfo.warehouseRegionalCenter || '-'}</Descriptions.Item>
              <Descriptions.Item label='实际区域归属'>{(dictMaps[EDictMap['区域中心']])?.[storeInfo.warehouseActualCenter] || storeInfo.warehouseActualCenter || '-'}</Descriptions.Item>
              <Descriptions.Item label='仓库属性'>{(dictMaps[EDictMap['仓库属性']])?.[storeInfo.warehouseAttribute] || storeInfo.warehouseAttribute || '-'}</Descriptions.Item>
              <Descriptions.Item label='省市区'>{ `${storeInfo.warehouseProvince || '-'} / ${storeInfo.warehouseCity || '-'} / ${storeInfo.warehouseCounty || '-'}` }</Descriptions.Item>
              <Descriptions.Item label='仓库地址'>{storeInfo.warehouseDetailAddress || '-'}</Descriptions.Item>
            </Descriptions>
          </Tabs.TabPane>
          <Tabs.TabPane tab='闲置/可售信息' key='2'>
            <TitlePrefixIcon />
            <div className='title'>闲置/可售信息</div>
            <Table
              style={{ marginBottom: '20px' }}
              size='small'
              rowKey='id'
              columns={columns}
              dataSource={unusedInfo || []}
              pagination={false}
              locale={empty}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='奖励机制' key='3'>
            {
              rewardInfo && rewardInfo.length ? (
                <>
                  <TitlePrefixIcon />
                  <div className='title'>奖励机制</div>
                  {
                    rewardInfo.map((item: any) => (
                      <RewardWarp>
                        <Star />
                        <div className='rewardName' onClick={() => downloadDetail(item.textPart)}>{item.title}</div>
                      </RewardWarp>
                    ))
                  }
                </>
              ) : null
            }
          </Tabs.TabPane>
          <Tabs.TabPane tab='运营信息' key='4'>
            <TitlePrefixIcon />
            <div className='title'>运营信息</div>
            <Descriptions title='' bordered size='small' column={2} labelStyle={{ width: '200px' }} contentStyle={{ width: '300px' }}>
              <Descriptions.Item label='经营类型'>{(dictMaps[EDictMap['经营类型']])?.[storeInfo.operationType] || storeInfo.operationType || '-'}</Descriptions.Item>
              <Descriptions.Item label='场地是否为我司租赁'>{ EIsLeasedPlace[storeInfo.operationIsLeasedPlace] || '-' }</Descriptions.Item>
              <Descriptions.Item label='人员是否是我司员工'>{ EYesOrNO[storeInfo.operationIsInnerStaff] }</Descriptions.Item>
              <Descriptions.Item label='行业分类'>{ storeInfo.operationClassificationIndustry }</Descriptions.Item>
              <Descriptions.Item label='日均订单量'>{ storeInfo.operationDayAvgOrderQuantity }</Descriptions.Item>
              <Descriptions.Item label='峰值订单量'>{ storeInfo.operationPeakOrderQuantity }</Descriptions.Item>
              <Descriptions.Item label='扩充能力（㎡）'>{ storeInfo.operationExpansionAbility }</Descriptions.Item>
            </Descriptions>
          </Tabs.TabPane>
          <Tabs.TabPane tab='区位信息' key='5'>
            <TitlePrefixIcon />
            <div className='title'>区位信息</div>
            <Descriptions title='' bordered size='small' column={2} labelStyle={{ width: '200px' }} contentStyle={{ width: '300px' }} style={{ marginBottom: '20px' }}>
              <Descriptions.Item label='融通方式'>{(dictMaps[EDictMap['融通方式']])?.[storeInfo.zoneFinanceType] || storeInfo.zoneFinanceType || '-'}</Descriptions.Item>
              <Descriptions.Item label='融通场地代码'>{ storeInfo.zoneFinancePlaceCode }</Descriptions.Item>
              <Descriptions.Item label='融通中转场'>{ storeInfo.zoneFinanceTransit }</Descriptions.Item>
              <Descriptions.Item label='中转场功能'>{ storeInfo.zoneTransitFunction }</Descriptions.Item>
              <Descriptions.Item label='与大件仓同场'>{ EYesOrNO[storeInfo.zoneLargeWarehouseSame] }</Descriptions.Item>
              <Descriptions.Item label='与中转场同场'>{ EYesOrNO[storeInfo.zoneSameTransit] }</Descriptions.Item>
              <Descriptions.Item label='最近中转场导航距离（km）'>{ storeInfo.zoneTransitDistance }</Descriptions.Item>
              <Descriptions.Item label='发运中转场场地代码'>{ storeInfo.zoneTransitCode }</Descriptions.Item>
            </Descriptions>
          </Tabs.TabPane>
          <Tabs.TabPane tab='建筑信息' key='6'>
            <TitlePrefixIcon />
            <div className='title'>建筑信息</div>
            <Descriptions title='' bordered size='small' column={2} labelStyle={{ width: '200px' }} contentStyle={{ width: '300px' }} style={{ marginBottom: '20px' }}>
              <Descriptions.Item label='建筑物属性'>{(dictMaps[EDictMap['建筑物属性']])?.[storeInfo.buildingAttribute] || storeInfo.buildingAttribute || '-'}</Descriptions.Item>
              <Descriptions.Item label='建筑物类型'>{(dictMaps[EDictMap['建筑类型']])?.[storeInfo.buildingType] || storeInfo.buildingType || '-'}</Descriptions.Item>
              <Descriptions.Item label='建筑结构'>{(dictMaps[EDictMap['建筑结构']])?.[storeInfo.buildingStructure] || storeInfo.buildingStructure || '-'}</Descriptions.Item>
              <Descriptions.Item label='建筑层数（层）'>{ storeInfo.buildingStorey }</Descriptions.Item>
              <Descriptions.Item label='所在楼层'>{ storeInfo.buildingCurrentFloor }</Descriptions.Item>
              <Descriptions.Item label='首层层高（m）'>{ storeInfo.buildingFirstFloorHeight }</Descriptions.Item>
              <Descriptions.Item label='最低承重（t/㎡）'>{ storeInfo.buildingLowLoadBearing }</Descriptions.Item>
              <Descriptions.Item label='货梯数量（部）'>{ storeInfo.buildingFreightElevatorQuantity }</Descriptions.Item>
              <Descriptions.Item label='楼下净空（m）'>{ storeInfo.buildingDownstairClearance }</Descriptions.Item>
              <Descriptions.Item label='月台配置'>{(dictMaps[EDictMap['月台配置']])?.[storeInfo.buildingPlatformConfigurations] || storeInfo.buildingPlatformConfigurations || '-'}</Descriptions.Item>
              <Descriptions.Item label='升降平台（个）'>{ storeInfo.buildingLiftPlatformQuantity }</Descriptions.Item>
              <Descriptions.Item label='回车空间（m）'>{ storeInfo.buildingBackCarSpace }</Descriptions.Item>
              <Descriptions.Item label='可供电量（KW/KVA）'>{ storeInfo.buildingAvailablePower }</Descriptions.Item>
              <Descriptions.Item label='地面材质'>{(dictMaps[EDictMap['地面材质']])?.[storeInfo.buildingFloorTexture] || storeInfo.buildingFloorTexture || '-'}</Descriptions.Item>
              <Descriptions.Item label='消防等级'>{(dictMaps[EDictMap['消防等级']])?.[storeInfo.buildingFireLevel] || storeInfo.buildingFireLevel || '-'}</Descriptions.Item>
              <Descriptions.Item label='耐火等级'>{(dictMaps[EDictMap['耐火等级']])?.[storeInfo.buildingFireResistanceRating] || storeInfo.buildingFireResistanceRating || '-'}</Descriptions.Item>
            </Descriptions>
          </Tabs.TabPane>
          <Tabs.TabPane tab='合同信息' key='7'>
            <TitlePrefixIcon />
            <div className='title'>合同信息</div>
            <Descriptions title='' bordered size='small' column={2} labelStyle={{ width: '200px' }} contentStyle={{ width: '300px' }} style={{ marginBottom: '20px' }}>
              <Descriptions.Item label='合同开始日期'>{ storeInfo.contactStartDate }</Descriptions.Item>
              <Descriptions.Item label='计租起始日期'>{ storeInfo.contactRentalStartDate }</Descriptions.Item>
              <Descriptions.Item label='合同终止日期'>{ storeInfo.contactEndDate }</Descriptions.Item>
              <Descriptions.Item label='仓库面积（㎡）'>{ formatNum2(storeInfo.areaWarehouseArea) || '-'}</Descriptions.Item>
              <Descriptions.Item label='合同面积（㎡）'>{ formatNum2(storeInfo.areaContractArea) || '-' }</Descriptions.Item>
              <Descriptions.Item label='建筑面积（㎡）'>{ formatNum2(storeInfo.areaBuildingArea) || '-' }</Descriptions.Item>
              <Descriptions.Item label='公摊面积（㎡）'>{ formatNum2(storeInfo.areaSharedArea) || '-'}</Descriptions.Item>
              <Descriptions.Item label='公摊率'>{ formatNum2(storeInfo.areaSharedRate) || '-' }</Descriptions.Item>
            </Descriptions>
          </Tabs.TabPane>
          <Tabs.TabPane tab='辅助信息' key='8'>
            <TitlePrefixIcon />
            <div className='title'>辅助信息</div>
            <Descriptions title='' bordered size='small' column={2} labelStyle={{ width: '200px' }} contentStyle={{ width: '300px' }} style={{ marginBottom: '20px' }}>
              <Descriptions.Item label='建筑责任主体'>{ storeInfo.assistBuildingResponsibility }</Descriptions.Item>
              <Descriptions.Item label='代表客户'>{storeInfo.assistCustomerRepresentative }</Descriptions.Item>
              <Descriptions.Item label='仓库负责人/对接人'>{ storeInfo.assistWarehouseContract }</Descriptions.Item>
              <Descriptions.Item label='联系电话'>{ storeInfo.assistContractPhone }</Descriptions.Item>
              <Descriptions.Item label='是否上仓下中转场地'>{ EYesOrNO[storeInfo.assistUpDownTransit] }</Descriptions.Item>
              <Descriptions.Item label='备注'>{ storeInfo.assistRemark }</Descriptions.Item>
            </Descriptions>
          </Tabs.TabPane>
        </Tabs>
      </StoreInfoWarp>
      {/* <div style={{ height: '1500px' }}>1</div> */}
      <BackTop visibilityHeight={10}>
        <div
          className='backTop'
          style={{
            height: 40,
            width: 40,
            lineHeight: '40px',
            borderRadius: 4,
            backgroundColor: '#1088e9',
            color: '#fff',
            textAlign: 'center',
            fontSize: 14,
          }}
        >UP</div>
      </BackTop>
    </ContentWrapper>
  );
}

export default StoreDetail;
