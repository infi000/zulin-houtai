import React from 'react';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useDispatch } from 'react-redux';
import { useDidRecover } from 'react-router-cache-route';
import { getQueryString } from 'utils/utils';
import ErrorBoundary from 'components/ErrorBoundary';
import PageWrapper from 'components/PageWrapper';

import saga from './saga';
import { sliceKey, reducer, getDetail, getUnusedInfo, getRewardInfo } from './slice';

import StoreDetail from './modules/StoreDetail';

const { useEffect, useState } = React;

function Page() {
  useInjectReducer({ key: sliceKey, reducer });
  // 可选
  useInjectSaga({ key: sliceKey, saga });
  // 初始化页面基础数据，比如一些下拉框枚举值等；
  const dispatch = useDispatch();
  const id = getQueryString('id');

  useEffect(() => {
    dispatch(getDetail({ id }));
    dispatch(getUnusedInfo({ placeId: id }));
    dispatch(getRewardInfo({ placeId: id }));
    console.log('执行了');
  }, []);

  useDidRecover(() => {
    dispatch(getDetail({ id }));
    dispatch(getUnusedInfo({ placeId: id }));
    dispatch(getRewardInfo({ placeId: id }));
  });

  return (
    <ErrorBoundary>
      <PageWrapper>
        <StoreDetail />
      </PageWrapper>
    </ErrorBoundary>
  );
}

export default Page;
