/*
 * @Author: Claude
 * @Description: UserCardOrders 页面入口
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import ErrorBoundary from 'components/ErrorBoundary';
import PageWrapper from 'components/PageWrapper';
import saga from './saga';
import { sliceKey, reducer } from './slice';
import FormTable from './modules/FormTable';
import selectors from './selectors';

function Page() {
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga });

  return (
    <ErrorBoundary>
      <PageWrapper>
        <FormTable />
      </PageWrapper>
    </ErrorBoundary>
  );
}

export default Page;
