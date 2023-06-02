import * as React from 'react';
import { Divider, Pagination, Image, Button, Skeleton, Spin } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { baseTableConf } from 'configs/base.conf';
import { falsyParamsFilter } from 'utils/filters';
import usePageJump from 'hooks/usePageJump';
import { selectAllDictMap } from 'store/selectors';
import { EDictMap, yesOrNo } from 'utils/constants';
import noPicture from 'static/images/no_picture@2x.png';
import noData from 'static/images/no_data@3x.png';
import { MyIcon } from 'static/icon';

// import OperateLog from 'components/OperateLog';
// import Auth from 'containers/AuthController';

import { getDataList, actions } from '../slice';
import selectors from '../selectors';
import { ISearchCondition, ITableItem } from '../types';
import { formatSearchParams } from '../adapter';

// const { useEffect } = React;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  padding: 16px 16px;
  box-shadow: 0px 3px 7px 1px rgba(111,118,129,0.10); 
  height: 100vh;
  overflow: hidden;
  .wrapperContent {
    flex: 1;
    height: 2000px;
    overflow-y: scroll;
  }
  .wrapperPagination {
    height: 50px;
    flex-shrik: 0;
    .ant-pagination {
      position: absolute;
      bottom: 35px;
      right: 35px;
    }
  }
  .noContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #333333;
  }
`;
const ItemWarp = styled.div`
  display: flex;
  height: 154px;
  cursor: pointer;
  .storeImg {
    height: 154px;
    width: 220px;
    margin-right: 16px;
    background: #f0f3f6;
    border-radius: 4px;
    .sImg {
      height: 154px;
      width: 220px;
      object-fit: cover;
      border-radius: 4px;
    }
    .sLoadingCon {
      height: 154px;
      width: 220px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.2);
    }
    .noImgWarp {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      color: #cfd2d8;
      .noImg {
        border-radius: 4px;
        height: 57px;
        width: 50px;
        margin-top: 36px;
        text-align: center;
        margin-bottom: 6px;
      }
    }
  }
  .storeInfo {
    flex: 1;
    .storeName {
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      color: #323233;
      margin: 2px 0 8px 0;
    }
    .storeRow {
      margin: 4px 0;
      line-height: 20px;
      font-weight: 400;
      color: #666666;

      .filedIcon {
        width: 16px
        height: 16px;
        font-size: 16px;
        margin: 0 16px 2px 0;
      }
      .storeFiled {
        display: inline-block;
        margin-right: 8px;
      }
    }
    .ant-btn {
      font-size: 14px;
      padding: 2px 15px;
      height: 24px;
      font-weight: 400;
      min-width: 58px;
      margin-top: 4px;
    }
  }
`;

const VerticalDivider = styled.div`
  display: inline-block;
  height: 8px;
  width: 1px;
  margin-right: 8px;
  background: #ebebeb;
