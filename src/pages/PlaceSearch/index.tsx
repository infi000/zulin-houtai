import React from 'react';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import ErrorBoundary from 'components/ErrorBoundary';
import PageWrapper from 'components/PageWrapper';

import saga from './saga';
import { sliceKey, reducer } from './slice';

import FormSearch from './modules/FormSearch';
import StoreInfo from './modules/StoreInfo';

function Page() {
  useInjectReducer({ key: sliceKey, reducer });
  // 可选
  useInjectSaga({ key: sliceKey, saga });

  return (
    <ErrorBoundary>
      <PageWrapper>
        <FormSearch />
        <StoreInfo />
      </PageWrapper>
    </ErrorBoundary>
  );
}

export default Page;