`;

function StoreInfo() {
  const pageJump = usePageJump();
  const storeData = useSelector(selectors.storeData);
  const pagination = useSelector(selectors.pagination);
  const searchCondition = useSelector(selectors.searchCondition);
  const loading = useSelector(selectors.loading);
  const dictMaps = useSelector(selectAllDictMap);

  function formatNum2(str: string) {
    if (/^-?\d+(\.\d+)?$/.test(str)) {
      let num: any = parseFloat(str);
      num = num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1');
      return num;
    }
    return str;
  }

  const dispatch = useDispatch();

  const handleSearch = (additionalParams: Dictionary<TAdditionalParams> = {}) => {
    const formatParams = formatSearchParams({
      ...searchCondition,
      pageNum: 1, // 默认所有的检索也都重新从1开始检索
      pageSize: pagination.pageSize,
      ...additionalParams,
    });
    dispatch(actions.setLoading(true));
    dispatch(getDataList(falsyParamsFilter<ISearchCondition & IPagination>(formatParams)));
  };

  const handleChangePage = (pageNum: number, pageSize: number) => {
    handleSearch({ pageNum, pageSize });
  };

  // 查看
  const openStoreDetail = (data: ITableItem) => {
    const { id } = data;
    const newPath = `/uiResources/resourceSearch/placeSearch/placeDetail/:${id}?id=${id}`;
    // const newPath = `/placeSearch/placeDetail`;
    pageJump(newPath);
  };

  // 格式化图片url,拼接压缩参数
  const formatImg = (url: string) => {
    if (!url) {
      return undefined;
    }
    return `${url}&imageMogr2/blur/8x1`;
  };

  const StoreItem = (props: any) => {
    const { data } = props;
    return (
      <ItemWarp>
        <div className='storeImg'>
          {
            data?.assistParkPicture?.[0] ? (
              <Image
                className='sImg'
                // preview={true}
                src={formatImg(data?.assistParkPicture?.[0]) || 'error'}
                alt='store img'
                fallback={noPicture}
                placeholder={(
                  <div className='sLoadingCon'><Spin /></div>
                )}
                preview={{
                  src: data?.assistParkPicture?.[0] || 'error',
                }}
              />
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
          <div className='storeName'>{`${data.warehouseName || '-'}（${data.warehouseCode || '-'}）`}</div>
          <div className='storeRow'>
            <MyIcon className='filedIcon' type='icon-a-icn_zhuangtai1x' />
            <span className='storeFiled'>状态：{(dictMaps[EDictMap['仓库状态']])?.[data.warehouseState] || data.warehouseState || '-'}</span>
            <VerticalDivider />
            <span className='storeFiled'>仓库类型：{data.warehouseType || '-'}</span>
            <VerticalDivider />
            <span className='storeFiled'>仓库属性：{(dictMaps[EDictMap['仓库属性']])?.[data.warehouseAttr] || data.warehouseAttr || '-'}</span>
            <VerticalDivider />
            <span>是否租赁场地：{yesOrNo.get(data.operationIsLeasedPlace) || data.operationIsLeasedPlace}</span>
          </div>
          <div className='storeRow'>
            <MyIcon className='filedIcon' type='icon-a-icn_dizhi1x' />
            <span className='storeFiled'>地址：{data.warehouseAddress || '-'}</span>
            <VerticalDivider />
            <span className='storeFiled'>大区：{(dictMaps[EDictMap['仓库所属大区']])?.[data.warehouseRegion] || data.warehouseRegion || '-'}</span>
            <VerticalDivider />
            <span>所属BU：{(dictMaps[EDictMap['所属BU']])?.[data.warehouseBu] || data.warehouseBu || '-'}</span>
          </div>
          <div className='storeRow'>
            <MyIcon className='filedIcon' type='icon-a-icn_jianzhushuxing1x' />
            <span className='storeFiled'>建筑物属性：{(dictMaps[EDictMap['建筑物属性']])?.[data.buildingAttribute] || data.buildingAttribute || '-'}</span>
            <VerticalDivider />
            <span className='storeFiled'>月台配置：{(dictMaps[EDictMap['月台配置']])?.[data.buildingPlatformConfigurations] || data.buildingPlatformConfigurations || '-'}</span>
            <VerticalDivider />
            <span className='storeFiled'>消防等级：{(dictMaps[EDictMap['消防等级']])?.[data.buildingFireLevel] || data.buildingFireLevel || '-'}</span>
            <VerticalDivider />
            <span className='storeFiled'>最低承重：{data.minBearing || '-'}</span>
            <VerticalDivider />
            <span>耐火等级：{data.buildingFireResistanceRating || '-'}</span>
          </div>
          <div className='storeRow'>
            <MyIcon className='filedIcon' type='icon-a-icn_cangkumianji1x' />
            <span className='storeFiled'>仓库面积：{formatNum2(data.warehouseArea) || '-'} ㎡</span>
            <VerticalDivider />
            <span className='storeFiled'>闲置总面积：{formatNum2(data.idleAreaTotal) || '-'} ㎡</span>
            <VerticalDivider />
            <span>可售总面积：{formatNum2(data.saleAreaTotal) || '-'} ㎡</span>
          </div>
          <Button type='primary' ghost onClick={() => openStoreDetail(data)}>详情</Button>
        </div>
      </ItemWarp>
    );
  };

  const InfoContent = () => {
    if (storeData?.length === 0) {
      return (
        <div className='noContent'>
          <img width={120} height={120} src={noData} alt='no_data' />
          <div>亲，暂时还没有数据哦～</div>
        </div>
      );
    }
    return (
      <>
        <div className='wrapperContent'>
          {
            storeData.map((item, index) => (
              <>
                <StoreItem data={item} key={item.id} />
                {index + 1 < storeData.length ? <Divider /> : null}
              </>
            ))
          }
        </div>
        <div className='wrapperPagination'>
          <Pagination
            showQuickJumper
            showSizeChanger
            current={pagination.pageNum}
            total={pagination.total}
            pageSize={pagination.pageSize}
            pageSizeOptions={baseTableConf.pageSizeOptions}
            onChange={handleChangePage}
            showTotal={(total: number) => (`共${total}项`)}
          />
        </div>
      </>
    );
  };

  return (
    <Wrapper>
      {
        loading ? <Skeleton active /> : <InfoContent />
      }
    </Wrapper>
  );
}

export default StoreInfo;
